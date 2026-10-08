import {
  useEffect,
  useRef,
  useState,
} from "react"
import type {
  KeyboardEvent,
  ReactNode,
} from "react"
import { useLanguage } from "../../context/LanguageContext"
import {
  AlertCircle,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleUserRound,
  KeyRound,
  LogOut,
  Menu,
  Moon,
  RefreshCw,
  Search,
  Settings,
  Sun,
  UserCog,
  X,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Language } from "../../context/LanguageContext"
const createFlag = (svg: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
const flagImages: Record<Language, string> = {
  English: createFlag(`
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="54" viewBox="0 0 80 54">
      <rect width="80" height="54" fill="#012169"/>
      <path d="M0 0L80 54M80 0L0 54" stroke="#fff" stroke-width="14"/>
      <path d="M0 0L80 54M80 0L0 54" stroke="#C8102E" stroke-width="6"/>
      <path d="M40 0V54M0 27H80" stroke="#fff" stroke-width="18"/>
      <path d="M40 0V54M0 27H80" stroke="#C8102E" stroke-width="10"/>
    </svg>
  `),
  French: createFlag(`
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="54" viewBox="0 0 80 54">
      <rect width="26.67" height="54" fill="#0055A4"/>
      <rect x="26.67" width="26.66" height="54" fill="#fff"/>
      <rect x="53.33" width="26.67" height="54" fill="#EF4135"/>
    </svg>
  `),
  Spanish: createFlag(`
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="54" viewBox="0 0 80 54">
      <rect width="80" height="54" fill="#AA151B"/>
      <rect y="13.5" width="80" height="27" fill="#F1BF00"/>
      <circle cx="23" cy="27" r="5" fill="#AA151B" opacity=".8"/>
    </svg>
  `),
}
interface HeaderProps {
  onMenuClick: () => void
}
type DropdownType =
  | "notification"
  | "language"
  | "profile"
  | null
interface LanguageOption {
  name: Language
  flag: string
}
const languages: LanguageOption[] = [
  {
    name: "English",
    flag: flagImages.English,
  },
  {
    name: "French",
    flag: flagImages.French,
  },
  {
    name: "Spanish",
    flag: flagImages.Spanish,
  },
]
const notifications = [
  {
    title: "Settings",
    subtitle: "Update Dashboard",
    type: "settings",
  },
  {
    title: "Event Update",
    subtitle: "An event date update again",
    type: "event",
  },
  {
    title: "Profile",
    subtitle: "Update your profile",
    type: "profile",
  },
  {
    title: "Application Error",
    subtitle: "Check Your running application",
    type: "error",
  },
]
const notificationTranslations: Record<Language, Record<string, { title: string; subtitle: string }>> = {
  English: {
    settings: { title: "Settings", subtitle: "Update Dashboard" },
    event: { title: "Event Update", subtitle: "An event date update again" },
    profile: { title: "Profile", subtitle: "Update your profile" },
    error: { title: "Application Error", subtitle: "Check Your running application" },
  },
  French: {
    settings: { title: "Parametres", subtitle: "Mettre a jour le tableau de bord" },
    event: { title: "Mise a jour evenement", subtitle: "Une nouvelle mise a jour de la date" },
    profile: { title: "Profil", subtitle: "Mettre a jour votre profil" },
    error: { title: "Erreur application", subtitle: "Verifiez votre application" },
  },
  Spanish: {
    settings: { title: "Configuracion", subtitle: "Actualizar el panel" },
    event: { title: "Actualizacion de evento", subtitle: "Nueva actualizacion de la fecha" },
    profile: { title: "Perfil", subtitle: "Actualiza tu perfil" },
    error: { title: "Error de aplicacion", subtitle: "Comprueba tu aplicacion" },
  },
}
export default function Header({
  onMenuClick,
}: HeaderProps) {
  const navigate = useNavigate()
  const {
    language,
    setLanguage,
    t,
  } = useLanguage()
  const [openDropdown, setOpenDropdown] =
    useState<DropdownType>(null)
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains(
      "dark",
    )
  })
  const [search, setSearch] = useState("")
  const [mobileSearchOpen, setMobileSearchOpen] =
    useState(false)
  const headerRef =
    useRef<HTMLDivElement>(null)
  /*
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpenDropdown(null)
        setMobileSearchOpen(false)
      }
    }
    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    )
    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      )
    }
  }, [])
  /*
   * Theme
   */
  const toggleTheme = () => {
    const nextTheme = !darkMode
    setDarkMode(nextTheme)
    if (nextTheme) {
      document.documentElement.classList.add(
        "dark",
      )
      localStorage.setItem(
        "dashstack-theme",
        "dark",
      )
    } else {
      document.documentElement.classList.remove(
        "dark",
      )
      localStorage.setItem(
        "dashstack-theme",
        "light",
      )
    }
  }
  /*
   * Search
   */
  const handleSearchKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== "Enter") return
    const value = search.trim().toLowerCase()
    if (!value) return
    const routes = [
      {
        keywords: ["dashboard"],
        path: "/dashboard",
      },
      {
        keywords: ["product", "products"],
        path: "/products",
      },
      {
        keywords: ["favorite", "favorites"],
        path: "/favorites",
      },
      {
        keywords: ["inbox", "message"],
        path: "/inbox",
      },
      {
        keywords: ["order", "orders"],
        path: "/order-lists",
      },
      {
        keywords: ["stock"],
        path: "/product-stock",
      },
      {
        keywords: ["pricing"],
        path: "/pricing",
      },
      {
        keywords: ["calendar", "calender"],
        path: "/calendar",
      },
      {
        keywords: ["todo", "to-do"],
        path: "/todo",
      },
      {
        keywords: ["contact"],
        path: "/contact",
      },
      {
        keywords: ["invoice"],
        path: "/invoice",
      },
      {
        keywords: ["ui", "elements"],
        path: "/ui-elements",
      },
      {
        keywords: ["team"],
        path: "/team",
      },
      {
        keywords: ["table"],
        path: "/table",
      },
      {
        keywords: ["settings"],
        path: "/settings",
      },
    ]
    const result = routes.find((item) =>
      item.keywords.some((keyword) =>
        keyword.includes(value),
      ),
    )
    if (result) {
      navigate(result.path)
      setSearch("")
      setMobileSearchOpen(false)
    }
  }
  /*
   * Dropdown
   */
  const toggleDropdown = (
    dropdown: Exclude<DropdownType, null>,
  ) => {
    setOpenDropdown((current) =>
      current === dropdown
        ? null
        : dropdown,
    )
    setMobileSearchOpen(false)
  }
  /*
   * Get current language flag
   */
  const selectedLanguage =
    languages.find(
      (item) => item.name === language,
    ) ?? languages[0]
  /*
   * Language change
   */
  const handleLanguageChange = (
    newLanguage: Language,
  ) => {
    setLanguage(newLanguage)
    setOpenDropdown(null)
  }
  return (
    <header
      ref={headerRef}
      className="
        sticky
        top-0
        z-40
        flex
        min-h-[70px]
        w-full
        items-center
        border-b
        border-transparent
        bg-white
        px-3
        py-2
        dark:border-[#313D4F]
        dark:bg-[#273142]
        sm:px-4
        sm:py-0
        md:px-5
        lg:px-[30px]
      "
    >
      <div
        className="
          flex
          w-full
          min-w-0
          items-center
          justify-between
          gap-2
          sm:gap-3
          lg:gap-4
        "
      >
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}
        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-2
            sm:gap-3
          "
        >
          {/* Hamburger */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-[#202224]
              transition-all
              duration-200
              hover:bg-[#F5F6FA]
              hover:text-[#4880FF]
              dark:text-white
              dark:hover:bg-[#323D4E]
            "
          >
            <Menu
              size={22}
              strokeWidth={1.8}
            />
          </button>
          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen(
                (prev) => !prev,
              )
              setOpenDropdown(null)
            }}
            aria-label="Open search"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-[#606060]
              transition-all
              duration-200
              hover:bg-[#F5F6FA]
              hover:text-[#4880FF]
              dark:text-gray-300
              dark:hover:bg-[#323D4E]
              sm:hidden
            "
          >
            {mobileSearchOpen ? (
              <X size={20} />
            ) : (
              <Search size={20} />
            )}
          </button>
          {/* Search - Tablet / Laptop / Desktop */}
          <div
            className="
              relative
              hidden
              min-w-0
              flex-1
              sm:block
              sm:max-w-[250px]
              md:max-w-[300px]
              lg:max-w-[388px]
              xl:max-w-[420px]
              2xl:max-w-[480px]
            "
          >
            <Search
              size={18}
              strokeWidth={1.8}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#777]
                dark:text-gray-400
              "
            />
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              onKeyDown={
                handleSearchKeyDown
              }
              placeholder={t.search}
              className="
                h-[38px]
                w-full
                rounded-[19px]
                border
                border-[#D5D5D5]
                bg-[#F5F6FA]
                pl-10
                pr-4
                text-[14px]
                text-[#202224]
                outline-none
                transition-all
                duration-200
                placeholder:text-[#999]
                focus:border-[#4880FF]
                focus:ring-2
                focus:ring-[#4880FF]/10
                dark:border-[#4B5668]
                dark:bg-[#323D4E]
                dark:text-white
                dark:placeholder:text-gray-400
              "
            />
          </div>
          {/* Mobile Search Input */}
          {mobileSearchOpen && (
            <div
              className="
                absolute
                left-3
                right-3
                top-[70px]
                z-50
                rounded-xl
                bg-white
                p-2
                shadow-xl
                dark:bg-[#273142]
                sm:hidden
              "
            >
              <div className="relative">
                <Search
                  size={18}
                  strokeWidth={1.8}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-[#777]
                    dark:text-gray-400
                  "
                />
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  onKeyDown={
                    handleSearchKeyDown
                  }
                  placeholder={t.search}
                  className="
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-[#D5D5D5]
                    bg-[#F5F6FA]
                    pl-10
                    pr-3
                    text-sm
                    text-[#202224]
                    outline-none
                    focus:border-[#4880FF]
                    dark:border-[#4B5668]
                    dark:bg-[#323D4E]
                    dark:text-white
                  "
                />
              </div>
            </div>
          )}
        </div>
        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}
        <div
          className="
            flex
            shrink-0
            items-center
            gap-0.5
            sm:gap-1
            md:gap-2
            lg:gap-3
          "
        >
          {/* Theme */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              text-[#606060]
              transition-all
              duration-200
              hover:bg-[#F5F6FA]
              hover:text-[#4880FF]
              dark:text-gray-300
              dark:hover:bg-[#323D4E]
              sm:h-10
              sm:w-10
            "
          >
            {darkMode ? (
              <Sun
                size={20}
                strokeWidth={1.8}
              />
            ) : (
              <Moon
                size={20}
                strokeWidth={1.8}
              />
            )}
          </button>
          {/* Notification */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                toggleDropdown(
                  "notification",
                )
              }
              aria-label="Notifications"
              className="
                relative
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                transition-all
                duration-200
                hover:bg-[#F5F6FA]
                dark:hover:bg-[#323D4E]
                sm:h-10
                sm:w-10
              "
            >
              <Bell
                size={21}
                strokeWidth={1.8}
                className="text-[#4880FF]"
              />
              <span
                className="
                  absolute
                  right-0
                  top-0
                  flex
                  h-[16px]
                  min-w-[16px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F93C65]
                  px-1
                  text-[8px]
                  font-bold
                  text-white
                  ring-2
                  ring-white
                  dark:ring-[#273142]
                  sm:h-[17px]
                  sm:min-w-[17px]
                  sm:text-[9px]
                "
              >
                6
              </span>
            </button>
            {openDropdown ===
              "notification" && (
              <div
                className="
                  fixed
                  left-3
                  right-3
                  top-[74px]
                  z-50
                  w-auto
                  overflow-hidden
                  rounded-[14px]
                  border
                  border-gray-100
                  bg-white
                  shadow-xl
                  dark:border-[#313D4F]
                  dark:bg-[#273142]
                  sm:absolute
                  sm:left-auto
                  sm:right-0
                  sm:top-[52px]
                  sm:w-[min(300px,calc(100vw-24px))]
                "
              >
                <div
                  className="
                    border-b
                    border-gray-100
                    px-4
                    py-3
                    dark:border-[#313D4F]
                    sm:px-5
                  "
                >
                  <p className="text-[15px] font-bold text-[#202224] dark:text-white">
                    {t.notification}
                  </p>
                </div>
                {notifications.map(
                  (notification) => (
                    <button
                      key={
                        notification.title
                      }
                      type="button"
                      onClick={() => {
                        const notificationRoutes: Record<string, string> = {
                          settings: "/settings",
                          event: "/calendar",
                          profile: "/settings",
                          error: "/dashboard",
                        }
                        setOpenDropdown(null)
                        navigate(notificationRoutes[notification.type] ?? "/dashboard")
                      }}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-left
                        transition-colors
                        hover:bg-gray-50
                        dark:hover:bg-[#323D4E]
                      "
                    >
                      <NotificationIcon
                        type={
                          notification.type
                        }
                      />
                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-[#202224] dark:text-white">
                          {notificationTranslations[language][notification.type]?.title ?? notification.title}
                        </p>
                        <p className="truncate text-[11px] text-[#A6A6A6] dark:text-gray-400">
                          {notificationTranslations[language][notification.type]?.subtitle ?? notification.subtitle}
                        </p>
                      </div>
                    </button>
                  ),
                )}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null)
                    navigate("/inbox")
                  }}
                  className="
                    w-full
                    border-t
                    border-gray-100
                    py-3
                    text-center
                    text-[13px]
                    text-[#A6A6A6]
                    transition-colors
                    hover:text-[#4880FF]
                    dark:border-[#313D4F]
                  "
                >
                  {t.seeAllNotification}
                </button>
              </div>
            )}
          </div>
          {/* Language */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                toggleDropdown("language")
              }
              aria-label="Select language"
              className="
                flex
                h-9
                items-center
                gap-1.5
                rounded-lg
                px-1.5
                transition-colors
                hover:bg-[#F5F6FA]
                dark:hover:bg-[#323D4E]
                sm:h-10
                sm:gap-2
                sm:px-2
              "
            >
              <img
                src={selectedLanguage.flag}
                alt={selectedLanguage.name}
                className="
                  h-[22px]
                  w-[32px]
                  rounded-[3px]
                  object-cover
                  sm:h-[27px]
                  sm:w-[40px]
                  sm:rounded-[4px]
                "
              />
              <span
                className="
                  hidden
                  text-[14px]
                  font-semibold
                  text-[#606060]
                  md:block
                  dark:text-gray-200
                "
              >
                {language}
              </span>
              <ChevronDown
                size={15}
                className="text-[#606060] dark:text-gray-300"
              />
            </button>
            {openDropdown ===
              "language" && (
              <div
                className="
                  absolute
                  right-0
                  top-[48px]
                  z-50
                  w-[200px]
                  overflow-hidden
                  rounded-[14px]
                  border
                  border-gray-100
                  bg-white
                  shadow-xl
                  dark:border-[#313D4F]
                  dark:bg-[#273142]
                  sm:top-[52px]
                  sm:w-[210px]
                "
              >
                <div
                  className="
                    border-b
                    border-gray-100
                    px-4
                    py-3
                    dark:border-[#313D4F]
                    sm:px-5
                  "
                >
                  <p className="text-[14px] text-[#606060] dark:text-gray-300">
                    {t.selectLanguage}
                  </p>
                </div>
                {languages.map(
                  (languageOption) => {
                    const active =
                      languageOption.name ===
                      language
                    return (
                      <button
                        key={
                          languageOption.name
                        }
                        type="button"
                        onClick={() =>
                          handleLanguageChange(
                            languageOption.name,
                          )
                        }
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          px-4
                          py-3
                          transition-colors
                          hover:bg-gray-50
                          dark:hover:bg-[#323D4E]
                          sm:px-5
                        "
                      >
                        <span className="flex items-center gap-3">
                          <img
                            src={
                              languageOption.flag
                            }
                            alt={
                              languageOption.name
                            }
                            className="
                              h-[24px]
                              w-[36px]
                              rounded-[3px]
                              object-cover
                              sm:h-[27px]
                              sm:w-[40px]
                              sm:rounded-[4px]
                            "
                          />
                          <span className="text-[14px] font-semibold text-[#202224] dark:text-white">
                            {
                              languageOption.name
                            }
                          </span>
                        </span>
                        {active && (
                          <Check
                            size={18}
                            className="text-[#4880FF]"
                          />
                        )}
                      </button>
                    )
                  },
                )}
              </div>
            )}
          </div>
          {/* Profile */}
          <div className="relative ml-0.5 sm:ml-1">
            <button
              type="button"
              onClick={() =>
                toggleDropdown("profile")
              }
              aria-label="Open profile menu"
              className="
                flex
                items-center
                gap-2
                rounded-lg
                px-1
                py-1
                transition-colors
                hover:bg-[#F5F6FA]
                dark:hover:bg-[#323D4E]
              "
            >
              {/* Avatar */}
              <div
                className="
                  h-[38px]
                  w-[38px]
                  shrink-0
                  overflow-hidden
                  rounded-full
                  sm:h-[42px]
                  sm:w-[42px]
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Moni Roy"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Profile text */}
              <div className="hidden text-left xl:block">
                <p className="text-[14px] font-bold leading-5 text-[#202224] dark:text-white">
                  Moni Roy
                </p>
                <p className="text-[12px] font-semibold text-[#565656] dark:text-gray-400">
                  {t.admin}
                </p>
              </div>
              {/* Arrow */}
              <span
                className="
                  hidden
                  h-[19px]
                  w-[19px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D5D5D5]
                  lg:flex
                  dark:border-[#596577]
                "
              >
                <ChevronDown
                  size={12}
                  className="text-[#606060] dark:text-gray-300"
                />
              </span>
            </button>
            {openDropdown ===
              "profile" && (
              <div
                className="
                  absolute
                  right-0
                  top-[48px]
                  z-50
                  w-[205px]
                  overflow-hidden
                  rounded-[14px]
                  border
                  border-gray-100
                  bg-white
                  py-2
                  shadow-xl
                  dark:border-[#313D4F]
                  dark:bg-[#273142]
                  sm:top-[52px]
                "
              >
                <ProfileItem
                  icon={
                    <UserCog size={18} />
                  }
                  iconClass="text-[#4E96FF]"
                  label={t.manageAccount}
                  onClick={() => {
                    setOpenDropdown(null)
                    navigate("/settings")
                  }}
                />
                <ProfileItem
                  icon={
                    <KeyRound size={18} />
                  }
                  iconClass="text-[#F97FD9]"
                  label={t.changePassword}
                  onClick={() => {
                    setOpenDropdown(null)
                    navigate("/settings")
                  }}
                />
                <ProfileItem
                  icon={
                    <RefreshCw size={18} />
                  }
                  iconClass="text-[#9E8FFF]"
                  label={t.activityLog}
                  onClick={() => {
                    setOpenDropdown(null)
                    navigate("/dashboard")
                  }}
                />
                <ProfileItem
                  icon={
                    <LogOut size={18} />
                  }
                  iconClass="text-[#FF8F8F]"
                  label={t.logout}
                  onClick={() => {
                    setOpenDropdown(null)
                    navigate("/login")
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
/*
 * Notification icon
 */
function NotificationIcon({
  type,
}: {
  type: string
}) {
  const styles: Record<
    string,
    string
  > = {
    settings: "bg-[#4880FF]",
    event: "bg-[#F97FD9]",
    profile: "bg-[#9A89FF]",
    error: "bg-[#FF8F8F]",
  }
  return (
    <span
      className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white " + (styles[type] ?? "bg-[#4880FF]")}
    >
      {type === "settings" && (
        <Settings size={18} />
      )}
      {type === "event" && (
        <CalendarDays size={18} />
      )}
      {type === "profile" && (
        <CircleUserRound size={18} />
      )}
      {type === "error" && (
        <AlertCircle size={18} />
      )}
    </span>
  )
}
/*
 * Profile dropdown item
 */
function ProfileItem({
  icon,
  iconClass,
  label,
  onClick,
}: {
  icon: ReactNode
  iconClass: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        gap-3
        px-4
        py-3
        text-left
        transition-colors
        hover:bg-gray-50
        dark:hover:bg-[#323D4E]
      "
    >
      <span className={iconClass}>
        {icon}
      </span>
      <span className="text-[14px] font-semibold text-[#202224] dark:text-white">
        {label}
      </span>
    </button>
  )
}
