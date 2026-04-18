import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaCheck, FaCreditCard, FaLock, FaMoneyBillWave, FaQrcode, FaShieldAlt } from 'react-icons/fa'
import gpayQrImage from '../../assets/gpay-qr.jpeg'
import './cart.css'

const CART_KEY = 'threadless_cart_items'

const promoCodes = {
  THREAD10: { type: 'percent', value: 10, label: '10% off your cart' },
  ART20: { type: 'percent', value: 20, label: '20% collector discount' },
  FREESHIP: { type: 'shipping', value: 5.99, label: 'Free standard shipping' },
}

const SHIPPING_FIELD_LIMITS = {
  country: 40,
  firstName: 30,
  lastName: 30,
  address: 120,
  address2: 120,
  city: 40,
  state: 40,
  zip: 6,
  phone: 10,
}

const CARD_FIELD_LIMITS = {
  number: 19,
  name: 40,
  expiry: 5,
  cvv: 4,
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

function onlyDigits(value) {
  return value.replace(/\D/g, '')
}

function formatCardNumber(value) {
  const digits = onlyDigits(value).slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const digits = onlyDigits(value).slice(0, 4)

  if (digits.length <= 2) {
    return digits
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`
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
    estimatedShipping,
    totalSavings: promoSavings + shippingSavings,
    total,
  }
}

function UpiScannerPanel() {
  const [isQrReady, setIsQrReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsQrReady(true)
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="payment-qr-shell premium-qr-shell">
        <div className="qr-loading-copy">
          <span className={`scanner-status ${isQrReady ? 'is-ready' : ''}`}>
            {isQrReady ? 'Scanner ready' : 'Securing scanner...'}
          </span>
        </div>
        <img
          className={`payment-qr-image ${isQrReady ? 'is-ready' : 'is-blurred'}`}
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
    </>
  )
}

function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const emptyShippingDetails = {
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
  }
  const [cartItems, setCartItems] = useState(() => readJson(CART_KEY, []))
  const [user, setUser] = useState(() =>
    location.state?.userEmail ? { email: location.state.userEmail } : null,
  )
  const [email, setEmail] = useState(location.state?.userEmail || '')
  const [message, setMessage] = useState('')
  const [checkoutStep, setCheckoutStep] = useState('shipping')
  const [savedAddresses, setSavedAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [shippingDetails, setShippingDetails] = useState(emptyShippingDetails)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    type: 'Visa',
  })

  const promoCode = location.state?.promoCode || ''
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
    setMessage('Signed in. Complete shipping to continue.')
  }

  const updateShippingField = (field, value) => {
    let nextValue = value

    if (field === 'phone' || field === 'zip') {
      nextValue = onlyDigits(value).slice(0, SHIPPING_FIELD_LIMITS[field])
    } else if (typeof value === 'string' && SHIPPING_FIELD_LIMITS[field]) {
      nextValue = value.slice(0, SHIPPING_FIELD_LIMITS[field])
    }

    setShippingDetails((details) => ({ ...details, [field]: nextValue }))
  }

  const updateCardField = (field, value) => {
    let nextValue = value

    if (field === 'number') {
      nextValue = formatCardNumber(value)
    } else if (field === 'expiry') {
      nextValue = formatExpiry(value)
    } else if (field === 'cvv') {
      nextValue = onlyDigits(value).slice(0, CARD_FIELD_LIMITS.cvv)
    } else if (field === 'name') {
      nextValue = value.slice(0, CARD_FIELD_LIMITS.name)
    }

    setCardDetails((details) => ({ ...details, [field]: nextValue }))
  }

  const hasValidShippingPhone = shippingDetails.phone.length === 10

  const selectAddress = (addressId) => {
    const nextAddress = savedAddresses.find((address) => address.id === addressId)

    if (!nextAddress) {
      return
    }

    setSelectedAddressId(addressId)
    setShippingDetails((details) => ({
      ...details,
      ...nextAddress,
    }))
    setMessage(`${nextAddress.label} address selected.`)
  }

  const addAddressFromForm = () => {
    const requiredFields = ['country', 'firstName', 'lastName', 'address', 'city', 'zip', 'phone']
    const missingField = requiredFields.find((field) => !shippingDetails[field].trim())

    if (missingField) {
      setMessage('Complete the address form before saving another address.')
      return
    }

    if (!hasValidShippingPhone) {
      setMessage('Phone number must be exactly 10 digits.')
      return
    }

    const nextAddressId = `address-${savedAddresses.length + 1}`
    const nextAddress = {
      id: nextAddressId,
      label: `Address ${savedAddresses.length + 1}`,
      country: shippingDetails.country,
      firstName: shippingDetails.firstName,
      lastName: shippingDetails.lastName,
      address: shippingDetails.address,
      address2: shippingDetails.address2,
      city: shippingDetails.city,
      state: shippingDetails.state,
      zip: shippingDetails.zip,
      phone: shippingDetails.phone,
    }

    setSavedAddresses((current) => [...current, nextAddress])
    setSelectedAddressId(nextAddressId)
    setMessage(`${nextAddress.label} saved. You can switch between addresses anytime.`)
  }

  const deleteSelectedAddress = () => {
    if (!selectedAddressId) {
      setMessage('Select an address first if you want to delete it.')
      return
    }

    const remainingAddresses = savedAddresses.filter((address) => address.id !== selectedAddressId)
    setSavedAddresses(remainingAddresses)
    setSelectedAddressId('')
    setShippingDetails((details) => ({
      ...emptyShippingDetails,
      offers: details.offers,
      sms: details.sms,
    }))
    setMessage('Selected address deleted. You can add a new one anytime.')
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

    if (!hasValidShippingPhone) {
      setMessage('Phone number must be exactly 10 digits.')
      return
    }

    setCheckoutStep('payment')
    setMessage('Shipping saved. Choose a payment method and confirm your order.')
  }

  const confirmPayment = () => {
    setCheckoutStep('confirmed')
    setCartItems([])
    localStorage.setItem(CART_KEY, JSON.stringify([]))
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

                  <div className="address-book">
                    <div className="address-book-header">
                      <div>
                        <p className="address-book-kicker">Saved Addresses</p>
                        <h3>Select a delivery address</h3>
                      </div>
                      <div className="address-book-actions">
                        <button type="button" className="address-add-btn" onClick={addAddressFromForm}>
                          Add Address
                        </button>
                        <button
                          type="button"
                          className="address-delete-btn"
                          onClick={deleteSelectedAddress}
                        >
                          Delete Address
                        </button>
                      </div>
                    </div>

                    {savedAddresses.length > 0 ? (
                      <div className="address-book-grid">
                        {savedAddresses.map((address) => (
                          <button
                            key={address.id}
                            type="button"
                            className={`address-card ${selectedAddressId === address.id ? 'is-selected' : ''}`}
                            onClick={() => selectAddress(address.id)}
                          >
                            <span className="address-chip">{address.label}</span>
                            <strong>{address.firstName} {address.lastName}</strong>
                            <span>{address.address}</span>
                            <span>{address.city}, {address.state}</span>
                            <span>{address.country} {address.zip}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="address-empty-state">
                        <strong>No saved addresses yet</strong>
                        <p>Fill in the form below, then click Add Address to save one.</p>
                      </div>
                    )}
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
                        maxLength={SHIPPING_FIELD_LIMITS.firstName}
                      />
                    </label>
                    <label>
                      Last Name
                      <input
                        value={shippingDetails.lastName}
                        onChange={(event) => updateShippingField('lastName', event.target.value)}
                        placeholder="Last Name"
                        maxLength={SHIPPING_FIELD_LIMITS.lastName}
                      />
                    </label>
                  </div>
                  <label>
                    Address
                    <input
                      value={shippingDetails.address}
                      onChange={(event) => updateShippingField('address', event.target.value)}
                      placeholder="Street Address"
                      maxLength={SHIPPING_FIELD_LIMITS.address}
                    />
                  </label>
                  <label>
                    Address 2
                    <input
                      value={shippingDetails.address2}
                      onChange={(event) => updateShippingField('address2', event.target.value)}
                      placeholder="Apt, suite, etc. optional"
                      maxLength={SHIPPING_FIELD_LIMITS.address2}
                    />
                  </label>
                  <div className="checkout-three-col">
                    <label>
                      City
                      <input
                        value={shippingDetails.city}
                        onChange={(event) => updateShippingField('city', event.target.value)}
                        placeholder="City"
                        maxLength={SHIPPING_FIELD_LIMITS.city}
                      />
                    </label>
                    <label>
                      State
                      <input
                        value={shippingDetails.state}
                        onChange={(event) => updateShippingField('state', event.target.value)}
                        placeholder="State"
                        maxLength={SHIPPING_FIELD_LIMITS.state}
                      />
                    </label>
                    <label>
                      Zip
                      <input
                        value={shippingDetails.zip}
                        onChange={(event) => updateShippingField('zip', event.target.value)}
                        placeholder="Postal code"
                        inputMode="numeric"
                        maxLength={SHIPPING_FIELD_LIMITS.zip}
                      />
                    </label>
                  </div>
                  <label>
                    Phone
                    <input
                      value={shippingDetails.phone}
                      onChange={(event) => updateShippingField('phone', event.target.value)}
                      placeholder="Required"
                      inputMode="numeric"
                      maxLength={SHIPPING_FIELD_LIMITS.phone}
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
                    <h2>Choose Payment</h2>
                  </div>
                </div>

                <p className="payment-copy">
                  Pick the payment option that works best for you. UPI reveals the scanner after a
                  short secure-loading moment.
                </p>

                <div className="payment-method-grid" aria-label="Payment methods">
                  <button
                    type="button"
                    className={`payment-method-card ${paymentMethod === 'upi' ? 'is-active' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <FaQrcode />
                    <div>
                      <strong>UPI / Scanner</strong>
                      <span>Pay with any UPI app</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`payment-method-card ${paymentMethod === 'card' ? 'is-active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <FaCreditCard />
                    <div>
                      <strong>Credit / Debit Card</strong>
                      <span>Visa, Mastercard, RuPay</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`payment-method-card ${paymentMethod === 'cod' ? 'is-active' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <FaMoneyBillWave />
                    <div>
                      <strong>Cash on Delivery</strong>
                      <span>Pay when your order arrives</span>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'upi' ? (
                  <UpiScannerPanel />
                ) : null}

                {paymentMethod === 'card' ? (
                  <div className="payment-form-card">
                    <div className="card-payment-layout">
                      <div className="card-form-fields">
                        <label>
                          Card Number
                          <input
                            value={cardDetails.number}
                            onChange={(event) => updateCardField('number', event.target.value)}
                            placeholder="1234 5678 9012 3456"
                            inputMode="numeric"
                            maxLength={CARD_FIELD_LIMITS.number}
                          />
                        </label>
                        <label>
                          Name on Card
                          <input
                            value={cardDetails.name}
                            onChange={(event) => updateCardField('name', event.target.value)}
                            placeholder="Full name"
                            maxLength={CARD_FIELD_LIMITS.name}
                          />
                        </label>
                        <div className="checkout-three-col payment-card-grid">
                          <label>
                            Expiry
                            <input
                              value={cardDetails.expiry}
                              onChange={(event) => updateCardField('expiry', event.target.value)}
                              placeholder="MM/YY"
                              inputMode="numeric"
                              maxLength={CARD_FIELD_LIMITS.expiry}
                            />
                          </label>
                          <label>
                            CVV
                            <input
                              value={cardDetails.cvv}
                              onChange={(event) => updateCardField('cvv', event.target.value)}
                              placeholder="123"
                              inputMode="numeric"
                              maxLength={CARD_FIELD_LIMITS.cvv}
                            />
                          </label>
                          <label>
                            Card Type
                            <select
                              value={cardDetails.type}
                              onChange={(event) => updateCardField('type', event.target.value)}
                            >
                              <option>Visa</option>
                              <option>Mastercard</option>
                              <option>RuPay</option>
                              <option>Amex</option>
                            </select>
                          </label>
                        </div>
                      </div>

                      <div className="atm-card-preview">
                        <span className="atm-card-chip"></span>
                        <span className="atm-card-brand">{cardDetails.type}</span>
                        <strong>{cardDetails.number || '•••• •••• •••• ••••'}</strong>
                        <div className="atm-card-footer">
                          <div>
                            <span>Card Holder</span>
                            <p>{cardDetails.name || 'FULL NAME'}</p>
                          </div>
                          <div>
                            <span>Expires</span>
                            <p>{cardDetails.expiry || 'MM/YY'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="payment-note">Your card details stay encrypted and protected.</p>
                  </div>
                ) : null}

                {paymentMethod === 'cod' ? (
                  <div className="payment-form-card cod-card">
                    <strong>Cash on Delivery selected</strong>
                    <p>
                      Pay in cash when the package arrives at your selected shipping address.
                      Orders over $250 may require prepaid confirmation.
                    </p>
                    <div className="payment-details single-detail">
                      <div>
                        <span>Delivery Address</span>
                        <strong>
                          {shippingDetails.firstName} {shippingDetails.lastName}, {shippingDetails.address},{' '}
                          {shippingDetails.city}
                        </strong>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="payment-actions">
                  <button className="checkout-continue" type="button" onClick={confirmPayment}>
                    {paymentMethod === 'cod' ? 'Place COD Order' : 'Confirm Payment'}
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
                  <button
                    className="payment-back-button"
                    type="button"
                    onClick={() => {
                      setCheckoutStep('payment')
                      setMessage('You are back in checkout. You can update payment details now.')
                    }}
                  >
                    Back to Checkout
                  </button>
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
            {promoCode ? (
              <p>
                <FaCheck /> Coupon applied: {promoCode} ({promoCodes[promoCode].label})
              </p>
            ) : (
              <p>
                <FaCheck /> No coupon applied yet.
              </p>
            )}
          </aside>
        </section>
      </section>
    </main>
  )
}

export default Checkout
