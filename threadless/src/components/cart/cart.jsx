import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaLock, FaMinus, FaPlus, FaRegTrashAlt, FaShieldAlt, FaTruck } from 'react-icons/fa'
import data from '../../data/data.json'
import './cart.css'

const CART_KEY = 'threadless_cart_items'

const promoCodes = {
  THREAD10: { type: 'percent', value: 10, label: '10% off your cart' },
  ART20: { type: 'percent', value: 20, label: '20% collector discount' },
  FREESHIP: { type: 'shipping', value: 5.99, label: 'Free standard shipping' },
}

const starterItem = {
  id: 'starter-tee-xl',
  designId: data[0].id,
  title: data[0].design.title,
  artist: data[0].design.artist,
  productType: data[0].products[0].type,
  size: 'XL',
  color: 'Black',
  image: data[0].products[0].image,
  price: data[0].products[0].variants[3].price,
  regularPrice: 34.95,
  quantity: 1,
}

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null')
    return value ?? fallback
  } catch {
    return fallback
  }
}

function formatCurrency(value) {
  return `$${value.toFixed(2)}`
}

function getItemBasePrice(item) {
  return item.regularPrice || item.price
}

function getItemPromoDiscount(item, promoCode) {
  const promo = promoCode ? promoCodes[promoCode] : null
  const basePrice = getItemBasePrice(item)

  if (!promo) {
    return 0
  }

  if (promo.type === 'percent') {
    return basePrice * (promo.value / 100)
  }

  return 0
}

function getItemFinalPrice(item, promoCode) {
  const basePrice = getItemBasePrice(item)
  const promoDiscount = getItemPromoDiscount(item, promoCode)
  return Math.max(basePrice - promoDiscount, 0)
}

function getTotals(items, promoCode) {
  const shipping = items.length > 0 ? 5.99 : 0
  const subtotal = items.reduce((sum, item) => sum + getItemBasePrice(item) * item.quantity, 0)
  const promo = promoCode ? promoCodes[promoCode] : null
  const promoSavings =
    promo?.type === 'percent'
      ? items.reduce((sum, item) => sum + getItemPromoDiscount(item, promoCode) * item.quantity, 0)
      : 0
  const shippingSavings = promo?.type === 'shipping' ? Math.min(shipping, promo.value) : 0
  const estimatedShipping = Math.max(shipping - shippingSavings, 0)
  const total = Math.max(subtotal - promoSavings + estimatedShipping, 0)

  return {
    subtotal,
    promoSavings,
    shippingSavings,
    estimatedShipping,
    totalSavings: promoSavings + shippingSavings,
    total,
  }
}

function Cart() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(() => readJson(CART_KEY, []))
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState('')
  const [notice, setNotice] = useState('')

  const isLoggedIn = Boolean(user)
  const totals = useMemo(() => getTotals(cartItems, appliedPromo), [appliedPromo, cartItems])
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const persistCart = (items) => {
    setCartItems(items)
    localStorage.setItem(CART_KEY, JSON.stringify(items))
    window.dispatchEvent(new Event('threadless-cart-updated'))
  }

  const handleLogin = (event) => {
    event.preventDefault()
    const nextEmail = email.trim()

    if (!nextEmail || !nextEmail.includes('@')) {
      setNotice('Enter a valid email to unlock your cart.')
      return
    }

    const nextUser = { email: nextEmail }
    setUser(nextUser)
    setNotice('Signed in. Your cart is ready.')

    if (cartItems.length === 0) {
      persistCart([starterItem])
    }
  }

  const unlockCartWithEmail = () => {
    const nextEmail = email.trim()

    if (!nextEmail || !nextEmail.includes('@')) {
      setNotice('Enter a valid email to continue to checkout.')
      return false
    }

    const nextUser = { email: nextEmail }
    setUser(nextUser)

    if (cartItems.length === 0) {
      persistCart([starterItem])
    }

    return true
  }

  const handleLogout = () => {
    setUser(null)
    setEmail('')
    setNotice('Logged out. Sign in again before adding items.')
  }

  const addStarterItem = () => {
    if (!isLoggedIn) {
      setNotice('Log in first so we can save items to your cart.')
      return
    }

    const existingItem = cartItems.find((item) => item.id === starterItem.id)
    const nextItems = existingItem
      ? cartItems.map((item) =>
          item.id === starterItem.id ? { ...item, quantity: Math.min(9, item.quantity + 1) } : item,
        )
      : [...cartItems, starterItem]

    persistCart(nextItems)
    setNotice('Featured tee added.')
  }

  const updateQuantity = (itemId, amount) => {
    const nextItems = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, Math.min(9, item.quantity + amount)) }
        : item,
    )

    persistCart(nextItems)
  }

  const removeItem = (itemId) => {
    persistCart(cartItems.filter((item) => item.id !== itemId))
  }

  const applyPromo = (event) => {
    event.preventDefault()
    const code = promoInput.trim().toUpperCase()

    if (!code) {
      setAppliedPromo('')
      setNotice('Enter a promo code.')
      return
    }

    if (!promoCodes[code]) {
      setNotice('Try THREAD10, ART20, or FREESHIP.')
      setAppliedPromo('')
      return
    }

    setAppliedPromo(code)
    setPromoInput(code)
    setNotice(`${code} applied: ${promoCodes[code].label}.`)
  }

  const goToCheckout = () => {
    if (!isLoggedIn) {
      const didUnlock = unlockCartWithEmail()

      if (!didUnlock) {
        return
      }
    }

    if (cartItems.length === 0) {
      setNotice('Add an item before checkout.')
      return
    }

    navigate('/checkout', {
      state: {
        promoCode: appliedPromo,
        userEmail: user?.email || email.trim(),
      },
    })
  }

  return (
    <main className="cart-page">
      <section className="cart-shell">
        <div className="cart-hero premium-hero">
          <div>
            <p className="cart-kicker">Bag review</p>
            <h1>Your Cart</h1>
            <p className="cart-hero-copy">
              Fine-tune your items, lock in savings, then move to checkout on the next page.
            </p>
          </div>
          <Link to="/shop" className="cart-keep-shopping">
            Keep Shopping
          </Link>
        </div>

        <div className="checkout-steps" aria-label="Checkout progress">
          <span className="is-active">1. Cart</span>
          <span>2. Checkout</span>
          <span>3. Confirmation</span>
        </div>

        <section className="cart-layout" aria-label="Shopping cart">
          <div className="cart-items-panel premium-panel">
            {!isLoggedIn ? (
              <form className="cart-login-panel premium-login" onSubmit={handleLogin}>
                <div className="cart-lock-icon">
                  <FaLock />
                </div>
                <div>
                  <h2>Log in to add items</h2>
                  <p>Enter your email, then continue to checkout. We will save your cart automatically.</p>
                </div>
                <div className="cart-login-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                  <button type="submit">Save Email</button>
                </div>
              </form>
            ) : (
              <div className="cart-user-strip">
                <div>
                  <span>Signed in</span>
                  <strong>{user.email}</strong>
                </div>
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="cart-empty-state premium-empty">
                <h2>Your cart is ready for art.</h2>
                <p>Start with a featured tee or browse the shop for more designs.</p>
                <div className="cart-empty-actions">
                  <button type="button" onClick={addStarterItem}>
                    Add Featured Tee
                  </button>
                  <Link to="/shop">Browse Shop</Link>
                </div>
              </div>
            ) : (
              <div className="cart-item-list">
                {cartItems.map((item) => (
                  <article className="cart-item premium-item" key={item.id}>
                    <div className="cart-item-media">
                      <img src={item.image} alt={`${item.title} ${item.productType}`} />
                    </div>
                    <div className="cart-item-copy">
                      <p className="cart-product-type">{item.productType}</p>
                      <h2>{item.title}</h2>
                      <p>by {item.artist}</p>
                      <span>
                        {item.size} / {item.color}
                      </span>
                      <button type="button" onClick={() => removeItem(item.id)}>
                        <FaRegTrashAlt /> Remove
                      </button>
                    </div>
                    <div className="cart-item-price">
                      <div>
                        {appliedPromo ? <span>{formatCurrency(getItemBasePrice(item))}</span> : null}
                        <strong>{formatCurrency(getItemFinalPrice(item, appliedPromo))}</strong>
                      </div>
                      <div className="cart-quantity" aria-label={`Quantity for ${item.title}`}>
                        <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                          <FaMinus />
                        </button>
                        <output>{item.quantity}</output>
                        <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="cart-summary premium-summary" aria-label="Order summary">
            <div className="summary-heading">
              <div>
                <p>Order Summary</p>
                <h2>{itemCount} item{itemCount === 1 ? '' : 's'}</h2>
              </div>
              <FaTruck />
            </div>

            <form className="cart-promo-form" onSubmit={applyPromo}>
              <input
                type="text"
                value={promoInput}
                onChange={(event) => setPromoInput(event.target.value)}
                placeholder="Enter coupon code"
              />
              <button type="submit">Apply</button>
            </form>

            {appliedPromo ? (
              <p className="cart-promo-message">
                Coupon applied: <strong>{appliedPromo}</strong> ({promoCodes[appliedPromo].label})
              </p>
            ) : null}

            {notice ? <p className="cart-promo-message">{notice}</p> : null}

            <div className="cart-total-lines">
              <div>
                <span>Total Savings</span>
                <strong>{formatCurrency(totals.totalSavings)}</strong>
              </div>
              <div>
                <span>Subtotal</span>
                <strong>{formatCurrency(totals.subtotal)}</strong>
              </div>
              <div>
                <span>Estimated Shipping</span>
                <strong>{formatCurrency(totals.estimatedShipping)}</strong>
              </div>
              <div>
                <span>Tax</span>
                <strong>TBD</strong>
              </div>
            </div>

            <div className="cart-estimated-total">
              <span>Estimated Total <small>(USD)</small></span>
              <strong>{formatCurrency(totals.total)}</strong>
            </div>

            <button type="button" className="cart-checkout-btn" onClick={goToCheckout}>
              Continue to Checkout
            </button>

            <div className="cart-trust-row">
              <FaShieldAlt />
              <span>Discount applies only after you enter a valid code and click Apply.</span>
            </div>
          </aside>
        </section>

        <p className="cart-savings-note">
          Savings percentage and strikethrough pricing are based on comparison to regular prices.
          Savings may vary over time.
        </p>
      </section>
    </main>
  )
}

export default Cart
