// Browser-compatible hash function

export interface ContentVariation {
  intro: string[]
  bodyBlocks: string[][]
  microSections: string[]
  conclusion: string[]
  trustPoints: string[]
  citySpecific?: {
    demand: string[]
    buyers: string[]
    cryptoPreference: string[]
  }
}

const contentVariations = {
  intro: [
    "Discover the premium gold investment opportunities available in {location}, where cryptocurrency meets precious metals in perfect harmony.",
    "Welcome to the most trusted gold dealer serving {location}, offering seamless cryptocurrency payments and reliable delivery.",
    "Investing in gold in {location} has never been easier with our cryptocurrency-accepted platform and secure delivery system.",
    "The gold market in {location} is thriving, and we're here to help you invest using Bitcoin, Ethereum, and other cryptocurrencies.",
    "Transform your cryptocurrency holdings into physical gold with our premium delivery service to {location}."
  ],
  bodyBlocks: [
    [
      "Our streamlined process ensures that residents of {location} can easily convert their digital assets into tangible gold investments. We accept major cryptocurrencies including Bitcoin, Ethereum, and USDT, providing flexibility for your investment strategy.",
      "With strategic distribution centers in Dubai and Cairo, we guarantee efficient delivery to {location}. Our team understands the unique requirements of gold investors in {location} and provides personalized service to ensure complete satisfaction."
    ],
    [
      "The demand for gold investments in {location} continues to grow as investors seek to diversify their portfolios with precious metals. Our cryptocurrency payment system makes it simple to acquire gold bars, coins, and jewelry from anywhere in {location}.",
      "We pride ourselves on transparency and security. Every transaction is encrypted and tracked, giving {location} investors peace of mind when purchasing gold with cryptocurrency."
    ],
    [
      "For investors in {location}, timing is crucial in the gold market. Our platform enables instant cryptocurrency transactions, ensuring you never miss an opportunity to invest in gold at optimal prices.",
      "Our expertise in both cryptocurrency and precious metals makes us the ideal partner for {location} residents looking to bridge these two investment worlds."
    ]
  ],
  microSections: [
    "Local market insights show that {location} investors increasingly prefer cryptocurrency for gold purchases due to speed and security.",
    "The regulatory environment in {location} supports cryptocurrency transactions, making gold investments more accessible than ever.",
    "Recent trends indicate that {location} is becoming a hub for crypto-to-gold conversions, with investors showing strong confidence in precious metals."
  ],
  conclusion: [
    "Join the growing number of savvy investors in {location} who have discovered the benefits of combining cryptocurrency with gold investments.",
    "Take the first step towards securing your financial future with gold investments in {location}, powered by cryptocurrency technology.",
    "The future of investing is here, and {location} residents are leading the way with crypto-powered gold acquisitions."
  ],
  trustPoints: [
    "Strategic Dubai & Cairo distribution centers ensuring fast delivery to {location}",
    "Competitive pricing with transparent cryptocurrency payment processing",
    "Secure encrypted transactions with full tracking and verification",
    "Expert team specializing in both cryptocurrency and precious metals markets"
  ]
}

export function generateContentVariation(location: string, isCity: boolean = false): ContentVariation {
  // Simple hash function for browser compatibility
  let hash = 0
  for (let i = 0; i < location.length; i++) {
    const char = location.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  const seed = Math.abs(hash)
  
  // Select variations based on hash for deterministic but varied content
  const introIndex = seed % contentVariations.intro.length
  const bodyBlockIndex = (seed >> 4) % contentVariations.bodyBlocks.length
  const microSectionIndex = (seed >> 8) % contentVariations.microSections.length
  const conclusionIndex = (seed >> 12) % contentVariations.conclusion.length
  
  const variation: ContentVariation = {
    intro: [contentVariations.intro[introIndex]],
    bodyBlocks: contentVariations.bodyBlocks[bodyBlockIndex],
    microSections: [contentVariations.microSections[microSectionIndex]],
    conclusion: [contentVariations.conclusion[conclusionIndex]],
    trustPoints: contentVariations.trustPoints
  }
  
  // Add city-specific content if this is a city page
  if (isCity) {
    variation.citySpecific = generateCitySpecificContent(location, seed)
  }
  
  return variation
}

function generateCitySpecificContent(city: string, seed: number) {
  const cityContent = {
    demand: [
      `The gold demand in ${city} reflects its status as a major economic center, with investors seeking portfolio diversification through precious metals.`,
      `${city}'s sophisticated investor base has shown increasing interest in gold as a hedge against market volatility and inflation.`,
      `Recent market analysis indicates that ${city} residents are allocating more capital to gold investments, recognizing its long-term value preservation.`
    ],
    buyers: [
      `Typical gold buyers in ${city} include tech professionals, business owners, and high-net-worth individuals who understand the value of precious metals.`,
      `The investment community in ${city} consists largely of forward-thinking individuals who embrace both cryptocurrency and traditional assets.`,
      `${city} attracts a diverse range of gold investors, from young professionals building wealth to experienced investors preserving capital.`
    ],
    cryptoPreference: [
      `Cryptocurrency is preferred in ${city} for gold purchases due to its speed, security, and the tech-savvy nature of the local investment community.`,
      `The digital payment infrastructure in ${city} makes cryptocurrency transactions seamless, particularly for high-value gold purchases.`,
      `Investors in ${city} appreciate the privacy and efficiency that cryptocurrency brings to gold acquisition, avoiding traditional banking delays.`
    ]
  }
  
  const demandIndex = seed % cityContent.demand.length
  const buyersIndex = (seed >> 4) % cityContent.buyers.length
  const cryptoIndex = (seed >> 8) % cityContent.cryptoPreference.length
  
  return {
    demand: [cityContent.demand[demandIndex]],
    buyers: [cityContent.buyers[buyersIndex]],
    cryptoPreference: [cityContent.cryptoPreference[cryptoIndex]]
  }
}

export function formatContent(content: ContentVariation, location: string): string {
  let formatted = ''
  
  // Add intro
  content.intro.forEach(paragraph => {
    formatted += paragraph.replace(/{location}/g, location) + '\n\n'
  })
  
  // Add body blocks
  content.bodyBlocks.forEach(block => {
    block.forEach(paragraph => {
      formatted += paragraph.replace(/{location}/g, location) + '\n\n'
    })
  })
  
  // Add micro sections
  content.microSections.forEach(section => {
    formatted += section.replace(/{location}/g, location) + '\n\n'
  })
  
  // Add city-specific content if available
  if (content.citySpecific) {
    formatted += `## Gold Demand in ${location}\n\n`
    content.citySpecific.demand.forEach(paragraph => {
      formatted += paragraph + '\n\n'
    })
    
    formatted += `## Typical Buyers in ${location}\n\n`
    content.citySpecific.buyers.forEach(paragraph => {
      formatted += paragraph + '\n\n'
    })
    
    formatted += `## Why Crypto is Preferred in ${location}\n\n`
    content.citySpecific.cryptoPreference.forEach(paragraph => {
      formatted += paragraph + '\n\n'
    })
  }
  
  // Add conclusion
  content.conclusion.forEach(paragraph => {
    formatted += paragraph.replace(/{location}/g, location) + '\n\n'
  })
  
  return formatted.trim()
}
