import { useRef, useState } from "react";
import "./ArtistShop.css";

import heroClothing from "../../assets/images/hero-clothing.jpg";
import testimonialAvatar from "../../assets/images/testimonial-avatar.png";
import categoryAccessories from "../../assets/images/category-accessories.jpg";
import categoryHomegoods from "../../assets/images/category-homegoods.jpg";
import productTshirt from "../../assets/images/product-tshirt.jpg";
import productHoodie from "../../assets/images/product-hoodie.jpg";
import productSweatshirt from "../../assets/images/product-sweatshirt.jpg";
import productPullover from "../../assets/images/product-pullover.jpg";
import productBlanket from "../../assets/images/product-blanket.jpg";
import productHeavyweight from "../../assets/images/product-heavyweight.jpg";

const categories = [
  { label: "All", icon: "🌟", active: true },
  { label: "T-Shirt", icon: "👕", active: false },
  { label: "Hoodie", icon: "🧥", active: false },
  { label: "Mug", icon: "☕", active: false },
  { label: "Phone Case", icon: "📱", active: false },
  { label: "Headwear", icon: "🎩", active: false },
];

const productsRow1 = [
  {
    image: productTshirt,
    name: "THE essential, elevated Premium Zip-Up Hoodie",
  },
  {
    image: productHoodie,
    name: "THE essential, elevated Premium Zip-Up Hoodie",
  },
  {
    image: productSweatshirt,
    name: "Premium crew sweatshirt, refined and built to last",
  },
  {
    image: productPullover,
    name: "Premium crew sweatshirt, refined and built to last",
  },
];

const productsRow2 = [
  {
    image: productPullover,
    name: "Premium pullover hoodie with durability, comfort, and elevated details",
  },
  {
    image: productHoodie,
    name: "Premium pullover hoodie with durability, comfort, and elevated details",
  },
  {
    image: productBlanket,
    name: "100% soft cotton woven throw blanket available in three sizes",
  },
  {
    image: productHeavyweight,
    name: "Comfort Colors garment-dyed heavyweight t-shirt in 25 colors",
  },
];

const ArtistShop = () => {
  const [email, setEmail] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const signupCardRef = useRef(null);

  const scrollToSignupCard = () => {
    signupCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
            <span className="signup-step">Step 1</span>
            <input
              type="email"
              className="signup-input"
              placeholder="Enter Your Email to Get Started"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Enter your email to get started"
            />
            <button className="signup-btn" type="button">
              CONTINUE <span>?</span>
            </button>
            <p className="signup-login">
              Already have a shop? <a href="#login">Log In</a>
            </p>
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
          {productsRow1.map((product, idx) => (
            <div className="product-card" key={`r1-${idx}`}>
              <div className="product-card-image">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={512}
                  height={512}
                />
              </div>
              <p className="product-card-name">{product.name}</p>
            </div>
          ))}
        </div>

        <div className="products-grid" style={{ marginTop: "24px" }}>
          {productsRow2.map((product, idx) => (
            <div className="product-card" key={`r2-${idx}`}>
              <div className="product-card-image">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={512}
                  height={512}
                />
              </div>
              <p className="product-card-name">{product.name}</p>
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
