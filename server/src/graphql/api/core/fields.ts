import { UserResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { UserDao } from "../../../dao/user/userDao";

export const UserField: UserResolvers<ResolverContext> = {
    posts: async (parent, { currentPage, pageSize }, contextValue) => {
        const userDao = contextValue.container.get(UserDao);
        const posts = await userDao.getUserPosts(parent.id, currentPage, pageSize);
        return posts.map(post => ({
            ...post,
            replies: [], // Ensure 'replies' is always present
        }));
    }
}