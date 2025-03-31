"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import AnalysisArea from "@/components/analysis-area"
import HistorySection from "@/components/history-section"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin")
    },
  })

  const [activeView, setActiveView] = useState<"analyze" | "history">("analyze")

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
              FD
            </div>
            <span className="font-semibold">FractureDetect AI</span>
          </div>

          <div className="hidden md:flex gap-2">
            <Button variant={activeView === "analyze" ? "default" : "ghost"} onClick={() => setActiveView("analyze")}>
              Analyze New Image
            </Button>
            <Button variant={activeView === "history" ? "default" : "ghost"} onClick={() => setActiveView("history")}>
              Analysis History
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {session?.user?.name && <span className="text-sm hidden md:inline-block">{session.user.name}</span>}
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="md:hidden mb-6 flex gap-2">
          <Button
            variant={activeView === "analyze" ? "default" : "outline"}
            onClick={() => setActiveView("analyze")}
            className="flex-1"
          >
            Analyze
          </Button>
          <Button
            variant={activeView === "history" ? "default" : "outline"}
            onClick={() => setActiveView("history")}
            className="flex-1"
          >
            History
          </Button>
        </div>

        {activeView === "analyze" ? <AnalysisArea /> : <HistorySection />}
      </main>
    </div>
  )
}

