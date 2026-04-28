import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Next.js 15: route params are async Promises
type RouteContext = { params: Promise<{ id: string }> }

// PUT /api/admin/products/[id]  — update product
export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { id } = await params
  if (!id) return NextResponse.json({ error: 'Missing product id' }, { status: 400 })

  const body = await req.json()
  const {
    name, description, short_description, category,
    brand, image_url, images, specifications, tags, featured,
  } = body

  if (!name || !category) {
    return NextResponse.json({ error: 'name and category are required' }, { status: 400 })
  }

  const supabase = createAdminClient()

  
  const { data, error } = await supabase
    .from('products')
    .update({
      name,
      description: description || null,
      short_description: short_description || null,
      category,
      brand: brand || 'Aerosol Scientific',
      image_url: image_url || null,
      images: images || [],
      specifications: specifications || {},
      tags: tags || [],
      featured: featured ?? false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()

  if (error) {
    console.error('[PUT /api/admin/products/[id]] DB error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data || data.length === 0) {
    console.error('[PUT /api/admin/products/[id]] 0 rows updated for id:', id)
    return NextResponse.json(
      { error: `No product found with id "${id}". It may have been deleted.` },
      { status: 404 },
    )
  }

  return NextResponse.json({ success: true, product: data[0] })
}

// DELETE /api/admin/products/[id]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params
  if (!id) return NextResponse.json({ error: 'Missing product id' }, { status: 400 })

  const supabase = createAdminClient()

  const { error, count } = await supabase
    .from('products')
    .delete({ count: 'exact' })
    .eq('id', id)

  if (error) {
    console.error('[DELETE /api/admin/products/[id]] DB error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (count === 0) {
    return NextResponse.json(
      { error: `No product found with id "${id}".` },
      { status: 404 },
    )
  }

  return NextResponse.json({ success: true })
}