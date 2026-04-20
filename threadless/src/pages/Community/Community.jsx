import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Community.css";
import { getCurrentUser, getCurrentUserProfile } from "../../utils/auth";

import card1Img1 from "../../assets/images/card1-img1.jpg";
import card1Img2 from "../../assets/images/card1-img2.jpg";
import card1Img3 from "../../assets/images/card1-img3.jpg";
import card1Img4 from "../../assets/images/card1-img4.jpg";
import card1Img5 from "../../assets/images/card1-img5.jpg";
import card2Img1 from "../../assets/images/card2-img1.jpg";
import card2Img2 from "../../assets/images/card2-img2.jpg";
import card2Img3 from "../../assets/images/card2-img3.jpg";
import card2Img4 from "../../assets/images/card2-img4.jpg";
import card2Img5 from "../../assets/images/card2-img5 (1).jpg";
import dccThumb from "../../assets/images/dcc-thumb (1).jpg";
import dccHeroBg from "../../assets/images/dcc-hero-bg.jpg";
import blogBanner from "../../assets/images/blog-banner.jpg";
import artistShopBanner from "../../assets/images/artist-shop-banner.jpg";
import artistResourcesBanner from "../../assets/images/artist-resources-banner.jpg";

const card1Images = [card1Img1, card1Img2, card1Img3, card1Img4, card1Img5];
const card2Images = [card2Img1, card2Img2, card2Img3, card2Img4, card2Img5];

const card1DesignMeta = [
  { title: "Carl and Princess Donut", artist: "DavenArt" },
  { title: "Dungeon Glamour", artist: "PixelPaladin" },
  { title: "Crawlers Unite", artist: "NeonHatch" },
  { title: "Princess Donut Supreme", artist: "InkWarden" },
  { title: "Loot & Chaos", artist: "RogueSketch" },
];

const card2DesignMeta = [
  { title: "No Breaking!", artist: "Joustice" },
  { title: "Dungeon Rules", artist: "ArcadeScribe" },
  { title: "Boss Fight Energy", artist: "RetroRune" },
  { title: "You Will Not Break Me", artist: "GlyphGrove" },
  { title: "Crawler Chaos", artist: "ByteBrush" },
];

const DiscordIcon = () => (
  <svg className="social-icon" viewBox="0 0 71 55" fill="white">
    <path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.7 40.7 0 00-1.8 3.7 54 54 0 00-16.2 0A26.4 26.4 0 0025.4.3a.2.2 0 00-.2-.1A58.4 58.4 0 0010.5 4.9a.2.2 0 00-.1.1C1.5 18.7-.9 32.2.3 45.5v.1a58.7 58.7 0 0017.7 9 .2.2 0 00.3-.1 42 42 0 003.6-5.9.2.2 0 00-.1-.3 38.7 38.7 0 01-5.5-2.6.2.2 0 01 0-.4l1.1-.9a.2.2 0 01.2 0 41.9 41.9 0 0035.6 0 .2.2 0 01.2 0l1.1.9a.2.2 0 010 .4 36.3 36.3 0 01-5.5 2.6.2.2 0 00-.1.3 47.1 47.1 0 003.6 5.9.2.2 0 00.3.1 58.5 58.5 0 0017.7-9v-.1c1.4-15.1-2.4-28.2-10.1-39.8a.2.2 0 00-.1-.1zM23.7 37.3c-3.4 0-6.3-3.2-6.3-7s2.8-7 6.3-7 6.4 3.1 6.3 7-2.8 7-6.3 7zm23.2 0c-3.4 0-6.3-3.2-6.3-7s2.8-7 6.3-7 6.4 3.1 6.3 7-2.8 7-6.3 7z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="white">
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.3-2.2.4-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4a3.9 3.9 0 01-1.4-.9 3.9 3.9 0 01-.9-1.4c-.2-.4-.3-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2M12 0C8.7 0 8.3 0 7 .1 5.7.1 4.8.3 4 .6a5.9 5.9 0 00-2.1 1.3A5.9 5.9 0 00.6 4C.3 4.8.1 5.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c0 1.3.2 2.2.5 3a5.9 5.9 0 001.3 2.1A5.9 5.9 0 004 23.4c.8.3 1.7.5 3 .5 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3 0 2.2-.2 3-.5a5.9 5.9 0 002.1-1.3 5.9 5.9 0 001.3-2.1c.3-.8.5-1.7.5-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c0-1.3-.2-2.2-.5-3a5.9 5.9 0 00-1.3-2.1A5.9 5.9 0 0020 .6c-.8-.3-1.7-.5-3-.5C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-10.8a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8z" />
  </svg>
);

const PinterestIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="white">
    <path d="M12 0a12 12 0 00-4.4 23.2c-.1-.9-.2-2.3 0-3.3.2-.9 1.4-5.8 1.4-5.8s-.4-.7-.4-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.4-1 3.7-.3 1.2.6 2.1 1.7 2.1 2.1 0 3.7-2.2 3.7-5.4 0-2.8-2-4.8-4.9-4.8-3.3 0-5.3 2.5-5.3 5.1 0 1 .4 2.1.9 2.7.1.1.1.2.1.3l-.3 1.3c-.1.2-.2.3-.4.2-1.5-.7-2.4-2.9-2.4-4.7 0-3.8 2.8-7.3 8-7.3 4.2 0 7.5 3 7.5 7 0 4.2-2.6 7.6-6.3 7.6-1.2 0-2.4-.6-2.8-1.4l-.8 3c-.3 1.1-.1 2.4-.5 3.4A12 12 0 1012 0z" />
  </svg>
);

const TiktokIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="white">
    <path d="M19.3 6.4a5.1 5.1 0 01-3.1-1.5A5.1 5.1 0 0115.1 2h-3.6v13.4a2.9 2.9 0 01-2.9 2.7 2.9 2.9 0 01-2.9-2.9 2.9 2.9 0 012.9-2.9c.3 0 .6 0 .9.1V8.7a6.5 6.5 0 00-.9-.1A6.5 6.5 0 002 15.2a6.5 6.5 0 006.5 6.5 6.5 6.5 0 006.5-6.5V8.8a8.6 8.6 0 005.1 1.6V6.8a5.1 5.1 0 01-.8-.4z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="white">
    <path d="M24 12a12 12 0 10-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.7.2 2.7.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0024 12z" />
  </svg>
);

const Community = () => {
  const [card1Score, setCard1Score] = useState(null);
  const [card2Score, setCard2Score] = useState(null);
  const [authMessage, setAuthMessage] = useState("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [designName, setDesignName] = useState("");
  const [designImage, setDesignImage] = useState(null);
  const [designImagePreview, setDesignImagePreview] = useState("");
  const [designAbout, setDesignAbout] = useState("");
  const [modalError, setModalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUserProfile = getCurrentUserProfile();
  const currentUsername = currentUserProfile?.username || getCurrentUser() || "";
  const currentEmail = currentUserProfile?.email || "";

  const handleScore = (card, score) => {
    if (card === 1) setCard1Score(score);
    else setCard2Score(score);
  };

  const handleSubmitDesign = (event) => {
    event.preventDefault();
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setAuthMessage("Login or Signup to Submit a Challenge");
      return;
    }
    setAuthMessage("");
    setIsSubmitModalOpen(true);
  };

  const handleDesignImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setDesignImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setDesignImagePreview(e.target?.result || "");
    };
    reader.readAsDataURL(file);
  };

  const closeModal = () => {
    setIsSubmitModalOpen(false);
    setModalError("");
  };

  const handleModalSubmit = async () => {
    if (!designName.trim() || !designImage || !designAbout.trim()) {
      setModalError("Please complete all fields before submitting your design.");
      return;
    }
    
    // Prevent duplicate submissions
    if (isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    setModalError("");
    
    try {
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDesignName("");
      setDesignImage(null);
      setDesignImagePreview("");
      setDesignAbout("");
      setIsSubmitModalOpen(false);
      alert("Your design is successfully submitted and is under review by our threadless team!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCardImage = (card) => {
    const images = card === 1 ? card1Images : card2Images;
    const score = card === 1 ? card1Score : card2Score;
    if (score === null) return images[0];
    return images[score - 1];
  };

  const getCardMeta = (card) => {
    const meta = card === 1 ? card1DesignMeta : card2DesignMeta;
    const score = card === 1 ? card1Score : card2Score;
    const index = score === null ? 0 : Math.max(0, Math.min(meta.length - 1, score - 1));
    return meta[index] || meta[0];
  };

  return (
    <div className="community-page">
      {/* Hero */}
      <section className="community-hero">
        <h1>Threadless Community: Powered by You</h1>
        <p>
          Whether you're an artist, an art lover, or simply on the hunt for your
          next favorite piece, your voice matters here at Threadless! By scoring
          Design Challenge submissions and sharing your input,{" "}
          <strong>you wield the power</strong> to influence our marketplace
          directly. Your participation elevates deserving artists, helping them
          gain visibility and grow their following, while you uncover new art
          that resonates with your style. Join us in spotlighting talent that
          reflects the diversity and brilliance of our worldwide community! See
          the different ways to participate at Threadless below.
        </p>
      </section>

      {/* Score Designs */}
      <section className="score-section">
        <h2>Score Designs: Discover &amp; Curate</h2>
        <div className="score-showcase">
          <div className="score-cards">
            {/* Card 1 */}
            <div className="score-card">
              <div className="score-card-top">
                <div className="score-card-image-wrapper">
                  <img src={getCardImage(1)} alt="Design submission" />
                  <div className="score-card-watermark">
                    <span>threadless</span>
                    <span>DUNGEON CRAWLER CARL</span>
                  </div>
                </div>
                <div className="score-buttons">
                  <span className="love-label">LOVE IT</span>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <button
                      key={n}
                      className={`score-btn ${card1Score === n ? "active" : ""}`}
                      onClick={() => handleScore(1, n)}
                    >
                      {n}
                    </button>
                  ))}
                  <span className="meh-label">MEH</span>
                </div>
              </div>
              <div className="score-card-bottom">
                <img
                  className="score-card-bottom-thumb"
                  src={dccThumb}
                  alt="DCC"
                />
                <div className="score-card-bottom-info">
                  <h4>{getCardMeta(1).title}</h4>
                  <p>Design by {getCardMeta(1).artist}</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="score-card">
              <div className="score-card-top">
                <div className="score-card-image-wrapper">
                  <img src={getCardImage(2)} alt="Design submission" />
                  <div className="score-card-watermark">
                    <span>threadless</span>
                    <span>DUNGEON CRAWLER CARL</span>
                  </div>
                </div>
                <div className="score-buttons">
                  <span className="love-label">LOVE IT</span>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <button
                      key={n}
                      className={`score-btn ${card2Score === n ? "active" : ""}`}
                      onClick={() => handleScore(2, n)}
                    >
                      {n}
                    </button>
                  ))}
                  <span className="meh-label">MEH</span>
                </div>
              </div>
              <div className="score-card-bottom">
                <img
                  className="score-card-bottom-thumb"
                  src={dccThumb}
                  alt="DCC"
                />
                <div className="score-card-bottom-info">
                  <h4>{getCardMeta(2).title}</h4>
                  <p>Design by {getCardMeta(2).artist}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit to a Design Challenge */}
      <section className="challenge-section">
        <h2>Submit to a Design Challenge</h2>

        {/* Hero Banner */}
        <div className="dcc-banner">
          <div className="dcc-hero-image">
            <img src={dccHeroBg} alt="Dungeon Crawler Carl" />
          </div>

          {/* Attention Heading */}
          <div className="dcc-attention">
            <h3>ATTENTION ALL CRAWLERS</h3>
          </div>

          {/* Two Column Content */}
          <div className="dcc-content">
            <div className="dcc-left">
              <h4>
                <em>
                  New Quest Activated: The Dungeon Crawler Carl Design
                  Challenge.
                </em>
              </h4>
              <p>
                Prepare for a legendary quest as we summon the creative
                community to capture the chaos of Dungeon Crawler Carl. We have
                teamed up with Matt Dinniman to invite you into the dungeon for
                an official Artist Series design challenge. Selected designs
                will be sold at the{" "}
                Official Dungeon Crawler Carl Merch Store.
              </p>
              <p>
                This is your chance to submit original designs inspired by your
                favorite Crawlers, NPCs, Game Guides, Gods, Pets, and
                catastrophic life choices. Whether you are capturing the majesty
                of Princess Donut, Carl's iconic 'You will not break me' moments
                (and his suspiciously supple feet), or the absurdity of the
                latest floor boss, we want to see your authentic creative
                vision.
              </p>
              <p>
                Art has always been the visual heartbeat of the dungeon, and now
                it is time for your expression to become Official Loot. This is
                a closed challenge, meaning designs will be up for public voting
                to help determine who earns a spot in this exclusive collection.
                While our top three winners will receive major cash prizes, the
                opportunity for rewards does not stop there. Any additional
                designs selected for the official collection by Threadless and
                Matt Dinniman will receive a one-time payment of $300 USD.
              </p>
              <p>
                <strong>Now let's be clear.</strong> The System AI does not
                compete with knockoff basement creators trained on stolen cat
                pictures and mediocre fantasy wallpapers. This is a design
                challenge, not a prompt lottery. This challenge is strictly
                human-centered; no AI-generated work is allowed. Submit
                human-made work or crawl away.
              </p>
              <p>
                The clock is ticking. Carl may or may not notice, but Donut
                absolutely will. Get in there and draw, draw, draw!
              </p>

              <p className="dcc-submissions-date">
                <strong>
                  ACCEPTING SUBMISSIONS BEGINNING MONDAY 03/16/2026, 10:00AM CST
                </strong>
              </p>

              

             
            </div>

            <div className="dcc-right">
              <h4 className="dcc-details-heading">
                CHALLENGE DETAILS{" "}
                
                  Legal stuff
               
              </h4>
              <ul className="dcc-details-list">
                <li>First Prize: $5,000 USD</li>
                <li>Second Prize: $2,500 USD</li>
                <li>Third Prize: $1,000 USD</li>
                <li>
                  First, Second, and Third prize winners will all receive a
                  Dungeon Crawler Carl paperback book with the original cover
                  art by Luciano Fleitas, signed by Matt Dinniman.
                </li>
                <li>
                  Any additional designs selected for the official collection by
                  Threadless and Matt Dinniman will receive a one-time payment
                  of $300 USD.
                </li>
              </ul>

              <h4 className="dcc-notes-heading">CHALLENGE NOTES</h4>
              <ul className="dcc-notes-list">
                <li>
                  <strong>No AI Allowed:</strong> We are looking for raw,
                  authentic, human-made perspectives only.
                </li>
                <li>
                  <strong>Voting Only:</strong> Submitted designs are for public
                  voting and selection purposes and are not immediately
                  available for sale by the artist.
                </li>
                <li>
                  <strong>Rights &amp; Ownership:</strong> Artists retain all
                  intellectual property rights in their Submission. If selected
                  for sale, the artist grants Matt Dinniman, LLC an exclusive
                  license for merchandise, but cannot use that design on apparel
                  or Threadless. Unselected designs remain fully retained by the
                  artist, subject to Dungeon Crawler Carl rights.
                </li>
              </ul>

              <button
                type="button"
                className="dcc-submit-btn"
                onClick={handleSubmitDesign}
              >
                SUBMIT A DESIGN
              </button>

              {authMessage ? (
                <p className="dcc-auth-message">{authMessage}</p>
              ) : null}

              <p className="dcc-note-text">
                An Artist Shop is required to submit. If you do not have one,
                one will be created for you automatically when you click the
                "Submit A Design" button.
              </p>

              {isSubmitModalOpen ? (
                <div className="submit-modal-overlay" onClick={closeModal}>
                  <div className="submit-modal" onClick={(event) => event.stopPropagation()}>
                    <div className="submit-modal-header">
                      <h3>Submit Your Design</h3>
                      <button
                        type="button"
                        className="submit-modal-close"
                        onClick={closeModal}
                        aria-label="Close"
                      >
                        ×
                      </button>
                    </div>

                    <div className="submit-modal-body">
                      <label>Username</label>
                      <input type="text" value={currentUsername} disabled />

                      <label>Email</label>
                      <input type="email" value={currentEmail} disabled />

                      <label>Design Name</label>
                      <input
                        type="text"
                        value={designName}
                        onChange={(e) => setDesignName(e.target.value)}
                        placeholder="Enter your design name"
                      />

                      <label>Design Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleDesignImageChange}
                      />
                      {designImagePreview ? (
                        <div className="design-image-preview">
                          <img src={designImagePreview} alt="Design preview" />
                        </div>
                      ) : null}

                      <label>About Design</label>
                      <textarea
                        value={designAbout}
                        onChange={(e) => setDesignAbout(e.target.value)}
                        placeholder="Tell us about your design"
                        rows={4}
                      />

                      {modalError ? <p className="submit-modal-error">{modalError}</p> : null}

                      <button
                        type="button"
                        className="submit-modal-submit"
                        onClick={handleModalSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit a Design"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              <p className="dcc-note-text">
                <em>
                  Note: Designs submitted to this challenge cannot be published
                  for sale without approval.
                </em>
              </p>
              <p className="dcc-note-text">
                Submit from:{" "}
                <strong>March 19 – April 27, 2026 at 11:59:59</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other Useful Resources */}
      <section className="resources-section">
        <h2>Explore Other Useful Resources</h2>
        <div className="resources-grid">
          <Link className="resource-card" to="/resources">
            <img src={blogBanner} alt="Read Our Blog" loading="lazy" />
          </Link>
          <Link className="resource-card" to="/sell-your-art">
            <img
              src={artistShopBanner}
              alt="Start An Artist Shop"
              loading="lazy"
            />
          </Link>
          <Link className="resource-card" to="/resources">
            <img
              src={artistResourcesBanner}
              alt="Artist Resources"
              loading="lazy"
            />
          </Link>
        </div>
      </section>

      {/* Connect & Share on Social */}
      <section className="social-section">
        <div className="social-divider" />
        <h2>Connect &amp; Share on Social</h2>
        <div className="social-grid">
          <a
            className="social-card social-card-discord"
            href="https://discord.com/invite/threadless"
            target="_blank"
            rel="noreferrer noopener"
          >
            <DiscordIcon />
            <span>DISCORD</span>
          </a>
          <a
            className="social-card social-card-instagram"
            href="https://www.instagram.com/threadless/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <InstagramIcon />
            <span>INSTAGRAM</span>
          </a>
          <a
            className="social-card social-card-pinterest"
            href="https://in.pinterest.com/threadless/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <PinterestIcon />
            <span>PINTEREST</span>
          </a>
        </div>
        <div className="social-grid-bottom">
          <a
            className="social-card social-card-tiktok"
            href="https://www.tiktok.com/in/about"
            target="_blank"
            rel="noreferrer noopener"
          >
            <TiktokIcon />
            <span>TIKTOK</span>
          </a>
          <a
            className="social-card social-card-facebook"
            href="https://www.facebook.com/threadless"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FacebookIcon />
            <span>FACEBOOK</span>
          </a>
        </div>
      </section>

      <p className="footer-note">
        * Savings percentage and strikethrough pricing based on comparison to
        regular prices of the same items at full-price in Artist Shops or third
        party retail locations. Savings may vary over time.
      </p>
    </div>
  );
};

export default Community;
