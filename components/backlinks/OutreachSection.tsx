'use client'

import { useState } from 'react'

interface OutreachSectionProps {
  country: string
  countrySlug: string
  canonicalUrl: string
  className?: string
}

export function OutreachSection({ country, countrySlug, canonicalUrl, className = '' }: OutreachSectionProps) {
  const [copied, setCopied] = useState('')

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  const partnershipEmail = 'partnerships@amiraaldhab.online'
  const referenceText = `Gold Investment Data for ${country} - Source: Amira Al Dhab Gold Investment Guide`

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Partner With Us Section */}
        <div className="bg-gray-800 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">🤝 Partner With Us</h3>
          <p className="text-gray-300 mb-6">
            We collaborate with financial websites, investment blogs, and cryptocurrency platforms 
            to provide accurate gold investment data for {country} investors.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Partnership Opportunities:</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Content collaboration and data sharing</li>
                <li>• Affiliate partnerships for {country} market</li>
                <li>• Joint research initiatives</li>
                <li>• Educational content development</li>
                <li>• API integration for real-time data</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-sm text-gray-300 mb-2">Contact us:</p>
              <button
                onClick={() => copyToClipboard(partnershipEmail, 'email')}
                className="text-blue-400 hover:text-blue-300 font-mono text-sm"
              >
                {copied === 'email' ? '✓ Email Copied!' : partnershipEmail}
              </button>
            </div>
          </div>
        </div>

        {/* Reference This Data Section */}
        <div className="bg-gray-800 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">📊 Reference This Data</h3>
          <p className="text-gray-300 mb-6">
            Academic researchers, journalists, and financial analysts can reference our 
            comprehensive gold investment data for {country}.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Citation Format:</h4>
              <div className="bg-gray-700 p-4 rounded">
                <p className="text-sm text-gray-300 italic">
                  "{referenceText}"<br />
                  Amira Al Dhab Gold Investment Guide<br />
                  Available at: {canonicalUrl}<br />
                  Accessed: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-sm text-gray-300 mb-2">Quick citation:</p>
              <button
                onClick={() => copyToClipboard(referenceText, 'citation')}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                {copied === 'citation' ? '✓ Citation Copied!' : '📋 Copy Citation'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Canonical URL and Guidelines */}
      <div className="mt-8 bg-gray-700 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">📋 Usage Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Canonical URL:</h4>
            <div className="bg-gray-600 p-3 rounded">
              <code className="text-sm text-green-400">{canonicalUrl}</code>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Requirements:</h4>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Provide proper attribution</li>
              <li>• Include canonical URL link</li>
              <li>• Update data regularly</li>
              <li>• Contact for commercial use</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Sharing */}
      <div className="mt-8 text-center">
        <h3 className="text-xl font-bold mb-4">🌐 Share This Guide</h3>
        <div className="flex justify-center gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=Check out this comprehensive gold investment guide for ${country}&url=${canonicalUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            🐦 Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${canonicalUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            💼 LinkedIn
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${canonicalUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors"
          >
            📘 Facebook
          </a>
        </div>
      </div>
    </div>
  )
}
