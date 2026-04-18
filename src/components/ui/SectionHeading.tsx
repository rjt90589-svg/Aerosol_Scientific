'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionHeading({ eyebrow, title, subtitle, centered = false, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(centered ? 'text-center' : '', className)}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#1565C0] bg-blue-50 px-3 py-1 rounded-full mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
        {title.includes('|') ? (
          <>
            {title.split('|')[0]}
            <span className="gradient-text">{title.split('|')[1]}</span>
          </>
        ) : title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={cn('flex mt-4', centered ? 'justify-center' : '')}>
        <div className="h-1 w-12 bg-gradient-to-r from-[#1565C0] to-[#00838F] rounded-full" />
        <div className="h-1 w-4 bg-gradient-to-r from-[#1565C0] to-[#00838F] rounded-full ml-1 opacity-40" />
      </div>
    </motion.div>
  )
}