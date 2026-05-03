'use client'
import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, Quote } from 'lucide-react'
import QuoteModal from '@/components/products/QuoteModal'
import type { Product } from '@/types'

interface Props {
  product: Product
  index?: number
}

const ZOOM_FACTOR = 3.5
const ZOOM_PANEL_SIZE = 360
const LENS_SIZE = 80

interface ZoomState {
  visible: boolean
  panelX: number
  panelY: number
  lensX: number
  lensY: number
  bgX: number
  bgY: number
  bgSizeW: number
  bgSizeH: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [zoom, setZoom] = useState<ZoomState>({
    visible: false,
    panelX: 0, panelY: 0,
    lensX: 0, lensY: 0,
    bgX: 0, bgY: 0,
    bgSizeW: 0, bgSizeH: 0,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img || !product.image_url) return
    if (!img.complete || !img.naturalWidth) return   // image not loaded yet

    const cRect = container.getBoundingClientRect()
    const cW = cRect.width
    const cH = cRect.height

    // ── Step 1: Find the actual rendered image bounds inside the container
    // object-contain centers the image; calculate its true rendered rect
    const naturalAspect = img.naturalWidth / img.naturalHeight
    const containerAspect = cW / cH

    let renderedW: number, renderedH: number
    if (containerAspect > naturalAspect) {
      // container wider → image is height-constrained
      renderedH = cH
      renderedW = cH * naturalAspect
    } else {
      // container taller → image is width-constrained
      renderedW = cW
      renderedH = cW / naturalAspect
    }

    const imgLeft = (cW - renderedW) / 2   // offset of image inside container
    const imgTop  = (cH - renderedH) / 2

    // ── Step 2: Cursor position relative to container
    const relX = e.clientX - cRect.left
    const relY = e.clientY - cRect.top

    // Only activate zoom when cursor is over actual image pixels, not blank space
    if (
      relX < imgLeft || relX > imgLeft + renderedW ||
      relY < imgTop  || relY > imgTop  + renderedH
    ) {
      setZoom(prev => ({ ...prev, visible: false }))
      return
    }

    // ── Step 3: Position within the rendered image (0 → renderedW/H)
    const imgRelX = relX - imgLeft
    const imgRelY = relY - imgTop

    // ── Step 4: Pixel-accurate background-position for zoom panel
    // Scale the rendered image up by ZOOM_FACTOR, then offset so the
    // cursor point lands at the center of the ZOOM_PANEL_SIZE square
    const bgSizeW = renderedW * ZOOM_FACTOR
    const bgSizeH = renderedH * ZOOM_FACTOR

    const bgX = Math.max(0, Math.min(bgSizeW - ZOOM_PANEL_SIZE, imgRelX * ZOOM_FACTOR - ZOOM_PANEL_SIZE / 2))
    const bgY = Math.max(0, Math.min(bgSizeH - ZOOM_PANEL_SIZE, imgRelY * ZOOM_FACTOR - ZOOM_PANEL_SIZE / 2))

    // ── Step 5: Panel placement — right of cursor, flip left near screen edge
    const GAP = 20
    const spaceRight = window.innerWidth - e.clientX
    const panelX = spaceRight > ZOOM_PANEL_SIZE + GAP + 24
      ? e.clientX + GAP
      : e.clientX - ZOOM_PANEL_SIZE - GAP

    const panelY = Math.min(
      window.innerHeight - ZOOM_PANEL_SIZE - 16,
      Math.max(16, e.clientY - ZOOM_PANEL_SIZE / 2)
    )

    setZoom({
      visible: true,
      panelX, panelY,
      lensX: e.clientX,   // lens follows the real screen cursor (fixed coords)
      lensY: e.clientY,
      bgX, bgY,
      bgSizeW, bgSizeH,
    })
  }, [product.image_url])

  const handleMouseLeave = useCallback(() => {
    setZoom(prev => ({ ...prev, visible: false }))
  }, [])

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
        {/* ── Image zone ── */}
        <div
          ref={containerRef}
          className="relative h-44 overflow-hidden bg-gray-50"
          style={{ cursor: product.image_url ? 'none' : 'default' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            {product.image_url ? (
              <img
                ref={imgRef}
                src={product.image_url}
                alt={product.name}
                className="w-full h-full p-6 object-contain pointer-events-none select-none"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </div>
            )}
          </Link>

          {/* Zoom hint badge — fades in on card hover, hides during zoom */}
          {product.image_url && (
            <div
              className="absolute bottom-2 right-2 bg-transparent text-white rounded-full p-1.5 transition-opacity duration-300 pointer-events-none"
              style={{ opacity: zoom.visible ? 0 : undefined }}
            >
              <svg
                width="11" height="11" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
              </svg>
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="p-4">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-[var(--text-primary)] text-sm leading-tight mb-1 group-hover:text-sci-blue transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-[var(--text-muted)] text-xs mb-3 line-clamp-2">
            {product.short_description}
          </p>

          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(i => {
              const filled = rating >= i
              const half = !filled && rating >= i - 0.5
              return (
                <Star
                  key={i}
                  size={10}
                  className={filled || half ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                />
              )
            })}
            {displayRating ? (
              <span className="text-xs text-[var(--text-muted)] ml-1">{displayRating} ({reviewCount})</span>
            ) : (
              <span className="text-xs text-[var(--text-muted)] ml-1">No reviews yet</span>
            )}
          </div>

          <button
            onClick={() => setQuoteOpen(true)}
            className="flex items-center justify-center gap-1.5 w-full bg-grad-primary text-white text-xs font-semibold py-2.5 rounded-xl hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300"
          >
            <Quote size={12} />
            Get a Quote
          </button>
        </div>
      </motion.div>

      {/* ── Lens ring — fixed so it NEVER gets clipped by overflow:hidden ── */}
      {zoom.visible && product.image_url && (
        <div
          className="pointer-events-none"
          style={{
            position: 'fixed',
            left: zoom.lensX - LENS_SIZE / 2,
            top: zoom.lensY - LENS_SIZE / 2,
            width: LENS_SIZE,
            height: LENS_SIZE,
            zIndex: 9998,
            borderRadius: '50%',
            border: '2.5px solid rgba(59,130,246,0.85)',
            boxShadow: '0 0 0 1.5px rgba(255,255,255,0.9), 0 2px 16px rgba(59,130,246,0.25)',
            background: 'rgba(59,130,246,0.04)',
          }}
        />
      )}

      {/* ── Zoom panel — fixed, pixel-accurate position ── */}
      {zoom.visible && product.image_url && (
        <div
          className="pointer-events-none rounded-2xl overflow-hidden"
          style={{
            position: 'fixed',
            left: zoom.panelX,
            top: zoom.panelY,
            width: ZOOM_PANEL_SIZE,
            height: ZOOM_PANEL_SIZE,
            zIndex: 9999,
            border: '1.5px solid rgba(203,213,225,0.75)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.15), 0 4px 20px rgba(0,0,0,0.08)',
            background: '#f9fafb',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${product.image_url})`,
              backgroundRepeat: 'no-repeat',
              // pixel-based size + position → exact accuracy at all edges & corners
              backgroundSize: `${zoom.bgSizeW}px ${zoom.bgSizeH}px`,
              backgroundPosition: `-${zoom.bgX}px -${zoom.bgY}px`,
            }}
          />
          <span
            className="absolute bottom-2 right-2.5 text-[10px] font-medium text-gray-400 select-none"
          >
            {ZOOM_FACTOR}× zoom
          </span>
        </div>
      )}

      <QuoteModal product={product} isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}