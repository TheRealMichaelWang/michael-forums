import { UserMutationResolvers } from "../../../generated/graphql";
import { ResolverContext } from "..";
import { UserDao } from "../../../dao/user/userDao";

export const UserMutations: UserMutationResolvers<ResolverContext> = {
    //This is a mock function to register a user. Note that this actually creates a user in the database.
    mockRegister: async (parent, { username, email, authUserId}, contextValue) => {
        const userDao = contextValue.container.get(UserDao);
        const account = await userDao.createUser(username, email, authUserId);
        return {
            ...account,
            posts: [], // Ensure 'posts' is always present
        };
    },

    //This is a mock function to authenticate a user. Haven't implemented yet.
    mockAuth: async (parent, { id }, contextValue) => {
        return null;
    }
}