import { injectable } from 'inversify'
import { PrismaClient, Forum } from '@prisma/client'
import { injectPrismaClient } from '../../util/prismaHelper'

@injectable()
export class ForumDao {
    constructor(@injectPrismaClient() private prisma: PrismaClient) {}
    
    //Gets a forum by UUID.
    public async getForumById(forumId: string): Promise<Forum> {
        return this.prisma.forum.findUniqueOrThrow({
            where: { id: forumId },
        })
    }
    
    //Get all forums on the server. 
    //Current page and page size are used for pagination. Current page is 1-indexed.
    //Most recently created forums are shown first.
    public async getAllForums(currentPage: number, pageSize: number): Promise<Forum[]> {
        return this.prisma.forum.findMany({
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        })
    }

    //Create a new forum.
    public async createForum(title: string, about: string): Promise<Forum> {
        return this.prisma.forum.create({
            data: {
                title: title,
                about: about,
            },
        })
    }

    //Update a forum with either a new title or about description, or both.
    public async updateForum(forumId: string, title: string, about: string): Promise<Forum> {
        return this.prisma.forum.update({
            where: { id: forumId },
            data: {
                title: title,
                about: about,
            },
        })
    }

    //Delete a forum by UUID.
    public async deleteForum(forumId: string): Promise<Forum> {
        return this.prisma.forum.delete({
            where: { id: forumId },
        })
    }
}