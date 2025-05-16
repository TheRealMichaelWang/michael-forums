import { injectable } from 'inversify'
import { PrismaClient, Reply } from '@prisma/client'
import { injectPrismaClient } from '../../util/prismaHelper'

@injectable()
export class ReplyDao {
    constructor(@injectPrismaClient() private prisma: PrismaClient) {}

    public async getReplyById(replyId: string): Promise<Reply> {
        return this.prisma.reply.findUniqueOrThrow({
            where: { id: replyId },
        })
    }

    public async getRepliesInPost(postId: string, currentPage: number, pageSize: number): Promise<Reply[]> {
        return this.prisma.reply.findMany({
            where: { postId: postId },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        })
    }

    public async createReply(content: string, postId: string, authorId: string): Promise<Reply> {
        return this.prisma.reply.create({
            data: {
                content: content,
                postId: postId,
                authorId: authorId
            },
        })
    }

    public async updateReply(replyId: string, content: string): Promise<Reply> {
        return this.prisma.reply.update({
            where: { id: replyId },
            data: {
                content: content,
            },
        })
    }

    public async deleteReply(replyId: string): Promise<Reply> {
        return this.prisma.reply.delete({
            where: { id: replyId },
        })
    }
}