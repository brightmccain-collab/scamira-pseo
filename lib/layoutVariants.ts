// Browser-compatible hash function

export type LayoutVariant = 'A' | 'B' | 'C' | 'D' | 'E'

export interface LayoutConfig {
  sections: string[]
  ctaPositions: number[]
  trustPosition: number
  internalLinksPosition: number
}

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return Math.abs(hash);
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
  const variants: LayoutVariant[] = ['A', 'B', 'C', 'D', 'E']
  
  // Use slug hash for deterministic but distributed selection
  const slugHash = hashString(slug)
  const baseIndex = slugHash % 5
  
  // Add variation based on slug length to prevent clustering
  const lengthVariation = (slug.length * 3) % 5
  const firstCharVariation = (slug.charCodeAt(0) * 7) % 5
  const lastCharVariation = (slug.charCodeAt(slug.length - 1) * 11) % 5
  
  // Combine all variations for maximum distribution
  const combinedIndex = (baseIndex + lengthVariation + firstCharVariation + lastCharVariation) % 5
  
  return variants[combinedIndex]
}

export function getLayoutConfig(variant: LayoutVariant, slug: string = ''): LayoutConfig {
  const baseConfig = layoutConfigs[variant]
  
  // Add secondary variation to prevent identical structures
  if (!slug) return baseConfig
  
  // Generate variation seed from slug
  const variationHash = hashString(slug)
  const variationIndex = variationHash % 5
  const sections = [...baseConfig.sections]
  
  // Apply deterministic variations based on layout and variation index
  if (variant === 'A') {
    if (variationIndex === 1) {
      // Swap trust and content
      const trustIdx = sections.indexOf('trust')
      const contentIdx = sections.indexOf('content')
      if (trustIdx !== -1 && contentIdx !== -1) {
        [sections[trustIdx], sections[contentIdx]] = [sections[contentIdx], sections[trustIdx]]
      }
    } else if (variationIndex === 2) {
      // Move internal-links before trust
      const trustIdx = sections.indexOf('trust')
      const internalIdx = sections.indexOf('internal-links')
      if (trustIdx !== -1 && internalIdx !== -1 && internalIdx > trustIdx) {
        sections.splice(internalIdx, 1)
        sections.splice(trustIdx, 0, 'internal-links')
      }
    }
  } else if (variant === 'B') {
    if (variationIndex === 1) {
      // Swap trust and testimonials
      const trustIdx = sections.indexOf('trust')
      const testimonialIdx = sections.indexOf('testimonials')
      if (trustIdx !== -1 && testimonialIdx !== -1) {
        [sections[trustIdx], sections[testimonialIdx]] = [sections[testimonialIdx], sections[trustIdx]]
      }
    } else if (variationIndex === 2) {
      // Move faq before internal-links
      const faqIdx = sections.indexOf('faq')
      const internalIdx = sections.indexOf('internal-links')
      if (faqIdx !== -1 && internalIdx !== -1 && faqIdx > internalIdx) {
        sections.splice(faqIdx, 1)
        sections.splice(internalIdx, 0, 'faq')
      }
    }
  } else if (variant === 'C') {
    if (variationIndex === 1) {
      // Swap content and internal-links positions
      const contentIdx = sections.indexOf('content')
      const internalIdx = sections.indexOf('internal-links')
      if (contentIdx !== -1 && internalIdx !== -1) {
        [sections[contentIdx], sections[internalIdx]] = [sections[internalIdx], sections[contentIdx]]
      }
    } else if (variationIndex === 2) {
      // Move faq before testimonials
      const faqIdx = sections.indexOf('faq')
      const testimonialIdx = sections.indexOf('testimonials')
      if (faqIdx !== -1 && testimonialIdx !== -1 && faqIdx > testimonialIdx) {
        sections.splice(faqIdx, 1)
        sections.splice(testimonialIdx, 0, 'faq')
      }
    }
  } else if (variant === 'D') {
    if (variationIndex === 1) {
      // Swap trust and content
      const trustIdx = sections.indexOf('trust')
      const contentIdx = sections.indexOf('content')
      if (trustIdx !== -1 && contentIdx !== -1) {
        [sections[trustIdx], sections[contentIdx]] = [sections[contentIdx], sections[trustIdx]]
      }
    } else if (variationIndex === 2) {
      // Move testimonials before content
      const testimonialIdx = sections.indexOf('testimonials')
      const contentIdx = sections.indexOf('content')
      if (testimonialIdx !== -1 && contentIdx !== -1 && testimonialIdx < contentIdx) {
        sections.splice(testimonialIdx, 1)
        sections.splice(contentIdx, 0, 'testimonials')
      }
    }
  } else if (variant === 'E') {
    if (variationIndex === 1) {
      // Move testimonials before trust
      const trustIdx = sections.indexOf('trust')
      const testimonialIdx = sections.indexOf('testimonials')
      if (trustIdx !== -1 && testimonialIdx !== -1 && testimonialIdx > trustIdx) {
        sections.splice(testimonialIdx, 1)
        sections.splice(trustIdx, 0, 'testimonials')
      }
    } else if (variationIndex === 2) {
      // Swap internal-links and trust
      const internalIdx = sections.indexOf('internal-links')
      const trustIdx = sections.indexOf('trust')
      if (internalIdx !== -1 && trustIdx !== -1) {
        [sections[internalIdx], sections[trustIdx]] = [sections[trustIdx], sections[internalIdx]]
      }
    }
  }
  
  return {
    ...baseConfig,
    sections
  }
}

export function shouldShowSection(section: string, variant: LayoutVariant): boolean {
  const config = getLayoutConfig(variant)
  return config.sections.indexOf(section) !== -1
}

export function getSectionPosition(section: string, variant: LayoutVariant): number {
  const config = getLayoutConfig(variant)
  return config.sections.indexOf(section)
}
