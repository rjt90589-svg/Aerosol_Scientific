'use client'
import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { uploadProductImage, deleteProductImage } from '@/lib/supabase/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Product } from '@/types'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { Upload, X, ImageIcon, Loader2, CheckCircle2 } from 'lucide-react'

// ── Validation schema ─────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'URL slug is required').regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens'),
  description: z.string().min(1, 'Full description is required'),
  short_description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  featured: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

// ── Constants ─────────────────────────────────────────────────────────────────
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
const MAX_SIZE_MB = 5

// ── Types ────────────────────────────────────────────────────────────────────
interface Props {
  product?: Product
}

type UploadStatus = 'idle' | 'uploading' | 'done' | 'error'

// ── ImageUploader sub-component ───────────────────────────────────────────────
interface ImageUploaderProps {
  preview: string | null
  isDragging: boolean
  uploadStatus: UploadStatus
  uploadProgress: number
  error: string | null
  hasExistingImage: boolean
  onFileChange: (file: File) => void
  onRemove: () => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
}

function ImageUploader({
  preview,
  isDragging,
  uploadStatus,
  error,
  hasExistingImage,
  onFileChange,
  onRemove,
  onDragOver,
  onDragLeave,
  onDrop,
  fileInputRef,
}: ImageUploaderProps) {
  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        className="hidden"
        onChange={e => {
          const f = e.target.files?.[0]
          if (f) onFileChange(f)
        }}
      />

      {preview ? (
        /* ── Preview state ─────────────────────────── */
        <div className="relative rounded-xl overflow-hidden border border-border bg-muted/20 group"
          style={{ aspectRatio: '16/9', maxHeight: 260 }}>
          <img
            src={preview}
            alt="Product image preview"
            className="w-full h-full object-contain"
          />

          {/* Overlay actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          <div className="absolute top-2.5 right-2.5 flex gap-1.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 hover:bg-black/80 text-white transition-colors backdrop-blur-sm"
            >
              <Upload size={10} /> Replace
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="p-1.5 rounded-full bg-black/60 hover:bg-red-600/90 text-white transition-colors backdrop-blur-sm"
            >
              <X size={12} />
            </button>
          </div>

          {/* Status badge */}
          {uploadStatus === 'done' && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[11px] font-semibold backdrop-blur-sm">
              <CheckCircle2 size={11} /> Uploaded
            </div>
          )}
          {hasExistingImage && uploadStatus === 'idle' && (
            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/50 text-white/80 text-[11px] backdrop-blur-sm">
              Current image
            </div>
          )}
        </div>
      ) : (
        /* ── Drop zone ─────────────────────────────── */
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload product image"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all duration-200 select-none
            ${isDragging
              ? 'border-blue-500 bg-blue-50/10 scale-[1.01]'
              : 'border-border hover:border-blue-400/70 hover:bg-muted/25'
            }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors
            ${isDragging ? 'bg-blue-500/15 text-blue-400' : 'bg-muted text-muted-foreground'}`}>
            <ImageIcon size={22} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">
              {isDragging ? 'Drop image here' : 'Click to upload'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              or drag & drop · JPG, PNG, WebP, AVIF · max {MAX_SIZE_MB}MB
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1">
          <X size={11} className="shrink-0" /> {error}
        </p>
      )}
    </div>
  )
}

// ── Main ProductForm ──────────────────────────────────────────────────────────
export default function ProductForm({ product }: Props) {
  const router = useRouter()
  const [formLoading, setFormLoading] = useState(false)
  const [category, setCategory] = useState(product?.category ?? '')

  // Image state
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_url ?? null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [removedExisting, setRemovedExisting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description,
          short_description: product.short_description ?? '',
          category: product.category,
          brand: product.brand ?? '',
          featured: product.featured ?? false,
        }
      : { brand: 'Aerosol Scientific', featured: false },
  })

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  // ── File validation & selection ───────────────────────────────────────────
  const handleFileChange = useCallback((file: File) => {
    setImageError(null)
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setImageError('Please upload a valid image (JPG, PNG, WebP, AVIF, GIF)')
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setImageError(`Image must be under ${MAX_SIZE_MB}MB`)
      return
    }
    setImageFile(file)
    setUploadStatus('idle')
    const url = URL.createObjectURL(file)
    setImagePreview(url)
    setRemovedExisting(false)
  }, [])

  const handleRemoveImage = useCallback(() => {
    setImageFile(null)
    setImagePreview(null)
    setUploadStatus('idle')
    setImageError(null)
    setRemovedExisting(true)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => setIsDragging(false), [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) handleFileChange(file)
    },
    [handleFileChange]
  )

  // ── Form submit ───────────────────────────────────────────────────────────
  const onSubmit = async (data: FormData) => {
    setFormLoading(true)
    setImageError(null)
    const supabase = createClient()

    try {
      let image_url: string | null = removedExisting ? null : (product?.image_url ?? null)

      // Upload new image to bucket
      if (imageFile) {
        setUploadStatus('uploading')
        setUploadProgress(0)

        const uploaded = await uploadProductImage(imageFile, data.slug)

        if (!uploaded) {
          setImageError('Image upload failed. Please try again.')
          setUploadStatus('error')
          setFormLoading(false)
          return
        }

        // Remove old image from storage if replacing
        if (product?.image_url && product.image_url !== uploaded) {
          await deleteProductImage(product.image_url).catch(console.error)
        }

        image_url = uploaded
        setUploadStatus('done')
        setImagePreview(uploaded) // use final CDN URL
      }

      // Also remove old image from storage if explicitly removed
      if (removedExisting && product?.image_url && !imageFile) {
        await deleteProductImage(product.image_url).catch(console.error)
      }

      const payload = {
        ...data,
        category,
        image_url,
        images: image_url ? [image_url] : [],
      }

      if (product) {
        await supabase
          .from('products')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', product.id)
      } else {
        await supabase.from('products').insert([payload])
      }

      router.push('/admin/products')
      router.refresh()
    } catch (err) {
      console.error('Save error:', err)
      setImageError('Something went wrong. Please try again.')
    } finally {
      setFormLoading(false)
    }
  }

  // ── Derived state ─────────────────────────────────────────────────────────
  const isSubmitting = formLoading
  const hasExistingImage = Boolean(product?.image_url && !removedExisting && !imageFile)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {/* ── Name & Slug ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Product Name <span className="text-red-500">*</span></Label>
          <Input
            {...register('name')}
            className="mt-1"
            placeholder="e.g. 1.5mL Amber Vial"
            onChange={e => {
              register('name').onChange(e)
              if (!product) setValue('slug', generateSlug(e.target.value))
            }}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label>URL Slug <span className="text-red-500">*</span></Label>
          <Input {...register('slug')} className="mt-1" placeholder="1-5ml-amber-vial" />
          {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
        </div>
      </div>

      {/* ── Category ── */}
      <div>
        <Label>Category <span className="text-red-500">*</span></Label>
        <Select onValueChange={setCategory} defaultValue={product?.category}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_CATEGORIES.filter(c => c !== 'All').map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!category && errors.category && (
          <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* ── Short Description ── */}
      <div>
        <Label>Short Description</Label>
        <Input
          {...register('short_description')}
          className="mt-1"
          placeholder="Brief summary shown on product cards"
        />
      </div>

      {/* ── Full Description ── */}
      <div>
        <Label>Full Description <span className="text-red-500">*</span></Label>
        <Textarea
          {...register('description')}
          rows={5}
          className="mt-1 resize-none"
          placeholder="Detailed product description..."
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* ── Brand ── */}
      <div>
        <Label>Brand</Label>
        <Input {...register('brand')} className="mt-1" placeholder="Aerosol Scientific" />
      </div>

      {/* ── Image Upload ── */}
      <div>
        <Label>Product Image</Label>
        <div className="mt-1.5">
          <ImageUploader
            preview={imagePreview}
            isDragging={isDragging}
            uploadStatus={uploadStatus}
            uploadProgress={uploadProgress}
            error={imageError}
            hasExistingImage={hasExistingImage}
            onFileChange={handleFileChange}
            onRemove={handleRemoveImage}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            fileInputRef={fileInputRef}
          />
        </div>
      </div>

      {/* ── Featured ── */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          {...register('featured')}
          className="w-4 h-4 rounded"
        />
        <Label htmlFor="featured" className="cursor-pointer">
          Featured Product <span className="text-muted-foreground text-xs">(show on homepage)</span>
        </Label>
      </div>

      {/* ── Actions ── */}
      <div className="flex gap-3 pt-1">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-[#1565C0] to-[#00838F] min-w-[140px]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              {imageFile && uploadStatus === 'uploading' ? 'Uploading...' : 'Saving...'}
            </span>
          ) : (
            product ? 'Update Product' : 'Add Product'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => router.push('/admin/products')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}