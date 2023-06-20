import { ApolloError } from 'apollo-server';
import nodemailer from 'nodemailer';
import { renderFile } from './renderFile';
import path = require("path")

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_KEY
    },
    from: process.env.NODEMAILER_EMAIL
});

export enum Email {
    CONFIRMATION_EMAIL,
}

interface EmailMapping {
    [Email.CONFIRMATION_EMAIL]: { firstname: string };
}

type EmailOptions<E extends Email> = EmailMapping[E];

interface emailData {
    filenameText: string;
    subject: string;
    args: { [key: string]: string };
}

function getTemplateData<E extends Email>(email: E, receiverEmail: string, options: EmailOptions<E>): emailData | undefined {
    if (email === Email.CONFIRMATION_EMAIL) {
        return {
            filenameText: 'confirmation_email.html',
            subject: 'Email de confirmation de votre compte City Guide',
            args: {
                ...options,
            },
        };
    }
}

export async function sendMail<E extends Email>(email: E, receiverEmail: string, options: EmailOptions<E>): Promise<void> {
    if (transporter === null) {
        throw new ApolloError('Could not send mail, transporter is null!');
    }

    if (receiverEmail.length === 0) {
        throw new ApolloError('Could not send mail, receiver is null or undefined!');
    }

    // Get email template data
    const templateData = getTemplateData<E>(email, receiverEmail, options);
    if (templateData === undefined) {
        throw new ApolloError(`Template ${email} not found!`);
    }

    // Compile text and html
    const renderOptions = {
        ...templateData.args,
        receiverEmail,
    };

    try {
        const html = await renderFile(path.join(__dirname, 'templates', templateData.filenameText), renderOptions);
        const text = await renderFile(path.join(__dirname, 'templates', templateData.filenameText), renderOptions);
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"cityguidecontact@gmail.com`, // sender address
            to: receiverEmail, // receiver address
            subject: templateData.subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log(`Message sent: ${info.messageId}`);

    } catch (e) {
        console.log(e)
    }
}