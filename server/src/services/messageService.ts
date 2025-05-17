import { ForumDao } from "../dao/messaging/forumDao";
import { PostDao } from "../dao/messaging/postDao";
import { ReplyDao } from "../dao/messaging/replyDao";
import { AuthorizationService } from "./authorizationService";
import { injectable, inject } from "inversify";
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
        return await this.postDao.getPostsInForum(forumId, currentPage, pageSize);
    }

    public async getReplies(postId: string, currentPage: number, pageSize: number) {
        return await this.replyDao.getRepliesInPost(postId, currentPage, pageSize);
    }

    public async createForum(title: string, about: string, userId?: string) {
        if (!await this.authorizationService.canCreateForum(userId)) {
            throw new Error("User is not authorized to create a forum.");
        }
        return await this.forumDao.createForum(title, about);
    }

    public async editForum(id: string, title: string, about: string, userId?: string) {
        if (!await this.authorizationService.canEditForum(userId)) {
            throw new Error("User is not authorized to edit a forum.");
        }
        return await this.forumDao.updateForum(id, title, about);
    }

    public async deleteForum(id: string, userId?: string) {
        if (!await this.authorizationService.canDeleteForum(userId)) {
            throw new Error("User is not authorized to delete a forum.");
        }
        return await this.forumDao.deleteForum(id);
    }

    public async createPost(forumId: string, title: string, content: string, userId?: string) {
        if (!await this.authorizationService.canCreatePost(userId)) {
            throw new Error("User is not authorized to create a post; user must be logged in.");
        }
        return await this.postDao.createPost(forumId, title, content, userId!);
    }

    public async editPost(id: string, title: string, content: string, userId?: string) {
        if (!await this.authorizationService.canEditPost(id, userId)) {
            throw new Error("User is not authorized to edit this post.");
        }
        return await this.postDao.updatePost(id, title, content);
    }

    public async deletePost(id: string, userId?: string) {
        if (!await this.authorizationService.canDeletePost(id, userId)) {
            throw new Error("User is not authorized to delete this post.");
        }
        return await this.postDao.deletePost(id);
    }

    public async createReply(postId: string, content: string, userId?: string) {
        if (!await this.authorizationService.canCreateReply(userId)) {
            throw new Error("User is not authorized to create a reply; user must be logged in.");
        }
        return await this.replyDao.createReply(postId, content, userId!);
    }

    public async editReply(id: string, content: string, userId?: string) {
        if (!await this.authorizationService.canEditReply(id, userId)) {
            throw new Error("User is not authorized to edit this reply.");
        }
        return await this.replyDao.updateReply(id, content);
    }

    public async deleteReply(id: string, userId?: string) {
        if (!await this.authorizationService.canDeleteReply(id, userId)) {
            throw new Error("User is not authorized to delete this reply.");
        }
        return await this.replyDao.deleteReply(id);
    }
    
    public async getUserPosts(subjectId: string, currentPage: number, pageSize: number, userId?: string) {
        if (!await this.authorizationService.canViewProfile(userId)) {
            throw new Error("User is not authorized to view other user's posts.");
        }
        return await this.userDao.getUserPosts(subjectId, currentPage, pageSize);
    }
}