import { UserResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { UserService } from "../../../services/userService";

export const User: UserResolvers<ResolverContext> = {
    posts: async (parent, { currentPage, pageSize }, contextValue) => {
        var userService = contextValue.container.get(UserService);
        const posts = await userService.getPosts(parent.id, currentPage, pageSize);
        return posts.map(post => ({
            ...post,
            replies: [], // Ensure 'replies' is always present
        }));
    }
}