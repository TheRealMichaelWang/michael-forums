import { UserQueryResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { UserService } from "../../../services/userService";

export const UserQuery: UserQueryResolvers<ResolverContext> = {
    getUser: async (_, { id }, contextValue) => {
        let userService = contextValue.container.get(UserService);
        const user = await userService.getUserById(id, contextValue.req.auth?.userId);
        return {
            ...user,
            posts: [], // Ensure 'posts' is always present
        };
    }
}