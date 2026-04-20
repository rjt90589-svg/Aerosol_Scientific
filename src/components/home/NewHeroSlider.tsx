'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

// Analab-style: each slide has a left description panel + a right product/service image
// Uses the actual images from Aerosol Scientific's website
const slides = [
  {
    id: 1,
    badge: 'Chromatography Solutions',
    title: 'Premium GC & HPLC\nConsumables',
    desc: 'Genuine vials, septa and accessories from certified global partners — precision engineered for analytical excellence in pharma, food, and environmental labs.',
    specs: [
      { label: 'ND9, ND11, ND18, ND20', value: 'Thread Formats' },
      { label: 'Amber & Clear', value: 'Glass Types' },
      { label: '1.5mL – 40mL', value: 'Volume Range' },
    ],
    cta: 'Explore Products',
    ctaHref: '/products',
    cta2: 'Get a Quote',
    cta2Href: '/contact',
    // Right panel: product image
    rightImage: 'https://aerosolscientific.com/wp-content/uploads/2026/04/Wholesale-Amber-1-5ml-9mm-Vial-Screw-HPLC-Gc-Vial-V935-V937-Economy-.avif',
    rightBg: 'from-[#0D1F3C] to-[#0A2535]',
    accent: '#38BDF8',
    accentRgb: '56,189,248',
  },
  {
    id: 2,
    badge: 'Multivendor Support',
    title: 'GC, HPLC & LC-MS\nInstrument Service',
    desc: 'Expert multivendor support for Agilent, Sciex, Waters and Shimadzu instruments — installation, repairs, preventive maintenance at up to 40% lower cost.',
    specs: [
      { label: 'Agilent · Waters · Sciex · Shimadzu', value: 'Brands Supported' },
      { label: '24 Hours', value: 'Response SLA' },
      { label: 'Up to 40%', value: 'Cost Saving' },
    ],
    cta: 'Our Services',
    ctaHref: '/services',
    cta2: 'Contact Us',
    cta2Href: '/contact',
    rightImage: 'https://aerosolscientific.com/wp-content/uploads/2025/11/multivendor-1.jpg',
    rightBg: 'from-[#031A0D] to-[#0A1F3C]',
    accent: '#4ADE80',
    accentRgb: '74,222,128',
  },
  {
    id: 3,
    badge: 'Service Contracts',
    title: 'Comprehensive Lab\nMaintenance Contracts',
    desc: 'Scheduled preventive maintenance, breakdown repair, calibration, relocation and compliance services under one contract — saving cost and maximizing uptime.',
    specs: [
      { label: 'Comprehensive / Labor / Trade', value: 'Contract Types' },
      { label: 'Breakdown + PM + Calibration', value: 'Coverage' },
      { label: 'GLP/GMP Compliant', value: 'Documentation' },
    ],
    cta: 'View Service Plans',
    ctaHref: '/services#contracts',
    cta2: 'Get a Quote',
    cta2Href: '/contact',
    rightImage: 'https://aerosolscientific.com/wp-content/uploads/2025/11/SERVICE-CONTRACT-1.jpg',
    rightBg: 'from-[#1A0C0A] to-[#0A1F3C]',
    accent: '#FCD34D',
    accentRgb: '252,211,77',
  },
  {
    id: 4,
    badge: 'Lab Supplies',
    title: 'GC Columns, HPLC\nColumns & PM Kits',
    desc: 'High-quality GC & HPLC columns, liner and septa, PM kits, vials, caps, centrifuge tubes, pipette tips and sample prep accessories for all analytical instruments.',
    specs: [
      { label: 'GC, HPLC, Sample Prep', value: 'Supply Categories' },
      { label: 'All Major Brands', value: 'Compatibility' },
      { label: 'UAE & India', value: 'Quick Delivery' },
    ],
    cta: 'Browse Supplies',
    ctaHref: '/services#lab-supplies',
    cta2: 'Request Quote',
    cta2Href: '/contact',
    rightImage: 'https://aerosolscientific.com/wp-content/uploads/2025/11/GC-Column-2-1.jpg',
    rightBg: 'from-[#0A1A0A] to-[#0D1F3C]',
    accent: '#A78BFA',
    accentRgb: '167,139,250',
  },
  {
    id: 5,
    badge: 'Trainings & Workshop',
    title: 'Chromatography\nTraining Workshops',
    desc: 'Hands-on workshops covering HPLC & GC basics, method development, troubleshooting, basic repair and maintenance — for pharma, research, and academic institutions.',
    specs: [
      { label: 'HPLC, GC, Method Dev', value: 'Topics Covered' },
      { label: 'Academic & Corporate', value: 'For' },
      { label: 'Certificate Provided', value: 'On Completion' },
    ],
    cta: 'Enquire Training',
    ctaHref: '/services#training',
    cta2: 'Contact Us',
    cta2Href: '/contact',
    rightImage: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Trainings-Workshop-1.jpg',
    rightBg: 'from-[#0D0A1F] to-[#030A14]',
    accent: '#F472B6',
    accentRgb: '244,114,182',
  },
]

// ── Progress bar component ─────────────────────────────────────────────────
function ProgressBar({ duration, active, accent }: { duration: number; active: boolean; accent: string }) {
  return (
    <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
      {active && (
        <motion.div
          className="h-full rounded-full"
          style={{ background: accent }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      )}
    </div>
  )
}

const DURATION = 5500

export default function NewHeroSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setCurrent(idx)
  }, [])

  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length, -1), [current, go])
  const next = useCallback(() => go((current + 1) % slides.length, 1), [current, go])

  useEffect(() => {
    if (paused) return
    timerRef.current = setTimeout(next, DURATION)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [next, paused, current])

  const s = slides[current]

  const leftVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
  }

  const rightVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 0.96 }),
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 'min(92vh, 720px)', background: `linear-gradient(135deg, #030A14 0%, #0A1A30 60%, #040F1A 100%)` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Static bg grid */}
      <div className="absolute inset-0 sci-grid-dark opacity-25 pointer-events-none" />

      {/* Animated accent orb */}
      <AnimatePresence>
        <motion.div
          key={`orb-${s.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/3 right-1/3 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, rgba(${s.accentRgb},0.08) 0%, transparent 65%)` }}
        />
      </AnimatePresence>

      <div className="relative z-10 flex items-stretch" style={{ minHeight: 'min(92vh, 720px)' }}>
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.1fr_0.9fr] gap-0 items-center py-16">

          {/* ── LEFT: Text Content ── */}
          <div className="flex flex-col justify-center pr-0 lg:pr-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`left-${s.id}`}
                custom={direction}
                variants={leftVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 self-start mb-5 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em]"
                  style={{
                    background: `rgba(${s.accentRgb}, 0.1)`,
                    border: `1px solid rgba(${s.accentRgb}, 0.25)`,
                    color: s.accent,
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.accent }} />
                  {s.badge}
                </div>

                {/* Title */}
                <h1 className="font-bold text-white leading-[1.05] tracking-tight mb-5"
                  style={{ fontSize: 'clamp(32px, 4.2vw, 58px)' }}>
                  {s.title.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {i === 0 ? line : <span style={{ color: s.accent }}>{line}</span>}
                    </span>
                  ))}
                </h1>

                {/* Description */}
                <p className="text-white/50 leading-relaxed mb-7 max-w-lg font-light"
                  style={{ fontSize: 'clamp(14px, 1.3vw, 17px)' }}>
                  {s.desc}
                </p>

                {/* Specs table — Analab style */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {s.specs.map(spec => (
                    <div key={spec.label} className="rounded-xl p-3.5 border"
                      style={{
                        background: `rgba(${s.accentRgb}, 0.05)`,
                        borderColor: `rgba(${s.accentRgb}, 0.15)`,
                      }}>
                      <div className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: s.accent }}>
                        {spec.value}
                      </div>
                      <div className="text-[13px] font-semibold text-white/80 leading-tight">{spec.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  <Link href={s.ctaHref}
                    className="group flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, rgba(${s.accentRgb},0.2), rgba(${s.accentRgb},0.35))`,
                      border: `1.5px solid rgba(${s.accentRgb},0.45)`,
                      color: s.accent,
                    }}>
                    {s.cta}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href={s.cta2Href}
                    className="flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl border border-white/12 bg-white/5 hover:bg-white/10 text-white/65 hover:text-white transition-all duration-300 hover:-translate-y-0.5">
                    {s.cta2}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Product Image ── */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`right-${s.id}`}
                custom={direction}
                variants={rightVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[520px]"
              >
                {/* Card frame */}
                <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${s.rightBg} aspect-[4/3] shadow-2xl`}
                  style={{ boxShadow: `0 30px 80px rgba(${s.accentRgb},0.15), 0 0 0 1px rgba(${s.accentRgb},0.1)` }}>

                  {/* Image */}
                  <img
                    src={s.rightImage}
                    alt={s.badge}
                    className="w-full h-full object-cover opacity-85"
                    style={{ objectPosition: 'center' }}
                  />

                  {/* Gradient overlay for polish */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20" />

                  {/* Bottom label */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="glass-dark rounded-xl px-3.5 py-2 backdrop-blur-md border border-white/10">
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5" style={{ color: s.accent }}>{s.badge}</div>
                      <div className="text-[12px] font-semibold text-white/80">Aerosol Scientific</div>
                    </div>
                    <div className="w-9 h-9 rounded-full glass-dark border border-white/15 flex items-center justify-center"
                      style={{ background: `rgba(${s.accentRgb},0.15)` }}>
                      <span className="text-sm">🔬</span>
                    </div>
                  </div>

                  {/* Accent glow edge */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{ boxShadow: `inset 0 0 60px rgba(${s.accentRgb},0.06)` }} />
                </div>

                {/* Floating stats badge */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 glass-dark rounded-2xl px-4 py-3 border border-white/10 shadow-xl"
                >
                  <div className="text-[22px] font-bold text-white">500+</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Products</div>
                </motion.div>

                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="absolute -bottom-4 -left-4 glass-dark rounded-2xl px-4 py-3 border border-white/10 shadow-xl"
                >
                  <div className="text-[22px] font-bold" style={{ color: s.accent }}>24hr</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Response</div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Bottom navigation bar (Analab style) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/[0.06]"
        style={{ background: 'rgba(3,10,20,0.7)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-5 divide-x divide-white/[0.06]">
            {slides.map((sl, i) => (
              <button
                key={sl.id}
                onClick={() => go(i, i > current ? 1 : -1)}
                className={`relative flex flex-col items-start px-3 py-3.5 transition-all text-left group ${
                  i === current ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]'
                }`}
              >
                {/* Progress bar */}
                <div className="w-full mb-2">
                  <ProgressBar duration={DURATION} active={i === current && !paused} accent={sl.accent} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.12em] leading-tight transition-colors hidden sm:block ${
                  i === current ? 'text-white' : 'text-white/30 group-hover:text-white/50'
                }`}>
                  {sl.badge}
                </span>
                {/* Mobile: just dots */}
                <div className={`sm:hidden w-full flex justify-center mt-1 ${i === current ? '' : 'opacity-30'}`}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === current ? sl.accent : 'white' }} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev} aria-label="Previous"
        className="absolute left-3 md:left-5 top-1/2 -translate-y-8 w-10 h-10 rounded-full glass-dark border border-white/10 text-white flex items-center justify-center transition-all hover:scale-110 hover:border-white/25 z-10 group">
        <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button onClick={next} aria-label="Next"
        className="absolute right-3 md:right-5 top-1/2 -translate-y-8 w-10 h-10 rounded-full glass-dark border border-white/10 text-white flex items-center justify-center transition-all hover:scale-110 hover:border-white/25 z-10 group">
        <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </section>
  )
}