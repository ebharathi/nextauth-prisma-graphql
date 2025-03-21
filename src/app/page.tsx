// app/page.tsx
"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  console.log("Session:",session)
  return (
    <main className="p-10">
      {session ? (
        <>
          <h1>Welcome {session.user?.name}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <h1>You are not signed in</h1>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
    </main>
  )
}
