'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Product } from '@/types'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    const supabase = createClient()
    let q = supabase.from('products').select('*').order('created_at', { ascending: false })
    if (search) q = q.ilike('name', `%${search}%`)
    const { data } = await q
    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [search])

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return
    const supabase = createClient()
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm">{products.length} products</p>
        </div>
        <Link href="/admin/products/new" className="flex items-center gap-2 bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:shadow-md transition-all">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl w-full max-w-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Featured</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{product.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${product.featured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {product.featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${product.id}`} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                        <Edit size={14} />
                      </Link>
                      <button onClick={() => deleteProduct(product.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="text-center py-8 text-gray-400 text-sm">Loading...</div>}
          {!loading && products.length === 0 && <div className="text-center py-8 text-gray-400 text-sm">No products found.</div>}
        </div>
      </div>
    </div>
  )
}