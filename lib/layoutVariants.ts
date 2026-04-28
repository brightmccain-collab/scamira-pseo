// Browser-compatible hash function

export type LayoutVariant = 'A' | 'B' | 'C' | 'D' | 'E'

export interface LayoutConfig {
  sections: string[]
  ctaPositions: number[]
  trustPosition: number
  internalLinksPosition: number
}

const layoutConfigs: Record<LayoutVariant, LayoutConfig> = {
  A: {
    sections: ['hero', 'trust', 'content', 'internal-links', 'testimonials', 'faq', 'cta'],
    ctaPositions: [0, 3, 6], // hero, after internal-links, final
    trustPosition: 1,
    internalLinksPosition: 3
  },
  B: {
    sections: ['hero', 'content', 'trust', 'testimonials', 'internal-links', 'faq', 'cta'],
    ctaPositions: [0, 4, 6], // hero, after internal-links, final
    trustPosition: 2,
    internalLinksPosition: 4
  },
  C: {
    sections: ['hero', 'internal-links', 'content', 'trust', 'faq', 'testimonials', 'cta'],
    ctaPositions: [0, 2, 6], // hero, mid-content, final
    trustPosition: 3,
    internalLinksPosition: 1
  },
  D: {
    sections: ['hero', 'testimonials', 'trust', 'content', 'internal-links', 'faq', 'cta'],
    ctaPositions: [0, 4, 6], // hero, after internal-links, final
    trustPosition: 2,
    internalLinksPosition: 4
  },
  E: {
    sections: ['hero', 'content', 'internal-links', 'trust', 'testimonials', 'faq', 'cta'],
    ctaPositions: [0, 3, 6], // hero, after trust, final
    trustPosition: 3,
    internalLinksPosition: 2
  }
}

export function getLayoutVariant(slug: string): LayoutVariant {
  // Stronger hash function for better distribution
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash // Convert to 32-bit integer
  }
  
  const index = Math.abs(hash) % 5
  const variants: LayoutVariant[] = ['A', 'B', 'C', 'D', 'E']
  return variants[index]
}

export function getLayoutConfig(variant: LayoutVariant): LayoutConfig {
  return layoutConfigs[variant]
}

export function shouldShowSection(section: string, variant: LayoutVariant): boolean {
  const config = getLayoutConfig(variant)
  return config.sections.indexOf(section) !== -1
}

export function getSectionPosition(section: string, variant: LayoutVariant): number {
  const config = getLayoutConfig(variant)
  return config.sections.indexOf(section)
}
