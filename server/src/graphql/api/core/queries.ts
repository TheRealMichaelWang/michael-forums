import { UserQueryResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { UserDao } from "../../../dao/user/userDao";

export const UserQuery: UserQueryResolvers<ResolverContext> = {
    getUser: async (_, { id }, contextValue) => {
        const userDao = contextValue.container.get(UserDao);
        const user = await userDao.getUserById(id);
        return {
            ...user,
            posts: [], // Ensure 'posts' is always present
        };
    }
}