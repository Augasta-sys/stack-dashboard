import { useMemo, useRef, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import {
  Camera,
  Check,
  Mail,
  X,
} from "lucide-react"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"

type Locale = "en" | "fr" | "es"

interface ContactItem {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dob: string
  gender: string
  image: string
}

const defaultContacts: ContactItem[] = [
  {
    id: "1",
    firstName: "Jason",
    lastName: "Price",
    email: "kuhlman.jermey@yahoo.com",
    phone: "",
    dob: "",
    gender: "",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    firstName: "Duane",
    lastName: "Dean",
    email: "rusty.botsford@wilfrid.io",
    phone: "",
    dob: "",
    gender: "",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    firstName: "Jonathan",
    lastName: "Barker",
    email: "cora_haley@quinn.biz",
    phone: "",
    dob: "",
    gender: "",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    firstName: "Rosie",
    lastName: "Glover",
    email: "lockman.marques@hotmail.com",
    phone: "",
    dob: "",
    gender: "",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    firstName: "Patrick",
    lastName: "Greer",
    email: "pearlie.eichmann@trevion.net",
    phone: "",
    dob: "",
    gender: "",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    firstName: "Darrell",
    lastName: "Ortega",
    email: "chaya.shields@ferry.info",
    phone: "",
    dob: "",
    gender: "",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=80",
  },
]

const fallbackImage =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&auto=format&fit=crop&q=80"

const copy = {
  en: {
    contact: "Contact",
    addTitle: "Add New Contact",
    addButton: "Add New Contact",
    upload: "Upload Photo",
    edit: "Edit Photo",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Your email",
    phone: "Phone Number",
    dob: "Date of Birth",
    gender: "Gender",
    firstPlaceholder: "Enter your first name",
    lastPlaceholder: "Enter your last name",
    emailPlaceholder: "Enter your email",
    phonePlaceholder: "Enter your phone number",
    dobPlaceholder: "Enter your birthdate",
    addNow: "Add Now",
    message: "Message",
    sendMessage: "Send Message",
    typeMessage: "Type your message...",
    cancel: "Cancel",
    sent: "Message sent successfully.",
    required: "This field is required.",
    letters: "Use letters and spaces only.",
    emailInvalid: "Enter a valid lowercase email address.",
    phoneInvalid: "Enter exactly 10 digits.",
    dobInvalid: "Enter a valid date of birth.",
    messageRequired: "Please enter a message.",
    male: "Male",
    female: "Female",
    other: "Other",
    messageTo: "Message to",
    delete: "Delete contact",
  },
  fr: {
    contact: "Contact",
    addTitle: "Ajouter un nouveau contact",
    addButton: "Ajouter un contact",
    upload: "Télécharger une photo",
    edit: "Modifier la photo",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Votre e-mail",
    phone: "Numéro de téléphone",
    dob: "Date de naissance",
    gender: "Genre",
    firstPlaceholder: "Entrez votre prénom",
    lastPlaceholder: "Entrez votre nom",
    emailPlaceholder: "Entrez votre e-mail",
    phonePlaceholder: "Entrez votre numéro",
    dobPlaceholder: "Entrez votre date de naissance",
    addNow: "Ajouter",
    message: "Message",
    sendMessage: "Envoyer le message",
    typeMessage: "Écrivez votre message...",
    cancel: "Annuler",
    sent: "Message envoyé avec succès.",
    required: "Ce champ est obligatoire.",
    letters: "Utilisez uniquement des lettres et des espaces.",
    emailInvalid: "Entrez une adresse e-mail valide en minuscules.",
    phoneInvalid: "Entrez exactement 10 chiffres.",
    dobInvalid: "Entrez une date de naissance valide.",
    messageRequired: "Veuillez saisir un message.",
    male: "Homme",
    female: "Femme",
    other: "Autre",
    messageTo: "Message à",
    delete: "Supprimer le contact",
  },
  es: {
    contact: "Contacto",
    addTitle: "Añadir nuevo contacto",
    addButton: "Añadir contacto",
    upload: "Subir foto",
    edit: "Editar foto",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Tu correo electrónico",
    phone: "Número de teléfono",
    dob: "Fecha de nacimiento",
    gender: "Género",
    firstPlaceholder: "Introduce tu nombre",
    lastPlaceholder: "Introduce tu apellido",
    emailPlaceholder: "Introduce tu correo",
    phonePlaceholder: "Introduce tu número",
    dobPlaceholder: "Introduce tu fecha de nacimiento",
    addNow: "Añadir ahora",
    message: "Mensaje",
    sendMessage: "Enviar mensaje",
    typeMessage: "Escribe tu mensaje...",
    cancel: "Cancelar",
    sent: "Mensaje enviado correctamente.",
    required: "Este campo es obligatorio.",
    letters: "Usa solo letras y espacios.",
    emailInvalid: "Introduce un correo válido en minúsculas.",
    phoneInvalid: "Introduce exactamente 10 dígitos.",
    dobInvalid: "Introduce una fecha de nacimiento válida.",
    messageRequired: "Escribe un mensaje.",
    male: "Hombre",
    female: "Mujer",
    other: "Otro",
    messageTo: "Mensaje para",
    delete: "Eliminar contacto",
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

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "male",
}

type FormErrors = Partial<Record<keyof typeof emptyForm, string>>

export default function Contact() {
  const { language } = useLanguage()
  const lang = getLocale(language)
  const t = copy[lang]

  const [contacts, setContacts] = useState<ContactItem[]>(defaultContacts)
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [photo, setPhoto] = useState("")
  const [messageContact, setMessageContact] = useState<ContactItem | null>(null)
  const [messageText, setMessageText] = useState("")
  const [toast, setToast] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fullMessageName = useMemo(
    () =>
      messageContact
        ? `${messageContact.firstName} ${messageContact.lastName}`
        : "",
    [messageContact],
  )

  const openAddContact = () => {
    setForm(emptyForm)
    setErrors({})
    setPhoto("")
    setIsAddingContact(true)
  }

  const closeAddContact = () => {
    setIsAddingContact(false)
    setForm(emptyForm)
    setErrors({})
    setPhoto("")
  }

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") setPhoto(reader.result)
    }
    reader.readAsDataURL(file)

    event.target.value = ""
  }

  const updateField = (field: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: "" }))
  }

  const handleNameChange = (
    field: "firstName" | "lastName",
    value: string,
  ) => {
    const lettersOnly = value.replace(/[^A-Za-z\s]/g, "")
    updateField(field, lettersOnly)
  }

  const handleEmailChange = (value: string) => {
    updateField("email", value.toLowerCase())
  }

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10)
    updateField("phone", digits)
  }

  const validate = () => {
    const next: FormErrors = {}
    const letters = /^[A-Za-z\s]+$/
    const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

    if (!form.firstName.trim()) next.firstName = t.required
    else if (!letters.test(form.firstName.trim())) next.firstName = t.letters

    if (!form.lastName.trim()) next.lastName = t.required
    else if (!letters.test(form.lastName.trim())) next.lastName = t.letters

    if (!form.email.trim()) next.email = t.required
    else if (!email.test(form.email)) next.email = t.emailInvalid

    if (!form.phone) next.phone = t.required
    else if (form.phone.length !== 10) next.phone = t.phoneInvalid

    if (!form.dob) next.dob = t.required
    else {
      const date = new Date(`${form.dob}T00:00:00`)
      if (Number.isNaN(date.getTime())) next.dob = t.dobInvalid
    }

    if (!form.gender) next.gender = t.required

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validate()) return

    const contact: ContactItem = {
      id: `contact-${Date.now()}`,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      gender: form.gender,
      image: photo || fallbackImage,
    }

    setContacts((current) => [...current, contact])
    closeAddContact()
  }

  const deleteContact = (id: string) => {
    setContacts((current) => current.filter((contact) => contact.id !== id))
  }

  const sendMessage = () => {
    if (!messageText.trim()) return

    setToast(t.sent)
    setMessageText("")
    setMessageContact(null)

    window.setTimeout(() => setToast(""), 2500)
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {isAddingContact && (
              <button
                type="button"
                onClick={closeAddContact}
                aria-label={t.contact}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D5D5D5] text-[#202224] transition hover:border-[#4880FF] hover:text-[#4880FF] dark:border-[#4B5668] dark:text-white"
              >
                ←
              </button>
            )}
            <h1 className="font-sans text-[24px] font-bold leading-none tracking-[-0.11px] text-[#202224] sm:text-[32px] dark:text-white">
              {isAddingContact ? t.addTitle : t.contact}
            </h1>
          </div>

          {!isAddingContact && (
            <button
              type="button"
              onClick={openAddContact}
              className="h-12 w-full rounded-[6px] bg-[#4880FF] px-6 text-[14px] font-bold text-white transition-all hover:bg-[#3B6EE8] hover:shadow-md active:scale-[0.98] sm:w-auto"
            >
              {t.addButton}
            </button>
          )}
        </div>

        {!isAddingContact ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-[30px] xl:grid-cols-3">
            {contacts.map((contact) => (
              <article
                key={contact.id}
                className="group relative flex overflow-hidden rounded-[18px] border border-[#B9B9B9]/20 bg-white shadow-[6px_6px_54px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-[#313D4F] dark:bg-[#273142]"
              >
                <button
                  type="button"
                  onClick={() => deleteContact(contact.id)}
                  aria-label={t.delete}
                  title={t.delete}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#777] shadow-sm backdrop-blur-sm transition-all hover:border-[#EF3826] hover:bg-[#EF3826] hover:text-white dark:border-[#4B5668] dark:bg-[#273142]/90 dark:text-gray-300 dark:hover:border-[#EF3826] dark:hover:bg-[#EF3826] dark:hover:text-white"
                >
                  <X className="h-4 w-4" strokeWidth={1.8} />
                </button>

                <div className="flex w-full flex-col">
                  <div className="h-[210px] w-full overflow-hidden bg-gray-100 sm:h-[235px] dark:bg-[#323D4E]">
                    <img
                      src={contact.image}
                      alt={`${contact.firstName} ${contact.lastName}`}
                      className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex min-h-[136px] flex-1 flex-col items-center justify-between p-6 text-center">
                    <div className="min-w-0 w-full">
                      <h2 className="mb-1 font-sans text-[18px] font-bold text-[#202224] dark:text-white">
                        {contact.firstName} {contact.lastName}
                      </h2>
                      <p className="mb-5 break-all font-sans text-[14px] text-[#202224]/60 dark:text-gray-400">
                        {contact.email}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setMessageContact(contact)}
                        className="inline-flex h-[38px] items-center justify-center gap-2.5 rounded-[8px] border border-[#D5D5D5] bg-transparent px-5 text-[13px] font-semibold text-[#202224]/75 transition-all hover:border-[#4880FF] hover:bg-[#4880FF] hover:text-white dark:border-[#4B5668] dark:text-gray-200"
                      >
                        <Mail className="h-[15px] w-[15px]" strokeWidth={1.8} />
                        {t.message}
                      </button>

                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="w-full rounded-[14px] border border-[#B9B9B9]/20 bg-white px-5 py-10 shadow-sm dark:border-[#313D4F] dark:bg-[#273142] sm:px-12 md:px-[100px] md:py-[60px] lg:px-[180px]">
            <form onSubmit={submitContact}>
              <div className="mb-10 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`group mx-auto mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full transition-transform hover:scale-105 ${
                    photo
                      ? "ring-2 ring-[#4880FF]/30"
                      : "bg-[#ECECEE] dark:bg-[#E2E8F0]"
                  }`}
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera
                      className="h-7 w-7 text-[#202224]"
                      strokeWidth={2.5}
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="block mx-auto text-center text-[14px] font-bold text-[#4880FF] hover:underline"
                >
                  {photo ? t.edit : t.upload}
                </button>
              </div>

              <div className="mx-auto mb-12 grid max-w-[780px] grid-cols-1 gap-x-[30px] gap-y-7 md:grid-cols-2">
                <Field
                  label={t.firstName}
                  value={form.firstName}
                  placeholder={t.firstPlaceholder}
                  error={errors.firstName}
                  onChange={(value) => handleNameChange("firstName", value)}
                />

                <Field
                  label={t.lastName}
                  value={form.lastName}
                  placeholder={t.lastPlaceholder}
                  error={errors.lastName}
                  onChange={(value) => handleNameChange("lastName", value)}
                />

                <Field
                  label={t.email}
                  value={form.email}
                  placeholder={t.emailPlaceholder}
                  error={errors.email}
                  type="email"
                  onChange={handleEmailChange}
                />

                <Field
                  label={t.phone}
                  value={form.phone}
                  placeholder={t.phonePlaceholder}
                  error={errors.phone}
                  inputMode="numeric"
                  onChange={handlePhoneChange}
                />

                <div>
                  <label className="mb-[10px] block text-[14px] font-semibold text-[#606060] dark:text-gray-300">
                    {t.dob}
                  </label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(event) => updateField("dob", event.target.value)}
                    className="h-[52px] w-full rounded-[8px] border border-[#D5D5D5] bg-[#F5F6FA] px-4 text-[14px] font-semibold text-[#202224] outline-none transition-colors focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"
                  />
                  {errors.dob && (
                    <p className="mt-1.5 text-xs font-semibold text-[#EF3826]">
                      {errors.dob}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-[10px] block text-[14px] font-semibold text-[#606060] dark:text-gray-300">
                    {t.gender}
                  </label>
                  <select
                    value={form.gender}
                    onChange={(event) =>
                      updateField("gender", event.target.value)
                    }
                    className="h-[52px] w-full rounded-[8px] border border-[#D5D5D5] bg-[#F5F6FA] px-4 text-[14px] font-semibold text-[#202224] outline-none transition-colors focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white sm:w-[180px]"
                  >
                    <option value="male">{t.male}</option>
                    <option value="female">{t.female}</option>
                    <option value="other">{t.other}</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1.5 text-xs font-semibold text-[#EF3826]">
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mx-auto block h-14 w-full max-w-[274px] rounded-[12px] bg-[#4880FF] text-[18px] font-bold text-white transition-all hover:bg-[#3B6EE8] hover:shadow-lg active:scale-[0.99]"
              >
                {t.addNow}
              </button>
            </form>
          </div>
        )}

        {messageContact && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setMessageContact(null)
            }}
          >
            <div className="w-full max-w-[480px] rounded-[16px] bg-white p-6 shadow-2xl dark:bg-[#273142] sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={messageContact.image}
                    alt=""
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <h2 className="truncate text-[17px] font-bold text-[#202224] dark:text-white">
                      {t.messageTo} {fullMessageName}
                    </h2>
                    <p className="truncate text-xs text-[#777] dark:text-gray-400">
                      {messageContact.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMessageContact(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#777] transition hover:bg-black/5 hover:text-[#EF3826] dark:text-gray-300 dark:hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <textarea
                autoFocus
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                placeholder={t.typeMessage}
                className="min-h-[130px] w-full resize-none rounded-[10px] border border-[#D5D5D5] bg-[#F5F6FA] p-4 text-sm text-[#202224] outline-none focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"
              />

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setMessageContact(null)}
                  className="h-11 rounded-[8px] border border-[#D5D5D5] px-5 text-sm font-semibold text-[#555] transition hover:bg-[#F5F6FA] dark:border-[#4B5668] dark:text-gray-200 dark:hover:bg-[#323D4E]"
                >
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                  className="h-11 rounded-[8px] bg-[#4880FF] px-6 text-sm font-bold text-white transition hover:bg-[#3B6EE8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.sendMessage}
                </button>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className="fixed bottom-5 right-5 z-[120] flex max-w-[calc(100vw-40px)] items-center gap-2 rounded-[10px] bg-[#202224] px-4 py-3 text-sm font-semibold text-white shadow-xl dark:bg-white dark:text-[#202224]">
            <Check className="h-4 w-4 text-[#00B69B]" />
            {toast}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

interface FieldProps {
  label: string
  value: string
  placeholder: string
  error?: string
  type?: string
  inputMode?: "text" | "numeric" | "email" | "tel"
  onChange: (value: string) => void
}

function Field({
  label,
  value,
  placeholder,
  error,
  type = "text",
  inputMode = "text",
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        className={`mb-[10px] block text-[14px] font-semibold transition-colors ${
          value
            ? "text-[#A6A6A6] dark:text-gray-400"
            : "text-[#606060] dark:text-gray-300"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        className={`h-[52px] w-full rounded-[8px] border bg-[#F5F6FA] px-4 text-[14px] font-semibold text-[#202224] outline-none transition-colors placeholder:font-normal placeholder:text-[#A6A6A6] focus:border-[#4880FF] dark:bg-[#323D4E] dark:text-white dark:placeholder:text-[#A6A6A6] ${
          error
            ? "border-[#EF3826]"
            : "border-[#D5D5D5] dark:border-[#4B5668]"
        }`}
      />
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-[#EF3826]">{error}</p>
      )}
    </div>
  )
}
