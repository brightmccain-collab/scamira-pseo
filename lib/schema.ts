export function generateProductSchema(location: string, isCity: boolean = false) {
  const baseLocation = isCity ? location : location
  const description = isCity 
    ? `Buy premium gold in ${location} using Bitcoin, Ethereum, and cryptocurrencies. Fast delivery from Dubai & Cairo. Trusted gold dealer serving ${location}.`
    : `Buy premium gold in ${location} using Bitcoin, Ethereum, and cryptocurrencies. Fast delivery from Dubai & Cairo. Trusted gold dealer with secure crypto payments.`

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Premium Gold in ${location}`,
    "description": description,
    "category": "Precious Metals",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "acceptedPaymentMethod": ["Bitcoin", "Ethereum", "Cryptocurrency"],
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Buy Gold with Crypto",
        "url": "https://amiraaldhab.online"
      }
    },
    "brand": {
      "@type": "Brand",
      "name": "Premium Gold Investments"
    }
  }
}

export function generateFAQSchema(location: string, isCity: boolean = false) {
  const baseFAQs = [
    {
      "@type": "Question",
      "name": `How long does delivery to ${location} take?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Delivery times to ${location} typically range from 3-7 business days, depending on your specific location and customs processing.`
      }
    },
    {
      "@type": "Question", 
      "name": `What cryptocurrencies do you accept for gold purchases in ${location}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `We accept Bitcoin (BTC), Ethereum (ETH), USDT, and other major cryptocurrencies for gold purchases destined for ${location}.`
      }
    },
    {
      "@type": "Question",
      "name": `Are there import duties for gold delivered to ${location}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Import duties vary by country. We'll provide guidance on any applicable taxes for gold imports to ${location} during the ordering process.`
      }
    },
    {
      "@type": "Question",
      "name": `How do I verify the authenticity of gold delivered to ${location}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `All our gold comes with certificates of authenticity and can be verified at local assay offices in ${location}.`
      }
    },
    {
      "@type": "Question",
      "name": `Can I track my gold shipment to ${location}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, we provide full tracking information for all shipments to ${location}, updated regularly via WhatsApp.`
      }
    }
  ]

  // Add city-specific FAQs if this is a city page
  if (isCity) {
    baseFAQs.push(
      {
        "@type": "Question",
        "name": `Is gold delivery available to all areas of ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We deliver to all major areas of ${location}. Contact us to confirm delivery to your specific address.`
        }
      },
      {
        "@type": "Question",
        "name": `What makes ${location} a good market for gold investments?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${location} has a sophisticated investment community that values precious metals as portfolio diversification and inflation protection.`
        }
      }
    )
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": baseFAQs
  }
}

export function generateBreadcrumbSchema(country: string, city?: string) {
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://amiraaldhab.online"
    },
    {
      "@type": "ListItem", 
      "position": 2,
      "name": `Buy Gold in ${country}`,
      "item": `https://amiraaldhab.online/buy-gold-in/${country.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    }
  ]

  if (city) {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 3,
      "name": `Buy Gold in ${city}`,
      "item": `https://amiraaldhab.online/buy-gold-in/${country.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    })
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  }
}
