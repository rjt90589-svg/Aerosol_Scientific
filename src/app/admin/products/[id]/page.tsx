import { createAdminClient } from '@/lib/supabase/admin'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: product } = await supabase.from('products').select('*').eq('id', id).single()
  if (!product) notFound()
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500 text-sm">{product.name}</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <ProductForm product={product} />
      </div>
    </div>
  )
}