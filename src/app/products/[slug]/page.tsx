import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'

interface Props {
  params: { slug: string }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product) notFound()

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', product.id)
    .eq('approved', true)
    .order('created_at', { ascending: false })

  const { data: related } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', product.id)
    .limit(4)

  return <ProductDetailClient product={product} reviews={reviews || []} related={related || []} />
}