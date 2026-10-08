import type {
  ChangeEvent,
  InputHTMLAttributes,
} from "react"

interface InputFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange"
  > {
  label: string
  error?: string
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void
}

export default function InputField({
  label,
  error,
  id,
  onChange,
  ...props
}: InputFieldProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="
          mb-1.5
          block
          text-[12px]
          font-semibold
          leading-none
          text-[#202224]
          dark:text-white
          sm:text-[13px]
          md:text-[15px]
        "
      >
        {label}
      </label>

      <input
        id={id}
        onChange={onChange}
        className={`
          h-[42px]
          w-full
          rounded-[7px]
          border
          bg-[#F1F4F9]
          px-3
          text-[13px]
          font-semibold
          text-[#202224]
          outline-none
          transition-all
          duration-200
          placeholder:text-[#A6A6A6]
          hover:border-[#bfc5cf]
          focus:border-[#4880FF]
          focus:ring-2
          focus:ring-[#4880FF]/15
          dark:bg-[#323D4E]
          dark:text-white
          dark:placeholder:text-[#9CA3AF]
          dark:hover:border-[#647083]
          sm:h-[46px]
          sm:text-[14px]
          md:h-[48px]
          md:text-[15px]
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500"
              : "border-[#D8D8D8] dark:border-[#4B5668]"
          }
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-[10px] font-semibold leading-tight text-red-500 sm:text-[11px]">
          {error}
        </p>
      )}
    </div>
  )
}