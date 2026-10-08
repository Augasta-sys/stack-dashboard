import type { ReactNode } from "react"

interface AuthButtonProps {
  children: ReactNode
  type?: "button" | "submit"
  disabled?: boolean
  onClick?: () => void
}

export default function AuthButton({
  children,
  type = "submit",
  disabled = false,
  onClick,
}: AuthButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="
        mx-auto
        flex
        h-[44px]
        w-full
        max-w-[380px]
        items-center
        justify-center
        rounded-[7px]
        bg-[#4880FF]
        px-4
        text-[14px]
        font-bold
        text-white
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-[1px]
        hover:bg-[#3B6EE8]
        hover:shadow-md
        active:translate-y-0
        active:bg-[#2F5FD1]
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:translate-y-0
        disabled:hover:shadow-sm
        sm:h-[48px]
        sm:text-[15px]
      "
    >
      {children}
    </button>
  )
}