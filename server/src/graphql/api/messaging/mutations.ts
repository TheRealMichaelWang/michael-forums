import { MessageMutationResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { MessageService } from "../../../services/messageService";
import { AuthorizationService } from "../../../services/authorizationService";

export const MessageMutation : MessageMutationResolvers<ResolverContext> = {
    createForum: async (_, {title, about}, contextValue) => {
        var messageService = contextValue.container.get(MessageService);
        var forum = await messageService.createForum(title, about, contextValue.req.auth?.userId);

        return {
            ...forum,
            posts: []
        };
    },

    editForum: async (_, {id, title, about}, contextValue) => {
        var authorizationService = contextValue.container.get(AuthorizationService);
        if (!await authorizationService.canEditForum(contextValue.req.auth?.userId)) {
            return false;
        }

        var messageService = contextValue.container.get(MessageService);
        await messageService.editForum(id, title, about, contextValue.req.auth?.userId);
        return true;
    },

    deleteForum: async (_, {id}, contextValue) => {
        var authorizationService = contextValue.container.get(AuthorizationService);
        if (!await authorizationService.canDeleteForum(contextValue.req.auth?.userId)) {
            return false;
        }

        var messageService = contextValue.container.get(MessageService);
        await messageService.deleteForum(id, contextValue.req.auth?.userId);
        return true;
    },

    createPost: async (_, {forumId, title, content}, contextValue) => {
        var messageService = contextValue.container.get(MessageService);
        var post = await messageService.createPost(forumId, title, content, contextValue.req.auth?.userId);

        return {
            ...post,
            replies: []
        };
    },

    editPost: async (_, {id, title, content}, contextValue) => {
        var authorizationService = contextValue.container.get(AuthorizationService);
        if (!await authorizationService.canEditPost(id, contextValue.req.auth?.userId)) {
            return false;
        }
        var messageService = contextValue.container.get(MessageService);
        await messageService.editPost(id, title, content, contextValue.req.auth?.userId);
        return true;
    },

    deletePost: async (_, {id}, contextValue) => {
        var authorizationService = contextValue.container.get(AuthorizationService);
        if (!await authorizationService.canDeletePost(id, contextValue.req.auth?.userId)) {
            return false;
        }
        var messageService = contextValue.container.get(MessageService);
        await messageService.deletePost(id, contextValue.req.auth?.userId);
        return true;
    },

    createReply: async (_, {postId, content}, contextValue) => {
        var messageService = contextValue.container.get(MessageService);
        var reply = await messageService.createReply(postId, content, contextValue.req.auth?.userId);

        return reply;
    },

    editReply: async (_, {id, content}, contextValue) => {
        var authorizationService = contextValue.container.get(AuthorizationService);
        if (!await authorizationService.canEditReply(id, contextValue.req.auth?.userId)) {
            return false;
        }
        var messageService = contextValue.container.get(MessageService);
        await messageService.editReply(id, content, contextValue.req.auth?.userId);
        return true;
    },

    deleteReply: async (_, {id}, contextValue) => {
        var authorizationService = contextValue.container.get(AuthorizationService);
        if (!await authorizationService.canDeleteReply(id, contextValue.req.auth?.userId)) {
            return false;
        }
        var messageService = contextValue.container.get(MessageService);
        await messageService.deleteReply(id, contextValue.req.auth?.userId);
        return true;
    }
}