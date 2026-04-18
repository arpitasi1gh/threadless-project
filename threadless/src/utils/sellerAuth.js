const SELLER_SHOPS_KEY = 'threadless_seller_shops'
const CURRENT_SELLER_KEY = 'threadless_current_seller'

const safeParse = (raw, fallback) => {
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export const getSellerShops = () => {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(SELLER_SHOPS_KEY)
  const parsed = safeParse(raw || '[]', [])
  return Array.isArray(parsed) ? parsed : []
}

const normalizeEmail = (email) => String(email || '').trim().toLowerCase()
const normalizeUsername = (username) => String(username || '').trim()

export const findSellerShop = ({ email, username } = {}) => {
  const emailNeedle = normalizeEmail(email)
  const usernameNeedle = normalizeUsername(username)
  if (!emailNeedle && !usernameNeedle) return null

  return (
    getSellerShops().find((shop) => {
      const storedEmail = normalizeEmail(shop?.email)
      const storedUsername = normalizeUsername(shop?.username)
      if (emailNeedle && storedEmail === emailNeedle) return true
      if (usernameNeedle && storedUsername === usernameNeedle) return true
      return false
    }) || null
  )
}

export const saveSellerShop = ({ email, shopName, username, password }) => {
  if (typeof window === 'undefined') return
  const next = getSellerShops()
  next.push({
    email: normalizeEmail(email),
    shopName: String(shopName || '').trim(),
    username: normalizeUsername(username),
    password: String(password || ''),
    createdAt: new Date().toISOString(),
  })
  window.localStorage.setItem(SELLER_SHOPS_KEY, JSON.stringify(next))
}

export const getCurrentSeller = () => {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(CURRENT_SELLER_KEY)
  const value = String(raw || '').trim()
  return value || null
}

export const getCurrentSellerShop = () => {
  const current = getCurrentSeller()
  if (!current) return null
  return findSellerShop({ username: current })
}

export const setCurrentSeller = (username) => {
  if (typeof window === 'undefined') return
  const value = normalizeUsername(username)
  if (!value) return
  window.localStorage.setItem(CURRENT_SELLER_KEY, value)
  window.dispatchEvent(new Event('threadless-seller-auth-updated'))
}

export const clearCurrentSeller = () => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(CURRENT_SELLER_KEY)
  window.dispatchEvent(new Event('threadless-seller-auth-updated'))
}

