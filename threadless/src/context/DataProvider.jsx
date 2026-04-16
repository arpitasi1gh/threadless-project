import React, { useState, useEffect, useContext } from 'react'
import localData from '../data/data.json'
import { DataContext } from './DataContext'

export const DataProvider = ({ children }) => {
  const [items, setItems] = useState(localData)
  const loading = false

  return (
    <DataContext.Provider value={{ items, products: items, loading }}>
      {children}https://github.com/arpitasi1gh/threadless-project/pull/15/conflict?name=threadless%252Fsrc%252Fcontext%252FDataProvider.jsx&ancestor_oid=60e0875f8d346f642c6e632658299b61e0091ac0&base_oid=d41cd3e5d8358324e5c04ec334f6bb24b2fe0616&head_oid=d2e0bd34f62a63961e1db43d972d3595bbd3569e
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
