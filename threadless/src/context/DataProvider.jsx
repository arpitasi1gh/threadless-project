import React, { useState } from 'react'
import localData from '../data/data.json'
import { DataContext } from './DataContext'

export const DataProvider = ({ children }) => {
  const [items, setItems] = useState(localData)
  const loading = false

  return (
    <DataContext.Provider value={{ items, loading, setItems }}>
      {children}
    </DataContext.Provider>
  )
}
