import nodemailer from "nodemailer"
interface MailData {
    to: string,
    body: string,
    subject: string
}
export const sendMail = async (data: MailData) => {
    try {
        const mail = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "billjeshbaidya",
                pass: "uaqwilhkjautgahp"
            }
        })
        await mail.sendMail({
            from: "DjBillje Official",
            to: data.to,
            subject: data.subject,
            text: data.body
        })
    } catch (error) {
        console.log(error);
    }
}