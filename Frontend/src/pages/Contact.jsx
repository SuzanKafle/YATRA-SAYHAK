import React from "react";

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-form-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-description">
          If you have any questions or need assistance, please don't hesitate to reach out to us.
        </p>

        <div className="contact-details">
          <h3 className="section-title">Our Contact Details:</h3>
          <ul className="contact-list">
            <li>
              Email:{" "}
              <a href="mailto:support@yatrasayhak.com" className="contact-link">
                support@yatrasayhak.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+9779827120695" className="contact-link">
                +1 234 567 890
              </a>
            </li>
            <li>Address: DavisFalls 17, Pokhara, Nepal</li>
          </ul>
        </div>

        <div className="message-form">
          <h3 className="section-title">Send Us a Message:</h3>
          <form className="form">
            <div className="form-field">
              <input
                type="text"
                placeholder="Your Name"
                className="input-field"
              />
            </div>
            <div className="form-field">
              <input
                type="email"
                placeholder="Your Email"
                className="input-field"
              />
            </div>
            <div className="form-field">
              <textarea
                placeholder="Your Message"
                rows="4"
                className="input-field"
              />
            </div>
            <button className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        /* Ensure full-screen coverage */
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
        }

        .contact-us-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh; /* Changed from min-height to height for full coverage */
          width: 100vw; /* Full width */
          background-color: #f7fafc;
          padding: 0;
          margin: 0;
          overflow: auto; /* Allow scrolling if content overflows */
        }

        .contact-form-container {
          background-color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 30px;
          width: 100%;
          max-width: 900px; /* Widened form container */
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2rem; /* Adding space between sections */
          margin: 20px; /* Adds some breathing room on smaller screens */
        }

        .contact-title {
          font-size: 3rem;
          font-weight: bold;
          text-align: center;
          color: #10b981;
          margin-bottom: 1rem;
        }

        .contact-description {
          font-size: 1.1rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #333;
        }

        .contact-list {
          list-style-type: disc;
          padding-left: 20px;
          font-size: 1rem;
          line-height: 1.6;
          color: #555;
        }

        .contact-link {
          color: #3182ce;
          text-decoration: none;
        }

        .contact-link:hover {
          text-decoration: underline;
        }

        .message-form {
          margin-top: 3rem;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
        }

        .input-field {
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          color: #333;
          outline: none;
          background-color: white;
          transition: border-color 0.3s;
        }

        .input-field:focus {
          border-color: #10b981;
        }

        .submit-btn {
          background-color: #10b981;
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .submit-btn:hover {
          background-color: #059669;
        }

        .submit-btn:focus {
          outline: none;
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
          .contact-title {
            font-size: 2rem;
          }
          .contact-form-container {
            margin: 10px;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;