export interface IFeedbacksRepositoryData {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedbacksRepository {
    create: (data: IFeedbacksRepositoryData) => Promise<void>;
}