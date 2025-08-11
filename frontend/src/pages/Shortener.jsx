import { useState } from "react";
import "../styles/Shortener.css";

const Shortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("https://urlshrotner-u51t.onrender.com/api/shortner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(`https://urlshrotner-u51t.onrender.com/${data.urlCode}`);
      } else {
        setError(data.error || "Failed to shorten URL");
      }
    } catch (err) {
      setError("Failed to connect to server" + err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="shortener-container">
      <h1 className="shortener-title">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="shortener-form">
        <div className="form-group">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to shorten"
            required
            className="form-input"
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {shortUrl && (
        <div className="success-message">
          <p>Shortened URL:</p>
          {console.log(shortUrl)}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default Shortener;
