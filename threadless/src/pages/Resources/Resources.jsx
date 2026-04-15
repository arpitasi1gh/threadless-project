import React, { useState } from 'react';
import './Resources.css';

import logo from '../../assets/images/logo.png';
import post1 from '../../assets/images/post1-eyes.jpg';
import post2 from '../../assets/images/post2-holiday.jpg';
import post3 from '../../assets/images/post3-stockings.jpg';
import post4 from '../../assets/images/post4-checklist.jpg';
import post5 from '../../assets/images/post5-marketing.jpg';
import post6 from '../../assets/images/post6-dorm.jpg';
import post7 from '../../assets/images/post7-school.jpg';
import post8 from '../../assets/images/post8-artist.jpg';
import post9 from '../../assets/images/post9-challenge.jpg';
import post10 from '../../assets/images/post10-vintage.jpg';
import post11 from '../../assets/images/post11-convention.jpg';
import post12 from '../../assets/images/post12-themes.jpg';
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';

const postsRow1 = [
  {
    image: post1,
    date: 'FEBRUARY 19, 2025',
    title: 'Your Shop, Connected: Introducing Threadless Links',
    excerpt: 'We are thrilled to announce a brand new link in bio tool designed specifically for the Threadless Artist Shops community. Threadless Links. As a creator, your online presence is likely spread across social media, portfolios, other websites, and your Artist Shop. We wanted to build a better way for you to bridge the gap between your fans and your work. Threadless Links is a streamlined link in bio platform that consolidates your digital world into one beautiful, cohesive page. The best part? It is completely free!',
  },
  {
    image: post2,
    date: 'NOVEMBER 13, 2025',
    title: 'Holiday Promo Toolkit: Create Festive Social Media Posts That Drive Sales',
    excerpt: "The holiday season is the biggest opportunity of the year to boost your Artist Shop sales. During the critical shopping season, shoppers are actively searching for unique, personal gifts that stand out. To capture their attention, it's essential to make your entire shop seasonality throughout the holidays. And with over 60% of shoppers don't finish their holiday shopping as early as October? To stand out amidst a crowded, engaging presence, and that means more than just good products.",
  },
  {
    image: post3,
    date: 'NOVEMBER 3, 2025',
    title: 'Get Holiday Shoppers to Spend a Little More with Stocking Stuffers',
    excerpt: "There's a special kind of delight in the small, perfectly chosen gift. During the holiday rush, it's those tiny treasures — the stocking stuffers — that carry a surprising amount of emotional weight. They prove that you can find wonder in the details. They also offer a low-friction opportunity for shoppers to find just one more thing. As an Artist Shop owner, you can harness that dual strategy: helping customers complete their gift lists with thoughtful items, while simultaneously driving more sales.",
  },
];

const postsRow2 = [
  {
    image: post4,
    date: 'OCTOBER 29, 2024',
    title: 'Holiday Marketing Guide: Your Ultimate Checklist for the Peak Shopping Season',
    excerpt: "The holiday season is more than just festive cheer: it's a golden chance for e-commerce businesses with creative artists shaping holiday sales making nearly 30% of annual retail revenue. For Artist Shops, this means a serious opportunity to maximize your holiday marketing plan in place. Brand counting? We've got it covered. This Artist Shops Holiday Checklist is your guide to prioritizing, preparing, and...",
  },
  {
    image: post5,
    date: 'AUGUST 27, 2024',
    title: 'How to Turn One Design Into a Full Marketing Campaign',
    excerpt: "When you create a new design, it can be tempting to put it in your online shop, post it on social media, and call it a day. But a design has the power to do so much more. With the right strategy, you can turn a single piece of art into a bigger marketing campaign that builds recognition, drives engagement, and keeps sales flowing long after launch. Artist's who take the time to build campaigns around one piece, expanding it across products and...",
  },
  {
    image: post6,
    date: 'AUGUST 8, 2024',
    title: 'Capture the College Crowd by Showcasing Dorm Room Essentials',
    excerpt: "Every fall, millions of students move into dorms and apartments, and a lot of them face the same challenge: making a blank, boring room feel like a space that feels like home. In 2024, spending on dorm and apartment furnishings was projected to reach $13.7 billion, with students are favorites averaging 5,193 per household, as more items. That's a massive market actively seeking decor, storage, and comfort items, and your Artist Shop can fill the gap with custom room essentials.",
  },
];

const postsRow3 = [
  {
    image: post7,
    date: 'JULY 22, 2024',
    title: 'How to Create a Back-to-School Collection That Students Will Love',
    excerpt: "The back-to-school shopping season is one of the busiest retail periods of the year, and Artist Shop owners have a huge opportunity to tap into the demand. Whether your customers are college-bound teenagers, parents shopping for kids, or students just looking to express themselves, offering targeted, appealing collections can help your artist shop excel. If you're looking for fresh ideas for building a back-to-school collection that'll help boost your Artist Shop sales, you're in the right place. Let's go over...",
  },
  {
    image: post8,
    date: 'JUNE 26, 2024',
    title: 'Asking Artists: Shop Owners Reflect on Their Artist Growth Journey',
    excerpt: "Your first design doesn't have to be perfect. In fact, most aren't — and that's a good thing. Your Artist Shop is a reflection of your growth, and each design you add to it helps shape your artistic identity. To celebrate how far our community has come, we asked a handful of shop owners to share their very first designs on Threadless alongside their most recent creation. We also asked them to share their journey of growth as an artist—their biggest lessons...",
  },
  {
    image: post9,
    date: 'MAY 13, 2024',
    title: 'The Latest Design Challenge Winners: 4 Color, Hats, and Surreascapes',
    excerpt: "Every month, artists in the Threadless community blow us away with their creativity, wit, and storytelling. Our Design Challenges are a chance for Artist Shop owners to push their limits, try something new, and get their work in front of new audiences. Today, we're spotlighting the most recent Design Challenge winners — and trust us, these designs are worth a round of applause (and maybe a spot in your cart). Check them out and get inspired to join the next round of...",
  },
];

const postsRow4 = [
  {
    image: post10,
    date: 'MAY 9, 2024',
    title: 'Give Your Designs a Vintage Edge with Comfort Colors Tees',
    excerpt: "There's a reason Comfort Colors Tees have a cult following among streetwear brands, resort shops, and artist alike. Known for their rich pigment-dyed colors, softly-naturally face, and relaxed broken-in fit, these heavyweight t-shirts strike the perfect balance between quality and comfort. Now available to add to your Artist Shop. Comfort Color's Tees give your customers another great way to wear your art—especially if they gravitate toward bold, vintage-inspired looks. With 25 unique garment-dyed hues to choose from, this new style...",
  },
  {
    image: post11,
    date: 'APRIL 8, 2024',
    title: 'Make Your Convention Booth Unforgettable with Artist Shops Merch',
    excerpt: "So you've locked in your table at an upcoming fan con, art fair, or local market—now what? Beyond hanging your Awesome posters and setting your best art, you'll also want to stock your booth with convention merch that grabs attention, reflects your brand, and gets fans excited to support your work. If you run a Threadless Artist Shop, you already have an easy idea ahead: Your Artist Shop gives you access to a wide range of custom products you can print on demand, purchase at...",
  },
  {
    image: post12,
    date: 'MARCH 20, 2024',
    title: 'Popular Design Themes That Have Shaped 25 Years of Threadless (Part 1)',
    excerpt: "For 25 years, Threadless has been home to incredible independent artists, offering designs that make you laugh, think, and express who you are. In that time, we've seen countless trends come and go, but a few popular design themes have proven to be truly timeless. From retro aesthetics to mystical motifs, these themes continue to inspire artists and captivate shoppers year after year. As we celebrate our 25th anniversary, we're looking back at the most iconic design themes in our community...",
  },
];

const PostCard = ({ image, date, title, excerpt }) => (
  <article className="post-card">
    <div className="post-card-image-wrapper">
      <img className="post-card-image" src={image} alt={title} loading="lazy" />
    </div>
    <p className="post-date">{date}</p>
    <h2 className="post-title"><a href="#">{title}</a></h2>
    <p className="post-excerpt">
      {excerpt} 
    </p>
  </article>
);

const Resources = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="resources-page">
      {/* Header */}
      <header className="resources-header">
        <nav className="resources-nav">
          <a href="#">
            <img src={logo} alt="Artist Shops" className="nav-logo" />
          </a>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            ☰
          </button>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            
            <li><a href="#">Build Your Artist Shop</a></li>
           
          </ul>
          <div className="nav-right">
           
            <button className="nav-cta">Start a Shop</button>
          </div>
        </nav>
      </header>

      {/* Row 1 */}
      <section className="resources-main">
        <div className="post-grid">
          {postsRow1.map((post, i) => <PostCard key={i} {...post} />)}
        </div>
      </section>

      {/* Banner 1 */}
      <div className="banner-divider">
        <img src={banner1} alt="Banner" />
      </div>

      {/* Row 2 */}
      <section className="resources-main">
        <div className="post-grid">
          {postsRow2.map((post, i) => <PostCard key={i} {...post} />)}
        </div>
      </section>

      {/* Color Bar */}
      <div className="color-bar"></div>

      {/* Banner 2 */}
      <div className="banner-divider">
        <img src={banner2} alt="Banner" />
      </div>

      {/* Row 3 */}
      <section className="resources-main">
        <div className="post-grid">
          {postsRow3.map((post, i) => <PostCard key={i} {...post} />)}
        </div>
      </section>

      {/* Color Bar */}
      <div className="color-bar"></div>

      {/* Row 4 */}
      <section className="resources-main">
        <div className="post-grid">
          {postsRow4.map((post, i) => <PostCard key={i} {...post} />)}
        </div>
      </section>

      
{/*  */}

      {/* Copyright */}
      <div className="copyright">
        © Copyright 2025 Threadless, LLC. All rights reserved by its owner.
      </div>
    </div>
  );
};

export default Resources;
