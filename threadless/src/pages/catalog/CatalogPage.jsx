import '../all-designs/AllDesigns.css'
import { useContext, useMemo } from 'react'
import { FaHeart, FaPlus } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import Banner from '../../components/banner/Banner'
import ProductCard from '../../components/cards/ProductCard'
import Topbar from '../../components/topbar/Topbar'
import { DataContext } from '../../context/DataContext'
import ScopedTopbarProvider from '../../context/ScopedTopbarProvider'
import { useTopbar } from '../../context/TopbarContext'
import { addItemToCart } from '../../utils/cart'
import { findProductByType, hasProductType, matchesDesignKeywords } from '../../utils/products'

const DESIGN_NOUN = { singular: 'design', plural: 'designs' }
const PRODUCT_NOUN = { singular: 'product', plural: 'products' }

const DESIGN_SORT_OPTIONS = [
  { value: 'Random', label: 'Random' },
  { value: 'Artist A-Z', label: 'Artist Name (A-Z)' },
  { value: 'Artist Z-A', label: 'Artist Name (Z-A)' },
  { value: 'Design A-Z', label: 'Design Name (A-Z)' },
  { value: 'Design Z-A', label: 'Design Name (Z-A)' },
]

const PRODUCT_SORT_OPTIONS = [
  { value: 'Name A-Z', label: 'Name (A-Z)' },
  { value: 'Name Z-A', label: 'Name (Z-A)' },
  { value: 'Price:LowToHigh', label: 'Price (Low To High)' },
  { value: 'PriceHighToLow', label: 'Price (High To Low)' },
]

function CatalogPageBody({
  baseItems,
  cardImageSource,
  productType,
  disclaimer,
}) {
  const { filteredItems } = useTopbar()
  const [searchParams, setSearchParams] = useSearchParams()
  const displayItems = Array.isArray(filteredItems) ? filteredItems : baseItems

  const selectedDesignId = useMemo(() => {
    const rawId = searchParams.get('design')
    return rawId ? Number(rawId) : null
  }, [searchParams])

  const selectedItem = useMemo(() => {
    if (!selectedDesignId) {
      return null
    }

    return baseItems.find((item) => item.id === selectedDesignId) || null
  }, [baseItems, selectedDesignId])

  const openProductCard = (item) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('design', String(item.id))
    setSearchParams(nextParams, { replace: true })
  }

  const closeProductCard = () => {
    if (searchParams.has('design')) {
      const nextParams = new URLSearchParams(searchParams)
      nextParams.delete('design')
      setSearchParams(nextParams, { replace: true })
    }
  }

  const getCardImage = (item) => {
    if (cardImageSource === 'product' && productType) {
      const product = findProductByType(item, productType)
      return product?.image || item?.design?.image
    }
    return item?.design?.image
  }

  const getStartingPrice = (item) => {
    if (!productType) return null
    const product = findProductByType(item, productType)
    const prices = product?.variants?.map((variant) => variant?.price).filter((p) => typeof p === 'number') ?? []
    if (prices.length === 0) return null
    return Math.min(...prices)
  }

  return (
    <div className="shop-page">
      <Banner />
      <Topbar />
      <div className="card-grid">
        {displayItems.map((item) => {
          const startingPrice = getStartingPrice(item)
          return (
            <article
              key={item.id}
              className="card"
              role="button"
              tabIndex={0}
              onClick={() => openProductCard(item)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  openProductCard(item)
                }
              }}
            >
            <div className="card-image-wrap">
              <img
                className="card-image"
                src={getCardImage(item)}
                alt={item.design.title}
              />
            </div>
            <div className="card-meta">
              <div className="card-copy">
                <h3 className="cardTitle">
                  {item.design.title}{' '}
                  <span className="cardArtist">by {item.design.artist}</span>
                </h3>
                {startingPrice != null ? (
                  <p className="cardPrice">${startingPrice.toFixed(2)}</p>
                ) : null}
              </div>
              <div className="card-actions">
                <button
                  className="icon-button favorite-button"
                  aria-label="Add to favorites"
                  onClick={(event) => event.stopPropagation()}
                >
                  <FaHeart />
                </button>
                <button
                  className="icon-button add-button"
                  aria-label="Add item to cart"
                  onClick={(event) => {
                    event.stopPropagation()
                    addItemToCart(item, { productType })
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            </article>
          )
        })}
      </div>
      {selectedItem ? (
        <ProductCard
          key={selectedItem.id}
          item={selectedItem}
          onClose={closeProductCard}
          initialProductType={productType}
        />
      ) : null}
      {disclaimer ? <p className="bottom-para">{disclaimer}</p> : null}
    </div>
  )
}

export default function CatalogPage({
  productType,
  designKeywords,
  cardImageSource = 'design',
  disclaimer,
}) {
  const { items, loading } = useContext(DataContext)
  const allDesignCount = Array.isArray(items) ? items.length : 0

  const baseItems = useMemo(() => {
    const safeItems = Array.isArray(items) ? items : []
    return safeItems.filter((item) => {
      if (productType && !hasProductType(item, productType)) return false
      if (designKeywords && !matchesDesignKeywords(item?.design, designKeywords)) return false
      return true
    })
  }, [items, productType, designKeywords])

  if (loading) {
    return <div className="spinner">Loading amazing cards...</div>
  }

  return (
    <ScopedTopbarProvider
      items={baseItems}
      countNoun={productType ? PRODUCT_NOUN : DESIGN_NOUN}
      sortOptions={productType ? PRODUCT_SORT_OPTIONS : DESIGN_SORT_OPTIONS}
      defaultSortBy={productType ? 'Name A-Z' : designKeywords ? 'Random' : 'Design A-Z'}
      allCountOverride={designKeywords || productType ? allDesignCount : undefined}
    >
      <CatalogPageBody
        baseItems={baseItems}
        cardImageSource={cardImageSource}
        productType={productType}
        disclaimer={disclaimer}
      />
    </ScopedTopbarProvider>
  )
}
