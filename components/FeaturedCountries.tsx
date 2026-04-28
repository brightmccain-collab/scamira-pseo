import Link from 'next/link'
import { countries, getCountrySlug } from '@/lib/data'

export function FeaturedCountries() {
  const featuredCountries = countries.slice(0, 12)
  
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {featuredCountries.map((country) => (
        <Link
          key={country}
          href={`/buy-gold-in/${getCountrySlug(country)}`}
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
        >
          <h3 className="font-semibold text-lg mb-2">{country}</h3>
          <p className="text-gray-600 text-sm">Buy gold with crypto</p>
        </Link>
      ))}
    </div>
  )
}
