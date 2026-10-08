import { useEffect, useRef, useState } from "react"
import type { ChangeEvent } from "react"
import { Camera, Check, Upload } from "lucide-react"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"


type Locale = "en" | "fr" | "es"

interface SettingsData {
  siteName: string
  copyRight: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  logo: string
}

const STORAGE_KEY = "dashstack-general-settings"

const DEFAULT_SETTINGS: SettingsData = {
  siteName: "Bright Web",
  copyRight: "All rights Reserved@brightweb",
  seoTitle: "Bright web is a hybrid dashboard",
  seoDescription: "Bright web is a hybrid dashboard",
  seoKeywords: "CEO",
  logo: "",
}

const COPY: Record<Locale, Record<string, string>> = {
  en: {
    heading: "General Settings",
    uploadLogo: "Upload Logo",
    editLogo: "Edit Logo",
    siteName: "Site Name",
    copyRight: "Copy Right",
    seoTitle: "SEO Title",
    seoDescription: "SEO Description",
    seoKeywords: "SEO Keywords",
    save: "Save",
    saved: "Settings saved successfully",
    chooseLogo: "Choose logo",
  },
  fr: {
    heading: "Paramètres généraux",
    uploadLogo: "Télécharger le logo",
    editLogo: "Modifier le logo",
    siteName: "Nom du site",
    copyRight: "Droits d'auteur",
    seoTitle: "Titre SEO",
    seoDescription: "Description SEO",
    seoKeywords: "Mots-clés SEO",
    save: "Enregistrer",
    saved: "Paramètres enregistrés avec succès",
    chooseLogo: "Choisir le logo",
  },
  es: {
    heading: "Configuración general",
    uploadLogo: "Subir logotipo",
    editLogo: "Editar logotipo",
    siteName: "Nombre del sitio",
    copyRight: "Derechos de autor",
    seoTitle: "Título SEO",
    seoDescription: "Descripción SEO",
    seoKeywords: "Palabras clave SEO",
    save: "Guardar",
    saved: "Configuración guardada correctamente",
    chooseLogo: "Elegir logotipo",
  },
}

function getLocale(language: unknown): Locale {
  const value = String(language).toLowerCase()

  if (value.startsWith("fr") || value === "french") return "fr"
  if (value.startsWith("es") || value === "spanish") return "es"
  return "en"
}

function readSettings(): SettingsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS

    const parsed = JSON.parse(raw) as Partial<SettingsData>

    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export default function Settings() {
  const { language } = useLanguage()
  const locale = getLocale(language)
  const t = COPY[locale]

  const [settings, setSettings] = useState<SettingsData>(readSettings)
  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!saved) return

    const timer = window.setTimeout(() => setSaved(false), 2500)
    return () => window.clearTimeout(timer)
  }, [saved])

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) return

    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result
      if (typeof result !== "string") return

      setSettings((current) => ({
        ...current,
        logo: result,
      }))
    }

    reader.readAsDataURL(file)
    event.target.value = ""
  }

  const updateField = (field: keyof Omit<SettingsData, "logo">, value: string) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    setSaved(true)
  }

  return (
    <DashboardLayout>
      <section className="w-full">
        <h1 className="mb-[28px] font-sans text-[24px] font-bold leading-none tracking-[-0.11px] text-[#202224] dark:text-white sm:text-[32px]">
          {t.heading}
        </h1>

        <div className="mb-10 w-full rounded-[14px] border border-[#B9B9B9]/20 bg-white px-5 py-10 shadow-sm dark:border-[#313D4F] dark:bg-[#273142] sm:px-12 md:px-[60px] lg:px-[100px]">
          {/* Logo */}
          <div className="mb-[45px] flex flex-col items-center justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={openFilePicker}
              aria-label={settings.logo ? t.editLogo : t.uploadLogo}
              className="group relative mb-3 h-[80px] w-[80px] overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-[#4880FF]/40 focus:ring-offset-2 dark:focus:ring-offset-[#273142]"
            >
              {settings.logo ? (
                <img
                  src={settings.logo}
                  alt={t.editLogo}
                  className="h-full w-full cursor-pointer rounded-full object-cover ring-2 ring-[#4880FF]/30 transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <span className="flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#ECECEE] transition-transform duration-200 group-hover:scale-105 dark:bg-[#E2E8F0]">
                  <Camera
                    size={24}
                    strokeWidth={2.8}
                    className="text-[#202224]"
                    fill="currentColor"
                  />
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={openFilePicker}
              className="flex cursor-pointer items-center gap-1 font-sans text-[14px] font-bold text-[#4880FF] transition-colors hover:underline"
            >
              {settings.logo ? <Upload size={14} /> : null}
              {settings.logo ? t.editLogo : t.uploadLogo}
            </button>
          </div>

          {/* Form */}
          <div className="mx-auto grid w-full max-w-[770px] grid-cols-1 gap-x-[60px] gap-y-[56px] md:grid-cols-2">
            <Field
              label={t.siteName}
              value={settings.siteName}
              onChange={(value) => updateField("siteName", value)}
            />

            <Field
              label={t.copyRight}
              value={settings.copyRight}
              onChange={(value) => updateField("copyRight", value)}
            />

            <Field
              label={t.seoTitle}
              value={settings.seoTitle}
              onChange={(value) => updateField("seoTitle", value)}
            />

            <TextAreaField
              label={t.seoDescription}
              value={settings.seoDescription}
              onChange={(value) => updateField("seoDescription", value)}
            />

            <Field
              label={t.seoKeywords}
              value={settings.seoKeywords}
              onChange={(value) => updateField("seoKeywords", value)}
            />
          </div>

          {/* Save */}
          <div className="mt-14 flex flex-col items-center">
            <button
              type="button"
              onClick={handleSave}
              className="flex h-[55px] w-full max-w-[271px] items-center justify-center gap-2 rounded-[6px] bg-[#4880FF] px-6 text-[16px] font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#3B6EE8] hover:shadow-md active:scale-[0.98]"
            >
              {saved ? <Check size={18} strokeWidth={3} /> : null}
              {saved ? t.saved : t.save}
            </button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function Field({ label, value, onChange }: FieldProps) {
  return (
    <label className="block w-full">
      <span className="mb-[10px] block font-sans text-[14px] font-semibold text-[#606060] dark:text-[#CBD5E1]">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[52px] w-full rounded-[4px] border border-[#D5D5D5] bg-[#F5F6FA] px-4 font-sans text-[14px] font-semibold text-[#202224] outline-none transition-colors placeholder:text-[#A6A6A6] focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"
      />
    </label>
  )
}

function TextAreaField({ label, value, onChange }: FieldProps) {
  return (
    <label className="block w-full">
      <span className="mb-[10px] block font-sans text-[14px] font-semibold text-[#606060] dark:text-[#CBD5E1]">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[186px] w-full resize-none rounded-[4px] border border-[#D5D5D5] bg-[#F5F6FA] px-4 py-4 font-sans text-[14px] font-semibold leading-6 text-[#202224] outline-none transition-colors placeholder:text-[#A6A6A6] focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"
      />
    </label>
  )
}
