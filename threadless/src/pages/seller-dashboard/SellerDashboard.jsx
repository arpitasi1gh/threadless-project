import React, { useEffect, useRef, useState } from "react";
import "./SellerDashboard.css";
import { getCurrentSellerShop } from "../../utils/sellerAuth";

const CATEGORIES = ["T-shirt", "Hoodie", "Mug", "Phone Case", "Headwear"];

const CATEGORY_SIZES = {
  "T-shirt": ["S", "M", "L", "XL", "2XL", "3XL"],
  Hoodie: ["S", "M", "L", "XL", "2XL", "3XL"],
  Mug: ['11" x 11"'],
  "Phone Case": ['6" x 3"'],
  Headwear: ['One Size (~22")'],
};

const SIZE_DISPLAY = {
  "T-shirt": "Sizes available up to 3XL",
  Hoodie: "Sizes available up to 3XL",
  Mug: '11" x 11"',
  "Phone Case": '6" x 3"',
  Headwear: 'One Size (~22")',
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(false);
  const [sellerShop, setSellerShop] = useState(() => getCurrentSellerShop());
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const fileRef = useRef(null);

  const resetForm = () => {
    setName("");
    setCategory("");
    setSizes([]);
    setPrice("");
    setImage("");
    setDescription("");
  };

  const isFormValid =
    name.trim() && category && sizes.length > 0 && price && image;

  const handleFile = (file) => {
    if (!file?.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (event) => setImage(event.target?.result ?? "");
    reader.readAsDataURL(file);
  };

  const onDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    if (event.dataTransfer.files[0]) {
      handleFile(event.dataTransfer.files[0]);
    }
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );
  };

  useEffect(() => {
    if (category && CATEGORY_SIZES[category]?.length === 1) {
      setSizes([...CATEGORY_SIZES[category]]);
      return;
    }

    setSizes([]);
  }, [category]);

  useEffect(() => {
    const syncSeller = () => setSellerShop(getCurrentSellerShop());
    syncSeller();
    window.addEventListener("storage", syncSeller);
    window.addEventListener("threadless-seller-auth-updated", syncSeller);
    return () => {
      window.removeEventListener("storage", syncSeller);
      window.removeEventListener("threadless-seller-auth-updated", syncSeller);
    };
  }, []);

  const handleSubmit = () => {
    if (!isFormValid) return;

    const newProduct = {
      id: crypto.randomUUID(),
      name: name.trim(),
      category,
      sizes,
      price,
      image,
      description: description.trim(),
      reviewStatus: "This item is currently under review by our team to check its authenticity.",
    };

    setProducts((prev) => [newProduct, ...prev]);
    resetForm();
    setShowForm(false);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    setProducts((prev) =>
      prev.map((product) =>
        product.id === deleteTarget ? { ...product, removing: true } : product,
      ),
    );

    setTimeout(() => {
      setProducts((prev) => prev.filter((product) => product.id !== deleteTarget));
      setDeleteTarget(null);
    }, 300);
  };

  const handlePriceChange = (value) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  const renderSizeLabel = (product) => {
    if (product?.sizes?.length) {
      return product.sizes.join(" · ");
    }
    return SIZE_DISPLAY[product.category] || "";
  };

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <div className="shop-badge">
          <svg
            className="shop-badge-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
          {sellerShop?.shopName ? sellerShop.shopName : "Your Artist Shop"}
        </div>
        <h1 className="dashboard-title">Artist Dashboard</h1>
        <p className="dashboard-welcome">
          Welcome, <strong>{sellerShop?.username ? sellerShop.username : "Artist"}</strong>
        </p>
        {sellerShop?.email ? <p className="dashboard-email">{sellerShop.email}</p> : null}
      </header>

      <button
        className={`fab-button ${showForm ? "open" : ""}`}
        onClick={() => {
          setShowForm((value) => !value);
          if (showForm) resetForm();
        }}
        aria-label="Add product"
      >
        +
      </button>

      {showForm && (
        <>
          <div
            className="overlay"
            onClick={() => {
              setShowForm(false);
              resetForm();
            }}
          />

          <div className="form-modal">
            <div className="form-modal-header">
              <span className="form-modal-title">Add New Product</span>
              <button
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                aria-label="Close form"
              >
                x
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                className="form-input"
                placeholder="My Awesome Design"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={80}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Choose Style</label>
              <div className="select-wrap">
                <select
                  className="form-select"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="">Select a style...</option>
                  {CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <span className="select-arrow" aria-hidden="true">
                  <svg
                    className="product-card-style-icon"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                  </svg>
                </span>
              </div>
            </div>

            {category && (
              <div className="form-group">
                <label className="form-label">Available Sizes</label>
                <div className="size-chips">
                  {CATEGORY_SIZES[category].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`size-chip ${sizes.includes(size) ? "active" : ""}`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Price</label>
              <div className="price-input-wrap">
                <span className="price-prefix">$</span>
                <input
                  className="form-input"
                  placeholder="29.99"
                  value={price}
                  onChange={(event) => handlePriceChange(event.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Upload Design</label>
              {image ? (
                <div className="upload-preview-wrap">
                  <img src={image} alt="Preview" className="upload-preview" />
                  <button
                    className="remove-preview"
                    onClick={() => setImage("")}
                    aria-label="Remove preview"
                  >
                    x
                  </button>
                </div>
              ) : (
                <div
                  className={`upload-area ${dragOver ? "drag-over" : ""}`}
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                >
                  {/* <div className="upload-icon">^</div> */}
                  <div className="upload-text">Drag and drop or click to upload</div>
                </div>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => {
                  if (event.target.files?.[0]) {
                    handleFile(event.target.files[0]);
                  }
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">About the Design</label>
              <textarea
                className="form-textarea"
                placeholder="Tell us about your design..."
                value={description}
                onChange={(event) => setDescription(event.target.value.slice(0, 300))}
                maxLength={300}
              />
              <div className="char-counter">{description.length}/300</div>
            </div>

            {name && (
              <div className="live-preview">
                <div className="live-preview-title">Preview</div>
                <div className="live-preview-card">
                  {image && <img src={image} alt="" className="live-preview-img" />}
                  <div className="live-preview-info">
                    <h4>{name}</h4>
                    <p>
                      {category || "No category"}
                      {price ? ` · $${price}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              className="submit-btn"
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              Add Product
            </button>
          </div>
        </>
      )}

      {toast && <div className="success-toast">Product added successfully</div>}

      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">A</div>
          <h3>No products yet</h3>
          <p>
            Click the <span>+</span> button to upload your first design and start
            selling.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${product.removing ? "card-removing" : ""}`}
            >
              <div className="product-card-img-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-card-img"
                />
                <button
                  className="delete-btn"
                  onClick={() => setDeleteTarget(product.id)}
                  aria-label="Delete product"
                >
                  x
                </button>
              </div>
              <div className="product-card-body">
                <div className="product-card-category">{product.category}</div>
                <div className="product-card-name">{product.name}</div>
                <div className="product-card-size">{renderSizeLabel(product)}</div>
                <div className="product-card-price">${product.price}</div>
                {product.reviewStatus ? (
                  <div className="product-card-status">{product.reviewStatus}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div
          className="confirm-modal-overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div className="confirm-modal" onClick={(event) => event.stopPropagation()}>
            <h3>Delete Product?</h3>
            <p>
              Are you sure you want to delete this product? This action cannot be
              undone.
            </p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="btn-delete" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
