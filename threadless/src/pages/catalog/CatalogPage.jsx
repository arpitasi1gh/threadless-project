import '../all-designs/AllDesigns.css'
import { useContext, useEffect, useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import Banner from '../../components/banner/Banner'
import ProductCard from '../../components/cards/ProductCard'
import LikeButton from '../../components/likes/LikeButton'
import LoadingScreen from '../../components/loading/LoadingScreen'
import Pagination from '../../components/pagination/Pagination'
import Topbar from '../../components/topbar/Topbar'
import { DataContext } from '../../context/DataContext'
import ScopedTopbarProvider from '../../context/ScopedTopbarProvider'
import { useTopbar } from '../../context/TopbarContext'
import useItemsPerPage from '../../hooks/useItemsPerPage'
import { findProductByType, hasProductType, matchesDesignKeywords } from '../../utils/products'

const DESIGN_NOUN = { singular: 'design', plural: 'designs' }
const PRODUCT_NOUN = { singular: 'product', plural: 'products' }

const DESIGN_SORT_OPTIONS = [
  { value: 'None', label: 'None' },
  { value: 'Random', label: 'Random' },
  { value: 'Artist A-Z', label: 'Artist Name (A-Z)' },
  { value: 'Artist Z-A', label: 'Artist Name (Z-A)' },
  { value: 'Design A-Z', label: 'Design Name (A-Z)' },
  { value: 'Design Z-A', label: 'Design Name (Z-A)' },
]

const PRODUCT_SORT_OPTIONS = [
  { value: 'None', label: 'None' },
  { value: 'Random', label: 'Random' },
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
  const { filteredItems, sortBy, filterBy } = useTopbar()
  const [searchParams, setSearchParams] = useSearchParams()
  const displayItems = Array.isArray(filteredItems) ? filteredItems : baseItems
  const itemsPerPage = useItemsPerPage(5)
  const [page, setPage] = useState(1)

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(displayItems.length / itemsPerPage)),
    [displayItems.length, itemsPerPage],
  )

  useEffect(() => {
    setPage(1)
  }, [sortBy, filterBy, itemsPerPage])

  useEffect(() => {
    setPage((prev) => Math.min(pageCount, Math.max(1, prev)))
  }, [pageCount])

  const pagedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return displayItems.slice(start, start + itemsPerPage)
  }, [displayItems, itemsPerPage, page])

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
        {pagedItems.map((item) => {
          const startingPrice = getStartingPrice(item)
          const likeProductType = productType || item.products?.[0]?.type
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
                <h3 className="cardTitle">{item.design.title}</h3>
                <p className="cardArtist">by {item.design.artist}</p>
                {startingPrice != null ? (
                  <p className="cardPrice">${startingPrice.toFixed(2)}</p>
                ) : null}
              </div>
              <div className="card-actions card-actions-inline">
                <LikeButton designId={item.id} productType={likeProductType} />
                <button
                  className="icon-button add-button"
                  aria-label="Choose item options"
                  onClick={(event) => {
                    event.stopPropagation()
                    openProductCard(item)
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
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
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
    return <LoadingScreen />
  }

  return (
    <ScopedTopbarProvider
      items={baseItems}
      countNoun={productType ? PRODUCT_NOUN : DESIGN_NOUN}
      sortOptions={productType ? PRODUCT_SORT_OPTIONS : DESIGN_SORT_OPTIONS}
      defaultSortBy={productType ? 'Name A-Z' : designKeywords ? 'Random' : 'None'}
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
