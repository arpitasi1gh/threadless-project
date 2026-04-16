import './App.css'

import { DataProvider } from './context/DataProvider'
import AppRoutes from './routes/AppRoutes'
import TopbarProvider from './context/TopbarProvider'

import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
  
    <DataProvider>
      <Dashboard/>
      <AppRoutes />
      
   
    </DataProvider>
  )
}

export default App

