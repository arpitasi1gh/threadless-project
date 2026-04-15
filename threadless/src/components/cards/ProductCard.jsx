import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown, FaHeart, FaPlus, FaTimes } from 'react-icons/fa'
import './ProductCard.css'

export default function ProductCard({ item, onClose }) {
  const products = item?.products || []
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(item?.products?.[0]?.image || item?.design?.image)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false)
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    return () => window.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const selectedProduct = products[selectedProductIndex] || products[0]
  const price = selectedProduct?.variants?.[0]?.price ?? null
  const selectedStyleLabel = selectedProduct?.type || ''
  const selectedVariant = selectedProduct?.variants?.[selectedSizeIndex] || selectedProduct?.variants?.[0]

  const addSelectedToCart = () => {
    const cartKey = 'threadless_cart_items'
    const storedItems = JSON.parse(localStorage.getItem(cartKey) || '[]')
    const cartItemId = `${item.id}-${selectedProduct.type}-${selectedVariant.size}`
    const nextItem = {
      id: cartItemId,
      designId: item.id,
      title: item.design.title,
      artist: item.design.artist,
      productType: selectedProduct.type,
      size: selectedVariant.size,
      color: 'Artist print',
      image: selectedProduct.image,
      price: selectedVariant.price,
      regularPrice: Number((selectedVariant.price * 1.35).toFixed(2)),
      quantity: 1,
    }
    const existingItem = storedItems.find((cartItem) => cartItem.id === cartItemId)
    const nextItems = existingItem
      ? storedItems.map((cartItem) =>
          cartItem.id === cartItemId
            ? { ...cartItem, quantity: Math.min(9, cartItem.quantity + 1) }
            : cartItem,
        )
      : [...storedItems, nextItem]

    localStorage.setItem(cartKey, JSON.stringify(nextItems))
    window.dispatchEvent(new Event('threadless-cart-updated'))
    onClose()
  }

  if (!item || !selectedProduct) {
    return null
  }

  return (
    <div className="product-card-backdrop" onClick={onClose}>
      <section
        className="product-card-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="product-card-close" onClick={onClose} aria-label="Close product details">
          <FaTimes />
        </button>

        <div className="product-card-media">
<span className="product-card-badge">EXCLUSIVE DESIGN</span>
          <img
            className="product-card-main-image"
            src={selectedImage}
            alt={selectedProduct.type}
          />
          <div className="product-card-thumbnails">
            <button
              type="button"
              className={`product-card-thumb ${
                selectedImage === item.design.image ? 'is-active' : ''
              }`}
              onClick={() => setSelectedImage(item.design.image)}
            >
              <img src={item.design.image} alt={`${item.design.title} artwork`} />
            </button>
            {products.map((product, index) => (
              <button
                key={`${product.type}-${index}`}
                type="button"
                className={`product-card-thumb ${
                  selectedImage === product.image ? 'is-active' : ''
                }`}
                onClick={() => {
                  setSelectedProductIndex(index)
                  setSelectedImage(product.image)
                }}
              >
                <img src={product.image} alt={product.type} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-card-content">
          <div className="product-card-topbar">
            <div>
              <p className="product-card-kicker">{selectedProduct.type}</p>
              <h2 className="product-card-title">{item.design.title}</h2>
              <p className="product-card-subtitle">by {item.design.artist}</p>
            </div>
          </div>

          <div className="product-card-section">
            <p className="product-card-section-label">Choose a style</p>
            <div className="product-card-style-row">
              <div className="product-card-style-dropdown-wrap" ref={dropdownRef}>
                <button
                  type="button"
                  className={`product-card-style-trigger ${isDropdownOpen ? 'is-open' : ''}`}
                  onClick={() => setIsDropdownOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  <span>{selectedStyleLabel}</span>
                  <FaChevronDown className="product-card-style-icon" />
                </button>

                {isDropdownOpen ? (
                  <div className="product-card-style-menu" role="listbox" aria-label="Choose a style">
                    {products.map((product, index) => {
                      const productPrice = product.variants?.[0]?.price
                      return (
                        <button
                          key={`${product.type}-${index}`}
                          type="button"
                          className={`product-card-style-item ${
                            selectedProductIndex === index ? 'is-selected' : ''
                          }`}
                          onClick={() => {
                            setSelectedProductIndex(index)
                            setSelectedImage(product.image)
                            setIsDropdownOpen(false)
                          }}
                        >
                          <span>{product.type}</span>
                          <strong>{productPrice ? `$${productPrice}` : 'View'}</strong>
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>

              <div className="product-card-top-actions style-actions">
                <button type="button" className="product-circle-button favorite" aria-label="Add to favorites">
                  <FaHeart />
                </button>
                <button
                  type="button"
                  className="product-circle-button add"
                  aria-label="Add item"
                  onClick={addSelectedToCart}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          <div className="product-card-section">
            <p className="product-card-section-label">Available sizes</p>
            <div className="product-card-size-grid">
              {selectedProduct.variants.map((variant, index) => (
                <button
                  key={variant.size}
                  type="button"
                  className={`product-size-chip ${selectedSizeIndex === index ? 'is-selected' : ''}`}
                  onClick={() => setSelectedSizeIndex(index)}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-card-price-row">
            <div>
              <p className="product-card-price-label">Starting at</p>
              <p className="product-card-price">{price ? `$${price}` : 'See options'}</p>
            </div>
            <button type="button" className="product-card-cta" onClick={addSelectedToCart}>
              Add to Cart
            </button>
          </div>

          <p className="product-card-description">{selectedProduct.about}</p>

          <div className="product-card-section">
            <p className="product-card-section-label">Highlights</p>
            <ul className="product-card-features">
              {selectedProduct.features.slice(0, 3).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="product-card-section">
            <p className="product-card-section-label">About This Design</p>
            <p className="product-card-description design-description">{item.design.about}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
