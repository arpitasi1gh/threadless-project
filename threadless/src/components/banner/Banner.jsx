import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from './banner-on-every-page.jpg'
import bannerSmallImg from './banner-on-every-page-small.jpg'
import './Banner.css'

export default function Banner() {
  return (
    <div className="banner">
      <Link to="/t-shirts">
        <picture>
          <source media="(max-width: 768px)" srcSet={bannerSmallImg} />
          <img src={bannerImg} alt="Bloom or Bust - Tees from $15" />
        </picture>
      </Link>
    </div>
  )
}
