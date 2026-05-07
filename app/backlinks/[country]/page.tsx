import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { generateBacklinkContent } from '@/lib/backlinkContent'
import { generateBacklinkSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/backlinkSchema'
import { GoldInsightCard } from '@/components/backlinks/GoldInsightCard'
import { ComparisonTable } from '@/components/backlinks/ComparisonTable'
import { MarketTrendBlock } from '@/components/backlinks/MarketTrendBlock'
import { ShareSnippetBox } from '@/components/backlinks/ShareSnippetBox'
import { OutreachSection } from '@/components/backlinks/OutreachSection'

interface CountryBacklinkPageProps {
  params: { country: string }
}

export async function generateStaticParams() {
  // For now, return a limited set of countries to avoid build timeout
  return [
    { country: 'nigeria' },
    { country: 'germany' },
    { country: 'canada' },
    { country: 'united-states' },
    { country: 'india' }
  ]
}

export async function generateMetadata({ params }: CountryBacklinkPageProps): Promise<Metadata> {
  return {
    title: `Gold Investment Guide for ${params.country}`,
    description: `Comprehensive gold investment guide for ${params.country}. Learn about crypto-to-gold conversion, market trends, and secure investment strategies with Dubai & Cairo sourcing.`,
    keywords: `gold investment ${params.country}, cryptocurrency gold ${params.country}, Bitcoin gold ${params.country}, gold market ${params.country}, crypto investment ${params.country}`,
    openGraph: {
      title: `Gold Investment Guide for ${params.country} | Market Analysis & Crypto Integration`,
      description: `Complete guide to gold investing in ${params.country} with cryptocurrency payments. Market insights, price analysis, and secure sourcing from Dubai & Cairo.`,
      type: 'article',
      images: [`/api/og/backlinks/${params.country}`]
    },
    alternates: {
      canonical: `https://www.amiraalhadab.online/backlinks/${params.country}`
    }
  }
}

export default async function CountryBacklinkPage({ params }: CountryBacklinkPageProps) {
  const content = generateBacklinkContent(params.country)
  const articleSchema = generateBacklinkSchema(params.country, params.country)
  const faqSchema = generateFAQSchema(params.country)
  const breadcrumbSchema = generateBreadcrumbSchema('Backlinks', params.country)

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
              <Link href="/backlinks" className="text-gray-600 hover:text-gray-900">Backlinks</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium capitalize">{params.country}</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Gold Investment Guide for {params.country}
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-3xl">
              Comprehensive analysis of gold investment opportunities in {params.country}, 
              including cryptocurrency integration, market trends, and secure sourcing from Dubai & Cairo.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link 
                href={`/buy-gold-in/${params.country}`}
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🏠 Buy Gold in {params.country}
              </Link>
            </div>
          </div>
        </section>

        {/* Market Insights Section */}
        <section className="section">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Market Insights for {params.country}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.marketInsights.map((insight, index) => (
                <GoldInsightCard key={index} insight={insight} />
              ))}
            </div>
          </div>
        </section>

        {/* Market Trends Section */}
        <section className="section bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Regional Demand Analysis
            </h2>
            <MarketTrendBlock 
              trends={content.marketTrends}
              country={params.country}
            />
          </div>
        </section>

        {/* Crypto to Gold Explanation */}
        <section className="section">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Cryptocurrency to Gold Conversion
            </h2>
            <div className="max-w-4xl mx-auto prose prose-lg">
              {content.cryptoExplanation.map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link 
                href={`/buy-gold-in/${params.country}`}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Crypto-to-Gold Conversion
              </Link>
            </div>
          </div>
        </section>

        {/* Investment Comparison */}
        <section className="section bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Investment Comparison: Gold vs Crypto in {params.country}
            </h2>
            <ComparisonTable 
              data={content.comparisonData}
              country={params.country}
            />
          </div>
        </section>

        {/* Trust Building Section */}
        <section className="section bg-green-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Trust Our Dubai & Cairo Sourcing
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {content.trustPoints.map((point, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                  <p className="text-gray-700">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {content.faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shareable Summary Block */}
        <section className="section bg-blue-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Share This Investment Guide
            </h2>
            <div className="max-w-4xl mx-auto">
              <ShareSnippetBox 
                country={params.country}
                countrySlug={params.country}
                summary={content.shareSummary}
                citation={content.shareCitation}
              />
            </div>
          </div>
        </section>

        {/* Outreach Section */}
        <section className="section bg-gray-900 text-white">
          <div className="container">
            <OutreachSection 
              country={params.country}
              countrySlug={params.country}
              canonicalUrl={`https://www.amiraalhadab.online/backlinks/${params.country}`}
            />
          </div>
        </section>

        {/* Internal Links */}
        <section className="section">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Explore Gold Investment in {params.country}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link 
                href={`/buy-gold-in/${params.country}`}
                className="bg-blue-600 text-white p-8 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <h3 className="text-2xl font-semibold mb-4">🏠 Buy Gold in {params.country}</h3>
                <p>Start your gold investment journey with cryptocurrency payments</p>
              </Link>
              <Link 
                href="/backlinks"
                className="bg-gray-800 text-white p-8 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-2xl font-semibold mb-4">📊 More Investment Guides</h3>
                <p>Explore gold investment guides for other countries</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
