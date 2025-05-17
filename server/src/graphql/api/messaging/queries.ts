import { MessageQueryResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { MessageService } from "../../../services/messageService";

export const MessageQuery: MessageQueryResolvers<ResolverContext> = {
    getForums: async (_, { currentPage, pageSize }, contextValue) => {
        var messageService = contextValue.container.get(MessageService);

        const forums = await messageService.getForums(currentPage, pageSize);
        return forums.map(forum => ({
            ...forum,
            posts: [], // Ensure 'posts' is always present
        }));
    }
}