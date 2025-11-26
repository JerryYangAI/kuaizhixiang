import { NextRequest, NextResponse } from 'next/server';

// TODO: Implement actual email sending (e.g., using SendGrid, Resend, or Nodemailer)
// For now, this is a placeholder that logs the contact form submission

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // TODO: Send email using your email service
    // Example with SendGrid:
    // await sgMail.send({
    //   to: 'support@kuaizhixiang.com',
    //   from: 'noreply@kuaizhixiang.com',
    //   subject: `Contact Form: ${name}`,
    //   text: `From: ${email}\n\n${message}`,
    // });

    // For now, just log it
    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
