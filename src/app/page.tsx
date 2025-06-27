'use client'

import { useState } from 'react'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTranslate = async () => {
    if (!input.trim()) return
    setLoading(true)
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    })
    const data = await res.json()
    setResult(data.translation)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center gap-2">
          🇵🇱 PoliHelp
        </h1>
        <span className="text-sm text-gray-500">Your Polish-to-English Assistant</span>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-semibold mb-4">Translate Polish Text</h2>

        <textarea
          className="w-full p-3 border border-gray-300 rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={6}
          placeholder="Paste Polish text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleTranslate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>

        {loading && (
          <div className="mt-4 text-blue-500 animate-pulse">⏳ Working on it...</div>
        )}

        {result && (
          <div className="mt-6 bg-white border p-4 rounded shadow">
            <h3 className="font-semibold mb-2">🗨️ English Translation:</h3>
            <p>{result}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">
        Made with ❤️ by Felix • Powered by OpenAI + Next.js
      </footer>
    </div>
  )
}
