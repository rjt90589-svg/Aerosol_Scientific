import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { resend, ADMIN_EMAIL } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = createAdminClient()

    await supabase.from('contact_messages').insert([body])

    await resend.emails.send({
      from: 'Aerosol Scientific <noreply@aerosolscientific.com>',
      to: [ADMIN_EMAIL],
      subject: `New Contact: ${body.reason || 'General'} from ${body.full_name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${body.full_name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Reason:</strong> ${body.reason}</p>
        <p><strong>Area of Interest:</strong> ${body.area_of_interest}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}