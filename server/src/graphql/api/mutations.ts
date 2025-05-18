import { RootMutationResolvers } from "../../generated/graphql";
import { ResolverContext } from "./";
import { emptyUser } from "../../util/empty";

export const RootMutation: RootMutationResolvers<ResolverContext> = {
    userMutation: async (parent, args, context) => {
        return {
            mockRegister: emptyUser,
            mockAuth: emptyUser // or undefined if you want it to be null
        };
    }
}