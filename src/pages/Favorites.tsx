import { Heart, Star } from "lucide-react"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useProducts } from "../context/ProductsContext"
import { useLanguage } from "../context/LanguageContext"

/* =========================================================
   PAGE TRANSLATIONS
========================================================= */

const translations = {
  English: {
    title: "Favorites",
    empty: "No favorite products yet.",
    remove: "Remove from favorites",
    browse:
      "Add products to your wishlist from the Products page.",
  },

  French: {
    title: "Favoris",
    empty: "Aucun produit favori.",
    remove: "Retirer des favoris",
    browse:
      "Ajoutez des produits à vos favoris depuis la page Produits.",
  },

  Spanish: {
    title: "Favoritos",
    empty: "No hay productos favoritos.",
    remove: "Eliminar de favoritos",
    browse:
      "Añade productos a favoritos desde la página Productos.",
  },
}

/* =========================================================
   PRODUCT NAME TRANSLATIONS
========================================================= */

const productNames = {
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
    <div className="mt-2 flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star
        const half =
          !filled && rating >= star - 0.5

        return (
          <div
            key={star}
            className="relative h-[16px] w-[16px]"
          >
            {/* EMPTY STAR */}
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

            {/* FILLED / HALF STAR */}
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

      <span
        className="
          ml-1
          text-[14px]
          font-semibold
          text-[#202224]/40
          dark:text-gray-400
        "
      >
        ({reviewsCount})
      </span>
    </div>
  )
}

/* =========================================================
   FAVORITES PAGE
========================================================= */

export default function Favorites() {
  const {
    favoriteProducts,
    toggleFavorite,
  } = useProducts()

  const { language } = useLanguage()

  const t =
    translations[language] ??
    translations.English

  return (
    <DashboardLayout>
      <div className="w-full">
        {/* PAGE TITLE */}
        <h1
          className="
            mb-6
            text-[24px]
            font-bold
            leading-none
            tracking-[-0.11px]
            text-[#202224]
            dark:text-white
            sm:text-[32px]
          "
        >
          {t.title}
        </h1>

        {/* EMPTY STATE */}
        {favoriteProducts.length === 0 ? (
          <div
            className="
              flex
              min-h-[300px]
              flex-col
              items-center
              justify-center
              rounded-[14px]
              border
              border-[#B9B9B9]/20
              bg-white
              px-5
              text-center
              shadow-[6px_6px_54px_rgba(0,0,0,0.05)]
              dark:border-[#313D4F]
              dark:bg-[#273142]
            "
          >
            <Heart
              size={48}
              strokeWidth={1.5}
              className="mb-4 text-[#4880FF]"
            />

            <h2 className="text-[20px] font-bold text-[#202224] dark:text-white">
              {t.empty}
            </h2>

            <p className="mt-2 max-w-[400px] text-[14px] text-[#606060] dark:text-[#AEB8C7]">
              {t.browse}
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              sm:gap-[28px]
              xl:grid-cols-3
            "
          >
            {favoriteProducts.map((product) => {
              const translatedTitle =
                productNames[language][
                  product.id as keyof (typeof productNames)["English"]
                ] ?? product.title

              return (
                <article
                  key={product.id}
                  className="
                    group
                    flex
                    min-h-[510px]
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
                  {/* IMAGE */}
                  <div
                    className="
                      flex
                      h-[260px]
                      items-center
                      justify-center
                      overflow-hidden
                      bg-white
                      p-6
                      sm:h-[300px]
                    "
                  >
                    <img
                      src={product.images[0]}
                      alt={translatedTitle}
                      className="
                        h-full
                        w-full
                        object-contain
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* DETAILS */}
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
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {/* PRODUCT NAME */}
                          <h2
                            className="
                              text-[18px]
                              font-bold
                              leading-[20px]
                              text-[#202224]
                              dark:text-white
                            "
                          >
                            {translatedTitle}
                          </h2>

                          {/* PRICE */}
                          <p
                            className="
                              mt-2
                              text-[16px]
                              font-bold
                              text-[#4880FF]
                            "
                          >
                            ${product.price.toFixed(2)}
                          </p>

                          {/* RATING */}
                          <ProductRating
                            rating={product.rating}
                            reviewsCount={
                              product.reviewsCount
                            }
                          />
                        </div>

                        {/* HEART */}
                        <button
                          type="button"
                          aria-label={t.remove}
                          onClick={() =>
                            toggleFavorite(product.id)
                          }
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
                            className="
                              fill-[#F93C65]
                              text-[#F93C65]
                            "
                          />
                        </button>
                      </div>
                    </div>

                    {/* REMOVE */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleFavorite(product.id)
                      }
                      className="
                        mt-6
                        w-fit
                        rounded-[12px]
                        bg-[#F93C65]
                        px-[22px]
                        py-[9px]
                        text-[14px]
                        font-bold
                        leading-[28px]
                        text-white
                        transition-all
                        hover:-translate-y-0.5
                        hover:bg-[#D92F54]
                        hover:shadow-md
                        active:translate-y-0
                      "
                    >
                      {t.remove}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <div className="h-8" />
      </div>
    </DashboardLayout>
  )
}