import { Container } from "inversify";
import { PrismaClient } from "@prisma/client";
import { InjectionToken } from "./prismaHelper";

const container = new Container({
  autobind: true,
  defaultScope: 'Singleton',
})

// Bind the global PrismaClient to the container
const prisma = new PrismaClient()
container.bind(InjectionToken.PrismaClient).toConstantValue(prisma)

export { container }