import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCheck, FaCreditCard, FaLock, FaShieldAlt } from 'react-icons/fa'
import gpayQrImage from '../../assets/gpay-qr.jpeg'
import './cart.css'

const CART_KEY = 'threadless_cart_items'
const USER_KEY = 'threadless_cart_user'
const PROMO_KEY = 'threadless_cart_promo'

const promoCodes = {
  THREAD10: { type: 'percent', value: 10 },
  ART20: { type: 'percent', value: 20 },
  FREESHIP: { type: 'shipping', value: 5.99 },
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

function getTotals(items, promoCode) {
  const shipping = items.length > 0 ? 5.99 : 0
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const regularSubtotal = items.reduce(
    (sum, item) => sum + (item.regularPrice || item.price) * item.quantity,
    0,
  )
  const saleSavings = Math.max(regularSubtotal - subtotal, 0)
  const promo = promoCode ? promoCodes[promoCode] : null
  const promoSavings = promo?.type === 'percent' ? subtotal * (promo.value / 100) : 0
  const shippingSavings = promo?.type === 'shipping' ? Math.min(shipping, promo.value) : 0
  const estimatedShipping = Math.max(shipping - shippingSavings, 0)
  const total = Math.max(subtotal - promoSavings + estimatedShipping, 0)

  return {
    subtotal,
    estimatedShipping,
    totalSavings: saleSavings + promoSavings + shippingSavings,
    total,
  }
}

function Checkout() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(() => readJson(CART_KEY, []))
  const [user, setUser] = useState(() => readJson(USER_KEY, null))
  const [email, setEmail] = useState(user?.email || '')
  const [message, setMessage] = useState('')
  const [checkoutStep, setCheckoutStep] = useState('shipping')
  const [shippingDetails, setShippingDetails] = useState({
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    offers: true,
    sms: false,
  })

  const promoCode = localStorage.getItem(PROMO_KEY) || ''
  const totals = useMemo(() => getTotals(cartItems, promoCode), [cartItems, promoCode])
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogin = (event) => {
    event.preventDefault()
    const nextEmail = email.trim()

    if (!nextEmail || !nextEmail.includes('@')) {
      setMessage('Enter a valid email to continue.')
      return
    }

    const nextUser = { email: nextEmail }
    setUser(nextUser)
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    setMessage('Signed in. Complete shipping to continue.')
  }

  const updateShippingField = (field, value) => {
    setShippingDetails((details) => ({ ...details, [field]: value }))
  }

  const continueToPayment = (event) => {
    event.preventDefault()

    if (cartItems.length === 0) {
      setMessage('Your cart is empty. Add items before checkout.')
      return
    }

    const requiredFields = ['country', 'firstName', 'lastName', 'address', 'city', 'zip', 'phone']
    const missingField = requiredFields.find((field) => !shippingDetails[field].trim())

    if (missingField) {
      setMessage('Please complete every required shipping field.')
      return
    }

    setCheckoutStep('payment')
    setMessage('Shipping saved. Scan the GPay QR below and then confirm your order.')
  }

  const confirmPayment = () => {
    setCheckoutStep('confirmed')
    setCartItems([])
    localStorage.setItem(CART_KEY, JSON.stringify([]))
    localStorage.removeItem(PROMO_KEY)
    window.dispatchEvent(new Event('threadless-cart-updated'))
    setMessage('Payment received. Your order is confirmed and will be processed shortly.')
  }

  return (
    <main className="cart-page checkout-page">
      <section className="cart-shell">
        <div className="cart-hero premium-hero">
          <div>
            <p className="cart-kicker">Checkout</p>
            <h1>Shipping Details</h1>
            <p className="cart-hero-copy">
              Complete delivery details while your savings and cart stay locked in.
            </p>
          </div>
          <Link to="/cart" className="cart-keep-shopping">
            Edit Cart
          </Link>
        </div>

        <div className="checkout-steps" aria-label="Checkout progress">
          <span>1. Cart</span>
          <span className={checkoutStep === 'shipping' ? 'is-active' : ''}>2. Checkout</span>
          <span className={checkoutStep !== 'shipping' ? 'is-active' : ''}>3. Confirmation</span>
        </div>

        <section className="checkout-layout two-page-checkout" aria-label="Checkout">
          <div className="checkout-form-panel premium-panel">
            {!user ? (
              <form className="cart-login-panel premium-login checkout-login" onSubmit={handleLogin}>
                <div className="cart-lock-icon">
                  <FaLock />
                </div>
                <div>
                  <h2>Log in to checkout</h2>
                  <p>Your email keeps your cart and order details connected.</p>
                </div>
                <div className="cart-login-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                  <button type="submit">Continue</button>
                </div>
              </form>
            ) : null}

            {checkoutStep === 'shipping' ? (
              <>
                <div className="checkout-paypal">
                  <span>Express checkout</span>
                  <button type="button">PayPal</button>
                </div>

                <form className="checkout-form" onSubmit={continueToPayment}>
                  <div className="checkout-section-title">
                    <FaCreditCard />
                    <div>
                      <p>Step 2</p>
                      <h2>Shipping Information</h2>
                    </div>
                  </div>

                  <label>
                    Email
                    <input type="email" value={user?.email || email} readOnly={Boolean(user)} />
                  </label>
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={shippingDetails.offers}
                      onChange={(event) => updateShippingField('offers', event.target.checked)}
                    />
                    Keep me up to date on exclusive offers
                  </label>
                  <label>
                    Country
                    <select
                      value={shippingDetails.country}
                      onChange={(event) => updateShippingField('country', event.target.value)}
                    >
                      <option value="">Please select</option>
                      <option value="United States">United States</option>
                      <option value="India">India</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </label>
                  <div className="checkout-two-col">
                    <label>
                      First Name
                      <input
                        value={shippingDetails.firstName}
                        onChange={(event) => updateShippingField('firstName', event.target.value)}
                        placeholder="First Name"
                      />
                    </label>
                    <label>
                      Last Name
                      <input
                        value={shippingDetails.lastName}
                        onChange={(event) => updateShippingField('lastName', event.target.value)}
                        placeholder="Last Name"
                      />
                    </label>
                  </div>
                  <label>
                    Address
                    <input
                      value={shippingDetails.address}
                      onChange={(event) => updateShippingField('address', event.target.value)}
                      placeholder="Street Address"
                    />
                  </label>
                  <label>
                    Address 2
                    <input
                      value={shippingDetails.address2}
                      onChange={(event) => updateShippingField('address2', event.target.value)}
                      placeholder="Apt, suite, etc. optional"
                    />
                  </label>
                  <div className="checkout-three-col">
                    <label>
                      City
                      <input
                        value={shippingDetails.city}
                        onChange={(event) => updateShippingField('city', event.target.value)}
                        placeholder="City"
                      />
                    </label>
                    <label>
                      State
                      <input
                        value={shippingDetails.state}
                        onChange={(event) => updateShippingField('state', event.target.value)}
                        placeholder="State"
                      />
                    </label>
                    <label>
                      Zip
                      <input
                        value={shippingDetails.zip}
                        onChange={(event) => updateShippingField('zip', event.target.value)}
                        placeholder="Postal code"
                      />
                    </label>
                  </div>
                  <label>
                    Phone
                    <input
                      value={shippingDetails.phone}
                      onChange={(event) => updateShippingField('phone', event.target.value)}
                      placeholder="Required"
                    />
                  </label>
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={shippingDetails.sms}
                      onChange={(event) => updateShippingField('sms', event.target.checked)}
                    />
                    Sign up for SMS-exclusive deals
                  </label>
                  <button className="checkout-continue" type="submit">
                    Continue to Payment
                  </button>
                  {message ? <p className="checkout-message">{message}</p> : null}
                </form>
              </>
            ) : checkoutStep === 'payment' ? (
              <section className="payment-panel" aria-label="Payment">
                <div className="checkout-section-title">
                  <FaCreditCard />
                  <div>
                    <p>Step 3</p>
                    <h2>Scan and Pay</h2>
                  </div>
                </div>

                <p className="payment-copy">
                  Scan this Google Pay QR with any UPI app, complete the payment, then confirm the
                  order here.
                </p>

                <div className="payment-qr-shell">
                  <img
                    className="payment-qr-image"
                    src={gpayQrImage}
                    alt="Google Pay QR code for Manvir Singh Saran"
                  />
                </div>

                <div className="payment-details">
                  <div>
                    <span>Payee</span>
                    <strong>Manvir Singh Saran</strong>
                  </div>
                  <div>
                    <span>UPI ID</span>
                    <strong>manvirsaran3654@okicici</strong>
                  </div>
                </div>

                <div className="payment-actions">
                  <button className="checkout-continue" type="button" onClick={confirmPayment}>
                    I Have Paid
                  </button>
                  <button
                    className="payment-back-button"
                    type="button"
                    onClick={() => {
                      setCheckoutStep('shipping')
                      setMessage('You can update shipping details and continue again.')
                    }}
                  >
                    Back to Shipping
                  </button>
                </div>

                {message ? <p className="checkout-message">{message}</p> : null}
              </section>
            ) : (
              <section className="confirmation-panel" aria-label="Order confirmation">
                <div className="checkout-section-title confirmation-title">
                  <FaCheck />
                  <div>
                    <p>Success</p>
                    <h2>Order Confirmed</h2>
                  </div>
                </div>

                <p className="payment-copy">
                  Thanks for your payment. Your order has been placed successfully and the delivery
                  details are locked in.
                </p>

                <div className="confirmation-card">
                  <span className="confirmation-badge">Payment successful</span>
                  <strong>Your Threadless order is confirmed.</strong>
                  <p>
                    We have received your payment and started processing the order for shipment.
                  </p>
                </div>

                <div className="payment-actions">
                  <Link className="checkout-continue confirmation-link" to="/shop">
                    Continue Shopping
                  </Link>
                  <Link className="payment-back-button confirmation-link" to="/cart">
                    View Cart
                  </Link>
                </div>

                {message ? <p className="checkout-message">{message}</p> : null}
              </section>
            )}
          </div>

          <aside className="checkout-order-panel premium-summary">
            <div className="summary-heading">
              <div>
                <p>Your Order</p>
                <h2>{itemCount} item{itemCount === 1 ? '' : 's'}</h2>
              </div>
              <FaShieldAlt />
            </div>
            {cartItems.length === 0 ? (
              <div className="checkout-empty-order">
                <p>Your cart is empty.</p>
                <button type="button" onClick={() => navigate('/shop')}>
                  Browse Shop
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div className="checkout-order-item" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.quantity} x {item.size} {item.productType}</span>
                  </div>
                </div>
              ))
            )}
            <div className="cart-total-lines compact-lines">
              <div>
                <span>Savings</span>
                <strong>{formatCurrency(totals.totalSavings)}</strong>
              </div>
              <div>
                <span>Subtotal</span>
                <strong>{formatCurrency(totals.subtotal)}</strong>
              </div>
              <div>
                <span>Shipping</span>
                <strong>{formatCurrency(totals.estimatedShipping)}</strong>
              </div>
            </div>
            <div className="checkout-mini-total">
              <span>Order Total</span>
              <strong>{formatCurrency(totals.total)}</strong>
            </div>
            <p>
              <FaCheck /> Promo and shipping are included.
            </p>
          </aside>
        </section>
      </section>
    </main>
  )
}

export default Checkout
