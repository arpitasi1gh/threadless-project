import { Link } from "react-router-dom";
import "./Header.css";
import { FaInstagram, FaFacebookF, FaDiscord, FaTiktok, FaPinterestP, FaYoutube } from "react-icons/fa";

function Header() {
  const truckerHatImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 190 214'%3E%3Crect width='190' height='214' fill='%23b7d3ef'/%3E%3Cpath d='M16 0h52l-18 76H0V16c0-9 7-16 16-16z' fill='%23a7c7ea' opacity='.72'/%3E%3Cpath d='M83 0h107v86c-23-14-47-19-72-9-18 7-34 4-47-7L83 0z' fill='%23a7c7ea' opacity='.78'/%3E%3Cpath d='M28 91c7-38 33-60 67-60s60 22 67 60v48H28V91z' fill='%23f4f4f2'/%3E%3Cpath d='M28 91c7-38 33-60 67-60v108H28V91z' fill='%23ffffff' opacity='.42'/%3E%3Cpath d='M45 139h100c10 0 21 7 28 21-48 12-104 12-156 0 7-14 18-21 28-21z' fill='%23131313'/%3E%3Cpath d='M78 78c7-10 22-11 33-1 10 10 9 25-2 32-11 8-29 1-34-12-3-7-2-14 3-19z' fill='none' stroke='%23c7ad72' stroke-width='4' stroke-linecap='round'/%3E%3Ccircle cx='113' cy='69' r='7' fill='none' stroke='%23828282' stroke-width='2'/%3E%3Ctext x='115' y='72' font-family='Arial' font-size='7' text-anchor='middle' fill='%23828282'%3Eok%3C/text%3E%3C/svg%3E";
  const beanieImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 190 214'%3E%3Crect width='190' height='214' fill='%23b7d3ef'/%3E%3Cpath d='M0 86c28-23 55-25 82-7 30 20 58 16 108-6V0H0v86z' fill='%23a7c7ea' opacity='.72'/%3E%3Cpath d='M37 87c0-43 24-71 58-71s58 28 58 71v57H37V87z' fill='%23131313'/%3E%3Cpath d='M37 128h116v32c0 7-6 13-13 13H50c-7 0-13-6-13-13v-32z' fill='%23101010'/%3E%3Cpath d='M55 126V72M75 126V45M95 126V30M115 126V45M135 126V72' stroke='%23272727' stroke-width='5'/%3E%3Cpath d='M79 130c10-11 25-11 36 0-3 17-33 17-36 0z' fill='%23f3f3f3'/%3E%3Cpath d='M89 130l16 12M105 130l-16 12' stroke='%23111111' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='97' cy='137' r='5' fill='%23111111'/%3E%3C/svg%3E";

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
          <div className="icon-wrap">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-filled/50/europe.png"
              alt="globe"
            />
            <span className="badge">1</span>
          </div>

          <Link to="/cart" className="icon-wrap">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material/24/shopping-cart--v1.png"
              alt="shopping-cart--v1"
            />
          </Link>

          <div className="icon-wrap">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-filled/50/like.png"
              alt="wishlist"
            />
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
          <Link to="/artists">ARTISTS</Link>
          <div className="dropdown artist-dropdown">
            <div className="dropdown-grid">
              <div className="dropdown-col">
                <h4>
                  New Artists <span className="new-badge">NEW</span>
                </h4>
                <div className="artist-grid">
                  <Link to="/artists">
                    <div className="artist-box">Jenny Prison</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">Muto Pops</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">Today Noticed</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">MYI</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">Love Sticky</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">She Content</div>
                  </Link>
                </div>
              </div>
              <div className="dropdown-col">
                <h4>Freshly Updated</h4>
                <div className="artist-grid">
                  <Link to="/artists">
                    <div className="artist-box">Nola</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">Macular</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">Gintron</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">DeGrand Land</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">Valentina</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">Brad Phillips</div>
                  </Link>
                </div>
              </div>
              <div className="dropdown-col">
                <h4>Popular</h4>
                <div className="artist-grid">
                  <Link to="/artists">
                    <div className="artist-box pop">KilkennyArt</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box pop dark">●</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box pop">Hands</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box pop">Bird</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box pop">S</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box pop">Sommerset</div>
                  </Link>
                </div>
              </div>
              <div className="dropdown-col">
                <h4>Staff Picks</h4>
                <div className="artist-grid">
                  <Link to="/artists">
                    <div className="artist-box">Hey Sivi</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">Ben Ashton</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box dark">UJ</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">Eye</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">Peach Fuzz</div>
                  </Link>
                  <Link to="/artists">
                    <div className="artist-box">Slinch</div>
                  </Link>
                </div>
              </div>
              <div className="dropdown-col sell-col">
                <div className="sell-art-box">
                  <div className="sell-art-icon">🎨</div>
                  <p>
                    <strong>SELL YOUR ART</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-item">
          <Link to="/shop">THEMES</Link>
          <div className="dropdown themes-dropdown">
            <div className="dropdown-grid">
              <div className="dropdown-col">
                <h4>Themes</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Animals</Link>
                  </li>
                  <li>
                    <Link to="/shop">Humor</Link>
                  </li>
                  <li>
                    <Link to="/shop">Fantasy</Link>
                  </li>
                  <li>
                    <Link to="/shop">Cute</Link>
                  </li>
                  <li>
                    <Link to="/shop">Nature</Link>
                  </li>
                  <li>
                    <Link to="/shop">Horror</Link>
                  </li>
                  <li>
                    <Link to="/shop">Space</Link>
                  </li>
                  <li>
                    <Link to="/shop">Memes</Link>
                  </li>
                  <li>
                    <Link to="/shop">Music</Link>
                  </li>
                  <li>
                    <Link to="/shop">Food</Link>
                  </li>
                  <li>
                    <Link to="/shop">Video Games</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col">
                <h4>Art Styles</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Abstract</Link>
                  </li>
                  <li>
                    <Link to="/shop">Graphic Design</Link>
                  </li>
                  <li>
                    <Link to="/shop">Typography</Link>
                  </li>
                  <li>
                    <Link to="/shop">Lowbrow</Link>
                  </li>
                  <li>
                    <Link to="/shop">Comics</Link>
                  </li>
                  <li>
                    <Link to="/shop">Patterns</Link>
                  </li>
                  <li>
                    <Link to="/shop">Illustration</Link>
                  </li>
                  <li>
                    <Link to="/shop">Tattoo</Link>
                  </li>
                  <li>
                    <Link to="/shop">Dark Art</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col">
                <h4>Design Challenges</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Retail Trends</Link>
                  </li>
                  <li>
                    <Link to="/shop">Environment</Link>
                  </li>
                  <li>
                    <Link to="/shop">Birds</Link>
                  </li>
                  <li>
                    <Link to="/shop">25 Years of Art Trends</Link>
                  </li>
                  <li>
                    <Link to="/shop">Strange Creature</Link>
                  </li>
                  <li>
                    <Link to="/shop">Iconic Designs</Link>
                  </li>
                  <li>
                    <Link to="/shop">Pets</Link>
                  </li>
                  <li>
                    <Link to="/shop">Doodlecore</Link>
                  </li>
                  <li>
                    <Link to="/shop">Travel</Link>
                  </li>
                  <li>
                    <Link to="/shop">Botanical Bauhaus</Link>
                  </li>
                  <li>
                    <Link to="/shop">5 Words or Less</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col">
                <h4>Causes</h4>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/shop">Human Rights</Link>
                  </li>
                  <li>
                    <Link to="/shop">Pride / LGBTQIA+</Link>
                  </li>
                  <li>
                    <Link to="/shop">Environment</Link>
                  </li>
                  <li>
                    <Link to="/shop">Mental Health Awareness</Link>
                  </li>
                  <li>
                    <Link to="/shop">Racial Injustice</Link>
                  </li>
                  <li>
                    <Link to="/shop">Animal Welfare</Link>
                  </li>
                  <li>
                    <Link to="/shop">Community</Link>
                  </li>
                  <li>
                    <Link to="/shop">Humanitarian Aid</Link>
                  </li>
                  <li>
                    <Link to="/shop">Suicide Prevention</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown-col sell-col">
                <div className="sell-art-box themes-img">
                  <img
                    src="https://via.placeholder.com/100x120/4CAF50/white?text=SUBMIT"
                    alt="submit"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <p>
                    <strong>SUBMIT TO A DESIGN CHALLENGE</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-item">
  <Link to="/shop">APPAREL</Link>
  <div className="dropdown apparel-dropdown">
    <p className="dropdown-desc">Shop apparel</p>
    <div className="dropdown-grid">
      <div className="dropdown-col">
        <h4>Men's</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">New Designs <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">T-Shirts</Link></li>
          <li><Link to="/shop">Premium T-Shirts</Link></li>
          <li><Link to="/shop">Extra Soft T-Shirts</Link></li>
          <li><Link to="/shop">Triblend T-Shirts</Link></li>
          <li><Link to="/shop">Tanks</Link></li>
          <li><Link to="/shop">Long Sleeve T-Shirts</Link></li>
          <li><Link to="/shop">Pullover Hoodies <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">V-Necks</Link></li>
          <li><Link to="/shop">Sweatshirts <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Shoes</Link></li>
          <li><Link to="/shop">Socks</Link></li>
        </ul>
      </div>
      <div className="dropdown-col">
        <h4>Women's</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">New Designs <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">T-Shirts</Link></li>
          <li><Link to="/shop">Extra Soft T-Shirts</Link></li>
          <li><Link to="/shop">Scoop Necks</Link></li>
          <li><Link to="/shop">V-Necks</Link></li>
          <li><Link to="/shop">Tanks</Link></li>
          <li><Link to="/shop">Long Sleeve T-Shirts</Link></li>
          <li><Link to="/shop">Sweatshirts <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Pullover Hoodies <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Zip-Up Hoodies <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Leggings</Link></li>
          <li><Link to="/shop">Shoes</Link></li>
          <li><Link to="/shop">Socks</Link></li>
        </ul>
      </div>
      <div className="dropdown-col">
        <h4>Unisex</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">New Designs <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">T-Shirts</Link></li>
          <li><Link to="/shop">Comfort Colors T-Shirt <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Cut & Sew T-Shirts</Link></li>
          <li><Link to="/shop">Sweatshirts <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Pullover Hoodies <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Zip-Up Hoodies <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Windbreakers</Link></li>
          <li><Link to="/shop">Jackets</Link></li>
          <li><Link to="/shop">Double-Sided T-Shirts</Link></li>
          <li><Link to="/shop">Socks</Link></li>
        </ul>
      </div>
      <div className="dropdown-col">
        <h4>Kids & Babies</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">New Designs <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Kids T-Shirts</Link></li>
          <li><Link to="/shop">Kids Long Sleeves</Link></li>
          <li><Link to="/shop">Kids Hoodies</Link></li>
          <li><Link to="/shop">Toddler T-Shirts</Link></li>
          <li><Link to="/shop">Baby Bodysuits</Link></li>
          <li><Link to="/shop">Baby T-Shirts</Link></li>
        </ul>
      </div>
      <div className="dropdown-col sell-col">
        <div className="sell-art-box themes-img">
          <img src="https://via.placeholder.com/100x120/90EE90/white?text=TEES" alt="tees" style={{width:'100%', borderRadius:'8px'}}/>
          <p><strong>TEES FROM $15</strong></p>
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
          <li><Link to="/shop">Trucker Hats <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Baseball Caps <span className="new-badge">NEW</span></Link></li>
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
          <li><Link to="/shop">Snapback Hats</Link></li>
          <li><Link to="/shop">Dad Hats</Link></li>
          <li><Link to="/shop">Beanies</Link></li>
          <li><Link to="/shop">Cuffed Beanies</Link></li>
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
          <li><Link to="/shop">Tote Bags</Link></li>
          <li><Link to="/shop">Zip Pouches</Link></li>
          <li><Link to="/shop">Weekender Bags</Link></li>
          <li><Link to="/shop">Drawstring Bags</Link></li>
          <li><Link to="/shop">Laundry Bags</Link></li>
          <li><Link to="/shop">Duffel Bags</Link></li>
          <li><Link to="/shop">Backpacks</Link></li>
        </ul>
      </div>
      <div className="dropdown-col">
        <h4>Drinkware</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">White Mugs</Link></li>
          <li><Link to="/shop">Black Mugs</Link></li>
          <li><Link to="/shop">Latte Mugs</Link></li>
          <li><Link to="/shop">Travel Mugs</Link></li>
        </ul>
      </div>
      <div className="dropdown-col">
        <h4>Lifestyle</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">Hats <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Scarves <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Stickers</Link></li>
          <li><Link to="/shop">Buttons</Link></li>
          <li><Link to="/shop">Magnets</Link></li>
          <li><Link to="/shop">Jigsaw Puzzles</Link></li>
          <li><Link to="/shop">Phone Cases <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Beach Towels</Link></li>
          <li><Link to="/shop">Skateboards</Link></li>
        </ul>
      </div>
      <div className="dropdown-col">
        <h4>Office</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">Mouse Pads</Link></li>
          <li><Link to="/shop">Desk Mats</Link></li>
          <li><Link to="/shop">Greeting Cards</Link></li>
          <li><Link to="/shop">Blank Journals</Link></li>
          <li><Link to="/shop">Lined Journals</Link></li>
          <li><Link to="/shop">Spiral Notebooks</Link></li>
        </ul>
      </div>
      <div className="dropdown-col sell-col">
        <div className="sell-art-box themes-img">
          <img src="https://via.placeholder.com/100x120/90EE90/white?text=ACC" alt="accessories" style={{width:'100%', borderRadius:'8px'}}/>
          <p><strong>SHOP NOW ACCESSORIES</strong></p>
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
          <li><Link to="/shop">Art Prints</Link></li>
          <li><Link to="/shop">Framed Prints</Link></li>
          <li><Link to="/shop">Mini Art Prints <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Mini Framed Prints <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Canvas Prints</Link></li>
          <li><Link to="/shop">Aluminum Prints</Link></li>
          <li><Link to="/shop">Acrylic Prints</Link></li>
          <li><Link to="/shop">Wall Tapestries</Link></li>
        </ul>
      </div>
      <div className="dropdown-col">
        <h4>Skateboards</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">Board Only</Link></li>
          <li><Link to="/shop">Board w/ Hanging Hardware</Link></li>
          <li><Link to="/shop">Basic Complete</Link></li>
          <li><Link to="/shop">Premium Complete</Link></li>
          <li><Link to="/shop">Pro Complete</Link></li>
        </ul>
      </div>
      <div className="dropdown-col hat-img-col">
        <div className="hat-img-box">
          <img src="https://via.placeholder.com/160x180/9370DB/white?text=ART" alt="fine art prints" />
          <div className="hat-img-label">
            <strong>SHOP NOW</strong>
            <p>FINE ART PRINTS</p>
          </div>
        </div>
      </div>
      <div className="dropdown-col">
        <h4>Themes</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">Surreal</Link></li>
          <li><Link to="/shop">Landscapes</Link></li>
          <li><Link to="/shop">Graphic Art</Link></li>
          <li><Link to="/shop">Painting</Link></li>
          <li><Link to="/shop">Photography</Link></li>
        </ul>
      </div>
      <div className="dropdown-col hat-img-col">
        <div className="hat-img-box">
          <img src="https://via.placeholder.com/160x180/4169E1/white?text=WALL" alt="wall art" />
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
  <Link to="/shop">HOME DECOR</Link>

  <div className="dropdown home-dropdown">
    <div className="dropdown-grid">

      {/* Bedroom */}
      <div className="dropdown-col">
        <h4>Bedroom</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">Woven Blankets <span className="new-badge">NEW</span></Link></li>
          <li><Link to="/shop">Duvet Covers</Link></li>
          <li><Link to="/shop">Blankets</Link></li>
          <li><Link to="/shop">Laundry Bags</Link></li>
        </ul>
      </div>

      {/* Living */}
      <div className="dropdown-col">
        <h4>Living</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">Wall Art</Link></li>
          <li><Link to="/shop">Wall Tapestries</Link></li>
          <li><Link to="/shop">Throw Pillows</Link></li>
          <li><Link to="/shop">Fleece Blankets</Link></li>
          <li><Link to="/shop">Sherpa Blankets</Link></li>
          <li><Link to="/shop">Premium Rugs</Link></li>
        </ul>
      </div>

      {/* Bathroom */}
      <div className="dropdown-col">
        <h4>Bathroom</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">Bath Mats</Link></li>
          <li><Link to="/shop">Shower Curtains</Link></li>
          <li><Link to="/shop">Beach Towels</Link></li>
        </ul>
      </div>

      {/* Kitchen */}
      <div className="dropdown-col">
        <h4>Kitchen</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">Drinkware</Link></li>
          <li><Link to="/shop">Magnets</Link></li>
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
          <p><strong>SHOP NOW HOME DECOR</strong></p>
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
          <li><Link to="/shop">Artist Shops</Link></li>
          <li><Link to="/shop">Music Shops</Link></li>
          <li><Link to="/shop">Swag Shops</Link></li>
          <li><Link to="/shop">Non-Profit Shops</Link></li>
          <li><Link to="/shop">Influencer Shops</Link></li>
          <li><Link to="/shop">Everything Shops</Link></li>
        </ul>
      </div>

      {/* Resources */}
      <div className="dropdown-col">
        <h4>Resources</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">Threadless Blog</Link></li>
          <li><Link to="/shop">Artist Shops Help</Link></li>
          <li><Link to="/shop">Creative Resources</Link></li>
          <li><Link to="/shop">Join our Discord</Link></li>
          <li><Link to="/shop">Artist Resources</Link></li>
        </ul>
      </div>

      {/* Community */}
      <div className="dropdown-col">
        <h4>Community</h4>
        <ul className="dropdown-list">
          <li><Link to="/shop">Design Challenges</Link></li>
          <li><Link to="/shop">Score Designs</Link></li>
          <li><Link to="/shop">Our Values</Link></li>
          <li><Link to="/shop">Threadless Causes</Link></li>
          <li><Link to="/shop">Sustainability</Link></li>
          <li><Link to="/shop">Diversity & Inclusion</Link></li>
          <li><Link to="/shop">Community Safety</Link></li>
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
          <p><strong>SELL YOUR ART</strong></p>
        </div>
      </div>

    </div>
  </div>
</div>
        <Link to="/shop">WALL ART</Link>
        <Link to="/shop">HOME DECOR</Link>
        <Link to="/shop">COMMUNITY</Link>
        <Link to="/resources">RESOURCES</Link>
      </div>
    </nav>
  );
}
export default Header;
