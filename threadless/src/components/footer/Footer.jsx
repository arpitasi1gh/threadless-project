import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebook, FaDiscord, FaTiktok, FaPinterest, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-top">
          <div className="newsletter">
            <div className="section-label">Newsletter</div>
            <h2>JOIN OUR NEWSLETTER</h2>
            <p>Get new art every week in your inbox.</p>
          </div>

          <div className="newsletter-input">
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Enter your email address"
              aria-label="Email address"
            />
            <button>JOIN</button>
          </div>

          <div className="social">
            <div className="section-label">Follow Us</div>
            <p>Join thousands of art lovers.</p>

            <div className="icons">
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Discord"><FaDiscord /></a>
              <a href="#" aria-label="TikTok"><FaTiktok /></a>
              <a href="#" aria-label="Pinterest"><FaPinterest /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <div className="line"></div>

        <div className="links">
          <div className="column">
            <h3><a href="#">ARTISTS</a></h3>
            <ul>
              <li><a href="#">New Designs</a></li>
              <li><a href="#">Popular Picks</a></li>
            </ul>
          </div>

          <div className="column">
            <h3><a href="#">COMMUNITY</a></h3>
            <ul>
              <li><a href="#">Vote Designs</a></li>
              <li><a href="#">Submit Design</a></li>
            </ul>
          </div>

          <div className="column">
            <h3><a href="#">INFO</a></h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Resources</a></li>
            </ul>
          </div>

          <div className="Happy">
            <img src="/Pictures/happiness.png" alt="happiness" />
            <p>Your Happiness, Guaranteed</p>
          </div>

          <div className="artist">
            <a href="#" className="brand-link">
              <img src="/Pictures/artistshops.png" alt="artistshops" />
              <p>The Easiest Way To Sell Art Online</p>
            </a>
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
