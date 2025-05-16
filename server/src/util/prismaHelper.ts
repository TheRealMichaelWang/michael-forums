//This file was pulled directly from the Golaith repository..
//The decerator essentially just inserts an instance of the PrismaClient into the class.
//The instance is global and found using Symbol.for('PrismaClient').

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