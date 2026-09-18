import { useState } from "react";

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

const handleSubmit = async(e: React.SubmitEvent) => {
  e.preventDefault()
  if(!longUrl) return;

  console.log(longUrl)
  setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      });
      const data = await response.json();

      console.log(data)

      setShortUrl(`http://localhost:3000/retrieve/${data}`)

    } catch (err) {
      console.error('Failed to shorten URL', err);
    } finally {
      setLoading(false);
    }
}

return (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">URL Shortener</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Long URL</label>
            <input
              type="url"
              required
              placeholder="https://example.com/very-long-link"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
          >
            {loading ? 'Shortening...' : 'Generate Short Link'}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Your Short Link:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold break-all hover:underline"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
)
}

export default App