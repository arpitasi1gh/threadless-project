import './App.css'
import AppRoutes from './routes/AppRoutes'
import { DataProvider } from './context/DataProvider'
import TopbarProvider from './context/TopbarProvider'

function App() {
  return (
    <DataProvider>
      <TopbarProvider>
        <AppRoutes />
      </TopbarProvider>
    </DataProvider>
  )
}

export default App

