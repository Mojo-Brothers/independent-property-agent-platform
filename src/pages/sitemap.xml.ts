import type { APIRoute } from 'astro';
import { DEMO_PROPERTIES } from '../data/mockProperties';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://robbyvioryfansya.pages.dev';

  const staticPages = [
    '',
    '/about',
    '/services',
    '/properties',
    '/developer-partnership',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ];

  const propertyPages = DEMO_PROPERTIES.map((p) => `/properties/${p.slug}`);
  const allUrls = [...staticPages, ...propertyPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>2026-11-19</lastmod>
    <changefreq>${route.startsWith('/properties') ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : route.startsWith('/properties') ? '0.8' : '0.6'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
