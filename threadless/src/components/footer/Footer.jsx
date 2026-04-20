import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebook, FaDiscord, FaTiktok, FaPinterest, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const communityLinks = {
    instagram: "https://www.instagram.com/threadless/",
    facebook: "https://www.facebook.com/threadless",
    discord: "https://discord.com/invite/threadless",
    tiktok: "https://www.tiktok.com/in/about",
    pinterest: "https://in.pinterest.com/threadless/",
    youtube: "https://www.youtube.com/threadless",
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for subscribing to our newsletter!");
  };

  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-top">
          <div className="newsletter">
            <div className="section-label">Newsletter</div>
            <h2>JOIN OUR NEWSLETTER</h2>
            <p>Get new art every week in your inbox.</p>
          </div>

          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <label className="newsletter-input" htmlFor="footer-email">
              <span className="newsletter-input-label">Email address</span>
              <input
                id="footer-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                required
              />
            </label>
            <button type="submit">JOIN</button>
          </form>

          <div className="social">
            <div className="section-label">Follow Us</div>
            <p>Join thousands of art lovers.</p>

            <div className="icons">
              <a href={communityLinks.instagram} target="_blank" rel="noreferrer" aria-label="Threadless on Instagram"><FaInstagram /></a>
              <a href={communityLinks.facebook} target="_blank" rel="noreferrer" aria-label="Threadless on Facebook"><FaFacebook /></a>
              <a href={communityLinks.discord} target="_blank" rel="noreferrer" aria-label="Threadless on Discord"><FaDiscord /></a>
              <a href={communityLinks.tiktok} target="_blank" rel="noreferrer" aria-label="Threadless on TikTok"><FaTiktok /></a>
              <a href={communityLinks.pinterest} target="_blank" rel="noreferrer" aria-label="Threadless on Pinterest"><FaPinterest /></a>
              <a href={communityLinks.youtube} target="_blank" rel="noreferrer" aria-label="Threadless on YouTube"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <div className="line"></div>

        <div className="links">
          <div className="column">
            <h3><Link to="/all-designs">ARTISTS</Link></h3>
            <ul>
              <li><Link to="/all-designs">New Designs</Link></li>
              <li><Link to="/all-products">Popular Picks</Link></li>
            </ul>
          </div>

          <div className="column">
            <h3><Link to="/community">COMMUNITY</Link></h3>
            <ul>
              <li><Link to="/community">Vote Designs</Link></li>
              <li><Link to="/sell-your-art">Submit Design</Link></li>
            </ul>
          </div>

          <div className="column">
            <h3><Link to="/about">INFO</Link></h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/resources">Resources</Link></li>
            </ul>
          </div>

          <div className="Happy">
            <img src="/Pictures/happiness.png" alt="happiness" />
            <p>Your Happiness, Guaranteed</p>
          </div>

          <div className="artist">
            <Link to="/sell-your-art" className="brand-link">
              <img src="/Pictures/artistshops.png" alt="artistshops" />
              <p>The Easiest Way To Sell Art Online</p>
            </Link>
          </div>
        </div>

        <div className="line"></div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; 2026, a <a href="">Threadless LLC</a> company. All designs copyright by owner.
          </p>

          <div className="footer-legal">
            <a href="">Privacy Policy</a>
            <a href="">Terms of Use</a>
            <a href="">Community Safety & Anti-Hate Policies</a>
            <a href="">Return and Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
