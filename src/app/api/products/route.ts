import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Product, Review } from '@/types'

 
/**
 * GET /api/products
 *
 * ⚠️  No Cache-Control / s-maxage here intentionally.
 * Caching is handled client-side by Zustand's 5-min TTL.
 * Server-side caching caused admin edits to stay stale because
 * Next.js/CDN served the old response even after the client TTL expired.
 */
export const dynamic = 'force-dynamic' // ensure this route is always fresh and not statically cached by Next.js    

export async function GET() {
  try {
    const supabaseAdmin = await createClient();
    // ── 1. Fetch all products ────────────────────────────────────────────────
    const { data: products, error: productsError } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('featured_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (productsError) {
      console.error('[/api/products] products query failed:', productsError)
      return NextResponse.json(
        { error: 'Failed to fetch products.' },
        { status: 500 }
      )
    }

    if (!products || products.length === 0) {
      return NextResponse.json([], {
        headers: cacheHeaders(),
      })
    }

    // ── 2. Fetch approved reviews for all products in one query ──────────────
    const productIds = products.map((p) => p.id)

    const { data: reviews, error: reviewsError } = await supabaseAdmin
      .from('reviews')
      .select('*')
      .in('product_id', productIds)
      .eq('approved', true)
      .order('created_at', { ascending: false })

    if (reviewsError) {
      // Non-fatal — return products without reviews rather than a hard failure
      console.warn('[/api/products] reviews query failed:', reviewsError)
    }

    // ── 3. Group reviews by product_id ───────────────────────────────────────
    const reviewsByProduct = new Map<string, Review[]>()
    for (const review of reviews ?? []) {
      const list = reviewsByProduct.get(review.product_id) ?? []
      list.push(review as Review)
      reviewsByProduct.set(review.product_id, list)
    }

    // ── 4. Merge & compute rating stats ─────────────────────────────────────
    const enriched: Product[] = products.map((product) => {
      const productReviews = reviewsByProduct.get(product.id) ?? []
      const review_count = productReviews.length
      const average_rating =
        review_count > 0
          ? Math.round(
              (productReviews.reduce((sum, r) => sum + r.rating, 0) /
                review_count) *
                10
            ) / 10 // one decimal place
          : null

      return {
        ...product,
        // Ensure array fields are never null (schema defaults to '{}')
        images: product.images ?? [],
        tags: product.tags ?? [],
        specifications: product.specifications ?? {},
        reviews: productReviews,
        average_rating,
        review_count,
      } as Product
    })

    return NextResponse.json(enriched, {
      status: 200,
      headers: cacheHeaders(),
    })
  } catch (err) {
    console.error('[/api/products] unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Cache headers — tells Next.js edge / CDN to cache for 5 minutes,
 * matching the Zustand store's 5-minute client TTL.
 */
function cacheHeaders(): Record<string, string> {
  return {
    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
  }
}