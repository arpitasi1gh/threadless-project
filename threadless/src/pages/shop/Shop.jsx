import './Shop.css'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FaHeart, FaPlus } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import Banner from '../../components/banner/Banner'
import ProductCard from '../../components/cards/ProductCard'
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
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedDesignId = useMemo(() => {
    const rawId = searchParams.get('design')
    return rawId ? Number(rawId) : null
  }, [searchParams])

  const openProductCard = (item, event) => {
    if (event?.currentTarget?.getBoundingClientRect) {
      const anchorRect = event.currentTarget.getBoundingClientRect()
      setSelectedItem({ item, anchorRect })
      return
    }

    setSelectedItem({ item })
  }

  const closeProductCard = () => {
    setSelectedItem(null)

    if (searchParams.has('design')) {
      const nextParams = new URLSearchParams(searchParams)
      nextParams.delete('design')
      setSearchParams(nextParams, { replace: true })
    }
  }

  useEffect(() => {
    if (loading || !selectedDesignId || selectedItem) {
      return
    }

    const nextItem = items.find((item) => item.id === selectedDesignId)
    if (nextItem) {
      openProductCard(nextItem)
    }
  }, [items, loading, selectedDesignId, selectedItem])

  if (loading) {
    return <div className="spinner">Loading amazing cards...</div>
  }

  return (
    <div className="shop-page">
      <Banner />
      <div className="card-grid">
        {items.map((item) => (
          <article
            key={item.id}
            className="card"
            role="button"
            tabIndex={0}
            onClick={(event) => openProductCard(item, event)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openProductCard(item, event)
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
          key={selectedItem.item.id}
          item={selectedItem.item}
          anchorRect={selectedItem.anchorRect}
          onClose={closeProductCard}
        />
      ) : null}
      <p className="bottom-para">* Savings percentage and strikethrough pricing based on comparison to regular prices of the same items at full-price in Artist Shops or third party retail locations and may vary over time.</p>
    </div>
  )
}
