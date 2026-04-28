'use client'

import { useState } from 'react'

interface ShareSnippetBoxProps {
  country: string
  countrySlug: string
  summary: string
  citation: string
  className?: string
}

export function ShareSnippetBox({ country, countrySlug, summary, citation, className = '' }: ShareSnippetBoxProps) {
  const [copied, setCopied] = useState('')

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  const htmlSnippet = `<blockquote cite="https://amiraaldhab.online/backlinks/${countrySlug}">
  <p>"${citation}"</p>
  <cite>— Gold Investment Guide for ${country}</cite>
</blockquote>`

  const embeddableCode = `<iframe src="https://amiraaldhab.online/backlinks/${countrySlug}/embed" width="600" height="400" frameborder="0"></iframe>`

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-6">📋 Share This Investment Data</h3>
      
      {/* Summary Section */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">📝 Research Summary</h4>
        <div className="bg-gray-50 p-4 rounded border">
          <p className="text-gray-800 mb-3 leading-relaxed">{summary}</p>
          <button
            onClick={() => copyToClipboard(summary, 'summary')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
          >
            {copied === 'summary' ? '✓ Copied!' : '📋 Copy Summary'}
          </button>
        </div>
      </div>

      {/* Citation Section */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">🔗 Quick Citation</h4>
        <div className="bg-gray-50 p-4 rounded border">
          <p className="text-gray-800 mb-3 italic">"{citation}"</p>
          <button
            onClick={() => copyToClipboard(citation, 'citation')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
          >
            {copied === 'citation' ? '✓ Copied!' : '📋 Copy Citation'}
          </button>
        </div>
      </div>

      {/* HTML Snippet Section */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">🌐 HTML Blockquote</h4>
        <div className="bg-gray-50 p-4 rounded border">
          <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap break-words">
            {htmlSnippet}
          </pre>
          <button
            onClick={() => copyToClipboard(htmlSnippet, 'html')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors text-sm mt-3"
          >
            {copied === 'html' ? '✓ Copied!' : '📋 Copy HTML'}
          </button>
        </div>
      </div>

      {/* Embed Section */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">📱 Embeddable Content</h4>
        <div className="bg-gray-50 p-4 rounded border">
          <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap break-words">
            {embeddableCode}
          </pre>
          <button
            onClick={() => copyToClipboard(embeddableCode, 'embed')}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors text-sm mt-3"
          >
            {copied === 'embed' ? '✓ Copied!' : '📋 Copy Embed Code'}
          </button>
        </div>
      </div>

      {/* Attribution Guidelines */}
      <div className="bg-blue-50 p-4 rounded border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">📚 Attribution Guidelines</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Please include proper attribution when referencing our data</li>
          <li>• Link back to the original source when possible</li>
          <li>• Use the canonical URL: <code className="bg-blue-100 px-1 rounded">https://amiraaldhab.online/backlinks/{countrySlug}</code></li>
          <li>• Contact us for commercial use or bulk data requests</li>
        </ul>
      </div>
    </div>
  )
}
