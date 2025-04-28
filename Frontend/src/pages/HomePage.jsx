// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import busImage from "../assets/HomepageBus.png"; 
import smallBusImage from "../assets/bus1.png"; 
import Navbar from "../components/Navbar";


const HomePage = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/buses");
  };

  return (
    <div className="home-page-container">
      <Navbar/>
      {/* Hero Section */}
      <header className="hero-section" style={{ backgroundImage: `url(${busImage})` }}>
        <div className="hero-overlay">
          <h1 className="hero-title">Book Your Ticket</h1>
          <p className="hero-description">
            Enjoy Your Journey, Pioneering Your Journey, One Ticket at a Time
          </p>
          <button className="cta-button" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </header>

      {/* Why Book Section */}
      <section className="why-book-section">
        <div className="why-book-content">
          <div className="why-book-text">
            <h2 className="section-title">Why Book with Yatra Sayhak?</h2>
            <p className="section-description">
              Passengers can easily browse through real-time bus schedules, check seat availability, and book tickets online, all from the comfort of their home or on the go. By eliminating the need to wait in long queues at bus stations, our platform offers a more convenient and time-saving solution for travelers. Whether you’re planning a quick getaway or a long journey, we ensure that booking your bus tickets is quick, secure, and straightforward.
            </p>
          </div>
          <img src={smallBusImage} alt="Small Bus" className="why-book-image" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h3 className="info-title">Location</h3>
              <p className="info-text">Kathmandu</p>
            </div>
            <div className="info-item">
              <h3 className="info-title">Email</h3>
              <p className="info-text">info@yatrasayhak.com</p>
            </div>
            <div className="info-item">
              <h3 className="info-title">Call</h3>
              <p className="info-text">+977 2756878</p>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="Your Name" className="form-input" />
              <input type="email" placeholder="Your Email" className="form-input" />
            </div>
            <input type="text" placeholder="Subject" className="form-input" />
            <textarea placeholder="Message" className="form-textarea" rows="5"></textarea>
            <button type="submit" className="form-button">
              Send Message
            </button>
          </form>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-items">
          {/* FAQ Item 1 */}
          <details className="faq-item">
            <summary>What are the payment options?</summary>
            <p>
              We accept Khalit Payement,for your payment options.
            </p>
          </details>

          {/* FAQ Item 2 */}
          <details className="faq-item">
            <summary>Can I change my booking after purchasing a ticket?</summary>
            <p>
              Yes, you can modify your booking up to 24 hours before departure by contacting our support team.
            </p>
          </details>

          {/* FAQ Item 3 */}
          <details className="faq-item">
            <summary>How do I check my seat availability?</summary>
            <p>
              Seat availability is updated in real-time on our website. You can check availability when making a booking.
            </p>
          </details>
        </div>
      </section>

      { // Internal CSS
       <style>{`
       /* Reset and layout adjustments */
         html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .home-page-container {
          min-height: 100vh;
          background-color: #1a1a1a;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Inter', sans-serif;
        }

        /* Hero Section */
        .hero-section {
          width: 100%;
          height: 100vh;
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          color: #10b981;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          margin-bottom: 1.5rem;
        }

        .hero-description {
          font-size: 1.75rem;
          color: #d1d5db;
          margin-bottom: 2.5rem;
        }

        .cta-button {
          background-color: #10b981;
          color: white;
          padding: 1rem 3rem;
          border-radius: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .cta-button:hover {
          background-color: #059669;
          transform: translateY(-3px);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        /* Why Book Section */
        .why-book-section {
          padding: 4rem 2rem;
          background-color: #1a1a1a;
        }

        .why-book-content {
          display: flex;
          justify-content: center;
          gap: 3rem;
          background-color: white;
          border-radius: 16px;
          padding: 3rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .why-book-text {
          flex: 1;
          color: #333;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .section-description {
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .why-book-image {
          width: 250px;
          height: auto;
          border-radius: 12px;
          object-fit: cover;
        }

        /* Contact Section */
        .contact-section {
          padding: 4rem 2rem;
          background-color: #1a1a1a;
        }

        .contact-content {
          display: flex;
          justify-content: center;
          gap: 3rem;
        }

        .contact-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .info-item {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 1.5rem;
          border-radius: 12px;
          color: #333;
        }

        .info-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .info-text {
          font-size: 1.1rem;
        }

        .contact-form {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background-color: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 12px;
          backdrop-filter: blur(5px);
        }

        .form-row {
          display: flex;
          gap: 1.5rem;
        }

        .form-input,
        .form-textarea {
          padding: 1rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          background-color: #f5f5f5;
        }

        .form-input:focus,
        .form-textarea:focus {
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .form-button {
          background-color: #10b981;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
        }

        .form-button:hover {
          background-color: #059669;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .hero-section {
            height: 80vh;
          }

          .hero-title {
            font-size: 3rem;
          }

          .cta-button {
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
          }

          .why-book-content {
            flex-direction: column;
            gap: 2rem;
          }

          .why-book-image {
            width: 200px;
          }

          .contact-content {
            flex-direction: column;
          }

          .form-row {
            flex-direction: column;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            height: 70vh;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .cta-button {
            padding: 0.6rem 1.5rem;
            font-size: 1rem;
          }

          .why-book-section,
          .contact-section {
            padding: 2rem 1rem;
          }

          .why-book-image {
            width: 150px;
          }
        }
          /* FAQ Section */
        .faq-section {
          padding: 4rem 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .faq-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #10b981;
        }

        .faq-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background-color: rgba(255, 255, 255, 0.05);
          padding: 1.25rem;
          border-radius: 12px;
          backdrop-filter: blur(5px);
          color: #d1d5db;
        }

        /* Right-aligned dropdown toggle */
        .faq-item summary {
          font-weight: 600;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          list-style: none;
        }

        .faq-item summary::after {
          content: "▼";
          font-size: 1rem;
          transition: transform 0.3s ease;
        }

        .faq-item[open] summary::after {
          transform: rotate(180deg);
        }

        .faq-item p {
          margin-top: 0.75rem;
        }
      `}</style> }
    </div>
  );
};

export default HomePage;
