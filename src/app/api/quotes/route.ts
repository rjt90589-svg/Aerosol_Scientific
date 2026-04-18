import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { resend, ADMIN_EMAIL } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = createAdminClient()

    const { error } = await supabase.from('quote_requests').insert([body])
    if (error) throw error

    await resend.emails.send({
      from: 'Aerosol Scientific <noreply@aerosolscientific.com>',
      to: [ADMIN_EMAIL],
      subject: `New Quote Request: ${body.product_name || 'General'}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Product:</strong> ${body.product_name || 'N/A'}</p>
        <p><strong>Name:</strong> ${body.full_name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Company:</strong> ${body.company || 'N/A'}</p>
        <p><strong>Quantity:</strong> ${body.quantity || 'N/A'}</p>
        <p><strong>Message:</strong> ${body.message || 'N/A'}</p>
        <hr/>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/quotes">View in Admin Panel</a></p>
      `,
    })

    // Confirmation email to customer
    await resend.emails.send({
      from: 'Aerosol Scientific <noreply@aerosolscientific.com>',
      to: [body.email],
      subject: 'Quote Request Received — Aerosol Scientific',
      html: `
        <h2>Thank you, ${body.full_name}!</h2>
        <p>We've received your quote request for <strong>${body.product_name || 'our products'}</strong>.</p>
        <p>Our team will get back to you within <strong>24 hours</strong>.</p>
        <br/>
        <p>Best regards,<br/>Aerosol Scientific Team<br/>sales@aerosolscientific.com</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}