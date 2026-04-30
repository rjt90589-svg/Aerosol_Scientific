'use client'


import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { useProductStore } from '@/lib/store/productStore'
import type { Product } from '@/types'


const DURATION = 4000


// ─── Static bg images served from /public/bg-img/ ────────────────────────────
// Indexed by slug — add an entry whenever you mark a new product as featured.
const BG_POOL = [
  '/bg-img/1.jpg',
  '/bg-img/2.jpg',
  '/bg-img/3.jpg',
  '/bg-img/4.jpg',
  '/bg-img/5.jpg',
  '/bg-img/1.jpg',
  '/bg-img/2.jpg',
  '/bg-img/3.jpg',
  '/bg-img/4.jpg',
  '/bg-img/5.jpg',
  '/bg-img/1.jpg',
  '/bg-img/2.jpg',
  '/bg-img/3.jpg',
  '/bg-img/4.jpg',
  '/bg-img/5.jpg',
]


const FALLBACK_BG = '/bg-img/1.jpg'


// ─── Map Supabase Product → slide shape ───────────────────────────────────────
function productToSlide(p: Product, index: number) {
  return {
    id:      p.id,
    tag:     p.category,
    title:   p.name,
    description: p.short_description ?? '',
    detail_description: p.description ?? '',
    model:   p.brand ?? '',
    slug:    p.slug,
    specs:   (p.tags ?? []).slice(0, 6),
    image:   p.image_url ?? '',
   bgImage: BG_POOL[index % BG_POOL.length],
  }
}


// ─── Per-element staggered slide-up wrapper ───────────────────────────────────
function SlideUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}


// ─── Full-screen Ken Burns background ────────────────────────────────────────
function SlideBackground({ bgImage, epoch }: { bgImage: string; epoch: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`bg-${epoch}`}
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      >
        <motion.img
          src={bgImage}
          alt=""
          aria-hidden
          className="absolute w-full h-full object-cover"
          style={{ scale: 1.12 }}
          initial={{ x: '6%' }}
          animate={{ x: '-6%' }}
          transition={{ duration: (DURATION + 900) / 1000, ease: 'linear' }}
        />
        {/* Heavy left overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:`linear-gradient(
  105deg,
  rgba(5,12,32,0.45) 40%,
  rgba(5,12,32,0.55) 45%,
  rgba(5,12,32,0.75) 80%,
  rgba(5,12,32,0.95) 120%
)`,
          }}
        />
        {/* Blue brand tint on left */}
        {/* <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(18,81,163,0.22) 0%, transparent 55%)' }}
        /> */}
        {/* Bottom vignette for nav bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to top, rgba(5,12,32,0.70) 0%, transparent 100%)' }}
        />
      </motion.div>
    </AnimatePresence>
  )
}


// ─── Skeleton shown on first load ────────────────────────────────────────────
function SliderSkeleton() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'min(90vh, 660px)', background: 'rgba(5,12,32,0.95)' }}
    >
      <div
        className="absolute inset-0 animate-pulse"
        style={{ background: 'linear-gradient(105deg, rgba(18,81,163,0.15) 0%, transparent 60%)' }}
      />
      <div className="relative z-10 flex items-center w-full" style={{ minHeight: 'min(90vh, 660px)' }}>
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 py-12 pb-28">
          <div className="flex flex-col gap-4 lg:pr-10">
            <div className="h-6 w-32 rounded-full animate-pulse" style={{ background: 'rgba(56,189,248,0.15)' }} />
            <div className="h-10 w-3/4 rounded-lg animate-pulse" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="h-4 w-1/3 rounded animate-pulse" style={{ background: 'rgba(56,189,248,0.12)' }} />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)', width: `${70 + i * 4}%` }} />
            ))}
          </div>
          <div className="flex items-center justify-center">
            <div
              className="rounded-full animate-pulse"
              style={{ width: 380, height: 380, background: 'rgba(56,189,248,0.06)', border: '1.5px dashed rgba(56,189,248,0.15)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}


// ─── Main slider ──────────────────────────────────────────────────────────────
export default function AnalabHeroSlider() {
  const { getFeatured, fetchProducts, loading } = useProductStore()


  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)
  const [epoch, setEpoch]     = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)


  // Kick off fetch once on mount — no-op if Zustand cache is still fresh
  useEffect(() => { fetchProducts() }, [fetchProducts])


 
const slides = getFeatured().map((p, i) => productToSlide(p, i))
  const goTo = useCallback((idx: number) => {
    setCurrent(idx)
    setEpoch(e => e + 1)
  }, [])


  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo, slides.length],
  )
  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo, slides.length],
  )


  // Auto-advance
  useEffect(() => {
    if (paused || slides.length === 0) return
    timerRef.current = setTimeout(next, DURATION)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [next, paused, current, slides.length])


  // Reset to slide 0 if the featured set changes after a cache refresh
  useEffect(() => {
    setCurrent(0)
    setEpoch(e => e + 1)
  }, [slides.length])


  if (loading && slides.length === 0) return <SliderSkeleton />
  if (!loading && slides.length === 0) return null


  const s = slides[current]


  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ minHeight: 'min(90vh, 660px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Full-screen panning background ── */}
      <SlideBackground bgImage={s.bgImage} epoch={epoch} />


      {/* ── Main content grid ── */}
      <div
        className="relative z-10 flex items-center w-full"
        style={{ minHeight: 'min(90vh, 660px)' }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 py-12 pb-28">


          {/* ──────── LEFT TEXT ──────── */}
          <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-10">
            <div key={epoch} className="flex flex-col">


              {/* Category badge */}
              <SlideUp delay={0}>
                <div className="mb-4">
                  <span
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border"
                    style={{
                      color: '#7dd3fc',
                      borderColor: 'rgba(125,211,252,0.35)',
                      background: 'rgba(125,211,252,0.10)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#38bdf8' }} />
                    {s.tag}
                  </span>
                </div>
              </SlideUp>


              {/* Product title */}
              <SlideUp delay={0.08}>
                <Link href={`/products/${s.slug}`}>
                  <h1
                    className="font-bold leading-tight mb-1 text-white hover:text-sky-300 transition-colors cursor-pointer"
                    style={{ fontSize: 'clamp(22px, 2.8vw, 42px)', textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
                  >
                    {s.title}
                  </h1>
                </Link>
              </SlideUp>


              {/* Model / brand */}
              <SlideUp delay={0.15}>
                <p className="font-semibold mb-5 tracking-wide" style={{ color: '#38bdf8', fontSize: '0.83rem' }}>
                  {s.model}
                </p>
              </SlideUp>

  
              {/* Specs (tags) */}
              {/* {s.specs.map((spec, i) => (
                <SlideUp key={`${epoch}-spec-${i}`} delay={0.2 + i * 0.07}>
                  <div className="flex items-start gap-2.5 text-sm mb-1.5" style={{ color: 'rgba(226,232,240,0.90)' }}>
                    <svg className="mt-1.25 shrink-0" width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <circle cx="6.5" cy="6.5" r="6" stroke="#38bdf8" strokeOpacity="0.35" />
                      <circle cx="6.5" cy="6.5" r="2.8" fill="#38bdf8" />
                    </svg>
                    <span>{spec}</span>
                  </div>
                </SlideUp>
              ))} */}


               <SlideUp >
                  <div className="flex items-start gap-2.5 text-sm mb-1.5" style={{ color: 'rgba(226,232,240,0.90)' }}>
                    <svg className="mt-1.25 shrink-0" width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <circle cx="6.5" cy="6.5" r="6" stroke="#38bdf8" strokeOpacity="0.35" />
                      <circle cx="6.5" cy="6.5" r="2.8" fill="#38bdf8" />
                    </svg>
                    <span>{s.detail_description}</span>
                  </div>
                </SlideUp>


              {/* CTA buttons */}
              <SlideUp delay={0.2 + s.specs.length * 0.07 + 0.07}>
                <div className="mt-7 flex items-center gap-3 flex-wrap">
                  <Link
                    href={`/products/${s.slug}`}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-md text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
                    style={{
                      background: 'linear-gradient(135deg, #1a5dab 0%, #0ea5e9 100%)',
                      boxShadow: '0 6px 28px rgba(14,165,233,0.35)',
                    }}
                  >
                    Know More
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href={`/contact?product=${encodeURIComponent(s.title)}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      color: '#bae6fd',
                      border: '1px solid rgba(186,230,253,0.25)',
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    Enquire
                  </Link>
                </div>
              </SlideUp>


            </div>
          </div>


          {/* ──────── RIGHT IMAGE ──────── */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <Link href={`/products/${s.slug}`} className="block w-full">
              <div
                className="relative w-full flex items-center justify-center cursor-pointer group"
                style={{ maxWidth: 500, aspectRatio: '1 / 1', margin: '0 auto' }}
              >
                {/* Glowing halo */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse 72% 62% at 50% 54%, rgba(56,189,248,0.18) 0%, transparent 68%)',
                  }}
                />


                {/* Slow-spinning outer ring */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: '6%', border: '1.5px dashed rgba(56,189,248,0.22)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
                />


                {/* Counter-spinning inner ring */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: '18%', border: '1px dashed rgba(56,189,248,0.12)' }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                />


                {/* Product image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`img-${epoch}`}
                    src={s.image}
                    alt={s.title}
                    draggable={false}
                    className="relative z-10 w-full h-full object-contain will-change-transform"
                    style={{ maxHeight: 430, filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.45))' }}
                    initial={{ opacity: 0, scale: 0.94, y: 12,  filter: 'blur(6px)' }}
                    animate={{ opacity: 1, scale: 1,    y: 0,   filter: 'blur(0px)' }}
                    exit={{    opacity: 0, scale: 1.04,  y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>


                {/* Hover pill */}
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20
                             px-4 py-1.5 rounded-full text-xs font-semibold text-white pointer-events-none
                             opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                             transition-all duration-200"
                  style={{ background: 'rgba(14,165,233,0.85)', backdropFilter: 'blur(8px)' }}
                >
                  View Details →
                </div>
              </div>
            </Link>
          </div>


        </div>
      </div>


      {/* ── Left accent bar ── */}
      <div
        className="absolute left-0 top-[10%] bottom-[10%] w-[3px] rounded-r-full pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, #38bdf8 22%, #38bdf8 78%, transparent)' }}
      />


      {/* ── Slide counter ── */}
      <div
        className="absolute top-5 right-6 sm:right-12 text-xs font-bold tabular-nums pointer-events-none"
        style={{ color: 'rgba(186,230,253,0.6)' }}
      >
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>


      {/* ── Bottom nav bar ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 border-t"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          background: 'rgba(5,12,32,0.75)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-3 flex items-center justify-between gap-4">


          {/* Dots */}
          <div className="flex items-center gap-2 flex-wrap">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 9999,
                  background: i === current ? '#38bdf8' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>


          {/* Auto-play progress bar */}
          <div
            className="flex-1 hidden sm:block max-w-[180px] rounded-full overflow-hidden"
            style={{ height: 2, background: 'rgba(255,255,255,0.1)' }}
          >
            {!paused && (
              <motion.div
                key={`prog-${current}`}
                style={{ height: '100%', background: '#38bdf8', borderRadius: 9999 }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DURATION / 1000, ease: 'linear' }}
              />
            )}
          </div>


          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            {[
              { fn: prev, icon: <ChevronLeft size={15} />, label: 'Previous' },
              { fn: next, icon: <ChevronRight size={15} />, label: 'Next' },
            ].map(({ fn, icon, label }) => (
              <button
                key={label}
                onClick={fn}
                aria-label={label}
                className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200"
                style={{ borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(186,230,253,0.6)', background: 'transparent' }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#38bdf8'
                  ;(e.currentTarget as HTMLButtonElement).style.color = '#38bdf8'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.18)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(186,230,253,0.6)'
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* ── Large side arrow buttons ── */}
      {[
        { fn: prev, label: 'Previous', icon: <ChevronLeft size={20} />, pos: 'left-3' },
        { fn: next, label: 'Next',     icon: <ChevronRight size={20} />, pos: 'right-3' },
      ].map(({ fn, label, icon, pos }) => (
        <button
          key={label}
          onClick={fn}
          aria-label={label}
          className={`hidden lg:flex absolute ${pos} top-1/2 -translate-y-8 z-10 w-12 h-12 rounded-full border items-center justify-center transition-all duration-200`}
          style={{
            borderColor: 'rgba(255,255,255,0.15)',
            color: 'rgba(186,230,253,0.55)',
            background: 'rgba(5,12,32,0.45)',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#38bdf8'
            ;(e.currentTarget as HTMLButtonElement).style.color = '#38bdf8'
            ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(56,189,248,0.25)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(186,230,253,0.55)'
            ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
          }}
        >
          {icon}
        </button>
      ))}
    </section>
  )
}



