'use client'
import { motion } from 'framer-motion'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  bgImage?: string
}

export default function PageHero({ eyebrow, title, subtitle, bgImage }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0D2240] via-[#0D47A1] to-[#006064] py-20 md:py-28">
      {/* Grid overlay */}
      <div className="absolute inset-0 sci-grid-bg opacity-30" />
      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00838F] rounded-full blur-[120px] opacity-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1565C0] rounded-full blur-[80px] opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 text-white text-center">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#00E5FF] bg-white/10 px-3 py-1 rounded-full mb-4"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}