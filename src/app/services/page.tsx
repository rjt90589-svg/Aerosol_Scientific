'use client'

import { motion } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import Link from 'next/link'
import { Check, ArrowRight, ExternalLink } from 'lucide-react'

// Real images from aerosolscientific.com
const services = [
  {
    id: 'multivendor',
    title: 'Multi-Vendor Support',
    image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/multivendor-1.jpg',
    tagline: 'All Brands — One Trusted Service Partner',
    description: 'Multivendor support for Analytical instruments in different industries with experienced professionals at low cost — maintaining quality with fast services. By associating with us, we ensure to give the best that will leverage your business to the next level.',
    subServices: [
      {
        title: 'Gas & Liquid Chromatography, Spectroscopy',
        image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/multivendor-350x204.jpg',
        items: ['Installations', 'Repair / Services', 'Maintenance / PM'],
      },
      {
        title: 'Gas Generators',
        image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Generators-300x204.jpg',
        items: ['Installations', 'Repair / Services', 'Maintenance / PM'],
      },
      {
        title: 'Small Equipment & Lab Solutions',
        image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Lab-Supplies-350x204.jpg',
        items: ['Installations', 'Repair / Services', 'Maintenance / PM'],
      },
    ],
    brands: ['Agilent — LCMS / HPLC / GC / GCMS / ICPMS', 'Sciex — LCMS', 'Waters — HPLC / LCMS', 'Shimadzu — LCMS / HPLC / GC / GCMS'],
    gradient: 'from-[#1251A3] to-[#0891B2]',
  },
  {
    id: 'contracts',
    title: 'Service Contracts',
    image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/SERVICE-CONTRACT-1.jpg',
    tagline: 'Flexible Plans — Best Coverage & Fastest Support',
    description: 'Get the best, fastest service for your lab instruments with comprehensive, labor, or trade maintenance contracts. Our contracts are designed to minimize downtime and maximize the lifespan of your instruments.',
    features: [
      'Comprehensive Maintenance Contracts (Parts + Labor)',
      'Labor Only Contracts',
      'Trade Maintenance Contracts',
      'Scheduled Preventive Service Visits',
      'Emergency Breakdown Service & Repairs',
      'Lab & Instruments Relocation Services',
      'Regulatory Compliance Services',
      'Training Included in Premium Plans',
      'Multivendor Support',
    ],
    gradient: 'from-[#0891B2] to-[#06B6D4]',
  },
  {
    id: 'lab-supplies',
    title: 'Lab Supplies',
    image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/multivendor-2.jpg',
    tagline: 'High-Quality Supplies for Every Lab Need',
    description: 'We provide a wide range of high-quality laboratory supplies designed to support analytical laboratories and enhance efficiency, accuracy, and compliance. Lab supplies we offer based on your needs and brand requirements.',
    supplyImages: [
      { title: 'GC Columns', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/GC-Column-2-1.jpg' },
      { title: 'HPLC Columns', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/HPLC-Columns-2.jpg' },
      { title: 'PM Kits', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/PM-Kits-283x204.jpg' },
      { title: 'Glass/PP Vials & Caps', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/40-350x204.jpg' },
      { title: 'Liner & Septa for GC', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Liner-and-Septa-3-300x204.jpg' },
      { title: 'Centrifuge Tubes', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Vials-Caps-315x204.png' },
      { title: 'Pipette Tips & Sample Prep', image: 'https://aerosolscientific.com/wp-content/uploads/elementor/thumbs/6073303-P50-MDT-Pipette-Tips-50uL-700x700px-rfhgj23poapg2okc93sc1f9sh2fanxnedil0xgwmns.webp' },
      { title: 'Aerosol Consumables', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/30.jpg' },
    ],
    gradient: 'from-[#2E7D32] to-[#0891B2]',
  },
  {
    id: 'training',
    title: 'Trainings & Workshop',
    image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Trainings-Workshop-1.jpg',
    tagline: 'Knowledge Transfer — Academic & Corporate',
    description: 'Collaboration with academic institutions, pharma labs, and research organizations to train and support laboratory teams with practical hands-on knowledge in chromatography and analytical techniques.',
    features: [
      'Basics of Chromatography (HPLC & GC)',
      'Method Development & Validation',
      'Trouble Shooting & Problem Solving',
      'Basic Instrument Repair Training',
      'Preventive Maintenance Training',
      'Data Integrity & 21 CFR Part 11',
      'Hands-on Workshop Sessions',
      'Certification on Course Completion',
    ],
    gradient: 'from-[#6A1B9A] to-[#1251A3]',
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Offer"
        title="Our Services"
        subtitle="Complete laboratory solutions — multi-vendor instrument support, service contracts, lab supplies, and training workshops across UAE and India."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Services overview grid (from services-grid page) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-14">
            <SectionHeading eyebrow="Our Services" title="Looking for |OEM Scientific Instruments & Services?" centered />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Trainings & Workshop', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Trainings-Workshop-1.jpg', href: '#training' },
              { title: 'Multivendor Support', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/multivendor-1.jpg', href: '#multivendor' },
              { title: 'Service Contracts', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/SERVICE-CONTRACT-1.jpg', href: '#contracts' },
              { title: 'Lab Supplies', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/multivendor-2.jpg', href: '#lab-supplies' },
            ].map((s, i) => (
              <motion.a
                key={s.title}
                href={s.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] block cursor-pointer"
              >
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-bold text-white text-base">{s.title}</h3>
                  <span className="text-[11px] text-white/60 font-semibold uppercase tracking-wider group-hover:text-[#22D3EE] transition-colors">Read More →</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed sections */}
      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-20">

        {/* Multi-Vendor Support */}
        <section id="multivendor">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1251A3] border border-blue-100 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
                  Multi-Vendor Support
                </div>
                <h2 className="text-3xl font-bold text-[#050E1D] mb-3">We support your lab instruments and supplies</h2>
                <p className="text-[#3D5276] leading-relaxed mb-4">{services[0].description}</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[#0A1628] mb-2">Brands we support:</p>
                  {services[0].brands!.map(b => (
                    <div key={b} className="flex items-center gap-2 text-sm text-[#3D5276]">
                      <Check size={13} className="text-[#0891B2] shrink-0" /> {b}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#1251A3] hover:gap-3 transition-all group">
                  Request Support <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={services[0].image} alt="Multi-vendor support" className="w-full h-64 object-cover" />
              </div>
            </div>

            {/* Sub-service cards with real images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {services[0].subServices!.map((sub, i) => (
                <motion.div key={sub.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-[rgba(18,81,163,0.08)] overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={sub.image} alt={sub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#050E1D] mb-3">{sub.title}</h3>
                    {sub.items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-[#3D5276] mb-1">
                        <Check size={12} className="text-green-500 shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="divider-gradient" />

        {/* Service Contracts */}
        <section id="contracts">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="rounded-2xl overflow-hidden shadow-xl lg:order-2">
                <img src={services[1].image} alt="Service contracts" className="w-full h-64 object-cover" />
              </div>
              <div className="lg:order-1">
                <div className="inline-flex items-center gap-2 bg-teal-50 text-[#0891B2] border border-teal-100 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
                  Service Contracts
                </div>
                <h2 className="text-3xl font-bold text-[#050E1D] mb-3">{services[1].tagline}</h2>
                <p className="text-[#3D5276] leading-relaxed mb-5">{services[1].description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services[1].features!.map(f => (
                    <div key={f} className="flex items-start gap-2 text-sm text-[#3D5276]">
                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5 shrink-0">
                        <Check size={10} className="text-green-600" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#1251A3] hover:gap-3 transition-all group">
                  Get a Contract Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="divider-gradient" />

        {/* Lab Supplies */}
        <section id="lab-supplies">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-green-50 text-[#2E7D32] border border-green-100 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
                Lab Supplies
              </div>
              <h2 className="text-3xl font-bold text-[#050E1D] mb-2">{services[2].tagline}</h2>
              <p className="text-[#3D5276] leading-relaxed max-w-2xl">{services[2].description}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {services[2].supplyImages!.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-2xl border border-[rgba(18,81,163,0.08)] overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  </div>
                  <div className="p-3">
                    <p className="text-[13px] font-semibold text-[#050E1D] text-center leading-snug">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="divider-gradient" />

        {/* Trainings */}
        <section id="training">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-50 text-[#6A1B9A] border border-purple-100 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
                  Trainings & Workshop
                </div>
                <h2 className="text-3xl font-bold text-[#050E1D] mb-3">{services[3].tagline}</h2>
                <p className="text-[#3D5276] leading-relaxed mb-5">{services[3].description}</p>
                <div className="space-y-2">
                  {services[3].features!.map(f => (
                    <div key={f} className="flex items-start gap-2.5 text-sm text-[#3D5276]">
                      <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 shrink-0">
                        <Check size={10} className="text-purple-600" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#1251A3] hover:gap-3 transition-all group">
                  Enquire About Training <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={services[3].image} alt="Training" className="w-full h-72 object-cover" />
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#030A14] via-[#0D2240] to-[#03201E] text-white relative overflow-hidden">
        <div className="absolute inset-0 sci-grid-dark opacity-20" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Need a Custom Service Plan?</h2>
          <p className="text-blue-200 mb-8">Contact our expert team to discuss your laboratory service requirements.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1251A3] font-bold px-8 py-3.5 rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5 group">
            Talk to Our Experts <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  )
}