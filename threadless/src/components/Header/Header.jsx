import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
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
  FaUserCircle,
  FaSearch,
  FaTimes
} from "react-icons/fa";
import { DataContext } from "../../context/DataContext";
import { clearCurrentUser, getCurrentUser, getCurrentUserPhoto } from "../../utils/auth";
import { getCurrentSeller } from "../../utils/sellerAuth";
import {
  addRecentSearch,
  getRecentSearches,
  getMatchedProduct,
  getMatchedProductType,
  getSuggestionImage,
  removeRecentSearch,
  sanitizeSearchQuery,
  searchItems,
} from "../../utils/search";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasViewedNotifications, setHasViewedNotifications] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [currentUserPhoto, setCurrentUserPhoto] = useState(() => getCurrentUserPhoto());
  const [currentSeller, setCurrentSeller] = useState(() => getCurrentSeller());
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { items = [] } = useContext(DataContext);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => getRecentSearches());
  const searchRef = useRef(null);

  const offerNotifications = [
    {
      id: "weekend-print-sale",
      title: "Weekend print sale",
      message: "Save 20% on art prints and wall pieces through Sunday.",
      meta: "Use code ART20",
    },
    {
      id: "sticker-bundle",
      title: "Sticker bundle offer",
      message: "Buy any 3 stickers and get the 4th one free this week.",
      meta: "Auto-applied at checkout",
    },
  ];

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

  useEffect(() => {
    const syncAuth = () => {
      setCurrentUser(getCurrentUser());
      setCurrentUserPhoto(getCurrentUserPhoto());
    };
    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("threadless-auth-updated", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("threadless-auth-updated", syncAuth);
    };
  }, []);

  useEffect(() => {
    const syncSeller = () => {
      setCurrentSeller(getCurrentSeller());
    };
    syncSeller();
    window.addEventListener("storage", syncSeller);
    window.addEventListener("threadless-seller-auth-updated", syncSeller);
    return () => {
      window.removeEventListener("storage", syncSeller);
      window.removeEventListener("threadless-seller-auth-updated", syncSeller);
    };
  }, []);

  useEffect(() => {
    if (!isProfileOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isProfileOpen]);

  useEffect(() => {
    if (!isNotificationOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!notificationRef.current?.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsNotificationOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isNotificationOpen]);

  useEffect(() => {
    if (!isSearchOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSearchOpen]);

  const toggleNotifications = () => {
    const nextOpen = !isNotificationOpen;
    setIsNotificationOpen(nextOpen);

    if (!hasViewedNotifications) {
      setHasViewedNotifications(true);
    }
  };

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

  const searchSuggestions = useMemo(
    () => searchItems(items, searchQuery, 6),
    [items, searchQuery],
  );

  const syncRecentSearches = (nextSearches) => {
    setRecentSearches(nextSearches);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const cleanQuery = sanitizeSearchQuery(searchQuery);

    if (!cleanQuery) {
      setIsSearchOpen(true);
      return;
    }

    syncRecentSearches(addRecentSearch(cleanQuery));
    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(cleanQuery)}`);
  };

  const handleSuggestionSelect = (item) => {
    const nextQuery = sanitizeSearchQuery(item?.design?.title || searchQuery);
    const productType = getMatchedProductType(item, searchQuery);
    setSearchQuery(nextQuery);
    syncRecentSearches(addRecentSearch(nextQuery));
    setIsSearchOpen(false);
    navigate(
      `/search?q=${encodeURIComponent(nextQuery)}&design=${item.id}${
        productType ? `&productType=${encodeURIComponent(productType)}` : ""
      }`,
    );
  };

  const handleRecentSearchSelect = (searchTerm) => {
    const nextQuery = sanitizeSearchQuery(searchTerm);
    setSearchQuery(nextQuery);
    syncRecentSearches(addRecentSearch(nextQuery));
    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(nextQuery)}`);
  };

  const handleRecentSearchRemove = (event, searchTerm) => {
    event.stopPropagation();
    syncRecentSearches(removeRecentSearch(searchTerm));
  };

  const hasSearchPanelContent = searchSuggestions.length > 0 || recentSearches.length > 0;

  return (
    <nav className="navbar">
      <div className="top-bar">
        <Link to="/" className="logo">
          <img
            src="https://cdn-images.threadless.com/threadless-media/images/logo.png"
            alt="threadless"
          />
        </Link>

        <form className="search-wrap" ref={searchRef} onSubmit={handleSearchSubmit}>
          <div className="search-border">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Find art, artists, tags, or products"
              aria-label="Search Threadless products"
            />
          </div>
          <button className="search-icon" type="submit" aria-label="Search">
            <FaSearch />
          </button>

          {isSearchOpen && hasSearchPanelContent ? (
            <div className="search-panel-dropdown" aria-label="Search suggestions">
              {searchSuggestions.length > 0 ? (
                <div className="search-dropdown-section">
                  <div className="search-dropdown-header">
                    <p>Matching Products</p>
                    <span>{searchSuggestions.length}</span>
                  </div>
                  <div className="search-suggestion-list">
                    {searchSuggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="search-suggestion-item"
                        onClick={() => handleSuggestionSelect(item)}
                      >
                        <img
                          src={getMatchedProduct(item, searchQuery)?.image || getSuggestionImage(item)}
                          alt={item.design.title}
                        />
                        <div className="search-suggestion-copy">
                          <strong>{item.design.title}</strong>
                          <span>by {item.design.artist}</span>
                          <small>
                            {(() => {
                              const matchedType = getMatchedProductType(item, searchQuery);
                              const productTypes = item.products.map((product) => product.type);
                              const orderedTypes = matchedType
                                ? [
                                    matchedType,
                                    ...productTypes.filter((productType) => productType !== matchedType),
                                  ]
                                : productTypes;
                              return orderedTypes.join(" | ");
                            })()}
                          </small>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {recentSearches.length > 0 ? (
                <div className="search-dropdown-section">
                  <div className="search-dropdown-header">
                    <p>Recent Searches</p>
                    <span>{recentSearches.length}</span>
                  </div>
                  <div className="search-recent-list">
                    {recentSearches.map((searchTerm) => (
                      <div className="search-recent-item" key={searchTerm}>
                        <button
                          type="button"
                          className="search-recent-link"
                          onClick={() => handleRecentSearchSelect(searchTerm)}
                        >
                          {searchTerm}
                        </button>
                        <button
                          type="button"
                          className="search-recent-remove"
                          aria-label={`Remove ${searchTerm} from recent searches`}
                          onClick={(event) => handleRecentSearchRemove(event, searchTerm)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </form>

        <div className="right-icons">
          <div
            className={`notification-wrap ${isNotificationOpen ? "is-open" : ""}`}
            ref={notificationRef}
          >
            <button
              type="button"
              className="icon-wrap icon-circle notification-trigger"
              aria-label="Offers and announcements"
              aria-expanded={isNotificationOpen}
              onClick={toggleNotifications}
            >
              <FaGlobeAmericas />
              {!hasViewedNotifications ? <span className="badge">2</span> : null}
            </button>

            {isNotificationOpen ? (
              <div className="notification-panel" aria-label="Offers and announcements">
                <div className="notification-header">
                  <div>
                    <p className="notification-kicker">Offers</p>
                    <h3>Latest updates</h3>
                  </div>
                  <span className="notification-count">{offerNotifications.length}</span>
                </div>

                <div className="notification-list">
                  {offerNotifications.map((notification) => (
                    <article className="notification-item" key={notification.id}>
                      <div className="notification-dot"></div>
                      <div className="notification-copy">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                      </div>
                      <span className="notification-meta">{notification.meta}</span>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
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
            {currentSeller ? (
              <Link to="/seller-dashboard" className="sell-art">
                <span>Seller</span>
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link to="/sell-your-art" className="sell-art">
                <span>Sell</span>
                <span>Your Art</span>
              </Link>
            )}
          </div>

          <div className="join-login-group">
            {currentUser ? (
              <div className="auth-group" ref={profileRef}>
                <button
                  type="button"
                  className="profile-trigger"
                  aria-haspopup="menu"
                  aria-expanded={isProfileOpen}
                  onClick={() => setIsProfileOpen((open) => !open)}
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onFocus={() => setIsProfileOpen(true)}
                >
                  {currentUserPhoto ? (
                    <img
                      className="profile-avatar"
                      src={currentUserPhoto}
                      alt="User profile"
                    />
                  ) : (
                    <FaUserCircle />
                  )}
                </button>
                {isProfileOpen ? (
                  <div className="profile-dropdown" role="menu">
                    <div className="profile-item profile-name">
                      Signed in as <strong>{currentUser}</strong>
                    </div>
                    <button
                      type="button"
                      className="profile-menu-item"
                      onClick={() => {
                        clearCurrentUser();
                        setIsProfileOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <Link to="/signup" state={{ backgroundLocation: location }} className="join-btn">
                  JOIN NOW
                </Link>
                <Link to="/login" state={{ backgroundLocation: location }} className="login-lnk">
                  LOGIN
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="nav-menu">
        <div className="nav-item">
          <Link to="/">Home</Link>
        </div>
        <span className="nav-separator">|</span>

        <div className="nav-item">
          <Link to="/all-products">Shop</Link>
          <div className="dropdown compact-dropdown">
            <ul className="dropdown-list compact-list">
              <li><Link to="/all-products">All Products</Link></li>
              <li><Link to="/t-shirts">T-Shirts</Link></li>
              <li><Link to="/hoodies">Hoodies</Link></li>
              <li><Link to="/mugs">Mugs</Link></li>
              <li><Link to="/headwear">Headwear</Link></li>
              <li><Link to="/phone-cases">Phone Cases</Link></li>
            </ul>
          </div>
        </div>
        <span className="nav-separator">|</span>

        <div className="nav-item">
          <Link to="/all-designs">Themes</Link>
          <div className="dropdown compact-dropdown">
            <ul className="dropdown-list compact-list">
              <li><Link to="/all-designs">All Designs</Link></li>
              <li><Link to="/minimalist-modern">Minimalist Modern</Link></li>
              <li><Link to="/daily-satire">Daily Satire</Link></li>
              <li><Link to="/urban-streetart">Urban Streetart</Link></li>
              <li><Link to="/wild-spirit">Wild Spirit</Link></li>
              <li><Link to="/legend-abstract">Legend Abstract</Link></li>
            </ul>
          </div>
        </div>
        <span className="nav-separator">|</span>

        <div className="nav-item">
          <Link to="/all-designs">Artists</Link>
          <div className="dropdown artist-dropdown compact-artist-dropdown">
            <div className="dropdown-grid artist-image-columns">
              {artistColumns.map((column) => (
                <div className="dropdown-col" key={column.title}>
                  <h4>{column.title}</h4>
                  <div className="artist-image-grid">
                    {column.items.map((artistItem) => (
                      <Link
                        key={`${column.title}-${artistItem.id}`}
                        to={`/all-designs?design=${artistItem.id}`}
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
          <Link to="/resources">Resources</Link>
          <div className="dropdown compact-dropdown">
            <ul className="dropdown-list compact-list">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/resources">Creative Blog</Link></li>
            </ul>
          </div>
        </div>
        <span className="nav-separator">|</span>

        <div className="nav-item">
          <Link to="/community">Community</Link>
          <div className="dropdown compact-dropdown">
            <ul className="dropdown-list compact-list">
              <li><Link to="/community">Vote & Submit Designs</Link></li>
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
