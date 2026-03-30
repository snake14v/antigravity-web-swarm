---
name: "SEO Optimizer"
description: "React SPA SEO optimization including title tags, meta descriptions, Open Graph, Twitter cards, canonical URLs, structured data, sitemap.xml, robots.txt, and Core Web Vitals"
version: "1.0"
triggers:
  - "SEO audit score drops"
  - "Google Search Console errors"
  - "new content published"
  - "manual: /optimize-seo"
escalates_to: "Content Strategist"
---

## When to Run

- **Lighthouse SEO score <90** on any public page
- **Google Search Console** reports indexing errors or coverage issues
- **New pages/routes** added to the application
- **Meta descriptions or titles** changed significantly
- **Open Graph tags** missing for social sharing
- **Core Web Vitals** affected (CLS, LCP impact SEO ranking)
- **Scheduled monthly** on first Monday 04:00 UTC
- Manual trigger: before major marketing campaigns or content launches

## Memory Protocol

**Read First:**
- `CLAUDE.md` (project name, brand, core messaging)
- `public/robots.txt` (crawl rules)
- `public/sitemap.xml` (existing URL inventory)
- `vite.config.ts` (route config, base path)
- Meta tag configuration (if using react-helmet, next-seo, etc.)
- `/reports/seo/` for previous audit results
- Google Search Console API data (if accessible)

**Update After:**
- Create `SEO_AUDIT_[timestamp].md` with findings and recommendations
- Update `public/sitemap.xml` with all public routes
- Update `public/robots.txt` if crawl rules changed
- Commit meta tag changes with `seo: ` prefix
- Submit updated sitemap to Google Search Console
- Update structured data with schema.org markup

## Execution Pipeline

### Phase 1: SEO Audit & Ranking Factors (10 mins)

1. **Run Lighthouse SEO audit**
   ```bash
   npx lighthouse http://localhost:5173 --only-categories=seo --output=json
   ```
   - Record SEO score (target: 90+)
   - Note failing audits: meta descriptions, canonical URLs, viewport, robots.txt
   - Check mobile-friendly test pass

2. **Check Core Web Vitals**
   - LCP (Largest Contentful Paint): <2.5s (critical for ranking)
   - FID (First Input Delay): <100ms
   - CLS (Cumulative Layout Shift): <0.1
   - Use: Lighthouse CI, PageSpeed Insights, web-vitals library

3. **Manual SEO inspection**
   - Every page has unique `<title>` tag (50-60 chars, keyword-first)
   - `<meta name="description">` present (150-160 chars)
   - No duplicate meta descriptions across pages
   - Canonical URLs: self-referential on each page
   - Mobile viewport: `<meta name="viewport" content="width=device-width">`

### Phase 2: Structured Data & Schema Markup (8 mins)

1. **Implement JSON-LD structured data**
   - WebPage schema with name, description, URL
   - Specific types: Product, Article, LocalBusiness, Event
   - Test with Google Rich Results Test
   - Verify valid JSON-LD syntax

2. **Open Graph & Twitter Card tags**
   - og:title, og:description, og:image, og:url
   - twitter:card, twitter:title, twitter:description, twitter:image
   - Verify OG image: 1200×630px, <5MB
   - Test preview at ogp.me and Twitter Validator

3. **Rich snippet eligibility**
   - Product pages: price, availability, rating
   - Articles: headline, publish date, author, image
   - Reviews: rating, review count
   - FAQs: question-answer pairs

### Phase 3: Sitemap & Robots Configuration (6 mins)

1. **Generate/update sitemap.xml**
   - Include all public-facing URLs
   - Exclude: admin pages, duplicate content, login pages
   - Priority: 1.0 homepage, 0.8 main sections, 0.6 other pages
   - Update lastmod dynamically

2. **Configure robots.txt**
   - Allow: public routes
   - Disallow: /admin/, private areas, duplicate query strings
   - Add Sitemap location
   - Test at robotstxt.org

3. **Submit to search engines**
   - Google Search Console: upload sitemap
   - Bing Webmaster Tools: upload sitemap
   - Monitor: coverage reports, indexing errors

### Phase 4: Page-Level SEO Validation (10 mins)

1. **Title tag audit**
   - Check all pages have unique titles
   - Format: "Primary Keyword | Brand Name"
   - Length: 50-60 characters
   - Keywords in first 30 chars

2. **Meta description optimization**
   - Every page has description (no duplicates)
   - Length: 150-160 characters
   - Include target keyword naturally
   - Include call-to-action or value proposition

3. **Heading hierarchy validation**
   - One `<h1>` per page
   - Logical cascade: h1 → h2 → h3 (no skipping)
   - Descriptive, keyword-relevant headings
   - Semantic HTML structure

4. **Internal linking strategy**
   - Related pages linked with descriptive anchor text
   - Avoid generic text ("click here")
   - Keyword-rich anchors help SEO
   - No orphaned pages

### Phase 5: Technical SEO Checklist (8 mins)

1. **Mobile & responsive**
   - Page renders correctly on mobile
   - No horizontal scroll
   - Touch targets 44px minimum
   - Text readable without zoom
   - Fonts load quickly

2. **Performance signals**
   - CSS/JS minified and gzipped
   - Images optimized and lazy-loaded
   - No mixed HTTP/HTTPS
   - Lazy loading doesn't hide content from bots

3. **Security & crawlability**
   - SSL/TLS certificate valid
   - No broken links (404s)
   - No redirect chains
   - robots.txt accessible and valid

### Phase 6: Monitoring & Reporting (6 mins)

1. **Google Search Console integration**
   - Check: coverage reports, excluded pages, errors
   - Monitor: performance metrics, clicks, impressions, CTR
   - Request indexing for new pages
   - Review: mobile usability, security issues

2. **Tracking & analytics**
   - Google Analytics 4 installed correctly
   - Track: page views, time on page, scroll depth
   - Goals/conversions defined for key actions
   - Analytics not blocked by robots.txt

3. **SEO monitoring tools** (optional)
   - Track keyword rankings over time
   - Monitor backlinks and referring domains
   - Set up alerts for ranking changes

## Output Section

**Deliverables:**
1. **SEO Audit Report** (`SEO_AUDIT_[timestamp].md`)
   - Lighthouse SEO score and failing audits
   - Core Web Vitals impact
   - Meta tag audit (titles, descriptions, OG, Twitter)
   - Structured data coverage
   - Sitemap and robots.txt compliance
   - Page-level SEO by route
   - Technical SEO issues
   - Top 10 keyword opportunities
   - Prioritized recommendations

2. **Updated Assets**
   - `public/sitemap.xml` with all public routes
   - `public/robots.txt` with crawl rules
   - JSON-LD structured data for key pages
   - Meta tag updates

3. **Tracking Setup** (if needed)
   - Google Search Console verification
   - Google Analytics 4 event tracking
   - Core Web Vitals monitoring

**Success Criteria:**
- Lighthouse SEO: ≥90
- Core Web Vitals: all green
- Meta descriptions: unique on all pages
- Sitemap: all indexable URLs
- Robots.txt: valid, blocks private areas
- Structured data: valid JSON-LD
- No broken internal links

## Escalation Rules

**Escalate if:**
- Lighthouse SEO <70 (requires content/UX changes)
- Core Web Vitals failures require architecture changes
- Ranking drops >10 positions on key keywords
- Google Search Console reports significant indexing errors
- Competitor analysis shows keyword gaps

**Auto-escalate if:**
- Manual actions/penalties in GSC
- Hacked content detected
- Sitemap requires custom logic
- Content strategy misaligned with SEO
