'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Plus, Edit, Trash2, Search, X, Loader2,
  AlertTriangle, CheckCircle2, Package, Upload, ImageIcon,
} from 'lucide-react'
import { CATEGORY_NAMES } from '@/lib/constants'
import { uploadProductImage, deleteProductImage } from '@/lib/supabase/storage'
import type { Product } from '@/types'
import { useProductStore } from '@/lib/store/productStore'
import CategorySubcategorySelect from '@/components/CategorySubcategorySelect'

// ─── Shared primitives ────────────────────────────────────────────────────────
function Overlay({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClick} />
  )
}

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold text-white ${
      type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gradient-to-r from-red-500 to-rose-500'
    }`}>
      {type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
      {message}
    </div>
  )
}

// ─── Shared styles ─────────────────────────────────────────────────────────────
const inputCls = 'w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all bg-white placeholder:text-gray-400'
const labelCls = 'block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest'
const errCls   = 'text-red-500 text-xs mt-1'

// ─── Delete dialog ─────────────────────────────────────────────────────────────
function DeleteDialog({
  product, onConfirm, onCancel, loading,
}: { product: Product; onConfirm: () => void; onCancel: () => void; loading: boolean }) {
  return (
    <>
      <Overlay onClick={onCancel} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-red-500 to-rose-500" />
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle size={22} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Delete Product</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Delete <span className="font-semibold text-gray-800">"{product.name}"</span>?
                  This also removes its associated quote requests and reviews.{' '}
                  <span className="font-semibold text-red-600">Cannot be undone.</span>
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                {product.image_url
                  ? <img src={product.image_url} alt="" className="w-full h-full object-contain p-0.5" />
                  : <Package size={16} className="text-gray-300" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                <p className="text-xs text-gray-400">{product.category}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={onCancel} disabled={loading}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button onClick={onConfirm} disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-red-200 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                {loading ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Zod schema ───────────────────────────────────────────────────────────────
// CHANGED: added `subcategory` field
const productSchema = z.object({
  name:              z.string().min(1, 'Product name is required'),
  slug:              z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Lowercase, numbers and hyphens only'),
  category:          z.string().min(1, 'Category is required'),
  subcategory:       z.string().optional(),   // NEW
  brand:             z.string().optional(),
  short_description: z.string().optional(),
  description:       z.string().min(1, 'Description is required'),
  tags:              z.string().optional(),
  featured:          z.boolean().optional(),
})
type ProductFormData = z.infer<typeof productSchema>

type SpecRow = { key: string; value: string }

function defaultSpecRows(product?: Product): SpecRow[] {
  if (!product?.specifications) return [{ key: '', value: '' }]
  const entries = Object.entries(product.specifications as Record<string, string>)
  return entries.length ? entries.map(([k, v]) => ({ key: k, value: String(v) })) : [{ key: '', value: '' }]
}

// ─── Image uploader ────────────────────────────────────────────────────────────
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
const MAX_MB   = 5

interface ImagePickerProps {
  preview: string | null
  isDragging: boolean
  onFileChange: (f: File) => void
  onRemove: () => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  uploadStatus: 'idle' | 'uploading' | 'done' | 'error'
  error: string | null
}
function ImagePicker({
  preview, isDragging, onFileChange, onRemove,
  onDragOver, onDragLeave, onDrop, fileInputRef, uploadStatus, error,
}: ImagePickerProps) {
  return (
    <div className="space-y-2">
      <input ref={fileInputRef} type="file" accept={ACCEPTED.join(',')} className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onFileChange(f) }} />
      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group"
          style={{ aspectRatio: '16/9', maxHeight: 200 }}>
          <img src={preview} alt="Preview" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          <div className="absolute top-2 right-2 flex gap-1.5">
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm">
              <Upload size={9} /> Replace
            </button>
            <button type="button" onClick={onRemove}
              className="p-1.5 rounded-full bg-black/60 hover:bg-red-600/90 text-white backdrop-blur-sm">
              <X size={11} />
            </button>
          </div>
          {uploadStatus === 'done' && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-semibold">
              <CheckCircle2 size={10} /> Uploaded
            </div>
          )}
        </div>
      ) : (
        <div role="button" tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
          onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
          className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-7 cursor-pointer transition-all
            ${isDragging ? 'border-blue-500 bg-blue-50/10' : 'border-gray-200 hover:border-blue-400/60 hover:bg-gray-50/50'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center
            ${isDragging ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-400'}`}>
            <ImageIcon size={18} />
          </div>
          <p className="text-xs text-gray-500 text-center">
            <span className="font-semibold text-gray-700">{isDragging ? 'Drop here' : 'Click to upload'}</span>
            {!isDragging && <> or drag &amp; drop<br />JPG, PNG, WebP · max {MAX_MB}MB</>}
          </p>
        </div>
      )}
      {error && <p className="text-red-500 text-xs flex items-center gap-1"><X size={10} />{error}</p>}
    </div>
  )
}

// ─── Shared form body ─────────────────────────────────────────────────────────
interface ProductFormBodyProps {
  form: ReturnType<typeof useForm<ProductFormData>>
  specRows: SpecRow[]
  setSpecRows: React.Dispatch<React.SetStateAction<SpecRow[]>>
  imagePreview: string | null
  isDragging: boolean
  uploadStatus: 'idle' | 'uploading' | 'done' | 'error'
  imageError: string | null
  onFileChange: (f: File) => void
  onRemoveImage: () => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  isEdit?: boolean
}

function ProductFormBody({
  form, specRows, setSpecRows,
  imagePreview, isDragging, uploadStatus, imageError,
  onFileChange, onRemoveImage, onDragOver, onDragLeave, onDrop, fileInputRef,
  isEdit,
}: ProductFormBodyProps) {
  const { register, setValue, watch, formState: { errors } } = form

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const featured = watch('featured')
  // CHANGED: watch both category and subcategory for CategorySubcategorySelect
  const category = watch('category') ?? ''
  const subcategory = watch('subcategory') ?? ''

  return (
    <div className="space-y-4">
      {/* Name & Slug */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Name <span className="text-red-500">*</span></label>
          <input {...register('name')} className={inputCls} placeholder="e.g. Stability Chamber 100L"
            onChange={e => {
              register('name').onChange(e)
              if (!isEdit) setValue('slug', generateSlug(e.target.value))
            }} />
          {errors.name && <p className={errCls}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Slug <span className="text-red-500">*</span></label>
          <input {...register('slug')} className={inputCls} placeholder="stability-chamber-100l" />
          {errors.slug && <p className={errCls}>{errors.slug.message}</p>}
        </div>
      </div>

      {/* CHANGED: Category + Subcategory via shared component, + Brand alongside */}
      <div className="grid grid-cols-2 gap-3">
        {/* CategorySubcategorySelect spans both columns on its own row */}
        <div className="col-span-2">
          <CategorySubcategorySelect
            category={category}
            subcategory={subcategory}
            onCategoryChange={val => setValue('category', val, { shouldValidate: true })}
            onSubcategoryChange={val => setValue('subcategory', val, { shouldValidate: false })}
            required
          />
          {errors.category && <p className={errCls}>{errors.category.message}</p>}
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Brand</label>
          <input {...register('brand')} className={inputCls} placeholder="Aerosol Scientific" />
        </div>
      </div>

      {/* Short description */}
      <div>
        <label className={labelCls}>Short Description</label>
        <input {...register('short_description')} className={inputCls}
          placeholder="One-line summary shown on product cards" />
      </div>

      {/* Full description */}
      <div>
        <label className={labelCls}>Full Description <span className="text-red-500">*</span></label>
        <textarea {...register('description')} rows={3}
          className={`${inputCls} resize-none`} placeholder="Detailed product description…" />
        {errors.description && <p className={errCls}>{errors.description.message}</p>}
      </div>

      {/* Tags */}
      <div>
        <label className={labelCls}>Tags <span className="text-gray-300 font-normal normal-case tracking-normal">comma-separated</span></label>
        <input {...register('tags')} className={inputCls}
          placeholder="stability, chamber, thermolab" />
      </div>

      {/* Specifications */}
      <div>
        <label className={labelCls}>Specifications</label>
        <div className="space-y-2">
          {specRows.map((row, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={row.key} placeholder="Key (e.g. Capacity)"
                onChange={e => setSpecRows(r => r.map((x, j) => j === i ? { ...x, key: e.target.value } : x))}
                className={`${inputCls} flex-1`} />
              <input value={row.value} placeholder="Value (e.g. 100L)"
                onChange={e => setSpecRows(r => r.map((x, j) => j === i ? { ...x, value: e.target.value } : x))}
                className={`${inputCls} flex-1`} />
              <button type="button"
                onClick={() => setSpecRows(r => r.filter((_, j) => j !== i))}
                className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors shrink-0">
                <X size={14} />
              </button>
            </div>
          ))}
          <button type="button"
            onClick={() => setSpecRows(r => [...r, { key: '', value: '' }])}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
            <Plus size={12} /> Add specification
          </button>
        </div>
      </div>

      {/* Image */}
      <div>
        <label className={labelCls}>Product Image</label>
        <ImagePicker
          preview={imagePreview} isDragging={isDragging}
          uploadStatus={uploadStatus} error={imageError}
          onFileChange={onFileChange} onRemove={onRemoveImage}
          onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
          fileInputRef={fileInputRef}
        />
      </div>

      {/* Featured toggle */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative shrink-0">
          <input type="checkbox" {...register('featured')} className="sr-only" />
          <div onClick={() => setValue('featured', !featured)}
            className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${featured ? 'bg-gradient-to-r from-[#1565C0] to-[#00838F]' : 'bg-gray-200'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
        </div>
        <span className="text-sm font-medium text-gray-700">Featured product
          <span className="text-gray-400 font-normal ml-1">(shown on homepage)</span>
        </span>
      </label>
    </div>
  )
}

// ─── Add Product Dialog ────────────────────────────────────────────────────────
function AddProductDialog({
  onClose, onSuccess,
}: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [specRows, setSpecRows] = useState<SpecRow[]>([{ key: '', value: '' }])

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle'|'uploading'|'done'|'error'>('idle')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    // CHANGED: added subcategory default
    defaultValues: { brand: 'Aerosol Scientific', featured: false, tags: '', slug: '', category: '', subcategory: '' },
  })

  const handleFileChange = useCallback((file: File) => {
    setImageError(null)
    if (!ACCEPTED.includes(file.type)) { setImageError('Invalid file type'); return }
    if (file.size > MAX_MB * 1024 * 1024) { setImageError(`Max ${MAX_MB}MB`); return }
    setImageFile(file)
    setUploadStatus('idle')
    setImagePreview(URL.createObjectURL(file))
  }, [])

  const handleRemoveImage = useCallback(() => {
    setImageFile(null); setImagePreview(null); setUploadStatus('idle'); setImageError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true)
    setSubmitError(null)
    try {
      let image_url: string | null = null

      if (imageFile) {
        setUploadStatus('uploading')
        image_url = await uploadProductImage(imageFile, data.slug)
        setUploadStatus('done')
        setImagePreview(image_url)
      }

      const specifications = specRows.reduce<Record<string,string>>((acc, r) => {
        if (r.key.trim()) acc[r.key.trim()] = r.value.trim()
        return acc
      }, {})

      const payload = {
        name:              data.name,
        slug:              data.slug,
        description:       data.description,
        short_description: data.short_description || null,
        category:          data.category,
        subcategory:       data.subcategory || null,   // NEW
        brand:             data.brand || 'Aerosol Scientific',
        image_url,
        images:            image_url ? [image_url] : [],
        specifications,
        tags:              data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        featured:          data.featured ?? false,
      }

      console.log('[AddProduct] payload:', payload)

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      console.log('[AddProduct] response:', res.status, json)
      if (!res.ok) throw new Error(json.error || `POST failed (${res.status})`)

      onSuccess()
    } catch (err) {
      console.error('[AddProduct] error:', err)
      setSubmitError((err as Error).message)
      if (uploadStatus === 'uploading') setUploadStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Overlay onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl pointer-events-auto overflow-hidden flex flex-col max-h-[92vh]">
          <div className="bg-gradient-to-r from-[#1565C0] to-[#00838F] p-5 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-white font-bold text-lg">Add New Product</h2>
              <p className="text-white/70 text-xs mt-0.5">Fill in the details below</p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
              <X size={15} className="text-white" />
            </button>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
            <div className="overflow-y-auto flex-1 p-5">
              <ProductFormBody
                form={form} specRows={specRows} setSpecRows={setSpecRows}
                imagePreview={imagePreview} isDragging={isDragging}
                uploadStatus={uploadStatus} imageError={imageError}
                onFileChange={handleFileChange} onRemoveImage={handleRemoveImage}
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) handleFileChange(f) }}
                fileInputRef={fileInputRef}
              />

              {submitError && (
                <div className="mt-4 flex items-start gap-2.5 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl border border-red-200">
                  <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 flex gap-3 shrink-0 bg-gray-50/50">
              <button type="button" onClick={onClose} disabled={loading}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading
                  ? <><Loader2 size={15} className="animate-spin" />{uploadStatus === 'uploading' ? 'Uploading…' : 'Saving…'}</>
                  : <><CheckCircle2 size={15} /> Add Product</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

// ─── Edit Product Dialog ───────────────────────────────────────────────────────
function EditProductDialog({
  product, onClose, onSuccess,
}: { product: Product; onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [specRows, setSpecRows] = useState<SpecRow[]>(defaultSpecRows(product))

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(product.image_url ?? null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle'|'uploading'|'done'|'error'>('idle')
  const [removedExisting, setRemovedExisting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name:              product.name,
      slug:              product.slug,
      category:          product.category,
      subcategory:       (product as any).subcategory ?? '',   // NEW
      brand:             product.brand ?? 'Aerosol Scientific',
      short_description: product.short_description ?? '',
      description:       product.description ?? '',
      tags:              (product.tags ?? []).join(', '),
      featured:          product.featured ?? false,
    },
  })

  // CHANGED: sync both category and subcategory into RHF on mount
  useEffect(() => {
    form.setValue('category', product.category, { shouldValidate: false })
    form.setValue('subcategory', (product as any).subcategory ?? '', { shouldValidate: false })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileChange = useCallback((file: File) => {
    setImageError(null)
    if (!ACCEPTED.includes(file.type)) { setImageError('Invalid file type'); return }
    if (file.size > MAX_MB * 1024 * 1024) { setImageError(`Max ${MAX_MB}MB`); return }
    setImageFile(file); setUploadStatus('idle')
    setImagePreview(URL.createObjectURL(file)); setRemovedExisting(false)
  }, [])

  const handleRemoveImage = useCallback(() => {
    setImageFile(null); setImagePreview(null); setUploadStatus('idle')
    setImageError(null); setRemovedExisting(true)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true)
    setSubmitError(null)
    try {
      let image_url: string | null = removedExisting ? null : (product.image_url ?? null)

      if (imageFile) {
        setUploadStatus('uploading')
        const uploaded = await uploadProductImage(imageFile, data.slug)
        if (product.image_url && product.image_url !== uploaded) {
          await deleteProductImage(product.image_url).catch(console.error)
        }
        image_url = uploaded
        setUploadStatus('done')
        setImagePreview(uploaded)
      }
      if (removedExisting && product.image_url && !imageFile) {
        await deleteProductImage(product.image_url).catch(console.error)
      }

      const specifications = specRows.reduce<Record<string,string>>((acc, r) => {
        if (r.key.trim()) acc[r.key.trim()] = r.value.trim()
        return acc
      }, {})

      const payload = {
        name:              data.name,
        slug:              data.slug,
        description:       data.description,
        short_description: data.short_description || null,
        category:          data.category,
        subcategory:       data.subcategory || null,   // NEW
        brand:             data.brand || 'Aerosol Scientific',
        image_url,
        images:            image_url ? [image_url] : [],
        specifications,
        tags:              data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        featured:          data.featured ?? false,
      }

      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || `PUT failed (${res.status})`)
      onSuccess()
    } catch (err) {
      console.error('[EditProduct] error:', err)
      setSubmitError((err as Error).message)
      if (uploadStatus === 'uploading') setUploadStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Overlay onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl pointer-events-auto overflow-hidden flex flex-col max-h-[92vh]">
          <div className="bg-gradient-to-r from-[#1565C0] to-[#00838F] p-5 flex items-start justify-between shrink-0">
            <div>
              <h2 className="text-white font-bold text-lg">Edit Product</h2>
              <p className="text-white/70 text-xs mt-0.5 truncate max-w-[340px]">{product.name}</p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
              <X size={15} className="text-white" />
            </button>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
            <div className="overflow-y-auto flex-1 p-5">
              <ProductFormBody
                form={form} specRows={specRows} setSpecRows={setSpecRows}
                imagePreview={imagePreview} isDragging={isDragging}
                uploadStatus={uploadStatus} imageError={imageError}
                onFileChange={handleFileChange} onRemoveImage={handleRemoveImage}
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) handleFileChange(f) }}
                fileInputRef={fileInputRef}
                isEdit
              />

              {submitError && (
                <div className="mt-4 flex items-start gap-2.5 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl border border-red-200">
                  <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 flex gap-3 shrink-0 bg-gray-50/50">
              <button type="button" onClick={onClose} disabled={loading}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading
                  ? <><Loader2 size={15} className="animate-spin" />{uploadStatus === 'uploading' ? 'Uploading…' : 'Saving…'}</>
                  : <><CheckCircle2 size={15} /> Save Changes</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function AdminProducts() {
  const [products, setProducts]       = useState<Product[]>([])
  const [search, setSearch]           = useState('')
  const [loading, setLoading]         = useState(true)
  const [showAdd, setShowAdd]         = useState(false)
  const [editTarget, setEditTarget]   = useState<Product | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success'|'error' } | null>(null)
  const { invalidateCache } = useProductStore()

  const showToast = (message: string, type: 'success'|'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    const res = await fetch(`/api/admin/products?${params}`)
    const data = await res.json()
    setProducts(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [search])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    try {
      const res = await fetch(`/api/admin/products/${deleteTarget.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Delete failed')
      setDeleteTarget(null)
      invalidateCache()
      showToast('Product deleted', 'success')
      fetchProducts()
    } catch (err) {
      showToast((err as Error).message, 'error')
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-500 text-sm">{products.length} product{products.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:shadow-md transition-all"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search products…"
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl w-full max-w-xs focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 outline-none transition-all" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  {/* CHANGED: merged Category + Subcategory into one column */}
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Brand</th>
                  <th className="px-4 py-3 text-left">Featured</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                          {product.image_url
                            ? <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-1" />
                            : <Package size={16} className="text-gray-300" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">{product.name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[200px]">{product.short_description}</p>
                        </div>
                      </div>
                    </td>
                    {/* CHANGED: show subcategory below category when present */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-full whitespace-nowrap w-fit">
                          {product.category}
                        </span>
                        {(product as any).subcategory && (
                          <span className="text-xs bg-teal-50 text-teal-700 font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap w-fit">
                            {(product as any).subcategory}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500">{product.brand || '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        product.featured ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {product.featured ? '★ Featured' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setEditTarget(product)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-blue-600 text-xs font-semibold transition-colors">
                          <Edit size={13} /> Edit
                        </button>
                        <button onClick={() => setDeleteTarget(product)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-red-50 text-red-500 text-xs font-semibold transition-colors">
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {loading && (
              <div className="flex items-center justify-center gap-2 py-10 text-gray-400 text-sm">
                <Loader2 size={16} className="animate-spin" /> Loading products…
              </div>
            )}
            {!loading && products.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-sm">
                <Package size={32} className="mx-auto mb-2 opacity-30" />
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>

      {showAdd && (
        <AddProductDialog
          onClose={() => setShowAdd(false)}
          onSuccess={() => { setShowAdd(false); showToast('Product added!', 'success'); invalidateCache(); fetchProducts() }}
        />
      )}

      {editTarget && (
        <EditProductDialog
          product={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={() => { setEditTarget(null); showToast('Product updated!', 'success'); invalidateCache(); fetchProducts() }}
        />
      )}

      {deleteTarget && (
        <DeleteDialog
          product={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  )
}