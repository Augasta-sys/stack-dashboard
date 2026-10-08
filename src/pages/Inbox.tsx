import {
  Archive,
  Check,
  ChevronLeft,
  ChevronRight,
  File,
  Image as ImageIcon,
  Info,
  Mail,
  Paperclip,
  Pencil,
  Play,
  Plus,
  Printer,
  Search,
  Send,
  Square,
  Star,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"

/* =========================================================
   TYPES
========================================================= */

type MailFolder =
  | "inbox"
  | "starred"
  | "sent"
  | "draft"
  | "spam"
  | "important"
  | "bin"

type MailLabel = string | null

interface MailAttachment {
  id: string
  name: string
  type: string
  size: number
  url?: string
}

interface MailMessage {
  id: string
  sender: string
  senderEmail: string
  subject: string
  body: string
  time: string
  label: MailLabel
  starred: boolean
  folders: MailFolder[]
  selected?: boolean
  profileImage: string
  attachments?: MailAttachment[]
}

interface FolderCounts {
  inbox: number
  starred: number
  sent: number
  draft: number
  spam: number
  important: number
  bin: number
}

interface InboxTranslation {
  inbox: string
  myEmail: string
  starred: string
  sent: string
  draft: string
  spam: string
  important: string
  bin: string
  label: string
  primary: string
  social: string
  work: string
  friends: string
  createNewLabel: string
  compose: string
  searchMail: string
  archive: string
  markSpam: string
  delete: string
  noMessages: string
  noSearchResults: string
  showing: string
  of: string
  back: string
  print: string
  send: string
  saveAsDraft: string
  cancel: string
  to: string
  subject: string
  message: string
  selectLabel: string
  composeMail: string
  newLabel: string
  labelName: string
  create: string
  close: string
  invalidEmail: string
  requiredTo: string
  draftSaved: string
  mailSent: string
  labelCreated: string
  deleted: string
  movedToSpam: string
  movedToImportant: string
  attachment: string
  image: string
  recordVoice: string
  stopRecording: string
  recording: string
  remove: string
  noAttachment: string
}

/* =========================================================
   TRANSLATIONS
========================================================= */

const inboxTranslations: Record<
  "English" | "French" | "Spanish",
  InboxTranslation
> = {
  English: {
    inbox: "Inbox",
    myEmail: "My Email",
    starred: "Starred",
    sent: "Sent",
    draft: "Draft",
    spam: "Spam",
    important: "Important",
    bin: "Bin",
    label: "Label",
    primary: "Primary",
    social: "Social",
    work: "Work",
    friends: "Friends",
    createNewLabel: "Create New Label",
    compose: "Compose",
    searchMail: "Search mail",
    archive: "Important",
    markSpam: "Spam",
    delete: "Delete",
    noMessages: "No messages found",
    noSearchResults: "No messages match your search.",
    showing: "Showing",
    of: "of",
    back: "Back",
    print: "Print",
    send: "Send",
    saveAsDraft: "Save as Draft",
    cancel: "Cancel",
    to: "To",
    subject: "Subject",
    message: "Message",
    selectLabel: "Select label",
    composeMail: "Compose Mail",
    newLabel: "New Label",
    labelName: "Label name",
    create: "Create",
    close: "Close",
    invalidEmail: "Please enter a valid email address.",
    requiredTo: "Please enter a recipient email address.",
    draftSaved: "Draft saved",
    mailSent: "Mail sent",
    labelCreated: "Label created",
    deleted: "Message moved to Bin",
    movedToSpam: "Message moved to Spam",
    movedToImportant: "Message marked Important",
    attachment: "Attachment",
    image: "Image",
    recordVoice: "Record voice",
    stopRecording: "Stop recording",
    recording: "Recording...",
    remove: "Remove",
    noAttachment: "No attachment",
  },

  French: {
    inbox: "Boîte de réception",
    myEmail: "Mon Courriel",
    starred: "Favoris",
    sent: "Envoyés",
    draft: "Brouillons",
    spam: "Spam",
    important: "Important",
    bin: "Corbeille",
    label: "Étiquette",
    primary: "Principal",
    social: "Social",
    work: "Travail",
    friends: "Amis",
    createNewLabel: "Créer une nouvelle étiquette",
    compose: "Composer",
    searchMail: "Rechercher un courriel",
    archive: "Important",
    markSpam: "Spam",
    delete: "Supprimer",
    noMessages: "Aucun message trouvé",
    noSearchResults:
      "Aucun message ne correspond à votre recherche.",
    showing: "Affichage",
    of: "sur",
    back: "Retour",
    print: "Imprimer",
    send: "Envoyer",
    saveAsDraft: "Enregistrer comme brouillon",
    cancel: "Annuler",
    to: "À",
    subject: "Objet",
    message: "Message",
    selectLabel: "Sélectionner une étiquette",
    composeMail: "Nouveau courriel",
    newLabel: "Nouvelle étiquette",
    labelName: "Nom de l’étiquette",
    create: "Créer",
    close: "Fermer",
    invalidEmail: "Veuillez saisir une adresse e-mail valide.",
    requiredTo:
      "Veuillez saisir l'adresse e-mail du destinataire.",
    draftSaved: "Brouillon enregistré",
    mailSent: "Courriel envoyé",
    labelCreated: "Étiquette créée",
    deleted: "Message déplacé vers la corbeille",
    movedToSpam: "Message déplacé vers les spams",
    movedToImportant: "Message marqué comme important",
    attachment: "Pièce jointe",
    image: "Image",
    recordVoice: "Enregistrer la voix",
    stopRecording: "Arrêter l'enregistrement",
    recording: "Enregistrement...",
    remove: "Supprimer",
    noAttachment: "Aucune pièce jointe",
  },

  Spanish: {
    inbox: "Bandeja de entrada",
    myEmail: "Mi Correo",
    starred: "Destacados",
    sent: "Enviados",
    draft: "Borradores",
    spam: "Spam",
    important: "Importante",
    bin: "Papelera",
    label: "Etiqueta",
    primary: "Principal",
    social: "Social",
    work: "Trabajo",
    friends: "Amigos",
    createNewLabel: "Crear nueva etiqueta",
    compose: "Redactar",
    searchMail: "Buscar correo",
    archive: "Importante",
    markSpam: "Spam",
    delete: "Eliminar",
    noMessages: "No se encontraron mensajes",
    noSearchResults:
      "Ningún mensaje coincide con tu búsqueda.",
    showing: "Mostrando",
    of: "de",
    back: "Volver",
    print: "Imprimir",
    send: "Enviar",
    saveAsDraft: "Guardar como borrador",
    cancel: "Cancelar",
    to: "Para",
    subject: "Asunto",
    message: "Mensaje",
    selectLabel: "Seleccionar etiqueta",
    composeMail: "Redactar correo",
    newLabel: "Nueva etiqueta",
    labelName: "Nombre de etiqueta",
    create: "Crear",
    close: "Cerrar",
    invalidEmail:
      "Introduce una dirección de correo válida.",
    requiredTo:
      "Introduce la dirección de correo del destinatario.",
    draftSaved: "Borrador guardado",
    mailSent: "Correo enviado",
    labelCreated: "Etiqueta creada",
    deleted: "Mensaje movido a la papelera",
    movedToSpam: "Mensaje movido a spam",
    movedToImportant:
      "Mensaje marcado como importante",
    attachment: "Archivo adjunto",
    image: "Imagen",
    recordVoice: "Grabar voz",
    stopRecording: "Detener grabación",
    recording: "Grabando...",
    remove: "Eliminar",
    noAttachment: "Sin archivo adjunto",
  },
}

/* =========================================================
   PROFILE IMAGES
========================================================= */

const PROFILE_IMAGES = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
]

/* =========================================================
   STORAGE
========================================================= */

const STORAGE_MESSAGES = "dashstack-inbox-messages"
const STORAGE_LABELS = "dashstack-inbox-custom-labels"

/* =========================================================
   INITIAL 24 MESSAGES
========================================================= */

const INITIAL_MESSAGES: MailMessage[] = [
  {
    id: "1",
    sender: "Jullu Jalal",
    senderEmail: "jullu.jalal@example.com",
    subject:
      "Our Bachelor of Commerce program is ACBSP-accredited.",
    body:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    time: "8:38 AM",
    label: "Primary",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[0],
  },
  {
    id: "2",
    sender: "Minerva Barnett",
    senderEmail: "minerva.barnett@example.com",
    subject:
      "Get Best Advertiser In Your Side Pocket",
    body:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
    time: "8:13 AM",
    label: "Work",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[1],
  },
  {
    id: "3",
    sender: "Peter Lewis",
    senderEmail: "peter.lewis@example.com",
    subject: "Vacation Home Rental Success",
    body:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    time: "7:52 PM",
    label: "Friends",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[2],
  },
  {
    id: "4",
    sender: "Anthony Briggs",
    senderEmail: "anthony.briggs@example.com",
    subject:
      "Free Classifieds Using Them To Promote Your Stuff Online",
    body:
      "Free classified advertising can help businesses promote products and services online.",
    time: "7:52 PM",
    label: null,
    starred: true,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[3],
  },
  {
    id: "5",
    sender: "Clifford Morgan",
    senderEmail: "clifford.morgan@example.com",
    subject:
      "Enhance Your Brand Potential With Giant Advertising Blimps",
    body:
      "Enhance your brand potential with creative and memorable advertising campaigns.",
    time: "4:13 PM",
    label: "Social",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[0],
  },
  {
    id: "6",
    sender: "Cecilia Webster",
    senderEmail: "cecilia.webster@example.com",
    subject:
      "Always Look On The Bright Side Of Life",
    body:
      "Always look on the bright side of life and keep moving forward.",
    time: "3:52 PM",
    label: "Friends",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[2],
  },
  {
    id: "7",
    sender: "Harvey Manning",
    senderEmail: "harvey.manning@example.com",
    subject:
      "Curling Irons Are As Individual As The Women Who Use Them",
    body:
      "Every customer has different preferences and every product can offer something unique.",
    time: "2:30 PM",
    label: null,
    starred: true,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[1],
  },
  {
    id: "8",
    sender: "Willie Blake",
    senderEmail: "willie.blake@example.com",
    subject:
      "Our Bachelor of Commerce program is ACBSP-accredited.",
    body:
      "Learn more about our Bachelor of Commerce program and its accreditation.",
    time: "8:38 AM",
    label: "Primary",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[3],
  },
  {
    id: "9",
    sender: "Minerva Barnett",
    senderEmail: "minerva.barnett@example.com",
    subject:
      "Get Best Advertiser In Your Side Pocket",
    body:
      "Discover effective ways to advertise and reach your target audience.",
    time: "8:13 AM",
    label: "Work",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[1],
  },
  {
    id: "10",
    sender: "Fanny Weaver",
    senderEmail: "fanny.weaver@example.com",
    subject:
      "Free Classifieds Using Them To Promote Your Stuff Online",
    body:
      "Free classified advertising can help your products reach a wider audience.",
    time: "7:52 PM",
    label: null,
    starred: true,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[0],
  },
  {
    id: "11",
    sender: "Olga Hogan",
    senderEmail: "olga.hogan@example.com",
    subject:
      "Enhance Your Brand Potential With Giant Advertising Blimps",
    body:
      "Creative advertising can help your brand stand out from the competition.",
    time: "4:13 PM",
    label: "Social",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[2],
  },
  {
    id: "12",
    sender: "Lora Houston",
    senderEmail: "lora.houston@example.com",
    subject: "Vacation Home Rental Success",
    body:
      "Discover helpful information for successful vacation home rentals.",
    time: "7:52 PM",
    label: "Friends",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[3],
  },
  {
    id: "13",
    sender: "Jullu Jalal",
    senderEmail: "jullu.jalal@example.com",
    subject:
      "ACBSP Accredited Commerce Program Information",
    body:
      "Additional information about the commerce program.",
    time: "11:20 AM",
    label: "Primary",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[0],
  },
  {
    id: "14",
    sender: "Minerva Barnett",
    senderEmail: "minerva.barnett@example.com",
    subject: "Advertiser Pocket Guide",
    body:
      "Here is your advertiser pocket guide.",
    time: "10:45 AM",
    label: "Work",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[1],
  },
  {
    id: "15",
    sender: "Peter Lewis",
    senderEmail: "peter.lewis@example.com",
    subject:
      "New Vacation Home Rental Opportunities",
    body:
      "Here are some new vacation rental opportunities.",
    time: "10:12 AM",
    label: "Friends",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[2],
  },
  {
    id: "16",
    sender: "Anthony Briggs",
    senderEmail: "anthony.briggs@example.com",
    subject: "Online Classified Promotion",
    body:
      "Your online classified promotion details.",
    time: "9:52 AM",
    label: null,
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[3],
  },
  {
    id: "17",
    sender: "Clifford Morgan",
    senderEmail: "clifford.morgan@example.com",
    subject: "Improve Your Brand Potential",
    body:
      "Tips to improve your brand potential.",
    time: "9:13 AM",
    label: "Social",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[0],
  },
  {
    id: "18",
    sender: "Cecilia Webster",
    senderEmail: "cecilia.webster@example.com",
    subject: "A Brighter Side Of Life",
    body:
      "Some thoughts about staying positive.",
    time: "8:45 AM",
    label: "Friends",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[2],
  },
  {
    id: "19",
    sender: "Harvey Manning",
    senderEmail: "harvey.manning@example.com",
    subject: "Curling Iron Product Information",
    body:
      "Product information and recommendations.",
    time: "8:20 AM",
    label: null,
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[1],
  },
  {
    id: "20",
    sender: "Willie Blake",
    senderEmail: "willie.blake@example.com",
    subject: "Commerce Program Update",
    body:
      "Latest commerce program updates.",
    time: "7:58 AM",
    label: "Primary",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[3],
  },
  {
    id: "21",
    sender: "Minerva Barnett",
    senderEmail: "minerva.barnett@example.com",
    subject: "Advertiser Side Pocket Update",
    body:
      "Your advertiser update is ready.",
    time: "7:40 AM",
    label: "Work",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[1],
  },
  {
    id: "22",
    sender: "Fanny Weaver",
    senderEmail: "fanny.weaver@example.com",
    subject: "Promote Your Products Online",
    body:
      "Promotional opportunities are available.",
    time: "7:15 AM",
    label: null,
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[0],
  },
  {
    id: "23",
    sender: "Olga Hogan",
    senderEmail: "olga.hogan@example.com",
    subject: "Giant Advertising Blimps",
    body:
      "Advertising campaign details.",
    time: "6:50 AM",
    label: "Social",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[2],
  },
  {
    id: "24",
    sender: "Lora Houston",
    senderEmail: "lora.houston@example.com",
    subject: "Vacation Rental Success Tips",
    body:
      "Helpful vacation rental information.",
    time: "6:25 AM",
    label: "Friends",
    starred: false,
    folders: ["inbox"],
    profileImage: PROFILE_IMAGES[3],
  },
]

/* =========================================================
   HELPERS
========================================================= */

function loadMessages(): MailMessage[] {
  try {
    const saved =
      localStorage.getItem(
        STORAGE_MESSAGES,
      )

    if (!saved) {
      return INITIAL_MESSAGES.map((message) => ({ ...message, attachments: message.attachments ?? [] }))
    }

    const parsed =
      JSON.parse(saved)

    if (
      Array.isArray(parsed) &&
      parsed.length > 0
    ) {
      return parsed.map((message) => ({
        ...message,
        attachments: Array.isArray(message.attachments) ? message.attachments : [],
      }))
    }

    return INITIAL_MESSAGES.map((message) => ({ ...message, attachments: message.attachments ?? [] }))
  } catch {
    return INITIAL_MESSAGES.map((message) => ({ ...message, attachments: message.attachments ?? [] }))
  }
}

function loadLabels(): string[] {
  try {
    const saved =
      localStorage.getItem(
        STORAGE_LABELS,
      )

    if (!saved) {
      return []
    }

    const parsed =
      JSON.parse(saved)

    return Array.isArray(parsed)
      ? parsed
      : []
  } catch {
    return []
  }
}

function isValidEmail(
  value: string,
): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value.trim(),
  )
}

function formatFileSize(
  bytes: number,
): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`
}

function getLabelColor(
  label: string,
): string {
  switch (label.toLowerCase()) {
    case "primary":
      return "#00B69B"

    case "work":
      return "#FD9A56"

    case "friends":
      return "#D456FD"

    case "social":
      return "#5A8CFF"

    default:
      return "#4880FF"
  }
}

function getLabelBackground(
  label: string,
): string {
  switch (label.toLowerCase()) {
    case "primary":
      return "rgba(0,182,155,0.15)"

    case "work":
      return "rgba(253,154,86,0.15)"

    case "friends":
      return "rgba(212,86,253,0.15)"

    case "social":
      return "rgba(90,140,255,0.15)"

    default:
      return "rgba(72,128,255,0.15)"
  }
}

/* =========================================================
   TOAST
========================================================= */

function Toast({
  message,
  onClose,
}: {
  message: string
  onClose: () => void
}) {
  useEffect(() => {
    const timer =
      window.setTimeout(
        onClose,
        2200,
      )

    return () =>
      window.clearTimeout(
        timer,
      )
  }, [onClose])

  return (
    <div
      className="
        fixed
        bottom-5
        left-1/2
        z-[120]
        -translate-x-1/2
        rounded-xl
        bg-[#202224]
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        shadow-2xl
        dark:bg-white
        dark:text-black
      "
    >
      {message}
    </div>
  )
}

/* =========================================================
   ATTACHMENT CHIP
========================================================= */

function AttachmentChip({
  attachment,
  onRemove,
  showRemove = true,
  t,
}: {
  attachment: MailAttachment
  onRemove?: () => void
  showRemove?: boolean
  t: InboxTranslation
}) {
  return (
    <div
      className="
        flex
        max-w-full
        items-center
        gap-2
        rounded-lg
        border
        border-[#D5D5D5]
        bg-[#F8F9FA]
        px-3
        py-2
        dark:border-[#4B5668]
        dark:bg-[#323D4E]
      "
    >
      {attachment.type.startsWith("image/") ? (
        <ImageIcon
          size={16}
          className="shrink-0 text-[#4880FF]"
        />
      ) : (
        <File
          size={16}
          className="shrink-0 text-[#4880FF]"
        />
      )}

      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-[#202224] dark:text-white">
          {attachment.name}
        </p>

        <p className="text-[10px] text-[#202224]/50 dark:text-gray-400">
          {formatFileSize(
            attachment.size,
          )}
        </p>
      </div>

      {showRemove &&
        onRemove && (
          <button
            type="button"
            onClick={onRemove}
            title={t.remove}
            className="
              ml-auto
              shrink-0
              text-[#A6A6A6]
              transition-colors
              hover:text-[#F93C65]
            "
          >
            <X size={15} />
          </button>
        )}
    </div>
  )
}

/* =========================================================
   FILE PICKER
========================================================= */

function useAttachmentPicker(
  multiple = true,
) {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null,
    )

  const openPicker = () => {
    inputRef.current?.click()
  }

  const Input = ({
    accept,
    onFiles,
  }: {
    accept?: string
    onFiles: (
      files: FileList,
    ) => void
  }) => (
    <input
      ref={inputRef}
      type="file"
      hidden
      multiple={multiple}
      accept={accept}
      onChange={(
        event: ChangeEvent<HTMLInputElement>,
      ) => {
        if (event.target.files) {
          onFiles(
            event.target.files,
          )
        }

        event.target.value = ""
      }}
    />
  )

  return {
    openPicker,
    Input,
  }
}

/* =========================================================
   CREATE LABEL MODAL
========================================================= */

function CreateLabelModal({
  labels,
  t,
  onClose,
  onCreate,
}: {
  labels: string[]
  t: InboxTranslation
  onClose: () => void
  onCreate: (
    value: string,
  ) => void
}) {
  const [name, setName] =
    useState("")

  const handleSubmit = (
    event: FormEvent,
  ) => {
    event.preventDefault()

    const clean =
      name.trim()

    if (!clean) {
      return
    }

    const exists = [
      "Primary",
      "Social",
      "Work",
      "Friends",
      ...labels,
    ].some(
      (item) =>
        item.toLowerCase() ===
        clean.toLowerCase(),
    )

    if (exists) {
      return
    }

    onCreate(clean)
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
      onMouseDown={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onMouseDown={(event) =>
          event.stopPropagation()
        }
        className="
          w-full
          max-w-[430px]
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
          dark:bg-[#273142]
        "
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#202224] dark:text-white">
            {t.newLabel}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              hover:bg-[#F1F4F9]
              dark:hover:bg-[#323D4E]
            "
          >
            <X size={18} />
          </button>
        </div>

        <input
          autoFocus
          value={name}
          onChange={(event) =>
            setName(
              event.target.value,
            )
          }
          placeholder={t.labelName}
          className="
            h-11
            w-full
            rounded-lg
            border
            border-[#D5D5D5]
            bg-white
            px-4
            text-sm
            outline-none
            focus:border-[#4880FF]
            dark:border-[#4B5668]
            dark:bg-[#323D4E]
            dark:text-white
          "
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              bg-[#E8EDF5]
              px-5
              py-2.5
              text-sm
              font-bold
              text-[#202224]
              hover:bg-[#DCE3EF]
              dark:bg-[#4B5668]
              dark:text-white
              dark:hover:bg-white
              dark:hover:text-black
            "
          >
            {t.cancel}
          </button>

          <button
            type="submit"
            disabled={!name.trim()}
            className="
              rounded-lg
              bg-[#4880FF]
              px-5
              py-2.5
              text-sm
              font-bold
              text-white
              hover:bg-[#3B6EE8]
              disabled:opacity-40
            "
          >
            {t.create}
          </button>
        </div>
      </form>
    </div>
  )
}

/* =========================================================
   COMPOSE MODAL
========================================================= */

function ComposeModal({
  customLabels,
  t,
  onClose,
  onSend,
  onSaveDraft,
}: {
  customLabels: string[]
  t: InboxTranslation
  onClose: () => void
  onSend: (
    to: string,
    subject: string,
    label: MailLabel,
    body: string,
    attachments: MailAttachment[],
  ) => void
  onSaveDraft: (
    to: string,
    subject: string,
    label: MailLabel,
    body: string,
    attachments: MailAttachment[],
  ) => void
}) {
  const [to, setTo] =
    useState("")

  const [subject, setSubject] =
    useState("")

  const [body, setBody] =
    useState("")

  const [label, setLabel] =
    useState<MailLabel>("Primary")

  const [attachments, setAttachments] =
    useState<MailAttachment[]>([])

  const [error, setError] =
    useState("")

  const {
    openPicker,
    Input,
  } = useAttachmentPicker(true)

  const handleFiles = (
    files: FileList,
  ) => {
    const selected =
      Array.from(files).map(
        (file, index) => ({
          id: `${file.name}-${file.lastModified}-${index}`,
          name: file.name,
          type:
            file.type ||
            "application/octet-stream",
          size: file.size,
          url:
            URL.createObjectURL(
              file,
            ),
        }),
      )

    setAttachments(
      (current) => [
        ...current,
        ...selected,
      ],
    )
  }

  const removeAttachment = (
    id: string,
  ) => {
    setAttachments(
      (current) =>
        current.filter(
          (item) =>
            item.id !== id,
        ),
    )
  }

  const handleSend = (
    event: FormEvent,
  ) => {
    event.preventDefault()

    if (!to.trim()) {
      setError(
        t.requiredTo,
      )
      return
    }

    if (!isValidEmail(to)) {
      setError(
        t.invalidEmail,
      )
      return
    }

    onSend(
      to.trim(),
      subject.trim(),
      label,
      body.trim(),
      attachments,
    )
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[90]
        flex
        items-center
        justify-center
        bg-black/50
        p-3
        backdrop-blur-[2px]
        sm:p-5
      "
      onMouseDown={onClose}
    >
      <form
        onSubmit={handleSend}
        onMouseDown={(event) =>
          event.stopPropagation()
        }
        className="
          flex
          max-h-[calc(100vh-24px)]
          w-full
          max-w-[640px]
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-[#D5D5D5]
          bg-white
          shadow-2xl
          dark:border-[#313D4F]
          dark:bg-[#273142]
          sm:max-h-[calc(100vh-40px)]
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-[#E0E0E0]
            px-5
            py-4
            dark:border-[#313D4F]
          "
        >
          <h2 className="text-xl font-bold text-[#202224] dark:text-white">
            {t.composeMail}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-[#202224]/60
              hover:bg-[#F1F4F9]
              dark:text-gray-300
              dark:hover:bg-[#323D4E]
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY
            scrollbar hidden
        */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-5
            py-5
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:px-6
          "
        >
          <label className="mb-2 block text-sm font-bold text-[#202224] dark:text-white">
            {t.to}
          </label>

          <input
            type="email"
            value={to}
            onChange={(event) => {
              setTo(
                event.target.value,
              )
              setError("")
            }}
            placeholder="example@email.com"
            className="
              h-11
              w-full
              rounded-lg
              border
              border-[#D5D5D5]
              bg-white
              px-4
              text-sm
              outline-none
              focus:border-[#4880FF]
              dark:border-[#4B5668]
              dark:bg-[#323D4E]
              dark:text-white
            "
          />

          {error && (
            <p className="mt-2 text-xs font-semibold text-[#F93C65]">
              {error}
            </p>
          )}

          <label className="mb-2 mt-5 block text-sm font-bold text-[#202224] dark:text-white">
            {t.subject}
          </label>

          <input
            value={subject}
            onChange={(event) =>
              setSubject(
                event.target.value,
              )
            }
            placeholder={t.subject}
            className="
              h-11
              w-full
              rounded-lg
              border
              border-[#D5D5D5]
              bg-white
              px-4
              text-sm
              outline-none
              focus:border-[#4880FF]
              dark:border-[#4B5668]
              dark:bg-[#323D4E]
              dark:text-white
            "
          />

          <label className="mb-2 mt-5 block text-sm font-bold text-[#202224] dark:text-white">
            {t.label}
          </label>

          <select
            value={label ?? ""}
            onChange={(event) =>
              setLabel(
                event.target.value ||
                  null,
              )
            }
            className="
              h-11
              w-full
              rounded-lg
              border
              border-[#D5D5D5]
              bg-white
              px-4
              text-sm
              outline-none
              focus:border-[#4880FF]
              dark:border-[#4B5668]
              dark:bg-[#323D4E]
              dark:text-white
            "
          >
            <option value="">
              {t.selectLabel}
            </option>

            <option value="Primary">
              {t.primary}
            </option>

            <option value="Social">
              {t.social}
            </option>

            <option value="Work">
              {t.work}
            </option>

            <option value="Friends">
              {t.friends}
            </option>

            {customLabels.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ),
            )}
          </select>

          <label className="mb-2 mt-5 block text-sm font-bold text-[#202224] dark:text-white">
            {t.message}
          </label>

          <textarea
            value={body}
            onChange={(event) =>
              setBody(
                event.target.value,
              )
            }
            placeholder={t.message}
            rows={7}
            className="
              min-h-[150px]
              w-full
              resize-y
              rounded-lg
              border
              border-[#D5D5D5]
              bg-white
              p-4
              text-sm
              leading-6
              outline-none
              focus:border-[#4880FF]
              dark:border-[#4B5668]
              dark:bg-[#323D4E]
              dark:text-white
            "
          />

          {/* ATTACHMENTS */}

          {attachments.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {attachments.map(
                (attachment) => (
                  <AttachmentChip
                    key={
                      attachment.id
                    }
                    attachment={
                      attachment
                    }
                    onRemove={() =>
                      removeAttachment(
                        attachment.id,
                      )
                    }
                    t={t}
                  />
                ),
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            shrink-0
            flex-col
            gap-3
            border-t
            border-[#E0E0E0]
            p-4
            dark:border-[#313D4F]
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          {/* Attachment */}

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openPicker}
              title={t.attachment}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                text-[#70757D]
                hover:bg-[#F1F4F9]
                hover:text-[#4880FF]
                dark:text-gray-300
                dark:hover:bg-[#323D4E]
              "
            >
              <Paperclip size={19} />
            </button>

            <Input
              accept="*/*"
              onFiles={handleFiles}
            />

            {/* Image */}

            <button
              type="button"
              onClick={openPicker}
              title={t.image}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                text-[#70757D]
                hover:bg-[#F1F4F9]
                hover:text-[#4880FF]
                dark:text-gray-300
                dark:hover:bg-[#323D4E]
              "
            >
              <ImageIcon size={19} />
            </button>

            <span className="hidden text-xs text-[#A6A6A6] sm:block">
              {attachments.length > 0
                ? `${attachments.length} file${
                    attachments.length >
                    1
                      ? "s"
                      : ""
                  }`
                : t.noAttachment}
            </span>
          </div>

          <div className="flex w-full gap-3 sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                rounded-lg
                bg-[#E8EDF5]
                px-5
                py-2.5
                text-sm
                font-bold
                text-[#202224]
                transition-colors
                hover:bg-[#DCE3EF]
                dark:bg-[#4B5668]
                dark:text-white
                dark:hover:bg-white
                dark:hover:text-black
                sm:flex-none
              "
            >
              {t.cancel}
            </button>

            <button
              type="button"
              onClick={() =>
                onSaveDraft(
                  to,
                  subject,
                  label,
                  body,
                  attachments,
                )
              }
              className="
                flex-1
                rounded-lg
                bg-[#E8EDF5]
                px-5
                py-2.5
                text-sm
                font-bold
                text-[#202224]
                transition-colors
                hover:bg-[#DCE3EF]
                dark:bg-[#4B5668]
                dark:text-white
                dark:hover:bg-white
                dark:hover:text-black
                sm:flex-none
              "
            >
              {t.saveAsDraft}
            </button>

            <button
              type="submit"
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#4880FF]
                px-5
                py-2.5
                text-sm
                font-bold
                text-white
                transition-all
                hover:bg-[#3B6EE8]
                hover:shadow-md
                sm:flex-none
              "
            >
              {t.send}
              <Send size={16} />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

/* =========================================================
   MAIL NAVIGATION
========================================================= */

function MailNavigation({
  folder,
  onFolderChange,
  selectedLabel,
  onLabelChange,
  counts,
  customLabels,
  onCompose,
  onCreateLabel,
  t,
}: {
  folder: MailFolder
  onFolderChange: (
    folder: MailFolder,
  ) => void
  selectedLabel: MailLabel
  onLabelChange: (
    label: MailLabel,
  ) => void
  counts: FolderCounts
  customLabels: string[]
  onCompose: () => void
  onCreateLabel: () => void
  t: InboxTranslation
}) {
  const folders: {
    id: MailFolder
    label: string
  }[] = [
    {
      id: "inbox",
      label: t.inbox,
    },
    {
      id: "starred",
      label: t.starred,
    },
    {
      id: "sent",
      label: t.sent,
    },
    {
      id: "draft",
      label: t.draft,
    },
    {
      id: "spam",
      label: t.spam,
    },
    {
      id: "important",
      label: t.important,
    },
    {
      id: "bin",
      label: t.bin,
    },
  ]

  const labels = [
    {
      value: "Primary",
      text: t.primary,
      color: "#00B69B",
    },
    {
      value: "Social",
      text: t.social,
      color: "#5A8CFF",
    },
    {
      value: "Work",
      text: t.work,
      color: "#FD9A56",
    },
    {
      value: "Friends",
      text: t.friends,
      color: "#D456FD",
    },
    ...customLabels.map(
      (label, index) => ({
        value: label,
        text: label,
        color:
          [
            "#00B69B",
            "#5A8CFF",
            "#FD9A56",
            "#D456FD",
          ][index % 4],
      }),
    ),
  ]

  return (
    <aside
      className="
        w-full
        shrink-0
        rounded-[14px]
        border
        border-[#B9B9B9]/20
        bg-white
        p-5
        shadow-sm
        dark:border-[#313D4F]
        dark:bg-[#273142]
        sm:p-[24px]
        lg:w-[260px]
        xl:w-[286px]
      "
    >
      <button
        type="button"
        onClick={onCompose}
        className="
          mb-6
          flex
          h-[43px]
          w-full
          items-center
          justify-center
          gap-1.5
          rounded-[8px]
          bg-[#4880FF]
          text-sm
          font-bold
          text-white
          transition-all
          hover:bg-[#3B6EE8]
          hover:shadow-md
          active:scale-[0.99]
        "
      >
        <Plus size={17} />
        {t.compose}
      </button>

      <h2 className="mb-[14px] text-[16px] font-bold text-[#202224] dark:text-white">
        {t.myEmail}
      </h2>

      <div className="space-y-1">
        {folders.map(
          (item) => {
            const active =
              folder === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onFolderChange(
                    item.id,
                  )
                }
                className={[
                  "flex h-[43px] w-full items-center justify-between rounded-[4px] px-4 text-left text-[14px] font-semibold transition-all",
                  active
                    ? "bg-[#4880FF]/15 text-[#4880FF] dark:bg-[#4880FF]/20"
                    : "text-[#202224] hover:bg-gray-50 dark:text-white dark:hover:bg-[#323D4E]",
                ].join(" ")}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <FolderIcon
                    folder={item.id}
                    size={18}
                  />

                  <span className="truncate">
                    {item.label}
                  </span>
                </span>

                <span
                  className={
                    active
                      ? "font-bold text-[#4880FF]"
                      : "text-[#202224]/60 dark:text-gray-400"
                  }
                >
                  {counts[item.id]}
                </span>
              </button>
            )
          },
        )}
      </div>

      <div className="mt-7">
        <h2 className="mb-4 text-[16px] font-bold text-[#202224] dark:text-white">
          {t.label}
        </h2>

        <div className="space-y-1">
          {labels.map(
            (item) => {
              const active =
                selectedLabel ===
                item.value

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    onLabelChange(
                      active
                        ? null
                        : item.value,
                    )
                  }
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-md
                    px-3
                    py-2
                    text-left
                    text-[14px]
                    font-semibold
                    text-[#202224]
                    hover:bg-gray-50
                    dark:text-white
                    dark:hover:bg-[#323D4E]
                  "
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border-2"
                    style={{
                      borderColor:
                        item.color,
                      backgroundColor:
                        active
                          ? item.color
                          : "transparent",
                    }}
                  >
                    {active && (
                      <Check
                        size={11}
                        className="text-white"
                      />
                    )}
                  </span>

                  <span className="truncate">
                    {item.text}
                  </span>
                </button>
              )
            },
          )}
        </div>

        <button
          type="button"
          onClick={onCreateLabel}
          className="
            mt-4
            flex
            items-center
            gap-2
            px-3
            text-[14px]
            font-semibold
            text-[#202224]/50
            hover:text-[#4880FF]
            dark:text-gray-400
            dark:hover:text-[#4880FF]
          "
        >
          <Plus size={17} />
          {t.createNewLabel}
        </button>
      </div>
    </aside>
  )
}

/* =========================================================
   FOLDER ICON
========================================================= */

function FolderIcon({
  folder,
  size,
}: {
  folder: MailFolder
  size: number
}) {
  if (folder === "inbox") {
    return <Mail size={size} />
  }

  if (folder === "starred") {
    return <Star size={size} />
  }

  if (folder === "sent") {
    return <Send size={size} />
  }

  if (folder === "draft") {
    return <Pencil size={size} />
  }

  if (folder === "spam") {
    return <TriangleAlert size={size} />
  }

  if (folder === "important") {
    return <Info size={size} />
  }

  return <Trash2 size={size} />
}

/* =========================================================
   MESSAGE ROW
========================================================= */

function MessageRow({
  message,
  hideLabel,
  onClick,
  onToggleStar,
  onToggleSelect,
}: {
  message: MailMessage
  hideLabel: boolean
  onClick: () => void
  onToggleStar: () => void
  onToggleSelect: () => void
}) {
  const attachmentCount =
    message.attachments?.length ?? 0

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault()
          onClick()
        }
      }}
      className="
        group
        flex
        min-h-[64px]
        w-full
        cursor-pointer
        items-center
        gap-3
        border-b
        border-[#E0E0E0]/60
        px-4
        py-3
        transition-colors
        hover:bg-[#4880FF]/[0.04]
        dark:border-[#313D4F]
        dark:hover:bg-[#323D4E]/60
        sm:px-[24px]
      "
    >
      {/* CHECKBOX */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onToggleSelect()
        }}
        className="
          flex
          h-4
          w-4
          shrink-0
          items-center
          justify-center
          rounded-[3px]
          border
          border-[#B9B9B9]
          dark:border-[#6C788B]
        "
        aria-label="Select message"
      >
        {message.selected && (
          <span className="
            flex
            h-full
            w-full
            items-center
            justify-center
            rounded-[2px]
            bg-[#202224]
            text-[10px]
            font-bold
            text-white
            dark:bg-white
            dark:text-[#202224]
          ">
            ✓
          </span>
        )}
      </button>

      {/* STAR */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onToggleStar()
        }}
        className="
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
        "
        aria-label="Star message"
      >
        <Star
          size={18}
          className={
            message.starred
              ? "fill-[#FFD56D] text-[#FFD56D]"
              : "text-[#B9B9B9] dark:text-gray-400"
          }
        />
      </button>

      {/* NO PROFILE IMAGE IN MESSAGE LIST */}

      {/* MESSAGE CONTENT */}
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <p
            className="
              truncate
              text-[14px]
              font-bold
              text-[#202224]
              dark:text-white
            "
          >
            {message.sender}
          </p>

          {!hideLabel && message.label && (
            <span
              className="
                hidden
                shrink-0
                rounded-[4px]
                px-2
                py-0.5
                text-[10px]
                font-semibold
                sm:inline-flex
              "
              style={{
                backgroundColor:
                  getLabelBackground(
                    message.label,
                  ),
                color: getLabelColor(
                  message.label,
                ),
              }}
            >
              {message.label}
            </span>
          )}
        </div>

        <div className="mt-0.5 flex min-w-0 items-center gap-2">
          <p
            className="
              truncate
              text-[13px]
              font-semibold
              text-[#404040]
              dark:text-gray-200
            "
          >
            {message.subject}
          </p>

          <span className="hidden shrink-0 text-[#A6A6A6] sm:inline">
            —
          </span>

          <p
            className="
              hidden
              min-w-0
              truncate
              text-[12px]
              text-[#8A8A8A]
              sm:block
            "
          >
            {message.body}
          </p>
        </div>
      </div>

      {/* ATTACHMENT ICON */}
      {attachmentCount > 0 && (
        <Paperclip
          size={16}
          className="shrink-0 text-[#8A8F98]"
        />
      )}

      {/* TIME */}
      <span
        className="
          shrink-0
          text-[11px]
          font-medium
          text-[#8A8A8A]
          dark:text-gray-400
        "
      >
        {message.time}
      </span>
    </div>
  )
}

/* =========================================================
   TOOLBAR
========================================================= */

function MessageToolbar({
  search,
  setSearch,
  selectedCount,
  onImportant,
  onSpam,
  onDelete,
  t,
}: {
  search: string
  setSearch: (
    value: string,
  ) => void
  selectedCount: number
  onImportant: () => void
  onSpam: () => void
  onDelete: () => void
  t: InboxTranslation
}) {
  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        justify-between
        gap-3
        border-b
        border-[#E0E0E0]/60
        p-4
        dark:border-[#313D4F]
        sm:px-[24px]
        sm:py-[20px]
      "
    >
      <div className="relative w-full sm:w-[280px] md:w-[332px]">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F98]"
        />

        <input
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value,
            )
          }
          placeholder={t.searchMail}
          className="
            h-[38px]
            w-full
            rounded-[20px]
            border
            border-[#D5D5D5]
            bg-[#F5F6FA]
            pl-10
            pr-4
            text-[14px]
            outline-none
            focus:border-[#4880FF]
            dark:border-[#4B5668]
            dark:bg-[#323D4E]
            dark:text-white
          "
        />
      </div>

      <div className="inline-flex overflow-hidden rounded-[10px] border border-[#D5D5D5] bg-[#FAFBFD] dark:border-[#4B5668] dark:bg-[#323D4E]">
        <button
          type="button"
          disabled={!selectedCount}
          onClick={onImportant}
          title={t.archive}
          className="flex h-[38px] w-[42px] items-center justify-center border-r border-[#D5D5D5] transition-colors hover:bg-[#4880FF]/10 hover:text-[#4880FF] disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#4B5668]"
        >
          <Archive size={17} />
        </button>

        <button
          type="button"
          disabled={!selectedCount}
          onClick={onSpam}
          title={t.markSpam}
          className="flex h-[38px] w-[42px] items-center justify-center border-r border-[#D5D5D5] transition-colors hover:bg-[#4880FF]/10 hover:text-[#4880FF] disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#4B5668]"
        >
          <TriangleAlert
            size={17}
          />
        </button>

        <button
          type="button"
          disabled={!selectedCount}
          onClick={onDelete}
          title={t.delete}
          className="flex h-[38px] w-[42px] items-center justify-center transition-colors hover:bg-[#F93C65]/10 hover:text-[#F93C65] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  )
}

/* =========================================================
   REPLY COMPOSER
========================================================= */

function ReplyComposer({
  t,
  onSend,
}: {
  t: InboxTranslation
  onSend: (
    text: string,
    attachments: MailAttachment[],
  ) => void
}) {
  const [text, setText] =
    useState("")

  const [attachments, setAttachments] =
    useState<MailAttachment[]>([])

  const [isRecording, setIsRecording] =
    useState(false)

  const [audioUrl, setAudioUrl] =
    useState<string | null>(null)

  const mediaRecorderRef =
    useRef<MediaRecorder | null>(
      null,
    )

  const streamRef =
    useRef<MediaStream | null>(
      null,
    )

  const chunksRef =
    useRef<Blob[]>([])

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null,
    )

  const imageInputRef =
    useRef<HTMLInputElement | null>(
      null,
    )

  const handleFiles = (
    files: FileList,
  ) => {
    const selected =
      Array.from(files).map(
        (file, index) => ({
          id: `${file.name}-${Date.now()}-${index}`,
          name: file.name,
          type:
            file.type ||
            "application/octet-stream",
          size: file.size,
          url:
            URL.createObjectURL(
              file,
            ),
        }),
      )

    setAttachments(
      (current) => [
        ...current,
        ...selected,
      ],
    )
  }

  const startRecording =
    async () => {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices
          .getUserMedia
      ) {
        return
      }

      try {
        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              audio: true,
            },
          )

        streamRef.current =
          stream

        const recorder =
          new MediaRecorder(
            stream,
          )

        mediaRecorderRef.current =
          recorder

        chunksRef.current = []

        recorder.ondataavailable =
          (event) => {
            if (
              event.data.size >
              0
            ) {
              chunksRef.current.push(
                event.data,
              )
            }
          }

        recorder.onstop = () => {
          const blob =
            new Blob(
              chunksRef.current,
              {
                type:
                  "audio/webm",
              },
            )

          const url =
            URL.createObjectURL(
              blob,
            )

          setAudioUrl(url)

          const audioAttachment:
            MailAttachment = {
              id: `voice-${Date.now()}`,
              name: `voice-${Date.now()}.webm`,
              type: "audio/webm",
              size: blob.size,
              url,
            }

          setAttachments(
            (current) => [
              ...current,
              audioAttachment,
            ],
          )

          stream
            .getTracks()
            .forEach(
              (track) =>
                track.stop(),
            )
        }

        recorder.start()
        setIsRecording(true)
      } catch {
        setIsRecording(false)
      }
    }

  const stopRecording = () => {
    const recorder =
      mediaRecorderRef.current

    if (
      recorder &&
      recorder.state !==
        "inactive"
    ) {
      recorder.stop()
    }

    setIsRecording(false)
  }

  useEffect(() => {
    return () => {
      streamRef.current
        ?.getTracks()
        .forEach(
          (track) =>
            track.stop(),
        )
    }
  }, [])

  const removeAttachment = (
    id: string,
  ) => {
    setAttachments(
      (current) =>
        current.filter(
          (item) =>
            item.id !== id,
        ),
    )
  }

  const handleSubmit = () => {
    if (
      !text.trim() &&
      attachments.length === 0
    ) {
      return
    }

    onSend(
      text.trim(),
      attachments,
    )

    setText("")
    setAttachments([])

    if (audioUrl) {
      URL.revokeObjectURL(
        audioUrl,
      )
      setAudioUrl(null)
    }
  }

  return (
    <div
      className="
        shrink-0
        border-t
        border-[#E0E0E0]/60
        bg-white
        p-4
        dark:border-[#313D4F]
        dark:bg-[#273142]
        sm:px-6
        sm:py-4
      "
    >
      {attachments.length >
        0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map(
            (attachment) => {
              const isAudio =
                attachment.type.startsWith(
                  "audio/",
                )

              if (
                isAudio &&
                attachment.url
              ) {
                return (
                  <div
                    key={
                      attachment.id
                    }
                    className="flex items-center gap-2 rounded-lg border border-[#D5D5D5] bg-[#F8F9FA] px-3 py-2 dark:border-[#4B5668] dark:bg-[#323D4E]"
                  >
                    <Play
                      size={15}
                      className="text-[#4880FF]"
                    />

                    <audio
                      src={
                        attachment.url
                      }
                      controls
                      className="h-8 max-w-[180px]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeAttachment(
                          attachment.id,
                        )
                      }
                      className="text-[#A6A6A6] hover:text-[#F93C65]"
                    >
                      <X size={15} />
                    </button>
                  </div>
                )
              }

              return (
                <AttachmentChip
                  key={
                    attachment.id
                  }
                  attachment={
                    attachment
                  }
                  onRemove={() =>
                    removeAttachment(
                      attachment.id,
                    )
                  }
                  t={t}
                />
              )
            },
          )}
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* AUDIO MIC - LEFT */}
        <button
          type="button"
          title={
            isRecording
              ? t.stopRecording
              : t.recordVoice
          }
          onClick={
            isRecording
              ? stopRecording
              : startRecording
          }
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
            isRecording
              ? "bg-[#F93C65] text-white"
              : "text-[#70757D] hover:bg-[#F1F4F9] hover:text-[#4880FF] dark:text-gray-300 dark:hover:bg-[#323D4E]",
          ].join(" ")}
        >
          {isRecording ? <Square size={16} /> : <MicIcon />}
        </button>

        {/* MESSAGE */}
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()
              handleSubmit()
            }
          }}
          rows={1}
          placeholder={
            isRecording ? t.recording : "Write a message..."
          }
          className="max-h-[120px] min-h-[42px] min-w-0 flex-1 resize-none rounded-xl border border-[#D5D5D5] bg-[#F8F9FA] px-4 py-2.5 text-sm text-[#202224] outline-none focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"
        />

        {/* ATTACHMENT - RIGHT */}
        <button
          type="button"
          title={t.attachment}
          onClick={() => fileInputRef.current?.click()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#70757D] hover:bg-[#F1F4F9] hover:text-[#4880FF] dark:text-gray-300 dark:hover:bg-[#323D4E]"
        >
          <Paperclip size={19} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple
          onChange={(event) => {
            if (event.target.files) handleFiles(event.target.files)
            event.target.value = ""
          }}
        />

        {/* IMAGE - RIGHT */}
        <button
          type="button"
          title={t.image}
          onClick={() => imageInputRef.current?.click()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#70757D] hover:bg-[#F1F4F9] hover:text-[#4880FF] dark:text-gray-300 dark:hover:bg-[#323D4E]"
        >
          <ImageIcon size={19} />
        </button>

        <input
          ref={imageInputRef}
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={(event) => {
            if (event.target.files) handleFiles(event.target.files)
            event.target.value = ""
          }}
        />

        {/* SEND - RIGHT */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim() && attachments.length === 0}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4880FF] text-white transition-all hover:bg-[#3B6EE8] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  )
}

/* =========================================================
   MIC ICON
========================================================= */

function MicIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="9"
        y="2"
        width="6"
        height="12"
        rx="3"
      />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line
        x1="12"
        y1="19"
        x2="12"
        y2="22"
      />
      <line
        x1="8"
        y1="22"
        x2="16"
        y2="22"
      />
    </svg>
  )
}

/* =========================================================
   MESSAGE DETAIL
========================================================= */

function MessageDetail({
  message,
  t,
  onBack,
  onToggleStar,
  onDelete,
  onReply,
}: {
  message: MailMessage
  t: InboxTranslation
  onBack: () => void
  onToggleStar: () => void
  onDelete: () => void
  onReply: (
    text: string,
    attachments: MailAttachment[],
  ) => void
}) {
  return (
    <div className="flex min-h-[680px] flex-1 flex-col">
      {/* HEADER */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          gap-3
          border-b
          border-[#E0E0E0]/60
          px-4
          py-4
          dark:border-[#313D4F]
          sm:px-6
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-md
              bg-[#F5F6FA]
              hover:bg-[#4880FF]
              hover:text-white
              dark:bg-[#323D4E]
            "
          >
            <ChevronLeft size={18} />
          </button>

          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80"
            alt={message.sender}
            className="
              h-9
              w-9
              shrink-0
              rounded-full
              object-cover
            "
          />

          <div className="min-w-0">
            <h2 className="truncate text-[18px] font-bold text-[#202224] dark:text-white sm:text-[20px]">
              {message.sender}
            </h2>

            <p className="truncate text-xs text-[#202224]/50 dark:text-gray-400">
              {message.senderEmail}
            </p>
          </div>
        </div>

        <div className="inline-flex shrink-0 overflow-hidden rounded-[10px] border border-[#D5D5D5] bg-[#FAFBFD] dark:border-[#4B5668] dark:bg-[#323D4E]">
          <button
            type="button"
            onClick={() =>
              window.print()
            }
            title={t.print}
            className="flex h-[38px] w-[42px] items-center justify-center border-r border-[#D5D5D5] hover:bg-[#4880FF]/10 hover:text-[#4880FF] dark:border-[#4B5668]"
          >
            <Printer size={17} />
          </button>

          <button
            type="button"
            onClick={onToggleStar}
            className="flex h-[38px] w-[42px] items-center justify-center border-r border-[#D5D5D5] hover:bg-[#4880FF]/10 dark:border-[#4B5668]"
          >
            <Star
              size={18}
              className={
                message.starred
                  ? "fill-[#FFD56D] text-[#FFD56D]"
                  : ""
              }
            />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex h-[38px] w-[42px] items-center justify-center hover:bg-[#F93C65]/10 hover:text-[#F93C65]"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      {/* MESSAGE */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          p-5
          sm:p-8
        "
      >
        {/* SUBJECT */}

        <div className="mb-8">
          {message.label && (
            <span
              className="mb-3 inline-flex rounded-[4px] px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor:
                  getLabelBackground(
                    message.label,
                  ),
                color:
                  getLabelColor(
                    message.label,
                  ),
              }}
            >
              {message.label}
            </span>
          )}

          <h3 className="text-xl font-bold text-[#202224] dark:text-white">
            {message.subject}
          </h3>
        </div>

        {/* INCOMING */}

        <div className="flex items-start gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80"
            alt={message.sender}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />

          <div className="max-w-[85%]">
            <div
              className="
                rounded-t-[16px]
                rounded-br-[16px]
                bg-[#F3F3F3]
                px-5
                py-4
                text-[14px]
                leading-7
                text-[#404040]
                dark:bg-[#323D4E]
                dark:text-gray-200
                sm:max-w-[680px]
              "
            >
              <p>
                {message.body}
              </p>

              {/* IMAGE ATTACHMENTS */}

              {message.attachments &&
                message.attachments
                  .filter(
                    (item) =>
                      item.type.startsWith(
                        "image/",
                      ) &&
                      item.url,
                  )
                  .map(
                    (attachment) => (
                      <img
                        key={
                          attachment.id
                        }
                        src={
                          attachment.url
                        }
                        alt={
                          attachment.name
                        }
                        className="
                          mt-4
                          max-h-[260px]
                          max-w-full
                          rounded-xl
                          object-cover
                        "
                      />
                    ),
                  )}

              {/* FILE ATTACHMENTS */}

              {message.attachments &&
                message.attachments
                  .filter(
                    (item) =>
                      !item.type.startsWith(
                        "image/",
                      ),
                  )
                  .map(
                    (attachment) => (
                      <div
                        key={
                          attachment.id
                        }
                        className="mt-3"
                      >
                        {attachment.type.startsWith(
                          "audio/",
                        ) &&
                        attachment.url ? (
                          <audio
                            src={
                              attachment.url
                            }
                            controls
                            className="max-w-full"
                          />
                        ) : (
                          <AttachmentChip
                            attachment={
                              attachment
                            }
                            showRemove={
                              false
                            }
                            t={t}
                          />
                        )}
                      </div>
                    ),
                  )}
            </div>

            <p className="mt-2 text-xs text-[#202224]/40 dark:text-gray-500">
              {message.time}
            </p>
          </div>
        </div>

        {/* DEMO REPLY */}

        <div className="mt-10 flex justify-end">
          <div
            className="
              max-w-[85%]
              rounded-t-[16px]
              rounded-bl-[16px]
              bg-[#4880FF]
              px-5
              py-4
              text-[14px]
              leading-7
              text-white
              sm:max-w-[680px]
            "
          >
            <p>
              There are many variations of
              passages of Lorem Ipsum available,
              but the majority have suffered
              alteration in some form, by injected
              humour.
            </p>

            <p className="mt-2 text-right text-xs text-white/70">
              6:34 PM
            </p>
          </div>
        </div>
      </div>

      {/* REPLY */}

      <ReplyComposer
        t={t}
        onSend={onReply}
      />
    </div>
  )
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Inbox() {
  const { language } =
    useLanguage()

  const t =
    inboxTranslations[language]

  const [messages, setMessages] =
    useState<MailMessage[]>(
      loadMessages,
    )

  const [customLabels, setCustomLabels] =
    useState<string[]>(
      loadLabels,
    )

  const [folder, setFolder] =
    useState<MailFolder>("inbox")

  const [selectedLabel, setSelectedLabel] =
    useState<MailLabel>(null)

  const [search, setSearch] =
    useState("")

  const [selectedIds, setSelectedIds] =
    useState<string[]>([])

  const [activeMessage, setActiveMessage] =
    useState<MailMessage | null>(
      null,
    )

  const [composeOpen, setComposeOpen] =
    useState(false)

  const [createLabelOpen, setCreateLabelOpen] =
    useState(false)

  const [page, setPage] =
    useState(1)

  const [toast, setToast] =
    useState("")

  /* =======================================================
     SAVE
  ======================================================== */

  useEffect(() => {
    localStorage.setItem(
      STORAGE_MESSAGES,
      JSON.stringify(messages),
    )
  }, [messages])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_LABELS,
      JSON.stringify(
        customLabels,
      ),
    )
  }, [customLabels])

  /* =======================================================
     DYNAMIC COUNTS
  ======================================================== */

  const counts: FolderCounts =
    useMemo(
      () => ({
        inbox: messages.filter(
          (message) =>
            message.folders.includes(
              "inbox",
            ),
        ).length,

        starred: messages.filter(
          (message) =>
            message.starred,
        ).length,

        sent: messages.filter(
          (message) =>
            message.folders.includes(
              "sent",
            ),
        ).length,

        draft: messages.filter(
          (message) =>
            message.folders.includes(
              "draft",
            ),
        ).length,

        spam: messages.filter(
          (message) =>
            message.folders.includes(
              "spam",
            ),
        ).length,

        important:
          messages.filter(
            (message) =>
              message.folders.includes(
                "important",
              ),
          ).length,

        bin: messages.filter(
          (message) =>
            message.folders.includes(
              "bin",
            ),
        ).length,
      }),
      [messages],
    )

  /* =======================================================
     FILTER
  ======================================================== */

  const filteredMessages =
    useMemo(() => {
      const query =
        search.trim().toLowerCase()

      return messages.filter(
        (message) => {
          const folderMatch =
            folder ===
            "starred"
              ? message.starred
              : message.folders.includes(
                  folder,
                )

          if (!folderMatch) {
            return false
          }

          if (
            selectedLabel &&
            message.label !==
              selectedLabel
          ) {
            return false
          }

          if (!query) {
            return true
          }

          return (
            message.sender
              .toLowerCase()
              .includes(query) ||
            message.subject
              .toLowerCase()
              .includes(query) ||
            message.body
              .toLowerCase()
              .includes(query)
          )
        },
      )
    }, [
      messages,
      folder,
      selectedLabel,
      search,
    ])

  /* =======================================================
     PAGINATION
  ======================================================== */

  const pageSize = 12

  const pageCount =
    Math.max(
      1,
      Math.ceil(
        filteredMessages.length /
          pageSize,
      ),
    )

  const currentMessages =
    filteredMessages.slice(
      (page - 1) *
        pageSize,
      page *
        pageSize,
    )

  const start =
    filteredMessages.length ===
    0
      ? 0
      : (page - 1) *
          pageSize +
        1

  const end =
    Math.min(
      page * pageSize,
      filteredMessages.length,
    )

  /* =======================================================
     SELECT
  ======================================================== */

  const toggleSelect = (
    id: string,
  ) => {
    setSelectedIds(
      (current) =>
        current.includes(id)
          ? current.filter(
              (item) =>
                item !== id,
            )
          : [...current, id],
    )

    setMessages(
      (current) =>
        current.map(
          (message) =>
            message.id === id
              ? {
                  ...message,
                  selected:
                    !message.selected,
                }
              : message,
        ),
    )
  }

  /* =======================================================
     STAR
  ======================================================== */

  const toggleStar = (
    id: string,
  ) => {
    setMessages(
      (current) =>
        current.map(
          (message) =>
            message.id === id
              ? {
                  ...message,
                  starred:
                    !message.starred,
                }
              : message,
        ),
    )

    setActiveMessage(
      (current) =>
        current?.id === id
          ? {
              ...current,
              starred:
                !current.starred,
            }
          : current,
    )
  }

  /* =======================================================
     MOVE SELECTED
  ======================================================== */

  const moveSelected = (
    destination:
      | "spam"
      | "important",
  ) => {
    if (
      selectedIds.length === 0
    ) {
      return
    }

    setMessages(
      (current) =>
        current.map(
          (message) => {
            if (
              !selectedIds.includes(
                message.id,
              )
            ) {
              return message
            }

            const folders =
              message.folders.filter(
                (item) =>
                  item !==
                    folder ||
                  destination ===
                    folder,
              )

            if (
              !folders.includes(
                destination,
              )
            ) {
              folders.push(
                destination,
              )
            }

            return {
              ...message,
              folders,
              selected: false,
            }
          },
        ),
    )

    setSelectedIds([])

    setToast(
      destination === "spam"
        ? t.movedToSpam
        : t.movedToImportant,
    )
  }

  /* =======================================================
     DELETE
  ======================================================== */

  const deleteSelected =
    () => {
      if (
        selectedIds.length ===
        0
      ) {
        return
      }

      setMessages(
        (current) =>
          current.map(
            (message) => {
              if (
                !selectedIds.includes(
                  message.id,
                )
              ) {
                return message
              }

              if (
                folder === "bin"
              ) {
                return null
              }

              const folders =
                message.folders.filter(
                  (item) =>
                    item !==
                    folder,
                )

              if (
                !folders.includes(
                  "bin",
                )
              ) {
                folders.push(
                  "bin",
                )
              }

              return {
                ...message,
                folders,
                selected: false,
              }
            },
          ).filter(
            (
              message,
            ): message is MailMessage =>
              message !==
              null,
          ),
      )

      setSelectedIds([])

      setToast(
        t.deleted,
      )
    }

  /* =======================================================
     CREATE LABEL
  ======================================================== */

  const createLabel = (
    label: string,
  ) => {
    setCustomLabels(
      (current) => [
        ...current,
        label,
      ],
    )

    setCreateLabelOpen(false)

    setToast(
      `${label} - ${t.labelCreated}`,
    )
  }

  /* =======================================================
     SEND
  ======================================================== */

  const sendMail = (
    to: string,
    subject: string,
    label: MailLabel,
    body: string,
    attachments: MailAttachment[],
  ) => {
    const message: MailMessage =
      {
        id: `mail-${Date.now()}`,
        sender: "You",
        senderEmail: to,
        subject:
          subject ||
          "(No subject)",
        body:
          body ||
          "No message content.",
        time: "Now",
        label,
        starred: false,
        folders: [
          "sent",
          "inbox",
        ],
        profileImage:
          PROFILE_IMAGES[0],
        attachments,
      }

    setMessages(
      (current) => [
        message,
        ...current,
      ],
    )

    setComposeOpen(false)

    setToast(
      t.mailSent,
    )
  }

  /* =======================================================
     DRAFT
  ======================================================== */

  const saveDraft = (
    to: string,
    subject: string,
    label: MailLabel,
    body: string,
    attachments: MailAttachment[],
  ) => {
    const draft: MailMessage =
      {
        id: `draft-${Date.now()}`,
        sender:
          to ||
          "Draft",
        senderEmail: to,
        subject:
          subject ||
          "(No subject)",
        body:
          body ||
          "Draft message",
        time: "Now",
        label,
        starred: false,
        folders: ["draft"],
        profileImage:
          PROFILE_IMAGES[0],
        attachments,
      }

    setMessages(
      (current) => [
        draft,
        ...current,
      ],
    )

    setComposeOpen(false)

    setToast(
      t.draftSaved,
    )
  }

  /* =======================================================
     REPLY
  ======================================================== */

  const sendReply = (
    text: string,
    attachments: MailAttachment[],
  ) => {
    if (!activeMessage) {
      return
    }

    const reply: MailMessage =
      {
        id: `reply-${Date.now()}`,
        sender: "You",
        senderEmail:
          activeMessage.senderEmail,
        subject:
          `Re: ${activeMessage.subject}`,
        body:
          text ||
          "Sent attachment",
        time: "Now",
        label:
          activeMessage.label,
        starred: false,
        folders: [
          "sent",
        ],
        profileImage:
          PROFILE_IMAGES[0],
        attachments,
      }

    setMessages(
      (current) => [
        reply,
        ...current,
      ],
    )

    setToast(
      t.mailSent,
    )
  }

  /* =======================================================
     CHANGE FOLDER
  ======================================================== */

  const changeFolder = (
    next: MailFolder,
  ) => {
    setFolder(next)
    setSelectedLabel(null)
    setSelectedIds([])
    setActiveMessage(null)
    setSearch("")
    setPage(1)
  }

  /* =======================================================
     OPEN MESSAGE
  ======================================================== */

  const openMessage = (
    message: MailMessage,
  ) => {
    setActiveMessage(
      message,
    )
  }

  /* =======================================================
     DELETE ACTIVE MESSAGE
  ======================================================== */

  const deleteActiveMessage =
    () => {
      if (!activeMessage) {
        return
      }

      const id =
        activeMessage.id

      setMessages(
        (current) =>
          current.map(
            (message) => {
              if (
                message.id !==
                id
              ) {
                return message
              }

              if (
                folder === "bin"
              ) {
                return null
              }

              const folders =
                message.folders.filter(
                  (item) =>
                    item !==
                    folder,
                )

              if (
                !folders.includes(
                  "bin",
                )
              ) {
                folders.push(
                  "bin",
                )
              }

              return {
                ...message,
                folders,
              }
            },
          ).filter(
            (
              message,
            ): message is MailMessage =>
              message !==
              null,
          ),
      )

      setActiveMessage(
        null,
      )

      setToast(
        t.deleted,
      )
    }

  return (
    <DashboardLayout>
      <div className="w-full">
        {/* PAGE TITLE */}

        <h1
          className="
            mb-[24px]
            text-[24px]
            font-bold
            leading-none
            tracking-[-0.11px]
            text-[#202224]
            dark:text-white
            sm:text-[32px]
          "
        >
          {t.inbox}
        </h1>

        {/* LAYOUT */}

        <div
          className="
            flex
            flex-col
            items-start
            gap-[24px]
            xl:gap-[30px]
            lg:flex-row
          "
        >
          {/* LEFT */}

          <MailNavigation
            folder={folder}
            onFolderChange={
              changeFolder
            }
            selectedLabel={
              selectedLabel
            }
            onLabelChange={(
              label,
            ) => {
              setSelectedLabel(
                label,
              )
              setPage(1)
              setActiveMessage(
                null,
              )
            }}
            counts={counts}
            customLabels={
              customLabels
            }
            onCompose={() =>
              setComposeOpen(true)
            }
            onCreateLabel={() =>
              setCreateLabelOpen(
                true,
              )
            }
            t={t}
          />

          {/* RIGHT */}

          <section
            className="
              flex
              min-h-[680px]
              w-full
              min-w-0
              flex-1
              flex-col
              overflow-hidden
              rounded-[14px]
              border
              border-[#B9B9B9]/20
              bg-white
              shadow-sm
              dark:border-[#313D4F]
              dark:bg-[#273142]
            "
          >
            {activeMessage ? (
              <MessageDetail
                message={
                  activeMessage
                }
                t={t}
                onBack={() =>
                  setActiveMessage(
                    null,
                  )
                }
                onToggleStar={() =>
                  toggleStar(
                    activeMessage.id,
                  )
                }
                onDelete={
                  deleteActiveMessage
                }
                onReply={
                  sendReply
                }
              />
            ) : (
              <>
                <MessageToolbar
                  search={search}
                  setSearch={(value) => {
                    setSearch(
                      value,
                    )
                    setPage(1)
                  }}
                  selectedCount={
                    selectedIds.length
                  }
                  onImportant={() =>
                    moveSelected(
                      "important",
                    )
                  }
                  onSpam={() =>
                    moveSelected(
                      "spam",
                    )
                  }
                  onDelete={
                    deleteSelected
                  }
                  t={t}
                />

                <div className="min-h-0 flex-1 overflow-y-auto">
                  {currentMessages.length >
                  0 ? (
                    currentMessages.map(
                      (
                        message,
                      ) => (
                        <MessageRow
                          key={
                            message.id
                          }
                          message={
                            message
                          }
                          hideLabel={
                            folder ===
                            "starred"
                          }
                          onClick={() =>
                            openMessage(
                              message,
                            )
                          }
                          onToggleStar={() =>
                            toggleStar(
                              message.id,
                            )
                          }
                          onToggleSelect={() =>
                            toggleSelect(
                              message.id,
                            )
                          }
                        />
                      ),
                    )
                  ) : (
                    <div
                      className="
                        flex
                        min-h-[400px]
                        flex-col
                        items-center
                        justify-center
                        px-6
                        text-center
                      "
                    >
                      <Mail
                        size={30}
                        className="mb-4 text-[#4880FF]"
                      />

                      <p className="text-sm font-semibold text-[#202224]/60 dark:text-gray-400">
                        {search
                          ? t.noSearchResults
                          : t.noMessages}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        </div>

        {/* PAGINATION */}

        {!activeMessage && (
          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-4
              lg:pl-[310px]
              xl:pl-[316px]
            "
          >
            <p className="text-[13px] font-semibold text-[#202224]/60 dark:text-gray-400 sm:text-[14px]">
              {t.showing}{" "}
              {filteredMessages.length
                ? `${start}-${end}`
                : "0"}{" "}
              {t.of}{" "}
              {filteredMessages.length}
            </p>

            <div className="inline-flex overflow-hidden rounded-[8px] border border-[#D5D5D5] bg-white dark:border-[#4B5668] dark:bg-[#273142]">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() =>
                  setPage(
                    (value) =>
                      Math.max(
                        1,
                        value - 1,
                      ),
                  )
                }
                className="flex h-[32px] w-[42px] items-center justify-center border-r border-[#D5D5D5] hover:bg-gray-100 disabled:opacity-40 dark:border-[#4B5668] dark:hover:bg-[#323D4E]"
              >
                <ChevronLeft
                  size={17}
                />
              </button>

              <button
                type="button"
                disabled={
                  page >=
                  pageCount
                }
                onClick={() =>
                  setPage(
                    (value) =>
                      Math.min(
                        pageCount,
                        value + 1,
                      ),
                  )
                }
                className="flex h-[32px] w-[42px] items-center justify-center hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-[#323D4E]"
              >
                <ChevronRight
                  size={17}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* COMPOSE */}

      {composeOpen && (
        <ComposeModal
          customLabels={
            customLabels
          }
          t={t}
          onClose={() =>
            setComposeOpen(false)
          }
          onSend={
            sendMail
          }
          onSaveDraft={
            saveDraft
          }
        />
      )}

      {/* CREATE LABEL */}

      {createLabelOpen && (
        <CreateLabelModal
          labels={
            customLabels
          }
          t={t}
          onClose={() =>
            setCreateLabelOpen(
              false,
            )
          }
          onCreate={
            createLabel
          }
        />
      )}

      {/* TOAST */}

      {toast && (
        <Toast
          message={toast}
          onClose={() =>
            setToast("")
          }
        />
      )}
    </DashboardLayout>
  )
}