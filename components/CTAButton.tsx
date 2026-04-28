import Link from 'next/link'

interface CTAButtonProps {
  variant: 'primary' | 'whatsapp'
  href: string
  children: React.ReactNode
  className?: string
}

export function getCTAText(seed: string, position: string): string {
  const texts = [
    "Message us on WhatsApp for today's gold price",
    "Start your gold order now", 
    "Chat with a gold advisor instantly",
    "Get current gold rates via WhatsApp",
    "Secure your gold investment today"
  ]

  let hash = 0
  const combinedSeed = seed + position
  for (let i = 0; i < combinedSeed.length; i++) {
    hash = combinedSeed.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  
  return texts[Math.abs(hash) % texts.length]
}

export function CTAButton({ variant, href, children, className = '' }: CTAButtonProps) {
  const baseClasses = variant === 'primary' 
    ? 'btn btn-primary' 
    : 'btn btn-whatsapp'
  
  return (
    <Link href={href} className={`${baseClasses} ${className}`}>
      {children}
    </Link>
  )
}
