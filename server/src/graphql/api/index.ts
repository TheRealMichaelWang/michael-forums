import { IResolvers } from '@graphql-tools/utils'
import { AuthenticatedRequest } from '../../util/auth/authRequest'
import { Container } from 'inversify'
import { User } from './core/fields'
import { UserMutations } from './core/mutations'
import { UserQuery } from './core/queries'
import { Forum, Post } from './messaging/fields'
import { MessageMutation } from './messaging/mutations'
import { MessageQuery } from './messaging/queries'
import { RootQuery } from './queries'
import { RootMutation } from './mutations'

//Fill the resolvers with resolvers defined in ts files through the subdirectories of api

export interface ResolverContext {
    req: AuthenticatedRequest
    container: Container
}

export const resolvers: IResolvers<any, ResolverContext> = {
    User,
    UserMutations,
    UserQuery,
    Forum,
    Post,
    MessageMutation,
    MessageQuery,
    RootQuery,
    RootMutation
}