import { useEffect, useState } from 'react'

const DEFAULT_COLUMNS = 4

const getColumnsForViewport = (width) => {
  if (width <= 600) return 1
  if (width <= 1024) return 2
  return DEFAULT_COLUMNS
}

export default function useItemsPerPage(rows = 5) {
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_COLUMNS * rows
    return getColumnsForViewport(window.innerWidth) * rows
  })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const onResize = () => {
      setItemsPerPage(getColumnsForViewport(window.innerWidth) * rows)
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [rows])

  return itemsPerPage
}

