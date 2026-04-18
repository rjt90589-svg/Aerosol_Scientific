'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, Quote, ChevronRight, Package, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import QuoteModal from '@/components/products/QuoteModal'
import ProductCard from '@/components/products/ProductCard'
import type { Product, Review } from '@/types'

interface Props {
  product: Product
  reviews: Review[]
  related: Product[]
}

export default function ProductDetailClient({ product, reviews, related }: Props) {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(product.image_url)
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', rating: 5, comment: '' })
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const avgRating = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...reviewForm, product_id: product.id }),
    })
    setReviewSubmitted(true)
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-[#1565C0]">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-[#1565C0]">Products</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>

        {/* Main Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Images */}
          <div>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 mb-3"
            >
              <img src={selectedImage} alt={product.name} className="w-full h-full object-contain p-6" />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-[#1565C0]' : 'border-gray-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{product.category}</span>
              <span className="text-xs text-gray-400">by {product.brand}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} className={i <= Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                ))}
              </div>
              <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Specs */}
            {Object.keys(product.specifications).length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex gap-2 text-sm">
                      <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}:</span>
                      <span className="font-medium text-gray-700">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div id="quote">
              <Button
                onClick={() => setQuoteOpen(true)}
                className="w-full bg-gradient-to-r from-[#1565C0] to-[#00838F] hover:shadow-lg hover:shadow-blue-500/25 py-6 text-base font-semibold"
              >
                <Quote className="mr-2" size={18} />
                Request a Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-400 text-sm">No reviews yet. Be the first!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                      {review.reviewer_name[0].toUpperCase()}
                    </div>
                    <span className="font-semibold text-sm">{review.reviewer_name}</span>
                    <div className="flex ml-auto">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={11} className={i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* Add Review Form */}
          {!reviewSubmitted ? (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm max-w-xl">
              <h3 className="font-bold text-lg mb-4">Write a Review</h3>
              <form onSubmit={submitReview} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Your Name</Label>
                    <Input value={reviewForm.name} onChange={e => setReviewForm(f => ({...f, name: e.target.value}))} placeholder="Name" className="mt-1" required />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={reviewForm.email} onChange={e => setReviewForm(f => ({...f, email: e.target.value}))} placeholder="email@..." className="mt-1" required />
                  </div>
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map(i => (
                      <button key={i} type="button" onClick={() => setReviewForm(f => ({...f, rating: i}))}>
                        <Star size={22} className={i <= reviewForm.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Comment</Label>
                  <Textarea value={reviewForm.comment} onChange={e => setReviewForm(f => ({...f, comment: e.target.value}))} rows={3} className="mt-1 resize-none" placeholder="Share your experience..." required />
                </div>
                <Button type="submit" className="bg-gradient-to-r from-[#1565C0] to-[#00838F]">Submit Review</Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <Check size={18} /> Review submitted! It will appear after approval.
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>

      <QuoteModal product={product} isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}