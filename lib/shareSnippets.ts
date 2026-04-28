// Deterministic shareable snippet generator for backlink pages

interface ShareSnippet {
  summary: string
  citation: string
  htmlSnippet: string
  embedCode: string
}

// Country-specific economic contexts for variation
const countryContexts: Record<string, {
  economicFactors: string[]
  currencyTrends: string[]
  marketDrivers: string[]
}> = {
  nigeria: {
    economicFactors: ['inflation pressure', 'currency devaluation', 'foreign exchange shortages'],
    currencyTrends: ['Naira volatility', 'USD dependence', 'cryptocurrency adoption'],
    marketDrivers: ['wealth preservation', 'remittance flows', 'digital asset integration']
  },
  germany: {
    economicFactors: ['inflation concerns', 'energy costs', 'EU monetary policy'],
    currencyTrends: ['Euro stability', 'interest rate changes', 'banking sector health'],
    marketDrivers: ['inflation hedging', 'wealth preservation', 'diversification needs']
  },
  canada: {
    economicFactors: ['inflation trends', 'housing market', 'commodity prices'],
    currencyTrends: ['CAD fluctuations', 'USD correlation', 'resource exports'],
    marketDrivers: ['wealth preservation', 'retirement planning', 'portfolio diversification']
  },
  'united-states': {
    economicFactors: ['inflation data', 'Federal Reserve policy', 'banking system stability'],
    currencyTrends: ['Dollar strength', 'interest rate environment', 'global reserve status'],
    marketDrivers: ['inflation protection', 'crisis hedging', 'store of value demand']
  },
  india: {
    economicFactors: ['inflation management', 'RBI policies', 'economic growth'],
    currencyTrends: ['Rupee stability', 'foreign investment flows', 'trade balance'],
    marketDrivers: ['cultural affinity', 'wedding demand', 'wealth preservation tradition']
  }
}

// Safe hash function for deterministic content generation
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return Math.abs(hash);
}

export function generateShareSnippets(country: string, countrySlug: string): ShareSnippet {
  const context = countryContexts[country.toLowerCase()] || {
    economicFactors: ['economic uncertainty', 'inflation concerns', 'market volatility'],
    currencyTrends: ['currency fluctuations', 'monetary policy', 'exchange rate changes'],
    marketDrivers: ['wealth preservation', 'investment diversification', 'risk management']
  }

  // Use deterministic hash for consistent content generation
  const hash = hashString(country)
  const economicIndex = hash % context.economicFactors.length
  const currencyIndex = (hash >> 8) % context.currencyTrends.length
  const marketIndex = (hash >> 16) % context.marketDrivers.length

  const selectedEconomic = context.economicFactors[economicIndex]
  const selectedCurrency = context.currencyTrends[currencyIndex]
  const selectedMarket = context.marketDrivers[marketIndex]

  // Generate unique summary per country
  const summary = `Gold investment in ${country} is experiencing significant growth driven by ${selectedEconomic}, ${selectedCurrency}, and increasing ${selectedMarket}. The integration of cryptocurrency payments through Dubai and Cairo sourcing channels has made precious metals more accessible to investors seeking stable store-of-value assets in the current economic environment.`

  // Generate concise citation
  const citation = `Gold investment in ${country} is rising due to ${selectedEconomic}, ${selectedCurrency}, and growing ${selectedMarket} through crypto-to-gold conversion channels.`

  // Generate HTML snippet
  const htmlSnippet = `<blockquote cite="https://amiraaldhab.online/backlinks/${countrySlug}">
  <p>"${citation}"</p>
  <cite>— Gold Investment Guide for ${country}</cite>
</blockquote>`

  // Generate embed code
  const embedCode = `<iframe src="https://amiraaldhab.online/backlinks/${countrySlug}/embed" width="600" height="400" frameborder="0"></iframe>`

  return {
    summary,
    citation,
    htmlSnippet,
    embedCode
  }
}

export function generateAllShareSnippets(): Array<{
  country: string
  countrySlug: string
  snippets: ShareSnippet
}> {
  const countries = Object.keys(countryContexts)
  
  return countries.map(country => {
    const countrySlug = country.toLowerCase().replace(/\s+/g, '-')
    return {
      country: country.charAt(0).toUpperCase() + country.slice(1),
      countrySlug,
      snippets: generateShareSnippets(country, countrySlug)
    }
  })
}

// Export function for manual outreach systems
export function exportShareSnippets() {
  const allSnippets = generateAllShareSnippets()
  
  return {
    generated: new Date().toISOString(),
    totalCountries: allSnippets.length,
    assets: allSnippets.map(({ country, countrySlug, snippets }) => ({
      country,
      url: `https://amiraaldhab.online/backlinks/${countrySlug}`,
      summary: snippets.summary,
      citation: snippets.citation,
      htmlSnippet: snippets.htmlSnippet,
      embedCode: snippets.embedCode
    }))
  }
}
