import './Shop.css'
import React, { useContext, useState } from 'react'
import { FaHeart, FaPlus } from 'react-icons/fa'
import Banner from '../../components/banner/Banner'
import ProductCard from '../../components/cards/ProductCard'
import Topbar from '../../components/topbar/Topbar'
import { DataContext } from '../../context/DataContext'
import { useTopbar } from '../../context/TopbarContext'

export default function Shop() {
  const { loading } = useContext(DataContext)
  const { filteredItems } = useTopbar()
  const [selectedItem, setSelectedItem] = useState(null)

  if (loading) {
    return <div className="spinner">Loading amazing cards...</div>
  }

  return (
    <div className="shop-page">
      <Banner />
      <Topbar />
      <div className="card-grid">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="card"
            role="button"
            tabIndex={0}
            onClick={() => setSelectedItem(item)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setSelectedItem(item)
              }
            }}
          >
            <img
              className="card-image"
              src={item.design.image}
              alt={item.design.title}
            />
            <div className="card-meta">
              <div className="card-copy">
                <h3 className="cardTitle">
                  {item.design.title} <span className="cardArtist">by {item.design.artist}</span>
                </h3>
              </div>
              <div className="card-actions">
                <button
                  className="icon-button favorite-button"
                  aria-label="Add to favorites"
                  onClick={(event) => event.stopPropagation()}
                >
                  <FaHeart />
                </button>
                <button
                  className="icon-button add-button"
                  aria-label="View item"
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedItem(item)
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {selectedItem ? (
        <ProductCard
          key={selectedItem.id}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      ) : null}
      <p className="bottom-para">* Savings percentage and strikethrough pricing based on comparison to regular prices of the same items at full-price in Artist Shops or third party retail locations and may vary over time.</p>
    </div>
  )
}

