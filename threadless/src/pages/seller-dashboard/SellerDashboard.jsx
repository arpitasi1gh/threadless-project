import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import './SellerDashboard.css'
import { getCurrentSellerShop } from '../../utils/sellerAuth'

export default function SellerDashboard() {
  const shop = useMemo(() => getCurrentSellerShop(), [])

  return (
    <main className="seller-dashboard">
      <div className="seller-dashboard-card">
        <h1>Seller Dashboard</h1>
        {shop?.shopName ? <p className="seller-dashboard-sub">Shop: {shop.shopName}</p> : null}
        {shop?.username ? <p className="seller-dashboard-sub">Username: {shop.username}</p> : null}
        <Link className="seller-dashboard-link" to="/sell-your-art">
          Back to Artist Shops
        </Link>
      </div>
    </main>
  )
}

