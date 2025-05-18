//This file was pulled directly from the Golaith repository..
//The changes made were to

import { Request } from 'express'

//session claims are custom and configured in the Clerk dashboard
export interface ClerkSessionClaims {
  authUserId: string
  username: string
  email: string
}

interface AuthenticatedPayload {
  auth: {
    userId: string
    sessionClaims: ClerkSessionClaims
  } | null
}

export interface AuthenticatedRequest extends AuthenticatedPayload, Request {}

declare global {
  namespace Express {
    interface Request extends AuthenticatedPayload {}
  }
}

export {}