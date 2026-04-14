import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
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
              Sell Your Art
            </Link>
          </div>

          <div className="join-login-group">
            <Link to="/login" className="join-btn">
              JOIN US
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
          <div className="dropdown">
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
  <div className="dropdown themes-dropdown">
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
          <img src="https://via.placeholder.com/160x180/90EE90/white?text=HAT" alt="trucker hat" />
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
          <img src="https://via.placeholder.com/160x180/90EE90/white?text=HATS" alt="hats" />
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
  <div className="dropdown themes-dropdown">
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
        <Link to="/shop">WALL ART</Link>
        <Link to="/shop">HOME DECOR</Link>
        <Link to="/shop">COMMUNITY</Link>
        <Link to="/resources">RESOURCES</Link>
      </div>
    </nav>
  );
}
export default Header;
