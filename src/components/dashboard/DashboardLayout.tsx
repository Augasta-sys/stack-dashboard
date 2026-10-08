import type { ReactNode } from "react"
import { useState } from "react"

import Sidebar from "./Sidebar"
import Header from "./Header"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false)

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false)

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      setMobileSidebarOpen((previous) => !previous)
    } else {
      setSidebarCollapsed((previous) => !previous)
    }
  }

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-[#F5F6FA]
        text-[#202224]
        transition-colors
        duration-200
        dark:bg-[#1B2431]
        dark:text-white

        print:min-h-0
        print:bg-white
        print:text-black
      "
    >
      {/* Sidebar - hidden when printing */}
      <div className="print:hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() =>
            setMobileSidebarOpen(false)
          }
        />
      </div>

      <div
        className={[
          "min-h-screen",
          "transition-[padding] duration-300 ease-in-out",
          "print:min-h-0",
          "print:pl-0",
          sidebarCollapsed
            ? "lg:pl-[80px]"
            : "lg:pl-[240px]",
        ].join(" ")}
      >
        {/* Header - hidden when printing */}
        <div className="print:hidden">
          <Header
            onMenuClick={handleMenuClick}
          />
        </div>

        <main
          className="
            min-h-[calc(100vh-70px)]
            w-full
            bg-[#F5F6FA]
            px-4
            py-6
            text-[#202224]
            transition-colors
            duration-200

            sm:px-6
            sm:py-7

            lg:px-[30px]
            lg:py-[30px]

            dark:bg-[#1B2431]
            dark:text-white

            print:min-h-0
            print:w-full
            print:bg-white
            print:p-0
            print:text-black
          "
        >
          {children}
        </main>
      </div>
    </div>
  )
}