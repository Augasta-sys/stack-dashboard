import { Eye, EyeOff } from "lucide-react"
import {
  useState,
  type ChangeEvent,
} from "react"

interface PasswordFieldProps {
  label: string
  value: string
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void
  error?: string
  id?: string
}

export default function PasswordField({
  label,
  value,
  onChange,
  error,
  id = "password",
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] =
    useState(false)

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="
            mb-1.5
            block
            text-[12px]
            font-semibold
            text-[#202224]
            dark:text-white
            sm:text-[13px]
            md:text-[15px]
          "
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`
            h-[42px]
            w-full
            rounded-[7px]
            border
            bg-[#F1F4F9]
            px-3
            pr-11
            text-[13px]
            font-semibold
            text-[#202224]
            outline-none
            transition-all
            duration-200
            focus:border-[#4880FF]
            focus:ring-2
            focus:ring-[#4880FF]/15
            dark:bg-[#323D4E]
            dark:text-white
            sm:h-[46px]
            sm:text-[14px]
            md:h-[48px]
            md:text-[15px]
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-[#D8D8D8] dark:border-[#4B5668]"
            }
          `}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((current) => !current)
          }
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
          className="
            absolute
            right-2.5
            top-1/2
            -translate-y-1/2
            rounded-md
            p-1
            text-[#A6A6A6]
            transition-colors
            hover:bg-[#4880FF]/10
            hover:text-[#4880FF]
          "
        >
          {showPassword ? (
            <EyeOff size={17} />
          ) : (
            <Eye size={17} />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-[10px] font-semibold leading-tight text-red-500 sm:text-[11px]">
          {error}
        </p>
      )}
    </div>
  )
}