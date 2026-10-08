import { useMemo, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Search,
  Trash2,
  X,
} from "lucide-react"
import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"
const PRODUCT_IMAGES = {
  watch:
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=150&auto=format&fit=crop&q=80",
  headphones:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80",
  dress:
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=150&auto=format&fit=crop&q=80",
  phone:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=80",
  camera:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&auto=format&fit=crop&q=80",
} as const
type Product = {
  id: number
  name: string
  category: "Digital Product" | "Fashion" | "Mobile" | "Electronic"
  price: number
  piece: number
  colors: string[]
  image: string
}
type Locale = "en" | "fr" | "es"
const COLOR_PRESETS = [
  "#000000",
  "#9F9F9F",
  "#E98F8F",
  "#F57C7C",
  "#4D88FF",
  "#E9C157",
  "#882853",
  "#7BC0F7",
  "#12163C",
  "#4343EE",
  "#283988",
  "#A32147",
]
const FIRST_PAGE: Product[] = [
  {
    id: 1,
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: 690,
    piece: 63,
    colors: ["#000000", "#9F9F9F", "#E98F8F"],
    image: PRODUCT_IMAGES.watch,
  },
  {
    id: 2,
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: 190,
    piece: 13,
    colors: ["#000000", "#F57C7C", "#4D88FF", "#E9C157"],
    image: PRODUCT_IMAGES.headphones,
  },
  {
    id: 3,
    name: "Women's Dress",
    category: "Fashion",
    price: 640,
    piece: 635,
    colors: ["#882853", "#7BC0F7", "#12163C", "#4343EE"],
    image: PRODUCT_IMAGES.dress,
  },
  {
    id: 4,
    name: "Samsung A50",
    category: "Mobile",
    price: 400,
    piece: 67,
    colors: ["#283988", "#000000", "#A32147"],
    image: PRODUCT_IMAGES.phone,
  },
  {
    id: 5,
    name: "Camera",
    category: "Electronic",
    price: 420,
    piece: 52,
    colors: ["#283988", "#000000", "#A32147"],
    image: PRODUCT_IMAGES.camera,
  },
  {
    id: 6,
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: 190,
    piece: 13,
    colors: ["#000000", "#F57C7C", "#4D88FF", "#E9C157"],
    image: PRODUCT_IMAGES.headphones,
  },
  {
    id: 7,
    name: "Women's Dress",
    category: "Fashion",
    price: 640,
    piece: 635,
    colors: ["#882853", "#7BC0F7", "#12163C", "#4343EE"],
    image: PRODUCT_IMAGES.dress,
  },
]
const EXTRA_PRODUCTS: Product[] = [
  {
    id: 8,
    name: "Apple Watch Series 5",
    category: "Digital Product",
    price: 720,
    piece: 42,
    colors: ["#000000", "#9F9F9F", "#E98F8F"],
    image: PRODUCT_IMAGES.watch,
  },
  {
    id: 9,
    name: "Studio Headphones",
    category: "Digital Product",
    price: 220,
    piece: 28,
    colors: ["#000000", "#F57C7C", "#4D88FF"],
    image: PRODUCT_IMAGES.headphones,
  },
  {
    id: 10,
    name: "Evening Dress",
    category: "Fashion",
    price: 580,
    piece: 112,
    colors: ["#882853", "#7BC0F7", "#12163C"],
    image: PRODUCT_IMAGES.dress,
  },
  {
    id: 11,
    name: "Galaxy Phone",
    category: "Mobile",
    price: 510,
    piece: 84,
    colors: ["#283988", "#000000", "#A32147"],
    image: PRODUCT_IMAGES.phone,
  },
  {
    id: 12,
    name: "Digital Camera",
    category: "Electronic",
    price: 460,
    piece: 39,
    colors: ["#283988", "#000000", "#A32147"],
    image: PRODUCT_IMAGES.camera,
  },
]
function buildProducts(): Product[] {
  const products = [...FIRST_PAGE, ...EXTRA_PRODUCTS]
  const categories: Product["category"][] = [
    "Digital Product",
    "Fashion",
    "Mobile",
    "Electronic",
  ]
  const images = [
    PRODUCT_IMAGES.watch,
    PRODUCT_IMAGES.headphones,
    PRODUCT_IMAGES.dress,
    PRODUCT_IMAGES.phone,
    PRODUCT_IMAGES.camera,
  ]
  const names = [
    "Apple Watch Series 4",
    "Microsoft Headsquare",
    "Women's Dress",
    "Samsung A50",
    "Camera",
  ]
  const prices = [690, 190, 640, 400, 420]
  const pieces = [63, 13, 635, 67, 52]
  const colors = [
    ["#000000", "#9F9F9F", "#E98F8F"],
    ["#000000", "#F57C7C", "#4D88FF", "#E9C157"],
    ["#882853", "#7BC0F7", "#12163C", "#4343EE"],
    ["#283988", "#000000", "#A32147"],
    ["#283988", "#000000", "#A32147"],
  ]
  for (let id = products.length + 1; id <= 78; id += 1) {
    const index = (id - 1) % 5
    products.push({
      id,
      name: names[index],
      category: categories[index],
      price: prices[index],
      piece: pieces[index],
      colors: colors[index],
      image: images[index],
    })
  }
  return products
}
const INITIAL_PRODUCTS = buildProducts()
const TRANSLATIONS: Record<Locale, Record<string, string>> = {
  en: {
    title: "Product Stock",
    search: "Search product name",
    image: "Image",
    productName: "Product Name",
    category: "Category",
    price: "Price",
    piece: "Piece",
    availableColor: "Available Color",
    action: "Action",
    cancel: "Cancel",
    save: "Save Changes",
    edit: "Edit Product Stock",
    noProducts: "No products found",
    showing: "Showing",
    of: "of",
    previous: "Previous",
    next: "Next",
    productNameField: "Product Name",
    categoryField: "Category",
    priceField: "Price ($)",
    pieceField: "Piece (Quantity)",
    colorsField: "Available Colors",
    chooseColor: "Choose a color",
    deleteConfirm: "Are you sure you want to delete this product?",
  },
  fr: {
    title: "Stock de produits",
    search: "Rechercher un produit",
    image: "Image",
    productName: "Nom du produit",
    category: "Categorie",
    price: "Prix",
    piece: "Piece",
    availableColor: "Couleur disponible",
    action: "Action",
    cancel: "Annuler",
    save: "Enregistrer",
    edit: "Modifier le stock",
    noProducts: "Aucun produit trouve",
    showing: "Affichage",
    of: "sur",
    previous: "Precedent",
    next: "Suivant",
    productNameField: "Nom du produit",
    categoryField: "Categorie",
    priceField: "Prix ($)",
    pieceField: "Quantite",
    colorsField: "Couleurs disponibles",
    chooseColor: "Choisir une couleur",
    deleteConfirm: "Voulez-vous vraiment supprimer ce produit ?",
  },
  es: {
    title: "Stock de productos",
    search: "Buscar nombre de producto",
    image: "Imagen",
    productName: "Nombre del producto",
    category: "Categoria",
    price: "Precio",
    piece: "Pieza",
    availableColor: "Color disponible",
    action: "Accion",
    cancel: "Cancelar",
    save: "Guardar cambios",
    edit: "Editar stock",
    noProducts: "No se encontraron productos",
    showing: "Mostrando",
    of: "de",
    previous: "Anterior",
    next: "Siguiente",
    productNameField: "Nombre del producto",
    categoryField: "Categoria",
    priceField: "Precio ($)",
    pieceField: "Cantidad",
    colorsField: "Colores disponibles",
    chooseColor: "Elegir un color",
    deleteConfirm: "Esta seguro de que desea eliminar este producto?",
  },
}
function getLocale(language: unknown): Locale {
  const value = String(language ?? "").trim().toLowerCase()
  if (value === "fr" || value.startsWith("french")) return "fr"
  if (value === "es" || value.startsWith("spanish")) return "es"
  return "en"
}
function formatPrice(price: number) {
  return `$${price.toFixed(2)}`
}
interface EditModalProps {
  product: Product
  t: Record<string, string>
  onClose: () => void
  onSave: (product: Product) => void
}
function EditModal({ product, t, onClose, onSave }: EditModalProps) {
  const [name, setName] = useState(product.name)
  const [category, setCategory] = useState<Product["category"]>(product.category)
  const [price, setPrice] = useState(String(product.price))
  const [piece, setPiece] = useState(String(product.piece))
  const [colors, setColors] = useState(product.colors)
  const [customColor, setCustomColor] = useState("#4880FF")
  const toggleColor = (color: string) => {
    setColors((current) =>
      current.includes(color)
        ? current.filter((item) => item !== color)
        : [...current, color],
    )
  }
  const save = () => {
    onSave({
      ...product,
      name: name.trim() || product.name,
      category,
      price: Math.max(0, Number(price) || 0),
      piece: Math.max(0, Number(piece) || 0),
      colors: colors.length > 0 ? colors : [customColor],
    })
  }
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="max-h-[calc(100vh-32px)] w-full max-w-[500px] overflow-y-auto rounded-[18px] border border-gray-100 bg-white p-6 shadow-2xl dark:border-[#313D4F] dark:bg-[#273142] sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-[20px] font-bold text-[#202224] dark:text-white">
            {t.edit}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-[#6B7280] transition-colors hover:bg-gray-100 hover:text-[#202224] dark:hover:bg-[#323D4E] dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-[#202224] dark:text-gray-200">
              {t.productNameField}
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-11 w-full rounded-lg border border-[#D5D5D5] bg-white px-3 text-sm text-[#202224] outline-none transition-colors focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-[#202224] dark:text-gray-200">
              {t.categoryField}
            </span>
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as Product["category"])
              }
              className="h-11 w-full rounded-lg border border-[#D5D5D5] bg-white px-3 text-sm text-[#202224] outline-none focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"
            >
              <option>Digital Product</option>
              <option>Fashion</option>
              <option>Mobile</option>
              <option>Electronic</option>
            </select>
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#202224] dark:text-gray-200">
                {t.priceField}
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="h-11 w-full rounded-lg border border-[#D5D5D5] bg-white px-3 text-sm text-[#202224] outline-none focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#202224] dark:text-gray-200">
                {t.pieceField}
              </span>
              <input
                type="number"
                min="0"
                value={piece}
                onChange={(event) => setPiece(event.target.value)}
                className="h-11 w-full rounded-lg border border-[#D5D5D5] bg-white px-3 text-sm text-[#202224] outline-none focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"
              />
            </label>
          </div>
          <div>
            <span className="mb-2 block text-[13px] font-semibold text-[#202224] dark:text-gray-200">
              {t.colorsField}
            </span>
            <div className="flex flex-wrap gap-2.5">
              {COLOR_PRESETS.map((color) => {
                const selected = colors.includes(color)
                return (
                  <button
                    key={color}
                    type="button"
                    title={color}
                    onClick={() => toggleColor(color)}
                    className={`h-8 w-8 rounded-full ring-2 ring-offset-2 transition-transform hover:scale-110 dark:ring-offset-[#273142] ${
                      selected ? "ring-[#4880FF]" : "ring-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                )
              })}
              <label
                title={t.chooseColor}
                className="relative flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-[#B9B9B9] text-[#7B7B7B] transition-colors hover:border-[#4880FF] hover:text-[#4880FF] dark:border-[#6C788B]"
              >
                <span className="pointer-events-none text-lg leading-none">
                  +
                </span>
                <input
                  type="color"
                  value={customColor}
                  onChange={(event) => {
                    const color = event.target.value.toUpperCase()
                    setCustomColor(color)
                    setColors((current) =>
                      current.includes(color) ? current : [...current, color],
                    )
                  }}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="mt-7 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-lg border border-[#D5D5D5] px-6 text-sm font-bold text-[#565656] transition-colors hover:bg-[#F5F6FA] dark:border-[#4B5668] dark:text-gray-200 dark:hover:bg-[#323D4E]"
          >
            {t.cancel}
          </button>
          <button
            type="button"
            onClick={save}
            className="h-11 rounded-lg bg-[#4880FF] px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#3B6EE8]"
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  )
}
export default function ProductStock() {
  const { language } = useLanguage()
  const locale = getLocale(language)
  const t = TRANSLATIONS[locale]
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const pageSize = 7
  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return products
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search),
    )
  }, [products, query])
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const startIndex = (safePage - 1) * pageSize
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize,
  )
  const handleSearch = (value: string) => {
    setQuery(value)
    setPage(1)
  }
  const handleDelete = (id: number) => {
    if (!window.confirm(t.deleteConfirm)) return
    setProducts((current) => current.filter((product) => product.id !== id))
    setPage((current) =>
      Math.min(
        current,
        Math.max(1, Math.ceil((filteredProducts.length - 1) / pageSize)),
      ),
    )
  }
  const handleSave = (updatedProduct: Product) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    )
    setEditingProduct(null)
  }
  const showingFrom = filteredProducts.length === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(
    startIndex + visibleProducts.length,
    filteredProducts.length,
  )
  return (
    <DashboardLayout>
      <section className="w-full min-w-0 overflow-x-hidden">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="font-sans text-[24px] font-bold leading-none tracking-[-0.11px] text-[#202224] dark:text-white sm:text-[32px]">
            {t.title}
          </h1>
          <div className="relative w-full sm:w-[255px]">
            <Search
              size={15}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A6A6A6]"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder={t.search}
              className="h-[38px] w-full rounded-[19px] border border-[#D5D5D5] bg-white pl-10 pr-4 text-[14px] text-[#202224] shadow-xs outline-none transition-colors placeholder:text-[#A6A6A6] focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"
            />
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-[14px] border border-[#B9B9B9]/30 bg-white shadow-sm dark:border-[#313D4F] dark:bg-[#273142]">
          <div className="w-full min-w-0 overflow-hidden">
            <table className="w-full table-fixed border-collapse">
              <thead className="h-[50px] border-b border-[#D5D5D5]/60 bg-[#FCFDFD] dark:border-[#313D4F] dark:bg-[#323D4E]">
                <tr>
                  <th className="w-[10%] px-3 text-left text-[14px] font-bold text-[#202224] dark:text-white">
                    {t.image}
                  </th>
                  <th className="px-3 text-left text-[14px] font-bold text-[#202224] dark:text-white">
                    {t.productName}
                  </th>
                  <th className="w-[17%] px-3 text-left text-[14px] font-bold text-[#202224] dark:text-white">
                    {t.category}
                  </th>
                  <th className="w-[12%] px-3 text-left text-[14px] font-bold text-[#202224] dark:text-white">
                    {t.price}
                  </th>
                  <th className="w-[9%] px-3 text-left text-[14px] font-bold text-[#202224] dark:text-white">
                    {t.piece}
                  </th>
                  <th className="w-[18%] px-3 text-left text-[14px] font-bold text-[#202224] dark:text-white">
                    {t.availableColor}
                  </th>
                  <th className="w-[10%] px-3 text-center text-[14px] font-bold text-[#202224] dark:text-white">
                    {t.action}
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="h-[85px] border-b border-[#D5D5D5]/40 text-[14px] font-semibold text-[#202224] transition-colors hover:bg-[#4880FF]/[0.03] dark:border-[#313D4F] dark:text-gray-100 dark:hover:bg-[#323D4E]/50"
                  >
                    <td className="px-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-[60px] w-[60px] rounded-[8px] object-cover shadow-xs transition-transform hover:scale-105"
                      />
                    </td>
                    <td className="whitespace-nowrap px-3">{product.name}</td>
                    <td className="whitespace-nowrap px-3">{product.category}</td>
                    <td className="whitespace-nowrap px-3">{formatPrice(product.price)}</td>
                    <td className="px-3">{product.piece}</td>
                    <td className="px-3">
                      <div className="flex items-center gap-[10px]">
                        {product.colors.map((color) => (
                          <span
                            key={color}
                            title={color}
                            className="h-[20px] w-[20px] cursor-pointer rounded-full shadow-2xs ring-1 ring-black/10 transition-transform hover:scale-125 dark:ring-white/15"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-3 text-center">
                      <div className="inline-flex items-center divide-x divide-[#D5D5D5] overflow-hidden rounded-[8px] border border-[#D5D5D5] bg-[#FAFBFD] dark:divide-[#4B5668] dark:border-[#4B5668] dark:bg-[#323D4E]">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(product)}
                          title="Edit"
                          className="flex h-[32px] w-[44px] items-center justify-center text-[#202224]/60 transition-colors hover:bg-[#4880FF]/10 hover:text-[#4880FF] dark:text-gray-300"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          title="Delete"
                          className="flex h-[32px] w-[44px] items-center justify-center text-[#EF3826] transition-colors hover:bg-[#EF3826]/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visibleProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="h-[180px] px-6 text-center text-sm text-[#8E8E8E] dark:text-gray-400"
                    >
                      {t.noProducts}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-[14px] font-semibold text-[#202224]/60 dark:text-gray-400">
            {t.showing} {showingFrom.toString().padStart(2, "0")}-
            {showingTo.toString().padStart(2, "0")} {t.of}{" "}
            {filteredProducts.length}
          </p>
          <div className="inline-flex shrink-0 divide-x divide-[#D5D5D5] overflow-hidden rounded-[8px] border border-[#D5D5D5] bg-[#FAFBFD] dark:divide-[#313D4F] dark:border-[#313D4F] dark:bg-[#273142]">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              aria-label={t.previous}
              className="flex h-[32px] w-[42px] items-center justify-center text-[#7B7B7B] transition-colors hover:bg-[#4880FF]/10 hover:text-[#4880FF] disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-300"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button"
              disabled={safePage >= pageCount}
              onClick={() =>
                setPage((current) => Math.min(pageCount, current + 1))
              }
              aria-label={t.next}
              className="flex h-[32px] w-[42px] items-center justify-center text-[#7B7B7B] transition-colors hover:bg-[#4880FF]/10 hover:text-[#4880FF] disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-300"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>
      {editingProduct && (
        <EditModal
          product={editingProduct}
          t={t}
          onClose={() => setEditingProduct(null)}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  )
}