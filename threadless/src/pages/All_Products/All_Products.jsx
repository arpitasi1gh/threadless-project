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
import { findProductByType, hasProductType, normalizeToken } from '../../utils/products'

const PRODUCT_TYPES = ['T-Shirt', 'hoodie', 'mug', 'phonecase', 'headwear']
const PRODUCT_NOUN = { singular: 'product', plural: 'products' }
const SORT_OPTIONS = [
  { value: 'Random', label: 'Random' },
  { value: 'Name A-Z', label: 'Name (A-Z)' },
  { value: 'Name Z-A', label: 'Name (Z-A)' },
  { value: 'Price:LowToHigh', label: 'Price (Low To High)' },
  { value: 'PriceHighToLow', label: 'Price (High To Low)' },
]

const DISCLAIMER =
  '* Savings percentage and strikethrough pricing based on comparison to regular prices of the same items at full-price in Artist Shops or third party retail locations and may vary over time.'

function shuffle(list) {
  const next = [...list]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

function AllProductsBody({ entries, sourceItems }) {
  const { filteredItems } = useTopbar()
  const [searchParams, setSearchParams] = useSearchParams()
  const displayItems = Array.isArray(filteredItems) ? filteredItems : entries

  const selectedDesignId = useMemo(() => {
    const rawId = searchParams.get('design')
    return rawId ? Number(rawId) : null
  }, [searchParams])

  const selectedProductType = useMemo(() => {
    const rawType = searchParams.get('type')
    return rawType ? String(rawType) : null
  }, [searchParams])

  const selectedItem = useMemo(() => {
    if (!selectedDesignId) return null
    return sourceItems.find((item) => item.id === selectedDesignId) || null
  }, [sourceItems, selectedDesignId])

  const openProductCard = (entry) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('design', String(entry.designId))
    nextParams.set('type', normalizeToken(entry.productType))
    setSearchParams(nextParams, { replace: true })
  }

  const closeProductCard = () => {
    if (searchParams.has('design') || searchParams.has('type')) {
      const nextParams = new URLSearchParams(searchParams)
      nextParams.delete('design')
      nextParams.delete('type')
      setSearchParams(nextParams, { replace: true })
    }
  }

  return (
    <div className="shop-page">
      <Banner />
      <Topbar />
      <div className="card-grid">
        {displayItems.map((entry) => (
          <article
            key={entry.id}
            className="card"
            role="button"
            tabIndex={0}
            onClick={() => openProductCard(entry)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openProductCard(entry)
              }
            }}
          >
            <div className="card-image-wrap">
              <img
                className="card-image"
                src={entry.cardImage}
                alt={`${entry.designTitle} - ${entry.productType}`}
                loading="lazy"
              />
            </div>
            <div className="card-meta">
              <div className="card-copy">
                <h3 className="cardTitle">
                  {entry.designTitle}{' '}
                  <span className="cardArtist">by {entry.artist}</span>
                </h3>
                {entry.startingPrice != null ? (
                  <p className="cardPrice">${entry.startingPrice.toFixed(2)}</p>
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
                    addItemToCart(entry.sourceItem, { productType: entry.productType })
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {selectedItem ? (
        <ProductCard
          key={`${selectedItem.id}-${selectedProductType || ''}`}
          item={selectedItem}
          onClose={closeProductCard}
          initialProductType={selectedProductType}
        />
      ) : null}
      <p className="bottom-para">{DISCLAIMER}</p>
    </div>
  )
}

export default function All_Products() {
  const { items, loading } = useContext(DataContext)

  const sourceItems = useMemo(() => (Array.isArray(items) ? items : []), [items])

  const entries = useMemo(() => {
    const nextEntries = []

    for (const item of sourceItems) {
      for (const productType of PRODUCT_TYPES) {
        if (!hasProductType(item, productType)) continue
        const product = findProductByType(item, productType)
        if (!product?.image) continue
        const prices = product?.variants?.map((variant) => variant?.price).filter((p) => typeof p === 'number') ?? []
        const startingPrice = prices.length ? Math.min(...prices) : null

        nextEntries.push({
          id: `${item.id}-${normalizeToken(productType)}`,
          designId: item.id,
          productType,
          cardImage: product.image,
          startingPrice,
          designTitle: item.design.title,
          artist: item.design.artist,
          design: item.design,
          products: [product],
          sourceItem: item,
        })
      }
    }

    return shuffle(nextEntries)
  }, [sourceItems])

  if (loading) {
    return <div className="spinner">Loading amazing cards...</div>
  }

  return (
    <ScopedTopbarProvider
      items={entries}
      countNoun={PRODUCT_NOUN}
      defaultSortBy="Random"
      sortOptions={SORT_OPTIONS}
    >
      <AllProductsBody entries={entries} sourceItems={sourceItems} />
    </ScopedTopbarProvider>
  )
}
