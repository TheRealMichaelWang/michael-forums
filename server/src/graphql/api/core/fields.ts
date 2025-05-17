import { UserResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { MessageService } from "../../../services/messageService";

export const User: UserResolvers<ResolverContext> = {
    posts: async (parent, { currentPage, pageSize }, contextValue) => {
        var messageService = contextValue.container.get(MessageService);
        const posts = await messageService.getUserPosts(parent.id, currentPage, pageSize);
        return posts.map(post => ({
            ...post,
            replies: [], // Ensure 'replies' is always present
        }));
    }
}