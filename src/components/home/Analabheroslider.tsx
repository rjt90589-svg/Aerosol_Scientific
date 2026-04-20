'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

// ─── Slide data — each slide links to its Supabase-backed product detail page ──
const slides = [
  {
    id: 1,
    tag: 'pH / mV / ORP / °C',
    title: 'pH/mV/ORP/°C Analyzer',
    model: 'µpHCal100',
    slug: 'ph-mv-orp-temperature-analyzer-uphcal100',
    specs: [
      'pH Range : -2.000 to 20.000 pH',
      'Resolution : 0.1 / 0.01 / 0.001 pH',
      'ORP - mV / RmV : ± 2000.0',
      'Temperature Range : -5.0 to 130.0°C',
      'Multipoint Calibration',
      'Auto Buffer Recognition',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/1._pH-mV-ºC-ORP_Analyzer_-_µpHCal100_(1).png',
    bgImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=85',
  },
  {
    id: 2,
    tag: 'Portable Analyzer',
    title: 'Handheld pH/mV/°C Analyzer',
    model: 'µpHCal Handheld',
    slug: 'handheld-ph-mv-temperature-analyzer-uphcal',
    specs: [
      'pH Range: -1.000 to 15.00 pH',
      'Resolution: 0.01 pH',
      'Temperature Range: 0 to 130.0°C',
      'Onsite temperature calibration',
      'Slope: 80 – 120%',
      'Auto Buffer Recognition',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/pHCalHandheld_New_1200x480px.png',
    bgImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1920&q=85',
  },
  {
    id: 3,
    tag: 'Karl Fischer',
    title: 'Karl Fischer Titrator',
    model: 'µAquaCal100',
    slug: 'karl-fischer-titrator-uaquacal100',
    specs: [
      'Moisture Estimation by Volumetric Method',
      'Better than 50 ppm to 100%',
      'Auto Flushing & Auto Drain',
      'Onsite Volume Calibration / Validation',
      'Weight Entry - 0.1 / 0.01 mg & transfer of weight',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/6.-Karl-Fischer-Titrator---µAquaCal100.png',
    bgImage: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=1920&q=85',
  },
  {
    id: 4,
    tag: 'Titration',
    title: 'Auto Titrator',
    model: 'µTitraCal50',
    slug: 'auto-titrator-utitracal50',
    specs: [
      'Acid / Base Titration',
      'Aqueous / Non-Aqueous Titration',
      'Amperometric, Redox & Chelatemetric Titration',
      'Argentometric for Cl, Br, I and Cyanide',
      'Lubricant Oil Analysis – TAN and TBN',
      'Silver assay for hallmarking',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/7.-Auto-Titrator---µTitraCal50.png',
    bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=85',
  },
  {
    id: 5,
    tag: 'Thermal Analysis',
    title: 'Automatic Melting Point Apparatus',
    model: 'µThermoCal50 (Block Type)',
    slug: 'automatic-melting-point-apparatus-uthermocal50',
    specs: [
      'Temperature Range : +5°C above ambient to 400°C',
      'Heating Rates : 0.1 to 20.0°C/min',
      'Three different sample analysis in single run',
      'Recording of melting pattern via CapillaryVIEW',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/9.-Automatic-Melting-Point-Apparatus---Block-Type---µThermoCal50.png',
    bgImage: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1920&q=85',
  },
  {
    id: 6,
    tag: 'Thermal Analysis',
    title: 'Melting / Boiling Point Apparatus',
    model: 'µThermoCal25 (Silicon Oil)',
    slug: 'melting-boiling-point-apparatus-uthermocal25',
    specs: [
      'Temperature Range: +5°C above ambient to 300°C',
      'Readability: 1.0 OR 0.1°C',
      'Onsite calibration with calibrated thermometer',
      'Heating Rate After Set Point: ~1.0°C/min',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/8B.-Melting---Boiling-Point-Apparatus---Silicon-Oil-Type---µThermoCal25.png',
    bgImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1920&q=85',
  },
  {
    id: 7,
    tag: 'Flame Photometry',
    title: 'Flame Photometer',
    model: 'µFlameCal50',
    slug: 'flame-photometer-uflamecal50',
    specs: [
      'Element Range: Na, K, Li : 1–200 ppm',
      'Ca : 15–300 ppm, Ba : 50–3000 ppm',
      'Sensitivity: Na / K / Li 0.5 ppm',
      'Units: ppm, mg/L, meq/L and mmol/L',
      'Calibration: Up to 5 standards per element',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/10.-Flame-Photometer---µFlameCal50.png',
    bgImage: 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?w=1920&q=85',
  },
  {
    id: 8,
    tag: 'Ultrasonic Bath',
    title: 'Ultrasonic Bath with Heater',
    model: 'IGBT Based',
    slug: 'ultrasonic-bath-with-heater-igbt',
    specs: [
      'Technology : Latest IGBT Based',
      'Temperature Range : 5°C above ambient to 80°C',
      'Transducer Frequency : 33 ±3 KHz',
      'Auto Degassing : Yes, user adjustable time',
      'Display Frequency : Yes',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/11.-Ultrasonic-Bath-with-Heater.png',
    bgImage: 'https://images.unsplash.com/photo-1614308460141-d1b7c7b9fb4b?w=1920&q=85',
  },
  {
    id: 9,
    tag: 'Ultrasonic Bath',
    title: 'Ultrasonic Bath with Chiller',
    model: 'IGBT Based + Compressor',
    slug: 'ultrasonic-bath-with-chiller-igbt',
    specs: [
      'Technology : Latest IGBT Based',
      'Temperature Display: 5°C to Room Temperature',
      'Compressor: In-built with system',
      'Transducer Frequency : 33 ±3 KHz',
      'Auto Degassing : Yes, user adjustable time',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/12.-Ultrasonic-Bath-with-Chiller.png',
    bgImage: 'https://images.unsplash.com/photo-1606206873764-fd2b8a23a9e3?w=1920&q=85',
  },
  {
    id: 10,
    tag: 'Tablet Testing',
    title: 'Friability Test Apparatus',
    model: 'µFTCal50',
    slug: 'friability-test-apparatus-uftcal50',
    specs: [
      'Speed : Variable from 20 to 70 RPM',
      'Timer : Variable up to 9 hrs 59 min 59 sec',
      'Counter : 1 to 9999 revolutions',
      '10° Tilt : With Audio Visual Alert',
      'Power Failure Detection — auto resume',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/FTcal-50-slider-600x600.png',
    bgImage: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=1920&q=85',
  },
  {
    id: 11,
    tag: 'Tablet Testing',
    title: 'Tap Density Test Apparatus',
    model: 'µTDCal50',
    slug: 'tap-density-test-apparatus-utdcal50',
    specs: [
      'No. of Station : USP1 (300 taps per min.)',
      'Stroke Height : 14 mm ± 2mm / 3mm ± 0.2 mm',
      'Stroke / Minute : 300 ± 15, 250 ± 15',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/15.-Tap-Density-Test-Apparatus---µTDCal50---LOW-RESOLUTION.png',
    bgImage: 'https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?w=1920&q=85',
  },
  {
    id: 12,
    tag: 'Gas Generator',
    title: 'Nitrogen / Zero Air Combination Gas Generator',
    model: 'NZA-2300 / NZA-4800',
    slug: 'nitrogen-zero-air-gas-generator-nza',
    specs: [
      'N₂: 300 ml/min, Zero Air: 2000 ml/min @ 6 Kg/cm² (NZA-2300)',
      'N₂: 800 ml/min, Zero Air: 4000 ml/min @ 6 Kg/cm² (NZA-4800)',
      'Suitable for two/three or five/six GC instruments',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/17.-Nitrogen-Gas-Generator-for-GC.png',
    bgImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=85',
  },
  {
    id: 13,
    tag: 'Gas Handling',
    title: 'Gas Handling and Purification System',
    model: 'GHS-Plus-01 to 04',
    slug: 'gas-handling-purification-system-ghs-plus',
    specs: [
      'For Hydrogen, Nitrogen, Zero Air & Helium Gas Line',
      'GHS-Plus-01 : For Any One Gas',
      'GHS-Plus-02 : For Any Two Gases',
      'GHS-Plus-03 : For Any Three Gases',
      'GHS-Plus-04 : For Any Four Gases',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/GHS-Plus-04_Slider-600x600px.png',
    bgImage: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1920&q=85',
  },
  {
    id: 14,
    tag: 'Gas Alarm',
    title: 'Gas Alarm System',
    model: 'GAS-8',
    slug: 'gas-alarm-system-gas8',
    specs: [
      'Pressure Range : ≤200 kg/cm²',
      'Resolution : 0.5 kg/cm²',
      'Number of Gas : Maximum Eight Gas Lines',
      'Connector : Water proof Male & Female',
      'Visual Alarm : Red and Green LED Light',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/24.-Gas-Alarm-System.png',
    bgImage: 'https://images.unsplash.com/photo-1548407260-da850faa41e3?w=1920&q=85',
  },
  {
    id: 15,
    tag: 'Lab Infrastructure',
    title: 'Laboratory Furniture & Fume Hood',
    model: 'Custom Built',
    slug: 'laboratory-furniture-fume-hood',
    specs: [
      'Laboratory Furniture',
      'Laboratory Fume Hood',
      'Laboratory Stand Alone',
      'Laboratory Utilities',
    ],
    image: 'https://www.analab.co.in/files/catalog/slider/slider_product/Laboratory-Furniture-Homepage.jpg',
    bgImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=85',
  },
]

const DURATION = 3000

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

// ─── Full-screen Ken Burns background — pans right → left per slide ───────────
function SlideBackground({ slide, epoch }: { slide: typeof slides[0]; epoch: number }) {
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
          src={slide.bgImage}
          alt=""
          aria-hidden
          className="absolute w-full h-full object-cover"
          style={{ scale: 1.12 }}
          initial={{ x: '6%' }}
          animate={{ x: '-6%' }}
          transition={{ duration: (DURATION + 900) / 1000, ease: 'linear' }}
        />
        {/* Heavy left overlay for text legibility, transparent on right */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              105deg,
              rgba(5,12,32,0.92) 0%,
              rgba(5,12,32,0.80) 35%,
              rgba(5,12,32,0.50) 60%,
              rgba(5,12,32,0.25) 100%
            )`,
          }}
        />
        {/* Blue brand tint on left */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(18,81,163,0.22) 0%, transparent 55%)' }}
        />
        {/* Bottom vignette for nav bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to top, rgba(5,12,32,0.70) 0%, transparent 100%)' }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Main slider ──────────────────────────────────────────────────────────────
export default function AnalabHeroSlider() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)
  const [epoch, setEpoch]     = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback((idx: number) => {
    setCurrent(idx)
    setEpoch(e => e + 1)
  }, [])

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])
  const next = useCallback(() => goTo((current + 1) % slides.length),                 [current, goTo])

  useEffect(() => {
    if (paused) return
    timerRef.current = setTimeout(next, DURATION)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [next, paused, current])

  const s = slides[current]

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ minHeight: 'min(90vh, 660px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Full-screen panning background ── */}
      <SlideBackground slide={s} epoch={epoch} />

      {/* ── Main content grid ── */}
      <div
        className="relative z-10 flex items-center w-full"
        style={{ minHeight: 'min(90vh, 660px)' }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 py-12 pb-28">

          {/* ──────── LEFT TEXT ──────── */}
          <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-10">
            <div key={epoch} className="flex flex-col">

              {/* Tag badge */}
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

              {/* Product title — clicking goes to detail page */}
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

              {/* Model number */}
              <SlideUp delay={0.15}>
                <p className="font-semibold mb-5 tracking-wide" style={{ color: '#38bdf8', fontSize: '0.83rem' }}>
                  {s.model}
                </p>
              </SlideUp>

              {/* Specs */}
              {s.specs.map((spec, i) => (
                <SlideUp key={`${epoch}-spec-${i}`} delay={0.2 + i * 0.07}>
                  <div className="flex items-start gap-2.5 text-sm mb-1.5" style={{ color: 'rgba(226,232,240,0.90)' }}>
                    <svg className="mt-[5px] shrink-0" width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <circle cx="6.5" cy="6.5" r="6" stroke="#38bdf8" strokeOpacity="0.35" />
                      <circle cx="6.5" cy="6.5" r="2.8" fill="#38bdf8" />
                    </svg>
                    <span>{spec}</span>
                  </div>
                </SlideUp>
              ))}

              {/* CTA buttons */}
              <SlideUp delay={0.2 + s.specs.length * 0.07 + 0.07}>
                <div className="mt-7 flex items-center gap-3 flex-wrap">

                  {/* Primary: Know More → product detail page */}
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

                  {/* Secondary: Enquire (pre-fills product name in contact form) */}
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

          {/* ──────── RIGHT IMAGE — clickable to detail page ──────── */}
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
                    background:
                      'radial-gradient(ellipse 72% 62% at 50% 54%, rgba(56,189,248,0.18) 0%, transparent 68%)',
                  }}
                />

                {/* Slow-spinning dashed ring */}
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
                    className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    style={{ maxHeight: 430, filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.55))' }}
                    draggable={false}
                    initial={{ opacity: 0, scale: 0.80 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.28 } }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>

                {/* "View Details" pill that appears on hover */}
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