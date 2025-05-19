import { ForumDao } from "../dao/messaging/forumDao";
import { PostDao } from "../dao/messaging/postDao";
import { ReplyDao } from "../dao/messaging/replyDao";
import { AuthorizationService } from "./authorizationService";
import { injectable, inject } from "inversify";
import { logger } from "../util/logger";
import { UserDao } from "../dao/user/userDao";

@injectable()
export class MessageService {
    constructor(@inject(ForumDao) private forumDao: ForumDao,
                @inject(PostDao) private postDao: PostDao,
                @inject(ReplyDao) private replyDao: ReplyDao,
                @inject(UserDao) private userDao: UserDao,
                @inject(AuthorizationService) private authorizationService: AuthorizationService) { }

    public async getForums(currentPage: number, pageSize: number) {
        return await this.forumDao.getAllForums(currentPage, pageSize);
    }

    public async getPosts(forumId: string, currentPage: number, pageSize: number) {
        const posts = await this.postDao.getPostsInForum(forumId, currentPage, pageSize);
        return Promise.all(posts.map(async post => {
            const user = await this.userDao.getUserById(post.authorId);
            return {
                ...post,
                authorName: user?.username ?? null,
            };
        }));
    }

    public async getReplies(postId: string, currentPage: number, pageSize: number) {
        const replies = await this.replyDao.getRepliesInPost(postId, currentPage, pageSize);
        return Promise.all(replies.map(async reply => {
            const user = await this.userDao.getUserById(reply.authorId);
            return {
                ...reply,
                authorName: user?.username ?? null,
            };
        }));
    }

    public async createForum(title: string, about: string, userId?: string) {
        if (!await this.authorizationService.canCreateForum(userId)) {
            logger.error(`User is not authorized to create a forum: ${userId}`);
            throw new Error("User is not authorized to create a forum.");
        }
        logger.info(`Creating forum with title: ${title} and about: ${about} by user: ${userId}`);
        return await this.forumDao.createForum(title, about);
    }

    public async editForum(id: string, title: string, about: string, userId?: string) {
        if (!await this.authorizationService.canEditForum(userId)) {
            logger.error(`User is not authorized to edit a forum: ${userId}`);
            throw new Error("User is not authorized to edit a forum.");
        }
        logger.info(`Editing forum with id: ${id}, new title: ${title}, new about: ${about} by user: ${userId}`);
        return await this.forumDao.updateForum(id, title, about);
    }

    public async deleteForum(id: string, userId?: string) {
        if (!await this.authorizationService.canDeleteForum(userId)) {
            logger.error(`User is not authorized to delete a forum: ${userId}`);
            throw new Error("User is not authorized to delete a forum.");
        }
        logger.info(`Deleting forum with id: ${id} by user: ${userId}`);
        return await this.forumDao.deleteForum(id);
    }

    public async createPost(forumId: string, title: string, content: string, userId?: string) {
        if (!await this.authorizationService.canCreatePost(userId)) {
            logger.error(`User is not authorized to create a post: ${userId}`);
            throw new Error("User is not authorized to create a post; user must be logged in.");
        }
        logger.info(`Creating post in forum with id: ${forumId}, title: ${title}, content: ${content} by user: ${userId}`);
        return await this.postDao.createPost(forumId, title, content, userId!);
    }

    public async editPost(id: string, title: string, content: string, userId?: string) {
        if (!await this.authorizationService.canEditPost(id, userId)) {
            logger.error(`User is not authorized to edit a post: ${userId}`);
            throw new Error("User is not authorized to edit this post.");
        }
        logger.info(`Editing post with id: ${id}, new title: ${title}, new content: ${content} by user: ${userId}`);
        return await this.postDao.updatePost(id, title, content);
    }

    public async deletePost(id: string, userId?: string) {
        if (!await this.authorizationService.canDeletePost(id, userId)) {
            logger.error(`User is not authorized to delete a post: ${userId}`);
            throw new Error("User is not authorized to delete this post.");
        }
        logger.info(`Deleting post with id: ${id} by user: ${userId}`);
        return await this.postDao.deletePost(id);
    }

    public async createReply(postId: string, content: string, userId?: string) {
        if (!await this.authorizationService.canCreateReply(userId)) {
            logger.error(`User is not authorized to create a reply: ${userId}`);
            throw new Error("User is not authorized to create a reply; user must be logged in.");
        }
        logger.info(`Creating reply to post with id: ${postId}, content: ${content} by user: ${userId}`);
        return await this.replyDao.createReply(postId, content, userId!);
    }

    public async editReply(id: string, content: string, userId?: string) {
        if (!await this.authorizationService.canEditReply(id, userId)) {
            logger.error(`User is not authorized to edit a reply: ${userId}`);
            throw new Error("User is not authorized to edit this reply.");
        }
        logger.info(`Editing reply with id: ${id}, new content: ${content} by user: ${userId}`);
        return await this.replyDao.updateReply(id, content);
    }

    public async deleteReply(id: string, userId?: string) {
        if (!await this.authorizationService.canDeleteReply(id, userId)) {
            logger.error(`User is not authorized to delete a reply: ${userId}`);
            throw new Error("User is not authorized to delete this reply.");
        }
        logger.info(`Deleting reply with id: ${id} by user: ${userId}`);
        return await this.replyDao.deleteReply(id);
    }
}