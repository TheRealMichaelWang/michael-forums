import { RootMutationResolvers } from "../../generated/graphql";
import { ResolverContext } from "./";
import { emptyUser, emptyForum, emptyPost, emptyReply } from "../../util/empty";

export const RootMutation: RootMutationResolvers<ResolverContext> = {
    userMutation: async (parent, args, context) => {
        return {
            mockRegister: emptyUser,
            mockAuth: emptyUser // or undefined if you want it to be null
        };
    },
    messageMutation: async (parent, args, context) => {
        return {
            createForum: emptyForum,
            editForum: false,
            deleteForum: false,
            createPost: emptyPost,
            editPost: false,
            deletePost: false,
            createReply: emptyReply,
            editReply: false,
            deleteReply: false,
        };
    }
}