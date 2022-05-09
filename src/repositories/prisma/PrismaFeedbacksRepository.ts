import { prisma } from '../../prisma';
import { FeedbacksRepository, IFeedbacksRepositoryData } from '../FeedbacksRepository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({ type, comment, screenshot }: IFeedbacksRepositoryData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        });
    }
}