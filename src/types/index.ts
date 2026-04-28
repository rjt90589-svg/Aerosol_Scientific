
export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  category: string
  brand: string
  image_url: string | null
  images: string[]
  specifications: Record<string, string | number | boolean>
  tags: string[]
  featured: boolean
  created_at: string
  updated_at: string
  // Joined from reviews table (approved only)
  reviews: Review[]
  // Computed from reviews
  average_rating: number | null
  review_count: number
}
export interface Review {
  id: string
  product_id: string
  reviewer_name: string
  reviewer_email: string
  rating: number // 1–5
  comment: string | null
  approved: boolean
  created_at: string
}

export interface QuoteRequest {
  id: string
  full_name: string
  email: string
  phone: string
  company?: string
  product_id?: string
  product_name?: string
  quantity?: string
  message?: string
  area_of_interest?: string
  status: 'new' | 'viewed' | 'responded' | 'closed'
  created_at: string
}

export interface ContactMessage {
  id: string
  full_name: string
  email: string
  phone: string
  reason?: string
  area_of_interest?: string
  message?: string
  status: string
  created_at: string
}