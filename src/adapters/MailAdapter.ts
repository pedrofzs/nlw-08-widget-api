export interface IMailAdapterData {
    subject: string;
    body: string;
}

export interface MailAdapter {
    sendMail: (data: IMailAdapterData) => Promise<void>;
}