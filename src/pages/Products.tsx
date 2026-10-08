import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Pencil,
  Star,
  X,
} from "lucide-react"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import {
  useProducts,
  type Product,
} from "../context/ProductsContext"
import { useLanguage } from "../context/LanguageContext"

/* =========================================================
   BANNER TRANSLATIONS
========================================================= */

const bannerTranslations = {
  English: [
    {
      date: "September 12-22",
      title: "Enjoy free home\ndelivery in this summer",
      subtitle:
        "Designer Dresses - Pick from trendy Designer Dress.",
      button: "Get Started",
    },
    {
      date: "October 01-15",
      title:
        "Exclusive 40% discount\non smart gadgets",
      subtitle:
        "Latest Apple Watches & Beats Audio collection.",
      button: "Shop Now",
    },
    {
      date: "Flash Sale Weekend",
      title:
        "Upgrade your workspace\nwith premium gear",
      subtitle:
        "Free express shipping on all orders over $50.",
      button: "Explore Deals",
    },
  ],

  French: [
    {
      date: "12-22 septembre",
      title:
        "Profitez de la livraison\ngratuite à domicile cet été",
      subtitle:
        "Robes tendance - Choisissez parmi nos robes de créateurs.",
      button: "Commencer",
    },
    {
      date: "1-15 octobre",
      title:
        "Profitez de 40 % de réduction\nsur les gadgets intelligents",
      subtitle:
        "Découvrez les dernières Apple Watch et les produits Beats.",
      button: "Acheter maintenant",
    },
    {
      date: "Week-end des soldes",
      title:
        "Améliorez votre espace\nde travail avec nos produits premium",
      subtitle:
        "Livraison express gratuite pour toute commande de plus de 50 $.",
      button: "Découvrir les offres",
    },
  ],

  Spanish: [
    {
      date: "12-22 de septiembre",
      title:
        "Disfruta de envío\ngratis a domicilio este verano",
      subtitle:
        "Vestidos de diseñador - Elige entre nuestros vestidos de moda.",
      button: "Comenzar",
    },
    {
      date: "1-15 de octubre",
      title:
        "40 % de descuento exclusivo\nen dispositivos inteligentes",
      subtitle:
        "Descubre los últimos Apple Watch y productos Beats.",
      button: "Comprar ahora",
    },
    {
      date: "Fin de semana de ofertas",
      title:
        "Mejora tu espacio de trabajo\ncon productos premium",
      subtitle:
        "Envío exprés gratuito en pedidos superiores a $50.",
      button: "Ver ofertas",
    },
  ],
}

/* =========================================================
   PAGE TRANSLATIONS
========================================================= */

const pageTranslations = {
  English: {
    products: "Products",
    favorites: "Favorites",

    editProduct: "Edit Product",
    productTitle: "Product Title",
    price: "Price ($)",
    rating: "Rating (1-5)",
    reviewsCount: "Reviews Count",

    cancel: "Cancel",
    saveChanges: "Save Changes",

    added: "Added to Favorites",
    removed: "Removed from Favorites",

    removeFromFavorites: "Remove from favorites",

    noFavorites: "No favorite products yet.",

    browse:
      "Add products to your wishlist from the Products page.",
  },

  French: {
    products: "Produits",
    favorites: "Favoris",

    editProduct: "Modifier le produit",
    productTitle: "Nom du produit",
    price: "Prix ($)",
    rating: "Évaluation (1-5)",
    reviewsCount: "Nombre d'avis",

    cancel: "Annuler",
    saveChanges: "Enregistrer les modifications",

    added: "Ajouté aux favoris",
    removed: "Retiré des favoris",

    removeFromFavorites: "Retirer des favoris",

    noFavorites: "Aucun produit favori.",

    browse:
      "Ajoutez des produits à vos favoris depuis la page Produits.",
  },

  Spanish: {
    products: "Productos",
    favorites: "Favoritos",

    editProduct: "Editar producto",
    productTitle: "Nombre del producto",
    price: "Precio ($)",
    rating: "Valoración (1-5)",
    reviewsCount: "Número de reseñas",

    cancel: "Cancelar",
    saveChanges: "Guardar cambios",

    added: "Añadido a favoritos",
    removed: "Eliminado de favoritos",

    removeFromFavorites: "Eliminar de favoritos",

    noFavorites: "No hay productos favoritos.",

    browse:
      "Añade productos a favoritos desde la página Productos.",
  },
}

/* =========================================================
   PRODUCT NAME TRANSLATIONS
========================================================= */

const productNameTranslations = {
  English: {
    "1": "Apple Watch Series 4",
    "2": "Girl Handy Beg",
    "3": "Beats Headphone",
    "4": "Smart Watch Pro",
    "5": "Wireless Earbuds",
    "6": "Premium Smart Watch",
  },

  French: {
    "1": "Apple Watch Série 4",
    "2": "Sac à main pour femme",
    "3": "Casque Beats",
    "4": "Montre intelligente Pro",
    "5": "Écouteurs sans fil",
    "6": "Montre intelligente Premium",
  },

  Spanish: {
    "1": "Apple Watch Serie 4",
    "2": "Bolso de mano para mujer",
    "3": "Auriculares Beats",
    "4": "Reloj inteligente Pro",
    "5": "Auriculares inalámbricos",
    "6": "Reloj inteligente Premium",
  },
}

/* =========================================================
   PRODUCT IMAGE SLIDER
========================================================= */

function ProductImageSlider({
  product,
}: {
  product: Product
}) {
  const [imageIndex, setImageIndex] =
    useState(0)

  const previousImage = () => {
    setImageIndex((current) =>
      current === 0
        ? product.images.length - 1
        : current - 1,
    )
  }

  const nextImage = () => {
    setImageIndex(
      (current) =>
        (current + 1) % product.images.length,
    )
  }

  return (
    <div
      className="
        group
        relative
        flex
        h-[260px]
        items-center
        justify-center
        overflow-hidden
        bg-white
        p-5
        sm:h-[317px]
        sm:p-6
      "
    >
      <img
        src={product.images[imageIndex]}
        alt={product.title}
        className="
          h-[220px]
          w-[90%]
          object-contain
          transition-transform
          duration-500
          group-hover:scale-[1.04]
          sm:h-[270px]
        "
      />

      {/* LEFT IMAGE ARROW */}
      <button
        type="button"
        aria-label="Previous image"
        onClick={previousImage}
        className="
          absolute
          left-3
          top-1/2
          flex
          h-[34px]
          w-[34px]
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#F9F9F9]/95
          text-[#202224]
          opacity-0
          shadow-sm
          transition-all
          duration-200
          hover:bg-[#4880FF]
          hover:text-white
          group-hover:opacity-100
          dark:bg-[#323D4E]
          dark:text-white
          dark:hover:bg-[#4880FF]
          sm:left-3.5
        "
      >
        <ChevronLeft size={19} />
      </button>

      {/* RIGHT IMAGE ARROW */}
      <button
        type="button"
        aria-label="Next image"
        onClick={nextImage}
        className="
          absolute
          right-3
          top-1/2
          flex
          h-[34px]
          w-[34px]
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#F9F9F9]/95
          text-[#202224]
          opacity-0
          shadow-sm
          transition-all
          duration-200
          hover:bg-[#4880FF]
          hover:text-white
          group-hover:opacity-100
          dark:bg-[#323D4E]
          dark:text-white
          dark:hover:bg-[#4880FF]
          sm:right-3.5
        "
      >
        <ChevronRight size={19} />
      </button>

      {/* IMAGE INDICATORS */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
        {product.images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
            className={[
              "h-1.5 rounded-full transition-all",
              imageIndex === index
                ? "w-4 bg-[#4880FF]"
                : "w-1.5 bg-[#A6A6A6]",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  )
}

/* =========================================================
   STAR RATING
========================================================= */

function ProductRating({
  rating,
  reviewsCount,
}: {
  rating: number
  reviewsCount: number
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star
        const half =
          !filled && rating >= star - 0.5

        return (
          <div
            key={star}
            className="relative h-[16px] w-[16px]"
          >
            <Star
              size={16}
              strokeWidth={1.8}
              className="
                absolute
                inset-0
                text-[#D5D5D5]
                dark:text-[#4B5668]
              "
            />

            {(filled || half) && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  width: filled ? "100%" : "50%",
                }}
              >
                <Star
                  size={16}
                  strokeWidth={1.8}
                  className="fill-[#FF9500] text-[#FF9500]"
                />
              </div>
            )}
          </div>
        )
      })}

      <span className="ml-1 text-[14px] font-semibold text-[#202224]/40 dark:text-gray-400">
        ({reviewsCount})
      </span>
    </div>
  )
}

/* =========================================================
   EDIT PRODUCT MODAL
========================================================= */

function EditProductModal({
  product,
  onClose,
}: {
  product: Product
  onClose: () => void
}) {
  const { updateProduct } = useProducts()
  const { language } = useLanguage()

  const t =
    pageTranslations[language] ??
    pageTranslations.English

  const [title, setTitle] = useState(
    product.title,
  )

  const [price, setPrice] = useState(
    String(product.price),
  )

  const [rating, setRating] = useState(
    String(product.rating),
  )

  const [reviewsCount, setReviewsCount] =
    useState(String(product.reviewsCount))

  const handleSave = () => {
    const numericPrice = Number(price)
    const numericRating = Number(rating)
    const numericReviews = Number(reviewsCount)

    if (!title.trim()) {
      return
    }

    if (
      Number.isNaN(numericPrice) ||
      numericPrice < 0
    ) {
      return
    }

    if (
      Number.isNaN(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return
    }

    if (
      Number.isNaN(numericReviews) ||
      numericReviews < 0
    ) {
      return
    }

    updateProduct({
      ...product,
      title: title.trim(),
      price: numericPrice,
      rating: numericRating,
      reviewsCount: numericReviews,
    })

    onClose()
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
        backdrop-blur-[2px]
      "
      onMouseDown={onClose}
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-[480px]
          overflow-y-auto
          rounded-[16px]
          border
          border-[#D5D5D5]
          bg-white
          p-5
          shadow-2xl
          dark:border-[#313D4F]
          dark:bg-[#273142]
          sm:p-6
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[22px] font-extrabold text-[#202224] dark:text-white">
            {t.editProduct}
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
              bg-[#F5F6FA]
              text-[#202224]
              transition
              hover:bg-[#F93C65]
              hover:text-white
              dark:bg-[#323D4E]
              dark:text-white
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* PRODUCT TITLE */}
        <div className="mb-4">
          <label className="mb-2 block text-[13px] font-bold text-[#202224] dark:text-white">
            {t.productTitle}
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            className="
              h-[45px]
              w-full
              rounded-lg
              border
              border-[#D5D5D5]
              bg-white
              px-4
              text-[14px]
              text-[#202224]
              outline-none
              focus:border-[#4880FF]
              dark:border-[#4B5668]
              dark:bg-[#323D4E]
              dark:text-white
            "
          />
        </div>

        {/* PRICE */}
        <div className="mb-4">
          <label className="mb-2 block text-[13px] font-bold text-[#202224] dark:text-white">
            {t.price}
          </label>

          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(event) =>
              setPrice(event.target.value)
            }
            className="
              h-[45px]
              w-full
              rounded-lg
              border
              border-[#D5D5D5]
              bg-white
              px-4
              text-[14px]
              text-[#202224]
              outline-none
              focus:border-[#4880FF]
              dark:border-[#4B5668]
              dark:bg-[#323D4E]
              dark:text-white
            "
          />
        </div>

        {/* RATING */}
        <div className="mb-4">
          <label className="mb-2 block text-[13px] font-bold text-[#202224] dark:text-white">
            {t.rating}
          </label>

          <input
            type="number"
            min="1"
            max="5"
            step="0.5"
            value={rating}
            onChange={(event) =>
              setRating(event.target.value)
            }
            className="
              h-[45px]
              w-full
              rounded-lg
              border
              border-[#D5D5D5]
              bg-white
              px-4
              text-[14px]
              text-[#202224]
              outline-none
              focus:border-[#4880FF]
              dark:border-[#4B5668]
              dark:bg-[#323D4E]
              dark:text-white
            "
          />
        </div>

        {/* REVIEWS */}
        <div className="mb-6">
          <label className="mb-2 block text-[13px] font-bold text-[#202224] dark:text-white">
            {t.reviewsCount}
          </label>

          <input
            type="number"
            min="0"
            value={reviewsCount}
            onChange={(event) =>
              setReviewsCount(event.target.value)
            }
            className="
              h-[45px]
              w-full
              rounded-lg
              border
              border-[#D5D5D5]
              bg-white
              px-4
              text-[14px]
              text-[#202224]
              outline-none
              focus:border-[#4880FF]
              dark:border-[#4B5668]
              dark:bg-[#323D4E]
              dark:text-white
            "
          />
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              bg-[#E8EDF5]
              px-5
              py-2.5
              text-[14px]
              font-bold
              text-[#202224]
              transition
              hover:bg-[#DCE3EF]
              dark:bg-[#4B5668]
              dark:text-white
            "
          >
            {t.cancel}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="
              rounded-lg
              bg-[#4880FF]
              px-5
              py-2.5
              text-[14px]
              font-bold
              text-white
              transition
              hover:-translate-y-0.5
              hover:bg-[#3B6EE8]
            "
          >
            {t.saveChanges}
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  onEdit,
  showToast,
}: {
  product: Product
  onEdit: (product: Product) => void
  showToast: (message: string) => void
}) {
  const { toggleFavorite } = useProducts()
  const { language } = useLanguage()

  const t =
    pageTranslations[language] ??
    pageTranslations.English

  const translatedTitle =
    productNameTranslations[language][
      product.id as keyof (typeof productNameTranslations)["English"]
    ] ?? product.title

  const handleFavorite = () => {
    toggleFavorite(product.id)

    showToast(
      product.isFavorite
        ? t.removed
        : t.added,
    )
  }

  return (
    <article
      className="
        group
        flex
        min-h-[530px]
        flex-col
        overflow-hidden
        rounded-[14px]
        border
        border-[#B9B9B9]/20
        bg-white
        shadow-[6px_6px_54px_rgba(0,0,0,0.05)]
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-xl
        dark:border-[#313D4F]
        dark:bg-[#273142]
      "
    >
      <ProductImageSlider product={product} />

      <div
        className="
          flex
          flex-1
          flex-col
          justify-between
          bg-white
          p-5
          dark:bg-[#273142]
          sm:p-6
        "
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="mb-2 text-[18px] font-bold leading-[20px] text-[#202224] dark:text-white">
              {translatedTitle}
            </h3>

            <p className="mb-2.5 text-[16px] font-bold text-[#4880FF]">
              ${product.price.toFixed(2)}
            </p>

            <ProductRating
              rating={product.rating}
              reviewsCount={product.reviewsCount}
            />
          </div>

          <button
            type="button"
            aria-label={
              product.isFavorite
                ? t.removed
                : t.added
            }
            onClick={handleFavorite}
            className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#F9F9F9]
              transition-all
              duration-200
              hover:scale-110
              active:scale-95
              dark:bg-[#323D4E]
            "
          >
            <Heart
              size={21}
              strokeWidth={1.8}
              className={
                product.isFavorite
                  ? "fill-[#F93C65] text-[#F93C65]"
                  : "text-[#202224] hover:text-[#F93C65] dark:text-white"
              }
            />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onEdit(product)}
          className="
            mt-6
            flex
            w-fit
            items-center
            gap-2
            rounded-[12px]
            bg-[#E2EAF8]/70
            px-[22px]
            py-[9px]
            text-[14px]
            font-bold
            leading-[28px]
            text-[#202224]
            transition-all
            hover:-translate-y-0.5
            hover:bg-[#4880FF]
            hover:text-white
            dark:bg-[#4B5668]
            dark:text-white
            dark:hover:bg-[#4880FF]
          "
        >
          <Pencil size={15} />
          {t.editProduct}
        </button>
      </div>
    </article>
  )
}

/* =========================================================
   BANNER
========================================================= */

function ProductBanner() {
  const { language } = useLanguage()

  const banners =
    bannerTranslations[language] ??
    bannerTranslations.English

  const [slideIndex, setSlideIndex] =
    useState(0)

  const currentSlide = banners[slideIndex]

  const previousSlide = () => {
    setSlideIndex((current) =>
      current === 0
        ? banners.length - 1
        : current - 1,
    )
  }

  const nextSlide = () => {
    setSlideIndex(
      (current) =>
        (current + 1) % banners.length,
    )
  }

  return (
    <div
      className="
        relative
        mb-[30px]
        min-h-[260px]
        overflow-hidden
        rounded-[14px]
        bg-[#4880FF]
        px-12
        py-8
        shadow-sm
        sm:min-h-[310px]
        sm:px-20
        lg:h-[346px]
        lg:px-[105px]
      "
    >
      {/* PATTERN */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse at 15% 35%,
              transparent 0 16%,
              rgba(255,255,255,.10) 16.3% 16.6%,
              transparent 16.9%
            ),
            radial-gradient(
              ellipse at 65% 55%,
              transparent 0 19%,
              rgba(255,255,255,.09) 19.3% 19.6%,
              transparent 19.9%
            ),
            radial-gradient(
              ellipse at 85% 20%,
              transparent 0 13%,
              rgba(255,255,255,.08) 13.3% 13.6%,
              transparent 13.9%
            )
          `,
          backgroundSize:
            "460px 300px, 620px 360px, 380px 250px",
        }}
      />

      {/* CONTENT */}
      <div
        key={`${language}-${slideIndex}`}
        className="
          relative
          z-[2]
          flex
          h-full
          max-w-[650px]
          flex-col
          justify-center
        "
      >
        <p className="mb-2 text-[14px] font-semibold text-white/90 sm:text-[16px]">
          {currentSlide.date}
        </p>

        <h2 className="mb-2 max-w-[600px] whitespace-pre-line text-[24px] font-extrabold leading-[1.2] text-white sm:text-[30px] lg:text-[37px]">
          {currentSlide.title}
        </h2>

        <p className="mb-6 max-w-[600px] text-[13px] font-semibold text-white/85 sm:text-[16px]">
          {currentSlide.subtitle}
        </p>

        <button
          type="button"
          className="
            w-fit
            rounded-[11px]
            bg-[#FF8743]
            px-7
            py-3
            text-[14px]
            font-bold
            text-white
            transition-all
            hover:-translate-y-0.5
            hover:bg-[#FF7629]
            hover:shadow-md
          "
        >
          {currentSlide.button}
        </button>
      </div>

      {/* PREVIOUS */}
      <button
        type="button"
        aria-label="Previous banner"
        onClick={previousSlide}
        className="
          absolute
          left-3
          top-1/2
          z-10
          flex
          h-[36px]
          w-[36px]
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#F4F4F4]/90
          text-[#202224]
          shadow-sm
          transition-all
          hover:scale-105
          hover:bg-white
          active:scale-95
          sm:left-4
          sm:h-[41px]
          sm:w-[41px]
        "
      >
        <ArrowLeft size={18} />
      </button>

      {/* NEXT */}
      <button
        type="button"
        aria-label="Next banner"
        onClick={nextSlide}
        className="
          absolute
          right-3
          top-1/2
          z-10
          flex
          h-[36px]
          w-[36px]
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#F4F4F4]/90
          text-[#202224]
          shadow-sm
          transition-all
          hover:scale-105
          hover:bg-white
          active:scale-95
          sm:right-4
          sm:h-[41px]
          sm:w-[41px]
        "
      >
        <ArrowRight size={18} />
      </button>

      {/* INDICATORS */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {banners.map((banner, index) => (
          <button
            key={banner.date}
            type="button"
            onClick={() => setSlideIndex(index)}
            className={[
              "h-1.5 rounded-full transition-all",
              index === slideIndex
                ? "w-7 bg-white"
                : "w-1.5 bg-white/50",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  )
}

/* =========================================================
   PRODUCTS PAGE
========================================================= */

export default function Products() {
  const { products } = useProducts()
  const { language } = useLanguage()

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null)

  const [toast, setToast] = useState("")

  const t =
    pageTranslations[language] ??
    pageTranslations.English

  const showToast = (message: string) => {
    setToast(message)

    window.setTimeout(() => {
      setToast("")
    }, 2200)
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
          {t.products}
        </h1>

        {/* BANNER */}
        <ProductBanner />

        {/* PRODUCTS */}
        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:gap-[28px]
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={setEditingProduct}
              showToast={showToast}
            />
          ))}
        </div>

        {/* EDIT MODAL */}
        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onClose={() =>
              setEditingProduct(null)
            }
          />
        )}

        {/* TOAST */}
        {toast && (
          <div
            className="
              fixed
              bottom-5
              left-1/2
              z-[120]
              -translate-x-1/2
              rounded-lg
              bg-[#202224]
              px-5
              py-3
              text-[14px]
              font-bold
              text-white
              shadow-xl
              dark:bg-white
              dark:text-[#202224]
            "
          >
            {toast}
          </div>
        )}

        <div className="h-8" />
      </div>
    </DashboardLayout>
  )
}