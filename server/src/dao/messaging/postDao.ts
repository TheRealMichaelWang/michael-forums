import { injectable } from 'inversify'
import { PrismaClient, Post } from '@prisma/client'
import { injectPrismaClient } from '../../util/prismaHelper'

@injectable()
export class PostDao {
    constructor(@injectPrismaClient() private prisma: PrismaClient) {}

    //Gets a post by UUID.
    public async getPostById(postId: string): Promise<Post> {
        return this.prisma.post.findUniqueOrThrow({
            where: { id: postId },
        })
    }

    //Get all posts in a forum.
    //Current page and page size are used for pagination. Current page is 1-indexed.
    //Most recently created posts are shown first.
    public async getPostsInForum(forumId: string, currentPage: number, pageSize: number): Promise<Post[]> {
        return this.prisma.post.findMany({
            where: { forumId: forumId },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        })
    }

    //Get all posts by a user.
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

    //Update a post with either a new title or content, or both.
    public async updatePost(postId: string, title: string, content: string): Promise<Post> {
        return this.prisma.post.update({
            where: { id: postId },
            data: {
                title: title,
                content: content,
            },
        })
    }

    //Delete a post by UUID.
    public async deletePost(postId: string): Promise<Post> {
        return this.prisma.post.delete({
            where: { id: postId },
        });
    }
}