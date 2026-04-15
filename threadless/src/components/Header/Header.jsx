import { Link } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import "./Header.css";
import {
  FaInstagram,
  FaFacebookF,
  FaDiscord,
  FaTiktok,
  FaPinterestP,
  FaYoutube,
  FaGlobeAmericas,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import { DataContext } from "../../context/DataContext";

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const { items = [] } = useContext(DataContext);

  useEffect(() => {
    const updateCartCount = () => {
      const storedItems = JSON.parse(localStorage.getItem("threadless_cart_items") || "[]");
      const nextCount = storedItems.reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0,
      );
      setCartCount(nextCount);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("threadless-cart-updated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("threadless-cart-updated", updateCartCount);
    };
  }, []);

  const artistColumns = useMemo(() => {
    const safeItems = Array.isArray(items) ? items : [];
    const fallback = safeItems.slice(0, 9);
    const byTag = (tag) =>
      safeItems
        .filter((item) => item?.design?.tags?.includes(tag))
        .slice(0, 3);

    const newDesigns = byTag("new");
    const trending = byTag("trending");
    const popular = byTag("popular");

    return [
      {
        title: "New Designs",
        items: newDesigns.length ? newDesigns : fallback.slice(0, 3),
      },
      {
        title: "Trending",
        items: trending.length ? trending : fallback.slice(3, 6),
      },
      {
        title: "Popular Picks",
        items: popular.length ? popular : fallback.slice(6, 9),
      },
    ];
  }, [items]);

  return (
    <nav className="navbar">
      <div className="top-bar">
        <Link to="/" className="logo">
          <img
            src="https://cdn-images.threadless.com/threadless-media/images/logo.png"
            alt="threadless"
          />
        </Link>

        <div className="search-wrap">
          <div className="search-border">
            <input type="text" placeholder="Find Art on Threadless" />
          </div>
          <button className="search-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </button>
        </div>

        <div className="right-icons">
          <div className="icon-wrap icon-circle" aria-label="region">
            <FaGlobeAmericas />
            <span className="badge">1</span>
          </div>

          <Link to="/cart" className="icon-wrap icon-circle" aria-label="cart">
            <FaShoppingCart />
            {cartCount > 0 ? <span className="badge cart-badge">{cartCount}</span> : null}
          </Link>

          <div className="icon-wrap icon-circle" aria-label="wishlist">
            <FaHeart />
          </div>
          <div className="divider"></div>

          <div className="sell-login-group">
            <Link to="/" className="sell-art">
              <span>Sell</span>
              <span>Your Art</span>
            </Link>
          </div>

          <div className="join-login-group">
            <Link to="/login" className="join-btn">
              JOIN NOW
            </Link>
            <Link to="/login" className="login-lnk">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="nav-menu">
        <div className="nav-item">
          <Link to="/shop">Shop</Link>
          <div className="dropdown compact-dropdown">
            <ul className="dropdown-list compact-list">
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop">T-Shirts</Link></li>
              <li><Link to="/shop">Hoodies</Link></li>
              <li><Link to="/shop">Mugs</Link></li>
              <li><Link to="/shop">Headwear</Link></li>
              <li><Link to="/shop">Phone Cases</Link></li>
            </ul>
          </div>
        </div>
        <span className="nav-separator">|</span>

        <div className="nav-item">
          <Link to="/shop">Artists</Link>
          <div className="dropdown artist-dropdown compact-artist-dropdown">
            <div className="dropdown-grid artist-image-columns">
              {artistColumns.map((column) => (
                <div className="dropdown-col" key={column.title}>
                  <h4>{column.title}</h4>
                  <div className="artist-image-grid">
                    {column.items.map((artistItem) => (
                      <Link
                        key={`${column.title}-${artistItem.id}`}
                        to={`/shop?design=${artistItem.id}`}
                        className="artist-image-link"
                        title={`${artistItem.design.title} by ${artistItem.design.artist}`}
                      >
                        <img
                          src={artistItem.design.image}
                          alt={artistItem.design.title}
                          loading="lazy"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className="nav-separator">|</span>

        <div className="nav-item">
          <Link to="/shop">Themes</Link>
          <div className="dropdown compact-dropdown">
            <ul className="dropdown-list compact-list">
              <li><Link to="/shop">Animal Kingdom</Link></li>
              <li><Link to="/shop">Lifestyle & Humor</Link></li>
              <li><Link to="/shop">Abstract / Minimal</Link></li>
              <li><Link to="/shop">Geeky & Fantasy</Link></li>
            </ul>
          </div>
        </div>
        <span className="nav-separator">|</span>

        <div className="nav-item">
          <Link to="/resources">Resources</Link>
          <div className="dropdown compact-dropdown">
            <ul className="dropdown-list compact-list">
              <li><Link to="/resources">About</Link></li>
              <li><Link to="/resources">Help / FAQ</Link></li>
              <li><Link to="/resources">Pricing</Link></li>
            </ul>
          </div>
        </div>
        <span className="nav-separator">|</span>

        <div className="nav-item">
          <Link to="/shop">Community</Link>
          <div className="dropdown compact-dropdown">
            <ul className="dropdown-list compact-list">
              <li><Link to="/shop">Vote Designs</Link></li>
              <li><Link to="/shop">Submit Design</Link></li>
            </ul>
            <div className="social-icons compact-socials">
              <FaInstagram />
              <FaFacebookF />
              <FaDiscord />
              <FaTiktok />
              <FaPinterestP />
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
