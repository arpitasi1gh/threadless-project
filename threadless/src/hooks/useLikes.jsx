import { useCallback, useEffect, useState } from 'react'
import { getLikedItems, toggleLikedItem } from '../utils/likes'
import { normalizeToken } from '../utils/products'

export function useLikes() {
  const [likedItems, setLikedItems] = useState(() => getLikedItems())

  useEffect(() => {
    const sync = () => setLikedItems(getLikedItems())
    window.addEventListener('storage', sync)
    window.addEventListener('threadless-likes-updated', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('threadless-likes-updated', sync)
    }
  }, [])

  const toggleLike = useCallback((designId, productType) => {
    toggleLikedItem(designId, productType)
    setLikedItems(getLikedItems())
  }, [])

  const isLiked = useCallback(
    (designId, productType) => {
      const id = Number(designId)
      const token = normalizeToken(productType)
      if (!Number.isFinite(id) || !token) return false
      return likedItems.some((r) => r.designId === id && r.productTypeToken === token)
    },
    [likedItems],
  )

  return {
    likedItems,
    toggleLike,
    isLiked,
    count: likedItems.length,
  }
}
