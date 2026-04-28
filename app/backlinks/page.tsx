import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gold Investment Guides - Country-Specific Market Analysis',
  description: 'Comprehensive gold investment guides for countries worldwide. Market insights, cryptocurrency integration, and secure sourcing from Dubai & Cairo.',
  keywords: 'gold investment guides, cryptocurrency gold, market analysis, gold by country',
  openGraph: {
    title: 'Gold Investment Guides - Country-Specific Market Analysis',
    description: 'Comprehensive gold investment guides for countries worldwide with cryptocurrency integration.',
    type: 'website',
  }
}

export default function BacklinksIndexPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Gold Investment Guides
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-3xl">
            Comprehensive country-specific gold investment guides with cryptocurrency integration, 
            market analysis, and secure sourcing from Dubai & Cairo.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="section">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Investment Guides Coming Soon</h2>
            <p className="text-xl text-gray-600 mb-12">
              We're building comprehensive gold investment guides for countries worldwide. 
              Each guide will include market insights, crypto-to-gold conversion strategies, 
              and country-specific investment opportunities.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-3">Market Analysis</h3>
                <p className="text-gray-600">Country-specific market trends, demand analysis, and investment opportunities</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-3xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold mb-3">Crypto Integration</h3>
                <p className="text-gray-600">Seamless cryptocurrency-to-gold conversion strategies and security measures</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-3xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-3">Global Sourcing</h3>
                <p className="text-gray-600">Secure gold sourcing from Dubai and Cairo with competitive pricing</p>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-700 mb-6">
                Be the first to access our comprehensive gold investment guides when they launch.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
