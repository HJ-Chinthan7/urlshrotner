import { useState, useEffect } from 'react';
import '../styles/Analytics.css';

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('https://urlshrotner-u51t.onrender.com/api/analytics');
      const data = await response.json();
      
      if (response.ok) {
        setAnalytics(data);
      } else {
        setError('Failed to fetch analytics');
      }
    } catch (err) {
      setError('Failed to connect to server'+err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">URL Analytics</h1>
      
      {loading && <p className="analytics-loading">Loading analytics...</p>}
      
      {error && (
        <div className="analytics-error">
          {error}
        </div>
      )}

      {!loading && !error && analytics.length === 0 && (
        <p className="analytics-empty">No analytics data available</p>
      )}

      {!loading && !error && analytics.length > 0 && (
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
              <th>Last Accessed</th>
            </tr>
          </thead>
          <tbody>
            {analytics.map((item) => (
              <tr key={item._id}>
                <td>
                  <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="analytics-url">
                    {item.originalUrl.length > 50 
                      ? `${item.originalUrl.substring(0, 50)}...` 
                      : item.originalUrl}
                  </a>
                </td>
                <td>
                  <a href={`https://urlshrotner-u51t.onrender.com/${item.shortUrl}`} target="_blank" rel="noopener noreferrer" className="analytics-url">
                    {item.shortUrl}
                  </a>
                </td>
                <td className="analytics-clicks">
                  {item.clicks || 0}
                </td>
                <td>
                  {console.log(item)}
                  {item.updatedAt 
                    ? new Date(item.updatedAt).toLocaleString() 
                    : 'Never'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Analytics;
