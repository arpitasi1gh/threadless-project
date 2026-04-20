import './Aboutus.css'

const images = {
  sustainability: '/Pictures/Eco-friendly.jpeg',
  values: '/Pictures/Values.jpeg',
  diversity: '/Pictures/cultural-diversity.jpeg',
  help: '/Pictures/Help.jpeg',
  careers: '/Pictures/Career.jpeg',
  blog: '/Pictures/Read-blogs.jpeg',
  reviews: '/Pictures/Review.jpeg',
  arpita: '/Pictures/Arpita.png',
}

export default function Aboutus() {
  return (
    <main className="about-page">
      <section className="intro" aria-labelledby="about-heading">
        <div className="intro-box">
          <h1 id="about-heading" className="title">
            About Threadless
          </h1>

          <div className="intro-texts">
            <p className="text">
              Welcome to our Threadless project!Threadless is a modern e-commerce platform designed to connect <b>independent artists</b> with users who are looking for unique, creative.
              Our platform allows users to explore, discover, and engage with original designs while giving artists a space to showcase their creativity and reach a wider audience.
            </p>

          <h1 id="about-subheading" className="sub-title">
            💡 Our Idea
          </h1>
            <p className="text">
              The idea behind Threadless was simple to create a platform where <b>art meets apparel</b>and creativity becomes accessible to everyone.
              We wanted to go beyond traditional online stores and build a <b>community-driven experience</b> where users don’t just shop, but also explore and interact with designs.
            </p>

          <h1 id="about-subheading" className="sub-title">
            🎯 Our Objectives
          </h1>
            <ul className="text">
              <li>Build a responsive and visually engaging web application</li>
              <li>Create a smooth and intuitive user experience</li>
              <li>Enable interaction between artists and buyers</li>
              <li>Implement core e-commerce features effectively</li>
              <li>Develop a scalable and maintainable frontend architecture</li>
            </ul>

          <h1 id="about-heading" className="sub-title">
            ⚙️ Behind the Scenes
          </h1>
            <p className="text">
              Threadless is built using modern web technologies and structured design principles. <br />
              From responsive layouts to efficient state management, every component was carefully designed to ensure a seamless experience across devices.
            </p>

            
            <p className="end-text">Let’s make great together.</p>
          </div>
        </div>
      </section>

      <section className="section section-small" aria-label="Commitments">
        <div className="cards cards-3">
          <article className="card">
            <figure className="card-image">
              <img src={images.sustainability} alt="Sustainability" loading="lazy" />
            </figure>
            <h2 className="card-title">
              Committed to
              <br /> Sustainability
            </h2>
            <p className="card-text">
              Sustainability influences everything we do, from our partnerships to our printing processes. Eco-friendly, ethical, and socially responsible practices are central to our culture.
            </p>
          </article>

          <article className="card">
            <figure className="card-image">
              <img src={images.values} alt="Values" loading="lazy" />
            </figure>
            <h2 className="card-title">Our Values</h2>
            <p className="card-text">
              These values represent
              <br /> who we are as a <br />
              company. We think about
              <br /> them every day and <br />
              evaluate our efforts by
              <br /> measuring against them.
            </p>
          </article>

          <article className="card">
            <figure className="card-image">
              <img src={images.diversity} alt="Diversity" loading="lazy" />
            </figure>
            <h2 className="card-title">Diversity & Inclusion</h2>
            <p className="card-text">
              We are dedicated to <br />
              creating an anti-racist <br />
              and inclusive <br />
              environment for our <br />
              employees, artists, and <br />
              community.
            </p>
          </article>
        </div>
      </section>

      <section className="section" aria-label="Help and careers">
        <div className="cards cards-2">
          {/* <article className="card card-wide">
            <figure className="card-image card-image-wide">
              <img src={images.help} alt="Help" loading="lazy" />
            </figure>
            <h2 className="card-title">Help</h2>
            <p className="card-text">
              Need help with your order? Read our FAQ about sizing, shipping, our return policy, and more.
            </p>
          </article> */}

          <article className="card card-wide">
            <figure className="card-image">
              <img src={images.careers} alt="Careers" loading="lazy" />
            </figure>
            <h2 className="card-title">Careers</h2>
            <p className="card-text">
              Join us in providing creative minds all over the world more opportunities to make and sell their art.
            </p>
          </article>
        
          <article className="card card-wide">
            <figure className="card-image">
              <img src={images.blog} alt="Blog" loading="lazy" />
            </figure>
            <h2 className="card-title">Read Our Blog</h2>
            <p className="card-text">
              Find captivating artist interviews, rundowns of our favorite designs, gift guides, and other insights into the happenings at Threadless.
            </p>
          </article>

          {/* <article className="card card-wide">
            <figure className="card-image">
              <img src={images.reviews} alt="Reviews" loading="lazy" />
            </figure>
            <h2 className="card-title">Reviews</h2>
            <p className="card-text">
              Find out what real-life customers have to say about the incredible products and art you can find at Threadless.
            </p>
          </article> */}
        </div>
      </section>

      <footer className="footnote">
        <p>
          * Savings percentage and strikethrough pricing based on comparison to regular prices of the same items at full-price in Artist Shops or third party retail locations. Savings may vary over time.
        </p>
      </footer>
    </main>
  )
}
