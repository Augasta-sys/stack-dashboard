import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("dashstack-theme")

    return saved === "dark" ? "dark" : "light"
  })

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark",
    )

    localStorage.setItem("dashstack-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) =>
      current === "light" ? "dark" : "light",
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider",
    )
  }

  return context
}