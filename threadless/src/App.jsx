import './App.css'
import { DataProvider } from './context/DataProvider'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <DataProvider>
      <AppRoutes />
    </DataProvider>
  )
}

export default App
