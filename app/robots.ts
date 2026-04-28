import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot', 
        disallow: '/',
      },
    ],
    sitemap: 'https://amiraaldhab.online/sitemap.xml',
  }
}
