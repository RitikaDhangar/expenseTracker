import nodemailer from 'nodemailer'
export const sendEmail = async({to,subject,html}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.PASSWORD_ADMIN,
        }
    });
    await transporter.sendMail({
        from: process.env.EMAIL_ADMIN,
        to,
        subject,
        html
    })
}