'use cl`ient'

import Link from 'next/link'
import { trackWhatsAppClick, trackCTAClick, getWhatsAppUrl, getWhatsAppMessage } from '@/lib/analytics'

// Safe hash function
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return Math.abs(hash);
}

interface CTAButtonProps {
  variant: 'primary' | 'whatsapp'
  href?: string
  children: React.ReactNode
  className?: string
  location?: string
  country?: string
  ctaPosition?: string
  urgency?: boolean
}

export function getCTAText(seed: string, position: string, urgency: boolean = false): string {
  // Position-specific text pools with urgency options
  const positionTexts = {
    top: urgency ? [
      " URGENT: Gold prices rising - Message NOW!",
      " LOCK IN TODAY'S RATE - WhatsApp us!",
      " LIMITED TIME: Secure gold before price hike",
      " ACT FAST: Best rates available today",
      " DON'T WAIT: Gold prices climbing - Message now"
    ] : [
      "Message us on WhatsApp for today's gold price",
      "Start your gold order now", 
      "Chat with a gold advisor instantly",
      "Get current gold rates via WhatsApp",
      "Secure your gold investment today"
    ],
    mid: urgency ? [
      " TIME SENSITIVE: Get personalized quote NOW",
      " URGENT CONSULTATION: Lock in current rates",
      " ACT NOW: Expert advice before price changes",
      " LIMITED SLOTS: Book consultation today",
      " IMMEDIATE HELP: Gold expert standing by"
    ] : [
      "Request a personalized gold consultation",
      "Compare gold prices from trusted dealers",
      "Get expert advice on gold investments",
      "Learn about current market trends",
      "Discover the best gold buying options"
    ],
    bottom: urgency ? [
      " FINAL CALL: Invest before price increases",
      " LAST CHANCE: Secure gold at today's rates",
      " URGENT: Start investment immediately",
      " ACT NOW: Don't miss current opportunity",
      " IMMEDIATE ACTION: Begin gold journey today"
    ] : [
      "Ready to invest in gold? Contact us today",
      "Start your gold investment journey now",
      "Get started with gold purchasing",
      "Begin your gold investment today",
      "Take the first step towards gold ownership"
    ]
  }

  const texts = positionTexts[position as keyof typeof positionTexts] || positionTexts.top
  
  // Fixed hash calculation
  const combinedSeed = seed + '-' + position + (urgency ? '-urgent' : '');
  const index = hashString(combinedSeed) % texts.length;
  return texts[index];
}

export function CTAButton({ variant, href, children, className = '', location, country, ctaPosition, urgency }: CTAButtonProps) {
  const baseClasses = variant === 'primary' 
    ? 'btn btn-primary' 
    : 'btn btn-whatsapp'
  
  const handleClick = () => {
    // Track CTA click
    if (ctaPosition && location && country) {
      trackCTAClick(variant, location, country)
    }
    
    // Track WhatsApp click specifically
    if (variant === 'whatsapp' && location && country && ctaPosition) {
      trackWhatsAppClick(location, country, ctaPosition)
    }
  }
  
  // Generate WhatsApp URL with tracking if it's a WhatsApp button
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2819063800'
  const finalHref = variant === 'whatsapp' && location && country 
    ? getWhatsAppUrl(whatsappNumber, getWhatsAppMessage(location || '', country || '', urgency || false), location, country, ctaPosition || 'unknown')
    : href || '#'
  
  return (
    <Link 
      href={finalHref} 
      className={`${baseClasses} ${className}`}
      onClick={handleClick}
      target={variant === 'whatsapp' ? '_blank' : '_self'}
      rel={variant === 'whatsapp' ? 'noopener noreferrer' : ''}
    >
      {children}
    </Link>
  )
}
