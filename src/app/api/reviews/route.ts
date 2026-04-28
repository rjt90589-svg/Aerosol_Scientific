import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const product_id = searchParams.get('product_id')

  const supabase = await createClient()
  let query = supabase
    .from('reviews')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false })

  if (product_id) query = query.eq('product_id', product_id)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { product_id, name, email, rating, comment } = body

  if (!product_id || !name || !email || !rating || !comment) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .insert([{
      product_id,
      reviewer_name: name,
      reviewer_email: email,
      rating: Number(rating),
      comment,
      approved: false, // pending moderation
    }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, review: data }, { status: 201 })
}