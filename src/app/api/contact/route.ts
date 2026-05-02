import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { resend, ADMIN_EMAIL } from '@/lib/resend'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const supabase = await createAdminClient()
  let query = supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}


export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = createAdminClient()

    await supabase.from('contact_messages').insert([body])

   const { data, error } = await resend.emails.send({
  from: 'Aerosol Scientific <onboarding@resend.dev>',
  to: [ADMIN_EMAIL],
  subject: `🔔 New Lead: ${body.full_name}`,
  html: `
  <div style="font-family: Arial, sans-serif; background:#f5f7fb; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.05);">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#1251A3,#0ea5e9); padding:18px 24px; color:#fff;">
        <h2 style="margin:0; font-size:18px;">Aerosol Scientific</h2>
        <p style="margin:4px 0 0; font-size:12px; opacity:0.9;">New Website Lead</p>
      </div>

      <!-- Content -->
      <div style="padding:20px 24px; color:#333;">
        <p style="margin-bottom:16px;">You’ve received a new enquiry from your website:</p>

        <table style="width:100%; font-size:14px; border-collapse:collapse;">
          <tr><td style="padding:6px 0;"><strong>Name:</strong></td><td>${body.full_name}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Email:</strong></td><td>${body.email}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Phone:</strong></td><td>${body.phone}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Reason:</strong></td><td>${body.reason}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Interest:</strong></td><td>${body.area_of_interest}</td></tr>
        </table>

        <div style="margin-top:16px;">
          <strong>Message:</strong>
          <p style="margin-top:6px; background:#f1f5f9; padding:10px; border-radius:6px;">
            ${body.message}
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f9fafb; padding:12px 24px; font-size:11px; color:#888; text-align:center;">
        This email was sent from your website contact form
      </div>

    </div>
  </div>
  `,
});

if (error) {  
  return NextResponse.json({ error: error.message }, { status: 500 })
}     

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}