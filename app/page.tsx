import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function LandingPage() {
  const session = await getServerSession()

  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
              FD
            </div>
            <span className="font-semibold">FractureDetect AI</span>
          </div>
          <div>
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                AI-Powered X-Ray Fracture Detection
              </h1>
              <p className="text-muted-foreground md:text-xl">
                FractureDetect AI uses advanced machine learning to help medical professionals identify fractures in
                X-ray images with high accuracy.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/auth/signin">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-8 shadow-sm">
              <div className="mx-auto aspect-video overflow-hidden rounded-lg bg-muted">
                <img
                  src="/images/landingpage_image.jpg" 
                  alt="X-ray analysis demo"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 flex flex-col gap-2 md:flex-row md:gap-4 items-center justify-between">
          <p className="text-sm text-muted-foreground">© 2025 FractureDetect AI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

