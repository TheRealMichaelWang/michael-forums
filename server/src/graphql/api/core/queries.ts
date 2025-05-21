import { UserQueryResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { UserService } from "../../../services/userService";
import { UserDao } from "../../../dao/user/userDao";

export const UserQuery: UserQueryResolvers<ResolverContext> = {
    getUser: async (_, { id }, contextValue) => {
        let userService = contextValue.container.get(UserService);
        const user = await userService.getUserById(id, contextValue.req.auth?.userId);
      
        return {
            ...user,
            posts: [], // Ensure 'posts' is always present
        };
    },

    me: async(_, __, contextValue) => {
        const userId = contextValue.req.auth?.userId;
        if (!userId) {
            return null;
        }

        let userDao = contextValue.container.get(UserDao);
        const user = await userDao.getUserById(userId);
        if (!user) {
            return null;
        }

        return {
            ...user,
            posts: []
        }
    }
}