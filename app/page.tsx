"use client"

import type React from "react"

import { useState } from "react"
import AnalysisArea from "@/components/analysis-area"
import HistorySection from "@/components/history-section"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { useSession } from "next-auth/react"

export default function Home() {
    const [activeView, setActiveView] = useState<"analyze" | "history">("analyze")
    const { data: session } = useSession()

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container flex h-16 items-center justify-between">
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

            <main className="flex-1 container py-6">
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

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

