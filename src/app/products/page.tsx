import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/products/ProductCard'
import PageHero from '@/components/ui/PageHero'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

interface Props {
  searchParams: { category?: string; search?: string }
}

export default async function ProductsPage({ searchParams }: Props) {
  const supabase = await createClient()
  const { category, search } = await searchParams

  let query = supabase.from('products').select('*').order('created_at', { ascending: false })

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }
  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data: products } = await query

  return (
    <>
      <PageHero
        eyebrow="Our Range"
        title="Products & Consumables"
        subtitle="Genuine chromatography consumables, vials, septa and lab supplies from certified sources."
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {PRODUCT_CATEGORIES.map((cat) => (
             <a
             key={cat}
              href={`/products${cat !== 'All' ? `?category=${encodeURIComponent(cat)}` : ''}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                (category || 'All') === cat
                  ? 'bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-[#1565C0]'
              }`}
            >
              {cat}
            </a>
          ))}
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No products found.</p>
          </div>
        )}
      </div>
    </>
  )
}