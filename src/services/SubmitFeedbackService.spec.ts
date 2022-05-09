import { SubmitFeedbackService } from "./SubmitFeedbackService";

const submitFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
    { create: submitFeedbackSpy },
    { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {

    it('should be able to submit a feedback', async () => {  
        await expect(submitFeedbackService.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64,testImage.jpeg'
        })).resolves.not.toThrow();

        expect(submitFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without a type', async () => {
        await expect(submitFeedbackService.execute({
            type: '',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64,testImage.jpeg'
        })).rejects.toThrow();
    });
    
    it('should not be able to submit a feedback without a comment', async () => {
        await expect(submitFeedbackService.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,testImage.jpeg'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedbackService.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'testImage.jpeg'
        })).rejects.toThrow();
    });
    
});