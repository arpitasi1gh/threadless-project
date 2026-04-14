import './App.css'
import AppRoutes from './routes/AppRoutes'
import { DataProvider } from './context/DataProvider'

function App() {
  return (
      <DataProvider>
      <AppRoutes />
    </DataProvider>
    )
}

export default App
