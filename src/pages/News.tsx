import { useEffect, useState } from "react";

const API_KEY = "472ab4707976461789485bc49c00302c"; // Replace with your actual API key
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=(pollution OR AQI OR air quality OR climate OR health risks OR real estate OR property market)&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

export default function News() {
  const [news, setNews] = useState<{ title: string; description: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(NEWS_API_URL);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
          setNews(data.articles.slice(0, 10)); // Show only top 10 articles
        } else {
          setError("No relevant news found.");
        }
      } catch (error) {
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-black mb-6">📰 Latest News on Pollution, AQI, Health & Real Estate</h2>

      {loading && <p className="text-center text-gray-600">Fetching latest news...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((article, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md bg-gray-100">
            <h3 className="text-xl font-semibold text-black">{article.title}</h3>
            <p className="text-gray-700 mt-2">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-blue-600 font-bold"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
