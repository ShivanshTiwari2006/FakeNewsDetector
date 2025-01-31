import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LatestNews.css"; 

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/latest-news");
        setLatestNews(response.data.articles);
      } catch (err) {
        setError("Failed to load latest news. Try again later.");
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <div className="latest-news-container">
      <h2 className="news-title">🆕 Latest News</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="news-list">
        {latestNews.length > 0 ? (
          latestNews.map((news, index) => (
            <li key={index} className="news-item">
              <strong>{news.source}:</strong> {news.title}
            </li>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </ul>
    </div>
  );
};

export default LatestNews;
