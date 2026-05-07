import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { countries, majorCities, getCountrySlug, getCitySlug } from '@/lib/data'
import { generateContentVariation } from '@/lib/aiContent'
import { getLayoutVariant, getLayoutConfig } from '@/lib/layoutVariants'
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema'
import { CTAButton } from '@/components/CTAButton'
import { getCTAText } from '@/lib/ctaText'
import { InternalLinks } from '@/components/InternalLinks'
import { Testimonials } from '@/components/Testimonials'
import { FAQSection } from '@/components/FAQSection'

interface CityPageProps {
  params: { country: string; city: string }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const countryName = countries.find(c => getCountrySlug(c) === params.country)
  const cities = countryName && countryName in majorCities ? majorCities[countryName as keyof typeof majorCities] : []
  const cityName = cities.find((c: string) => getCitySlug(c) === params.city)
  
  if (!countryName || !cityName) {
    return {
      title: 'Location Not Found',
      description: 'The requested location page does not exist.'
    }
  }

  return {
    title: `Buy Gold in ${cityName}, ${countryName} with Bitcoin (Fast Delivery from Dubai & Cairo)`,
    description: `Buy premium gold in ${cityName}, ${countryName} using Bitcoin, Ethereum, and cryptocurrencies. Fast delivery from Dubai & Cairo. Trusted local gold dealer.`,
    keywords: `buy gold ${cityName}, gold cryptocurrency ${cityName}, Bitcoin gold ${cityName}, Ethereum gold ${cityName}, gold delivery ${cityName}, ${countryName} gold`,
    openGraph: {
      title: `Buy Gold in ${cityName}, ${countryName} with Bitcoin | Dubai & Cairo Delivery`,
      description: `Buy premium gold in ${cityName}, ${countryName} using cryptocurrency. Fast delivery from Dubai & Cairo.`,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.amiraalhadab.online/buy-gold-in/${params.country}/${params.city}`
    }
  }
}

export async function generateStaticParams() {
  const params: { country: string; city: string }[] = []
  
  Object.entries(majorCities).forEach(([country, cities]) => {
    cities.forEach((city) => {
      params.push({
        country: getCountrySlug(country),
        city: getCitySlug(city)
      })
    })
  })
  
  return params
}

export default async function CityPage({ params }: CityPageProps) {
  const countryName = countries.find((c: string) => getCountrySlug(c) === params.country)
  const cities = countryName && countryName in majorCities ? majorCities[countryName as keyof typeof majorCities] : []
  const cityName = cities.find((c: string) => getCitySlug(c) === params.city)
  
  if (!countryName || !cityName) {
    return <div>Location not found</div>
  }

  const content = generateContentVariation(cityName, true)
  const layoutVariant = getLayoutVariant(`${params.country}-${params.city}`)
  const layoutConfig = getLayoutConfig(layoutVariant, params.country)

  const ctaTexts = [
    "Contact on WhatsApp",
    "Message Gold Experts", 
    "Start WhatsApp Chat",
    "Get Gold Quote"
  ]

  const whatsappMessage = `Hi! I'm interested in buying gold in ${cityName}, ${countryName} with cryptocurrency`

  // Generate schema data
  const productSchema = generateProductSchema(cityName, true)
  const faqSchema = generateFAQSchema(cityName, true)
  const breadcrumbSchema = generateBreadcrumbSchema(countryName, cityName)

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <nav className="bg-gray-100 py-4">
          <div className="container">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href={`/buy-gold-in/${params.country}`} className="text-gray-600 hover:text-gray-900">
                {countryName}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{cityName}</span>
            </div>
          </div>
        </nav>

        {/* Render sections based on layout variant with dynamic CTA injection */}
        {layoutConfig.sections.map((section, index) => {
          const isMidPoint = index === Math.floor(layoutConfig.sections.length / 2)
          const shouldInjectMidCTA = isMidPoint && section !== 'cta'

          return (
            <React.Fragment key={section}>
              {section === 'hero' ? (
                <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
                  <div className="container text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                      Buy Gold in {cityName}, {countryName} with Bitcoin
                    </h1>
                    <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                      Premium gold delivered to {cityName} from Dubai & Cairo. 
                      Pay with Bitcoin, Ethereum, and other cryptocurrencies.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                      <CTAButton 
                        variant="whatsapp" 
                        href={`https://wa.me/2819063800?text=${encodeURIComponent(whatsappMessage)}`}
                      >
                        📱 {getCTAText(params.country + '-' + params.city, 'top')}
                      </CTAButton>
                      <CTAButton 
                        variant="primary" 
                        href="https://www.amiraalhadab.online"
                      >
                        🏠 Visit Main Site
                      </CTAButton>
                    </div>
                  </div>
                </section>
              ) : section === 'trust' ? (
                <TrustSection location={cityName} trustPoints={content.trustPoints} />
              ) : section === 'content' ? (
                <ContentSection content={content} location={cityName} />
              ) : section === 'internal-links' ? (
                <InternalLinks currentCountry={countryName} />
              ) : section === 'testimonials' ? (
                <Testimonials location={cityName} />
              ) : section === 'faq' ? (
                <FAQSection location={cityName} />
              ) : section === 'cta' ? (
                <CTASection location={cityName} />
              ) : null}
              
              {/* Inject mid-content CTA */}
              {shouldInjectMidCTA && (
                <section className="section bg-gray-100 py-12">
                  <div className="container text-center">
                    <h2 className="text-2xl font-bold mb-4">
                      Ready to Secure Your Gold Investment in {cityName}?
                    </h2>
                    <p className="text-lg mb-6 text-gray-700">
                      Don't miss out on current gold prices. Contact our experts now.
                    </p>
                    <CTAButton 
                      variant="primary" 
                      href={`https://wa.me/2819063800?text=Hi! I'm interested in gold investment opportunities in ${cityName}, ${countryName}`}
                      className="bg-whatsapp text-white hover:bg-green-600"
                    >
                      📱 {getCTAText(params.country + '-' + params.city, 'mid')}
                    </CTAButton>
                  </div>
                </section>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}

function TrustSection({ location, trustPoints }: { location: string, trustPoints: string[] }) {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trusted Gold Delivery to {location}
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {trustPoints.map((point, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">
                {['📍', '💰', '🔒', '✈️'][index]}
              </div>
              <h3 className="font-semibold mb-2">
                {['Strategic Hub', 'Best Prices', 'Secure Transactions', 'Fast Delivery'][index]}
              </h3>
              <p className="text-gray-600">{point.replace(/{location}/g, location)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContentSection({ content, location }: { content: any, location: string }) {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {content.intro.map((paragraph: string, index: number) => (
            <p key={index} className="mb-4">{paragraph.replace(/{location}/g, location)}</p>
          ))}
          
          {content.bodyBlocks.map((block: string[], blockIndex: number) => (
            <div key={blockIndex}>
              {block.map((paragraph: string, paraIndex: number) => (
                <p key={paraIndex} className="mb-4">{paragraph.replace(/{location}/g, location)}</p>
              ))}
            </div>
          ))}
          
          {content.microSections.map((section: string, index: number) => (
            <div key={index} className="bg-blue-50 p-6 rounded-lg my-8">
              <p>{section.replace(/{location}/g, location)}</p>
            </div>
          ))}
          
          {/* City-specific content */}
          {content.citySpecific && (
            <>
              <div className="bg-green-50 p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold mb-4">Gold Demand in {location}</h3>
                {content.citySpecific.demand.map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold mb-4">Typical Buyers in {location}</h3>
                {content.citySpecific.buyers.map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold mb-4">Why Crypto is Preferred in {location}</h3>
                {content.citySpecific.cryptoPreference.map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </>
          )}
          
          {content.conclusion.map((paragraph: string, index: number) => (
            <p key={index} className="mb-4 font-semibold">{paragraph.replace(/{location}/g, location)}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection({ location }: { location: string }) {
  return (
    <section className="section bg-whatsapp text-white">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Buy Gold in {location}?
        </h2>
        <p className="text-xl mb-8">
          Contact us now on WhatsApp for instant assistance and to place your order
        </p>
        <CTAButton 
          variant="primary" 
          href={`https://wa.me/2819063800?text=Hi! I'm ready to buy gold in ${location} with cryptocurrency`}
          className="bg-white text-whatsapp hover:bg-gray-100"
        >
          📱 Message on WhatsApp
        </CTAButton>
      </div>
    </section>
  )
}
