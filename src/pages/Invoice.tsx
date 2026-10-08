import { useMemo, useState } from "react"
import { Printer, Send } from "lucide-react"
import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"

type Locale = "en" | "fr" | "es"

interface InvoiceItem {
  serial: number
  description: string
  quantity: number
  baseCost: number
  totalCost: number
}

const items: InvoiceItem[] = [
  { serial: 1, description: "Children Toy", quantity: 2, baseCost: 20, totalCost: 80 },
  { serial: 2, description: "Makeup", quantity: 2, baseCost: 50, totalCost: 100 },
  { serial: 3, description: "Asus Laptop", quantity: 5, baseCost: 100, totalCost: 500 },
  { serial: 4, description: "Iphone X", quantity: 4, baseCost: 1000, totalCost: 4000 },
]

const copy = {
  en: { invoice: "Invoice", from: "Invoice From :", to: "Invoice To :", invoiceDate: "Invoice Date :", dueDate: "Due Date :", serial: "Serial No.", description: "Description", quantity: "Quantity", baseCost: "Base Cost", totalCost: "Total Cost", total: "Total", send: "Send", print: "Print invoice", sent: "Invoice sent successfully." },
  fr: { invoice: "Facture", from: "Facture de :", to: "Facture à :", invoiceDate: "Date de facture :", dueDate: "Date d’échéance :", serial: "N° de série", description: "Description", quantity: "Quantité", baseCost: "Coût unitaire", totalCost: "Coût total", total: "Total", send: "Envoyer", print: "Imprimer la facture", sent: "Facture envoyée avec succès." },
  es: { invoice: "Factura", from: "Factura de :", to: "Factura a :", invoiceDate: "Fecha de factura :", dueDate: "Fecha de vencimiento :", serial: "N.º de serie", description: "Descripción", quantity: "Cantidad", baseCost: "Coste base", totalCost: "Coste total", total: "Total", send: "Enviar", print: "Imprimir factura", sent: "Factura enviada correctamente." },
} as const

function getLocale(language: unknown): Locale {
  const value = String(language ?? "").trim().toLowerCase()
  if (value === "fr" || value === "fr-fr" || value === "french" || value.startsWith("fran") || value.startsWith("français")) return "fr"
  if (value === "es" || value === "es-es" || value === "spanish" || value.startsWith("span") || value.startsWith("españ")) return "es"
  return "en"
}

const money = (value: number) => `$${value}`

export default function Invoice() {
  const { language } = useLanguage()
  const t = copy[getLocale(language)]
  const [sent, setSent] = useState(false)
  const total = useMemo(() => items.reduce((sum, item) => sum + item.totalCost, 0), [])

  const handleSend = () => {
    setSent(true)
    window.setTimeout(() => setSent(false), 2500)
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1600px] print:max-w-none">
        <h1 className="mb-6 font-sans text-[24px] font-bold leading-none tracking-[-0.11px] text-[#202224] sm:text-[32px] dark:text-white print:hidden">
          {t.invoice}
        </h1>

        <section
          id="invoice-print-area"
          className="w-full rounded-[14px] border border-[#B9B9B9]/20 bg-white p-6 shadow-sm dark:border-[#313D4F] dark:bg-[#273142] sm:p-10 md:p-[45px] print:m-0 print:block print:w-full print:rounded-none print:border-none print:bg-white print:p-0 print:text-black print:shadow-none"
        >
          <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4 print:mb-8">
            <div>
              <p className="mb-3 font-semibold text-[14px] text-[#202224]/60 dark:text-gray-400 print:text-black">{t.from}</p>
              <p className="mb-1.5 font-bold text-[16px] text-[#202224] dark:text-white print:text-black">Virginia Walker</p>
              <p className="font-semibold text-[14px] text-[#202224]/60 dark:text-gray-400 print:text-black">9694 Krajcik Locks Suite 635</p>
            </div>
            <div>
              <p className="mb-3 font-semibold text-[14px] text-[#202224]/60 dark:text-gray-400 print:text-black">{t.to}</p>
              <p className="mb-1.5 font-bold text-[16px] text-[#202224] dark:text-white print:text-black">Austin Miller</p>
              <p className="font-semibold text-[14px] text-[#202224]/60 dark:text-gray-400 print:text-black">Brookview</p>
            </div>
            <div>
              <p className="mb-3 font-semibold text-[14px] text-[#202224] dark:text-white print:text-black">{t.invoiceDate} 12 Nov 2019</p>
              <p className="font-semibold text-[14px] text-[#202224] dark:text-white print:text-black">{t.dueDate} 25 Dec 2019</p>
            </div>
          </div>

          <div className="overflow-x-auto print:overflow-visible">
            <table className="w-full min-w-[600px] border-collapse text-left print:min-w-0">
              <thead>
                <tr className="h-[50px] bg-[#F1F4F9] text-[14px] font-bold text-[#202224] dark:bg-[#323D4E] dark:text-white print:bg-gray-100 print:text-black">
                  <th className="w-[15%] rounded-l-[10px] px-4 text-center">{t.serial}</th>
                  <th className="w-[35%] px-4">{t.description}</th>
                  <th className="w-[15%] px-4 text-center">{t.quantity}</th>
                  <th className="w-[17.5%] px-4 text-center">{t.baseCost}</th>
                  <th className="w-[17.5%] rounded-r-[10px] px-4 text-center">{t.totalCost}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.serial} className="h-[60px] border-b border-[#E0E0E0]/60 text-[14px] font-semibold text-[#202224] transition-colors hover:bg-[#F8F9FC] dark:border-[#313D4F] dark:text-gray-200 dark:hover:bg-[#323D4E] print:border-gray-200 print:text-black print:hover:bg-transparent">
                    <td className="px-4 text-center">{item.serial}</td>
                    <td className="px-4">{item.description}</td>
                    <td className="px-4 text-center">{item.quantity}</td>
                    <td className="px-4 text-center">{money(item.baseCost)}</td>
                    <td className="px-4 text-center">{money(item.totalCost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-[30px] flex justify-end px-4">
            <p className="font-bold text-[18px] tracking-wide text-[#202224] dark:text-white print:text-black">
              {t.total}<span className="mx-5">=</span>{money(total)}
            </p>
          </div>

          <div className="mt-[40px] flex items-center justify-end gap-[20px] print:hidden">
            <button type="button" onClick={() => window.print()} aria-label={t.print} title={t.print}
              className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-[10px] border border-[#D5D5D5] bg-[#FAFBFD] text-[#202224] transition-colors hover:bg-gray-100 dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white dark:hover:bg-[#273142]">
              <Printer className="h-5 w-5" strokeWidth={2} />
            </button>
            <button type="button" onClick={handleSend}
              className="inline-flex h-[50px] cursor-pointer items-center overflow-hidden rounded-[10px] bg-[#4880FF] text-white shadow-md transition-colors hover:bg-[#3B6EE8]">
              <span className="flex h-full items-center justify-center px-8 text-[15px] font-bold">{t.send}</span>
              <span className="flex h-full w-[50px] items-center justify-center border-l border-white/30 bg-white/10">
                <Send className="h-5 w-5" strokeWidth={1.8} />
              </span>
            </button>
          </div>
        </section>

        {sent && (
          <div className="fixed bottom-5 right-5 z-50 rounded-[10px] bg-[#202224] px-4 py-3 text-sm font-semibold text-white shadow-xl dark:bg-white dark:text-[#202224] print:hidden">
            {t.sent}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
