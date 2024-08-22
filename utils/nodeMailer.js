require("dotenv").config()
const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user:process.env.MAIL_ID,
        pass:process.env.MAIL_PASS,
    },
});

async function mailer(contactInfo) {
    const info = await transporter.sendMail({
        from: process.env.MAIL_ID,
        to: contactInfo.email,
        subject: "Mail from portfolio",
        html: `<p>Dear ${contactInfo.name},</P>
                </br>
                <p>I have received your email.</p>
                </b>
                <p>I appreciate your interest and will get back to you as soon as possible regarding your inquiry.</p>
                </br>
                <h4>regards,</h4>
                </br><p>Amrith Gold</p>`,
    });

    adminMailer(contactInfo)

    console.log("Message sent: %s", info.messageId);

}

async function adminMailer(contactInfo) {
    const info = await transporter.sendMail({
        from: process.env.MAIL_ID,
        to: process.env.MAIL_ID,
        subject: "Admin Mail",
        html: `<b>Hey, you got a new message from your portfolio! 
                from ${contactInfo.email} </b>`,
    });

    console.log("Message sent: %s", info.messageId);

}

module.exports = {
    mailer,
    adminMailer
}