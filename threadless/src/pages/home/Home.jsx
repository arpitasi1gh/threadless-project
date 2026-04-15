import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import img1 from './images/1.webp'
import img2 from './images/2.webp'
import img3 from './images/3.webp'
import img4 from './images/4.webp'
import img5 from './images/5.webp'
import img6 from './images/6.webp'
import img7 from './images/7.webp'
import img8 from './images/8.webp'
import img9 from './images/9.webp'

const gridItems = [
  { src: img1, to: '/product/1' },
  { src: img2, to: '/shop' },
  { src: img3, to: '/product/3' },
  { src: img4, to: '/product/4' },
  { src: img5, to: '/product/5' },
  { src: img6, to: '/product/6' },
  { src: img7, to: '/product/7' },
  { src: img8, to: '/product/8' },
  { src: img9, to: '/product/9' },
]

export default function Home() {
  return (
    <div>
      <div className="grid-01">
        {gridItems.map(({ src, to }, index) => (
          <div key={index} className={`sub-grid-0${index + 1}`}>
            {src && (
              <Link to={to} className="grid-link">
                <img src={src} alt={`Grid item ${index + 1}`} />
              </Link>
            )}
          </div>
        ))}
      </div>
      <p className="bottom-para">
        **$15 price applies to select tee styles where available. Sale prices as marked. For a limited time only.
        <br />
        *Savings percentage and strikethrough pricing based on comparison to regular prices of the same items at full-price in Artist Shops or third party retail locations and may vary over time.
      </p>
    </div>
  )
}
