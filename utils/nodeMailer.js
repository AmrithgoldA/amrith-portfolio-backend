require("dotenv").config()
const crypto = require('crypto')
const nodeMailer = require('nodemailer')

// Gmail only sends as the authenticated account, so MAIL_ID must be goldandgold1002@gmail.com
const MAIL_ID = process.env.MAIL_ID?.trim()
// Google displays App Passwords in groups with spaces; the spaces aren't part of the password
const MAIL_PASS = process.env.MAIL_PASS?.replace(/\s+/g, '')
// Inbox that receives enquiries; defaults to the sending account
const ADMIN_MAIL = process.env.ADMIN_MAIL?.trim() || MAIL_ID
const SENDER = { name: 'Amrith Gold', address: MAIL_ID }

const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: MAIL_ID,
        pass: MAIL_PASS,
    },
});

const textStyle = 'font-family: Arial, sans-serif; color: #333;'
const cellStyle = 'font-family: Arial, sans-serif; color: #333; padding: 6px 12px; border: 1px solid #ddd; vertical-align: top;'

function escapeHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function createEnquiryId(date) {
    const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(date).replace(/-/g, '')
    const suffix = crypto.randomBytes(3).toString('hex').toUpperCase()
    return `ENQ-${day}-${suffix}`
}

async function mailer(contactInfo) {
    if (!MAIL_ID || !MAIL_PASS) {
        const error = new Error('MAIL_ID or MAIL_PASS environment variable is not set')
        error.code = 'EMAILCONFIG'
        throw error
    }

    const now = new Date()
    const enquiry = {
        ...contactInfo,
        id: createEnquiryId(now),
        receivedAt: now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    }

    // Notify admin first so the enquiry isn't lost if the auto-reply fails
    await adminMailer(enquiry)

    try {
        const info = await transporter.sendMail({
            from: SENDER,
            to: { name: enquiry.name, address: enquiry.email },
            subject: `Thanks for reaching out - Enquiry ${enquiry.id}`,
            html: `
                <p style="${textStyle}">
                    Dear ${escapeHtml(enquiry.name)},
                </p>
                <p style="${textStyle}">
                    I have received your enquiry.
                    Thanks for showing your interest and will get back to you as soon as possible regarding your inquiry.
                </p>
                <p style="${textStyle}">
                    Your reference number is <strong>${enquiry.id}</strong>.
                    Please quote it if you reply to this email.
                </p>
                <p style="${textStyle}">
                    Subject: ${escapeHtml(enquiry.subject || 'No subject')}
                </p>
                <p style="${textStyle} margin-bottom: 0;">
                    Regards,
                </p>
                <p style="${textStyle} margin-top: 2px;">
                    Amrith Gold
                </p>
            `,
        });

        console.log("Auto-reply sent for %s: %s", enquiry.id, info.messageId);
    } catch (error) {
        // Enquiry already reached the admin inbox, so don't fail the request
        console.error(`Auto-reply failed for ${enquiry.id}:`, error);
    }

    return enquiry.id
}

async function adminMailer(enquiry) {
    const rows = [
        ['Reference', enquiry.id],
        ['Received', enquiry.receivedAt],
        ['Name', enquiry.name],
        ['Email', enquiry.email],
        ['Subject', enquiry.subject || 'No subject'],
        ['Message', enquiry.message],
    ]

    const info = await transporter.sendMail({
        from: SENDER,
        to: ADMIN_MAIL,
        // Hitting "Reply" in Gmail goes straight to the visitor
        replyTo: { name: enquiry.name, address: enquiry.email },
        subject: `[Portfolio Enquiry ${enquiry.id}] ${enquiry.subject || 'No subject'}`,
        html: `
            <p style="${textStyle}">
                Hey, you got a new enquiry from your portfolio!
            </p>
            <table style="border-collapse: collapse;">
                ${rows.map(([label, value]) => `
                    <tr>
                        <td style="${cellStyle} font-weight: bold;">${label}</td>
                        <td style="${cellStyle}">${escapeHtml(value).replace(/\n/g, '<br>')}</td>
                    </tr>
                `).join('')}
            </table>
        `,
    });

    console.log("Enquiry %s sent to admin: %s", enquiry.id, info.messageId);
}

module.exports = {
    mailer,
    adminMailer
}
