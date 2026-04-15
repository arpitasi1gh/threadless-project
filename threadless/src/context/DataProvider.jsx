import React, { useState, useEffect } from 'react'
import localData from '../data/data.json'
import { DataContext } from './DataContext'

export const DataProvider = ({ children }) => {
  const [items, setItems] = useState(localData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/69dde351aaba882197f86fd4')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch card data')
        }
        return response.json()
      })
      .then((data) => {
        const nextItems = data.record || data
        if (Array.isArray(nextItems)) {
          setItems(nextItems)
        }
      })
      .catch((error) => {
        console.error('Using local fallback data:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <DataContext.Provider value={{ items, loading }}>
      {children}
    </DataContext.Provider>
  )
}
