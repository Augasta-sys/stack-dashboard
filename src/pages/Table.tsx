import { useMemo, useState } from "react"
import {
  Edit3,
  Trash2,
  X,
  Save,
} from "lucide-react"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"

type Locale = "English" | "French" | "Spanish"

type OrderStatus = "Completed" | "Processing" | "Rejected"

interface Order {
  id: string
  name: string
  address: string
  date: string
  type: string
  status: OrderStatus
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  piece: number
  colors: string[]
  image: string
}

interface ProductForm {
  name: string
  category: string
  price: string
  piece: string
}

const ORDERS: Order[] = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    date: "14 Feb 2019",
    type: "Electric",
    status: "Completed",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "14 Feb 2019",
    type: "Book",
    status: "Processing",
  },
  {
    id: "00003",
    name: "Darrell Caldwell",
    address: "8587 Frida Ports",
    date: "14 Feb 2019",
    type: "Medicine",
    status: "Rejected",
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    address: "768 Destiny Lake Suite 600",
    date: "14 Feb 2019",
    type: "Mobile",
    status: "Completed",
  },
  {
    id: "00005",
    name: "Alan Cain",
    address: "042 Mylene Throughway",
    date: "14 Feb 2019",
    type: "Watch",
    status: "Processing",
  },
  {
    id: "00006",
    name: "Alfred Murray",
    address: "543 Weimann Mountain",
    date: "14 Feb 2019",
    type: "Medicine",
    status: "Completed",
  },
]

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: 690,
    piece: 63,
    colors: ["#000000", "#9F9F9F", "#E98F8F"],
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 2,
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: 190,
    piece: 13,
    colors: ["#000000", "#F57C7C", "#4D88FF", "#E9C157"],
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 3,
    name: "Women's Dress",
    category: "Fashion",
    price: 640,
    piece: 635,
    colors: ["#882853", "#7BC0F7", "#12163C", "#4343EE"],
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=160&h=160&q=85",
  },
]

const translations: Record<
  Locale,
  {
    title: string
    orderHeaders: string[]
    productHeaders: string[]
    edit: string
    delete: string
    save: string
    cancel: string
    completed: string
    processing: string
    rejected: string
    editProduct: string
    productName: string
    category: string
    price: string
    piece: string
    deleteConfirm: string
    noProducts: string
  }
> = {
  English: {
    title: "Table",
    orderHeaders: ["ID", "NAME", "ADDRESS", "DATE", "TYPE", "STATUS"],
    productHeaders: [
      "Image",
      "Product Name",
      "Category",
      "Price",
      "Piece",
      "Available Color",
      "Action",
    ],
    edit: "Edit",
    delete: "Delete",
    save: "Save Changes",
    cancel: "Cancel",
    completed: "Completed",
    processing: "Processing",
    rejected: "Rejected",
    editProduct: "Edit Product",
    productName: "Product Name",
    category: "Category",
    price: "Price",
    piece: "Piece",
    deleteConfirm: "Delete this product?",
    noProducts: "No products available.",
  },
  French: {
    title: "Tableau",
    orderHeaders: ["ID", "NOM", "ADRESSE", "DATE", "TYPE", "STATUT"],
    productHeaders: [
      "Image",
      "Nom du produit",
      "Catégorie",
      "Prix",
      "Pièce",
      "Couleur disponible",
      "Action",
    ],
    edit: "Modifier",
    delete: "Supprimer",
    save: "Enregistrer",
    cancel: "Annuler",
    completed: "Terminé",
    processing: "En traitement",
    rejected: "Rejeté",
    editProduct: "Modifier le produit",
    productName: "Nom du produit",
    category: "Catégorie",
    price: "Prix",
    piece: "Pièce",
    deleteConfirm: "Supprimer ce produit ?",
    noProducts: "Aucun produit disponible.",
  },
  Spanish: {
    title: "Tabla",
    orderHeaders: ["ID", "NOMBRE", "DIRECCIÓN", "FECHA", "TIPO", "ESTADO"],
    productHeaders: [
      "Imagen",
      "Nombre del producto",
      "Categoría",
      "Precio",
      "Pieza",
      "Color disponible",
      "Acción",
    ],
    edit: "Editar",
    delete: "Eliminar",
    save: "Guardar cambios",
    cancel: "Cancelar",
    completed: "Completado",
    processing: "Procesando",
    rejected: "Rechazado",
    editProduct: "Editar producto",
    productName: "Nombre del producto",
    category: "Categoría",
    price: "Precio",
    piece: "Pieza",
    deleteConfirm: "¿Eliminar este producto?",
    noProducts: "No hay productos disponibles.",
  },
}

function statusLabel(
  status: OrderStatus,
  t: (typeof translations)[Locale],
) {
  if (status === "Completed") return t.completed
  if (status === "Processing") return t.processing
  return t.rejected
}

function statusClass(status: OrderStatus) {
  if (status === "Completed") {
    return "bg-[#00B69B]/20 text-[#00B69B] dark:bg-[#00B69B] dark:text-white"
  }

  if (status === "Processing") {
    return "bg-[#6C2BFF]/20 text-[#6C2BFF] dark:bg-[#6C2BFF] dark:text-white"
  }

  return "bg-[#F93C65]/20 text-[#F93C65] dark:bg-[#F93C65] dark:text-white"
}

const fieldClass =
  "h-[48px] w-full rounded-[8px] border border-[#D5D5D5] bg-[#F5F6FA] px-4 text-[14px] text-[#202224] outline-none transition-colors focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white"

export default function Table() {
  const { language } = useLanguage()
  const t = translations[language as Locale] ?? translations.English

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<ProductForm>({
    name: "",
    category: "",
    price: "",
    piece: "",
  })

  const money = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }),
    [],
  )

  const openEdit = (product: Product) => {
    setEditingProduct(product)
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      piece: String(product.piece),
    })
  }

  const closeEdit = () => {
    setEditingProduct(null)
  }

  const saveProduct = () => {
    if (!editingProduct || !form.name.trim()) return

    setProducts((current) =>
      current.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              name: form.name.trim(),
              category: form.category.trim() || product.category,
              price: Number(form.price) || 0,
              piece: Number(form.piece) || 0,
            }
          : product,
      ),
    )

    closeEdit()
  }

  const deleteProduct = (product: Product) => {
    const confirmed = window.confirm(
      `${t.deleteConfirm}\n\n${product.name}`,
    )

    if (!confirmed) return

    setProducts((current) =>
      current.filter((item) => item.id !== product.id),
    )
  }

  return (
    <DashboardLayout>
      <section className="w-full">
        <h1 className="mb-[28px] font-sans text-[24px] font-bold leading-none tracking-[-0.11px] text-[#202224] dark:text-white sm:text-[32px]">
          {t.title}
        </h1>

        <div className="flex flex-col gap-[30px] sm:gap-[40px]">
          {/* ORDER LISTS */}
          <div className="w-full overflow-hidden rounded-[14px] border border-[#B9B9B9]/30 bg-white shadow-sm dark:border-[#313D4F] dark:bg-[#273142]">
            <div className="hidden md:block">
              <table className="w-full table-fixed border-collapse">
                <colgroup>
                  <col className="w-[10%]" />
                  <col className="w-[16%]" />
                  <col className="w-[27%]" />
                  <col className="w-[15%]" />
                  <col className="w-[13%]" />
                  <col className="w-[19%]" />
                </colgroup>

                <thead>
                  <tr className="bg-[#FCFDFD] dark:bg-[#323D4E]">
                    {t.orderHeaders.map((header) => (
                      <th
                        key={header}
                        className="h-[48px] whitespace-nowrap px-3 text-left text-[12px] font-bold text-[#202224] sm:px-4 sm:text-[13px] lg:px-5 lg:text-[14px] dark:text-white"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {ORDERS.map((order) => (
                    <tr
                      key={order.id}
                      className="border-t border-[#D5D5D5] transition-colors hover:bg-[#4880FF]/[0.04] dark:border-[#3A4658] dark:hover:bg-[#323D4E]"
                    >
                      <td className="px-3 py-[22px] text-[12px] font-semibold text-[#202224] sm:px-4 sm:text-[13px] lg:px-5 lg:text-[14px] dark:text-white">
                        {order.id}
                      </td>
                      <td className="truncate px-3 py-[22px] text-[12px] text-[#202224] sm:px-4 sm:text-[13px] lg:px-5 lg:text-[14px] dark:text-gray-100">
                        {order.name}
                      </td>
                      <td className="truncate px-3 py-[22px] text-[12px] text-[#202224] sm:px-4 sm:text-[13px] lg:px-5 lg:text-[14px] dark:text-gray-100">
                        {order.address}
                      </td>
                      <td className="whitespace-nowrap px-3 py-[22px] text-[12px] text-[#202224] sm:px-4 sm:text-[13px] lg:px-5 lg:text-[14px] dark:text-gray-100">
                        {order.date}
                      </td>
                      <td className="truncate px-3 py-[22px] text-[12px] text-[#202224] sm:px-4 sm:text-[13px] lg:px-5 lg:text-[14px] dark:text-gray-100">
                        {order.type}
                      </td>
                      <td className="px-3 py-[22px] sm:px-4 lg:px-5">
                        <span
                          className={[
                            "inline-flex min-w-[76px] items-center justify-center rounded-[5px] px-2 py-[7px] text-[11px] font-bold sm:min-w-[88px] sm:text-[12px]",
                            statusClass(order.status),
                          ].join(" ")}
                        >
                          {statusLabel(order.status, t)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile order cards - prevents horizontal scrolling */}
            <div className="divide-y divide-[#D5D5D5] md:hidden dark:divide-[#3A4658]">
              {ORDERS.map((order) => (
                <article
                  key={order.id}
                  className="p-4 transition-colors hover:bg-[#4880FF]/[0.04] dark:hover:bg-[#323D4E]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-[13px] font-bold text-[#202224] dark:text-white">
                      #{order.id}
                    </span>
                    <span
                      className={[
                        "rounded-[5px] px-3 py-1.5 text-[11px] font-bold",
                        statusClass(order.status),
                      ].join(" ")}
                    >
                      {statusLabel(order.status, t)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[12px]">
                    <div className="min-w-0">
                      <p className="mb-1 text-[#888]">Name</p>
                      <p className="truncate font-semibold text-[#202224] dark:text-white">
                        {order.name}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1 text-[#888]">Type</p>
                      <p className="truncate text-[#202224] dark:text-gray-100">
                        {order.type}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1 text-[#888]">Address</p>
                      <p className="truncate text-[#202224] dark:text-gray-100">
                        {order.address}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-[#888]">Date</p>
                      <p className="text-[#202224] dark:text-gray-100">
                        {order.date}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* PRODUCT STOCK */}
          <div className="w-full overflow-hidden rounded-[14px] border border-[#B9B9B9]/30 bg-white shadow-sm dark:border-[#313D4F] dark:bg-[#273142]">
            <div className="hidden lg:block">
              <table className="w-full table-fixed border-collapse">
                <colgroup>
                  <col className="w-[10%]" />
                  <col className="w-[18%]" />
                  <col className="w-[15%]" />
                  <col className="w-[10%]" />
                  <col className="w-[8%]" />
                  <col className="w-[25%]" />
                  <col className="w-[14%]" />
                </colgroup>

                <thead>
                  <tr className="bg-[#FCFDFD] dark:bg-[#323D4E]">
                    {t.productHeaders.map((header) => (
                      <th
                        key={header}
                        className="h-[48px] whitespace-nowrap px-3 text-left text-[12px] font-bold text-[#202224] xl:px-4 xl:text-[14px] dark:text-white"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-t border-[#D5D5D5] transition-colors hover:bg-[#4880FF]/[0.04] dark:border-[#3A4658] dark:hover:bg-[#323D4E]"
                    >
                      <td className="px-3 py-4 xl:px-4 xl:py-[22px]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-[48px] w-[48px] rounded-[8px] object-cover xl:h-[60px] xl:w-[60px]"
                        />
                      </td>

                      <td className="truncate px-3 py-4 text-[12px] text-[#202224] xl:px-4 xl:text-[14px] dark:text-white">
                        {product.name}
                      </td>

                      <td className="truncate px-3 py-4 text-[12px] text-[#202224] xl:px-4 xl:text-[14px] dark:text-gray-100">
                        {product.category}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-[12px] text-[#202224] xl:px-4 xl:text-[14px] dark:text-gray-100">
                        {money.format(product.price)}
                      </td>

                      <td className="px-3 py-4 text-[12px] text-[#202224] xl:px-4 xl:text-[14px] dark:text-gray-100">
                        {product.piece}
                      </td>

                      <td className="px-3 py-4 xl:px-4">
                        <div className="flex items-center gap-2 xl:gap-4">
                          {product.colors.map((color) => (
                            <span
                              key={color}
                              title={color}
                              className="h-4 w-4 shrink-0 rounded-full border border-black/5 shadow-sm transition-transform hover:scale-125 xl:h-5 xl:w-5 dark:border-white/10"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </td>

                      <td className="px-3 py-4 xl:px-4">
                        <div className="inline-flex overflow-hidden rounded-[8px] border border-[#D5D5D5] dark:border-[#4B5668]">
                          <button
                            type="button"
                            title={t.edit}
                            onClick={() => openEdit(product)}
                            className="flex h-[36px] w-[42px] items-center justify-center text-[#606060] transition-colors hover:bg-[#4880FF] hover:text-white dark:text-gray-200 dark:hover:bg-[#4880FF]"
                          >
                            <Edit3 size={16} strokeWidth={1.8} />
                          </button>

                          <button
                            type="button"
                            title={t.delete}
                            onClick={() => deleteProduct(product)}
                            className="flex h-[36px] w-[42px] items-center justify-center border-l border-[#D5D5D5] text-[#F93C65] transition-colors hover:bg-[#F93C65] hover:text-white dark:border-[#4B5668]"
                          >
                            <Trash2 size={16} strokeWidth={1.8} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {products.length === 0 && (
                <p className="px-6 py-10 text-center text-sm text-[#777] dark:text-gray-400">
                  {t.noProducts}
                </p>
              )}
            </div>

            {/* Mobile / tablet product cards - no horizontal scrollbar */}
            <div className="grid grid-cols-1 gap-4 p-4 lg:hidden sm:grid-cols-2">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="rounded-[12px] border border-[#D5D5D5] p-4 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-[#4B5668]"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[64px] w-[64px] shrink-0 rounded-[9px] object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[14px] font-bold text-[#202224] dark:text-white">
                        {product.name}
                      </h3>
                      <p className="mt-1 truncate text-[12px] text-[#666] dark:text-gray-300">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
                    <div>
                      <p className="text-[#888]">{t.price}</p>
                      <p className="mt-1 font-semibold text-[#202224] dark:text-white">
                        {money.format(product.price)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[#888]">{t.piece}</p>
                      <p className="mt-1 font-semibold text-[#202224] dark:text-white">
                        {product.piece}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="h-4 w-4 rounded-full border border-black/5 dark:border-white/10"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    <div className="inline-flex overflow-hidden rounded-[8px] border border-[#D5D5D5] dark:border-[#4B5668]">
                      <button
                        type="button"
                        title={t.edit}
                        onClick={() => openEdit(product)}
                        className="flex h-[36px] w-[42px] items-center justify-center text-[#606060] transition-colors hover:bg-[#4880FF] hover:text-white dark:text-gray-200 dark:hover:bg-[#4880FF]"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        title={t.delete}
                        onClick={() => deleteProduct(product)}
                        className="flex h-[36px] w-[42px] items-center justify-center border-l border-[#D5D5D5] text-[#F93C65] transition-colors hover:bg-[#F93C65] hover:text-white dark:border-[#4B5668]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {products.length === 0 && (
                <p className="col-span-full py-8 text-center text-sm text-[#777] dark:text-gray-400">
                  {t.noProducts}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeEdit()
          }}
        >
          <div className="w-full max-w-[520px] rounded-[14px] border border-[#D5D5D5] bg-white p-5 shadow-2xl sm:p-7 dark:border-[#313D4F] dark:bg-[#273142]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-[20px] font-bold text-[#202224] dark:text-white">
                {t.editProduct}
              </h2>

              <button
                type="button"
                onClick={closeEdit}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#666] transition-colors hover:bg-[#F5F6FA] hover:text-[#202224] dark:text-gray-300 dark:hover:bg-[#323D4E] dark:hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mb-5 flex items-center gap-4 rounded-[10px] bg-[#F5F6FA] p-3 dark:bg-[#323D4E]">
              <img
                src={editingProduct.image}
                alt={editingProduct.name}
                className="h-[60px] w-[60px] rounded-[8px] object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold text-[#202224] dark:text-white">
                  {editingProduct.name}
                </p>
                <p className="mt-1 text-[12px] text-[#777] dark:text-gray-300">
                  ID #{String(editingProduct.id).padStart(5, "0")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-[13px] font-semibold text-[#606060] dark:text-gray-300">
                  {t.productName}
                </span>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[13px] font-semibold text-[#606060] dark:text-gray-300">
                  {t.category}
                </span>
                <input
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[13px] font-semibold text-[#606060] dark:text-gray-300">
                  {t.price}
                </span>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      price: event.target.value,
                    }))
                  }
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[13px] font-semibold text-[#606060] dark:text-gray-300">
                  {t.piece}
                </span>
                <input
                  type="number"
                  min="0"
                  value={form.piece}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      piece: event.target.value,
                    }))
                  }
                  className={fieldClass}
                />
              </label>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeEdit}
                className="h-[46px] rounded-[8px] border border-[#D5D5D5] px-6 text-[14px] font-bold text-[#606060] transition-colors hover:bg-[#F5F6FA] dark:border-[#4B5668] dark:text-gray-200 dark:hover:bg-[#323D4E]"
              >
                {t.cancel}
              </button>

              <button
                type="button"
                onClick={saveProduct}
                disabled={!form.name.trim()}
                className="flex h-[46px] items-center justify-center gap-2 rounded-[8px] bg-[#4880FF] px-6 text-[14px] font-bold text-white transition-all hover:bg-[#3B6EE8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={17} />
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
