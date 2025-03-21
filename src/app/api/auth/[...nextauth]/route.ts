// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        })

        if (!user || !user.hashedPassword) {
          throw new Error("No user found")
        }

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.hashedPassword
        )

        if (!isValid) {
          throw new Error("Invalid password")
        }

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      })
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name,
            avatar: user.image,
          },
        })
      }
      return true
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })
        token.userId = existingUser?.id!
        token.role = existingUser?.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.userId
      session.user.role = token.role
      return session
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/"
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// ✅ Correct way to use it
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
