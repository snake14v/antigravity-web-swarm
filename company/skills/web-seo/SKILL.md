# SEO Optimization - Ooru Logix

Website-specific SEO strategy for oorulogix.com, a React 19 SPA. Addresses hash routing limitations, structured data implementation, Core Web Vitals, and content optimization across 21 pages.

**Tech Stack:** React 19 + Vite 6.2 + HashRouter + TailwindCSS 4 (CDN) + Firebase

---

## 1. Hash Routing SEO Challenge

### 1.1 Problem Statement

Current implementation uses `HashRouter` from react-router-dom:

```typescript
// Current problematic approach
<BrowserRouter>
  <HashRouter>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  </HashRouter>
</BrowserRouter>

// Results in URLs like:
// /#/dashboard
// /#/pricing
```

**SEO Impact:**
- Search engines see single page: `/#/`
- Hash fragments not crawled by default
- Social media shares show base URL only
- No page-specific meta tags
- Duplicate content across "pages"
- Poor keyword targeting
- No internal linking benefits

### 1.2 Mitigation Strategies (Short-term)

#### Strategy 1: Hash Bang URLs

```typescript
// Configure HashRouter for hashbang URLs
<HashRouter hashType="hashbang">
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</HashRouter>

// URLs become: #!/dashboard
// Google crawls with _escaped_fragment_: ?_escaped_fragment_=/dashboard

// Issue: Deprecated by Google (2015), not recommended
```

#### Strategy 2: JavaScript Framework Detection

```typescript
// In robots.txt
User-agent: *
Allow: /
Allow: /#/

# Tell search engines JavaScript required
# Create XML sitemap with all routes
Sitemap: https://oorulogix.com/sitemap.xml
```

#### Strategy 3: Meta Tag Strategy

```typescript
// src/components/SEO.tsx - Aggressive meta tagging
interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  article?: boolean;
  author?: string;
  keywords?: string[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  keywords,
}) => {
  const fullUrl = `https://oorulogix.com${url}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title} | Ooru Logix</title>
      <meta name="title" content={`${title} | Ooru Logix`} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords?.join(', ') || ''} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0B2648" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={`${title} | Ooru Logix`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || 'https://oorulogix.com/og-default.png'} />
      <meta property="og:site_name" content="Ooru Logix" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={`${title} | Ooru Logix`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || 'https://oorulogix.com/twitter-default.png'} />
      <meta name="twitter:creator" content="@oorulogix" />

      {/* Canonical (prevent duplicate content) */}
      <link rel="canonical" href={fullUrl} />

      {/* Preconnect to external services */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://firebaseapp.com" />
    </Helmet>
  );
};
```

### 1.3 Long-term Solution: SSG/SSR Migration

**Recommended Path: Vite SSG (Static Site Generation)**

```typescript
// vite-plugin-ssr configuration
// Generates pre-rendered HTML for all routes

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ssr from 'vite-plugin-ssr/plugin';

export default defineConfig({
  plugins: [react(), ssr({ prerender: true })],
  ssr: {
    // Configure SSR
    external: ['firebase'],
  },
});

// Benefits:
// - Real URLs: /dashboard, /pricing (no hash)
// - Pre-rendered HTML: Fast initial load
// - SEO friendly: Search engines crawl normally
// - Meta tags per page: Proper OG tags
// - No JavaScript required for content
```

**Alternative: Next.js Migration**

```typescript
// pages/index.tsx
export default function Home() {
  return <HomePage />;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600, // ISR: Revalidate hourly
  };
};

// Benefits:
// - Full framework for SSR/SSG
// - Automatic code splitting
// - Built-in SEO optimizations
// - Image optimization
// - API routes
```

**Migration Timeline:**
1. **Phase 1 (Immediate):** Implement aggressive meta tagging + sitemap
2. **Phase 2 (3 months):** Evaluate Vite SSG or Next.js
3. **Phase 3 (6 months):** Migrate to SSG/SSR with real URLs

---

## 2. Structured Data Implementation

### 2.1 JSON-LD Templates

All structured data uses JSON-LD format in document head:

```typescript
// src/components/StructuredData.tsx

interface StructuredDataProps {
  type: 'Organization' | 'BreadcrumbList' | 'Product' | 'Article' | 'FAQSchema';
  data: Record<string, any>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const jsonLd = buildSchema(type, data);

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

function buildSchema(type: string, data: Record<string, any>) {
  const baseContext = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseContext,
        name: 'Ooru Logix',
        url: 'https://oorulogix.com',
        logo: 'https://oorulogix.com/logo.png',
        description: 'Cyber-industrial AI platform',
        sameAs: [
          'https://twitter.com/oorulogix',
          'https://linkedin.com/company/oorulogix',
          'https://github.com/oorulogix',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Sales',
          email: 'sales@oorulogix.com',
        },
      };

    case 'BreadcrumbList':
      return {
        ...baseContext,
        itemListElement: data.items.map((item: any, idx: number) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: item.name,
          item: `https://oorulogix.com${item.url}`,
        })),
      };

    case 'Product':
      return {
        ...baseContext,
        name: data.name,
        description: data.description,
        image: data.image,
        brand: {
          '@type': 'Brand',
          name: 'Ooru Logix',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: data.price?.min || 0,
          highPrice: data.price?.max || 0,
        },
        aggregateRating: data.rating ? {
          '@type': 'AggregateRating',
          ratingValue: data.rating.value,
          ratingCount: data.rating.count,
        } : undefined,
      };

    case 'Article':
      return {
        ...baseContext,
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.publishedDate,
        dateModified: data.modifiedDate,
        author: {
          '@type': 'Person',
          name: data.author,
        },
      };

    case 'FAQSchema':
      return {
        ...baseContext,
        mainEntity: data.items.map((item: any) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };

    default:
      return baseContext;
  }
}
```

### 2.2 Schema.org Validation

```bash
# Validate structured data
# Use Google's Rich Results Test: https://search.google.com/test/rich-results

# Validation checklist:
# - No errors
# - No warnings
# - Expected richness (knowledge panel, carousel, etc.)
# - All required properties present
# - No deprecated properties
```

---

## 3. Core Web Vitals Optimization

### 3.1 LCP (Largest Contentful Paint) < 2.5s

```typescript
// 1. Preload critical resources
// In index.html <head>
<link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
<link rel="preload" href="/hero-image-lg.webp" as="image" type="image/webp" />

// 2. Lazy load below-fold images
<img
  src={src}
  alt={alt}
  loading="lazy"
  srcSet="..."
/>

// 3. Prioritize above-fold content
// Load hero/header JavaScript before sidebar/footer

// 4. Minimize render-blocking resources
// Defer non-critical CSS
<link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="/styles.css" /></noscript>

// 5. Use productive server response times
// Ensure Firebase cold start < 500ms
```

### 3.2 FID (First Input Delay) < 100ms

```typescript
// 1. Break up long tasks
// React: Use startTransition for non-urgent updates
import { startTransition } from 'react';

const handleSort = (sortBy: string) => {
  startTransition(() => {
    setSorted(items.sort((a, b) => compareFn(a, b, sortBy)));
  });
};

// 2. Defer analytics/tracking
// Load GA4 after interaction, not on page load
useEffect(() => {
  const timer = setTimeout(() => {
    import('path/to/analytics');
  }, 5000);

  return () => clearTimeout(timer);
}, []);

// 3. Use Web Workers for heavy computation
// src/workers/data-processing.ts
self.onmessage = (event: MessageEvent<any[]>) => {
  const sorted = event.data.sort();
  self.postMessage(sorted);
};

// src/pages/DataPage.tsx
const worker = new Worker(new URL('../workers/data-processing.ts', import.meta.url), {
  type: 'module',
});

worker.postMessage(hugeArray);
worker.onmessage = (event) => {
  setSortedData(event.data);
};
```

### 3.3 CLS (Cumulative Layout Shift) < 0.1

```typescript
// 1. Reserve space for dynamic content
<div style={{ minHeight: '200px' }}>
  {/* Image loads here, but space already reserved */}
  <img src={src} alt={alt} width="800" height="600" loading="lazy" />
</div>

// 2. Avoid inserting content above fold
// Don't do: <InAds> followed by <Content>
// Better: <Content> followed by <InAds> (if needed)

// 3. Use transform for animations, not layout changes
// Bad:
.animate { margin-left: 10px; transition: margin 0.3s; }

// Good:
.animate { transform: translateX(10px); transition: transform 0.3s; }

// 4. Set explicit dimensions for images/videos
<img width="800" height="600" src={src} alt={alt} />

// 5. Avoid font-family changes
// Load all fonts upfront, set font-display: swap

// 6. Use stable IDs for dynamic lists
{items.map((item) => (
  <div key={item.id}>{item.name}</div> // Good
))}

// Not: {items.map((item, idx) => (
//   <div key={idx}>{item.name}</div>  // Bad - key changes if order changes
// ))}
```

---

## 4. Internal Linking Strategy

### 4.1 Navigation Hierarchy

```
Home (/)
├── Product
│   ├── Dashboard (/dashboard)
│   ├── Features (/features)
│   └── Pricing (/pricing)
├── Company
│   ├── About (/about)
│   ├── Blog (/blog)
│   └── Careers (/careers)
├── Developers
│   ├── Docs (/docs)
│   ├── API Reference (/api-docs)
│   └── Examples (/examples)
└── Legal
    ├── Privacy Policy (/privacy)
    ├── Terms of Service (/terms)
    └── Cookie Policy (/cookies)
```

### 4.2 Internal Link Implementation

```typescript
// Strong internal linking patterns
export const internalLinks = [
  {
    from: '/',
    to: '/pricing',
    anchor: 'Pricing',
    context: 'Hero CTA',
  },
  {
    from: '/',
    to: '/dashboard',
    anchor: 'Get Started',
    context: 'Navigation',
  },
  {
    from: '/pricing',
    to: '/features',
    anchor: 'Learn more about features',
    context: 'Educational link',
  },
  {
    from: '/blog',
    to: '/docs',
    anchor: 'Official documentation',
    context: 'Related resource',
  },
];

// Implementation in components
<Link to="/pricing" className="text-cyan hover:underline">
  See our pricing
</Link>

// Breadcrumbs
<nav aria-label="breadcrumb">
  <ol className="flex gap-2">
    <li><Link to="/">Home</Link></li>
    <li>/</li>
    <li><Link to="/docs">Documentation</Link></li>
    <li>/</li>
    <li>Getting Started</li>
  </ol>
</nav>
```

---

## 5. Open Graph & Twitter Card Optimization

### 5.1 Page-Specific Meta Tags

```typescript
// src/pages/PricingPage.tsx
import { SEO } from '@/components/SEO';

export const PricingPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Pricing"
        description="Simple, transparent pricing for all team sizes"
        image="/og-pricing.png"
        url="/pricing"
        keywords={['pricing', 'plans', 'subscription', 'cost']}
      />
      {/* Page content */}
    </>
  );
};
```

### 5.2 OG Image Specifications

```markdown
## Open Graph Image Guidelines

**File Format:** PNG or JPEG
**Dimensions:** 1200 × 630 pixels (16:9 aspect ratio)
**Size:** < 5MB
**Safe Zone:** Don't place text/logos within 20px of edges

### Per-Page OG Images:
- Home: /og-home.png (branded, hero-focused)
- Pricing: /og-pricing.png (with pricing tiers)
- Product: /og-product.png (feature showcase)
- Blog: /og-blog.png (template with article headline)
- Generic: /og-default.png (fallback)

### Dynamic OG Generation (Advanced):
Use https://vercel.com/docs/concepts/functions/edge-functions
for real-time OG image generation per blog post
```

---

## 6. XML Sitemap Strategy

### 6.1 Static Sitemap

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">

  <!-- Home -->
  <url>
    <loc>https://oorulogix.com/</loc>
    <lastmod>2026-04-01T00:00:00Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Product Pages -->
  <url>
    <loc>https://oorulogix.com/#/dashboard</loc>
    <lastmod>2026-04-01T00:00:00Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://oorulogix.com/#/pricing</loc>
    <lastmod>2026-04-01T00:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Content Pages -->
  <url>
    <loc>https://oorulogix.com/#/about</loc>
    <lastmod>2026-04-01T00:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://oorulogix.com/#/blog</loc>
    <lastmod>2026-04-01T00:00:00Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Images in sitemap (if using sitemaps for index) -->
  <url>
    <loc>https://oorulogix.com/#/features</loc>
    <lastmod>2026-04-01T00:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>https://oorulogix.com/feature-1.webp</image:loc>
      <image:title>Feature 1</image:title>
    </image:image>
  </url>

</urlset>
```

### 6.2 Dynamic Sitemap

```typescript
// vite-plugin or Vite config hook
export async function generateSitemap() {
  const routes = [
    '/',
    '/dashboard',
    '/pricing',
    '/features',
    '/about',
    '/blog',
    '/docs',
    // ... etc
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>https://oorulogix.com/#${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>`;

  return sitemap;
}
```

---

## 7. robots.txt Configuration

```
# public/robots.txt
User-agent: *
Allow: /
Allow: /#/

# Explicit paths for JavaScript SPAs
Allow: /#/dashboard
Allow: /#/pricing
Allow: /#/features
Allow: /#/about
Allow: /#/blog
Allow: /#/docs

# Disallow sensitive areas
Disallow: /admin/
Disallow: /private/

# Sitemaps
Sitemap: https://oorulogix.com/sitemap.xml
Sitemap: https://oorulogix.com/sitemap-pages.xml

# Crawl delay (optional, for large sites)
Crawl-delay: 1

# Specific bot rules
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1
```

---

## 8. Google Search Console Setup

### 8.1 Verification

```typescript
// Option 1: HTML tag (in <head>)
<meta name="google-site-verification" content="..." />

// Option 2: DNS CNAME record
// Add DNS record: _googlebf.oorulogix.com

// Option 3: Google Analytics property
// Connect existing GA4 account
```

### 8.2 Monitoring Checklist

```markdown
## GSC Monitoring

- [ ] Submit sitemap.xml
- [ ] Monitor indexing status
- [ ] Check for crawl errors
- [ ] Review Core Web Vitals
- [ ] Monitor search performance
  - Impressions
  - Clicks
  - CTR
  - Average position
- [ ] Check mobile usability
- [ ] Review top queries
- [ ] Monitor backlinks
- [ ] Set up alerts for issues
```

### 8.3 Search Performance Dashboard

```typescript
interface SearchMetrics {
  queries: Array<{
    query: string;
    impressions: number;
    clicks: number;
    ctr: number;
    position: number;
  }>;
  pageMetrics: Array<{
    page: string;
    impressions: number;
    clicks: number;
    ctr: number;
    position: number;
  }>;
  deviceBreakdown: {
    mobile: { impressions: number; clicks: number; ctr: number };
    desktop: { impressions: number; clicks: number; ctr: number };
    tablet: { impressions: number; clicks: number; ctr: number };
  };
}

// Track in Google Sheets or Data Studio
// Update weekly from GSC API
```

---

## 9. Keyword Strategy

### 9.1 Target Keywords Per Page

```typescript
const keywordStrategy = {
  '/': {
    primary: 'AI platform',
    secondary: ['automation', 'swarm agents', 'cyber-industrial'],
  },
  '/dashboard': {
    primary: 'AI dashboard',
    secondary: ['real-time monitoring', 'agent control'],
  },
  '/pricing': {
    primary: 'AI pricing',
    secondary: ['plans', 'subscription', 'enterprise'],
  },
  '/features': {
    primary: 'AI features',
    secondary: ['swarm intelligence', 'real-time processing'],
  },
  '/docs': {
    primary: 'AI documentation',
    secondary: ['API reference', 'getting started', 'integration'],
  },
  '/blog': {
    primary: 'AI insights',
    secondary: ['swarm intelligence', 'automation trends'],
  },
};

// Implementation: Include keywords in
// - Page title
// - Meta description
// - H1 and H2 headings
// - First 100 words
// - Image alt text
// - Internal link anchor text
```

### 9.2 Keyword Research Tools

```markdown
## Recommended Tools

- **Ahrefs:** Keyword explorer, competitor analysis
- **SEMrush:** Keyword gap analysis, rank tracking
- **Google Keyword Planner:** Volume estimates
- **Google Search Console:** Real search queries
- **Ubersuggest:** Keyword ideas and difficulty
- **Moz Keyword Explorer:** Keyword difficulty

## Monthly Tasks

1. [ ] Review GSC search queries
2. [ ] Check competitor keywords
3. [ ] Update target keywords
4. [ ] Monitor ranking positions
5. [ ] Identify new keyword opportunities
```

---

## 10. Analytics & GA4 Implementation

### 10.1 GA4 Setup

```typescript
// public/index.html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'anonymize_ip': true,
    'allow_google_signals': true,
    'allow_ad_personalization_signals': true
  });
</script>

// Or use React component
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: Function;
  }
}

export const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.hash,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};
```

### 10.2 Event Tracking

```typescript
// Key events to track
const events = {
  // User interactions
  'sign_up': { category: 'engagement', action: 'user_signup' },
  'sign_in': { category: 'engagement', action: 'user_login' },
  'sign_out': { category: 'engagement', action: 'user_logout' },

  // Product interactions
  'view_pricing': { category: 'product', action: 'view_pricing_page' },
  'click_pricing_cta': { category: 'product', action: 'click_pricing_button' },
  'start_trial': { category: 'conversion', action: 'trial_start' },
  'subscribe': { category: 'conversion', action: 'purchase' },

  // Feature usage
  'dashboard_load': { category: 'feature', action: 'dashboard_access' },
  'run_analysis': { category: 'feature', action: 'analysis_run' },
  'export_data': { category: 'feature', action: 'data_export' },

  // Error tracking
  'api_error': { category: 'error', action: 'api_call_failed' },
  'auth_error': { category: 'error', action: 'auth_failed' },

  // Engagement
  'read_article': { category: 'content', action: 'blog_read' },
  'download_resource': { category: 'content', action: 'resource_download' },
  'contact_form_submit': { category: 'engagement', action: 'contact_submit' },
};

// Implementation
window.gtag?.('event', 'subscribe', {
  value: planPrice,
  currency: 'USD',
  tier: planName,
});
```

### 10.3 Funnel Analysis

```typescript
// Track conversion funnel
const conversionFunnel = [
  { step: 1, event: 'page_view', page: '/' },
  { step: 2, event: 'scroll', threshold: '50%' },
  { step: 3, event: 'click', target: 'get_started_button' },
  { step: 4, event: 'page_view', page: '/pricing' },
  { step: 5, event: 'click', target: 'pricing_cta' },
  { step: 6, event: 'page_view', page: '/checkout' },
  { step: 7, event: 'purchase' },
];

// In GA4: Create Funnel report with these steps
```

---

## 11. SEO Checklist for New Pages

Before publishing any new page:

```markdown
## Pre-Launch SEO Checklist

### Meta Tags
- [ ] Unique, descriptive title (50-60 chars)
- [ ] Unique, engaging meta description (120-160 chars)
- [ ] Target keyword in title
- [ ] Target keyword in description
- [ ] Target keyword in first 100 words
- [ ] Canonical URL set (if applicable)
- [ ] OG image (1200x630px)
- [ ] Twitter card image
- [ ] Language attribute on <html>

### Content
- [ ] H1 tag (only one, descriptive)
- [ ] H2/H3 tags (proper hierarchy)
- [ ] Target keyword mentions (natural)
- [ ] Internal links (3-5 relevant links)
- [ ] External links to authoritative sources
- [ ] Image alt text (descriptive)
- [ ] Minimum 300 words (for content pages)

### Technical
- [ ] Mobile responsive
- [ ] Lighthouse score > 90
- [ ] No crawl errors
- [ ] Links working
- [ ] Images optimized (WebP, < 100KB)
- [ ] No duplicate content
- [ ] Page has unique value

### Structured Data
- [ ] Appropriate schema added
- [ ] Schema validation passes
- [ ] Rich snippet eligible
- [ ] JSON-LD format

### Links
- [ ] Added to sitemap.xml
- [ ] Added to robots.txt (if needed)
- [ ] Internal links updated
- [ ] Breadcrumbs working
- [ ] Navigation includes new page

### Analytics
- [ ] GA4 event tracking setup
- [ ] Conversion goals defined
- [ ] Goal tracking working
- [ ] Funnels configured

### Monitoring
- [ ] GSC indexed
- [ ] Search Console monitoring enabled
- [ ] Initial ranking check (1-2 weeks)
- [ ] Monitor bounce rate
- [ ] Monitor time on page
```

---

## 12. Monthly SEO Audit Checklist

```markdown
## Monthly SEO Review

### Rankings
- [ ] Check top 5 target keywords
- [ ] Monitor rank movements
- [ ] Identify new ranking keywords
- [ ] Check competitor rankings

### Traffic
- [ ] Review organic traffic trend
- [ ] Check bounce rate by page
- [ ] Monitor top landing pages
- [ ] Track goal conversions

### Indexing
- [ ] Check Google Index coverage
- [ ] Resolve any crawl errors
- [ ] Verify new pages indexed
- [ ] Check for manual actions

### Backlinks
- [ ] Monitor new backlinks
- [ ] Check backlink quality
- [ ] Identify lost backlinks
- [ ] Monitor competitor backlinks

### Content
- [ ] Update outdated content
- [ ] Refresh high-performing pages
- [ ] Fix thin content issues
- [ ] Update internal links

### Technical
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify SSL certificate
- [ ] Check page speed trends
- [ ] Monitor crawlability

### Recommendations
- [ ] Document insights
- [ ] Prioritize improvements
- [ ] Plan next month's work
- [ ] Share report with team
```

---

## 13. Quick Reference

```bash
# SEO Validation Commands
npm run audit:seo        # Run SEO audit
npm run lighthouse       # Performance & SEO audit
npm run build:sitemap    # Generate sitemap

# Tools
# - Google Search Console: https://search.google.com/search-console
# - Google PageSpeed Insights: https://pagespeed.web.dev
# - Rich Results Test: https://search.google.com/test/rich-results
# - Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
# - Schema Validator: https://validator.schema.org
```

---

## Related Skills

- **web-architect:** Technical implementation, component specs
- **web-qa:** Performance testing, accessibility audit

