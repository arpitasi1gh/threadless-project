import './App.css'
import { DataProvider } from './context/DataProvider'
import AppRoutes from './routes/AppRoutes'
import Aboutus from './components/aboutus/Aboutus'

function App() {
  return (
    <DataProvider>
      <AppRoutes />
      <Aboutus />
    </DataProvider>
  )
}

export default App
