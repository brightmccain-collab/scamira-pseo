// Google Analytics 4 and tracking utilities

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
    dataLayer: any[]
  }
}

// Initialize GA4
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track WhatsApp clicks
export const trackWhatsAppClick = (location: string, country: string, ctaPosition: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: `${location}-${country}`,
      custom_parameter: {
        cta_position: ctaPosition,
        location: location,
        country: country,
        timestamp: new Date().toISOString()
      }
    })
  }
}

// Track CTA clicks
export const trackCTAClick = (ctaType: string, location: string, country: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'conversion',
      event_label: `${ctaType}-${location}`,
      custom_parameter: {
        cta_type: ctaType,
        location: location,
        country: country,
        timestamp: new Date().toISOString()
      }
    })
  }
}

// Track page engagement
export const trackPageEngagement = (location: string, country: string, timeOnPage: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_engagement', {
      event_category: 'engagement',
      event_label: `${location}-${country}`,
      custom_parameter: {
        location: location,
        country: country,
        time_on_page: timeOnPage,
        timestamp: new Date().toISOString()
      }
    })
  }
}

// Track conversion funnel steps
export const trackFunnelStep = (step: string, location: string, country: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'funnel_step', {
      event_category: 'conversion',
      event_label: step,
      custom_parameter: {
        funnel_step: step,
        location: location,
        country: country,
        timestamp: new Date().toISOString()
      }
    })
  }
}

// Generate WhatsApp URL with tracking
export const getWhatsAppUrl = (phone: string, message: string, location: string, country: string, ctaPosition: string) => {
  const cleanPhone = phone.replace(/[^\d]/g, '')
  const encodedMessage = encodeURIComponent(message)
  const utmParams = `utm_source=whatsapp&utm_medium=click&utm_campaign=gold_inquiry&utm_content=${ctaPosition}&utm_term=${location}_${country}`
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}&${utmParams}`
}

// Conversion funnel steps
export const FUNNEL_STEPS = {
  LANDING: 'landing_page_view',
  CTA_VIEW: 'cta_view',
  CTA_CLICK: 'cta_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  MESSAGE_SENT: 'message_sent',
  CONVERSION: 'conversion'
} as const

// Enhanced WhatsApp message templates
export const getWhatsAppMessage = (location: string, country: string, urgency: boolean = false) => {
  const baseMessage = `Hi! I'm interested in buying gold in ${location}, ${country} with cryptocurrency.`
  const urgencyMessage = urgency ? ` I need to act fast - can you help me secure gold at current rates?` : ` What are your current rates and delivery options?`
  
  return baseMessage + urgencyMessage
}

// Country-specific trust messages
export const getTrustMessage = (country: string) => {
  const trustMessages: Record<string, string> = {
    'united-states': '✅ Trusted by 10,000+ US investors | 🏦 FDIC-insured transactions | 📞 24/7 US-based support',
    'canada': '✅ Fully licensed Canadian dealer | 🏦 Bank-level security | 📞 Canadian customer service',
    'united-kingdom': '✅ FCA-regulated | 🏦 UK-based operations | 📞 London support team',
    'germany': '✅ BaFin-compliant | 🏦 German banking standards | 📞 German-speaking support',
    'nigeria': '✅ Local Nigerian presence | 🏦 Secure payment methods | 📞 Lagos-based team',
    'india': '✅ RBI-compliant operations | 🏦 Indian banking partners | 📞 Mumbai support team'
  }
  
  return trustMessages[country] || '✅ Trusted global dealer | 🏦 Bank-level security | 📞 24/7 support'
}
