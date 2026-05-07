import { countries, majorCities, getCountrySlug, getCitySlug } from '@/lib/data'

export default function sitemap() {
  const baseUrl = 'https://www.amiraalhadab.online'

  // Homepage
  const homePage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }

  // Country pages
  const countryPages = countries.map((country) => ({
    url: `${baseUrl}/buy-gold-in/${getCountrySlug(country)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // City pages
  const cityPages: any[] = []
  Object.entries(majorCities).forEach(([country, cities]) => {
    cities.forEach((city) => {
      cityPages.push({
        url: `${baseUrl}/buy-gold-in/${getCountrySlug(country)}/${getCitySlug(city)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })
    })
  })

  return [homePage, ...countryPages, ...cityPages]
}
