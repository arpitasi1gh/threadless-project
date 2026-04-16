import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Header from '../components/Header/Header'
import Cart from '../components/cart/cart'
import Checkout from '../components/cart/Checkout'
import Login from '../components/login/Login'
import Signup from '../components/signup/Signup'
import Resources from '../pages/Resources/Resources'
import Community from '../pages/Community/Community'
import Home from '../pages/home/Home'
import Shop from '../pages/shop/Shop'
import ArtistShop from '../components/sellyourart/ArtistShop'

export default function AppRoutes() {
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation
  const routeLocation = backgroundLocation || location

  return (
    <>
      <Header />
      <div key={routeLocation.pathname} className="route-transition-shell">
        <Routes location={routeLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sell-your-art" element={<ArtistShop />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/community" element={<Community />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      {backgroundLocation ? (
        <Routes location={location}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : null}
      <Footer />
    </>
  )
}
