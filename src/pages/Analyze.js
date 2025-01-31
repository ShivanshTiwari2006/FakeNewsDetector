import React, { useState } from "react";
import axios from "axios";
import LatestNews from "../pages/LatestNews";  // Import Latest News Component
import "../styles/Analyze.css";

const Analyze = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    setResult(null);

    if (!text.trim()) {
      setError("Please enter a news headline or topic.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", { text });
      setResult(response.data);
    } catch (err) {
      setError("Something went wrong! Please check the backend.");
    }
    setLoading(false);
  };

  return (
    <div className="analyze-page">
      <div className="content-wrapper">
        <div className="analyze-container">
          <h1 className="analyze-title">📰 Fake News Verification</h1>
          <p className="analyze-description">
            Enter a news headline or topic below and let AI check its authenticity.
          </p>

          <textarea
            className="analyze-input"
            placeholder="Enter news headline or topic..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button className="analyze-button" onClick={handleAnalyze} disabled={loading}>
            {loading ? "Checking..." : "Verify News"}
          </button>

          {error && <p className="error-message">{error}</p>}

          {result && (
            <div className="result-box">
              <h2 className="result-title">📊 Analysis Result</h2>
              {result.status === "verified" ? (
                <>
                  <p className="verified-text">✅ This news has been reported by legitimate sources:</p>
                  <ul className="article-list">
                    {result.articles.map((article, index) => (
                      <li key={index}>
                        <strong>{article.source}:</strong> {article.title}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="unverified-text">🚨 Warning: This news may be fake or unverified!</p>
              )}
            </div>
          )}
        </div>

        {/* Latest News Component */}
        <LatestNews />
      </div>
    </div>
  );
};

export default Analyze;
