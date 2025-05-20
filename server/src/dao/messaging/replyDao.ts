import { injectable } from 'inversify'
import { PrismaClient, Reply } from '@prisma/client'
import { injectPrismaClient } from '../../util/prismaHelper'

@injectable()
export class ReplyDao {
    constructor(@injectPrismaClient() private prisma: PrismaClient) {}

    //Gets a reply by UUID.
    public async getReplyById(replyId: string): Promise<Reply> {
        return this.prisma.reply.findUniqueOrThrow({
            where: { id: replyId },
        })
    }

    //Get all replies in a post.
    //Current page and page size are used for pagination. Current page is 1-indexed.
    //Most recently created replies are shown first.
    public async getRepliesInPost(postId: string, currentPage: number, pageSize: number): Promise<Reply[]> {
        return this.prisma.reply.findMany({
            where: { postId: postId },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        })
    }

    //Create a new reply.
    //The reply is associated with a post and an author.
    public async createReply(postId: string, content: string, authorId: string): Promise<Reply> {
        return this.prisma.reply.create({
            data: {
                content: content,
                postId: postId,
                authorId: authorId
            },
        })
    }

    //Update a reply with new content.
    public async updateReply(replyId: string, content: string): Promise<Reply> {
        return this.prisma.reply.update({
            where: { id: replyId },
            data: {
                content: content,
            },
        })
    }

    //Delete a reply by UUID.
    public async deleteReply(replyId: string): Promise<Reply> {
        return this.prisma.reply.delete({
            where: { id: replyId },
        })
    }
}