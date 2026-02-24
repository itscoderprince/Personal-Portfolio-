'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(prevState: any, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const company = formData.get('company') as string;
        const phone = formData.get('phone') as string;
        const message = formData.get('message') as string;

        if (!name || !email || !message) {
            return { success: false, message: 'Please fill in all required fields (Name, Email, Message).' };
        }

        const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

        if (!SMTP_EMAIL || !SMTP_PASSWORD) {
            console.error('SMTP credentials are not set in environment variables.');
            return { success: false, message: 'Server configuration error. Please try again later.' };
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', // Standard fallback, you can change this or use host/port config
            auth: {
                user: SMTP_EMAIL,
                pass: SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: SMTP_EMAIL,
            to: SMTP_EMAIL, // Send email to yourself
            replyTo: email,
            subject: `New Portfolio Contact from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}
        Phone: ${phone || 'N/A'}
        
        Message:
        ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <br />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return { success: true, message: 'Message sent successfully! I will get back to you soon.' };

    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, message: 'Failed to send message. Please try again later.' };
    }
}
