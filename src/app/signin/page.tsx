"use client"

import { signIn } from "next-auth/react"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign in to Your Account</h1>
      <div className="space-y-6 flex flex-col ">
        <button
          onClick={() => signIn("github")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Sign in with GitHub
        </button>
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
