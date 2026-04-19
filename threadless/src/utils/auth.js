const USERS_KEY = 'threadless_users'
const CURRENT_USER_KEY = 'threadless_current_user'
const CURRENT_USER_PHOTO_KEY = 'threadless_current_user_photo'

const safeParse = (raw, fallback) => {
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export const getUsers = () => {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(USERS_KEY)
  const parsed = safeParse(raw || '[]', [])
  return Array.isArray(parsed) ? parsed : []
}

export const findUser = (username) => {
  const needle = String(username || '').trim()
  if (!needle) return null
  return getUsers().find((user) => String(user?.username || '').trim() === needle) || null
}

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,18}$/

export const validateUsername = (username) => {
  const value = String(username || '').trim()
  const minLength = value.length >= 3
  const maxLength = value.length <= 18
  const patternMatch = USERNAME_PATTERN.test(value)
  const ok = minLength && maxLength && patternMatch
  let message = ''

  if (!value) {
    message = 'Username is required.'
  } else if (!minLength) {
    message = 'Username must be at least 3 characters.'
  } else if (!maxLength) {
    message = 'Username must be 18 characters or fewer.'
  } else if (!patternMatch) {
    message = 'Username may only contain letters, numbers, and underscores.'
  }

  return { ok, minLength, maxLength, patternMatch, message }
}

export const saveUser = ({ email, username, password }) => {
  if (typeof window === 'undefined') return
  const next = getUsers()
  next.push({
    email: String(email || '').trim(),
    username: String(username || '').trim(),
    password: String(password || ''),
    createdAt: new Date().toISOString(),
  })
  window.localStorage.setItem(USERS_KEY, JSON.stringify(next))
}

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(CURRENT_USER_KEY)
  const value = String(raw || '').trim()
  return value || null
}

export const getCurrentUserProfile = () => {
  const currentUser = getCurrentUser()
  if (!currentUser) return null
  return findUser(currentUser)
}

export const getCurrentUserPhoto = () => {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(CURRENT_USER_PHOTO_KEY)
  const value = String(raw || '').trim()
  return value || null
}

export const setCurrentUser = (username, photoURL) => {
  if (typeof window === 'undefined') return
  const value = String(username || '').trim()
  if (!value) return
  window.localStorage.setItem(CURRENT_USER_KEY, value)
  if (photoURL) {
    window.localStorage.setItem(CURRENT_USER_PHOTO_KEY, String(photoURL))
  }
  window.dispatchEvent(new Event('threadless-auth-updated'))
}

export const clearCurrentUser = () => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(CURRENT_USER_KEY)
  window.localStorage.removeItem(CURRENT_USER_PHOTO_KEY)
  window.dispatchEvent(new Event('threadless-auth-updated'))
}

export const validatePassword = (password) => {
  const value = String(password || '')
  const minLength = value.length >= 12
  const hasLower = /[a-z]/.test(value)
  const hasUpper = /[A-Z]/.test(value)
  const hasNumber = /\d/.test(value)
  const hasSpecial = /[!@#$%]/.test(value)
  const ok = minLength && hasLower && hasUpper && hasNumber && hasSpecial
  return { ok, minLength, hasLower, hasUpper, hasNumber, hasSpecial }
}

