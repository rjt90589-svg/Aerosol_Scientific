'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Package, Beaker, Microscope, Wrench } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const categories = [
   {
    icon: Microscope,
    title: 'Laboratory Instruments',
    description: 'General laboratory equipments, Analytical instruments and Chromatography products, consumables, chemicals supplies, testing kits, gas solutions, medical and pharma products, refurbished hplc/gc instruments from various brands, turn key lab solutions and furnitures and many more to serve your lab needs.',
    items: ['HPLC Systems', 'GC Systems', 'Mass Spectrometers', 'Spectroscopy'],
    gradient: 'from-[#6A1B9A] to-[#1565C0]',
    href: '/products?category=General Laboratory Equipment',
    image: null,
  },
    {
    icon: Wrench,
    title: 'Laboratory Fitout & Turnkey projects',
    description: "We facilitate complete lab setups in a fully compliant environment, including government approvals. Complete lab setup and instruments, Laboratory furnitures,chemical storage, lab seatings, Lab gas systems and fittings, Emergency equipment-safety shower & eye wash station, fume hood & extraction system etc.",
    items: ['Lab Benches', 'Fume Hoods', 'Chemical Cabinets', 'Safety Equipment'],
    gradient: 'from-[#2E7D32] to-[#00838F]',
    href: '/products?category=Turn key projects',
    image: null,
  },
  
  {
    icon: Package,
    title: 'Lab Supplies',
    description: 'General laboratory supplies, glassware, plasticware, and consumables from multiple brands world wide- Witeg, Kern, BRAND, ABDOS, Thermoscientific, waters, Agilent, shimadzu, Sartorius,  Eppendorf, MiliQ and many more as per you demand.',
    items: ['Glassware', 'Plasticware', 'Lab Consumables', 'Safety Equipment'],
    gradient: 'from-[#E65100] to-[#AD1457]',
    href: '/products?category=Pricision Lab Equipments-Thermolab Scientific',
    image: null,
  },
  {
    icon: Beaker,
    title: 'Chromatography Consumables',
    description: 'GC & HPLC vials, septa, caps, crimpers — ND9, ND11, ND18, ND20 formats in amber and clear glass.',
    items: ['Screw Vials', 'Crimp Vials', 'Septa', 'Caps & Crimpers'],
    gradient: 'from-[#1565C0] to-[#0097A7]',
    href: '/products?category=Chromatography Consumables',
    image: 'https://aerosolscientific.com/wp-content/uploads/2026/04/Wholesale-Amber-1-5ml-9mm-Vial-Screw-HPLC-Gc-Vial-V935-V937-Economy-.avif',
  },
 

]

export default function WhatWeProvide() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#F8FAFF] to-[#F0F7F7]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow="Product Range"
            title="What We |Provide"
            subtitle="Entire Laboratory setup (Design/civil/furniture/Govt approvals), Laboratory equipment’s from worldwide manufacturers/OEMs, Consumables, training, service support, AMC contract, Multivendor support— Your one-stop laboratory partner."
          />
          <Link
            href="/products"
            className="flex items-center gap-2 text-[#1565C0] font-semibold text-sm hover:gap-3 transition-all shrink-0 group"
          >
            Browse All Products
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-400"
              >
                {/* Top accent */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${cat.gradient}`} />

                <div className="p-7">
                  <div className="flex items-start gap-5 mb-5">
                   <div className="relative shrink-0">
  {/* 🔥 Glow background */}
  <div
    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.gradient} blur-xl opacity-40 group-hover:opacity-70 transition duration-300`}
  />

  {/* 🔥 Main icon box */}
  <div
    className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5`}
  >
    {/* 🔥 Inner shine */}
    <div className="absolute inset-0 rounded-2xl bg-white/10" />

    {/* 🔥 Icon */}
    <Icon size={26} className="relative text-white drop-shadow-lg" />
  </div>
</div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1.5 group-hover:text-[#1565C0] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{cat.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-semibold bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-[#1565C0] border border-gray-100 hover:border-blue-100 px-3 py-1 rounded-full transition-all cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1565C0] hover:gap-2.5 transition-all group/link"
                  >
                    Explore Range
                    <ArrowRight size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}