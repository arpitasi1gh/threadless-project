import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/Header/Header'
import Cart from '../components/cart/cart'
import Checkout from '../components/cart/Checkout'
import Login from '../components/login/Login'
import Signup from '../components/signup/Signup'
import Resources from '../pages/Resources/Resources'
import Community from '../pages/Community/Community'
import Home from '../pages/home/Home'
import AllDesigns from '../pages/all-designs/AllDesigns'
import Aboutus from '../components/aboutus/Aboutus'
import ArtistShop from '../components/sellyourart/ArtistShop'
import SellerDashboard from '../pages/seller-dashboard/SellerDashboard'
import All_Products from '../pages/All_Products/All_Products'
import T_Shirts from '../pages/T_Shirts/T_Shirts'
import Hoodies from '../pages/Hoodies/Hoodies'
import Mugs from '../pages/Mugs/Mugs'
import Phone_Cases from '../pages/Phone_Cases/Phone_Cases'
import Headwear from '../pages/Headwear/Headwear'
import Legend_Abstract from '../pages/Legend_Abstract/Legend_Abstract'
import Minimalist_Modern from '../pages/Minimalist_Modern/Minimalist_Modern'
import Daily_Satire from '../pages/Daily_Satire/Daily_Satire'
import Wild_Spirit from '../pages/Wild_Spirit/Wild_Spirit'
import Urban_Streetart from '../pages/Urban_Streetart/Urban_Streetart'
import SearchResults from '../pages/Search/SearchResults'
import LikedProducts from '../pages/Liked/LikedProducts'

export default function AppRoutes() {
  const location = useLocation()
  const isAuthModalRoute = location.pathname === '/login' || location.pathname === '/signup'
  const explicitBackgroundLocation = location.state?.backgroundLocation

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isAuthModalRoute) return
    window.sessionStorage.setItem(
      'threadless:lastNonAuthRoute',
      JSON.stringify({
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
      }),
    )
  }, [isAuthModalRoute, location.hash, location.pathname, location.search])

  const storedBackgroundLocation = (() => {
    if (typeof window === 'undefined') return null
    try {
      const raw = window.sessionStorage.getItem('threadless:lastNonAuthRoute')
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (!parsed?.pathname) return null
      return parsed
    } catch {
      return null
    }
  })()

  const backgroundLocation =
    explicitBackgroundLocation ||
    (isAuthModalRoute
      ? storedBackgroundLocation || { pathname: '/', search: '', hash: '' }
      : null)

  const routeLocation = backgroundLocation || location

  return (
    <>
      <Header />
      <div key={routeLocation.pathname} className="route-transition-shell">
        <Routes location={routeLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/all-designs" element={<AllDesigns />} />
          <Route path="/shop" element={<AllDesigns />} />
          <Route path="/all-products" element={<All_Products />} />
          <Route path="/t-shirts" element={<T_Shirts />} />
          <Route path="/hoodies" element={<Hoodies />} />
          <Route path="/mugs" element={<Mugs />} />
          <Route path="/phone-cases" element={<Phone_Cases />} />
          <Route path="/headwear" element={<Headwear />} />
          <Route path="/legend-abstract" element={<Legend_Abstract />} />
          <Route path="/minimalist-modern" element={<Minimalist_Modern />} />
          <Route path="/daily-satire" element={<Daily_Satire />} />
          <Route path="/urban-streetart" element={<Urban_Streetart />} />
          <Route path="/wild-spirit" element={<Wild_Spirit />} />
          <Route path="/sell-your-art" element={<ArtistShop />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/community" element={<Community />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/liked" element={<LikedProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      {isAuthModalRoute ? (
        <Routes location={location}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : null}
      <Footer />
    </>
  )
}
