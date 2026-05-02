import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { resend, ADMIN_EMAIL } from '@/lib/resend'
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const supabase = await createClient()
  let query = supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { full_name, email, phone, company, product_name, quantity, message } = body

    if (!full_name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('quote_requests')
      .insert([{
        full_name,
        email,
        phone,
        company: company || null,
        product_name: product_name || null,
        quantity: quantity || null,
        message: message || null,
        status: 'new',
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // ───── SEND EMAIL ─────
    const { error: mailError } = await resend.emails.send({
      from: 'Aerosol Scientific <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: `💰 New Quote Request — ${full_name}`,
      html: `
      <div style="font-family: Arial, sans-serif; background:#f5f7fb; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.05);">

          <!-- Header -->
          <div style="background:linear-gradient(135deg,#1251A3,#0ea5e9); padding:18px 24px; color:#fff;">
            <h2 style="margin:0;">New Quote Request</h2>
            <p style="margin:4px 0 0; font-size:12px;">Aerosol Scientific</p>
          </div>

          <!-- Content -->
          <div style="padding:20px 24px; color:#333;">
            <p>A new quote request has been submitted:</p>

            <table style="width:100%; font-size:14px;">
              <tr><td><strong>Name:</strong></td><td>${full_name}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
              <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
              <tr><td><strong>Company:</strong></td><td>${company || '-'}</td></tr>
              <tr><td><strong>Product:</strong></td><td>${product_name || '-'}</td></tr>
              <tr><td><strong>Quantity:</strong></td><td>${quantity || '-'}</td></tr>
            </table>

            ${
              message
                ? `<div style="margin-top:16px;">
                    <strong>Message:</strong>
                    <p style="background:#f1f5f9;padding:10px;border-radius:6px;">
                      ${message}
                    </p>
                  </div>`
                : ''
            }

            <a href="mailto:${email}"
              style="display:inline-block;margin-top:18px;padding:10px 16px;background:#1251A3;color:#fff;border-radius:6px;text-decoration:none;">
              Reply to Customer
            </a>
          </div>

          <!-- Footer -->
          <div style="background:#f9fafb;padding:12px;text-align:center;font-size:11px;color:#888;">
            Quote request from website
          </div>

        </div>
      </div>
      `,
    })

    if (mailError) {
      console.error('EMAIL ERROR:', mailError)
    }

    return NextResponse.json({ success: true, quote: data }, { status: 201 })

  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { id, status } = body

  if (!id || !status) return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })

  const supabase = await createClient()
  const { error } = await supabase
    .from('quote_requests')
    .update({ status })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}