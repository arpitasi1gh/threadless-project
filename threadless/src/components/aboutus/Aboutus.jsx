import React from "react";
import "./Aboutus.css";

function Aboutus() {
  return (
    <>
      <div className="about-container">

        <h1 className="about-title">About Threadless</h1>

        <p className="about-text">
          Welcome to our Threadless project! We are a group of dedicated developers who decided to tackle the ultimate challenge: building a stunning e-commerce platform without losing all our sleep. Brought to life by Arpita Singh, Manvir Singh, Chandana Priya and Abhishek Anil our team united over a shared love for clean code, seamless user interfaces, and the occasional highly caffeinated debugging session.
        </p>

        <p className="about-text">
          Our mission was ambitious but clear: to recreate the vibrant, community-driven magic of Threadless while mastering the intricacies of modern front-end architecture. We wanted to build more than just a functional digital storefront; we aimed to craft a visually engaging experience where art effortlessly meets apparel. Every layout choice, hover effect, and responsive component was carefully designed to deliver a flawless shopping journey.
        </p>

        <p className="about-text">
          Behind this polished user interface lies a carefully structured web of logic, responsive design principles, and a few minor CSS battles. We tackled complex state management and UI challenges head-on to ensure that your browsing experience remains completely untangled, regardless of the device you use. We like to think of our final codebase as a perfectly tailored shirt—highly functional, aesthetically pleasing, and absolutely free of loose threads.
        </p>

        <p className="about-text">
          Ultimately, this project serves as a testament to our collective growth as developers and our commitment to building user-centric web applications. We invite you to explore our Threadless platform, interact with the features, and experience the results of our hard work firsthand. We are incredibly proud of what we have built together—just please do not look too closely at our late-night Git commit messages.
        </p>

        <p className="about-end">
          Let’s make great together.
        </p>

      </div>

      <div className="features-section">

        <div className="feature-box">
          <img src="/Pictures/AR_icon_Sustainability_Leaf.webp" alt="Sustainability" />
          <h2>Committed to<br /> Sustainability</h2>
          <p>
            Sustainability influences <br /> everything we do, from <br /> our partnerships to our <br />
            printing processes. Eco-<br />friendly, ethical, and <br />socially responsible<br />
            practices are central to <br />our culture.
          </p>
        </div>

        <div className="feature-box">
          <img src="/Pictures/About_icon_values_1.webp" alt="Values" />
          <h2>Our Values</h2>
          <p>
            These values represent<br /> who we are as a <br />company. We think about<br /> them every
            day and <br />evaluate our efforts by<br /> measuring against them.
          </p>
        </div>

        <div className="feature-box">
          <img src="/Pictures/DI_icon_belong_1.webp" alt="Diversity" />
          <h2>Diversity & Inclusion</h2>
          <p>
            We are dedicated to <br />creating an anti-racist <br />and inclusive <br />environment
            for our <br />employees, artists, and <br />community.
          </p>
        </div>

      </div>

      <div className="help-career-section">

        <div className="help-box">
          <img src="/Pictures/About_icon_help.webp" alt="Help" />
          <h2>Help</h2>
          <p>
            Need help with your order? Read our FAQ about sizing,
            shipping, our return policy, and more.
          </p>
        </div>

        <div className="help-box">
          <img src="/Pictures/About_icon_careers.webp" alt="Careers" />
          <h2>Careers</h2>
          <p>
            Join us in providing creative minds all over the world
            more opportunities to make and sell their art.
          </p>
        </div>

      </div>

      <div className="extra-section">

        <div className="extra-box">
          <img src="/Pictures/About_icon_blog.webp" alt="Blog" />
          <h2>Read Our Blog</h2>
          <p>
            Find captivating artist interviews, rundowns of our favorite designs,
            gift guides, and other insights into the happenings at Threadless.
          </p>
        </div>

        <div className="extra-box">
          <img src="/Pictures/About_icon_assets.webp" alt="Assets" />
          <h2>Assets</h2>
          <p>
            Retrieve assets including our official logos <br /> in a simple .zip download.
          </p>
        </div>

        <div className="extra-box">
          <img src="/Pictures/About_icon_reviews_1.webp" alt="Reviews" />
          <h2>Reviews</h2>
          <p>
            Find out what real-life customers have to say about the incredible
            products and art you can find at Threadless.
          </p>
        </div>

      </div>

    <div className="savings-term">
      <p>
        * Savings percentage and strikethrough pricing based on comparison to regular prices of the same items at full-price in Artist Shops or third party retail locations. Savings may vary over time.
      </p>
    </div>

    </>
  );
}

export default Aboutus;