// /api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// GET /api/admin/products?search=xxx
export async function GET(req: NextRequest) {
  const supabaseAdmin = createAdminClient() // ← moved inside
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search')

  let query = supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (search) query = query.ilike('name', `%${search}%`)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}


// POST /api/admin/products
export async function POST(req: NextRequest) {
  const supabaseAdmin = createAdminClient()

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const {
    name, slug: bodySlug, description, short_description, category,
    subcategory,   // ← was missing
    brand, image_url, images, specifications, tags, featured,
    features,      // ← was missing
  } = body

  if (!name || !category) {
    return NextResponse.json({ error: 'name and category are required' }, { status: 400 })
  }

  const slug = bodySlug || slugify(name)

  const { data: existing } = await supabaseAdmin
    .from('products')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (existing) {
    return NextResponse.json(
      { error: `A product with slug "${slug}" already exists. Change the product name or slug.` },
      { status: 409 }
    )
  }

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert([{
      name,
      slug,
      description: description || null,
      short_description: short_description || null,
      category,
      subcategory: subcategory || null,   // ← was hardcoded null
      brand: brand || 'Aerosol Scientific',
      image_url: image_url || null,
      images: images || [],
      specifications: specifications || {},
      tags: tags || [],
      featured: featured ?? false,
      features: features || [],           // ← was missing
    }])
    .select()
    .single()

  if (error) {
    console.error('[POST /api/admin/products] DB error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, product: data }, { status: 201 })
}