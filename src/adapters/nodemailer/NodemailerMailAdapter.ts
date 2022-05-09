import nodemailer from 'nodemailer';

import { IMailAdapterData, MailAdapter } from "../MailAdapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "cb4f3516425125",
        pass: "cde943f941ce41"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: IMailAdapterData) {
        await transport.sendMail({
            from: 'Feedget Team <hi@feedget.com>',
            to: 'Pedro Stefano <pedro.fzs@hotmail.com>',
            subject,
            html: body
        });
    }
}