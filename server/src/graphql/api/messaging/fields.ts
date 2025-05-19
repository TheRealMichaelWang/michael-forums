import { ForumPostsArgs, ForumResolvers, PostResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { MessageService } from "../../../services/messageService";

export const Forum: ForumResolvers<ResolverContext> = {
    posts: async (parent, { currentPage, pageSize } : ForumPostsArgs, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        const posts = await messageService.getPosts(parent.id, currentPage, pageSize);

        return posts.map(post => ({
            ...post,
            replies: [] // Ensure 'replies' is always present
        }));
    }
}

export const Post: PostResolvers<ResolverContext> = {
    replies: async (parent, { currentPage, pageSize }, contextValue) => {
        let messageService = contextValue.container.get(MessageService);
        return await messageService.getReplies(parent.id, currentPage, pageSize);
    }
}