// lib/graphql/context.ts
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function createContext({ req, res }: any) {
  const session = await getServerSession(req, res, authOptions)
  return { prisma, session }
}

export type Context = Awaited<ReturnType<typeof createContext>>
