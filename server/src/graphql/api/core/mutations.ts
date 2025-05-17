import { MockAccountMutationsResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { UserDao } from "../../../dao/user/userDao";

export const mockAccountMutations: MockAccountMutationsResolvers<ResolverContext> = {
    mockRegister: async (parent, { username, email, authUserId}, contextValue) => {
        const userDao = contextValue.container.get(UserDao);
        const account = await userDao.createUser(username, email, authUserId);
        return {
            ...account,
            posts: [], // Ensure 'posts' is always present
        };
    },

    mockAuth: async (parent, { id }, contextValue) => {
        return null;
    }
}