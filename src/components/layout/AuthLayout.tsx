import type { ReactNode } from "react"
import AuthBackground from "../auth/AuthBackground"
import ThemeToggle from "../auth/ThemeToggle"

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        px-3
        py-3
        sm:px-5
        sm:py-5
        lg:px-8
        lg:py-6
      "
    >
      <AuthBackground />

      <ThemeToggle />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </main>
  )
}