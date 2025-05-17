import { MessageMutationResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import assert from 'assert'
import { ForumDao } from "../../../dao/messaging/forumDao";
import { PostDao } from "../../../dao/messaging/postDao";
import { ReplyDao } from "../../../dao/messaging/replyDao";

export const MessageMutation : MessageMutationResolvers<ResolverContext> = {
    createForum: async (_, {title, about}, contextValue) => {
        assert(contextValue.req.auth, "User must be authenticated to create a forum");
        assert(contextValue.req.auth.user.isAdmin, "User must be an admin to create a forum");

        var forumDao = contextValue.container.get(ForumDao);
        var forum = await forumDao.createForum(title, about);

        return {
            ...forum,
            posts: []
        };
    },

    editForum: async (_, {id, title, about}, contextValue) => {
        assert(contextValue.req.auth, "User must be authenticated to edit a forum");
        assert(contextValue.req.auth.user.isAdmin, "User must be an admin to edit a forum");

        var forumDao = contextValue.container.get(ForumDao);
        await forumDao.updateForum(id, title, about);

        return true;
    },

    deleteForum: async (_, {id}, contextValue) => {
        assert(contextValue.req.auth, "User must be authenticated to delete a forum");
        assert(contextValue.req.auth.user.isAdmin, "User must be an admin to delete a forum");

        var forumDao = contextValue.container.get(ForumDao);
        await forumDao.deleteForum(id);

        return true;
    },

    createPost: async (_, {forumId, title, content}, contextValue) => {
        assert(contextValue.req.auth, "User must be authenticated to create a post");

        var postDao = contextValue.container.get(PostDao);
        var post = await postDao.createPost(forumId, title, content, contextValue.req.auth.user.id);

        return {
            ...post,
            replies: []
        };
    },

    editPost: async (_, {id, title, content}, contextValue) => {
        assert(contextValue.req.auth, "User must be authenticated to edit a post");

        var postDao = contextValue.container.get(PostDao);
        await postDao.updatePost(id, title, content);

        return true;
    },

    deletePost: async (_, {id}, contextValue) => {
        assert(contextValue.req.auth, "User must be authenticated to delete a post");

        var postDao = contextValue.container.get(PostDao);
        await postDao.deletePost(id);

        return true;
    },

    createReply: async (_, {postId, content}, contextValue) => {
        assert(contextValue.req.auth, "User must be authenticated to create a reply");

        var replyDao = contextValue.container.get(ReplyDao);
        var reply = await replyDao.createReply(postId, content, contextValue.req.auth.user.id);

        return reply;
    },

    editReply: async (_, {id, content}, contextValue) => {
        assert(contextValue.req.auth, "User must be authenticated to edit a reply");

        var replyDao = contextValue.container.get(ReplyDao);
        await replyDao.updateReply(id, content);

        return true;
    },

    deleteReply: async (_, {id}, contextValue) => {
        assert(contextValue.req.auth, "User must be authenticated to delete a reply");

        var replyDao = contextValue.container.get(ReplyDao);
        await replyDao.deleteReply(id);

        return true;
    }
}