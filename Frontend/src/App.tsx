import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

// Same rule as the backend: http(s) only, with a real-looking host
function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const isHttp = url.protocol === 'http:' || url.protocol === 'https:';
    const hasHost = url.hostname.includes('.') || url.hostname === 'localhost';
    return isHttp && hasHost;
  } catch {
    return false;
  }
}

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [slow, setSlow] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setShortUrl('');
    setCopied(false);

    const trimmed = longUrl.trim();

    if (!trimmed) {
      setError('Please enter a URL to shorten.');
      return;
    }

    if (!isValidHttpUrl(trimmed)) {
      setError('That doesn\'t look like a valid URL. Include http:// or https://, e.g. https://example.com');
      return;
    }

    setError('');
    setLoading(true);

    // Free hosting puts the server to sleep when idle; tell the user if the first request is slow
    const slowTimer = setTimeout(() => setSlow(true), 4000);

    try {
      const response = await fetch(`${API_URL}/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: trimmed }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.shortCode) {
        setError(data.error || 'Something went wrong while shortening the URL. Please try again.');
        return;
      }

      setShortUrl(`${API_URL}/retrieve/${data.shortCode}`);
    } catch {
      // fetch only rejects when the server cannot be reached at all
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      clearTimeout(slowTimer);
      setSlow(false);
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Could not copy automatically. Please select the link and copy it.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center">URL Shortener</h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">Paste a long link and get a short one.</p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Long URL
            </label>
            <input
              id="longUrl"
              type="text"
              inputMode="url"
              placeholder="https://example.com/very-long-link"
              value={longUrl}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'url-error' : undefined}
              onChange={(e) => {
                setLongUrl(e.target.value);
                if (error) setError('');
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                error
                  ? 'border-red-400 focus:ring-red-300'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {error && (
              <p id="url-error" role="alert" className="mt-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Shortening...' : 'Generate Short Link'}
          </button>

          {slow && (
            <p className="text-sm text-gray-500 text-center">
              The server was asleep and is waking up. This can take up to a minute on the first request.
            </p>
          )}
        </form>

        {shortUrl && (
          <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Your Short Link:</p>
            <div className="flex items-center justify-between gap-3">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold break-all hover:underline"
              >
                {shortUrl}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
