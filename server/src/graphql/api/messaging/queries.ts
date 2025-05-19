import { MessageQueryResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { MessageService } from "../../../services/messageService";

export const MessageQuery: MessageQueryResolvers<ResolverContext> = {
    getForums: async (_, { currentPage, pageSize }, contextValue) => {
        let messageService = contextValue.container.get(MessageService);

        const forums = await messageService.getForums(currentPage, pageSize);
        return forums.map(forum => ({
            ...forum,
            posts: [], // Ensure 'posts' is always present
        }));
    },

    getForum: async (_, { id }, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        const forum = await messageService.getForum(id);
        return {
            ...forum,
            posts: [], // Ensure 'posts' is always present
        };
    },

    getPost: async (_, { id }, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        const post = await messageService.getPost(id);
        return {
            ...post,
            replies: [], // Ensure 'replies' is always present
        };
    }
}