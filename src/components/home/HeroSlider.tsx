'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/multivendor-1.jpg',
    eyebrow: 'Chromatography Solutions',
    title: ['Premium GC & HPLC', 'Consumables'],
    sub: 'Genuine vials, septa and accessories from certified global partners — precision engineered for analytical excellence.',
    cta: { label: 'Explore Products', href: '/products' },
    cta2: { label: 'Get a Quote', href: '/contact' },
    accent: '#00F5FF',
    rgb: '0,245,255',
  },
  {
    id: 2,
    image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/multivendor-350x204.jpg',
    eyebrow: 'Laboratory Instruments',
    title: ['World-Class', 'Lab Instruments'],
    sub: 'Analytical, Life Sciences and General Laboratory instruments from Agilent, Waters, Shimadzu and 15+ global OEM manufacturers.',
    cta: { label: 'View Equipment', href: '/products' },
    cta2: { label: 'Our Partners', href: '/partners' },
    accent: '#4ADE80',
    rgb: '74,222,128',
  },
  {
    id: 3,
    image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Trainings-Workshop-1.jpg',
    eyebrow: 'Turnkey Lab Projects',
    title: ['Complete Laboratory', 'Setup — End to End'],
    sub: 'From concept and design to full commissioning — instruments, furniture, fume hoods, gas systems, SS furniture and full GLP compliance.',
    cta: { label: 'Our Services', href: '/services' },
    cta2: { label: 'Contact Us', href: '/contact' },
    accent: '#C084FC',
    rgb: '192,132,252',
  },
  {
    id: 4,
    image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/SERVICE-CONTRACT-1.jpg',
    eyebrow: 'After-Sales Service',
    title: ['Expert Maintenance', '& Technical Support'],
    sub: 'Preventive maintenance, repair, calibration and technical support for LCMS, HPLC, GC, GCMS instruments — guaranteed 24-hour response.',
    cta: { label: 'Service Plans', href: '/services' },
    cta2: { label: 'Get Support', href: '/contact' },
    accent: '#FCD34D',
    rgb: '252,211,77',
  },
  {
    id: 5,
    image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/multivendor-2.jpg',
    eyebrow: 'Multi-Vendor Support',
    title: ['Elevating', 'Lab Excellence'],
    sub: 'Expert support for Agilent, Sciex, Waters, Shimadzu across UAE and India — delivering quality service at up to 40% lower cost.',
    cta: { label: 'Learn More', href: '/about' },
    cta2: { label: 'All Partners', href: '/partners' },
    accent: '#38BDF8',
    rgb: '56,189,248',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setCurrent(idx)
  }, [])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1)
  }, [current, goTo])

  useEffect(() => {
    const t = setInterval(next, 5500)
    return () => clearInterval(t)
  }, [next])

  const s = slides[current]

  return (
    <section className="relative overflow-hidden bg-[#030A14]" style={{ minHeight: 'min(100vh, 500px)' }}>

      {/* Background image with AnimatePresence for crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${s.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4) saturate(1.1)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Static overlays */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10 pointer-events-none" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" /> */}
      {/* <div className="absolute inset-0 sci-grid-dark opacity-15 pointer-events-none" /> */}

      {/* Color accent glow */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`glow-${s.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 50%, rgba(${s.rgb},0.12), transparent 60%)` }}
        />
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex items-center" style={{ minHeight: 'min(90vh, 700px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
          <div className="max-w-170">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${s.id}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]"
                    style={{
                      background: `rgba(${s.rgb}, 0.12)`,
                      border: `1px solid rgba(${s.rgb}, 0.3)`,
                      color: s.accent,
                    }}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse mr-2 align-middle" style={{ background: s.accent }} />
                    {s.eyebrow}
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-bold text-white leading-[1.05] tracking-tight mb-5"
                  style={{ fontSize: 'clamp(36px, 5vw, 66px)' }}>
                  {s.title.map((line, i) => (
                    <span key={i} className="block">
                      {i === 1
                        ? <span style={{ color: s.accent }}>{line}</span>
                        : line}
                    </span>
                  ))}
                </h1>

                {/* Subtitle */}
                <p className="text-white/55 leading-relaxed mb-9 font-light max-w-xl"
                  style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
                  {s.sub}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mb-12">
                  <Link href={s.cta.href}
                    className="group inline-flex items-center gap-2.5 font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: `rgba(${s.rgb}, 0.14)`,
                      border: `1.5px solid rgba(${s.rgb}, 0.4)`,
                      color: s.accent,
                    }}>
                    {s.cta.label}
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href={s.cta2.href}
                    className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-xl border border-white/15 bg-white/6 hover:bg-white/12 text-white/70 hover:text-white transition-all duration-300 hover:-translate-y-0.5">
                    {s.cta2.label}
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 pt-7 border-t border-white/[0.08]">
                  {[
                    { val: '500+', lbl: 'Product SKUs' },
                    { val: '15+', lbl: 'Global Partners' },
                    { val: '10+', lbl: 'Years Experience' },
                    { val: '24hr', lbl: 'SLA Response' },
                  ].map((st, i) => (
                    <div key={i}>
                      <div className="font-bold text-[22px] leading-tight"
                        style={{ color: i === 0 ? s.accent : 'rgba(255,255,255,0.85)' }}>
                        {st.val}
                      </div>
                      <div className="text-[11px] text-white/35 uppercase tracking-wider mt-0.5">{st.lbl}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Thumbnail strip — desktop right */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-2">
        {slides.map((sl, i) => (
          <button key={sl.id} onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
              i === current ? 'w-16 h-11 opacity-100' : 'w-11 h-8 opacity-35 hover:opacity-65'
            }`}>
            <img src={sl.image} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.7)' }} />
            {i === current && (
              <div className="absolute inset-0 rounded-xl border-2" style={{ borderColor: s.accent }} />
            )}
          </button>
        ))}
      </div>

      {/* Arrows */}
      {[
        { fn: prev, Icon: ChevronLeft, pos: 'left-4 md:left-6', hover: '-translate-x-0.5' },
        { fn: next, Icon: ChevronRight, pos: 'right-20 xl:right-24', hover: 'translate-x-0.5' },
      ].map(({ fn, Icon, pos, hover }) => (
        <button key={pos} onClick={fn} aria-label="Navigate"
          className={`absolute ${pos} top-1/2 -translate-y-1/2 w-11 h-11 rounded-full z-10 flex items-center justify-center transition-all hover:scale-110 glass-dark border border-white/12 text-white group`}>
          <Icon size={20} className={`group-hover:${hover} transition-transform`} />
        </button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i, i > current ? 1 : -1)} aria-label={`Slide ${i + 1}`}>
            <span className={`block rounded-full transition-all duration-400 ${
              i === current ? 'w-7 h-2.5' : 'w-2.5 h-2.5 opacity-30 hover:opacity-60'
            }`}
            style={{ background: i === current ? s.accent : 'white' }} />
          </button>
        ))}
      </div>
{/* Bottom ticker */}
      <div className="absolute  bottom-0 left-0 right-0 h-8 overflow-hidden border-t border-white/5 z-10"
        style={{ background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(4px)' }}>
        <div className="flex items-center h-full animate-ticker whitespace-nowrap">
          {[0, 1, 2].map((_, i) => (
            <span key={i} className="text-[10px] text-white/80 uppercase tracking-[0.14em] font-mono pr-16">
              AEROSOL SCIENTIFIC &nbsp;·&nbsp; UAE + INDIA &nbsp;·&nbsp; HPLC · GC · LCMS &nbsp;·&nbsp; TURNKEY LAB PROJECTS &nbsp;·&nbsp; CHROMATOGRAPHY CONSUMABLES &nbsp;·&nbsp; 24HR SUPPORT &nbsp;·&nbsp; ISO CERTIFIED &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>
      
    </section>
  )
}