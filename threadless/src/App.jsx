import './App.css'
import { DataProvider } from './context/DataProvider'
import AppRoutes from './routes/AppRoutes'
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
