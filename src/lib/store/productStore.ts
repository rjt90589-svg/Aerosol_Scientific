import { create } from 'zustand'
import type { Product, Review } from '@/types'

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  lastFetched: number | null

  // Actions
  fetchProducts: (force?: boolean) => Promise<void>
  invalidateCache: () => void
  getBySlug: (slug: string) => Product | undefined
  getByCategory: (category: string, subcategory?: string) => Product[]
  getFeatured: () => Product[]
  search: (query: string) => Product[]
  filterAndSearch: (category: string, subcategory: string, query: string) => Product[]
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  lastFetched: null,

  // Call this after any admin mutation (create / update / delete)
  // so the next fetchProducts() always hits Supabase fresh.
  invalidateCache: () => set({ lastFetched: null }),

  fetchProducts: async (force = false) => {
    const { lastFetched, loading } = get()
    const CACHE_TTL = 5 * 60 * 1000
    if (loading) return
    if (!force && lastFetched && Date.now() - lastFetched < CACHE_TTL) return

    set({ loading: true, error: null })
    try {
      const res = await fetch('/api/products', {
        // Bypass CDN/Next.js data cache — Zustand TTL is our cache layer.
        cache: 'no-store',
      })
      if (!res.ok) throw new Error('Failed to fetch products')
      const data: Product[] = await res.json()
      set({ products: data, loading: false, lastFetched: Date.now() })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
    }
  },

  getBySlug: (slug) => get().products.find(p => p.slug === slug),

  getByCategory: (category, subcategory) => {
    let results = get().products
    if (!category || category === 'All') return results
    results = results.filter(p => p.category === category)
    if (subcategory) {
      results = results.filter(p => p.subcategory === subcategory)
    }
    return results
  },

  getFeatured: () => get().products.filter(p => p.featured),

  search: (query) => {
    if (!query.trim()) return get().products
    const q = query.toLowerCase()
    return get().products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.short_description?.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
    )
  },

  filterAndSearch: (category, subcategory, query) => {
    let results = get().products

    if (category && category !== 'All') {
      results = results.filter(p => p.category === category)
    }

    if (subcategory) {
      results = results.filter(p => p.subcategory === subcategory)
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    }

    return results
  },
}))