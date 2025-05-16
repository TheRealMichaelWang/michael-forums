import { IResolvers } from '@graphql-tools/utils'
import { AuthenticatedRequest } from '../../util/auth/AuthRequest'
import { Container } from 'inversify'
//Fill the resolvers with resolvers defined in ts files through the subdirectories of api

export interface ResolverContext {
    req: AuthenticatedRequest
    container: Container
}

export const resolvers: IResolvers<any, ResolverContext> = {

}