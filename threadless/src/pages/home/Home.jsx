import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Banner from '../../components/banner/Banner'

export default function Home() {
  return (
    <main className="home-page">
      <Banner />

      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-kicker">Threadless</span>
          <h1>Express your style with premium community art.</h1>
          <p>
            Discover bold designs from independent creators, shop exclusive drops,
            and bring your next favorite tee, mug, or accessory home.
          </p>
          <div className="hero-actions">
            <Link to="/all-products" className="hero-button hero-button-primary">
              Shop best sellers
            </Link>
            <Link to="/community" className="hero-button hero-button-secondary">
              Join the community
            </Link>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Artist Community</h3>
            <p>Join thousands of creators sharing their unique designs and building their careers.</p>
            <Link to="/community" className="feature-link">Learn more →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛍️</div>
            <h3>Premium Products</h3>
            <p>High-quality apparel, accessories, and home goods featuring community designs.</p>
            <Link to="/all-products" className="feature-link">Shop now →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Design Challenges</h3>
            <p>Participate in exciting challenges and get your designs featured on Threadless.</p>
            <Link to="/community" className="feature-link">Get started →</Link>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="cta-content">
          <h2>Ready to start your creative journey?</h2>
          <p>Join our community of artists and shoppers today.</p>
          <div className="cta-actions">
            <Link to="/sell-your-art" className="cta-button cta-button-primary">
              Start selling
            </Link>
            <Link to="/signup" className="cta-button cta-button-secondary">
              Sign up free
            </Link>
          </div>
        </div>
      </section>

      <section className="home-footer-note">
        <p>
          $15 price applies to select tee styles where available. Sale prices as marked.
          Savings percentage and strikethrough pricing based on comparison to regular
          prices of the same items at full-price in Artist Shops or third party retail
          locations and may vary over time.
        </p>
      </section>
    </main>
  )
}
