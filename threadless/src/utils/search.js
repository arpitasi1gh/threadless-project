import { findProductByType, normalizeToken } from './products'

const RECENT_SEARCHES_KEY = 'threadless_recent_searches'
const RECENT_RESET_MARKER_KEY = 'threadless_recent_searches_reset_for_load'
const MAX_RECENT_SEARCHES = 6
const PRODUCT_TYPE_ALIASES = {
  tshirt: 'T-Shirt',
  tshirts: 'T-Shirt',
  tee: 'T-Shirt',
  tees: 'T-Shirt',
  hoodie: 'hoodie',
  hoodies: 'hoodie',
  mug: 'mug',
  mugs: 'mug',
  phonecase: 'phonecase',
  phonecases: 'phonecase',
  phone: 'phonecase',
  case: 'phonecase',
  cases: 'phonecase',
  headwear: 'headwear',
  hat: 'headwear',
  hats: 'headwear',
  cap: 'headwear',
  caps: 'headwear',
}

let hasHandledReloadReset = false

function didPageReload() {
  if (typeof window === 'undefined' || typeof performance === 'undefined') {
    return false
  }

  const navigationEntry = performance.getEntriesByType?.('navigation')?.[0]
  if (navigationEntry?.type) {
    return navigationEntry.type === 'reload'
  }

  return performance.navigation?.type === 1
}

function ensureRecentSearchState() {
  if (hasHandledReloadReset || typeof window === 'undefined') {
    return
  }

  const loadMarker = sessionStorage.getItem(RECENT_RESET_MARKER_KEY)
  if (didPageReload() || !loadMarker) {
    sessionStorage.removeItem(RECENT_SEARCHES_KEY)
    sessionStorage.setItem(RECENT_RESET_MARKER_KEY, 'ready')
  }

  hasHandledReloadReset = true
}

function safeReadRecentSearches() {
  ensureRecentSearchState()

  if (typeof window === 'undefined') {
    return []
  }

  try {
    const value = JSON.parse(sessionStorage.getItem(RECENT_SEARCHES_KEY) || '[]')
    return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}

function writeRecentSearches(searches) {
  ensureRecentSearchState()

  if (typeof window === 'undefined') {
    return
  }

  sessionStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches))
}

export function sanitizeSearchQuery(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function getSearchableTerms(item) {
  const design = item?.design ?? {}
  const productTypes = Array.isArray(item?.products) ? item.products.map((product) => product?.type) : []

  return [
    design.title,
    design.artist,
    design.about,
    ...(Array.isArray(design.type) ? design.type : []),
    ...(Array.isArray(design.subType) ? design.subType : []),
    ...(Array.isArray(design.tags) ? design.tags : []),
    ...productTypes,
  ]
    .filter(Boolean)
    .map((term) => String(term))
}

export function getQueryProductType(query) {
  const cleanQuery = sanitizeSearchQuery(query)
  if (!cleanQuery) {
    return null
  }

  const parts = cleanQuery
    .toLowerCase()
    .split(/\s+/)
    .map(normalizeToken)
    .filter(Boolean)

  for (const part of parts) {
    if (PRODUCT_TYPE_ALIASES[part]) {
      return PRODUCT_TYPE_ALIASES[part]
    }
  }

  const whole = normalizeToken(cleanQuery)
  return PRODUCT_TYPE_ALIASES[whole] || null
}

function scoreItemAgainstQuery(item, query) {
  const cleanQuery = sanitizeSearchQuery(query)
  if (!cleanQuery) {
    return 0
  }

  const design = item?.design ?? {}
  const queryToken = normalizeToken(cleanQuery)
  const queryWords = cleanQuery
    .toLowerCase()
    .split(/\s+/)
    .map(normalizeToken)
    .filter(Boolean)

  const titleToken = normalizeToken(design.title)
  const artistToken = normalizeToken(design.artist)
  const matchingProductType = getQueryProductType(cleanQuery)
  const searchableTerms = getSearchableTerms(item)
  const searchableTokens = searchableTerms.map(normalizeToken)
  let score = 0

  if (titleToken === queryToken) score += 200
  if (titleToken.startsWith(queryToken)) score += 120
  if (artistToken.startsWith(queryToken)) score += 70

  searchableTokens.forEach((token) => {
    if (token === queryToken) {
      score += 90
    } else if (token.includes(queryToken)) {
      score += 35
    }
  })

  queryWords.forEach((word) => {
    searchableTokens.forEach((token) => {
      if (token === word) {
        score += 20
      } else if (token.includes(word)) {
        score += 8
      }
    })
  })

  if (matchingProductType) {
    const productMatch = Array.isArray(item?.products)
      ? item.products.some((product) => normalizeToken(product?.type) === normalizeToken(matchingProductType))
      : false

    if (productMatch) {
      score += 140
    }
  }

  return score
}

export function searchItems(items, query, limit) {
  const safeItems = Array.isArray(items) ? items : []
  const cleanQuery = sanitizeSearchQuery(query)

  if (!cleanQuery) {
    return []
  }

  const ranked = safeItems
    .map((item) => ({ item, score: scoreItemAgainstQuery(item, cleanQuery) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score
      }

      return String(left.item?.design?.title).localeCompare(String(right.item?.design?.title))
    })
    .map((entry) => entry.item)

  return typeof limit === 'number' ? ranked.slice(0, limit) : ranked
}

export function getSuggestionImage(item) {
  const featuredProduct = item?.products?.[0]?.type
  return findProductByType(item, featuredProduct)?.image || item?.design?.image || ''
}

export function getMatchedProductType(item, query) {
  const queryProductType = getQueryProductType(query)
  if (!queryProductType) {
    return item?.products?.[0]?.type || null
  }

  const product = findProductByType(item, queryProductType)
  return product?.type || item?.products?.[0]?.type || null
}

export function getMatchedProduct(item, query) {
  const matchedType = getMatchedProductType(item, query)
  return findProductByType(item, matchedType) || item?.products?.[0] || null
}

export function getRecentSearches() {
  return safeReadRecentSearches()
}

export function addRecentSearch(query) {
  const cleanQuery = sanitizeSearchQuery(query)
  if (!cleanQuery) {
    return safeReadRecentSearches()
  }

  const nextSearches = [
    cleanQuery,
    ...safeReadRecentSearches().filter(
      (existing) => existing.toLowerCase() !== cleanQuery.toLowerCase(),
    ),
  ].slice(0, MAX_RECENT_SEARCHES)

  writeRecentSearches(nextSearches)
  return nextSearches
}

export function removeRecentSearch(query) {
  const cleanQuery = sanitizeSearchQuery(query)
  const nextSearches = safeReadRecentSearches().filter(
    (existing) => existing.toLowerCase() !== cleanQuery.toLowerCase(),
  )
  writeRecentSearches(nextSearches)
  return nextSearches
}

export function clearRecentSearches() {
  writeRecentSearches([])
  return []
}
