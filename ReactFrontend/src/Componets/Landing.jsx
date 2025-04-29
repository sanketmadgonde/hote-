import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Landing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    "images/gallery1.jpg",
    "images/gallery2.jpg",
    "images/gallery3.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <div className="top-bar">
        <div className="logo">
          <img src="https://vcard-bucket.s3.us-east-2.amazonaws.com/A160/businesses/4304/1739448958786.png" alt="Hotel Celebration Logo" />
          <h1>Hotel Celebration</h1>
        </div>
        <nav>
          <a href="#menu">Menu</a>
          <a href="#gallery">Gallery</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <Link className="login-button" to="/login">Login</Link>
        </nav>
      </div>

   

      <section id="menu">
        <h2>Menu Categories</h2>
        <div className="categories">
          {[
            { title: "Starters", image: "images/starters.jpg" },
            { title: "Main Course", image: "images/maincourse.jpg" },
            { title: "Desserts", image: "images/desserts.jpg" },
            { title: "Drinks", image: "images/drinks.jpg" },
            { title: "Celebration Special", image: "images/special.jpg" }
          ].map((item, idx) => (
            <Link key={idx} to={`/${item.title}/menu`} className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section id="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          {[
            { icon: "🍷", title: "Wine & Dine", description: "A premium selection of wines, spirits, and delicious cuisine." },
            { icon: "🎉", title: "Event Management", description: "From intimate gatherings to grand celebrations, we handle it all." },
            { icon: "🍽", title: "Catering Services", description: "Customized menus with exquisite flavors for all occasions." }
          ].map((service, idx) => (
            <div key={idx} className="service-card">
              <div style={{ fontSize: "2rem" }}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery">
        <h2>Gallery</h2>
        <div className="gallery-slider">
          <img
            src={galleryImages[currentIndex]}
            alt="Gallery"
            style={{ transition: "opacity 0.5s ease-in-out", maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        </div>
      </section>
      <section id="about">
        <h2>About Us</h2>
        <p style={{ textAlign: "center", maxWidth: "800px", margin: "auto" }}>
          Hotel Celebration offers a luxurious experience with Wine & Dine, Event Management & Catering. We bring your celebrations to life with elegance and flavor. At Hotel Celebration, we believe in providing the best hospitality, mouth-watering food, and a delightful ambiance for you to enjoy. Join us for an exceptional experience filled with great food, fine drinks, and memorable moments.
        </p>
      </section>
      <section>
  <h2 style={{ textAlign: "center" }}>Get in Touch</h2>
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div className="contact-box" id="contact">
      <h3 style={{ textAlign: "center" }}>Contact Us</h3>
      <p style={{ textAlign: "center" }}>
        Phone: +91-8698343333 / +91-9604302888<br />
        Email: kyadas1051@gmail.com<br />
        Address: Plot No. 3 & 4, Sindhu Vihar, Vijapur Road, Solapur
      </p>
    </div>
  </div>
</section>


      <footer>
        <p>&copy; 2025 Hotel Celebration. Designed with elegance.</p>
      </footer>
    </div>
  );
};

export default Landing;
