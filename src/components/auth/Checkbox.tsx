interface CheckboxProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  children: React.ReactNode
  error?: string
}

export default function Checkbox({
  id,
  checked,
  onChange,
  children,
  error,
}: CheckboxProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          flex
          cursor-pointer
          select-none
          items-center
          gap-2
          text-[11px]
          font-semibold
          text-[#707070]
          transition-colors
          hover:text-[#4880FF]
          dark:text-gray-300
          sm:text-[13px]
          md:text-[14px]
        "
      >
        <span className="relative h-[18px] w-[18px] shrink-0">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(event) =>
              onChange(event.target.checked)
            }
            className="
              peer
              absolute
              inset-0
              z-10
              h-full
              w-full
              cursor-pointer
              opacity-0
            "
          />

          <span
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              rounded-[4px]
              border
              border-[#C8CDD5]
              bg-white
              transition-all
              duration-150
              peer-checked:border-[#4880FF]
              peer-checked:bg-[#4880FF]
              peer-focus-visible:ring-2
              peer-focus-visible:ring-[#4880FF]/30
              dark:border-[#5B6677]
              dark:bg-[#323D4E]
              dark:peer-checked:border-[#4880FF]
              dark:peer-checked:bg-[#4880FF]
            "
          >
            {checked && (
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M3 8l3 3 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </span>

        <span>{children}</span>
      </label>

      {error && (
        <p className="mt-1 text-[10px] font-semibold text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}