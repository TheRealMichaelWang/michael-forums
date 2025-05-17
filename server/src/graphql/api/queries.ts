import { RootQueryResolvers } from "../../generated/graphql";
import { ResolverContext } from "./";
import { emptyUser, emptyPost, emptyForum } from "../../util/empty";

export const RootQuery: RootQueryResolvers<ResolverContext> = {
    user: async (parent, args, context) => emptyUser,
    userQuery: async (parent, args, context) => ({
        getUser: emptyUser,
        me: emptyUser
    }),
    forum: async (parent, args, context) => emptyForum,
    post: async (parent, args, context) => emptyPost,
    messageQuery: async (parent, args, context) => ({
        getForums: []
    })
};