import { injectable } from 'inversify'
import { PrismaClient, Forum } from '@prisma/client'
import { injectPrismaClient } from '../../util/prismaHelper'

@injectable()
export class ForumDao {
    constructor(@injectPrismaClient() private prisma: PrismaClient) {}
    
    public async getForumById(forumId: string): Promise<Forum> {
        return this.prisma.forum.findUniqueOrThrow({
            where: { id: forumId },
        })
    }
    
    public async getForums(currentPage: number, pageSize: number): Promise<Forum[]> {
        return this.prisma.forum.findMany({
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        })
    }

    public async createForum(title: string, about: string): Promise<Forum> {
        return this.prisma.forum.create({
            data: {
                title: title,
                about: about,
            },
        })
    }

    public async updateForum(forumId: string, title: string, about: string): Promise<Forum> {
        return this.prisma.forum.update({
            where: { id: forumId },
            data: {
                title: title,
                about: about,
            },
        })
    }

    public async deleteForum(forumId: string): Promise<Forum> {
        return this.prisma.forum.delete({
            where: { id: forumId },
        })
    }
}