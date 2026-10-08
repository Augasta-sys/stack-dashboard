import type { ElementType } from "react"
import {
  Banknote,
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  Columns,
  Gauge,
  Gift,
  Heart,
  LayoutGrid,
  ListChecks,
  MessageSquare,
  Power,
  Settings,
  Table,
  User,
  Users,
} from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { useLanguage } from "../../context/LanguageContext"

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onMobileClose: () => void
}

interface NavigationItem {
  label: string
  path: string
  icon: ElementType
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const navigate = useNavigate()
  const { t } = useLanguage()

  /*
   * Navigation items
   *
   * Important:
   * We use translation values here instead of hardcoded
   * English labels.
   */
  const topItems: NavigationItem[] = [
    {
      label: t.dashboard,
      path: "/dashboard",
      icon: Gauge,
    },
    {
      label: t.products,
      path: "/products",
      icon: LayoutGrid,
    },
    {
      label: t.favorites,
      path: "/favorites",
      icon: Heart,
    },
    {
      label: t.inbox,
      path: "/inbox",
      icon: MessageSquare,
    },
    {
      label: t.orderLists,
      path: "/order-lists",
      icon: ListChecks,
    },
    {
      label: t.productStock,
      path: "/product-stock",
      icon: Columns,
    },
  ]

  const pageItems: NavigationItem[] = [
    {
      label: t.pricing,
      path: "/pricing",
      icon: Gift,
    },
    {
      label: t.calendar,
      path: "/calendar",
      icon: CalendarDays,
    },
    {
      label: t.todo,
      path: "/todo",
      icon: ClipboardCheck,
    },
    {
      label: t.contact,
      path: "/contact",
      icon: Users,
    },
    {
      label: t.invoice,
      path: "/invoice",
      icon: Banknote,
    },
    {
      label: t.uiElements,
      path: "/ui-elements",
      icon: BarChart3,
    },
    {
      label: t.team,
      path: "/team",
      icon: User,
    },
    {
      label: t.table,
      path: "/table",
      icon: Table,
    },
  ]

  const bottomItems: NavigationItem[] = [
    {
      label: t.settings,
      path: "/settings",
      icon: Settings,
    },
  ]

  const renderNavigationItem = (item: NavigationItem) => {
    const Icon = item.icon

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={onMobileClose}
        title={collapsed ? item.label : undefined}
        className={({ isActive }) =>
          [
            "group relative mx-3 flex h-[50px] items-center rounded-[6px]",
            "transition-all duration-200 ease-in-out",

            collapsed
              ? "justify-center px-0"
              : "gap-4 px-4",

            isActive
              ? "bg-[#4880FF] text-white shadow-sm"
              : [
                  "text-[#202224]",
                  "hover:bg-[#4880FF]/10 hover:text-[#4880FF]",
                  "dark:text-white",
                  "dark:hover:bg-[#323D4E]",
                  "dark:hover:text-[#4880FF]",
                ].join(" "),
          ].join(" ")
        }
      >
        {({ isActive }) => (
          <>
            {/* Active left blue indicator */}
            {isActive && (
              <span className="absolute -left-3 top-0 h-[50px] w-[4px] rounded-r-[4px] bg-[#4880FF]" />
            )}

            <Icon
              size={22}
              strokeWidth={isActive ? 2.2 : 1.8}
              className="shrink-0 transition-transform duration-200 group-hover:scale-105"
            />

            {!collapsed && (
              <span className="whitespace-nowrap text-[14px] font-semibold tracking-[0.3px]">
                {item.label}
              </span>
            )}
          </>
        )}
      </NavLink>
    )
  }

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex flex-col",
          "border-r border-[#E5E5E5] bg-white",
          "dark:border-[#313D4F] dark:bg-[#273142]",
          "transition-all duration-300 ease-in-out",

          collapsed ? "w-[80px]" : "w-[240px]",

          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",

          "max-lg:w-[240px]",
        ].join(" ")}
      >
        {/* Logo */}
        <div
          className={[
            "flex h-[70px] shrink-0 items-center",
            "border-b border-[#F0F0F0]",
            "dark:border-[#313D4F]",
            "justify-center",
          ].join(" ")}
        >
          <div className="whitespace-nowrap text-[20px] font-extrabold leading-none">
            <span className="text-[#4880FF]">Dash</span>

            {!collapsed && (
              <span className="text-[#202224] dark:text-white">
                Stack
              </span>
            )}
          </div>
        </div>

        {/* Sidebar content */}
        <div className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden py-3">
          {/* Top navigation */}
          <nav className="space-y-1">
            {topItems.map(renderNavigationItem)}
          </nav>

          {/* Divider */}
          <div className="my-4 border-t border-[#E0E0E0] dark:border-[#313D4F]" />

          {/* Pages title */}
          {!collapsed && (
            <div className="mb-2 px-10 text-[12px] font-bold uppercase tracking-[0.26px] text-[#202224]/60 dark:text-gray-400">
              {t.pages}
            </div>
          )}

          {/* Pages navigation */}
          <nav className="space-y-1">
            {pageItems.map(renderNavigationItem)}
          </nav>

          {/* Divider */}
          <div className="my-4 border-t border-[#E0E0E0] dark:border-[#313D4F]" />

          {/* Bottom navigation */}
          <nav className="space-y-1">
            {bottomItems.map(renderNavigationItem)}

            {/* Logout */}
            <button
              type="button"
              onClick={() => {
                onMobileClose()
                navigate("/login")
              }}
              title={collapsed ? t.logout : undefined}
              className={[
                "group relative mx-3 flex h-[50px] w-[calc(100%-24px)]",
                "items-center rounded-[6px]",
                "text-[#202224]",
                "transition-all duration-200",
                "hover:bg-[#4880FF]/10 hover:text-[#4880FF]",
                "dark:text-white dark:hover:bg-[#323D4E]",
                "dark:hover:text-[#4880FF]",

                collapsed
                  ? "justify-center px-0"
                  : "gap-4 px-4",
              ].join(" ")}
            >
              <Power
                size={22}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:scale-105"
              />

              {!collapsed && (
                <span className="text-[14px] font-semibold tracking-[0.3px]">
                  {t.logout}
                </span>
              )}
            </button>
          </nav>
        </div>
      </aside>
    </>
  )
}