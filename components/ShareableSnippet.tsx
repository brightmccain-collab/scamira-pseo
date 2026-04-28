'use client'

import { useState } from 'react'
import { generateBacklinkContent } from '@/lib/backlinkContent'

interface ShareableSnippetProps {
  country: string
  countrySlug: string
  type: 'summary' | 'full'
}

export function ShareableSnippet({ country, countrySlug, type }: ShareableSnippetProps) {
  const [copied, setCopied] = useState(false)
  const content = generateBacklinkContent(country)
  
  const summarySnippet = `Gold investing in ${country} is experiencing significant growth as cryptocurrency integration makes precious metals more accessible. Dubai and Cairo sourcing provides ${country} investors with competitive pricing and secure delivery options.`
  
  const htmlSnippet = `<blockquote cite="https://amiraaldhab.online/backlinks/${countrySlug}">
  <p>"${summarySnippet}"</p>
  <cite>— Gold Investment Guide for ${country}</cite>
</blockquote>`

  const embeddableCode = `<iframe src="https://amiraaldhab.online/backlinks/${countrySlug}/embed" width="600" height="400" frameborder="0"></iframe>`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (type === 'summary') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-blue-900">Quick Quote</h4>
          <button
            onClick={() => copyToClipboard(summarySnippet)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>
        <p className="text-blue-800 text-sm italic">"{summarySnippet}"</p>
        <p className="text-blue-600 text-xs mt-2">
          Perfect for blog posts, articles, and social media
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-6">Share This Investment Guide</h3>
      
      {/* Summary Section */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">📝 Summary for Citations</h4>
        <div className="bg-gray-50 p-4 rounded border">
          <p className="text-gray-800 mb-3 italic">"{summarySnippet}"</p>
          <button
            onClick={() => copyToClipboard(summarySnippet)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
          >
            {copied ? '✓ Copied!' : '📋 Copy Summary'}
          </button>
        </div>
      </div>

      {/* HTML Snippet Section */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">🔗 HTML Blockquote</h4>
        <div className="bg-gray-50 p-4 rounded border">
          <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap break-words">
            {htmlSnippet}
          </pre>
          <button
            onClick={() => copyToClipboard(htmlSnippet)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm mt-3"
          >
            {copied ? '✓ Copied!' : '📋 Copy HTML'}
          </button>
        </div>
      </div>

      {/* Embed Section */}
      <div>
        <h4 className="font-semibold mb-3">📱 Embeddable Content</h4>
        <div className="bg-gray-50 p-4 rounded border">
          <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap break-words">
            {embeddableCode}
          </pre>
          <button
            onClick={() => copyToClipboard(embeddableCode)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors text-sm mt-3"
          >
            {copied ? '✓ Copied!' : '📋 Copy Embed Code'}
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <p className="text-sm text-blue-800">
          <strong>For Bloggers & Publishers:</strong> Use these snippets to reference our gold investment data. 
          Proper attribution helps maintain accuracy and supports continued research.
        </p>
      </div>
    </div>
  )
}
