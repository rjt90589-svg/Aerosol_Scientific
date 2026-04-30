'use client'
import { useEffect, useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal, ChevronRight } from 'lucide-react'
import { useProductStore } from '@/lib/store/productStore'
import ProductCard from '@/components/products/ProductCard'
import PageHero from '@/components/ui/PageHero'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

export default function ProductsContent() {
  const { products, loading, fetchProducts } = useProductStore()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [category, setCategory] = useState(searchParams.get('category') ?? 'All')
  const [subcategory, setSubcategory] = useState(searchParams.get('subcategory') ?? '')

  // Fetch once on mount (store caches for 5 min)
  useEffect(() => { fetchProducts() }, [fetchProducts])

  // Current category config — used to render subcategory pills
  const activeCategoryConfig = useMemo(
    () => PRODUCT_CATEGORIES.find(c => c.name === category) ?? null,
    [category]
  )

  // Instant client-side filter + search — no network requests
  const filtered = useMemo(() => {
    let result = products
    if (category && category !== 'All') {
      result = result.filter(p => p.category === category)
    }
    if (subcategory) {
      result = result.filter(p => p.subcategory === subcategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [products, category, subcategory, search])

  // ── URL sync helpers ──────────────────────────────────────────────────────

  const buildParams = (cat: string, sub: string, q: string) => {
    const params = new URLSearchParams()
    if (cat !== 'All') params.set('category', cat)
    if (sub) params.set('subcategory', sub)
    if (q) params.set('search', q)
    return params.toString()
  }

  const push = (cat: string, sub: string, q: string) => {
    const qs = buildParams(cat, sub, q)
    router.replace(`/products${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  const handleCategory = (cat: string) => {
    setCategory(cat)
    setSubcategory('') // reset subcategory whenever top-level changes
    push(cat, '', search)
  }

  const handleSubcategory = (sub: string) => {
    setSubcategory(sub)
    push(category, sub, search)
  }

  const handleSearch = (val: string) => {
    setSearch(val)
    push(category, subcategory, val)
  }

  const clearAll = () => {
    setSearch('')
    setCategory('All')
    setSubcategory('')
    router.replace('/products', { scroll: false })
  }

  const hasActiveFilters = search || category !== 'All' || subcategory

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
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* ── Top-level category filters ───────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => handleCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === 'All'
                ? 'bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-[#1565C0]'
            }`}
          >
            All
          </button>

          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                category === cat.name
                  ? 'bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-[#1565C0]'
              }`}
            >
              {cat.name}
              {cat.subcategories.length > 0 && (
                <ChevronRight
                  size={12}
                  className={`transition-transform ${category === cat.name ? 'rotate-90 opacity-80' : 'opacity-40'}`}
                />
              )}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 flex items-center gap-1.5"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* ── Subcategory filters (only when the active category has them) ── */}
        <AnimatePresence>
          {activeCategoryConfig && activeCategoryConfig.subcategories.length < 1 && (
            <motion.div
              key={activeCategoryConfig.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-6"
            >
              <div className="flex flex-wrap gap-2 pt-2 pl-2 border-l-2 border-blue-100 ml-1">
                {/* "All [category]" pill to clear subcategory */}
                <button
                  onClick={() => handleSubcategory('')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    !subcategory
                      ? 'bg-blue-100 text-[#1565C0] border border-blue-200'
                      : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-200 hover:text-[#1565C0]'
                  }`}
                >
                  All {activeCategoryConfig.name}
                </button>

                {activeCategoryConfig.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      subcategory === sub
                        ? 'bg-blue-100 text-[#1565C0] border border-blue-200'
                        : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-200 hover:text-[#1565C0]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* If no subcategory row, add spacing */}
        {(!activeCategoryConfig || activeCategoryConfig.subcategories.length < 1) && (
          <div className="mb-6" />
        )}

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-gray-400 mb-4">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            {search ? ` for "${search}"` : ''}
            {category !== 'All' ? ` in ${category}` : ''}
            {subcategory ? ` › ${subcategory}` : ''}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${category}-${subcategory}-${search}`}
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