'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown, FlaskConical, ArrowRight,
  Search, Package, Phone, Loader2
} from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface SearchResult {
  id: string
  name: string
  slug: string
  category: string
  image_url: string
  short_description: string
}

const SERVICE_QUICK = [
  { label: 'Turnkey Lab Projects', href: '/services#turnkey', icon: '🔬' },
  { label: 'Multi-Vendor Support', href: '/services#multivendor', icon: '⚙️' },
  { label: 'Service Contracts', href: '/services#contracts', icon: '📋' },
  { label: 'Training & Workshop', href: '/services#training', icon: '🎓' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? (y / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return }
    setSearching(true)
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('id,name,slug,category,image_url,short_description')
        .or(`name.ilike.%${q}%,category.ilike.%${q}%,short_description.ilike.%${q}%`)
        .limit(6)
      setResults(data || [])
    } finally {
      setSearching(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => doSearch(query), 280)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, doSearch])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const handleResult = (slug: string) => {
    setSearchOpen(false)
    setQuery('')
    router.push(`/products/${slug}`)
  }

  return (
    <>
      <nav className={cn(
        'sticky top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-[0_2px_30px_rgba(18,81,163,0.1)] border-b border-[rgba(18,81,163,0.07)]'
          : 'bg-white border-b border-[rgba(18,81,163,0.05)]'
      )}>
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#1251A3] via-[#0891B2] to-[#22D3EE] transition-[width] duration-150 pointer-events-none"
          style={{ width: `${scrollPct}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[70px] gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1251A3] to-[#0891B2] rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1251A3] to-[#0891B2] flex items-center justify-center shadow-lg">
                  <FlaskConical size={19} className="text-white" />
                </div>
              </div>
              <div className="leading-none">
                <span className="font-bold text-[18px] text-[#050E1D] tracking-tight block">Aerosol</span>
                <span className="text-[9px] uppercase tracking-[0.28em] text-[#0891B2] font-semibold block">Scientific</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200',
                      isActive(link.href)
                        ? 'text-[#1251A3] bg-[rgba(18,81,163,0.07)]'
                        : 'text-[#3D5276] hover:text-[#1251A3] hover:bg-[rgba(18,81,163,0.05)]'
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown size={12} className={cn(
                        'transition-transform duration-200 opacity-60',
                        dropdown === link.label ? 'rotate-180' : ''
                      )} />
                    )}
                  </Link>

                  {link.children && (
                    <AnimatePresence>
                      {dropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 pt-3"
                        >
                          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(18,81,163,0.15)] border border-[rgba(18,81,163,0.08)] py-2 min-w-[220px] overflow-hidden">
                            <div className="h-0.5 w-full bg-gradient-to-r from-[#1251A3] to-[#0891B2] mb-2" />
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setDropdown(null)}
                                className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#3D5276] hover:text-[#1251A3] hover:bg-[rgba(18,81,163,0.04)] transition-colors group/item"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2] opacity-50 group-hover/item:opacity-100 transition-opacity shrink-0" />
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Search + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Live Search */}
              <div ref={searchRef} className="relative">
                <div className={cn(
                  'flex items-center gap-2 border rounded-xl transition-all duration-300 overflow-hidden',
                  searchOpen
                    ? 'bg-white border-[#1251A3] shadow-[0_0_0_3px_rgba(18,81,163,0.1)] w-64'
                    : 'bg-[rgba(18,81,163,0.04)] border-[rgba(18,81,163,0.1)] w-44 hover:w-52'
                )}>
                  <Search size={14} className="ml-3 text-[#7B90B2] shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    placeholder="Search products…"
                    className="py-2.5 pr-3 text-[13px] bg-transparent outline-none text-[#0A1628] placeholder-[#7B90B2] w-full font-medium"
                    onFocus={() => setSearchOpen(true)}
                    onChange={e => setQuery(e.target.value)}
                    autoComplete="off"
                    suppressHydrationWarning
                  />
                  {searching && <Loader2 size={13} className="mr-3 text-[#1251A3] animate-spin shrink-0" />}
                  {query && !searching && (
                    <button onClick={() => { setQuery(''); setResults([]) }} className="mr-2 text-[#7B90B2] hover:text-[#1251A3] transition-colors">
                      <X size={13} />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-[420px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(18,81,163,0.18)] border border-[rgba(18,81,163,0.08)] overflow-hidden z-50"
                    >
                      <div className="h-0.5 bg-gradient-to-r from-[#1251A3] to-[#0891B2]" />

                      {results.length > 0 && (
                        <>
                          <div className="px-4 pt-3 pb-2 flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7B90B2]">Products</span>
                            <Link href={`/products?search=${encodeURIComponent(query)}`} onClick={() => setSearchOpen(false)}
                              className="text-[11px] text-[#1251A3] hover:underline font-semibold">
                              View all →
                            </Link>
                          </div>
                          {results.map(product => (
                            <button key={product.id} onMouseDown={() => handleResult(product.slug)}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[rgba(18,81,163,0.04)] border-t border-[rgba(18,81,163,0.04)] text-left transition-colors">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center overflow-hidden shrink-0">
                                {product.image_url
                                  ? <img src={product.image_url} alt="" className="w-full h-full object-contain p-1" />
                                  : <Package size={16} className="text-[#1251A3]" />
                                }
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold text-[#0A1628] truncate">{product.name}</p>
                                <p className="text-[11px] text-[#7B90B2]">{product.category}</p>
                              </div>
                              <ArrowRight size={12} className="text-[#1251A3] opacity-40 shrink-0" />
                            </button>
                          ))}
                        </>
                      )}

                      {query.trim() && !searching && results.length === 0 && (
                        <p className="text-[12px] text-[#7B90B2] text-center py-5">No results for "{query}"</p>
                      )}

                      <div className="px-4 pt-3 pb-1 border-t border-[rgba(18,81,163,0.05)]">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7B90B2]">Quick Links</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 p-2 pb-3">
                        {SERVICE_QUICK.map(s => (
                          <Link key={s.href} href={s.href} onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-[rgba(18,81,163,0.04)] transition-colors">
                            <span>{s.icon}</span>
                            <span className="text-[12px] font-medium text-[#3D5276]">{s.label}</span>
                          </Link>
                        ))}
                      </div>
                      {!query && <p className="text-[11px] text-[#7B90B2] text-center pb-4">Try "vial", "septa", "crimper"…</p>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/contact"
                className="group flex items-center gap-2 bg-gradient-to-r from-[#1251A3] to-[#0891B2] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold shadow-[0_4px_20px_rgba(18,81,163,0.3)] hover:shadow-[0_8px_30px_rgba(18,81,163,0.4)] transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap">
                <Phone size={13} />
                Get a Quote
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-[rgba(18,81,163,0.06)] transition-colors"
              suppressHydrationWarning
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-5 border-b border-[rgba(18,81,163,0.08)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1251A3] to-[#0891B2] flex items-center justify-center">
                      <FlaskConical size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-[#050E1D]">Aerosol Scientific</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} suppressHydrationWarning><X size={18} /></button>
                </div>
              </div>
              <nav className="p-4 space-y-1">
                {NAV_LINKS.map(link => (
                  <div key={link.href}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)}
                      className={cn('block px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                        isActive(link.href) ? 'bg-[rgba(18,81,163,0.07)] text-[#1251A3]' : 'text-[#3D5276] hover:bg-gray-50 hover:text-[#1251A3]'
                      )}>
                      {link.label}
                    </Link>
                    {link.children?.map(c => (
                      <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)}
                        className="block pl-8 py-2 text-[13px] text-[#7B90B2] hover:text-[#1251A3]">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link href="/contact" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#1251A3] to-[#0891B2] text-white px-4 py-3 rounded-xl text-sm font-bold mt-3">
                  <Phone size={14} /> Get a Quote
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}