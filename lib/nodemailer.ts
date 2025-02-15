import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendEmail(subject:string, text: string) {
    try {
        const mailOptions = {
            from: `"Simpatico Logistics Services LLC" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_RECEIVER,
            subject: subject,
            text: text,
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (error) {
        console.error("Email sending error: ", error);
    }
}