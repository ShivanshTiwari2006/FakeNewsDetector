import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";  // Import the CSS for the updated design

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="home-title">📰 Fake News Detector</h1>
        <p className="home-description">
          AI-powered detection to identify fake news. Enter news articles, and let our AI analyze their authenticity in real-time.
        </p>
        <button className="home-button" onClick={() => navigate("/Analyze")}>
          Get Started 🚀
        </button>  
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <i className="fas fa-brain feature-icon"></i>
          <h3>AI-Powered</h3>
          <p>Leverages advanced machine learning models to detect fake news with unmatched accuracy.</p>
        </div>
        <div className="feature">
          <i className="fas fa-check-circle feature-icon"></i>
          <h3>High Accuracy</h3>
          <p>Trained on vast datasets to ensure precise and reliable results for any news source.</p>
        </div>
        <div className="feature">
          <i className="fas fa-user-shield feature-icon"></i>
          <h3>Secure & Private</h3>
          <p>Your data remains safe with industry-leading encryption and privacy protocols.</p>
        </div>
      </section>

      {/* Interactive Section (New Feature) */}
      <section className="interactive">
        <h2>Get Involved!</h2>
        <p>Help improve the accuracy by providing feedback on news reliability. Rate articles and contribute to the analysis process.</p>
        <button className="feedback-button" onClick={() => navigate("/feedback")}>
          Provide Feedback
        </button>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 Fake News Detector. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/about">About</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
