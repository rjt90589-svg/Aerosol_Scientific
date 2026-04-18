'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Product } from '@/types'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(1, 'Required'),
  slug: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  short_description: z.string().optional(),
  category: z.string().min(1, 'Required'),
  brand: z.string().optional(),
  image_url: z.string().optional(),
  featured: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  product?: Product
}

export default function ProductForm({ product }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState(product?.category || '')

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: product ? {
      name: product.name,
      slug: product.slug,
      description: product.description,
      short_description: product.short_description,
      category: product.category,
      brand: product.brand,
      image_url: product.image_url,
      featured: product.featured,
    } : { brand: 'Aerosol Scientific', featured: false }
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const supabase = createClient()
    try {
      if (product) {
        await supabase.from('products').update({ ...data, category, updated_at: new Date().toISOString() }).eq('id', product.id)
      } else {
        await supabase.from('products').insert([{ ...data, category, images: data.image_url ? [data.image_url] : [] }])
      }
      router.push('/admin/products')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Product Name *</Label>
          <Input {...register('name')} className="mt-1" placeholder="e.g. 1.5mL Amber Vial"
            onChange={e => {
              register('name').onChange(e)
              if (!product) setValue('slug', generateSlug(e.target.value))
            }}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label>URL Slug *</Label>
          <Input {...register('slug')} className="mt-1" placeholder="1-5ml-amber-vial" />
          {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
        </div>
      </div>

      <div>
        <Label>Category *</Label>
        <Select onValueChange={setCategory} defaultValue={product?.category}>
          <SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
          <SelectContent>
            {PRODUCT_CATEGORIES.filter(c => c !== 'All').map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Short Description</Label>
        <Input {...register('short_description')} className="mt-1" placeholder="Brief summary for product cards" />
      </div>

      <div>
        <Label>Full Description *</Label>
        <Textarea {...register('description')} rows={5} className="mt-1 resize-none" placeholder="Detailed product description..." />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Brand</Label>
          <Input {...register('brand')} className="mt-1" placeholder="Aerosol Scientific" />
        </div>
        <div>
          <Label>Image URL</Label>
          <Input {...register('image_url')} className="mt-1" placeholder="https://..." />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="featured" {...register('featured')} className="w-4 h-4 rounded" />
        <Label htmlFor="featured">Featured Product (show on homepage)</Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="bg-gradient-to-r from-[#1565C0] to-[#00838F]">
          {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/products')}>
          Cancel
        </Button>
      </div>
    </form>
  )
}