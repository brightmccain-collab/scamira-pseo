'use client'

import Link from 'next/link'
import { trackWhatsAppClick, trackCTAClick, getWhatsAppUrl, getWhatsAppMessage } from '@/lib/analytics'
import { getCTAText } from '@/lib/ctaText'

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
