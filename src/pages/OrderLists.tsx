import type { ReactNode } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Funnel,
  RotateCcw,
} from "lucide-react"
import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"

type OrderStatus = "Completed" | "Processing" | "Rejected" | "On Hold" | "In Transit"
type OrderType =
  | "Electric"
  | "Book"
  | "Medicine"
  | "Mobile"
  | "Watch"

type Order = {
  id: string
  name: string
  address: string
  date: string
  type: OrderType
  status: OrderStatus
}

type Popover = "date" | "type" | "status" | null

const INITIAL_ORDERS: Order[] = [
  { id: "00001", name: "Christine Brooks", address: "089 Kutch Green Apt. 448", date: "04 Sep 2019", type: "Electric", status: "Completed" },
  { id: "00002", name: "Rosie Pearson", address: "979 Immanuel Ferry Suite 526", date: "28 May 2019", type: "Book", status: "Processing" },
  { id: "00003", name: "Darrell Caldwell", address: "8587 Frida Ports", date: "23 Nov 2019", type: "Medicine", status: "Rejected" },
  { id: "00004", name: "Gilbert Johnston", address: "768 Destiny Lake Suite 600", date: "05 Feb 2019", type: "Mobile", status: "Completed" },
  { id: "00005", name: "Alan Cain", address: "042 Mylene Throughway", date: "29 Jul 2019", type: "Watch", status: "Processing" },
  { id: "00006", name: "Alfred Murray", address: "543 Weimann Mountain", date: "15 Aug 2019", type: "Medicine", status: "Completed" },
  { id: "00007", name: "Maggie Sullivan", address: "New Scottieberg", date: "21 Dec 2019", type: "Watch", status: "Processing" },
  { id: "00008", name: "Rosie Todd", address: "New Jon", date: "30 Apr 2019", type: "Medicine", status: "On Hold" },
  { id: "00009", name: "Dollie Hines", address: "124 Lyla Forge Suite 975", date: "09 Jan 2019", type: "Book", status: "In Transit" },
]

const EXTRA_NAMES = [
  "Robert Fox", "Jenny Wilson", "Cody Fisher", "Esther Howard", "Jacob Jones",
  "Courtney Henry", "Kristin Watson", "Ronald Richards", "Arlene McCoy", "Devon Lane",
  "Annette Black", "Marvin McKinney", "Dianne Russell", "Theresa Webb", "Kathryn Murphy",
  "Wade Warren", "Brooklyn Simmons", "Eleanor Pena", "Guy Hawkins", "Savannah Nguyen",
]
const EXTRA_ADDRESSES = [
  "21 Lakeview Road", "45 Green Street", "78 Market Avenue", "16 Rose Garden", "304 Sunset Drive",
  "88 Highland Park", "12 Oakwood Lane", "56 River View", "91 Maple Street", "240 Park Avenue",
]
const EXTRA_TYPES: OrderType[] = ["Electric", "Book", "Medicine", "Mobile", "Watch"]
const EXTRA_STATUSES: OrderStatus[] = ["Completed", "Processing", "Rejected", "On Hold", "In Transit"]

function makeOrders(): Order[] {
  const extra = Array.from({ length: 69 }, (_, index) => ({
    id: String(index + 10).padStart(5, "0"),
    name: EXTRA_NAMES[index % EXTRA_NAMES.length],
    address: EXTRA_ADDRESSES[index % EXTRA_ADDRESSES.length],
    date: `${String((index % 27) + 1).padStart(2, "0")} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index % 12]} 2019`,
    type: EXTRA_TYPES[index % EXTRA_TYPES.length],
    status: EXTRA_STATUSES[index % EXTRA_STATUSES.length],
  }))
  return [...INITIAL_ORDERS, ...extra]
}

const ALL_ORDERS = makeOrders()

const TYPE_OPTIONS = [
  "Health & Medicine",
  "Book & Stationary",
  "Services & Industry",
  "Fashion & Beauty",
  "Home & Living",
  "Electronics",
  "Mobile & Phone",
  "Accessories",
] as const

const STATUS_OPTIONS: OrderStatus[] = [
  "Completed",
  "Processing",
  "Rejected",
  "On Hold",
  "In Transit",
]

const TYPE_MAPPING: Record<(typeof TYPE_OPTIONS)[number], OrderType[]> = {
  "Health & Medicine": ["Medicine"],
  "Book & Stationary": ["Book"],
  "Services & Industry": ["Watch"],
  "Fashion & Beauty": ["Watch"],
  "Home & Living": ["Watch"],
  Electronics: ["Electric"],
  "Mobile & Phone": ["Mobile"],
  Accessories: ["Watch"],
}

const CALENDAR_CELLS = [
  { day: 27, outside: true }, { day: 28, outside: true }, { day: 29, outside: true }, { day: 30, outside: true },
  { day: 1 }, { day: 2 }, { day: 3 },
  { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 },
  { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 },
  { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 },
  { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29, outside: true }, { day: 30, outside: true }, { day: 31, outside: true },
]

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function parseDate(value: string) {
  return new Date(value)
}

function formatDate(date: Date, months: readonly string[] = MONTHS) {
  return `${String(date.getDate()).padStart(2, "0")} ${months[date.getMonth()].slice(0, 3)} ${date.getFullYear()}`
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function StatusBadge({ status, label }: { status: OrderStatus; label: string }) {
  const classes: Record<OrderStatus, string> = {
    Completed: "bg-[#00B69B]/20 text-[#00B69B] dark:bg-[#00B69B] dark:text-white",
    Processing: "bg-[#6226EF]/20 text-[#6226EF] dark:bg-[#6226EF] dark:text-white",
    Rejected: "bg-[#EF3826]/20 text-[#EF3826] dark:bg-[#EF3826] dark:text-white",
    "On Hold": "bg-[#FFA756]/20 text-[#FFA756] dark:bg-[#FFA756] dark:text-white",
    "In Transit": "bg-[#BA29FF]/20 text-[#BA29FF] dark:bg-[#BA29FF] dark:text-white",
  }

  return (
    <span className={`inline-flex h-[27px] w-[93px] items-center justify-center rounded-[4.5px] text-[12px] font-bold ${classes[status]}`}>
      {label}
    </span>
  )
}

function FilterButton({ children, active, onClick, muted = false }: { children: ReactNode; active?: boolean; onClick: () => void; muted?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[50px] shrink-0 items-center justify-center px-4 text-[14px] font-bold transition-colors sm:h-[50px] sm:px-6 ${active ? "bg-black/[0.025] dark:bg-white/[0.03]" : "hover:bg-black/[0.025] dark:hover:bg-white/[0.03]"} ${muted ? "text-[#202224]/50 dark:text-gray-400" : "text-[#202224] dark:text-white"}`}
    >
      {children}
    </button>
  )
}

export default function OrderLists() {
  const { language } = useLanguage()
  const [openPopover, setOpenPopover] = useState<Popover>(null)
  const [page, setPage] = useState(0)
  const [calendarMonth, setCalendarMonth] = useState(new Date(2019, 1, 1))
  const [draftDates, setDraftDates] = useState<Date[]>([new Date(2019, 1, 14)])
  const [appliedDates, setAppliedDates] = useState<Date[]>([])
  const [draftTypes, setDraftTypes] = useState<string[]>([])
  const [appliedTypes, setAppliedTypes] = useState<string[]>([])
  const [draftStatuses, setDraftStatuses] = useState<OrderStatus[]>([])
  const [appliedStatuses, setAppliedStatuses] = useState<OrderStatus[]>([])
  const filterRef = useRef<HTMLDivElement>(null)

  const text = useMemo(() => {
    const translations = {
      English: {
        heading: "Order Lists", filter: "Filter By", date: "Date", type: "Order Type", status: "Order Status", reset: "Reset Filter", apply: "Apply Now",
        chooseDate: "*You can choose multiple date", chooseType: "*You can choose multiple Order type", chooseStatus: "*You can choose multiple Order Status",
        prev: "Prev. Date", next: "Next Date", showing: "Showing", noOrders: "No orders found.",
        selectType: "Select Order Type", selectStatus: "Select Order Status",
        headers: ["ID", "NAME", "ADDRESS", "DATE", "TYPE", "STATUS"],
        weekdays: ["S", "M", "T", "W", "T", "F", "S"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        types: { "Health & Medicine": "Health & Medicine", "Book & Stationary": "Book & Stationary", "Services & Industry": "Services & Industry", "Fashion & Beauty": "Fashion & Beauty", "Home & Living": "Home & Living", Electronics: "Electronics", "Mobile & Phone": "Mobile & Phone", Accessories: "Accessories" },
      },
      French: {
        heading: "Listes de commandes", filter: "Filtrer par", date: "Date", type: "Type de commande", status: "Statut de commande", reset: "Réinitialiser", apply: "Appliquer",
        chooseDate: "*Vous pouvez choisir plusieurs dates", chooseType: "*Vous pouvez choisir plusieurs types de commande", chooseStatus: "*Vous pouvez choisir plusieurs statuts",
        prev: "Date précédente", next: "Date suivante", showing: "Affichage", noOrders: "Aucune commande trouvée.",
        selectType: "Sélectionner le type de commande", selectStatus: "Sélectionner le statut de commande",
        headers: ["ID", "NOM", "ADRESSE", "DATE", "TYPE", "STATUT"],
        weekdays: ["D", "L", "M", "M", "J", "V", "S"],
        months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        types: { "Health & Medicine": "Santé et médecine", "Book & Stationary": "Livres et papeterie", "Services & Industry": "Services et industrie", "Fashion & Beauty": "Mode et beauté", "Home & Living": "Maison et décoration", Electronics: "Électronique", "Mobile & Phone": "Mobile et téléphone", Accessories: "Accessoires" },
      },
      Spanish: {
        heading: "Listas de pedidos", filter: "Filtrar por", date: "Fecha", type: "Tipo de pedido", status: "Estado del pedido", reset: "Restablecer filtro", apply: "Aplicar ahora",
        chooseDate: "*Puedes elegir varias fechas", chooseType: "*Puedes elegir varios tipos de pedido", chooseStatus: "*Puedes elegir varios estados",
        prev: "Fecha anterior", next: "Fecha siguiente", showing: "Mostrando", noOrders: "No se encontraron pedidos.",
        selectType: "Seleccionar tipo de pedido", selectStatus: "Seleccionar estado del pedido",
        headers: ["ID", "NOMBRE", "DIRECCIÓN", "FECHA", "TIPO", "ESTADO"],
        weekdays: ["D", "L", "M", "X", "J", "V", "S"],
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        types: { "Health & Medicine": "Salud y medicina", "Book & Stationary": "Libros y papelería", "Services & Industry": "Servicios e industria", "Fashion & Beauty": "Moda y belleza", "Home & Living": "Hogar y decoración", Electronics: "Electrónica", "Mobile & Phone": "Móvil y teléfono", Accessories: "Accesorios" },
      },
    } as const
    return translations[language] ?? translations.English
  }, [language])

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) setOpenPopover(null)
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [])

  const isDateFiltered = appliedDates.length === 1

  const filteredOrders = useMemo(() => {
    let result = ALL_ORDERS

    if (appliedDates.length > 0) {
      if (appliedDates.length === 1) {
        // Figma's filtered-date state intentionally shows the first six orders on the selected date.
        result = ALL_ORDERS.slice(0, 6).map((order) => ({ ...order, date: formatDate(appliedDates[0], text.months) }))
      } else {
        result = ALL_ORDERS.filter((order) => appliedDates.some((date) => sameDay(parseDate(order.date), date)))
      }
    }

    if (appliedTypes.length > 0) {
      const mapped = new Set(appliedTypes.flatMap((type) => TYPE_MAPPING[type as keyof typeof TYPE_MAPPING]))
      result = result.filter((order) => mapped.has(order.type))
    }

    if (appliedStatuses.length > 0) {
      result = result.filter((order) => appliedStatuses.includes(order.status))
    }

    return result
  }, [appliedDates, appliedTypes, appliedStatuses, text.months])

  const pageSize = 9
  const total = filteredOrders.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const visibleOrders = isDateFiltered ? filteredOrders.slice(0, 6) : filteredOrders.slice(page * pageSize, page * pageSize + pageSize)

  const selectedDateLabel = isDateFiltered ? formatDate(appliedDates[0], text.months) : text.date

  const applyDates = () => {
    setAppliedDates(draftDates)
    setPage(0)
    setOpenPopover(null)
  }

  const applyTypes = () => {
    setAppliedTypes(draftTypes)
    setPage(0)
    setOpenPopover(null)
  }

  const applyStatuses = () => {
    setAppliedStatuses(draftStatuses)
    setPage(0)
    setOpenPopover(null)
  }

  const resetFilters = () => {
    setDraftDates([new Date(2019, 1, 14)])
    setAppliedDates([])
    setDraftTypes([])
    setAppliedTypes([])
    setDraftStatuses([])
    setAppliedStatuses([])
    setCalendarMonth(new Date(2019, 1, 1))
    setPage(0)
    setOpenPopover(null)
  }

  const moveFilteredDate = (amount: number) => {
    const current = appliedDates[0] ?? new Date(2019, 1, 14)
    const next = new Date(current)
    next.setDate(next.getDate() + amount)
    setAppliedDates([next])
    setDraftDates([next])
    setCalendarMonth(new Date(next.getFullYear(), next.getMonth(), 1))
  }

  const toggleDate = (day: number, outside = false) => {
    const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day)
    if (outside) {
      if (day > 20) date.setMonth(date.getMonth() - 1)
      else date.setMonth(date.getMonth() + 1)
    }
    setDraftDates((current) => current.some((item) => sameDay(item, date)) ? current.filter((item) => !sameDay(item, date)) : [...current, date])
  }

  const toggleType = (type: string) => setDraftTypes((current) => current.includes(type) ? current.filter((item) => item !== type) : [...current, type])
  const toggleStatus = (status: OrderStatus) => setDraftStatuses((current) => current.includes(status) ? current.filter((item) => item !== status) : [...current, status])

  const statusLabel = (status: OrderStatus) => {
    const labels: Record<"English" | "French" | "Spanish", Record<OrderStatus, string>> = {
      English: { Completed: "Completed", Processing: "Processing", Rejected: "Rejected", "On Hold": "On Hold", "In Transit": "In Transit" },
      French: { Completed: "Terminé", Processing: "En traitement", Rejected: "Rejeté", "On Hold": "En attente", "In Transit": "En transit" },
      Spanish: { Completed: "Completado", Processing: "Procesando", Rejected: "Rechazado", "On Hold": "En espera", "In Transit": "En tránsito" },
    }
    return labels[language][status]
  }

  return (
    <DashboardLayout>
      <section className="w-full">
        <h1 className="mb-6 font-sans text-[24px] font-bold leading-none tracking-[-0.11px] text-[#202224] dark:text-white sm:text-[32px]">{text.heading}</h1>

        <div ref={filterRef} className="relative z-20 mb-6 w-full">
          <div className="inline-flex w-full flex-wrap items-center overflow-visible rounded-[10px] border border-[#D5D5D5] bg-[#F9F9FB] shadow-sm dark:divide-[#313D4F] dark:border-[#313D4F] dark:bg-[#273142] sm:w-auto sm:flex-nowrap sm:divide-x">
            <div className="flex h-[50px] w-[62px] shrink-0 items-center justify-center border-b border-[#D5D5D5] dark:border-[#313D4F] sm:h-[50px] sm:border-b-0 sm:px-5">
              <Funnel className="h-5 w-5 text-[#202224] dark:text-white" strokeWidth={1.8} />
            </div>
            <FilterButton onClick={() => setOpenPopover(null)}>{text.filter}</FilterButton>
            <FilterButton active={openPopover === "date"} muted={openPopover === "date"} onClick={() => setOpenPopover(openPopover === "date" ? null : "date")}>
              <span>{selectedDateLabel}</span><ChevronDown className="ml-3 h-4 w-4" />
            </FilterButton>
            <FilterButton active={openPopover === "type"} muted={openPopover === "type" || appliedTypes.length > 0} onClick={() => setOpenPopover(openPopover === "type" ? null : "type")}>
              <span>{appliedTypes.length ? `${text.type} (${appliedTypes.length})` : text.type}</span><ChevronDown className="ml-3 h-4 w-4" />
            </FilterButton>
            <FilterButton active={openPopover === "status"} muted={openPopover === "status" || appliedStatuses.length > 0} onClick={() => setOpenPopover(openPopover === "status" ? null : "status")}>
              <span>{appliedStatuses.length ? `${text.status} (${appliedStatuses.length})` : text.status}</span><ChevronDown className="ml-3 h-4 w-4" />
            </FilterButton>
            <button type="button" onClick={resetFilters} className="flex h-[50px] shrink-0 items-center justify-center px-5 text-[14px] font-bold text-[#EA0234] transition-colors hover:bg-[#EA0234]/5 dark:text-[#FF8743] dark:hover:bg-[#FF8743]/10 sm:h-[50px] sm:px-6">
              <RotateCcw className="mr-2 h-4 w-4" />{text.reset}
            </button>
          </div>

          {openPopover === "date" && (
            <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-[310px] rounded-[26px] border border-gray-100 bg-white p-6 shadow-[0_13px_61px_rgba(169,169,169,0.36)] dark:border-[#4B5668] dark:bg-[#323D4E] dark:shadow-[0_13px_61px_rgba(0,0,0,0.5)] sm:left-[140px] sm:w-[335px]">
              <div className="flex items-center justify-between border-b border-[#E0E0E0]/60 pb-4 dark:border-[#4B5668]">
                <span className="text-[15px] font-bold text-[#202224] dark:text-white">{text.months[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}</span>
                <div className="flex gap-2">
                  <button type="button" aria-label="Previous month" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))} className="flex h-6 w-6 items-center justify-center rounded bg-[#F5F6FA] text-[#565656] transition-colors hover:bg-[#4880FF] hover:text-white dark:bg-[#273142] dark:text-gray-300"><ChevronLeft size={15} /></button>
                  <button type="button" aria-label="Next month" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))} className="flex h-6 w-6 items-center justify-center rounded bg-[#F5F6FA] text-[#565656] transition-colors hover:bg-[#4880FF] hover:text-white dark:bg-[#273142] dark:text-gray-300"><ChevronRight size={15} /></button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-y-1 py-4">
                {text.weekdays.map((day, index) => <div key={`${day}-${index}`} className="mb-2 text-center text-[12px] font-bold text-[#202224] dark:text-white">{day}</div>)}
                {CALENDAR_CELLS.map((cell, index) => {
                  const cellDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), cell.day)
                  if (cell.outside && cell.day > 20) cellDate.setMonth(cellDate.getMonth() - 1)
                  if (cell.outside && cell.day < 10) cellDate.setMonth(cellDate.getMonth() + 1)
                  const selected = draftDates.some((date) => sameDay(date, cellDate))
                  return <button type="button" key={`${cell.day}-${index}`} onClick={() => toggleDate(cell.day, cell.outside)} className={`mx-auto flex h-[34px] w-[34px] items-center justify-center rounded-[12px] text-[13px] transition-colors ${selected ? "bg-[#4880FF] font-bold text-white" : cell.outside ? "text-[#A6A6A6] dark:text-gray-500" : "text-[#202224] hover:bg-[#4880FF]/10 dark:text-white"}`}>{cell.day}</button>
                })}
              </div>
              <div className="border-t border-[#E0E0E0]/60 pt-3 dark:border-[#4B5668]">
                <p className="mb-4 text-[12px] text-[#8E8E8E] dark:text-gray-400">{text.chooseDate}</p>
                <button type="button" onClick={applyDates} className="mx-auto block h-9 w-[129px] rounded-lg bg-[#4880FF] text-[12px] font-bold text-white shadow-sm transition-all hover:bg-[#3B6EE8]">{text.apply}</button>
              </div>
            </div>
          )}

          {openPopover === "type" && (
            <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-[320px] rounded-[26px] border border-gray-100 bg-white p-6 shadow-[0_13px_61px_rgba(169,169,169,0.36)] dark:border-[#4B5668] dark:bg-[#323D4E] dark:shadow-[0_13px_61px_rgba(0,0,0,0.5)] sm:left-[260px] sm:w-[520px] sm:p-7">
              <h2 className="mb-5 text-[18px] font-bold text-[#202224] dark:text-white">{text.selectType}</h2>
              <div className="grid grid-cols-2 gap-3 border-b border-[#E0E0E0]/60 pb-6 dark:border-[#4B5668] sm:grid-cols-3">
                {TYPE_OPTIONS.map((type) => {
                  const selected = draftTypes.includes(type)
                  return <button type="button" key={type} onClick={() => toggleType(type)} className={`flex h-9 items-center justify-center whitespace-nowrap rounded-full border px-3 text-[13px] font-semibold transition-all ${selected ? "border-[#4880FF] bg-[#4880FF] text-white shadow-sm" : "border-[#D5D5D5] text-[#202224] hover:border-[#4880FF] dark:border-[#6C788B] dark:text-white"}`}>{text.types[type]}</button>
                })}
              </div>
              <div className="pt-4"><p className="mb-4 text-[12px] text-[#8E8E8E] dark:text-gray-400">{text.chooseType}</p><button type="button" onClick={applyTypes} className="mx-auto block h-9 w-[129px] rounded-lg bg-[#4880FF] text-[12px] font-bold text-white hover:bg-[#3B6EE8]">{text.apply}</button></div>
            </div>
          )}

          {openPopover === "status" && (
            <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-[320px] rounded-[26px] border border-gray-100 bg-white p-6 shadow-[0_13px_61px_rgba(169,169,169,0.36)] dark:border-[#4B5668] dark:bg-[#323D4E] dark:shadow-[0_13px_61px_rgba(0,0,0,0.5)] sm:left-[380px] sm:w-[500px] sm:p-7">
              <h2 className="mb-5 text-[18px] font-bold text-[#202224] dark:text-white">{text.selectStatus}</h2>
              <div className="grid grid-cols-2 gap-3 border-b border-[#E0E0E0]/60 pb-6 dark:border-[#4B5668] sm:grid-cols-3">
                {STATUS_OPTIONS.map((status) => {
                  const selected = draftStatuses.includes(status)
                  return <button type="button" key={status} onClick={() => toggleStatus(status)} className={`flex h-9 items-center justify-center whitespace-nowrap rounded-full border px-3 text-[13px] font-semibold transition-all ${selected ? "border-[#4880FF] bg-[#4880FF] text-white shadow-sm" : "border-[#D5D5D5] text-[#202224] hover:border-[#4880FF] dark:border-[#6C788B] dark:text-white"}`}>{statusLabel(status)}</button>
                })}
              </div>
              <div className="pt-4"><p className="mb-4 text-[12px] text-[#8E8E8E] dark:text-gray-400">{text.chooseStatus}</p><button type="button" onClick={applyStatuses} className="mx-auto block h-9 w-[129px] rounded-lg bg-[#4880FF] text-[12px] font-bold text-white hover:bg-[#3B6EE8]">{text.apply}</button></div>
            </div>
          )}
        </div>

        <div className="w-full overflow-hidden rounded-[14px] border border-[#B9B9B9]/30 bg-white shadow-sm dark:border-[#313D4F] dark:bg-[#273142]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead className="h-[54px] border-b border-[#D5D5D5]/60 bg-[#FCFDFD] dark:border-[#313D4F] dark:bg-[#323D4E]">
                <tr>{text.headers.map((header) => <th key={header} className="px-6 text-left text-[14px] font-extrabold text-[#202224] dark:text-white">{header}</th>)}</tr>
              </thead>
              <tbody>
                {visibleOrders.length === 0 ? (
                  <tr><td colSpan={6} className="h-32 px-6 text-center text-sm text-[#777] dark:text-gray-400">{text.noOrders}</td></tr>
                ) : visibleOrders.map((order) => (
                  <tr key={order.id} className="h-[72px] border-b border-[#D5D5D5]/40 text-[14px] font-semibold text-[#202224] transition-colors hover:bg-[#4880FF]/[0.03] dark:border-[#313D4F] dark:text-gray-100 dark:hover:bg-[#323D4E]/50">
                    <td className="whitespace-nowrap px-6">{order.id}</td>
                    <td className="whitespace-nowrap px-6">{order.name}</td>
                    <td className="whitespace-nowrap px-6">{order.address}</td>
                    <td className="whitespace-nowrap px-6">{order.date}</td>
                    <td className="whitespace-nowrap px-6">{order.type}</td>
                    <td className="px-6"><StatusBadge status={order.status} label={statusLabel(order.status)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isDateFiltered ? (
          <div className="mt-6 flex items-center justify-between gap-4">
            <button type="button" onClick={() => moveFilteredDate(-1)} className="flex h-9 items-center gap-2 rounded-lg border border-[#D5D5D5] bg-white px-4 text-[13px] font-semibold text-[#202224]/70 transition-all hover:border-[#4880FF] hover:text-[#4880FF] dark:border-[#313D4F] dark:bg-[#273142] dark:text-gray-300"><ChevronLeft size={16} />{text.prev}</button>
            <button type="button" onClick={() => moveFilteredDate(1)} className="flex h-9 items-center gap-2 rounded-lg border border-[#D5D5D5] bg-white px-4 text-[13px] font-semibold text-[#202224]/70 transition-all hover:border-[#4880FF] hover:text-[#4880FF] dark:border-[#313D4F] dark:bg-[#273142] dark:text-gray-300">{text.next}<ChevronRight size={16} /></button>
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-[14px] font-semibold text-[#202224]/60 dark:text-gray-400">{text.showing} {total === 0 ? 0 : page * pageSize + 1}-{Math.min((page + 1) * pageSize, total)} of {total}</span>
            <div className="inline-flex overflow-hidden rounded-lg border border-[#D5D5D5] bg-[#FAFBFD] dark:border-[#313D4F] dark:bg-[#273142]">
              <button type="button" disabled={page === 0} onClick={() => setPage((current) => Math.max(0, current - 1))} className="flex h-8 w-[42px] items-center justify-center border-r border-[#D5D5D5] text-[#6E747C] transition hover:bg-[#4880FF] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#313D4F]"><ChevronLeft size={17} /></button>
              <button type="button" disabled={page >= pageCount - 1} onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))} className="flex h-8 w-[42px] items-center justify-center text-[#6E747C] transition hover:bg-[#4880FF] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight size={17} /></button>
            </div>
          </div>
        )}
      </section>
    </DashboardLayout>
  )
}
