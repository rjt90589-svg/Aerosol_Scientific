// src/lib/supabase/storage.ts
import { createClient } from './client'
import { SUPABASE_STORAGE_BUCKET } from '../constants'

export async function uploadProductImage(file: File, productSlug: string): Promise<string> {
  const supabase = createClient()
  const ext = file.name.split('.').pop()
  const fileName = `${productSlug}-${Date.now()}.${ext}`
  const filePath = `products/${fileName}`

  const { error } = await supabase.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .upload(filePath, file, { cacheControl: '3600', upsert: false })

  if (error) {
    console.error('[storage] Upload error:', error)
    throw new Error(`Image upload failed: ${error.message}`)
  }

  const { data } = supabase.storage.from(SUPABASE_STORAGE_BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}

export async function deleteProductImage(url: string): Promise<void> {
  const supabase = createClient()
  const urlParts = url.split(`/${SUPABASE_STORAGE_BUCKET}/`)
  if (urlParts.length < 2) return
  const filePath = urlParts[1]
  const { error } = await supabase.storage.from(SUPABASE_STORAGE_BUCKET).remove([filePath])
  if (error) console.error('[storage] Delete error:', error)
}

export function getStorageUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/${path}`
}