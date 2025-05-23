import { MessageMutationResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { MessageService } from "../../../services/messageService";

export const MessageMutation : MessageMutationResolvers<ResolverContext> = {
    createForum: async (_, {title, about}, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        let forum = await messageService.createForum(title, about, contextValue.req.auth?.userId);

        return {
            ...forum,
            posts: []
        };
    },

    editForum: async (_, {id, title, about}, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        await messageService.editForum(id, title, about, contextValue.req.auth?.userId);
        return null;
    },

    deleteForum: async (_, {id}, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        await messageService.deleteForum(id, contextValue.req.auth?.userId);
        return null;
    },

    createPost: async (_, {forumId, title, content}, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        let post = await messageService.createPost(forumId, title, content, contextValue.req.auth?.userId);

        return {
            ...post,
            replies: []
        };
    },

    editPost: async (_, {id, title, content}, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        await messageService.editPost(id, title, content, contextValue.req.auth?.userId);
        return null;
    },

    deletePost: async (_, {id}, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        await messageService.deletePost(id, contextValue.req.auth?.userId);
        return null;
    },

    createReply: async (_, {postId, content}, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        let reply = await messageService.createReply(postId, content, contextValue.req.auth?.userId);

        return reply;
    },

    editReply: async (_, {id, content}, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        await messageService.editReply(id, content, contextValue.req.auth?.userId);
        return null;
    },

    deleteReply: async (_, {id}, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        await messageService.deleteReply(id, contextValue.req.auth?.userId);
        return null;
    }
}