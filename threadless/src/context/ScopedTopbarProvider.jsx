import React, { useMemo, useState } from 'react'
import { TopbarContext } from './TopbarContext'

const DEFAULT_COUNT_NOUN = { singular: 'product', plural: 'products' }

const FILTER_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Trending', label: 'Trending' },
  { value: 'Featured', label: 'Featured' },
  { value: 'Popular', label: 'Popular' },
  { value: 'New', label: 'New' },
  { value: 'On Sale', label: 'On Sale' }
]

const SORT_OPTIONS = [
  { value: 'Name A-Z', label: 'Name (A-Z)' },
  { value: 'Name Z-A', label: 'Name (Z-A)' },
  { value: 'Price:LowToHigh', label: 'Price (Low To High)' },
  { value: 'PriceHighToLow', label: 'Price (High To Low)' }
]

const FILTER_TAG_MAP = {
  Trending: 'trending',
  Featured: 'featured',
  Popular: 'popular',
  New: 'new',
  'On Sale': 'on-sale'
}

const getMinPrice = (item) => {
  const prices =
    item?.products?.flatMap(
      (product) => product?.variants?.map((variant) => variant?.price) ?? [],
    ) ?? []
  const numericPrices = prices.filter((price) => typeof price === 'number')
  if (numericPrices.length === 0) return Number.POSITIVE_INFINITY
  return Math.min(...numericPrices)
}

const getDesignTitle = (item) => item?.design?.title ?? item?.designTitle ?? ''
const getDesignArtist = (item) => item?.design?.artist ?? item?.artist ?? ''
const getStableId = (item) => {
  const raw = item?.id ?? item?.designId ?? ''
  const asNumber = Number(raw)
  return Number.isFinite(asNumber) ? asNumber : String(raw)
}

function shuffleInPlace(list) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}

export default function ScopedTopbarProvider({
  items,
  children,
  countNoun = DEFAULT_COUNT_NOUN,
  allCountOverride,
  defaultSortBy = 'Price:LowToHigh',
  sortOptions = SORT_OPTIONS,
  filterOptions = FILTER_OPTIONS,
}) {
  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items])
  const [sortBy, setSortBy] = useState(defaultSortBy)
  const [filterBy, setFilterBy] = useState('All')

  const filteredItems = useMemo(() => {
    let result = [...safeItems]

    if (filterBy !== 'All') {
      const tag = FILTER_TAG_MAP[filterBy]
      if (tag) {
        result = result.filter((item) => item?.design?.tags?.includes(tag))
      }
    }

    switch (sortBy) {
      case 'None':
        result.sort((a, b) => {
          const aId = getStableId(a)
          const bId = getStableId(b)
          if (typeof aId === 'number' && typeof bId === 'number') return aId - bId
          return String(aId).localeCompare(String(bId))
        })
        break
      case 'Random':
        shuffleInPlace(result)
        break
      case 'Design A-Z':
        result.sort((a, b) => getDesignTitle(a).localeCompare(getDesignTitle(b)))
        break
      case 'Design Z-A':
        result.sort((a, b) => getDesignTitle(b).localeCompare(getDesignTitle(a)))
        break
      case 'Artist A-Z':
        result.sort((a, b) => {
          const byArtist = getDesignArtist(a).localeCompare(getDesignArtist(b))
          if (byArtist !== 0) return byArtist
          return getDesignTitle(a).localeCompare(getDesignTitle(b))
        })
        break
      case 'Artist Z-A':
        result.sort((a, b) => {
          const byArtist = getDesignArtist(b).localeCompare(getDesignArtist(a))
          if (byArtist !== 0) return byArtist
          return getDesignTitle(b).localeCompare(getDesignTitle(a))
        })
        break
      case 'Price:LowToHigh':
        result.sort((a, b) => getMinPrice(a) - getMinPrice(b))
        break
      case 'PriceHighToLow':
        result.sort((a, b) => getMinPrice(b) - getMinPrice(a))
        break
      case 'Name A-Z':
        result.sort((a, b) =>
          getDesignTitle(a).localeCompare(getDesignTitle(b)),
        )
        break
      case 'Name Z-A':
        result.sort((a, b) =>
          getDesignTitle(b).localeCompare(getDesignTitle(a)),
        )
        break
      default:
        break
    }

    return result
  }, [safeItems, filterBy, sortBy])

  return (
    <TopbarContext.Provider
      value={{
        sortBy,
        setSortBy,
        filterBy,
        setFilterBy,
        filteredItems,
        totalCount: filteredItems.length,
        allCount: typeof allCountOverride === 'number' ? allCountOverride : safeItems.length,
        countNoun,
        filterOptions,
        sortOptions,
      }}
    >
      {children}
    </TopbarContext.Provider>
  )
}
