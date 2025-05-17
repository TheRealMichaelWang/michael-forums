import { MessageQueryResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { ForumDao } from "../../../dao/messaging/forumDao";

export const MessageQuery: MessageQueryResolvers<ResolverContext> = {
    getForums: async (_, { currentPage, pageSize }, contextValue) => {
        console.log("getForums invoked");

        const forumDao = contextValue.container.get(ForumDao);
        const forums = await forumDao.getAllForums(currentPage, pageSize);
        return forums.map(forum => ({
            ...forum,
            posts: [], // Ensure 'posts' is always present
        }));
    }
}