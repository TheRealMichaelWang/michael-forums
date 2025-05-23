import { IResolvers } from '@graphql-tools/utils'
import { AuthenticatedRequest } from '../../util/auth/authRequest'
import { Container } from 'inversify'
import { User } from './core/fields'
import { UserMutation } from './core/mutations'
import { UserQuery } from './core/queries'
import { Forum, Post } from './messaging/fields'
import { MessageMutation } from './messaging/mutations'
import { MessageQuery } from './messaging/queries'
import { RootQuery } from './queries'
import { RootMutation } from './mutations'
import DateTimeScalar from './scalars/datetime'
import Void from './scalars/void'

//Fill the resolvers with resolvers defined in ts files through the subdirectories of api

export interface ResolverContext {
    req: AuthenticatedRequest
    container: Container
}

export const resolvers: IResolvers<unknown, ResolverContext> = {
    User,
    UserMutation,
    UserQuery,
    Forum,
    Post,
    MessageMutation,
    MessageQuery,
    RootQuery,
    RootMutation,
    DateTime: DateTimeScalar,
    Void: Void
}