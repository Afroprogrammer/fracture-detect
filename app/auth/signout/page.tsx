"use client"

import { useEffect } from "react"
import { signOut } from "next-auth/react"

export default function SignOut() {
  useEffect(() => {
    signOut({ callbackUrl: "/" })
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Signing out...</h1>
        <p className="text-muted-foreground">You will be redirected shortly.</p>
        <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  )
}

