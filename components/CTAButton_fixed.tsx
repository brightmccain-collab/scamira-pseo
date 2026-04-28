'use client'

import Link from 'next/link'

// Safe hash function
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return Math.abs(hash);
}

export function getCTAText(seed: string, position: string): string {
  // Position-specific text pools to ensure uniqueness
  const positionTexts = {
    top: [
      "Message us on WhatsApp for today's gold price",
      "Start your gold order now", 
      "Chat with a gold advisor instantly",
      "Get current gold rates via WhatsApp",
      "Secure your gold investment today"
    ],
    mid: [
      "Request a personalized gold consultation",
      "Compare gold prices from trusted dealers",
      "Get expert advice on gold investments",
      "Learn about current market trends",
      "Discover the best gold buying options"
    ],
    bottom: [
      "Ready to invest in gold? Contact us today",
      "Start your gold investment journey now",
      "Get started with gold purchasing",
      "Begin your gold investment today",
      "Take the first step towards gold ownership"
    ]
  }

  const texts = positionTexts[position as keyof typeof positionTexts] || positionTexts.top
  
  // Fixed hash calculation
  const combinedSeed = seed + '-' + position;
  const index = hashString(combinedSeed) % texts.length;
  return texts[index];
}

interface CTAButtonProps {
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'whatsapp'
  className?: string
}

export function CTAButton({ 
  href = '/buy-gold-in', 
  children, 
  variant = 'primary',
  className = '' 
}: CTAButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200'
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
    whatsapp: 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl'
  }
  
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2819063800'
  const whatsappHref = variant === 'whatsapp' 
    ? `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}` 
    : href

  return (
    <Link 
      href={whatsappHref}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      target={variant === 'whatsapp' ? '_blank' : '_self'}
      rel={variant === 'whatsapp' ? 'noopener noreferrer' : ''}
    >
      {children}
    </Link>
  )
}
