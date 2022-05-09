import { MailAdapter } from "../adapters/MailAdapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";

interface ISubmitFeedbackServiceData {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    private feedbacksRepository;
    private mailAdapter;

    constructor(feedbacksRepository: FeedbacksRepository, mailAdapter: MailAdapter) {
        this.feedbacksRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }

    async execute(request: ISubmitFeedbackServiceData) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type field is required.');
        }
        
        if (!comment) {
            throw new Error('Comment field is required.');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64') ) {
            throw new Error('Invalid screenshot format.');
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });

        await this.mailAdapter.sendMail({
            subject: 'New feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111111">`,
                `<p>Feedback type: ${type}</p>`,
                `<p>Comment: ${comment}</p>`,
                screenshot ? `<p>Screenshot: <br><br> <img src="${screenshot}" alt="Screenshot" />` : ``,
                `</p>`,
                `</div>`
            ].join('\n')
        });
    }
}