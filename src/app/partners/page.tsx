'use client'
import { motion } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import { PARTNERS } from '@/lib/constants'
import Link from 'next/link'

const featuredPartners = [
  {
    id: 'thermolab',
    name: 'Thermolab Scientific Equipments',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Thermolab-512x512-bg-150x150.jpg',
    description: 'Leading supplier of laboratory equipment and instruments with a wide product range for analytical and research laboratories.',
    specialties: ['Analytical Equipment', 'Lab Instruments', 'Safety Equipment'],
  },
  {
    id: 'pci',
    name: 'PCi Analytics',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/10/Pci-Analytics-logo-150x150.jpg',
    description: 'Specialized in analytical instruments and solutions for advanced laboratory applications and research.',
    specialties: ['Analytical Instruments', 'Chromatography', 'Spectroscopy'],
  },
  {
    id: 'witeg',
    name: 'Witeg Germany',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/10/Witeg-Germany-logo-150x150.jpg',
    description: 'German manufacturer of high-quality laboratory glassware, plasticware, and general lab consumables.',
    specialties: ['Lab Glassware', 'Plasticware', 'Lab Consumables'],
  },
  {
    id: 'fdgsi',
    name: 'FDGSi',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/10/FDGS-logo-150x150.jpg',
    description: 'Specialized in GC and HPLC accessories, columns, and consumables for chromatography applications.',
    specialties: ['GC Accessories', 'HPLC Consumables', 'Chromatography Columns'],
  },
]

export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow="Our Network" title="Partners & Brands" subtitle="We partner with world-class manufacturers to deliver the finest instruments and consumables to your lab." />

      {/* Featured Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <SectionHeading eyebrow="Key Partners" title="Featured |Partners" centered />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPartners.map((partner, i) => (
              <motion.div key={partner.id} id={partner.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl p-6 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#1565C0] transition-colors">{partner.name}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{partner.description}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.specialties.map(s => (
                    <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Brands */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-10">
            <SectionHeading eyebrow="Our Supplies" title="All |Brands" centered />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {PARTNERS.map((partner, i) => (
              <motion.div key={partner.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="w-14 h-14 relative">
                  <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <span className="text-xs text-gray-500 group-hover:text-[#1565C0] font-medium text-center">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}