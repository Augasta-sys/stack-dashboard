import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export interface Product {
  id: string
  title: string
  price: number
  rating: number
  reviewsCount: number
  images: string[]
  isFavorite: boolean
}

const defaultProducts: Product[] = [
  {
    id: "1",
    title: "Apple Watch Series 4",
    price: 120,
    rating: 4,
    reviewsCount: 131,
    isFavorite: false,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=800&q=85",
    ],
  },
  {
    id: "2",
    title: "Girl Handy Beg",
    price: 45.3,
    rating: 4,
    reviewsCount: 34,
    isFavorite: false,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85",
    ],
  },
  {
    id: "3",
    title: "Beats Headphone",
    price: 75,
    rating: 4,
    reviewsCount: 52,
    isFavorite: false,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=85",
    ],
  },
  {
    id: "4",
    title: "Smart Watch Pro",
    price: 149,
    rating: 5,
    reviewsCount: 87,
    isFavorite: false,
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=85",
    ],
  },
  {
    id: "5",
    title: "Wireless Earbuds",
    price: 59.99,
    rating: 4.5,
    reviewsCount: 96,
    isFavorite: false,
    images: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=85",
    ],
  },
  {
    id: "6",
    title: "Premium Smart Watch",
    price: 199,
    rating: 4.5,
    reviewsCount: 63,
    isFavorite: false,
    images: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=85",
    ],
  },
]

interface ProductsContextType {
  products: Product[]
  favoriteProducts: Product[]
  toggleFavorite: (productId: string) => void
  updateProduct: (updatedProduct: Product) => void
}

const ProductsContext =
  createContext<ProductsContextType | undefined>(
    undefined,
  )

const STORAGE_KEY = "dashstack-products"

export function ProductsProvider({
  children,
}: {
  children: ReactNode
}) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts =
        localStorage.getItem(STORAGE_KEY)

      if (!savedProducts) {
        return defaultProducts
      }

      const parsed = JSON.parse(savedProducts)

      if (!Array.isArray(parsed)) {
        return defaultProducts
      }

      return parsed
    } catch {
      return defaultProducts
    }
  })

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(products),
    )
  }, [products])

  const toggleFavorite = (productId: string) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              isFavorite: !product.isFavorite,
            }
          : product,
      ),
    )
  }

  const updateProduct = (updatedProduct: Product) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product,
      ),
    )
  }

  const favoriteProducts = useMemo(
    () =>
      products.filter(
        (product) => product.isFavorite,
      ),
    [products],
  )

  const value = {
    products,
    favoriteProducts,
    toggleFavorite,
    updateProduct,
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductsProvider",
    )
  }

  return context
}