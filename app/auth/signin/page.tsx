"use client"

import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignIn() {
  const { status } = useSession()

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (status === "authenticated") {
      redirect("/dashboard")
    }
  }, [status])

  if (status === "loading") {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    )
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-muted/20">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-3xl"></div>
        </div>

        <Card className="w-full max-w-md relative z-10 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xl">
                FD
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center gradient-text">Sign in to FractureDetect AI</CardTitle>
            <CardDescription className="text-center">Access your account to analyze X-ray images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                >
                  <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

