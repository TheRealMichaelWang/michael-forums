import { IResolvers } from '@graphql-tools/utils'
import { AuthenticatedRequest } from '../../util/auth/AuthRequest'
import { Container } from 'inversify'
import { UserField } from './core/fields'
import { MockAccountMutations } from './core/mutations'
import { UserQuery } from './core/queries'
import { ForumField, PostField } from './messaging/fields'
import { MessageMutation } from './messaging/mutations'
import { MessageQuery } from './messaging/queries'

//Fill the resolvers with resolvers defined in ts files through the subdirectories of api

export interface ResolverContext {
    req: AuthenticatedRequest
    container: Container
}

export const resolvers: IResolvers<any, ResolverContext> = {
    UserField,
    MockAccountMutations,
    UserQuery,
    ForumField,
    PostField,
    MessageMutation,
    MessageQuery
}