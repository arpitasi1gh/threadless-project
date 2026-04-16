import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/Header/Header";
import Cart from "../components/cart/cart";
import Checkout from "../components/cart/Checkout";
import Login from "../components/login/Login";
import Resources from "../pages/Resources/Resources";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import Dashboard from "../pages/Dashboard/Dashboard";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div key={location.pathname} className="route-transition-shell">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<Aboutus />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
