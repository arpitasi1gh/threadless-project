import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebook, FaDiscord, FaTiktok, FaPinterest, FaYoutube } from "react-icons/fa";

function Footer() {
  const communityLinks = {
    instagram: "https://www.instagram.com/threadless/",
    facebook: "https://www.facebook.com/threadless",
    discord: "https://discord.com/invite/threadless",
    tiktok: "https://www.tiktok.com/in/about",
    pinterest: "https://in.pinterest.com/threadless/",
    youtube: "https://www.youtube.com/threadless",
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

          <form className="newsletter-form">
            <label className="newsletter-input" htmlFor="footer-email">
              <span className="newsletter-input-label">Email address</span>
              <input
                id="footer-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter your email address"
                aria-label="Email address"
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
