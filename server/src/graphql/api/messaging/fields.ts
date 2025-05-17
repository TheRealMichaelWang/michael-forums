import { ForumPostsArgs, ForumResolvers, PostResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { PostDao } from "../../../dao/messaging/postDao";
import { ReplyDao } from "../../../dao/messaging/replyDao";

export const ForumField: ForumResolvers<ResolverContext> = {
    posts: async (parent, { currentPage, pageSize } : ForumPostsArgs, contextValue) => {
        const postDao = contextValue.container.get(PostDao);
        const posts = await postDao.getPostsInForum(parent.id, currentPage, pageSize);
        return posts.map(post => ({
            ...post,
            replies: [], // Ensure 'replies' is always present
        }));
    }
}

export const PostField: PostResolvers<ResolverContext> = {
    replies: async (parent, { currentPage, pageSize }, contextValue) => {
        const replyDao = contextValue.container.get(ReplyDao);
        const replies = await replyDao.getRepliesInPost(parent.id, currentPage, pageSize);
        return replies;
    }
}