import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import {
  ArrowLeft,
  Camera,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"

type ViewMode = "day" | "week" | "month"
type Accent = "purple" | "pink" | "orange" | "blue" | "green"

interface CalendarEvent {
  id: number
  title: string
  organization: string
  time: string
  address: string
  address2: string
  badge: string
  date: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD for multi-day events
  accent: Accent
  image: string
  avatars: string[]
}

interface FormState {
  name: string
  time: string
  date: string
  address: string
  contact: string
  image: string
}

const images = {
  design:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop&q=80",
  festival:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&auto=format&fit=crop&q=80",
  glastonbury:
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=700&auto=format&fit=crop&q=80",
  ultra:
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&auto=format&fit=crop&q=80",
  tech:
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&auto=format&fit=crop&q=80",
  workshop:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700&auto=format&fit=crop&q=80",
  a1:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  a2:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  a3:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  a4:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
}

const copy = {
  en: {
    calendar: "Calender",
    add: "Add New Event",
    going: "You are going to",
    more: "See More",
    less: "See Less",
    today: "Today",
    day: "Day",
    week: "Week",
    month: "Month",
    addTitle: "Add New Event",
    back: "Back",
    upload: "Upload Cover Photo",
    event: "Event Name",
    eventPh: "Enter event name",
    time: "Time",
    timePh: "12:34 BDT",
    date: "Date",
    datePh: "11-09-2019",
    address: "Address",
    addressPh: "Address",
    contact: "Contact Number",
    contactPh: "Enter your Contact Number",
    addNow: "Add Now",
    required: "Please enter the event name, time, date and address.",
    monday: "MON",
    tuesday: "TUE",
    wednesday: "WED",
    thursday: "THU",
    friday: "FRI",
    saturday: "SAT",
    sunday: "SUN",
    noEvents: "No events",
  },
  fr: {
    calendar: "Calendrier",
    add: "Ajouter un événement",
    going: "Vous participez à",
    more: "Voir plus",
    less: "Voir moins",
    today: "Aujourd’hui",
    day: "Jour",
    week: "Semaine",
    month: "Mois",
    addTitle: "Ajouter un nouvel événement",
    back: "Retour",
    upload: "Télécharger une photo de couverture",
    event: "Nom de l’événement",
    eventPh: "Entrez le nom de l’événement",
    time: "Heure",
    timePh: "12:34 BDT",
    date: "Date",
    datePh: "11-09-2019",
    address: "Adresse",
    addressPh: "Adresse",
    contact: "Numéro de contact",
    contactPh: "Entrez votre numéro de contact",
    addNow: "Ajouter",
    required: "Veuillez saisir le nom, l’heure, la date et l’adresse.",
    monday: "LUN",
    tuesday: "MAR",
    wednesday: "MER",
    thursday: "JEU",
    friday: "VEN",
    saturday: "SAM",
    sunday: "DIM",
    noEvents: "Aucun événement",
  },
  es: {
    calendar: "Calendario",
    add: "Añadir nuevo evento",
    going: "Vas a asistir a",
    more: "Ver más",
    less: "Ver menos",
    today: "Hoy",
    day: "Día",
    week: "Semana",
    month: "Mes",
    addTitle: "Añadir nuevo evento",
    back: "Volver",
    upload: "Subir foto de portada",
    event: "Nombre del evento",
    eventPh: "Introduce el nombre del evento",
    time: "Hora",
    timePh: "12:34 BDT",
    date: "Fecha",
    datePh: "11-09-2019",
    address: "Dirección",
    addressPh: "Dirección",
    contact: "Número de contacto",
    contactPh: "Introduce tu número de contacto",
    addNow: "Añadir ahora",
    required: "Introduce el nombre, la hora, la fecha y la dirección.",
    monday: "LUN",
    tuesday: "MAR",
    wednesday: "MIÉ",
    thursday: "JUE",
    friday: "VIE",
    saturday: "SÁB",
    sunday: "DOM",
    noEvents: "Sin eventos",
  },
} as const

const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Design Conference",
    organization: "Zillul Design Agency",
    time: "Today 07:19 AM",
    address: "56 Davion Mission Suite 157",
    address2: "Meaghanberg",
    badge: "15+",
    date: "2019-10-03",
    accent: "purple",
    image: images.design,
    avatars: [images.a1, images.a2, images.a3],
  },
  {
    id: 2,
    title: "Weekend Festival",
    organization: "Nordic Live Events",
    time: "16 October 2019 at 5.00 PM",
    address: "853 Moore Flats Suite 158",
    address2: "Sweden",
    badge: "20+",
    date: "2019-10-16",
    accent: "pink",
    image: images.festival,
    avatars: [images.a2, images.a3, images.a4],
  },
  {
    id: 3,
    title: "Glastonbury Festival",
    organization: "UK Music Group",
    time: "20-22 October 2019 at 8.00 PM",
    address: "646 Walter Road Apt. 571",
    address2: "Turks and Caicos Islands",
    badge: "14+",
    date: "2019-10-20",
    endDate: "2019-10-22",
    accent: "orange",
    image: images.glastonbury,
    avatars: [images.a1, images.a4, images.a2],
  },
  {
    id: 4,
    title: "Ultra Europe 2019",
    organization: "Ultra Worldwide",
    time: "25 October 2019 at 10.00 PM",
    address: "506 Satterfield Tunnel Apt. 963",
    address2: "San Marino",
    badge: "42+",
    date: "2019-10-25",
    accent: "blue",
    image: images.ultra,
    avatars: [images.a3, images.a2, images.a4],
  },
  {
    id: 5,
    title: "Product Design Workshop",
    organization: "Creative Studio",
    time: "07 November 2019 at 10.00 AM",
    address: "21 Market Street Suite 400",
    address2: "London",
    badge: "12+",
    date: "2019-11-07",
    accent: "green",
    image: images.workshop,
    avatars: [images.a1, images.a3, images.a4],
  },
  {
    id: 6,
    title: "Tech Innovation Summit",
    organization: "Future Labs",
    time: "12 November 2019 at 2.00 PM",
    address: "88 Innovation Avenue",
    address2: "Berlin",
    badge: "30+",
    date: "2019-11-12",
    accent: "purple",
    image: images.tech,
    avatars: [images.a2, images.a4, images.a1],
  },
  {
    id: 7,
    title: "Winter Music Night",
    organization: "Live Nation Events",
    time: "05 December 2019 at 7.30 PM",
    address: "17 River Road",
    address2: "Manchester",
    badge: "25+",
    date: "2019-12-05",
    accent: "pink",
    image: images.festival,
    avatars: [images.a4, images.a2, images.a3],
  },
]

const accentStyles: Record<Accent, { border: string; light: string; dark: string; text: string; darkText: string }> = {
  purple: { border: "#7551FF", light: "rgba(117,81,255,.15)", dark: "rgba(117,81,255,.25)", text: "#7551FF", darkText: "#B49BFF" },
  pink: { border: "#EE5D99", light: "rgba(238,93,153,.15)", dark: "rgba(238,93,153,.25)", text: "#EE5D99", darkText: "#FF94C2" },
  orange: { border: "#FF9F43", light: "rgba(255,159,67,.15)", dark: "rgba(255,159,67,.25)", text: "#FF9F43", darkText: "#FFB66E" },
  blue: { border: "#4880FF", light: "rgba(72,128,255,.15)", dark: "rgba(72,128,255,.25)", text: "#4880FF", darkText: "#76A1FF" },
  green: { border: "#00B69B", light: "rgba(0,182,155,.15)", dark: "rgba(0,182,155,.25)", text: "#00A98F", darkText: "#55D9C5" },
}

const monthNames = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
  es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
} as const

const weekDayNames = {
  en: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  fr: ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"],
  es: ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"],
} as const

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function parseDateKey(key: string) {
  const [year, month, day] = key.split("-").map(Number)
  return new Date(year, month - 1, day)
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addDays(date: Date, amount: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return startOfDay(next)
}

function mondayIndex(date: Date) {
  return (date.getDay() + 6) % 7
}

function formatDateKey(date: Date) {
  return toDateKey(date.getFullYear(), date.getMonth(), date.getDate())
}

function isEventOnDate(event: CalendarEvent, dateKey: string) {
  return event.date <= dateKey && (event.endDate ?? event.date) >= dateKey
}

function isDarkMode() {
  return document.documentElement.classList.contains("dark")
}

function getEventHour(event: CalendarEvent) {
  const match = event.time.toLowerCase().match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/)
  if (!match) return 9
  let hour = Number(match[1])
  if (match[3] === "pm" && hour !== 12) hour += 12
  if (match[3] === "am" && hour === 12) hour = 0
  return hour
}

function formatLongDate(date: Date, lang: keyof typeof copy) {
  const locale = lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : "en-US"
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function EventPopover({ event, top, left, onEnter, onLeave }: { event: CalendarEvent; top: number; left: number; onEnter: () => void; onLeave: () => void }) {
  return (
    <div
      className="fixed z-[9999] w-[250px] rounded-[14px] border border-gray-100 bg-white p-4 text-left shadow-[0_15px_50px_rgba(0,0,0,.22)] dark:border-[#313D4F] dark:bg-[#273142] dark:shadow-[0_15px_50px_rgba(0,0,0,.55)] sm:w-[265px]"
      style={{ top, left }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <img src={event.image} alt={event.title} className="mb-3 h-[138px] w-full rounded-[8px] object-cover" />
      <h3 className="mb-1 text-[16px] font-bold text-[#202224] dark:text-white">{event.title}</h3>
      <p className="mb-1.5 text-[13px] font-semibold text-[#202224]/70 dark:text-gray-300">{event.organization}</p>
      <p className="mb-0.5 text-[12px] text-[#A6A6A6]">{event.time}</p>
      <p className="mb-3 text-[12px] leading-[1.35] text-[#A6A6A6]">{event.address}<br />{event.address2}</p>
      <div className="flex items-center gap-1.5">
        {event.avatars.map((avatar) => (
          <img key={avatar} src={avatar} alt="" className="h-[26px] w-[26px] rounded-full object-cover" />
        ))}
        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#4880FF] text-[10px] font-bold text-[#4880FF]">{event.badge}</span>
      </div>
    </div>
  )
}

function EventBar({
  event,
  selectedId,
  onSelect,
}: {
  event: CalendarEvent
  selectedId: number | null
  onSelect: (event: CalendarEvent) => void
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 })
  const closeTimer = useRef<number | null>(null)
  const c = accentStyles[event.accent]
  const showPopover = hovered || selectedId === event.id

  const updatePopoverPosition = () => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const width = window.innerWidth < 640 ? Math.min(250, window.innerWidth - 24) : 265
    const height = 300
    const gap = 10
    const calendarLeft = window.innerWidth >= 1024 ? 240 : 12
    const calendarRight = window.innerWidth - 12

    let left = rect.left + rect.width / 2 - width / 2
    left = Math.max(calendarLeft + 8, Math.min(left, calendarRight - width))

    let top = rect.bottom + gap
    if (top + height > window.innerHeight - 10) {
      top = rect.top - height - gap
    }
    top = Math.max(10, Math.min(top, window.innerHeight - height - 10))

    setPopoverPosition({ top, left })
  }

  const open = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
    updatePopoverPosition()
    setHovered(true)
  }

  const closeLater = () => {
    closeTimer.current = window.setTimeout(() => setHovered(false), 180)
  }

  return (
    <div
      className="relative z-40 w-full"
      onMouseEnter={open}
      onMouseLeave={closeLater}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={(clickEvent) => {
          clickEvent.stopPropagation()
          updatePopoverPosition()
          onSelect(event)
        }}
        className="relative block w-full cursor-pointer truncate rounded-r-[3px] border-l-[4px] px-2 py-1.5 text-left text-[11px] font-bold transition-all hover:brightness-95 hover:shadow-md dark:hover:brightness-110"
        style={{
          borderLeftColor: c.border,
          background: isDarkMode() ? c.dark : c.light,
          color: isDarkMode() ? c.darkText : c.text,
        }}
      >
        {event.title}
      </button>
      {showPopover && <EventPopover event={event} top={popoverPosition.top} left={popoverPosition.left} onEnter={open} onLeave={closeLater} />}
    </div>
  )
}

function MonthView({
  year,
  month,
  events,
  selectedId,
  onSelect,
  lang,
}: {
  year: number
  month: number
  events: CalendarEvent[]
  selectedId: number | null
  onSelect: (event: CalendarEvent) => void
  lang: keyof typeof copy
}) {
  const firstDay = new Date(year, month, 1)
  const gridStart = addDays(firstDay, -mondayIndex(firstDay))
  const days = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index))
  const headers = weekDayNames[lang]

  return (
    <div className="overflow-x-auto overflow-y-visible rounded-[10px]">
      <div className="min-w-[580px] overflow-visible sm:min-w-full">
        <div className="grid h-[44px] grid-cols-7 items-center rounded-t-[10px] bg-[#F1F4F9] text-center text-[12px] font-bold text-[#202224] dark:bg-[#323D4E] dark:text-white">
          {headers.map((header) => <div key={header}>{header}</div>)}
        </div>
        <div className="grid grid-cols-7 border-l border-t border-[#E0E0E0] dark:border-[#313D4F] overflow-visible">
          {days.map((date, index) => {
            const dateKey = formatDateKey(date)
            const outside = date.getMonth() !== month
            const dayEvents = events.filter((event) => isEventOnDate(event, dateKey))
            const row = Math.floor(index / 7)

            return (
              <div
                key={dateKey}
                className={`relative flex min-h-[95px] flex-col justify-between border-r border-b border-[#E0E0E0] p-2 transition-colors hover:bg-[#4880FF]/[0.02] dark:border-[#313D4F] sm:min-h-[115px] sm:p-3 ${outside ? "bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,rgba(0,0,0,.03)_6px,rgba(0,0,0,.03)_12px)] dark:bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,rgba(255,255,255,.03)_6px,rgba(255,255,255,.03)_12px)]" : ""}`}
              >
                <span className={`ml-auto text-[14px] font-bold ${outside ? "text-[#A6A6A6] dark:text-gray-500" : "text-[#202224] dark:text-white"}`}>
                  {date.getDate()}
                </span>
                <div className="relative mt-auto space-y-1 overflow-visible">
                  {dayEvents.map((event) => (
                    <EventBar key={`${event.id}-${dateKey}-${row}`} event={event} selectedId={selectedId} onSelect={onSelect} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function WeekView({
  weekStart,
  events,
  selectedId,
  onSelect,
  lang,
}: {
  weekStart: Date
  events: CalendarEvent[]
  selectedId: number | null
  onSelect: (event: CalendarEvent) => void
  lang: keyof typeof copy
}) {
  const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))
  const hours = Array.from({ length: 17 }, (_, index) => index + 7)

  return (
    <div className="overflow-x-auto overflow-y-visible rounded-[10px]">
      <div className="min-w-[820px] overflow-visible rounded-[10px] border border-[#E0E0E0] dark:border-[#313D4F]">
        <div className="grid grid-cols-[78px_repeat(7,minmax(105px,1fr))] bg-[#F1F4F9] dark:bg-[#323D4E]">
          <div />
          {days.map((date) => (
            <div key={formatDateKey(date)} className="border-l border-[#E0E0E0] py-3 text-center dark:border-[#313D4F]">
              <div className="text-[11px] font-bold">{weekDayNames[lang][mondayIndex(date)]}</div>
              <div className="mt-1 text-[16px] font-bold">{date.getDate()}</div>
            </div>
          ))}
        </div>

        {hours.map((hour) => (
          <div key={hour} className="grid min-h-[62px] grid-cols-[78px_repeat(7,minmax(105px,1fr))] border-t border-[#E0E0E0] dark:border-[#313D4F]">
            <div className="px-2 py-3 text-[10px] text-[#A6A6A6]">{formatHour(hour)}</div>
            {days.map((date) => {
              const dateKey = formatDateKey(date)
              const dayEvents = events.filter((event) => isEventOnDate(event, dateKey) && getEventHour(event) === hour)
              return (
                <div key={dateKey} className="relative overflow-visible border-l border-[#E0E0E0] p-1.5 dark:border-[#313D4F]">
                  <div className="space-y-1 overflow-visible">
                    {dayEvents.map((event) => (
                      <EventBar key={`${event.id}-${dateKey}-${hour}`} event={event} selectedId={selectedId} onSelect={onSelect} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function DayView({
  date,
  events,
  selectedId,
  onSelect,
}: {
  date: Date
  events: CalendarEvent[]
  selectedId: number | null
  onSelect: (event: CalendarEvent) => void
}) {
  const hours = Array.from({ length: 17 }, (_, index) => index + 7)
  const dateKey = formatDateKey(date)
  const dayEvents = events.filter((event) => isEventOnDate(event, dateKey))

  return (
    <div className="overflow-visible rounded-[10px] border border-[#E0E0E0] dark:border-[#313D4F]">
      {hours.map((hour) => {
        const matching = dayEvents.filter((event) => getEventHour(event) === hour)
        return (
          <div key={hour} className="grid min-h-[86px] grid-cols-[78px_1fr] border-b border-[#E0E0E0] last:border-b-0 dark:border-[#313D4F]">
            <div className="border-r border-[#E0E0E0] px-3 py-4 text-[11px] text-[#A6A6A6] dark:border-[#313D4F]">{formatHour(hour)}</div>
            <div className="space-y-2 overflow-visible p-3">
              {matching.map((event) => (
                <EventBar key={event.id} event={event} selectedId={selectedId} onSelect={onSelect} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function formatHour(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM"
  const display = hour % 12 || 12
  return `${String(display).padStart(2, "0")}:00 ${suffix}`
}

function EventFeed({
  events,
  expanded,
  setExpanded,
  onAdd,
  t,
}: {
  events: CalendarEvent[]
  expanded: boolean
  setExpanded: () => void
  onAdd: () => void
  t: (typeof copy)[keyof typeof copy]
}) {
  const visible = expanded ? events : events.slice(0, 4)

  return (
    <aside className="w-full shrink-0 rounded-[14px] border border-[#B9B9B9]/20 bg-white p-5 shadow-sm dark:border-[#313D4F] dark:bg-[#273142] sm:p-6 lg:w-[270px] xl:w-[286px]">
      <button
        type="button"
        onClick={onAdd}
        className="mb-6 flex h-[43px] w-full items-center justify-center gap-1 rounded-[8px] bg-[#4880FF] text-[14px] font-bold text-white transition-all hover:bg-[#3B6EE8] hover:shadow-md active:scale-[.99]"
      >
        <Plus size={16} strokeWidth={2.5} />
        <span>{t.add}</span>
      </button>

      <h2 className="mb-5 text-[18px] font-bold text-[#202224] dark:text-white">{t.going}</h2>

      <div className="divide-y divide-[#E0E0E0]/60 dark:divide-[#313D4F]">
        {visible.map((event) => (
          <div key={event.id} className="flex cursor-pointer items-start gap-3.5 rounded-lg px-2 py-5 first:pt-0 transition-colors hover:bg-gray-50/60 dark:hover:bg-[#323D4E]/40">
            <img src={event.image} alt="" className="mt-0.5 h-[38px] w-[38px] shrink-0 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[14px] font-bold text-[#202224] dark:text-white">{event.title}</p>
              <p className="mb-0.5 text-[12px] text-[#202224]/60 dark:text-gray-400">{event.time}</p>
              <p className="mb-3 text-[12px] leading-[1.4] text-[#202224]/60 dark:text-gray-400">
                {event.address}<br />{event.address2}
              </p>
              <div className="flex items-center gap-1.5">
                {event.avatars.map((avatar) => <img key={avatar} src={avatar} alt="" className="h-6 w-6 rounded-full object-cover" />)}
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#4880FF] bg-[#4880FF]/10 text-[10px] font-bold text-[#4880FF]">{event.badge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length > 4 && (
        <button type="button" onClick={setExpanded} className="mx-auto mt-4 block h-[38px] w-[126px] rounded-[10px] bg-[#E2EAF8]/60 text-[13px] font-bold text-[#202224] transition-all hover:bg-[#4880FF] hover:text-white dark:bg-[#323D4E] dark:text-white dark:hover:bg-[#4880FF]">
          {expanded ? t.less : t.more}
        </button>
      )}
    </aside>
  )
}

function AddEventForm({
  onBack,
  onAdd,
  t,
}: {
  onBack: () => void
  onAdd: (event: CalendarEvent) => void
 t: (typeof copy)[keyof typeof copy]
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<FormState>({ name: "", time: "", date: "", address: "", contact: "", image: "" })
  const [error, setError] = useState("")
  const fieldClass = "h-[52px] w-full rounded-[8px] border border-[#D5D5D5] bg-[#F5F6FA] px-4 text-[14px] text-[#202224] outline-none transition-colors placeholder:text-[#A6A6A6] focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"

  const update = (key: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }))
    setError("")
  }

  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm((previous) => ({ ...previous, image: String(reader.result) }))
    reader.readAsDataURL(file)
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.name.trim() || !form.time.trim() || !form.date || !form.address.trim()) {
      setError(t.required)
      return
    }

    const selected = parseDateKey(form.date)
    const formattedTime = form.time.trim()
    const newEvent: CalendarEvent = {
      id: Date.now(),
      title: form.name.trim(),
      organization: "DashStack Events",
      time: formattedTime,
      address: form.address.trim(),
      address2: form.contact.trim() || "Online event",
      badge: "1+",
      date: formatDateKey(selected),
      accent: "blue",
      image: form.image || images.design,
      avatars: [images.a1, images.a2, images.a3],
    }
    onAdd(newEvent)
  }

  const fields = [
    { key: "name" as const, label: t.event, ph: t.eventPh, type: "text" },
    { key: "time" as const, label: t.time, ph: t.timePh, type: "text" },
    { key: "date" as const, label: t.date, ph: t.datePh, type: "date" },
    { key: "address" as const, label: t.address, ph: t.addressPh, type: "text" },
    { key: "contact" as const, label: t.contact, ph: t.contactPh, type: "text" },
  ]

  return (
    <div>
      <button type="button" onClick={onBack} className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#4880FF] hover:text-[#3B6EE8]">
        <ArrowLeft size={16} />{t.back}
      </button>
      <div className="w-full rounded-[14px] border border-[#B9B9B9]/20 bg-white px-5 py-10 shadow-sm dark:border-[#313D4F] dark:bg-[#273142] sm:px-12 md:px-[100px] md:py-[60px] lg:px-[180px]">
        <form onSubmit={submit}>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={upload} />
          <button type="button" onClick={() => fileRef.current?.click()} className="mx-auto mb-3 flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full bg-[#ECECEE] transition-transform hover:scale-105 dark:bg-[#E2E8F0]">
            {form.image ? <img src={form.image} alt="" className="h-full w-full object-cover" /> : <Camera size={28} className="text-[#202224]" />}
          </button>
          <button type="button" onClick={() => fileRef.current?.click()} className="mx-auto mb-10 block text-center text-[14px] font-bold text-[#4880FF] hover:underline">{t.upload}</button>

          <div className="mx-auto mb-[45px] grid max-w-[780px] grid-cols-1 gap-x-[30px] gap-y-7 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.key} className="block">
                <span className="mb-[10px] block text-[14px] font-semibold text-[#606060] dark:text-gray-300">{field.label}</span>
                <input type={field.type} value={form[field.key]} onChange={(event) => update(field.key, event.target.value)} placeholder={field.ph} className={fieldClass} />
              </label>
            ))}
          </div>

          {error && <p className="mb-5 text-center text-sm font-semibold text-[#F93C65]">{error}</p>}
          <button type="submit" className="mx-auto block h-[56px] w-full max-w-[274px] rounded-[12px] bg-[#4880FF] text-[18px] font-bold text-white transition-all hover:bg-[#3B6EE8] hover:shadow-lg">{t.addNow}</button>
        </form>
      </div>
    </div>
  )
}

export default function Calendar() {
  const { language } = useLanguage()

  // LanguageContext stores the selected language as "English", "French",
  // or "Spanish". Normalize it here because the calendar dictionaries
  // use the locale keys en / fr / es.
  const lang: keyof typeof copy =
    String(language).toLowerCase().startsWith("fr") || String(language).toLowerCase() === "french"
      ? "fr"
      : String(language).toLowerCase().startsWith("es") || String(language).toLowerCase() === "spanish"
        ? "es"
        : "en"

  const t = copy[lang]

  const [adding, setAdding] = useState(false)
  const [view, setView] = useState<ViewMode>("month")
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<CalendarEvent | null>(null)
  const [focusedDate, setFocusedDate] = useState(new Date(2019, 9, 1))

  const focusedYear = focusedDate.getFullYear()
  const focusedMonth = focusedDate.getMonth()
  const weekStart = addDays(focusedDate, -mondayIndex(focusedDate))

  const displayedTitle = useMemo(() => {
    if (view === "day") return formatLongDate(focusedDate, lang)
    if (view === "week") {
      const weekEnd = addDays(weekStart, 6)
      const startLabel = new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : "en-US", { month: "short", day: "numeric" }).format(weekStart)
      const endLabel = new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : "en-US", { month: "short", day: "numeric", year: "numeric" }).format(weekEnd)
      return `${startLabel} – ${endLabel}`
    }
    return `${monthNames[lang][focusedMonth]} ${focusedYear}`
  }, [view, focusedDate, weekStart, lang, focusedMonth, focusedYear])

  const navigate = (amount: number) => {
    setSelected(null)
    if (view === "day") setFocusedDate(addDays(focusedDate, amount))
    else if (view === "week") setFocusedDate(addDays(focusedDate, amount * 7))
    else setFocusedDate(new Date(focusedYear, focusedMonth + amount, 1))
  }

  const handleToday = () => {
    setSelected(null)
    // Keep the Figma reference date so the supplied 2019 events remain visible.
    setFocusedDate(new Date(2019, 9, 3))
  }

  const selectEvent = (event: CalendarEvent) => {
    setSelected(event)
    setFocusedDate(parseDateKey(event.date))
  }

  const addEvent = (event: CalendarEvent) => {
    setEvents((previous) => [...previous, event])
    setFocusedDate(parseDateKey(event.date))
    setSelected(null)
    setAdding(false)
    setView("month")
  }

  return (
    <DashboardLayout>
      <div className="w-full">
        <h1 className="mb-6 font-sans text-[24px] font-bold leading-none tracking-[-.11px] text-[#202224] dark:text-white sm:text-[32px]">
          {adding ? t.addTitle : t.calendar}
        </h1>

        {adding ? (
          <AddEventForm onBack={() => setAdding(false)} onAdd={addEvent} t={t} />
        ) : (
          <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
            <EventFeed
              events={events}
              expanded={expanded}
              setExpanded={() => setExpanded((previous) => !previous)}
              onAdd={() => setAdding(true)}
              t={t}
            />

            <section className="min-w-0 flex-1 rounded-[14px] border border-[#B9B9B9]/20 bg-white p-4 shadow-sm dark:border-[#313D4F] dark:bg-[#273142] sm:p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <button type="button" onClick={handleToday} className="text-[14px] font-semibold text-[#202224]/60 transition-colors hover:text-[#4880FF] dark:text-gray-400">{t.today}</button>

                <div className="order-3 flex w-full items-center justify-center gap-3 sm:order-2 sm:w-auto">
                  <button type="button" onClick={() => navigate(-1)} className="rounded-full p-1 text-[#606060] transition-colors hover:bg-[#4880FF]/10 hover:text-[#4880FF] dark:text-gray-300" aria-label="Previous period"><ChevronLeft size={22} /></button>
                  <span className="text-center text-[18px] font-bold text-[#202224] dark:text-white sm:text-[24px]">{displayedTitle}</span>
                  <button type="button" onClick={() => navigate(1)} className="rounded-full p-1 text-[#606060] transition-colors hover:bg-[#4880FF]/10 hover:text-[#4880FF] dark:text-gray-300" aria-label="Next period"><ChevronRight size={22} /></button>
                </div>

                <div className="order-2 inline-flex overflow-hidden rounded-[10px] border border-[#D5D5D5] bg-[#FAFBFD] divide-x divide-[#D5D5D5] dark:border-[#4B5668] dark:bg-[#323D4E] dark:divide-[#4B5668] sm:order-3">
                  {([ ["day", t.day], ["week", t.week], ["month", t.month] ] as const).map(([value, label]) => (
                    <button key={value} type="button" onClick={() => { setSelected(null); setView(value) }} className={`h-9 px-4 text-[12px] font-semibold transition-colors ${view === value ? "bg-[#4880FF] font-bold text-white" : "text-[#202224] hover:bg-[#4880FF]/10 dark:text-white"}`}>{label}</button>
                  ))}
                </div>
              </div>

              {view === "month" && <MonthView year={focusedYear} month={focusedMonth} events={events} selectedId={selected?.id ?? null} onSelect={selectEvent} lang={lang} />}
              {view === "week" && <WeekView weekStart={weekStart} events={events} selectedId={selected?.id ?? null} onSelect={selectEvent} lang={lang} />}
              {view === "day" && <DayView date={focusedDate} events={events} selectedId={selected?.id ?? null} onSelect={selectEvent} />}
            </section>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
