'use client'
import { useEffect, useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { useProductStore } from '@/lib/store/productStore'
import ProductCard from '@/components/products/ProductCard'
import PageHero from '@/components/ui/PageHero'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

export default function ProductsPage() {
  const { products, loading, fetchProducts } = useProductStore()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [category, setCategory] = useState(searchParams.get('category') ?? 'All')

  // Fetch once on mount (store caches for 5 min)
  useEffect(() => { fetchProducts() }, [fetchProducts])

  // Instant client-side filter + search — no network requests
  const filtered = useMemo(() => {
    let result = products
    if (category && category !== 'All') {
      result = result.filter(p => p.category === category)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [products, category, search])

  const handleCategory = (cat: string) => {
    setCategory(cat)
    const params = new URLSearchParams()
    if (cat !== 'All') params.set('category', cat)
    if (search) params.set('search', search)
    router.replace(`/products${params.toString() ? `?${params}` : ''}`, { scroll: false })
  }

  const handleSearch = (val: string) => {
    setSearch(val)
    const params = new URLSearchParams()
    if (category !== 'All') params.set('category', category)
    if (val) params.set('search', val)
    router.replace(`/products${params.toString() ? `?${params}` : ''}`, { scroll: false })
  }

  return (
    <>
      <PageHero
        eyebrow="Our Range"
        title="Products & Consumables"
        subtitle="Genuine chromatography consumables, vials, septa and lab supplies from certified sources."
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search bar */}
        <div className="relative mb-6 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-blue-50 transition-all"
          />
          {search && (
            <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-[#1565C0]'
              }`}
            >
              {cat}
            </button>
          ))}
          {(search || category !== 'All') && (
            <button
              onClick={() => { setSearch(''); handleCategory('All') }}
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 flex items-center gap-1.5"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-gray-400 mb-4">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            {search ? ` for "${search}"` : ''}
            {category !== 'All' ? ` in ${category}` : ''}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${category}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <SlidersHorizontal size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No products found.</p>
            <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </>
  )
}