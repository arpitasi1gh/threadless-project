import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaInstagram, FaFacebook, FaDiscord, FaTiktok, FaPinterest, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      {/* Newsletter + Social */}
      <div className="top-section">

        <div className="newsletter">
          <h2>JOIN OUR NEWSLETTER</h2>
          <p>Get new art every week in your inbox!</p>

          <div className="newsletter-input">
            <input type="email" placeholder="Your email address" />
            <button>JOIN</button>
          </div>
        </div>

        <div className="social">
          <h2>FOLLOW US ONLINE</h2>
          <p>Join thousands of art lovers just like you!</p>

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

      {/* Links Section */}
      <div className="links">

        <div className="column">
          <h3><a href="#">SHOP</a></h3>
          <ul>
            <li><a href="#">Artists</a></li>
            <li><a href="#">Themes</a></li>
            <li><a href="#">Apparel</a></li>
            <li><a href="#">Headwear</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">Wall Art</a></li>
            <li><a href="#">Home Decor</a></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </div>

        <div className="column">
          <h3><a href="#">COMMUNITY</a></h3>
          <ul>
            <li><a href="#">Sell Merch</a></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Social</a></li>
            <li><a href="#">Promo</a></li>
          </ul>
        </div>

        <div className="column">
          <h3><a href="#">INFO</a></h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Our Values</a></li>
            <li><a href="#">Diversity & Inclusion</a></li>
            <li><a href="#">Order Status</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">Students</a></li>
          </ul>
        </div>
      
        <div className="Happy">
          <a href="#" className="brand-link">
            <img src="/Pictures/happiness.png" alt="happiness" />
            <p>Your Happiness,<br /> Guaranteed</p>
          </a>
        </div>

        <div className="artist">
          <a href="#" className="brand-link">
          <img src="/Pictures/artistshops.png" alt="artistshops" />
          <p>The Easiest Way <br />To Sell Art Online</p>
          </a>
        </div>

      </div>

      <div className="line"></div>

      {/* Cookie Bar */}
      {/* <div className="cookie-bar">
        <p>
          By using this website, you agree to our use of cookies.
        </p>
        <button>OK</button>
      </div> */}

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © 2026, a <a href="">Threadless LLC</a> company. All designs copyright by owner. <br />
         <a href="">Privacy Policy</a> |
         <a href="">Terms of Use</a> |
         <a href="">Community Safety & Anti-Hate Policies</a> |
         <a href="">Return and Refund Policy</a>.
        </p>
      </div>

    </footer>
  );
}

export default Footer;
