import { Route, Routes } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Header from '../components/Header/Header'
import Home from '../pages/home/Home'
import Shop from '../pages/shop/Shop'

export default function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      <Footer />
    </>
  )
}
