import Link from 'next/link'
import { countries, getCountrySlug } from '@/lib/data'

interface InternalLinksProps {
  currentCountry: string
}

export function InternalLinks({ currentCountry }: InternalLinksProps) {
  // Simple hash function for deterministic but varied selection
  let hash = 0
  for (let i = 0; i < currentCountry.length; i++) {
    const char = currentCountry.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  
  const seed = Math.abs(hash)
  const startIndex = seed % (countries.length - 12)
  const relatedCountries = countries
    .filter(c => c !== currentCountry)
    .slice(startIndex, startIndex + 12)

  const filteredCountries = countries.filter(country => country !== currentCountry)

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Gold Investment Opportunities Worldwide
        </h2>
        
        {/* Investment Guide Link */}
        <div className="mb-8 text-center">
          <Link
            href={`/backlinks/${getCountrySlug(currentCountry)}`}
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            📊 Investment Guide for {currentCountry}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.slice(0, 6).map(country => {
            const countrySlug = getCountrySlug(country)
            return (
              <Link
                key={country}
                href={`/buy-gold-in/${countrySlug}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-2">{country}</h3>
                <p className="text-gray-600 mb-4">
                  Buy gold with cryptocurrency in {country}
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  Explore {country}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View all countries
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="text-center">
            <Link
              href="/backlinks"
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
            >
              All Investment Guides
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center mb-8 mt-12">
          Buyers from nearby regions also include…
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {relatedCountries.map((country) => (
            <Link
              key={country}
              href={`/buy-gold-in/${getCountrySlug(country)}`}
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 text-center"
            >
              <span className="font-medium">{country}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
