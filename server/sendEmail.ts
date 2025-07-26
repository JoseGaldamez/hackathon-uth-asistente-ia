'use server';
import nodemailer from "nodemailer";

const transporterOptions = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "josegaldamez1991@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
    },
}

const transporter = nodemailer.createTransport(transporterOptions);

export const sendEmail = async (body: { from: string; to: string; subject: string; content: string }) => {
    try {
        await transporter.sendMail({
            from: body.from,
            to: body.to,
            subject: body.subject,
            text: body.content,
        });
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        return { success: false, message: error };
    }
}


