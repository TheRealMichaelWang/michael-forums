import { UserDao } from "../dao/user/userDao";
import { PostDao } from "../dao/messaging/postDao";
import { ReplyDao } from "../dao/messaging/replyDao";
import { injectable, inject } from "inversify";

//determines if a user can perform certain actions such as creating, editing, or deleting forums, posts, and replies
@injectable()
export class AuthorizationService {
    constructor(@inject(UserDao) private userDao: UserDao,
                @inject(PostDao) private postDao: PostDao,
                @inject(ReplyDao) private replyDao: ReplyDao) { }

    //many functions here are wrappers around isAdmin, but they are kept separate for clarity and to allow for future changes
    public async isAdmin(userId?: string): Promise<boolean> {
        if (!userId) {
            return false; // if no userId is provided, return false
        }

        const user = await this.userDao.getUserById(userId);
        return user.isAdmin;
    }

    public async canCreateForum(userId?: string): Promise<boolean> {
        return this.isAdmin(userId); // only admins can create forums
    }

    public async canEditForum(userId?: string): Promise<boolean> {
        return this.isAdmin(userId); // only admins can edit forums
    }

    public async canDeleteForum(userId?: string): Promise<boolean> {
        return this.isAdmin(userId); // only admins can delete forums
    }

    public async canCreatePost(userId?: string): Promise<boolean> {
        return userId != undefined; // all users can create posts as long as they are logged in
    }

    public async canEditPost(postId: string, userId?: string): Promise<boolean> {
        if (!userId) {
            return false; // logged out users cannot edit posts
        }

        const post = await this.postDao.getPostById(postId);
        return post.authorId === userId || this.isAdmin(userId); // user can edit their own post or if they are an admin
    }

    public async canDeletePost(postId: string, userId?: string): Promise<boolean> {
        return this.canEditPost(postId, userId); // only admins can delete posts
    }

    public async canCreateReply(userId?: string): Promise<boolean> {
        return userId != undefined; // all users can create replies as long as they are logged in
    }

    public async canEditReply(replyId: string, userId?: string): Promise<boolean> {
        if (!userId) {
            return false; // logged out users cannot edit replies
        }

        const reply = await this.replyDao.getReplyById(replyId);
        return reply.authorId === userId || this.isAdmin(userId); // user can edit their own reply or if they are an admin
    }

    public async canDeleteReply(replyId: string, userId?: string): Promise<boolean> {
        return this.canEditReply(replyId, userId); // only admins can delete replies
    }
}