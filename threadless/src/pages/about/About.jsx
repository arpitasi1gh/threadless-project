import './About.css'

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Threadless</h1>
        <p>
          Threadless is a community-driven marketplace where artists share
          original designs, and shoppers discover products they actually want to
          wear, use, and gift.
        </p>
      </section>

      <section className="about-section">
        <h2>How it works</h2>
        <ul>
          <li>Artists upload designs and build collections.</li>
          <li>Designs get printed on demand across multiple products.</li>
          <li>You support independent creators with every purchase.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Made for discovery</h2>
        <p>
          Browse All Products for a mix of product styles, or explore All
          Designs and Themes to find art that matches your vibe.
        </p>
      </section>
    </div>
  )
}

