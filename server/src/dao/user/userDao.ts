import { injectable } from 'inversify'
import { PrismaClient, User, UserRole, Post } from '@prisma/client'
import { injectPrismaClient } from '../../util/prismaHelper'

@injectable()
export class UserDao {
    constructor(@injectPrismaClient() private prisma: PrismaClient) {}

    public async getUserById(userId: string): Promise<User> {
        return this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
        })
    }

    public async getUserByIdentifier(identifier: string): Promise<User> {
        return this.prisma.user.findFirstOrThrow({
            where: {
                OR: [
                    { email: identifier },
                    { username: identifier },
                ],
            },
        })
    }

    public async createUser(username: string, email: string, authUserId: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                username: username,
                email: email,
                authUserId: authUserId,
            },
        })
    }

    public async updateUserRole(userId: string, role: UserRole): Promise<User> {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                role: role,
            },
        })
    }

    public async getUserPosts(userId: string, currentPage: number, pageSize: number): Promise<Post[]> {
        return this.prisma.post.findMany({
            where: { authorId: userId },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        })
    }

    public async deleteUser(userId: string): Promise<User> {
        return this.prisma.user.delete({
            where: { id: userId },
        })
    }
}