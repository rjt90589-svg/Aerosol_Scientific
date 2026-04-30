'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, Quote } from 'lucide-react'
import QuoteModal from '@/components/products/QuoteModal'
import type { Product } from '@/types'

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  const [quoteOpen, setQuoteOpen] = useState(false)

  const rating = product.average_rating ?? 0
  const reviewCount = product.review_count ?? 0
  const displayRating = rating > 0 ? rating.toFixed(1) : null

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07 }}
        whileHover={{ y: -4 }}
        className="group card-spectrum grad-border overflow-hidden transition-all duration-300"
      >
        {/* Image */}
        <Link
          href={`/products/${product.slug}`}
          className="block aspect-square overflow-hidden bg-gray-50 relative"
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </div>
          )}

          {/* Category + optional subcategory badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <span className="pill pill-blue">
              {product.category}
            </span>
            {product.subcategory && (
              <span className="pill pill-teal">
                {product.subcategory}
              </span>
            )}
          </div>
        </Link>

        {/* Info */}
        <div className="p-4">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-[var(--text-primary)] text-sm leading-tight mb-1 group-hover:text-sci-blue transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-[var(--text-muted)] text-xs mb-3 line-clamp-2">
            {product.short_description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(i => {
              const filled = rating >= i
              const half = !filled && rating >= i - 0.5
              return (
                <Star
                  key={i}
                  size={10}
                  className={
                    filled || half
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-200 fill-gray-200'
                  }
                />
              )
            })}
            {displayRating ? (
              <span className="text-xs text-[var(--text-muted)] ml-1">
                {displayRating} ({reviewCount})
              </span>
            ) : (
              <span className="text-xs text-[var(--text-muted)] ml-1">No reviews yet</span>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={() => setQuoteOpen(true)}
            className="flex items-center justify-center gap-1.5 w-full bg-grad-primary text-white text-xs font-semibold py-2.5 rounded-xl hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300"
          >
            <Quote size={12} />
            Get a Quote
          </button>
        </div>
      </motion.div>

      <QuoteModal
        product={product}
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
      />
    </>
  )
}