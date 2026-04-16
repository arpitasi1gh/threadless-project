import './Shop.css'
import { useContext, useMemo } from 'react'
import { FaHeart, FaPlus } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import Banner from '../../components/banner/Banner'
import Topbar from '../../components/topbar/Topbar'
import ProductCard from '../../components/cards/ProductCard'
import { useTopbar } from '../../context/TopbarContext'
import { DataContext } from '../../context/DataContext'

const CART_KEY = 'threadless_cart_items'

function addItemToCart(item) {
  const defaultProduct = item.products?.[0]
  const defaultVariant = defaultProduct?.variants?.[0]

  if (!defaultProduct || !defaultVariant) {
    return
  }

  const storedItems = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
  const cartItemId = `${item.id}-${defaultProduct.type}-${defaultVariant.size}`
  const nextItem = {
    id: cartItemId,
    designId: item.id,
    title: item.design.title,
    artist: item.design.artist,
    productType: defaultProduct.type,
    size: defaultVariant.size,
    color: 'Artist print',
    image: defaultProduct.image,
    price: defaultVariant.price,
    regularPrice: Number((defaultVariant.price * 1.35).toFixed(2)),
    quantity: 1,
  }

  const nextItems = storedItems.some((cartItem) => cartItem.id === cartItemId)
    ? storedItems.map((cartItem) =>
        cartItem.id === cartItemId
          ? { ...cartItem, quantity: Math.min(9, cartItem.quantity + 1) }
          : cartItem,
      )
    : [...storedItems, nextItem]

  localStorage.setItem(CART_KEY, JSON.stringify(nextItems))
  window.dispatchEvent(new Event('threadless-cart-updated'))
}

export default function Shop() {
  const { items, loading } = useContext(DataContext)
  const { filteredItems } = useTopbar()
  const [searchParams, setSearchParams] = useSearchParams()
  const displayItems = Array.isArray(filteredItems) ? filteredItems : items

  const selectedDesignId = useMemo(() => {
    const rawId = searchParams.get('design')
    return rawId ? Number(rawId) : null
  }, [searchParams])

  const selectedItem = useMemo(() => {
    if (!selectedDesignId) {
      return null
    }

    return items.find((item) => item.id === selectedDesignId) || null
  }, [items, selectedDesignId])

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

  if (loading) {
    return <div className="spinner">Loading amazing cards...</div>
  }

  return (
    <div className="shop-page">
      <Banner />
      <Topbar />
      <div className="card-grid">
        {displayItems.map((item) => (
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
            <img
              className="card-image"
              src={item.design.image}
              alt={item.design.title}
            />
            <div className="card-meta">
              <div className="card-copy">
                <h3 className="cardTitle">
                  {item.design.title} <span className="cardArtist">by {item.design.artist}</span>
                </h3>
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
                    addItemToCart(item)
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
          key={selectedItem.id}
          item={selectedItem}
          onClose={closeProductCard}
        />
      ) : null}
      <p className="bottom-para">* Savings percentage and strikethrough pricing based on comparison to regular prices of the same items at full-price in Artist Shops or third party retail locations and may vary over time.</p>
    </div>
  )
}
