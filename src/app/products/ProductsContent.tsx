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

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const activeCategoryConfig = useMemo(
    () => PRODUCT_CATEGORIES.find(c => c.name === category) ?? null,
    [category]
  )

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
    setSubcategory('')
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

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* ── Filter bar ─────────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-4 mb-2">

          {/* Row 1:  category pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Divider */}
            <div className="hidden sm:block w-px h-7 bg-gray-200 flex-shrink-0" />

            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">

              {/* All */}
              <button
                onClick={() => handleCategory('All')}
                className={`relative px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200
                  ${category === 'All'
                    ? 'bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white shadow-md shadow-blue-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800'}`}
              >
                All
              </button>

              {PRODUCT_CATEGORIES.map((cat) => {
                const isActive = category === cat.name
                return (
                  <button
                    key={cat.name}
                    onClick={() => handleCategory(cat.name)}
                    className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-[#1565C0] to-[#00838F] text-white shadow-md shadow-blue-200'
                        : 'bg-blue-200 text-[#1565C0]  hover:text-white hover:bg-sci-blue'}`}
                  >
                    {cat.name}
                    {cat.subcategories.length > 0 && (
                      <ChevronRight
                        size={13}
                        className={`flex-shrink-0 transition-transform duration-200
                          ${isActive ? 'rotate-90 opacity-80' : 'opacity-40'}`}
                      />
                    )}
                    {/* Active underline dot */}
                    {isActive && (
                      <motion.span
                        layoutId="cat-indicator"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60"
                      />
                    )}
                  </button>
                )
              })}

              {/* Clear */}
              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-all"
                >
                  <X size={11} /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Row 2: subcategory pills — animated */}
          <AnimatePresence>
            {activeCategoryConfig && activeCategoryConfig.subcategories.length > 0 && (
              <motion.div
                key={activeCategoryConfig.name}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                {/* Thin separator */}
                <div className="border-t border-gray-100 mb-3" />

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Label */}
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mr-1 flex-shrink-0">
                    {activeCategoryConfig.name}:
                  </span>

                  {/* All sub */}
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
        </div>

        {/* Results count + breadcrumb */}
        {!loading && (
          <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-5 px-1">
            {hasActiveFilters ? (
              <>
                <span
                  className="text-gray-400 hover:text-[#1565C0] cursor-pointer transition-colors text-xs"
                  onClick={clearAll}
                >
                  All
                </span>
                {category !== 'All' && (
                  <>
                    <ChevronRight size={11} className="text-gray-300" />
                    <span
                      className={`text-xs cursor-pointer transition-colors ${!subcategory ? 'text-[#1565C0] font-semibold' : 'text-gray-400 hover:text-[#1565C0]'}`}
                      onClick={() => handleCategory(category)}
                    >
                      {category}
                    </span>
                  </>
                )}
                {subcategory && (
                  <>
                    <ChevronRight size={11} className="text-gray-300" />
                    <span className="text-xs font-semibold text-[#1565C0]">{subcategory}</span>
                  </>
                )}
                <span className="mx-1 text-gray-200">·</span>
              </>
            ) : null}
            <span className="text-xs">
              <span className="font-semibold text-gray-600">{filtered.length}</span>{' '}
              product{filtered.length !== 1 ? 's' : ''}
              {search ? <> for <span className="font-medium text-gray-700">"{search}"</span></> : ''}
            </span>
          </div>
        )}

        {/* ── Grid ─────────────────────────────────────────────────────────── */}
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