import '../all-designs/AllDesigns.css'
import './LikedProducts.css'
import { useContext, useMemo } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Link, useSearchParams } from 'react-router-dom'
import Banner from '../../components/banner/Banner'
import ProductCard from '../../components/cards/ProductCard'
import LoadingScreen from '../../components/loading/LoadingScreen'
import { DataContext } from '../../context/DataContext'
import { useLikes } from '../../hooks/useLikes'
import { removeLikedItem } from '../../utils/likes'
import { findProductByType } from '../../utils/products'

const DISCLAIMER =
  '* Savings percentage and strikethrough pricing based on comparison to regular prices of the same items at full-price in Artist Shops or third party retail locations and may vary over time.'

export default function LikedProducts() {
  const { items, loading } = useContext(DataContext)
  const { likedItems, count: likedCount } = useLikes()
  const [searchParams, setSearchParams] = useSearchParams()

  const sourceItems = useMemo(() => (Array.isArray(items) ? items : []), [items])

  const rows = useMemo(() => {
    const byId = new Map(sourceItems.map((item) => [item.id, item]))
    const list = []

    for (const liked of likedItems) {
      const sourceItem = byId.get(liked.designId)
      if (!sourceItem) continue
      const product = findProductByType(sourceItem, liked.productTypeToken)
      if (!product?.image) continue
      const v0 = product.variants?.[0]
      const price = typeof v0?.price === 'number' ? v0.price : null
      const sizeLabel = v0?.size || '—'
      const colorLabel = 'Artist print'

      list.push({
        rowKey: `${liked.designId}-${liked.productTypeToken}`,
        designId: liked.designId,
        productTypeToken: liked.productTypeToken,
        productTypeLabel: product.type || 'Product',
        title: sourceItem.design.title,
        artist: sourceItem.design.artist,
        image: product.image,
        detailLine: `${sizeLabel} / ${colorLabel}`,
        price,
        sourceItem,
      })
    }

    return list
  }, [likedItems, sourceItems])

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

  const openProductCard = (row) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('design', String(row.designId))
    nextParams.set('type', row.productTypeToken)
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

  const handleRemove = (event, row) => {
    event.stopPropagation()
    removeLikedItem(row.designId, row.productTypeToken)
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="shop-page liked-page">
      <Banner />
      <header className="liked-page-header">
        <div className="liked-page-heading">
          <p className="liked-page-kicker liked-price-text">Favorites</p>
          <h1 className="liked-page-title">Designs you love</h1>
          <p className="liked-page-subtitle">
            {likedCount === 0
              ? 'Save items by tapping the heart on a product card.'
              : `${likedCount} saved ${likedCount === 1 ? 'item' : 'items'}.`}
          </p>
        </div>
      </header>

      {likedCount === 0 ? (
        <div className="liked-empty-state">
          <p>No favorites yet.</p>
          <Link className="liked-empty-link" to="/all-products">
            Browse the shop
          </Link>
        </div>
      ) : (
        <>
          <div className="liked-list-wrap">
            <div className="liked-item-list" role="list">
              {rows.map((row) => (
                <article
                  key={row.rowKey}
                  className="liked-row"
                  role="listitem"
                >
                  <button
                    type="button"
                    className="liked-row-media"
                    onClick={() => openProductCard(row)}
                    aria-label={`View ${row.title}`}
                  >
                    <img src={row.image} alt="" />
                  </button>
                  <div className="liked-row-copy">
                    <p className="liked-row-type">{row.productTypeLabel}</p>
                    <h2 className="liked-row-title">{row.title}</h2>
                    <p className="liked-row-artist">by {row.artist}</p>
                    <span className="liked-row-detail">{row.detailLine}</span>
                    <button
                      type="button"
                      className="liked-row-remove"
                      onClick={(e) => handleRemove(e, row)}
                    >
                      <FaRegTrashAlt aria-hidden />
                      Remove
                    </button>
                  </div>
                  <div className="liked-row-price">
                    {row.price != null ? (
                      <strong className="liked-price-text">${row.price.toFixed(2)}</strong>
                    ) : (
                      <strong className="liked-price-text">—</strong>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="liked-page-footer-cta">
            <Link to="/all-products" className="liked-browse-more">
              Browse the shop to add more favorites
            </Link>
          </div>
        </>
      )}

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
