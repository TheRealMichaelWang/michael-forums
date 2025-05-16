import { inject } from 'inversify'

export const InjectionToken = {
  PrismaClient: Symbol.for('PrismaClient'),
}

//decorator that finds the PrismaClient instance 
//and injects it into the class
export function injectPrismaClient(): <T>(
  target: any,
  targetKey?: string | symbol,
  indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<T>
) => void {
  return inject(InjectionToken.PrismaClient) as <T>(
      target: any,
      targetKey?: string | symbol,
      indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<T>
  ) => void
}