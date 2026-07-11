import { Resend } from 'resend'
import { waitlistConfirmationEmail } from '@/lib/emailTemplates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
try {
    const { name, phone, email } = await req.json()

    const { data: d1, error: e1 } = await resend.emails.send({
        from: 'LIMITNESS <hello@limitness.co>',
        to: email,
        subject: 'You are on the waitlist.',
        html: waitlistConfirmationEmail(name)
    })
    console.log('User email:', d1, e1)

    const { data: d2, error: e2 } = await resend.emails.send({
        from: 'LIMITNESS <hello@limitness.co>',
        to: 'hello@limitness.co',
        subject: 'New Waitlist Application',
        html: `<p>Name: ${name}<br/>Phone: ${phone}<br/>Email: ${email}</p>`
    })
    console.log('Notify email:', d2, e2)

        return Response.json({ success: true })
    } catch {
        return Response.json({ success: false, error: 'Failed to send email' }, { status: 500 })
    }
}
