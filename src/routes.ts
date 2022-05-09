import express from 'express';

import { SubmitFeedbackService } from './services/SubmitFeedbackService';
import { NodemailerMailAdapter } from './adapters/nodemailer/NodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedbackService = new SubmitFeedbackService(prismaRepository, nodemailerMailAdapter);

    await submitFeedbackService.execute({
        type,
        comment,
        screenshot
    });    

    return res.status(201).send();
});