import { findProductByType } from './products'

const CART_KEY = 'threadless_cart_items'

export function addItemToCart(item, options = {}) {
  const desiredType = options.productType
  const selectedProduct = desiredType ? findProductByType(item, desiredType) : item?.products?.[0]
  const desiredSize = String(options.size || '').trim()
  const selectedVariant = desiredSize
    ? selectedProduct?.variants?.find((variant) => variant?.size === desiredSize) || selectedProduct?.variants?.[0]
    : selectedProduct?.variants?.[0]

  if (!selectedProduct || !selectedVariant) {
    return
  }

  const storedItems = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
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

  const nextItems = storedItems.some((cartItem) => cartItem.id === cartItemId)
    ? storedItems.map((cartItem) =>
        cartItem.id === cartItemId
          ? { ...cartItem, quantity: Math.min(9, (Number(cartItem.quantity) || 0) + 1) }
          : cartItem,
      )
    : [...storedItems, nextItem]

  localStorage.setItem(CART_KEY, JSON.stringify(nextItems))
  window.dispatchEvent(new Event('threadless-cart-updated'))
}

