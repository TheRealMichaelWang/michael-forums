import { RootMutationResolvers } from "../../generated/graphql";
import { ResolverContext } from "./";
import { emptyUser } from "../../util/empty";

export const RootMutation: RootMutationResolvers<ResolverContext> = {
    mockAccountMutations: async (parent, args, context) => {
        return {
            __typename: "MockAccountMutations",
            mockRegister: emptyUser,
            mockAuth: emptyUser // or undefined if you want it to be null
        };
    }
}