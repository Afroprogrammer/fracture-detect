"use client"

import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User } from "lucide-react"

export function UserMenu() {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    if (status === "loading") {
        return <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
    }

    if (!session) {
        return (
            <Button variant="outline" size="sm" onClick={() => signIn("google")}>
                Sign In
            </Button>
        )
    }

    const user = session.user

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                        <AvatarFallback>
                            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user?.name && <p className="font-medium">{user.name}</p>}
                        {user?.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer text-muted-foreground"
                    onSelect={() => {
                        setIsOpen(false)
                        signOut()
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

