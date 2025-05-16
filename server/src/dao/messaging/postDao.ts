import { injectable } from 'inversify'
import { PrismaClient, Post } from '@prisma/client'
import { injectPrismaClient } from '../../util/prismaHelper'

@injectable()
export class PostDao {
    constructor(@injectPrismaClient() private prisma: PrismaClient) {}

    public async getPostById(postId: string): Promise<Post> {
        return this.prisma.post.findUniqueOrThrow({
            where: { id: postId },
        })
    }

    public async getPostsInForum(forumId: string, currentPage: number, pageSize: number): Promise<Post[]> {
        return this.prisma.post.findMany({
            where: { forumId: forumId },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        })
    }

    public async createPost(title: string, content: string, forumId: string, authorId: string): Promise<Post> {
        return this.prisma.post.create({
            data: {
                title: title,
                content: content,
                forumId: forumId,
                authorId: authorId
            },
        })
    }

    public async updatePost(postId: string, title: string, content: string): Promise<Post> {
        return this.prisma.post.update({
            where: { id: postId },
            data: {
                title: title,
                content: content,
            },
        })
    }

    public async deletePost(postId: string): Promise<Post> {
        return this.prisma.post.delete({
            where: { id: postId },
        });
    }
}