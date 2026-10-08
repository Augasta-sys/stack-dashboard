import type { ReactNode } from "react"

interface AuthCardProps {
  children: ReactNode
  className?: string
}

export default function AuthCard({
  children,
  className = "",
}: AuthCardProps) {
  return (
    <div
      className={`
        relative
        z-10
        w-full
        max-w-[450px]
        max-h-[calc(100vh-24px)]
        overflow-hidden
        rounded-[18px]
        border
        border-white/20
        bg-white
        shadow-[0_10px_35px_rgba(0,0,0,0.12)]
        transition-colors
        duration-300
        dark:border-[#313D4F]
        dark:bg-[#273142]
        sm:max-h-[calc(100vh-40px)]
        sm:rounded-[22px]
        md:max-w-[500px]
        ${className}
      `}
    >
      {children}
    </div>
  )
}