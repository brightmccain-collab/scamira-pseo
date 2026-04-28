export function generateBacklinkSchema(country: string, countrySlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Gold Investment Guide for ${country}`,
    "description": `Comprehensive gold investment guide for ${country}. Learn about crypto-to-gold conversion, market trends, and secure investment strategies with Dubai & Cairo sourcing.`,
    "author": {
      "@type": "Organization",
      "name": "Amira Al Dhab",
      "url": "https://amiraaldhab.online"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Amira Al Dhab",
      "logo": {
        "@type": "ImageObject",
        "url": "https://amiraaldhab.online/logo.png"
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://amiraaldhab.online/backlinks/${countrySlug}`
    },
    "image": [
      `https://amiraaldhab.online/api/og/backlinks/${countrySlug}`
    ],
    "articleSection": "Gold Investment",
    "keywords": [`gold investment ${country}`, `cryptocurrency gold ${country}`, `Bitcoin gold ${country}`, `gold market ${country}`, `crypto investment ${country}`],
    "about": [
      {
        "@type": "Thing",
        "name": "Gold Investment"
      },
      {
        "@type": "Thing", 
        "name": "Cryptocurrency"
      },
      {
        "@type": "Place",
        "name": country
      }
    ]
  }
}

export function generateFAQSchema(country: string) {
  const faqs = [
    {
      "@type": "Question",
      "name": `Is gold investment legal in ${country}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, gold investment is legal in ${country} with proper documentation and compliance with local regulations. Our Dubai and Cairo sourcing ensures all transactions meet international legal standards.`
      }
    },
    {
      "@type": "Question",
      "name": `How do I convert cryptocurrency to gold in ${country}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${country} investors can transfer Bitcoin, Ethereum, or other cryptocurrencies to our secure wallet. We then procure physical gold from Dubai or Cairo markets and arrange secure delivery to your location.`
      }
    },
    {
      "@type": "Question",
      "name": `What are the tax implications for gold investment in ${country}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Tax treatment varies by jurisdiction, but many ${country} investors benefit from favorable capital gains treatment on precious metals. We recommend consulting with local tax advisors for personalized guidance.`
      }
    },
    {
      "@type": "Question",
      "name": `How long does delivery take from Dubai/Cairo to ${country}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Delivery times typically range from 3-7 business days, depending on ${country}'s customs procedures and your specific location. We provide tracking and insurance for all shipments.`
      }
    },
    {
      "@type": "Question",
      "name": `Is cryptocurrency to gold conversion safe for ${country} residents?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, when conducted through regulated providers like us. We implement multi-layer security, insurance coverage, and full regulatory compliance to protect ${country} investors throughout the conversion process.`
      }
    }
  ]

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  }
}

export function generateBreadcrumbSchema(section: string, country: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://amiraaldhab.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Backlinks",
        "item": "https://amiraaldhab.online/backlinks"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": country,
        "item": `https://amiraaldhab.online/backlinks/${country.toLowerCase().replace(/\s+/g, '-')}`
      }
    ]
  }
}
