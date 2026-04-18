import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = createAdminClient()
    await supabase.from('reviews').insert([{
      product_id: body.product_id,
      reviewer_name: body.name,
      reviewer_email: body.email,
      rating: body.rating,
      comment: body.comment,
      approved: false,
    }])
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}