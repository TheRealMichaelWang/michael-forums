import { injectable } from 'inversify'
import { PrismaClient, User, UserRole, Post } from '@prisma/client'
import { injectPrismaClient } from '../../util/prismaHelper'

@injectable()
export class UserDao {
    constructor(@injectPrismaClient() private prisma: PrismaClient) {}

    //Gets a user by UUID.
    public async getUserById(userId: string): Promise<User> {
        return this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
        })
    }

    //Gets a user by email or username.
    //This is used for login and registration, or simply to see if a username/email is already taken.
    public async getUserByIdentifier(identifier: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { username: identifier },
                ],
            },
        })
    }

    //Creates a new user.
    public async createUser(username: string, email: string, authUserId: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                username: username,
                email: email,
                authUserId: authUserId,
            },
        })
    }

    //Update a user with a new role.
    public async updateUserRole(userId: string, role: UserRole): Promise<User> {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                role: role,
            },
        })
    }

    //Get all posts by a user.
    //Current page and page size are used for pagination. Current page is 1-indexed.
    //Most recently created posts are shown first.
    //This is used to show a user's posts on their profile page.
    public async getUserPosts(userId: string, currentPage: number, pageSize: number): Promise<Post[]> {
        return this.prisma.post.findMany({
            where: { authorId: userId },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        })
    }

    //Delete a user by UUID.
    public async deleteUser(userId: string): Promise<User> {
        return this.prisma.user.delete({
            where: { id: userId },
        })
    }
}