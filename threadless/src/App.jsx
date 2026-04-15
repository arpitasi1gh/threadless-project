import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/footer/Footer'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { DataProvider } from './context/DataProvider'

function App() {
  return (
    <>
      <Header />
      <Footer />
    </>
  )
      <DataProvider>
      <AppRoutes />
    </DataProvider>
    )
}

export default App
