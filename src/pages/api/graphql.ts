// pages/api/graphql.ts
import { ApolloServer } from "apollo-server-micro"
import { schema } from "../../../graphql/schema"
import { createContext } from "../../../graphql/context";

const apolloServer = new ApolloServer({
  schema,
  context: createContext as any,
})


const startServer = apolloServer.start()

export default async function handler(req: any, res: any) {
  await startServer
  return apolloServer.createHandler({ path: "/api/graphql" })(req, res)
}
