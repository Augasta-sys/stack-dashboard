import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
      className="
        fixed
        right-3
        top-3
        z-50
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        border
        border-white/30
        bg-white/20
        text-white
        shadow-md
        backdrop-blur-md
        transition-all
        duration-200
        hover:scale-105
        hover:bg-white/30
        active:scale-95
        sm:right-5
        sm:top-5
      "
    >
      {theme === "light" ? (
        <Moon size={17} />
      ) : (
        <Sun size={17} />
      )}
    </button>
  )
}