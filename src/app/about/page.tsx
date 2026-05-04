"use client"

import { motion } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import { Target, Eye, Heart, Award, Lightbulb, Users, Phone, Mail, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

// ── Core Values ──────────────────────────────────────
const values = [
  {
    icon: Users,
    title: 'Partnership',
    description:
      'Being an onsite service provider, we collaborate with our customers in all our engagements, work as a team and take ownership and responsibility of things, to create long lasting partnerships.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description:
      "Our services are aimed at our customer's interests. By adopting transparent processes and adhering to highest ethical standards, we ensure customer confidentiality and our own credibility.",
  },
  {
    icon: Award,
    title: 'Passion',
    description:
      'We are passionate for our customer\'s success. By creating a highly stimulating work environment, working with utmost dedication and commitment, we focus on complete solutions.',
  },
  {
    icon: Lightbulb,
    title: 'Excellence',
    description:
      'By continually focusing on quality and deploying best practices, we bring excellence in our work, add value for our customers and strive to enter the realm of supremacy.',
  },
]

// ── Why Choose Us ────────────────────────────────────
const whyItems = [
  { title: 'Comprehensive Product Range', desc: 'Equipment, consumables, and lab furniture' },
  { title: 'Quality Assurance', desc: 'Products from reputed global manufacturers' },
  { title: 'Innovation & Technology', desc: 'Cutting-edge solutions for research needs' },
  { title: 'Customer-Centric Approach', desc: 'Technical support and prompt delivery' },
  { title: 'Competitive Pricing', desc: 'Making advanced research more accessible' },
  { title: 'Experienced Professionals', desc: 'Rich experience and proven records in the field' },
]

// ── Partners ─────────────────────────────────────────
const partners = [
  { name: 'Thermolab', sub: '55 years of excellence' },
  { name: 'Witeg', sub: 'Germany' },
  { name: 'PCI Analytics', sub: '' },
  { name: 'F·DGSi', sub: 'Innovative Gas System Company' },
  { name: 'Torontech', sub: '' },
  { name: 'Sartorius', sub: '' },
  { name: 'Eppendorf', sub: '' },
]

// ── Thermolab Products ────────────────────────────────
const thermolabProducts = [
  {
    name: 'Stability Chambers',
    desc: 'Long-term, accelerated, and intermediate stability studies, fully compliant with ICH guidelines.',
  },
  {
    name: 'Walk-in Stability Chambers',
    desc: 'Large-scale chambers with uniform temperature and humidity control for bulk storage and research.',
  },
  {
    name: 'Cold Rooms & Freezers',
    desc: 'Reliable storage solutions for temperature-sensitive samples and materials.',
  },
  {
    name: 'Incubators & Environmental Chambers',
    desc: 'Precise conditions for biological, pharmaceutical, and chemical research.',
  },
  {
    name: 'Customized Solutions',
    desc: 'Tailored chambers and systems based on specific client requirements.',
  },
]

// ── Analytical Equipment ──────────────────────────────
const analyticalEquipment = [
  'HPLC', 'GC', 'LCMS', 'GCMS', 'Gas Generators',
  'Elemental Analysis Instruments', 'pH Meters', 'Shakers',
  'Hot Plates', 'Muffle Furnace', 'Water Bath', 'Freezers',
  'Vortex Mixers', 'Balances', 'Vacuum Pumps',
  'Glassware & Plasticware',
]

// ── Torontech Sectors ─────────────────────────────────
const torontechSectors = [
  { label: 'Pharmaceutical' },
  { label: 'Test & Analytical' },
  { label: 'Plastic Recycling' },
  { label: 'Healthcare' },
  { label: 'Material Science' },
  { label: 'Fiber Optics' },
  { label: 'Petrochemicals' },
  { label: 'Quality Control & Testing' },
]

// ── Turnkey Items ─────────────────────────────────────
const turnkeyItems = [
  'Complete Lab Setup & Instruments',
  'Laboratory Furniture (SS & Standard)',
  'Fume Hoods & Fume Extraction Systems',
  'Anti-Vibration Tables',
  'Chemical Storage Solutions',
  'Laboratory Seating',
  'Lab Gas Systems & Grade Fittings',
  'Emergency Equipment',
  'Safety Showers & Eyewash Stations',
  'Government Approvals & Compliance Documentation',
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="Company Overview"
        subtitle="Aerosol Scientific aims to support customers with a multi-level holistic approach for all laboratory demands, including turnkey projects — as a trusted partner. Our focus is quality delivery and meeting our customers' expectations with on-time sales, service, and support."
      />

      {/* ── Overview ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionHeading eyebrow="About Us" title="Your Trusted Partner in Scientific Innovation" />

            <div className="space-y-4 text-gray-600 mt-6 text-sm leading-relaxed">
              <p>
                <strong>AEROSOL SCIENTIFIC</strong> is a leading laboratory solutions provider established in the UAE and India.
                We deliver comprehensive services including instrument sales, consumables, and technical support across life sciences,
                analytical, diagnostic, medical, and pharmaceutical industries.
              </p>
            </div>

            <blockquote className="mt-6 border-l-4 border-[#1565C0] pl-4 italic text-gray-500 text-sm">
              Supporting laboratories in food testing, energy, environmental, diagnostics, forensic, and research domains —
              powered by a highly experienced team specializing in chromatography, spectroscopy, and analytical instrumentation.
            </blockquote>

            {/* Contact info from PDF */}
            <div className="mt-6 flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#1565C0]" />
                <span>+971 547 598 109 |&nbsp; +91 98919 38724</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#1565C0]" />
                <span>support@aerosolscientific.com &nbsp;|&nbsp; sales@aerosolscientific.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="grid grid-cols-2 gap-4">
            {whyItems.map((item) => (
              <div key={item.title} className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-100">
                <div className="font-bold text-sm text-gray-900 mb-1">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Partners ───────────────────────────── */}
      {/* <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-10">
            <SectionHeading eyebrow="Trusted Brands" title="Our Partners" centered />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center justify-center bg-white rounded-2xl px-6 py-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all min-w-[130px]"
              >
                <span className="font-bold text-gray-800 text-sm">{p.name}</span>
                {p.sub && <span className="text-[10px] text-gray-400 mt-0.5 text-center">{p.sub}</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Mission & Vision ───────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5 }}
              className="group relative rounded-3xl p-8 text-white overflow-hidden border border-white/10 shadow-xl backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1565C0] via-[#1E88E5] to-[#0D47A1]" />
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-400/30 blur-3xl opacity-40 group-hover:opacity-70 transition" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
              <div className="relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-white/20 blur-xl rounded-2xl opacity-40" />
                  <div className="relative w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                    <Target size={26} className="text-white drop-shadow-lg" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 tracking-tight">Our Mission</h2>
                <ul className="text-blue-100 space-y-2 text-sm leading-relaxed">
                  <li>• Deliver high-quality laboratory equipment and consumables that meet the evolving needs of the scientific community.</li>
                  <li>• Ensure customer satisfaction through excellence in products, services, and support.</li>
                  <li>• Provide turnkey solutions, technical support, and after-sales services for laboratories.</li>
                  <li>• Stay at the forefront of scientific innovation, enabling groundbreaking research.</li>
                  <li>• Promote sustainability by offering eco-friendly and efficient laboratory solutions.</li>
                  <li>• Foster long-term partnerships with research institutions, testing labs, and industries worldwide.</li>
                </ul>
                <p className="mt-5 font-semibold text-white">Shaping the Future of Science with Innovation & Excellence</p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative rounded-3xl p-8 text-white overflow-hidden border border-white/10 shadow-xl backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00838F] via-[#00ACC1] to-[#006064]" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-400/30 blur-3xl opacity-40 group-hover:opacity-70 transition" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
              <div className="relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-white/20 blur-xl rounded-2xl opacity-40" />
                  <div className="relative w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                    <Eye size={26} className="text-white drop-shadow-lg" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 tracking-tight">Our Vision</h2>
                <ul className="text-teal-100 space-y-2 text-sm leading-relaxed">
                  <li>• To be the leading provider of innovative and reliable laboratory solutions.</li>
                  <li>• To empower scientific discovery by equipping laboratories with cutting-edge technology.</li>
                  <li>• To contribute to advancements in research and development on a global scale.</li>
                  <li>• To ensure precision, quality, and sustainability in every laboratory solution we offer.</li>
                  <li>• To build long-term partnerships by delivering exceptional value and service to the scientific community.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Thermolab Partner Section ───────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <SectionHeading eyebrow="Featured Partner" title="Thermolab — Our Partner for Entire Products" centered />
            <p className="text-gray-500 text-sm text-center mt-3 max-w-2xl">
              Thermolab Group has a global presence with high-quality, CE-approved laboratory equipment in more than 70 countries,
              with 21 CFR Part 11 / GAMP 5 compliant software, audit trails, alarm systems, and complete qualification documentation.
            </p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              {thermolabProducts.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
                >
                  <CheckCircle2 size={18} className="text-[#1565C0] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{product.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{product.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { label: '-86 Hydrocarbon ULT Freezer' },
                { label: 'Vacuum Oven' },
                { label: 'Stability Chamber' },
                { label: 'Auto Clave' },
                { label: 'BOD Incubator' },
                { label: 'Walk-in Stability Chamber' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="aspect-square rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100 flex items-end p-3"
                >
                  <span className="text-[10px] font-semibold text-gray-700 leading-tight">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div> */}
        </div>
      </section>

      {/* ── Analytical & General Equipment ─────────── */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <SectionHeading eyebrow="Product Range" title="Analytical & General Equipment" centered />
            <p className="text-gray-500 text-sm text-center mt-3 max-w-2xl">
              We provide a wide range of analytical, life sciences, and general laboratory equipment from world-renowned OEM partners.
              Full sales, service contracts, and technical support are available for all instruments.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {analyticalEquipment.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-2 rounded-full bg-white border border-blue-100 text-sm text-gray-700 font-medium shadow-sm hover:bg-[#1565C0] hover:text-white hover:border-[#1565C0] transition-all cursor-default"
              >
                {item}
              </motion.span>
            ))}
          </div>

<<<<<<< HEAD
          <div className="mt-10 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto text-center">
            <strong className="text-gray-900">Services:</strong> We provide service, support, and maintenance contracts for all lab instruments.
            Associating with us for service and support ensures we give our best to leverage your business to the next level.
          </div>
=======
          <ul className="text-teal-100 space-y-2 text-sm leading-relaxed">
            <li>• A leading provider of innovative and reliable laboratory solutions</li>
            <li>• Empower scientific discovery with cutting-edge technology</li>
            <li>• Contribute to global research and development advancements</li>
            <li>• Ensure precision, quality, and sustainability in every solution</li>
            <li>• Build long-term partnerships through exceptional value and service</li>
          </ul>

 <p className="mt-5 font-semibold text-white">
                   Precision in Every Solution. Progress in Every Lab.
   </p>
  

>>>>>>> fix_content
        </div>
      </section>

      {/* ── Analytical & Chromatography Consumables ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionHeading eyebrow="Consumables" title="Analytical & Chromatography Consumables" />
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed mt-6">
              <p>
                <strong>Aerosol Scientific Vials</strong> — We provide high-quality laboratory consumables,
                specializing in chromatography vials, caps, and septa under our own brand.
              </p>
              <p>
                We believe in building strong, lasting partnerships. Together with our clients and partners,
                we empower science and innovation for a better tomorrow. We supply genuine chromatography
                consumables and spares for various high-end instrument brands, collaborating with partners worldwide.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              {['Chromatography Vials', 'Caps & Septa', 'HPLC Columns', 'GC Columns', 'Syringes & Needles', 'Tubing & Fittings'].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 border border-blue-100">
                  <CheckCircle2 size={13} className="text-[#1565C0] shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="rounded-2xl bg-gradient-to-br from-[#1565C0] to-[#00838F] p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Torontech Collaboration</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Our collaboration with Torontech is committed to innovation and cost-effective solutions,
                continuously enhancing technology and service offerings. Dedicated divisions cater to diverse sectors:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {torontechSectors.map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5 text-xs text-blue-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-300 shrink-0" />
                    {s.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                <div className="font-bold text-gray-800 text-sm mb-1">Spectrophotometer / Spectrometer</div>
                <div className="text-gray-500">Used to analyze the concentration of elements in the sample being tested.</div>
              </div>
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                <div className="font-bold text-gray-800 text-sm mb-1">Universal Testing Machines</div>
                <div className="text-gray-500">Tensile Tester (UTM) used to test both tensile and compressive strength of materials.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Turnkey Projects ───────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <SectionHeading eyebrow="End-to-End Solutions" title="Turnkey Lab Projects" centered />
            <p className="text-gray-500 text-sm text-center mt-3 max-w-2xl">
              Aerosol Scientific is your one-stop solution. We facilitate complete lab setups in a fully compliant environment,
              including government approvals. Partner: <strong>Oculus Middle East</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {turnkeyItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1565C0] to-[#00838F] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
                <span className="text-sm text-gray-700 font-medium leading-snug">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <SectionHeading eyebrow="Our DNA" title="Core Values" centered />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1565C0] to-[#00838F] flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-white drop-shadow-md" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Company Introduction Download ───────────── */}
<section className="py-8 bg-gradient-to-br from-gray-50 to-blue-50/40">
  <div className="max-w-4xl mx-auto px-4">
    <div className="flex flex-col lg:flex-row items-center gap-10 bg-white rounded-3xl p-10 shadow-sm border border-blue-100">

      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-[#1565C0] mb-2 block">
          Resources
        </span>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Company Introduction
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-lg">
          Download our company brochure to get a complete overview of Aerosol Scientific —
          our product range, key partners, services, mission, and vision all in one document.
        </p>

        <a
          href="/brochure/Aerosol_Brief_introduction.pdf"
          download="Aerosol_Scientific_Introduction.pdf"
          className="inline-flex items-center gap-2 bg-[#1565C0] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0D47A1] hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
        >
          {/* Download icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Brochure (PDF)
        </a>
      </motion.div>

      {/* Right: PDF Preview Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-shrink-0"
      >
        <div className="w-52 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border border-blue-100 p-5 flex flex-col items-center gap-3 shadow-sm">
          {/* PDF Icon */}
          <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold text-gray-800">Aerosol Scientific</p>
            <p className="text-xs text-gray-400 mt-0.5">Company Introduction</p>
            <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-600 px-2 py-0.5 rounded-md">PDF</span>
          </div>
        </div>
      </motion.div>

    </div>
  </div>
</section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="py-16 bg-[#0586D3] text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">
            Your Partner for Quick & Cost-Effective Lab Solutions
          </h2>
          <p className="text-blue-200 mb-6">
            Contact us today to discuss your laboratory requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] font-bold px-8 py-3 rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  )
}