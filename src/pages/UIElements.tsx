import { useEffect, useMemo, useRef, useState } from "react"
import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell as RechartsCell,
} from "recharts"
import { ChevronDown, Funnel } from "lucide-react"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"

type Locale = "en" | "fr" | "es"

const copy = {
  en: {
    title: "UI Elements",
    filterBy: "Filter By",
    charts: "Charts",
    bar: "Bar Chart",
    pie: "Pie Chart",
    donut: "Donut Chart",
    options: ["Charts", "Tables", "Forms", "Buttons"],
  },
  fr: {
    title: "Éléments d'interface",
    filterBy: "Filtrer par",
    charts: "Graphiques",
    bar: "Graphique à barres",
    pie: "Graphique circulaire",
    donut: "Graphique en anneau",
    options: ["Graphiques", "Tableaux", "Formulaires", "Boutons"],
  },
  es: {
    title: "Elementos de interfaz",
    filterBy: "Filtrar por",
    charts: "Gráficos",
    bar: "Gráfico de barras",
    pie: "Gráfico circular",
    donut: "Gráfico de anillo",
    options: ["Gráficos", "Tablas", "Formularios", "Botones"],
  },
} as const

function getLocale(language: unknown): Locale {
  const value = String(language ?? "").trim().toLowerCase()

  if (
    value === "fr" ||
    value === "fr-fr" ||
    value === "french" ||
    value.startsWith("fran") ||
    value.startsWith("français")
  ) {
    return "fr"
  }

  if (
    value === "es" ||
    value === "es-es" ||
    value === "spanish" ||
    value.startsWith("span") ||
    value.startsWith("españ")
  ) {
    return "es"
  }

  return "en"
}

const solidBlue = [
  { name: "1", value: 80 },
  { name: "2", value: 30 },
  { name: "3", value: 20 },
  { name: "4", value: 65 },
  { name: "5", value: 55 },
  { name: "6", value: 30 },
  { name: "7", value: 45 },
]

const tealStack = [
  { name: "1", bottom: 55, center: 18, top: 12 },
  { name: "2", bottom: 30, center: 14, top: 20 },
  { name: "3", bottom: 38, center: 11, top: 22 },
  { name: "4", bottom: 45, center: 18, top: 15 },
  { name: "5", bottom:42, center: 15, top: 15 },
  { name: "6", bottom: 50, center: 10, top: 12 },
  { name: "7", bottom: 58, center: 15, top: 15 },
]


const orangeBlue = [
  { name: "1", val1: 45, val2: 30 },
  { name: "2", val1: 60, val2: 45 },
  { name: "3", val1: 55, val2: 35 },
  { name: "4", val1: 80, val2: 50 },
  { name: "5", val1: 48, val2: 34 },
  { name: "6", val1: 52, val2: 45 },
  { name: "7", val1: 65, val2: 50 },
]

const pinkStack = [
  { name: "1", b: 15, m: 12, t: 48 },
  { name: "2", b: 12, m: 10, t: 30 },
  { name: "3", b: 14, m: 14, t: 42 },
  { name: "4", b: 12, m: 13, t: 48 },
  { name: "5", b: 14, m: 14, t: 44 },
  { name: "6", b: 12, m: 14, t: 51 },
  { name: "7", b: 15, m: 15, t: 55 },
]

function useDarkMode() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  )

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setDark(root.classList.contains("dark"))
    })

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return dark
}

type BarChartPoint = {
  name: string
  value?: number
  bottom?: number
  top?: number
  val1?: number
  val2?: number
  b?: number
  m?: number
  t?: number
}

function MiniBarChart({
  type,
}: {
  type: "blue" | "teal" | "orange" | "pink"
}) {
  const chartData: BarChartPoint[] =
    type === "blue"
      ? solidBlue
      : type === "teal"
        ? tealStack
        : type === "orange"
          ? orangeBlue
          : pinkStack

  return (
    <div className="h-[180px] min-w-0 w-full sm:h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData as any}
          barCategoryGap={type === "orange" ? "28%" : "32%"}
          margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
        >
          {type === "blue" && (
            <Bar
              dataKey="value"
              fill="#4880FF"
              radius={[4, 4, 4, 4]}
              barSize={8}
            />
          )}

          {type === "teal" && (
            <>
 <Bar
  dataKey="top"
  fill="#b8dae4"
  stackId="a"
  radius={[0, 0, 0, 0]}
  barSize={8}
/>

<Bar
  dataKey="center"
  fill="#13C8B5"
  stackId="a"
  radius={[0, 0, 0, 0]}
  barSize={8}
/>

<Bar
  dataKey="bottom"
  fill="#b8dae4"
  stackId="a"
  radius={[4, 4, 0, 0]}
  barSize={8}
/>
        </>
          )}

          {type === "orange" && (
            <>
              <Bar
                dataKey="val1"
                fill="#FF9F43"
                radius={[4, 4, 4, 4]}
                barSize={8}
              />
              <Bar
                dataKey="val2"
                fill="#4880FF"
                radius={[4, 4, 4, 4]}
                barSize={8}
              />
            </>
          )}

          {type === "pink" && (
            <>
              <Bar
                dataKey="b"
                fill="#F93C65"
                stackId="a"
                radius={[0, 0, 4, 4]}
                barSize={8}
              />
              <Bar
                dataKey="m"
                fill="#FF8BA5"
                stackId="a"
                barSize={8}
              />
              <Bar
                dataKey="t"
                fill="#FFE1E8"
                stackId="a"
                radius={[4, 4, 0, 0]}
                barSize={8}
              />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function PieSlice({
  value,
  color,
  remainder,
  startAngle = 90,
  endAngle = -270,
}: {
  value: number
  color: string
  remainder: string
  startAngle?: number
  endAngle?: number
}) {
  const data = [
    { name: "filled", value },
    { name: "remainder", value: 100 - value },
  ]

  return (
    <div className="h-[180px] w-full min-w-0 sm:h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={80}
            startAngle={startAngle}
            endAngle={endAngle}
            stroke="none"
            isAnimationActive={false}
          >
            <RechartsCell fill={color} />
            <RechartsCell fill={remainder} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}



function DonutChart({
  segments,
  colors,
  track,
}: {
  segments: number[]
  colors: string[]
  track: string
}) {
  const data = [
    ...segments.map((value, index) => ({
      name: `segment-${index}`,
      value,
      color: colors[index],
    })),
    { name: "track", value: 100 - segments.reduce((a, b) => a + b, 0), color: track },
  ]

  return (
    <div className="h-[190px] w-full min-w-0 sm:h-[210px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            paddingAngle={0}
            isAnimationActive={false}
          >
            {data.map((item) => (
              <RechartsCell key={item.name} fill={item.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function UIElements() {
  const { language } = useLanguage()
  const lang = getLocale(language)
  const t = copy[lang]
  const dark = useDarkMode()

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [])

  const selectedLabel = useMemo(
    () => t.options[selectedIndex],
    [selectedIndex, t.options],
  )

  const pieTrack = dark ? "#FFFFFF" : "#EAF1FB"
  const donutTrack = dark ? "#323D4E" : "#EAF1FB"

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="font-sans text-[24px] font-bold leading-none tracking-[-0.11px] text-[#202224] sm:text-[32px] dark:text-white">
            {t.title}
          </h1>

          <div
            ref={dropdownRef}
            className="relative inline-flex w-full items-center self-start rounded-[10px] border border-[#D5D5D5] bg-[#FAFBFD] shadow-sm dark:border-[#313D4F] dark:bg-[#273142] sm:w-auto"
          >
            <div className="flex h-[48px] w-[58px] items-center justify-center border-r border-[#D5D5D5] text-[#202224] dark:border-[#313D4F] dark:text-white">
              <Funnel className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div className="flex h-[48px] items-center px-4 font-bold text-[14px] text-[#202224] dark:text-white">
              {t.filterBy}
            </div>

            <button
              type="button"
              onClick={() => setDropdownOpen((open) => !open)}
              className="flex h-[48px] min-w-[158px] flex-1 cursor-pointer items-center justify-between gap-2 border-l border-[#D5D5D5] px-4 font-bold text-[14px] text-[#202224] transition-colors hover:bg-gray-100 dark:border-[#313D4F] dark:text-white dark:hover:bg-[#323D4E] sm:flex-none"
            >
              <span>{selectedLabel}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-[56px] z-30 w-[180px] overflow-hidden rounded-[10px] border border-[#D5D5D5] bg-white py-1.5 shadow-xl dark:border-[#313D4F] dark:bg-[#273142]">
                {t.options.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSelectedIndex(index)
                      setDropdownOpen(false)
                    }}
                    className={`flex w-full items-center px-4 py-2.5 text-left text-[14px] font-semibold transition-colors ${
                      index === selectedIndex
                        ? "bg-[#4880FF]/10 text-[#4880FF]"
                        : "text-[#202224] hover:bg-[#F5F6FA] dark:text-white dark:hover:bg-[#323D4E]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <section className="mb-[30px] w-full rounded-[14px] border border-[#B9B9B9]/20 bg-white p-6 shadow-sm dark:border-[#313D4F] dark:bg-[#273142] sm:p-8">
          <h2 className="mb-8 font-bold text-[20px] text-[#202224] sm:text-[22px] dark:text-white">
            {t.bar}
          </h2>

          <div className="grid min-h-[220px] grid-cols-1 items-end gap-6 sm:gap-[40px] md:grid-cols-2 lg:grid-cols-4">
            <MiniBarChart type="blue" />
            <MiniBarChart type="teal" />
            <MiniBarChart type="orange" />
            <MiniBarChart type="pink" />
          </div>
        </section>

        <section className="mb-[30px] w-full rounded-[14px] border border-[#B9B9B9]/20 bg-white p-6 shadow-sm dark:border-[#313D4F] dark:bg-[#273142] sm:p-8">
          <h2 className="mb-8 font-bold text-[20px] text-[#202224] sm:text-[22px] dark:text-white">
            {t.pie}
          </h2>

          <div
            className="grid min-h-[220px] grid-cols-1 items-center justify-items-center gap-6 sm:grid-cols-2 sm:gap-[40px] lg:grid-cols-4"
          >
           <PieSlice
              value={25}
              color="#4880FF"
              remainder={pieTrack}
              startAngle={180}
              endAngle={-180}
            />
            <PieSlice value={25} color="#B659FF" remainder={pieTrack} />
            <PieSlice
              value={37}
              color="#FF9F43"
              remainder={pieTrack}
              startAngle={-405}
              endAngle={-45}
            />
            <PieSlice
              value={40}
              color="#4880FF"
              remainder={pieTrack}
              startAngle={230}
              endAngle={-135}
            />
          </div>
        </section>

        <section className="mb-[30px] w-full rounded-[14px] border border-[#B9B9B9]/20 bg-white p-6 shadow-sm dark:border-[#313D4F] dark:bg-[#273142] sm:p-8">
          <h2 className="mb-8 font-bold text-[20px] text-[#202224] sm:text-[22px] dark:text-white">
            {t.donut}
          </h2>

          <div className="grid min-h-[220px] grid-cols-1 items-center justify-items-center gap-6 pb-6 sm:grid-cols-2 sm:gap-[40px] lg:grid-cols-4">
            <DonutChart segments={[35]} colors={["#00B69B"]} track={donutTrack} />
            <DonutChart
              segments={[50, 25]}
              colors={["#4880FF", "#FF9F43"]}
              track={donutTrack}
            />
            <DonutChart
              segments={[50, 25, 25]}
              colors={["#00B69B", "#4880FF", "#FFD56D"]}
              track={donutTrack}
            />
            <DonutChart
              segments={[40, 35, 15, 10]}
              colors={["#00B69B", "#4880FF", "#FF9F43", "#FFD56D"]}
              track={donutTrack}
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
