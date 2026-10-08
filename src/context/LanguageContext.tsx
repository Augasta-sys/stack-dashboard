import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

/* -------------------------------------------------------------------------- */
/* Language Types                                                             */
/* -------------------------------------------------------------------------- */

export type Language = "English" | "French" | "Spanish"

/* -------------------------------------------------------------------------- */
/* Translation Interface                                                       */
/* -------------------------------------------------------------------------- */

export interface Translation {
  /* Sidebar */
  dashboard: string
  products: string
  favorites: string
  inbox: string
  orderLists: string
  productStock: string
  pricing: string
  calendar: string
  todo: string
  contact: string
  invoice: string
  uiElements: string
  team: string
  table: string
  settings: string
  pages: string
  logout: string

  /* Header */
  search: string
  selectLanguage: string
  notification: string
  seeAllNotification: string
  manageAccount: string
  changePassword: string
  activityLog: string
  admin: string

  /* Dashboard heading */
  dashboardTitle: string

  /* KPI Cards */
  totalUser: string
  totalOrder: string
  totalSales: string
  totalPending: string

  upFromYesterday: string
  upFromPastWeek: string
  downFromYesterday: string

  /* Dashboard sections */
  salesDetails: string
  dealsDetails: string
  revenue: string
  sales: string
  profit: string
  customers: string
  newCustomers: string
  repeated: string
  featuredProduct: string
  salesAnalytics: string

  /* Table */
  productName: string
  location: string
  dateTime: string
  piece: string
  amount: string
  status: string
  delivered: string

  /* Dashboard controls */
  october: string

  /* Product */
  beatsHeadphone: string
}

/* -------------------------------------------------------------------------- */
/* English                                                                    */
/* -------------------------------------------------------------------------- */

const english: Translation = {
  /* Sidebar */
  dashboard: "Dashboard",
  products: "Products",
  favorites: "Favorites",
  inbox: "Inbox",
  orderLists: "Order Lists",
  productStock: "Product Stock",
  pricing: "Pricing",
  calendar: "Calender",
  todo: "To-Do",
  contact: "Contact",
  invoice: "Invoice",
  uiElements: "UI Elements",
  team: "Team",
  table: "Table",
  settings: "Settings",
  pages: "PAGES",
  logout: "Logout",

  /* Header */
  search: "Search",
  selectLanguage: "Select Language",
  notification: "Notification",
  seeAllNotification: "See all notification",
  manageAccount: "Manage Account",
  changePassword: "Change Password",
  activityLog: "Activity Log",
  admin: "Admin",

  /* Dashboard */
  dashboardTitle: "Dashboard",

  /* KPI */
  totalUser: "Total User",
  totalOrder: "Total Order",
  totalSales: "Total Sales",
  totalPending: "Total Pending",

  upFromYesterday: "Up from yesterday",
  upFromPastWeek: "Up from past week",
  downFromYesterday: "Down from yesterday",

  /* Dashboard sections */
  salesDetails: "Sales Details",
  dealsDetails: "Deals Details",
  revenue: "Revenue",
  sales: "Sales",
  profit: "Profit",
  customers: "Customers",
  newCustomers: "New Customers",
  repeated: "Repeated",
  featuredProduct: "Featured Product",
  salesAnalytics: "Sales Analytics",

  /* Table */
  productName: "Product Name",
  location: "Location",
  dateTime: "Date - Time",
  piece: "Piece",
  amount: "Amount",
  status: "Status",
  delivered: "Delivered",

  /* Controls */
  october: "October",

  /* Product */
  beatsHeadphone: "Beats Headphone 2019",
}

/* -------------------------------------------------------------------------- */
/* French                                                                     */
/* -------------------------------------------------------------------------- */

const french: Translation = {
  /* Sidebar */
  dashboard: "Tableau de bord",
  products: "Produits",
  favorites: "Favoris",
  inbox: "Boîte de réception",
  orderLists: "Listes de commandes",
  productStock: "Stock de produits",
  pricing: "Tarification",
  calendar: "Calendrier",
  todo: "Tâches",
  contact: "Contact",
  invoice: "Facture",
  uiElements: "Éléments UI",
  team: "Équipe",
  table: "Tableau",
  settings: "Paramètres",
  pages: "PAGES",
  logout: "Déconnexion",

  /* Header */
  search: "Rechercher",
  selectLanguage: "Sélectionner la langue",
  notification: "Notifications",
  seeAllNotification: "Voir toutes les notifications",
  manageAccount: "Gérer le compte",
  changePassword: "Changer le mot de passe",
  activityLog: "Journal d’activité",
  admin: "Administrateur",

  /* Dashboard */
  dashboardTitle: "Tableau de bord",

  /* KPI */
  totalUser: "Total Utilisateurs",
  totalOrder: "Total Commandes",
  totalSales: "Ventes Totales",
  totalPending: "Total en Attente",

  upFromYesterday: "En hausse depuis hier",
  upFromPastWeek: "En hausse depuis la semaine dernière",
  downFromYesterday: "En baisse depuis hier",

  /* Dashboard sections */
  salesDetails: "Détails des ventes",
  dealsDetails: "Détails des offres",
  revenue: "Revenus",
  sales: "Ventes",
  profit: "Profit",
  customers: "Clients",
  newCustomers: "Nouveaux clients",
  repeated: "Récurrents",
  featuredProduct: "Produit vedette",
  salesAnalytics: "Analytique des ventes",

  /* Table */
  productName: "Nom du produit",
  location: "Emplacement",
  dateTime: "Date - Heure",
  piece: "Pièce",
  amount: "Montant",
  status: "Statut",
  delivered: "Livré",

  /* Controls */
  october: "Octobre",

  /* Product */
  beatsHeadphone: "Casque Beats 2019",
}

/* -------------------------------------------------------------------------- */
/* Spanish                                                                    */
/* -------------------------------------------------------------------------- */

const spanish: Translation = {
  /* Sidebar */
  dashboard: "Panel",
  products: "Productos",
  favorites: "Favoritos",
  inbox: "Bandeja de entrada",
  orderLists: "Listas de pedidos",
  productStock: "Stock de productos",
  pricing: "Precios",
  calendar: "Calendario",
  todo: "Tareas",
  contact: "Contacto",
  invoice: "Factura",
  uiElements: "Elementos UI",
  team: "Equipo",
  table: "Tabla",
  settings: "Ajustes",
  pages: "PÁGINAS",
  logout: "Cerrar sesión",

  /* Header */
  search: "Buscar",
  selectLanguage: "Seleccionar idioma",
  notification: "Notificaciones",
  seeAllNotification: "Ver todas las notificaciones",
  manageAccount: "Administrar cuenta",
  changePassword: "Cambiar contraseña",
  activityLog: "Registro de actividad",
  admin: "Administrador",

  /* Dashboard */
  dashboardTitle: "Panel",

  /* KPI */
  totalUser: "Total Usuarios",
  totalOrder: "Total Pedidos",
  totalSales: "Ventas Totales",
  totalPending: "Total Pendiente",

  upFromYesterday: "Subió desde ayer",
  upFromPastWeek: "Subió desde la semana pasada",
  downFromYesterday: "Bajó desde ayer",

  /* Dashboard sections */
  salesDetails: "Detalles de ventas",
  dealsDetails: "Detalles de ofertas",
  revenue: "Ingresos",
  sales: "Ventas",
  profit: "Beneficio",
  customers: "Clientes",
  newCustomers: "Nuevos clientes",
  repeated: "Repetidos",
  featuredProduct: "Producto destacado",
  salesAnalytics: "Analítica de ventas",

  /* Table */
  productName: "Nombre del producto",
  location: "Ubicación",
  dateTime: "Fecha - Hora",
  piece: "Pieza",
  amount: "Monto",
  status: "Estado",
  delivered: "Entregado",

  /* Controls */
  october: "Octubre",

  /* Product */
  beatsHeadphone: "Auriculares Beats 2019",
}

/* -------------------------------------------------------------------------- */
/* Translation Map                                                            */
/* -------------------------------------------------------------------------- */

const translations: Record<Language, Translation> = {
  English: english,
  French: french,
  Spanish: spanish,
}

/* -------------------------------------------------------------------------- */
/* Context Type                                                               */
/* -------------------------------------------------------------------------- */

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: Translation
}

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

export function LanguageProvider({
  children,
}: {
  children: ReactNode
}) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(
      "dashstack-language",
    )

    if (
      savedLanguage === "English" ||
      savedLanguage === "French" ||
      savedLanguage === "Spanish"
    ) {
      return savedLanguage
    }

    return "English"
  })

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)

    localStorage.setItem(
      "dashstack-language",
      newLanguage,
    )
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider",
    )
  }

  return context
}