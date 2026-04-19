'use client'

import { motion } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import { PARTNERS } from '@/lib/constants'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Check } from 'lucide-react'

const FEATURED_PARTNERS = [
  {
    id: 'thermolab',
    name: 'Thermolab Scientific Equipments',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Thermolab-512x512-bg-300x300.jpg',
    website: 'https://thermolabscientific.com/',
    tagline: 'Proven expertise of over 50 years in laboratory equipment',
    description: 'Thermolab Group has global presence with high-quality laboratory equipment and CE approved equipment in more than 70 countries. 21 CFR part 11/GAMP 5 compliance software and reporting, audit trails, alarm systems under fully compliance environment covering complete qualification and documentation.',
    whyPoints: [
      'Proven expertise of over 50 years in manufacturing',
      'Fully compliant with ICH, WHO, USFDA, and GMP standards',
      'Strong focus on innovation, sustainability, and energy efficiency',
      'Trusted by leading pharmaceutical companies worldwide',
    ],
    products: [
      { name: 'Walk-In Stability Chamber', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/1.-Walk-in-stability-chamber-.10k-1-600x557-1.jpg' },
      { name: 'Stability Chambers', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/3.-Stability-Chamber10k-168x300.jpg' },
      { name: 'Autoclave', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Auto-Clave.jpg' },
      { name: 'Laminar Airflow Unit', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/LAMInar-Air-flow-unit.jpg' },
      { name: 'Oven', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/OVEN.jpg' },
      { name: 'Photostability Chamber', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Photostability-chamber.jpg' },
      { name: 'Vacuum Oven', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Vacuum-Ovenn.jpg' },
      { name: 'Pharma Cold Room', image: 'https://aerosolscientific.com/wp-content/uploads/2026/01/Cold-Pharma.jpg' },
    ],
    gradient: 'from-[#1251A3] to-[#0891B2]',
  },
  {
    id: 'witeg',
    name: 'Witeg Germany',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/10/Witeg-Germany-logo.jpg',
    website: 'https://www.witeg.de/en/',
    tagline: 'German precision glassware & plasticware for every lab',
    description: 'Based in Germany, Witeg Labortechnik GmbH is a globally trusted manufacturer of laboratory glassware, plasticware, and precision instruments. Their products are renowned for quality, precision, and reliability in laboratories worldwide.',
    features: ['Laboratory Glassware', 'Plasticware & PP Ware', 'Precision Instruments', 'Filtration Products', 'Lab Consumables', 'Safety Equipment'],
    gradient: 'from-[#0891B2] to-[#2E7D32]',
    
  },
  {
    id: 'fdgsi',
    name: 'FDGSi',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/10/FDGS-logo.jpg',
    website: 'https://www.f-dgs.com/',
    tagline: 'Specialists in gas generators and analytical instruments',
    description: 'Specializing in gas generators, analytical instruments, and laboratory equipment. FDGSi serves the needs of chromatography and spectroscopy labs with high-quality, reliable products. Their gas generators are trusted in labs across the world.',
    features: ['Gas Generators (N2, H2, Zero Air)', 'GC Accessories & Consumables', 'Chromatography Columns', 'Inlet Liners & Septa', 'Analytical Instruments'],
    gradient: 'from-[#2E7D32] to-[#1251A3]',
  },
  {
    id: 'pci',
    name: 'PCi Analytics',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/10/Pci-Analytics-logo.jpg',
    website: '#',
    tagline: 'Advanced laboratory instruments and solutions',
    description: 'FDGSi is a leading supplier of laboratory instruments and consumables for general and advanced research. Their portfolio includes balances, centrifuges, ovens, incubators, and a wide variety of laboratory essentials.',
    features: ['Analytical Balances', 'Centrifuges & Mixers', 'Ovens & Incubators', 'General Lab Equipment', 'Chromatography Solutions', 'Spectroscopy Instruments'],
    gradient: 'from-[#6A1B9A] to-[#1251A3]',
  },
]

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Network"
        title="Partners & Brands"
        subtitle="We collaborate with world-class manufacturers to bring you the finest instruments, consumables, and laboratory solutions — trusted globally."
        breadcrumbs={[{ label: 'Partners' }]}
      />

      {/* Brand logo grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <SectionHeading eyebrow="Our Supplies & Brands" title="All |Brand Partners" centered />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
            {PARTNERS.map((partner, i) => (
              <motion.a key={partner.name} href={partner.href}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="group flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-[rgba(18,81,163,0.08)] hover:border-[rgba(18,81,163,0.2)] hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center">
                  <img src={partner.logo} alt={partner.name}
                    className="w-full h-full object-contain p-1.5 filter grayscale group-hover:grayscale-0 transition-all duration-400"
                    onError={e => (e.target as HTMLImageElement).style.display = 'none'} />
                </div>
                <span className="text-[11px] text-[#7B90B2] group-hover:text-[#1251A3] font-medium text-center leading-tight transition-colors">
                  {partner.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed partner pages */}
      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-20">

        {/* Thermolab — with full product gallery */}
        <section id="thermolab">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-8">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-[rgba(18,81,163,0.1)] shadow-md overflow-hidden flex items-center justify-center">
                    <img src={FEATURED_PARTNERS[0].logo} alt={FEATURED_PARTNERS[0].name} className="w-full h-full object-contain p-1" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#050E1D]">{FEATURED_PARTNERS[0].name}</h2>
                    <p className="text-[#7B90B2] text-sm">{FEATURED_PARTNERS[0].tagline}</p>
                  </div>
                </div>
                <p className="text-[#3D5276] leading-relaxed mb-5 text-sm">{FEATURED_PARTNERS[0].description}</p>
                <h3 className="font-bold text-[#0A1628] text-sm mb-3">Why Thermolab?</h3>
                <div className="space-y-2">
                  {FEATURED_PARTNERS[0]?.whyPoints?.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-[#3D5276]">
                      <span className="text-[#1251A3] font-bold shrink-0">{i + 1}.</span>
                      {pt}
                    </div>
                  ))}
                </div>
                <a href={FEATURED_PARTNERS[0].website} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[#1251A3] hover:underline">
                  Visit Thermolab Website <ExternalLink size={13} />
                </a>
              </div>
              <div>
                <h3 className="font-bold text-[#0A1628] mb-4">Key Product Range</h3>
                <div className="grid grid-cols-2 gap-3">
                  {FEATURED_PARTNERS[0]?.products?.slice(0, 4).map(p => (
                    <div key={p.name} className="group bg-white rounded-xl overflow-hidden border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                        <img src={p.image} alt={p.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-400"
                          onError={e => (e.target as HTMLImageElement).style.display = 'none'} />
                      </div>
                      <div className="p-2.5">
                        <p className="text-[12px] font-semibold text-[#050E1D] text-center">{p.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Full product gallery */}
            <div>
              <h3 className="font-bold text-[#0A1628] mb-4">Thermolab Full Product Range</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {FEATURED_PARTNERS[0]?.products?.map((p, i) => (
                  <motion.div key={p.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="group bg-white rounded-xl overflow-hidden border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-400"
                        onError={e => (e.target as HTMLImageElement).style.display = 'none'} />
                    </div>
                    <div className="p-2.5">
                      <p className="text-[11px] font-semibold text-[#050E1D] text-center leading-tight">{p.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <div className="divider-gradient" />

        {/* Other featured partners */}
        {FEATURED_PARTNERS.slice(1).map((partner, idx) => (
          <section key={partner.id} id={partner.id}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? '' : ''}`}>
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-[rgba(18,81,163,0.1)] shadow-md overflow-hidden flex items-center justify-center p-2">
                      <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain"
                        onError={e => (e.target as HTMLImageElement).style.display = 'none'} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#050E1D]">{partner.name}</h2>
                      <p className="text-[#7B90B2] text-sm">{partner.tagline}</p>
                    </div>
                  </div>
                  <p className="text-[#3D5276] leading-relaxed mb-5 text-sm">{partner.description}</p>
                  {partner.features && (
                    <div className="grid grid-cols-2 gap-2">
                      {partner.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-sm text-[#3D5276]">
                          <Check size={12} className="text-[#0891B2] shrink-0" /> {f}
                        </div>
                      ))}
                    </div>
                  )}
                  <a href={partner.website} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[#1251A3] hover:underline">
                    Visit Website <ExternalLink size={13} />
                  </a>
                </div>
                <div className={`bg-gradient-to-br ${partner.gradient} rounded-2xl p-12 flex items-center justify-center min-h-[220px] ${idx % 2 === 1 ? 'lg:order-first' : ''}`}>
                  <img src={partner.logo} alt={partner.name} className="max-w-[180px] max-h-[120px] object-contain filter brightness-0 invert opacity-80"
                    onError={e => (e.target as HTMLImageElement).style.display = 'none'} />
                </div>
              </div>
            </motion.div>
          </section>
        ))}
      </div>

      {/* Partnership CTA */}
      <section className="py-16 bg-gradient-to-r from-[#030A14] via-[#0D2240] to-[#03201E] text-white relative overflow-hidden">
        <div className="absolute inset-0 sci-grid-dark opacity-20" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Interested in Partnership?</h2>
          <p className="text-blue-200 mb-8">We're always looking to collaborate with quality manufacturers in the scientific instrument space.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1251A3] font-bold px-8 py-3.5 rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5 group">
            Get in Touch <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  )
}