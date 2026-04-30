'use client'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { PARTNERS } from '@/lib/constants'
import { ScrollVelocity } from '@/components/ui/ScrollVelocity' // adjust import path

// ── Split partners into two rows for alternating scroll directions ────────────
const ROW_1 = PARTNERS.slice(0, Math.ceil(PARTNERS.length / 2))
const ROW_2 = PARTNERS.slice(Math.ceil(PARTNERS.length / 2))

// ── Partner card — used inside the velocity scroller ─────────────────────────
function PartnerCard({ partner }: { partner: typeof PARTNERS[number] }) {
  return (
    <a
      href={partner.href}
      className="group inline-flex flex-col items-center gap-4  rounded-2xl  bg-white  transition-all duration-300 cursor-pointer select-none"
      style={{ minWidth: 130 }}
    >
      <div className="w-22 h-22 relative rounded-xl hover:border-[rgba(18,81,163,0.22)] hover:shadow-[0_8px_32px_rgba(18,81,163,0.10)] overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <img
          src={partner.logo}
          alt={partner.name}
          className="w-full h-full object-contain p-1.5 group-hover:scale-110 transition-all duration-300"
        />
      </div>
      <span className="text-[11px] font-semibold text-[#7B90B2] group-hover:text-[#1251A3] text-center leading-tight transition-colors whitespace-nowrap">
        {partner.name}
      </span>
    </a>
  )
}

// ── Build JSX strings for each row — ScrollVelocity renders children ─────────
// We pass the rendered cards as children via a wrapper approach.
// Since ScrollVelocity accepts `texts` as string[], we instead use it
// in "children" mode by rendering VelocityRow directly.

import { useRef, useLayoutEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion'

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    function update() {
      if (ref.current) setWidth(ref.current.offsetWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [ref])
  return width
}

interface VelocityRowProps {
  children: React.ReactNode
  baseVelocity?: number
  numCopies?: number
}

function VelocityRow({ children, baseVelocity = 60, numCopies = 4 }: VelocityRowProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  const copyRef = useRef<HTMLDivElement>(null)
  const copyWidth = useElementWidth(copyRef)

  function wrap(min: number, max: number, v: number) {
    const range = max - min
    return (((v - min) % range) + range) % range + min
  }

  const x = useTransform(baseX, v => {
    if (copyWidth === 0) return '0px'
    return `${wrap(-copyWidth, 0, v)}px`
  })

  const directionFactor = useRef(1)
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) directionFactor.current = -1
    else if (velocityFactor.get() > 0) directionFactor.current = 1
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="relative overflow-hidden">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? copyRef : null}
            className="flex shrink-0 items-center"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function PartnersSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-14">
        <div className="flex flex-col items-center">
          <SectionHeading
            eyebrow="Our Network"
            title="Trusted |Partners & Brands"
            subtitle="We collaborate with world-class manufacturers to bring you the finest instruments and consumables."
            centered
          />
        </div>
      </div>

      {/* Scrolling rows */}
      <div className="space-y-4">
        {/* Row 1 — scrolls right */}
        <VelocityRow baseVelocity={50} numCopies={5}>
          {ROW_1.map(partner => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </VelocityRow>

        {/* Row 2 — scrolls left */}
        {/* <VelocityRow baseVelocity={-50} numCopies={5}>
          {ROW_2.map(partner => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </VelocityRow> */}
      </div>

      {/* Fade edges */}
      <div className="relative pointer-events-none" aria-hidden>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" style={{ top: '-8.5rem', height: '8.5rem' }} />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" style={{ top: '-8.5rem', height: '8.5rem' }} />
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 text-[#1251A3] text-sm font-bold hover:underline underline-offset-4"
        >
          View All Partners →
        </Link>
      </div>
    </section>
  )
}