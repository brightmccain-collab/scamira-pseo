'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { GA_TRACKING_ID, pageview } from '@/lib/analytics'

export default function Analytics() {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }

    // Listen for route changes
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      
      // Initial page view
      pageview(window.location.pathname)
    }
  }, [])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_location: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
