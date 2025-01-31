import React, { useState } from "react";
import axios from "axios";
import "../styles/Analyze.css";

const Analyze = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [factResults, setFactResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    setResult(null);
    setFactResults(null);

    if (!text.trim()) {
      setError("Please enter a news headline or topic.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze",
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResult(response.data);

      const factCheckResponse = await axios.post(
        "http://127.0.0.1:5000/fact-check",
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFactResults(factCheckResponse.data);

    } catch (err) {
      console.error("API Error:", err.response ? err.response.data : err.message);
      setError("Something went wrong! Please check the backend.");
    }
    setLoading(false);
  };

  return (
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
            <p className="unverified-text">🚨 Warning: No sources found!</p>
          )}
        </div>
      )}

      {factResults && (
        <div className="fact-check-box">
          <h2 className="fact-check-title">🔍 Fact-Checking Results</h2>
          {factResults.status === "fact-checked" ? (
            <>
              <ul className="fact-check-list">
                {factResults.claims.map((claim, index) => (
                  <li key={index}>
                    <strong>{claim.claim}</strong><br />
                    <em>Rating: {claim.rating}</em><br />
                    <small>Source: {claim.source}</small>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No fact-checking results found for this topic.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Analyze;
