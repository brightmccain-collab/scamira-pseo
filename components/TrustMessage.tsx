'use client'

import { getTrustMessage } from '@/lib/analytics'

interface TrustMessageProps {
  country: string
  className?: string
}

export default function TrustMessage({ country, className = '' }: TrustMessageProps) {
  const trustMessage = getTrustMessage(country)
  
  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
      <div className="text-sm text-green-800 font-medium whitespace-pre-line">
        {trustMessage}
      </div>
    </div>
  )
}
