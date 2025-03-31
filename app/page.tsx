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
              <div className="w-8 h-8 rounded-md gradient-bg flex items-center justify-center text-white font-bold">
                FD
              </div>
              <span className="font-semibold">FractureDetect AI</span>
            </div>
            <div>
              <Button asChild className="bg-secondary hover:bg-secondary/90">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                  AI-Powered X-Ray Fracture Detection
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  FractureDetect AI uses advanced machine learning to help medical professionals identify fractures in
                  X-ray images with high accuracy.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/auth/signin">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-8 shadow-sm">
                <div className="mx-auto aspect-video overflow-hidden rounded-lg bg-muted relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                  <img
                      src="/images/clinic_image.jpg"
                      alt="X-ray analysis demo"
                      className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            <div className="mt-24 grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border p-6 bg-white shadow-sm">
                <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mb-4">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                  >
                    <path d="M2.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                    <path d="M6 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4Z"></path>
                    <path d="M18 16a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3Z"></path>
                    <path d="M21 12H7"></path>
                    <path d="M7 12a5 5 0 0 0-5 5"></path>
                    <path d="M7 4v8"></path>
                    <path d="M21 16V8a5 5 0 0 0-5-5h-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI model is trained on thousands of X-ray images to detect fractures with high accuracy.
                </p>
              </div>
              <div className="rounded-lg border p-6 bg-white shadow-sm">
                <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mb-4">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your medical data is encrypted and securely stored, meeting all healthcare privacy standards.
                </p>
              </div>
              <div className="rounded-lg border p-6 bg-white shadow-sm">
                <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mb-4">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                  >
                    <path d="M12 22v-5"></path>
                    <path d="M9 8V2"></path>
                    <path d="M15 8V2"></path>
                    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"></path>
                    <path d="M19 8a7 7 0 1 0-14 0"></path>
                    <path d="M12 22v-5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Results</h3>
                <p className="text-muted-foreground">
                  Get analysis results in seconds, helping you make quicker and more informed decisions.
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t py-6 bg-muted/30">
          <div className="container mx-auto px-4 flex flex-col gap-2 md:flex-row md:gap-4 items-center justify-between">
            <p className="text-sm text-muted-foreground">© 2025 FractureDetect AI. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </div>
  )
}

