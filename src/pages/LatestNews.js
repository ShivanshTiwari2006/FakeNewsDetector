import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LatestNews.css";

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/latest-news");
        setLatestNews(response.data.articles);
      } catch (err) {
        setError("Failed to load latest news. Try again later.");
      }
      setLoading(false);
    };

    fetchLatestNews();
  }, []);

  return (
    <div className="latest-news-container">
      <h2 className="news-title">🆕 Latest News</h2>
      {loading ? <p>Loading news...</p> : error ? <p>{error}</p> : (
        <ul className="news-list">
          {latestNews.map((news, index) => (
            <li key={index}>
              <strong>{news.source.name}:</strong> {news.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LatestNews;
