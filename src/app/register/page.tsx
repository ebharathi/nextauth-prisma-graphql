// app/register/page.tsx (or pages/register.tsx if using Pages Router)
"use client"

import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER_MUTATION } from "@/graphql/mutations";
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", name: "", password: "" })
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await createUser({ variables: form })
      if (data?.createUser) {
        router.push("/signin") 
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        />

        {error && <p className="text-red-500 text-sm">{error.message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </form>
    </div>
  )
}
