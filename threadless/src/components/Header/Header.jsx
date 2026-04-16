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
} from "react-icons/fa";

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const { items = [] } = useContext(DataContext);

  useEffect(() => {
    const updateCartCount = () => {
      const storedItems = JSON.parse(
        localStorage.getItem("threadless_cart_items") || "[]",
      );
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

          <Link to="/cart" className="icon-wrap">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material/24/shopping-cart--v1.png"
              alt="shopping-cart--v1"
            />
            {cartCount > 0 ? (
              <span className="badge cart-badge">{cartCount}</span>
            ) : null}
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
          <Link to="/shop">APPAREL</Link>
          <div className="dropdown apparel-dropdown">
            <p className="dropdown-desc">Shop apparel</p>
            <div className="dropdown-grid">
              <div className="dropdown-col">
                <h4>Men's</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">
                      New Designs <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">Premium T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">Extra Soft T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">Triblend T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">Tanks</Link>
                  </li>
                  <li>
                    <Link to="/shop">Long Sleeve T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Pullover Hoodies <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">V-Necks</Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Sweatshirts <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">Shoes</Link>
                  </li>
                  <li>
                    <Link to="/shop">Socks</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col">
                <h4>Women's</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">
                      New Designs <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">Extra Soft T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">Scoop Necks</Link>
                  </li>
                  <li>
                    <Link to="/shop">V-Necks</Link>
                  </li>
                  <li>
                    <Link to="/shop">Tanks</Link>
                  </li>
                  <li>
                    <Link to="/shop">Long Sleeve T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Sweatshirts <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Pullover Hoodies <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Zip-Up Hoodies <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">Leggings</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shoes</Link>
                  </li>
                  <li>
                    <Link to="/shop">Socks</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col">
                <h4>Unisex</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">
                      New Designs <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Comfort Colors T-Shirt{" "}
                      <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">Cut & Sew T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Sweatshirts <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Pullover Hoodies <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Zip-Up Hoodies <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">Windbreakers</Link>
                  </li>
                  <li>
                    <Link to="/shop">Jackets</Link>
                  </li>
                  <li>
                    <Link to="/shop">Double-Sided T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">Socks</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col">
                <h4>Kids & Babies</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">
                      New Designs <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">Kids T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">Kids Long Sleeves</Link>
                  </li>
                  <li>
                    <Link to="/shop">Kids Hoodies</Link>
                  </li>
                  <li>
                    <Link to="/shop">Toddler T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/shop">Baby Bodysuits</Link>
                  </li>
                  <li>
                    <Link to="/shop">Baby T-Shirts</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col sell-col">
                <div className="sell-art-box themes-img">
                  <img
                    src="https://via.placeholder.com/100x120/90EE90/white?text=TEES"
                    alt="tees"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <p>
                    <strong>TEES FROM $15</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-item">
          <Link to="/shop">HEADWEAR</Link>
          <div className="dropdown headwear-dropdown">
            <p className="dropdown-desc">Shop headwear</p>
            <div className="dropdown-grid">
              <div className="dropdown-col">
                <h4>Printed Hats</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">
                      Trucker Hats <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Baseball Caps <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col hat-img-col">
                <div className="hat-img-box">
                  <img src={truckerHatImage} alt="trucker hat" />
                  <div className="hat-img-label">
                    <strong>SHOP NOW</strong>
                    <p>TRUCKER HATS</p>
                  </div>
                </div>
              </div>
              <div className="dropdown-col">
                <h4>Embroidered Hats</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Snapback Hats</Link>
                  </li>
                  <li>
                    <Link to="/shop">Dad Hats</Link>
                  </li>
                  <li>
                    <Link to="/shop">Beanies</Link>
                  </li>
                  <li>
                    <Link to="/shop">Cuffed Beanies</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col hat-img-col">
                <div className="hat-img-box">
                  <img src={beanieImage} alt="hats" />
                  <div className="hat-img-label">
                    <strong>SHOP NOW</strong>
                    <p>HATS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-item">
          <Link to="/shop">ACCESSORIES</Link>
          <div className="dropdown accessories-dropdown">
            <p className="dropdown-desc">Shop accessories</p>
            <div className="dropdown-grid">
              <div className="dropdown-col">
                <h4>Bags</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Tote Bags</Link>
                  </li>
                  <li>
                    <Link to="/shop">Zip Pouches</Link>
                  </li>
                  <li>
                    <Link to="/shop">Weekender Bags</Link>
                  </li>
                  <li>
                    <Link to="/shop">Drawstring Bags</Link>
                  </li>
                  <li>
                    <Link to="/shop">Laundry Bags</Link>
                  </li>
                  <li>
                    <Link to="/shop">Duffel Bags</Link>
                  </li>
                  <li>
                    <Link to="/shop">Backpacks</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col">
                <h4>Drinkware</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">White Mugs</Link>
                  </li>
                  <li>
                    <Link to="/shop">Black Mugs</Link>
                  </li>
                  <li>
                    <Link to="/shop">Latte Mugs</Link>
                  </li>
                  <li>
                    <Link to="/shop">Travel Mugs</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col">
                <h4>Lifestyle</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">
                      Hats <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Scarves <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">Stickers</Link>
                  </li>
                  <li>
                    <Link to="/shop">Buttons</Link>
                  </li>
                  <li>
                    <Link to="/shop">Magnets</Link>
                  </li>
                  <li>
                    <Link to="/shop">Jigsaw Puzzles</Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Phone Cases <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">Beach Towels</Link>
                  </li>
                  <li>
                    <Link to="/shop">Skateboards</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col">
                <h4>Office</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Mouse Pads</Link>
                  </li>
                  <li>
                    <Link to="/shop">Desk Mats</Link>
                  </li>
                  <li>
                    <Link to="/shop">Greeting Cards</Link>
                  </li>
                  <li>
                    <Link to="/shop">Blank Journals</Link>
                  </li>
                  <li>
                    <Link to="/shop">Lined Journals</Link>
                  </li>
                  <li>
                    <Link to="/shop">Spiral Notebooks</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col sell-col">
                <div className="sell-art-box themes-img">
                  <img
                    src="https://via.placeholder.com/100x120/90EE90/white?text=ACC"
                    alt="accessories"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <p>
                    <strong>SHOP NOW ACCESSORIES</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-item">
          <Link to="/shop">WALL ART</Link>
          <div className="dropdown wallart-dropdown">
            <p className="dropdown-desc">Shop wall art</p>
            <div className="dropdown-grid">
              <div className="dropdown-col">
                <h4>Prints</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Art Prints</Link>
                  </li>
                  <li>
                    <Link to="/shop">Framed Prints</Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Mini Art Prints <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Mini Framed Prints <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">Canvas Prints</Link>
                  </li>
                  <li>
                    <Link to="/shop">Aluminum Prints</Link>
                  </li>
                  <li>
                    <Link to="/shop">Acrylic Prints</Link>
                  </li>
                  <li>
                    <Link to="/shop">Wall Tapestries</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col">
                <h4>Skateboards</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Board Only</Link>
                  </li>
                  <li>
                    <Link to="/shop">Board w/ Hanging Hardware</Link>
                  </li>
                  <li>
                    <Link to="/shop">Basic Complete</Link>
                  </li>
                  <li>
                    <Link to="/shop">Premium Complete</Link>
                  </li>
                  <li>
                    <Link to="/shop">Pro Complete</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col hat-img-col">
                <div className="hat-img-box">
                  <img
                    src="https://via.placeholder.com/160x180/9370DB/white?text=ART"
                    alt="fine art prints"
                  />
                  <div className="hat-img-label">
                    <strong>SHOP NOW</strong>
                    <p>FINE ART PRINTS</p>
                  </div>
                </div>
              </div>
              <div className="dropdown-col">
                <h4>Themes</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Surreal</Link>
                  </li>
                  <li>
                    <Link to="/shop">Landscapes</Link>
                  </li>
                  <li>
                    <Link to="/shop">Graphic Art</Link>
                  </li>
                  <li>
                    <Link to="/shop">Painting</Link>
                  </li>
                  <li>
                    <Link to="/shop">Photography</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col hat-img-col">
                <div className="hat-img-box">
                  <img
                    src="https://via.placeholder.com/160x180/4169E1/white?text=WALL"
                    alt="wall art"
                  />
                  <div className="hat-img-label">
                    <strong>SHOP NOW</strong>
                    <p>WALL ART</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-item">
          <Link to="/dashboard">DASHBOARD</Link>
        </div>
        <div className="nav-item">
          <Link to="/shop">HOME DECOR</Link>

          <div className="dropdown home-dropdown">
            <div className="dropdown-grid">
              {/* Bedroom */}
              <div className="dropdown-col">
                <h4>Bedroom</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">
                      Woven Blankets <span className="new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">Duvet Covers</Link>
                  </li>
                  <li>
                    <Link to="/shop">Blankets</Link>
                  </li>
                  <li>
                    <Link to="/shop">Laundry Bags</Link>
                  </li>
                </ul>
              </div>

              {/* Living */}
              <div className="dropdown-col">
                <h4>Living</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Wall Art</Link>
                  </li>
                  <li>
                    <Link to="/shop">Wall Tapestries</Link>
                  </li>
                  <li>
                    <Link to="/shop">Throw Pillows</Link>
                  </li>
                  <li>
                    <Link to="/shop">Fleece Blankets</Link>
                  </li>
                  <li>
                    <Link to="/shop">Sherpa Blankets</Link>
                  </li>
                  <li>
                    <Link to="/shop">Premium Rugs</Link>
                  </li>
                </ul>
              </div>

              {/* Bathroom */}
              <div className="dropdown-col">
                <h4>Bathroom</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Bath Mats</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shower Curtains</Link>
                  </li>
                  <li>
                    <Link to="/shop">Beach Towels</Link>
                  </li>
                </ul>
              </div>

              {/* Kitchen */}
              <div className="dropdown-col">
                <h4>Kitchen</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Drinkware</Link>
                  </li>
                  <li>
                    <Link to="/shop">Magnets</Link>
                  </li>
                </ul>
              </div>

              {/* Right image box */}
              <div className="dropdown-col sell-col">
                <div className="sell-art-box themes-img">
                  <img
                    src="https://via.placeholder.com/120x150/4A6CF7/white?text=HOME"
                    alt="home decor"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <p>
                    <strong>SHOP NOW HOME DECOR</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-item">
          <Link to="/shop">COMMUNITY</Link>

          <div className="dropdown community-dropdown">
            <div className="dropdown-grid">
              {/* Sell Merch */}
              <div className="dropdown-col">
                <h4>Sell Merch</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Artist Shops</Link>
                  </li>
                  <li>
                    <Link to="/shop">Music Shops</Link>
                  </li>
                  <li>
                    <Link to="/shop">Swag Shops</Link>
                  </li>
                  <li>
                    <Link to="/shop">Non-Profit Shops</Link>
                  </li>
                  <li>
                    <Link to="/shop">Influencer Shops</Link>
                  </li>
                  <li>
                    <Link to="/shop">Everything Shops</Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="dropdown-col">
                <h4>Resources</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Threadless Blog</Link>
                  </li>
                  <li>
                    <Link to="/shop">Artist Shops Help</Link>
                  </li>
                  <li>
                    <Link to="/shop">Creative Resources</Link>
                  </li>
                  <li>
                    <Link to="/shop">Join our Discord</Link>
                  </li>
                  <li>
                    <Link to="/shop">Artist Resources</Link>
                  </li>
                </ul>
              </div>

              {/* Community */}
              <div className="dropdown-col">
                <h4>Community</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Design Challenges</Link>
                  </li>
                  <li>
                    <Link to="/shop">Score Designs</Link>
                  </li>
                  <li>
                    <Link to="/shop">Our Values</Link>
                  </li>
                  <li>
                    <Link to="/shop">Threadless Causes</Link>
                  </li>
                  <li>
                    <Link to="/shop">Sustainability</Link>
                  </li>
                  <li>
                    <Link to="/shop">Diversity & Inclusion</Link>
                  </li>
                  <li>
                    <Link to="/shop">Community Safety</Link>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div className="dropdown-col">
                <h4>Social</h4>
                <div className="social-icons">
                  <FaInstagram />
                  <FaFacebookF />
                  <FaDiscord />
                  <FaTiktok />
                  <FaPinterestP />
                  <FaYoutube />
                </div>
              </div>

              {/* Right side image */}
              <div className="dropdown-col sell-col">
                <div className="sell-art-box themes-img">
                  <img
                    src="https://via.placeholder.com/120x150/87CEEB/black?text=SELL"
                    alt="sell art"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <p>
                    <strong>SELL YOUR ART</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
