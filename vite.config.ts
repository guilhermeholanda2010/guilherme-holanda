/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { identity, isSet, site } from './src/content.ts';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Builds <head> SEO tags from src/content.ts so copy lives in one place. */
function seo(): Plugin {
  const hasUrl = isSet(site.url);
  const abs = (path: string) => (hasUrl ? `${site.url}${path}` : path);
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: identity.name,
    jobTitle: identity.title,
    email: `mailto:${identity.email}`,
    ...(hasUrl && { url: site.url }),
    sameAs: [identity.linkedin, identity.github].filter(isSet),
    address: { '@type': 'PostalAddress', addressLocality: identity.locality, addressCountry: 'BR' },
  };
  const tags = [
    `<title>${escape(site.title)}</title>`,
    `<meta name="description" content="${escape(site.description)}" />`,
    hasUrl && `<link rel="canonical" href="${site.url}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escape(site.title)}" />`,
    `<meta property="og:description" content="${escape(site.description)}" />`,
    hasUrl && `<meta property="og:url" content="${site.url}/" />`,
    `<meta property="og:image" content="${abs(site.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escape(site.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(site.title)}" />`,
    `<meta name="twitter:description" content="${escape(site.description)}" />`,
    `<meta name="twitter:image" content="${abs(site.ogImage)}" />`,
    `<script type="application/ld+json">${JSON.stringify(person)}</script>`,
  ].filter(Boolean);

  return {
    name: 'seo',
    transformIndexHtml: (html) => html.replace('<!-- seo -->', tags.join('\n    ')),
  };
}

/** Preloads the two main font files (latin subset) using their hashed build URLs. */
function preloadFonts(): Plugin {
  const files = ['instrument-sans-latin-wght-normal', 'bricolage-grotesque-latin-wght-normal'];
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (_html, ctx) =>
        Object.values(ctx.bundle ?? {})
          .filter((chunk) => files.some((file) => chunk.fileName.includes(`${file}-`)))
          .map((chunk) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'font',
              type: 'font/woff2',
              href: `/${chunk.fileName}`,
              crossorigin: '',
            },
            injectTo: 'head-prepend' as const,
          })),
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seo(), preloadFonts()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/unit/setup.ts'],
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    css: false,
  },
});
