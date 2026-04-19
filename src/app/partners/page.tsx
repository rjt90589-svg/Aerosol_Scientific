'use client'

import { motion } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import { PARTNERS } from '@/lib/constants'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Check, Star } from 'lucide-react'

// ── Full partner data with every image/content from original site ──────────
const FEATURED: {
  id: string
  name: string
  logo: string
  website: string
  tagline: string
  intro: string
  whyTitle: string
  whyPoints: { label: string; detail?: string }[]
  productCategories?: { title: string; items: string[] }[]
  products: { name: string; image: string }[]
  applications?: string[]
  gradient: string
  accent: string
}[] = [
  {
    id: 'thermolab',
    name: 'Thermolab Scientific Equipments',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Thermolab-512x512-bg-300x300.jpg',
    website: 'https://thermolabscientific.com/',
    tagline: 'Stability Chambers, Cold Rooms & Controlled Environment Solutions',
    accent: '#1251A3',
    gradient: 'from-[#1251A3] to-[#0891B2]',
    intro: 'Thermolab Group has global presence with high-quality laboratory equipment and CE approved equipment in more than 70 countries. 21 CFR part 11 / GAMP 5 compliance software and reporting, audit trails, alarm systems under fully compliance environment covering complete qualification and documentation.',
    whyTitle: 'Why Thermolab?',
    whyPoints: [
      { label: 'Proven expertise of over 50 years in manufacturing laboratory and stability testing equipment.' },
      { label: 'Fully compliant with ICH, WHO, USFDA, and GMP standards.' },
      { label: 'Strong focus on innovation, sustainability, and energy efficiency.' },
      { label: 'Trusted by leading pharmaceutical companies worldwide.' },
    ],
    productCategories: [
      { title: 'Key Product Categories', items: ['Stability Chambers', 'Walk-In Stability Chambers', 'Cold Rooms & Freezers', 'Incubators & Environmental Chambers', 'Autoclaves', 'Ovens & Vacuum Ovens', 'Photostability Chambers', 'Customized Solutions'] },
    ],
    products: [
      { name: 'Walk-In Stability Chamber', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/1.-Walk-in-stability-chamber-.10k-1-600x557-1.jpg' },
      { name: 'Stability Chamber', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/3.-Stability-Chamber10k-168x300.jpg' },
      { name: 'Autoclave', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Auto-Clave.jpg' },
      { name: 'Laminar Airflow Unit', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/LAMInar-Air-flow-unit.jpg' },
      { name: 'Oven', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/OVEN.jpg' },
      { name: 'Photostability Chamber', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Photostability-chamber.jpg' },
      { name: 'Vacuum Oven', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Vacuum-Ovenn.jpg' },
      { name: 'Pharma Cold Room', image: 'https://aerosolscientific.com/wp-content/uploads/2026/01/Cold-Pharma.jpg' },
      { name: 'Horizontal Sterilizer - Double Door', image: 'https://aerosolscientific.com/wp-content/uploads/2026/01/sterilizer.jpg' },
      { name: 'Sterilizer - Vertical Series', image: 'https://aerosolscientific.com/wp-content/uploads/2026/01/Vertical-removebg-preview.png' },
    ],
  },
  {
    id: 'witeg',
    name: 'Witeg Germany',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/10/Witeg-Germany-logo.jpg',
    website: 'https://www.witeg.de/en/',
    tagline: 'Laboratory Glassware, Equipment & Liquid Handling — 30,000+ Products',
    accent: '#0891B2',
    gradient: 'from-[#0891B2] to-[#2E7D32]',
    intro: 'witeg Labortechnik GmbH is one of the leading manufacturers and suppliers of laboratory glassware, custom-built glassware, liquid handling articles, electronic instruments and equipment. The products fulfil the very high demands in the chemical, pharmaceutical and medical sectors and are delivered to more than 100 countries worldwide. Actual product range covers more than 30,000 products which are mostly ex-stock available.',
    whyTitle: 'Why Choose Witeg?',
    whyPoints: [
      { label: 'Global reach', detail: '30,000+ products shipped to 100+ countries worldwide' },
      { label: 'Precision manufacturing', detail: 'All glass manufactured to DIN/ISO/ASTM norms' },
      { label: 'SMART-Lab™ Technology', detail: 'Wi-Fi enabled devices for remote operations and compliance' },
      { label: 'Complete range', detail: 'From basic glassware to electronic lab instruments' },
      { label: 'Pharma-grade quality', detail: 'Meets stringent chemical, pharmaceutical and medical sector requirements' },
    ],
    productCategories: [
      {
        title: 'Laboratory Glassware', items: [
          'Apparatuses & Storage Vessels', 'Beakers, Flasks & Funnels', 'Chromatography Glassware',
          'Distillation & Extraction', 'Filtration & Separation', 'Condensers & Columns',
          'Volumetric Instruments', 'Sample Preparation Vessels', 'Tubes & Reaction Vessels',
        ],
      },
      {
        title: 'Laboratory Equipment', items: [
          'Heating & Temperature Control', 'Cooling & Freezing Equipment',
          'Mixing & Shaking Equipment', 'Centrifugation Systems', 'Vacuum & Filtration',
          'Safety & Purification', 'Overhead & Magnetic Stirrers',
        ],
      },
      {
        title: 'Liquid Handling', items: [
          'Pipettes (0.1 µL to 50 mL)', 'Dispensers & Dosing Systems (0.25 mL to 250 mL)',
          'Digital Burette TITREX', 'Titration Accessories',
        ],
      },
    ],
    products: [
      { name: 'Autoclave with Basket', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Picture3.png' },
      { name: 'Vortex Mixer', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Picture4-300x220.jpg' },
      { name: 'Thermal Shaker', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Picture5.jpg' },
      { name: 'Magnetic Stirrer 1500 RPM', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Picture6-268x300.jpg' },
      { name: 'Shaker', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Picture7-300x200.jpg' },
      { name: 'Magnetic Stirrer 1200 RPM', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Picture8.jpg' },
      { name: 'Lab Equipment', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Picture9-300x278.jpg' },
      { name: 'Lab Equipment', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Picture10-300x279.jpg' },
      { name: 'Overhead Stirrer Digital Set', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/Picture11.jpg' },
    ],
    applications: [
      'Chemical synthesis and analysis',
      'Sample preparation and homogenization',
      'Heating, mixing, and stirring processes',
      'Biochemical and pharmaceutical research',
      'Quality control in industrial labs',
    ],
  },
  {
    id: 'fdgsi',
    name: 'FDGSi',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/10/FDGS-logo.jpg',
    website: 'https://www.f-dgs.com/',
    tagline: 'French Manufacturer of High-Performance Gas Generators for Analytical Labs',
    accent: '#2E7D32',
    gradient: 'from-[#2E7D32] to-[#1251A3]',
    intro: 'F-DGSi is a leading French manufacturer specializing in high-performance gas and liquid generators for scientific laboratories and various industries. Their core product line includes generators that produce pure gases such as Hydrogen, Nitrogen, and Zero Air — offering a critical alternative to traditional, cumbersome, and often dangerous high-pressure gas cylinders. These on-demand systems use advanced PSA and membrane technologies ensuring up to 99.9999% purity for H2.',
    whyTitle: 'Why Choose FDGSi?',
    whyPoints: [
      { label: 'Innovation', detail: 'Pioneers in integrating remote monitoring and compact designs in gas generators' },
      { label: 'Reliability', detail: 'Robust systems ensuring continuous and uninterrupted gas supply' },
      { label: 'Cost-Effectiveness', detail: 'Eliminates the need for high-pressure cylinders, reducing operational costs' },
      { label: 'Safety', detail: 'Built-in safety features and compliance with international standards' },
      { label: 'Customer Support', detail: 'Comprehensive services including installation, training, maintenance, and qualification' },
    ],
    productCategories: [
      {
        title: 'Nitrogen Generators (CALYPSO, STREAM, MAESTRO)', items: [
          'Technologies: PSA and Membrane', 'Purity: 95% to 99.9995%',
          'Applications: LC-MS, GC-MS, sample evaporation',
          'Compact design with optional built-in air compressors',
        ],
      },
      {
        title: 'Hydrogen Generators (COSMOS H2)', items: [
          'Technology: Proton Exchange Membrane (PEM)', 'Purity up to 99.9999%',
          'Flow: 100 cc/min to 1500 cc/min',
          'Applications: GC carrier gas, FID, FPD, NPD, TCD',
        ],
      },
      {
        title: 'Air Generators (PROSPERO, DEIMOS)', items: [
          'Zero Air: hydrocarbon < 0.1 ppm',
          'Flow up to 30 L/min',
          'Applications: GC detectors, ELSD',
        ],
      },
      {
        title: 'Liquid Nitrogen Generators (CRYOGEN)', items: [
          'Production: 10 to 80 liters/day',
          'Applications: Cryopreservation, MRI',
          'On-demand production',
        ],
      },
    ],
    products: [
      { name: 'Nitrogen Generators (CALYPSO, STREAM, MAESTRO)', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/calypso-nitrogen-generator-pqjpvke7djys65bylzoqbw3xin6hdwmxu9bw0505c0-289x300.jpg' },
      { name: 'Hydrogen Generators (COSMOS H2)', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/cosmos-hydrogen-generator-pqjpvke7djyhxuntfyci2c6xbpydqyncjikyznqo74-300x209.jpg' },
      { name: 'Liquid Nitrogen Generators (CRYOGEN)', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/cryogen-80-liquid-nitrogen-generator-pqjpvlc1ke02hralgi3cwdve411ullqo6dzdheyr5s-201x300.jpg' },
      { name: 'Air Generators (PROSPERO, DEIMOS)', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/deimos-cosmos-air-generator-pqjpvke7djys65bylzoqbw3xin6hdwmxu9bw0505c0-300x246.jpg' },
    ],
    applications: [
      'Gas Chromatography (GC)',
      'Liquid Chromatography-Mass Spectrometry (LC-MS)',
      'Inductively Coupled Plasma (ICP)',
      'Nuclear Magnetic Resonance (NMR)',
      'Total Organic Carbon (TOC) Analysis',
      'Food Packaging and Wine Making',
      'Cryopreservation and Medical Applications',
    ],
  },
  {
    id: 'pci',
    name: 'PCi Analytics',
    logo: 'https://aerosolscientific.com/wp-content/uploads/2025/10/Pci-Analytics-logo.jpg',
    website: '#',
    tagline: 'Indian Manufacturer of Gas Generators, Analytical Instruments & Lab Utilities',
    accent: '#6A1B9A',
    gradient: 'from-[#6A1B9A] to-[#1251A3]',
    intro: 'PCi Analytics Pvt. Ltd. is a leading Indian manufacturer, supplier, and exporter of a comprehensive range of laboratory gas systems, analytical instruments, and consumables, serving critical sectors such as pharmaceuticals, petrochemicals, chemicals, and R&D laboratories. The company specializes in ultra-high purity gas generators using Pressure Swing Adsorption (PSA) and Electrolysis technologies, as well as Gas Piping and Utility Solutions providing end-to-end services.',
    whyTitle: 'Why Choose PCi Analytics?',
    whyPoints: [
      { label: 'Ultra-High Purity Gas Generation', detail: 'Eliminates hazardous gas cylinders with reliable on-site gas generators using proven PSA technology' },
      { label: 'End-to-End Gas Utility Projects', detail: 'Full-service gas piping, purification panels, automatic changeover manifolds, and high-precision P-Lok regulators' },
      { label: 'ISO 45001:2018 Certified', detail: 'CRISIL-rated Indian manufacturer with strict quality control and regulatory compliance' },
      { label: 'Dedicated Indian Support', detail: 'Local manufacturer means faster support, spares, and service across India' },
    ],
    productCategories: [
      { title: 'Gas Generators', items: ['PreCiGen Nitrogen Generators', 'Hydrogen Gas Generators', 'Zero Air Generators'] },
      { title: 'Analytical Instruments', items: ['HPLC Column Ovens', 'Digital Gas Flow Meters', 'Probe Sonicators', 'Ultrasonic Bath Sonicators'] },
      { title: 'Consumables & Accessories', items: ['GC/HPLC Consumables', 'FTIR Accessories', 'AAS Accessories', 'Precision Fittings'] },
      { title: 'Laboratory Equipment', items: ['Oil-free Diaphragm Vacuum Pumps', 'Positive Pressure Processors for SPE', 'Sample Evaporators', 'Vortex Mixers'] },
    ],
    products: [
      { name: 'Hydrogen Gas Generators', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/hydrogen-gas-generator1-300x267.jpg' },
      { name: 'Nitrogen Generators for GC', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/nitrogen-generator-for-gc-300x267.jpg' },
      { name: 'Zero Air Generators', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/zero-air-generator-for-gc-toc-analyser-300x267.png' },
      { name: 'Digital Gas Flow Meters', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/DFM-06-225x300.jpg' },
      { name: 'Gas Purification Panels', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/gas-purification-and-control-panel-for-gc-300x300.jpg' },
      { name: 'HPLC Column Ovens', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/hplc-column-oven-HCO-02-214x300.jpg' },
      { name: 'Probe Sonicator', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/probe-sonicator-pks-model-224x300.jpg' },
      { name: 'Ultrasonic Bath Sonicators', image: 'https://aerosolscientific.com/wp-content/uploads/2025/11/ultrasonic-bath-1-300x248.jpg' },
    ],
    applications: [
      'Pharmaceuticals',
      'Petrochemicals',
      'Fine Chemicals & Pesticides',
      'Research & Development Laboratories',
      'Atomic Energy & Government Research Institutions',
      'Public Testing Laboratories',
    ],
  },
]

// ── Partner Section Component ──────────────────────────────────────────────
function PartnerSection({ partner, index }: { partner: typeof FEATURED[0]; index: number }) {
  const isEven = index % 2 === 1

  return (
    <section id={partner.id} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
      >
        {/* Partner header */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-10`}>
          {/* Info side */}
          <div className={isEven ? 'lg:order-2' : ''}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[rgba(18,81,163,0.1)] shadow-md overflow-hidden flex items-center justify-center p-2 shrink-0">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#050E1D] leading-tight">{partner.name}</h2>
                <p className="text-[#7B90B2] text-sm mt-0.5">{partner.tagline}</p>
              </div>
            </div>

            <p className="text-[#3D5276] leading-relaxed text-[15px] mb-6">{partner.intro}</p>

            {/* Why points */}
            <div className="bg-gradient-to-br from-[#F8FAFF] to-[#F0F7F7] rounded-2xl p-5 border border-[rgba(18,81,163,0.07)] mb-5">
              <h3 className="font-bold text-[#0A1628] text-sm mb-3">{partner.whyTitle}</h3>
              <div className="space-y-2.5">
                {partner.whyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${partner.accent}18`, border: `1px solid ${partner.accent}30` }}>
                      <span className="text-[10px] font-bold" style={{ color: partner.accent }}>{i + 1}</span>
                    </span>
                    <div>
                      <span className="text-[13px] font-semibold text-[#0A1628]">{pt.label}</span>
                      {pt.detail && <span className="text-[13px] text-[#7B90B2]"> — {pt.detail}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            {partner.applications && (
              <div className="mb-5">
                <h3 className="font-bold text-[#0A1628] text-sm mb-2.5">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {partner.applications.map(app => (
                    <span key={app} className="text-[11px] font-semibold px-3 py-1.5 rounded-full border"
                      style={{
                        background: `${partner.accent}08`,
                        borderColor: `${partner.accent}20`,
                        color: partner.accent,
                      }}>
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline transition-colors"
              style={{ color: partner.accent }}
            >
              Visit {partner.name} Website <ExternalLink size={13} />
            </a>
          </div>

          {/* Product categories side */}
          <div className={isEven ? 'lg:order-1' : ''}>
            {partner.productCategories && (
              <div className="space-y-4">
                {partner.productCategories.map(cat => (
                  <div key={cat.title} className="bg-white rounded-2xl border border-[rgba(18,81,163,0.08)] p-5 shadow-sm">
                    <h4 className="font-bold text-[#050E1D] text-sm mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded-full bg-gradient-to-b"
                        style={{ background: `linear-gradient(180deg, ${partner.accent}, transparent)` }} />
                      {cat.title}
                    </h4>
                    <div className="grid grid-cols-1 gap-1.5">
                      {cat.items.map(item => (
                        <div key={item} className="flex items-center gap-2 text-[13px] text-[#3D5276]">
                          <Check size={11} style={{ color: partner.accent }} className="shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product image gallery */}
        {partner.products.length > 0 && (
          <div>
            <h3 className="font-bold text-[#0A1628] mb-5 flex items-center gap-3">
              <span className="h-0.5 w-8 rounded-full" style={{ background: partner.accent }} />
              {partner.name} Product Portfolio
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {partner.products.map((p, i) => (
                <motion.div
                  key={`${p.name}-${i}`}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="group bg-white rounded-2xl border border-[rgba(18,81,163,0.07)] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-108 transition-transform duration-400"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] font-semibold text-[#050E1D] text-center leading-tight line-clamp-2">{p.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Network"
        title="Partners & Brands"
        subtitle="We collaborate with world-class manufacturers to deliver the finest instruments, consumables, and laboratory solutions — trusted globally."
        breadcrumbs={[{ label: 'Partners' }]}
      />

      {/* All brand logo grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <SectionHeading eyebrow="Our Supplies & Brands" title="All |Brand Partners" centered />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
            {PARTNERS.map((partner, i) => (
              <motion.a
                key={partner.name}
                href={partner.href}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="group flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-[rgba(18,81,163,0.08)] hover:border-[rgba(18,81,163,0.2)] hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain p-1.5 filter grayscale group-hover:grayscale-0 transition-all duration-400"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <span className="text-[11px] text-[#7B90B2] group-hover:text-[#1251A3] font-medium text-center leading-tight transition-colors line-clamp-2">
                  {partner.name}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Jump links */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {FEATURED.map(p => (
              <a key={p.id} href={`#${p.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-[rgba(18,81,163,0.05)] hover:bg-[rgba(18,81,163,0.1)] border border-[rgba(18,81,163,0.12)] rounded-xl text-[13px] font-semibold text-[#1251A3] transition-all">
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed partner sections */}
      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-24">
        {FEATURED.map((partner, i) => (
          <div key={partner.id}>
            {i > 0 && <div className="divider-gradient mb-24" />}
            <PartnerSection partner={partner} index={i} />
          </div>
        ))}
      </div>

      {/* Partnership CTA */}
      <section className="py-20 bg-gradient-to-r from-[#030A14] via-[#0D2240] to-[#03201E] text-white relative overflow-hidden">
        <div className="absolute inset-0 sci-grid-dark opacity-20" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Interested in Partnership?</h2>
          <p className="text-blue-200 mb-8">
            We are always looking to collaborate with quality manufacturers in the scientific instruments and laboratory solutions space.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1251A3] font-bold px-8 py-3.5 rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5 group">
            Get in Touch <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  )
}