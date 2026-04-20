import { normalizeToken } from './products'

const STORAGE_KEY = 'threadless_liked_items'
const LEGACY_KEY = 'threadless_liked_design_ids'

function migrateLegacy() {
  if (typeof window === 'undefined') return
  try {
    if (!localStorage.getItem(LEGACY_KEY)) return
    localStorage.removeItem(LEGACY_KEY)
  } catch {
    // ignore
  }
}

function persist(rows) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
  window.dispatchEvent(new Event('threadless-likes-updated'))
}

/**
 * @returns {{ designId: number, productTypeToken: string }[]}
 */
export function getLikedItems() {
  migrateLegacy()
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = JSON.parse(raw || '[]')
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((row) => ({
        designId: Number(row?.designId),
        productTypeToken: normalizeToken(row?.productTypeToken ?? row?.productType ?? ''),
      }))
      .filter((row) => Number.isFinite(row.designId) && row.productTypeToken)
  } catch {
    return []
  }
}

function rowKey(designId, productTypeToken) {
  return `${Number(designId)}::${normalizeToken(productTypeToken)}`
}

/** @returns {boolean} whether the item is liked after toggle */
export function toggleLikedItem(designId, productType) {
  const id = Number(designId)
  const token = normalizeToken(productType)
  if (!Number.isFinite(id) || !token) return false

  const key = rowKey(id, token)
  const current = getLikedItems()
  const map = new Map(current.map((r) => [rowKey(r.designId, r.productTypeToken), r]))
  const wasLiked = map.has(key)
  if (wasLiked) {
    map.delete(key)
  } else {
    map.set(key, { designId: id, productTypeToken: token })
  }
  persist([...map.values()])
  return !wasLiked
}

export function removeLikedItem(designId, productType) {
  const id = Number(designId)
  const token = normalizeToken(productType)
  if (!Number.isFinite(id) || !token) return
  const key = rowKey(id, token)
  const next = getLikedItems().filter((r) => rowKey(r.designId, r.productTypeToken) !== key)
  persist(next)
}

export function isItemLiked(designId, productType) {
  const id = Number(designId)
  const token = normalizeToken(productType)
  if (!Number.isFinite(id) || !token) return false
  const key = rowKey(id, token)
  return getLikedItems().some((r) => rowKey(r.designId, r.productTypeToken) === key)
}
