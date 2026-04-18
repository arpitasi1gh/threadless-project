import { useContext, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ArtistShop.css";

import testimonialAvatar from "../../assets/images/testimonial-avatar.png";
import categoryAccessories from "../../assets/images/category-accessories.jpg";
import categoryHomegoods from "../../assets/images/category-homegoods.jpg";
import { DataContext } from "../../context/DataContext";
import { findSellerShop, saveSellerShop, setCurrentSeller } from "../../utils/sellerAuth";
import { validatePassword, validateUsername } from "../../utils/auth";

const categories = [
  { label: "All", icon: "🌟", active: true },
  { label: "T-Shirt", icon: "👕", active: false },
  { label: "Hoodie", icon: "🧥", active: false },
  { label: "Mug", icon: "☕", active: false },
  { label: "Phone Case", icon: "📱", active: false },
  { label: "Headwear", icon: "🎩", active: false },
];

const ArtistShop = () => {
  const { items = [] } = useContext(DataContext);
  const navigate = useNavigate();
  const [sellerMode, setSellerMode] = useState("signup"); // 'signup' | 'login'
  const [sellerEmail, setSellerEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [sellerUsername, setSellerUsername] = useState("");
  const [sellerPassword, setSellerPassword] = useState("");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [sellerError, setSellerError] = useState("");
  const [sellerStatus, setSellerStatus] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const signupCardRef = useRef(null);

  const scrollToSignupCard = () => {
    signupCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const productShowcase = useMemo(() => {
    const safeItems = Array.isArray(items) ? items : [];
    const typeOrder = ["T-Shirt", "hoodie", "mug", "phonecase", "headwear"];

    const headlineFromAbout = (about) => {
      const value = String(about || "").trim();
      if (!value) return "";
      const firstSentence = value.split(".")[0]?.trim();
      return firstSentence || value;
    };

    const flattened = [];
    for (const item of safeItems) {
      const designTitle = item?.design?.title;
      const products = Array.isArray(item?.products) ? item.products : [];
      for (const product of products) {
        if (!product?.image) continue;
        flattened.push({
          key: `${item?.id || designTitle || "design"}-${product.type}-${product.image}`,
          type: String(product.type || "").trim(),
          image: product.image,
          headline: headlineFromAbout(product.about) || `${String(product.type || "").trim()} by ${item?.design?.artist || "Threadless"}`,
        });
      }
    }

    flattened.sort((a, b) => {
      const ai = typeOrder.indexOf(a.type);
      const bi = typeOrder.indexOf(b.type);
      const aRank = ai === -1 ? typeOrder.length : ai;
      const bRank = bi === -1 ? typeOrder.length : bi;
      if (aRank !== bRank) return aRank - bRank;
      return a.headline.localeCompare(b.headline);
    });

    return flattened;
  }, [items]);

  const visibleProducts = useMemo(() => {
    const mapLabelToType = {
      "T-Shirt": "T-Shirt",
      Hoodie: "hoodie",
      Mug: "mug",
      "Phone Case": "phonecase",
      Headwear: "headwear",
    };

    const type = mapLabelToType[activeCategory];
    const filtered = activeCategory === "All" ? productShowcase : productShowcase.filter((p) => p.type === type);
    return filtered.slice(0, 8);
  }, [activeCategory, productShowcase]);

  const submitSellerSignup = (event) => {
    event.preventDefault();
    setSellerError("");
    setSellerStatus("");

    const emailValue = String(sellerEmail || "").trim();
    const shopValue = String(shopName || "").trim();
    const usernameValue = String(sellerUsername || "").trim();
    const passwordValue = String(sellerPassword || "");

    if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setSellerError("Please enter a valid email address.");
      return;
    }

    if (!shopValue) {
      setSellerError("Please enter your shop name.");
      return;
    }

    const usernameValidation = validateUsername(usernameValue);
    if (!usernameValidation.ok) {
      setSellerError(usernameValidation.message);
      return;
    }

    const passwordStatus = validatePassword(passwordValue);
    if (!passwordStatus.ok) {
      setSellerError("Password does not match the required criteria.");
      return;
    }

    const existing = findSellerShop({ email: emailValue, username: usernameValue });
    if (existing) {
      setSellerError("This email or username already exists. Please log in instead.");
      setSellerMode("login");
      setLoginIdentifier(usernameValue || emailValue);
      setLoginPassword("");
      return;
    }

    saveSellerShop({
      email: emailValue,
      shopName: shopValue,
      username: usernameValue,
      password: passwordValue,
    });
    setCurrentSeller(usernameValue);
    navigate("/seller-dashboard");
  };

  const submitSellerLogin = (event) => {
    event.preventDefault();
    setSellerError("");
    setSellerStatus("");

    const identifierValue = String(loginIdentifier || "").trim();
    const passwordValue = String(loginPassword || "");
    if (!identifierValue) {
      setSellerError("Please enter your email or username.");
      return;
    }
    if (!passwordValue) {
      setSellerError("Please enter your password.");
      return;
    }

    const isEmail = identifierValue.includes("@");
    const shop = findSellerShop(isEmail ? { email: identifierValue } : { username: identifierValue });
    if (!shop) {
      setSellerError("Shop account not found. Please create your shop first.");
      setSellerMode("signup");
      setSellerEmail(isEmail ? identifierValue : "");
      setSellerUsername(isEmail ? "" : identifierValue);
      return;
    }

    if (String(shop.password || "") !== passwordValue) {
      setSellerError("Password is incorrect. Please try again.");
      return;
    }

    setCurrentSeller(shop.username);
    navigate("/seller-dashboard");
  };

  return (
    <div className="artist-shop">
      {/* ===== HERO ===== */}
      <section className="hero-section">
        <div className="hero-left">
          <h1 className="hero-title-script">Artist</h1>
          <p className="hero-title-bold">SHOPS</p>
          <p className="hero-description">
            Turn your illustrations, paintings, photography, and digital art
            into a full product line. Free to launch, free to run — you just
            create.
          </p>

          <div className="hero-testimonial">
            <img
              src={testimonialAvatar}
              alt="Tara McPherson"
              className="testimonial-avatar"
              width={56}
              height={56}
            />
            <div>
              <p className="testimonial-text">
                "It's hard to keep all sizes in stock when you are self-
                producing. Which is exactly why I thought this was such a great
                opportunity to do this collaboration with Artist Shops."
              </p>
              <p className="testimonial-author">
                Tara McPherson, Tara McPherson
              </p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="signup-card" ref={signupCardRef}>
            <h3>Start Your Free Shop</h3>
            {sellerMode === "signup" ? (
              <form className="seller-form" onSubmit={submitSellerSignup}>
                <input
                  type="email"
                  className="signup-input"
                  placeholder="Email ID"
                  value={sellerEmail}
                  onChange={(e) => setSellerEmail(e.target.value)}
                  autoComplete="email"
                  aria-label="Email ID"
                />
                <input
                  type="text"
                  className="signup-input"
                  placeholder="Shop Name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  aria-label="Shop Name"
                />
                <input
                  type="text"
                  className="signup-input"
                  placeholder="Username"
                  value={sellerUsername}
                  onChange={(e) => setSellerUsername(e.target.value)}
                  autoComplete="username"
                  aria-label="Username"
                />
                <input
                  type="password"
                  className="signup-input"
                  placeholder="Password"
                  value={sellerPassword}
                  onChange={(e) => setSellerPassword(e.target.value)}
                  autoComplete="new-password"
                  aria-label="Password"
                />

                {sellerError ? <p className="seller-error">{sellerError}</p> : null}
                {sellerStatus ? <p className="seller-status">{sellerStatus}</p> : null}

                <div className="seller-rules">
                  <p>Passwords should be at least 12 characters</p>
                  <p>Include lower and uppercase and at least one number</p>
                  <p>Include at least one of special characters from !@#$%</p>
                </div>

                <button className="signup-btn" type="submit">
                  CREATE MY SHOP! <span>🚀</span>
                </button>

                <p className="signup-login">
                  Already have a shop?{" "}
                  <button
                    className="signup-login-link"
                    type="button"
                    onClick={() => {
                      setSellerError("");
                      setSellerStatus("");
                      setSellerMode("login");
                      setLoginIdentifier(sellerUsername || sellerEmail);
                      setLoginPassword("");
                    }}
                  >
                    Log In
                  </button>
                </p>
              </form>
            ) : (
              <form className="seller-form" onSubmit={submitSellerLogin}>
                <input
                  type="text"
                  className="signup-input"
                  placeholder="Email ID or Username"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  autoComplete="username"
                  aria-label="Email ID or Username"
                />
                <input
                  type="password"
                  className="signup-input"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  aria-label="Password"
                />

                {sellerError ? <p className="seller-error">{sellerError}</p> : null}
                {sellerStatus ? <p className="seller-status">{sellerStatus}</p> : null}

                <button className="signup-btn" type="submit">
                  LOG IN
                </button>

                <p className="signup-login">
                  New here?{" "}
                  <button
                    className="signup-login-link"
                    type="button"
                    onClick={() => {
                      setSellerError("");
                      setSellerStatus("");
                      setSellerMode("signup");
                      setLoginPassword("");
                    }}
                  >
                    Create a shop
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===== BUILT FOR ARTISTS ===== */}
      <section className="built-section">
        <h2 className="section-title">Built for Artists & Designers</h2>
        <p className="section-subtitle">
          Whether you're a freelance illustrator, fine artist, or graphic
          designer — Threadless gives you a professional storefront and handles
          everything from printing to shipping.
        </p>

        <div className="built-grid">
          <div className="built-image-cell">
            <img
              src="https://cdn-images.threadless.com/threadless-media/shops_vertical/showcase/apparel7.jpg?w=1200"
              alt="Custom Apparel"
              width={800}
              height={960}
            />
            <span className="built-image-label">Custom Apparel</span>
          </div>
          <div className="built-feature-card">
            <div className="built-feature-icon">🏪</div>
            <h4>Custom Merch Store</h4>
            <p>
              Get your own branded online store with a custom URL, logo, and
              design. Fully customizable and free to launch.
            </p>
          </div>
          <div className="built-feature-card">
            <div className="built-feature-icon">💰</div>
            <h4>No Upfront Costs</h4>
            <p>
              Zero fees to start. No inventory, no fulfillment, no risk. You
              only make money when you sell something.
            </p>
          </div>
        </div>

        <div className="features-row">
          <div className="feature-small-card">
            <div className="feature-small-icon">📦</div>
            <h4>200+ Products</h4>
            <p>
              Print on t-shirts to mugs, stickers, phone cases, wall art — pick
              from over 200 product types.
            </p>
          </div>
          <div className="feature-small-card">
            <div className="feature-small-icon">✏️</div>
            <h4>Design Tools</h4>
            <p>
              Upload your artwork and get our full browser editing tools.
              Supports multiple file types and transparency.
            </p>
          </div>
          <div className="feature-small-card">
            <div className="feature-small-icon">🎨</div>
            <h4>Drag & Drop Product Creator</h4>
            <p>
              Create products in seconds with our full-service suite. Position
              your art, preview mock-ups, and publish — no design software
              needed.
            </p>
          </div>
          <div className="feature-small-card">
            <div className="feature-small-icon">🪙</div>
            <h4>No Upfront Costs</h4>
            <p>
              Zero fees to start. No inventory, no minimums, no risk. We only
              make money when you sell something.
            </p>
          </div>
        </div>

        <div className="bottom-features">
          <div className="price-card">
            <div className="feature-small-icon">💵</div>
            <h4>Set Your Own Prices</h4>
            <p>
              You decide your profit margin on every product. Earn as much or as
              little as you want per sale.
            </p>
          </div>
          <div className="category-image-card">
            <img
              src={categoryAccessories}
              alt="Accessories"
              loading="lazy"
              width={640}
              height={640}
            />
            <span className="category-image-label">Accessories</span>
          </div>
          <div className="category-image-card">
            <img
              src={categoryHomegoods}
              alt="Home Goods"
              loading="lazy"
              width={640}
              height={640}
            />
            <span className="category-image-label">Home Goods</span>
          </div>
        </div>
      </section>

      <section className="how-section">
        <h2 className="section-title">How It Works</h2>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-number">1</div>
            <div>
              <h4>Create Your Free Shop</h4>
              <p>
                Sign up in seconds. Name your shop, pick a custom URL, and
                you're in.
              </p>
            </div>
          </div>
          <div className="how-step">
            <div className="how-step-number">2</div>
            <div>
              <h4>Upload Your Designs</h4>
              <p>
                Add your artwork. Pick from 100s of products to put them on.
              </p>
            </div>
          </div>
          <div className="how-step">
            <div className="how-step-number">3</div>
            <div>
              <h4>Start Earning</h4>
              <p>
                Share your shop link. We print, ship, and handle customer
                service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">Sell On 100s of Products</h2>
        <p className="section-subtitle">
          T-shirts, hoodies, mugs, stickers, posters, phone cases, and more. No
          minimum orders. Unlimited designs.
        </p>

        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`category-tab ${activeCategory === cat.label ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.label)}
              type="button"
            >
              <span className="category-tab-icon">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {visibleProducts.map((product) => (
            <div className="product-card" key={product.key}>
              <div className="product-card-image">
                <img
                  src={product.image}
                  alt={product.headline}
                  loading="lazy"
                  width={512}
                  height={512}
                />
              </div>
              <p className="product-card-name">{product.headline}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>
          Ready to Launch
          <br />
          Your Artist Shop?
        </h2>
        <p>It's free. It's easy. And it takes less than 60 seconds.</p>
        <button className="cta-btn" type="button" onClick={scrollToSignupCard}>
          LAUNCH YOUR ARTIST SHOP
        </button>
      </section>
    </div>
  );
};

export default ArtistShop;
