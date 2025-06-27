'use client'

import { useState } from 'react'

export default function TranslatePage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTranslate = async () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="p-6 max-w-xl w-full bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
          🇵🇱 PoliHelp Translator
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Paste Polish text below to translate and get clear instructions.
        </p>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows={6}
          placeholder="Paste Polish text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleTranslate}
          disabled={loading || !input.trim()}
          className="w-full mt-4 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>
        {result && (
          <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h2 className="font-semibold text-blue-800 mb-2">🗨️ English Translation:</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}
