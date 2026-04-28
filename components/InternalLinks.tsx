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

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <h3 className="text-2xl font-bold text-center mb-8">
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
