# Content Pipeline Workflow — Week of Content Creation

**Purpose:** Automated weekly content creation, review, scheduling, and performance tracking.

**Owner Agent:** Content Engine (drafting) + Brand Guardian (review) + Social Scheduler (publishing)
**Frequency:** Weekly, Monday-Friday
**Output:** Published posts across LinkedIn, Instagram, Blog + performance metrics

---

## Workflow Overview

```
Monday 10:00 AM
       │
       ├─ Generate weekly briefs
       ├─ Plan 5 content pieces
       └─ Assign topics & formats
       │
Tuesday
       ├─ Draft LinkedIn posts (3x)
       ├─ Draft Instagram captions (3x)
       └─ Queue blog post outline
       │
Wednesday 2:00 PM
       ├─ Brand Guardian reviews all drafts
       ├─ Provides feedback/approval
       └─ Revisions submitted
       │
Thursday
       └─ Final scheduling in Buffer/Later
       │
Friday 12:00 PM
       ├─ Daily posts go live
       └─ Monitor initial engagement
       │
Ongoing (Daily)
       ├─ Monitor engagement
       ├─ Respond to comments
       └─ Log metrics
```

---

## Step 1: Monday Morning — Plan Week's Content (10:00 AM)

### Content Briefing Generation

**Agent:** Content Engine
**Input:** Last week's performance data + marketing goals + product roadmap

**Data sources:**

```
1. Last week's engagement metrics
   - File: obsidian/knowledge/marketing/Weekly_Content_[LAST_WEEK].md
   - Extract: Top-performing content themes, low-performing themes

2. Sales pipeline status
   - File: Daily_Standup_*.md (last week's standups)
   - Extract: Recent wins, challenges, customer feedback

3. Product roadmap
   - File: sprint-planner/SKILL.md or current sprint plan
   - Extract: What shipped this week? What's launching next?

4. Marketing goals
   - File: obsidian/knowledge/marketing/Content_Calendar.md
   - Extract: This month's focus areas, campaigns

5. Industry news
   - Manual research or Common Room signals
   - Extract: Trending topics, competitor moves, market shifts
```

### Weekly Content Brief

**File location:**
```
obsidian/knowledge/marketing/Content_Brief_[WEEK].md
Action: WRITE new file
```

**Structure:**

```markdown
# Content Brief — Week of [START to END]

**Generated:** Monday [DATE] 10:00 AM
**Planner:** Content Engine

---

## This Week's Theme
[Main theme for the week, e.g., "ShopSense for Multi-Store Retail Operations"]

**Why this theme:**
- Top trending topic from last week's engagement
- Supports current sales push (e.g., 2 hot leads in [industry])
- Ties to product roadmap (feature shipping [when])

---

## Content Pillars (5 pieces planned)

### Pillar 1: Education
**Topic:** How edge AI reduces shrinkage in retail
**Format:** LinkedIn carousel (4-5 slides)
**Key messaging:** Technical accuracy + business ROI
**Audience:** Store ops managers, retail leaders
**CTA:** "See how [company] cut losses by 18%"

### Pillar 2: Customer Story
**Topic:** [Customer name] cuts shrinkage with ShopSense
**Format:** Case study blog post + Instagram post summary
**Key messaging:** Before/after metrics, deployment timeline, results
**Audience:** Prospects in retail
**CTA:** "Schedule a 15-min demo"

### Pillar 3: Thought Leadership
**Topic:** The future of AI in retail operations
**Format:** LinkedIn article + Twitter thread
**Key messaging:** Market trends, positioning ShopSense as leading solution
**Audience:** Retail industry leaders, decision makers
**CTA:** "Read the full analysis"

### Pillar 4: Product Feature
**Topic:** [Feature] launched — why it matters
**Format:** Instagram post + LinkedIn post
**Key messaging:** What it does, why ShopSense customers asked for it
**Audience:** Existing customers + prospects
**CTA:** "Try it yourself in your pilot"

### Pillar 5: Company Culture/Behind-the-Scenes
**Topic:** How we're building ShopSense (or "A day in the life")
**Format:** Instagram post + LinkedIn post
**Key messaging:** Authentic, relatable, humanize the team
**Audience:** General audience, talent attraction
**CTA:** "Join our mission"

---

## Content Calendar (This Week)

| Day | Pillar | Format | Platform | Time | Approver |
|-----|--------|--------|----------|------|----------|
| Mon | [Pillar] | Draft | - | - | - |
| Tue | [Pillar] | Draft | - | - | - |
| Wed | [Pillar] | Review | - | - | Brand Guardian |
| Thu | [Pillar] | Scheduled | Buffer | [time] | - |
| Fri | [Pillar] | Published | LinkedIn | 9:00 AM | - |

---

## Key Metrics to Watch
- LinkedIn post 1: Target [X] impressions (based on avg engagement)
- LinkedIn post 2: Target [X] impressions
- Blog post: Target [X] page views (compare to last blog post)
- Instagram growth: Target [+X] followers

---

## Reference Materials
- Last week's engagement: [[Weekly_Content_[LAST_WEEK]]]
- Sales pipeline: [[Sales_Pipeline_[LAST_WED]]]
- Brand guidelines: [[Brand_Guidelines]]

---
```

---

## Step 2: Tuesday — Draft Content (All Day)

### LinkedIn Post Drafting

**Agent:** Content Engine (uses `marketing:draft-content` skill)

**Input:** Content brief + research materials

**Process for LinkedIn Post #1 (Education — Carousel):**

**Folder structure in Google Drive:**
```
ShopSense/Content/
  ├─ Drafts/
  │  ├─ LinkedIn_Carousel_[WEEK]_v1.gdoc
  │  ├─ Instagram_Post_[WEEK]_v1.gdoc
  │  └─ Blog_CaseStudy_[WEEK]_v1.gdoc
  └─ Scheduled/
     ├─ [Already approved content]
```

**LinkedIn Carousel Draft (5 slides):**

```
Slide 1 (Hook):
---
Title: "Why Retail Loses 2% to Shrinkage (And How Edge AI Changes That)"
Visual: [Stat graphic showing shrinkage costs]
Text: "Shrinkage is retail's hidden profit killer. 2% loss on a $10M store = $200K gone. But most retailers have no visibility."
---

Slide 2 (Problem):
---
Title: "The Old Way: Manual Counting"
Visual: [Photo of employee with clipboard, frustrated expression]
Text:
"• Audits happen monthly (if that)
• Errors are manual and slow to fix
• No real-time visibility
• Results? Lost profit + customer frustration"
---

Slide 3 (Solution):
---
Title: "ShopSense: Real-Time AI-Powered Inventory"
Visual: [Screenshot of ShopSense dashboard showing accuracy %, anomaly alerts]
Text:
"✓ Real-time inventory accuracy (85%+ first week)
✓ Automatic anomaly detection
✓ No manual hardware installation
✓ Results within 2 weeks"
---

Slide 4 (Social Proof):
---
Title: "How [Retail Chain] Cut Losses by 18%"
Visual: [Chart showing shrinkage reduction over time]
Text:
"In 4 weeks:
→ Shrinkage down from 2.5% to 2.1%
→ $50K recovered monthly
→ Employees more accountable
→ Customer experience improved"
---

Slide 5 (CTA):
---
Title: "Ready to Improve Your Bottom Line?"
Visual: [ShopSense logo + product screenshot]
Text:
"We're running free 2-week pilots for retail chains managing 5+ stores.

See your potential savings — no risk, no setup cost.

[Schedule a 15-min demo]"
---
```

**LinkedIn Post Meta (in doc header):**

```
Platform: LinkedIn
Format: Carousel (5 slides)
Content Pillar: Education
Audience: Store ops managers, retail leaders, CFOs
Target Reach: 2,000+ impressions
Target Engagement Rate: 2%+ (our baseline is 1.5%)
Key Keywords: shrinkage, retail operations, inventory accuracy, edge AI
Hashtags: #Retail #AI #InventoryManagement #ShopSense #RetailTech
Call-to-Action: Schedule a 15-min demo
Status: DRAFT — awaiting brand review
```

### Instagram Post Drafting

**Format: Single image + caption**

**Image (to be designed or sourced):**
- High-contrast retail store shelf image
- Text overlay: "Shrinkage costs retail $X per year"
- Brand colors (Ooru Logix brand palette)

**Caption:**

```
Ever wonder where all your retail profit goes?

Shrinkage — the 2% silent killer.

ShopSense gives you real-time visibility into every transaction. No manual counts. No guessing.

🎯 Real-time accuracy
🎯 Automatic alerts
🎯 $K recovered monthly

Free 2-week pilot for retail chains — DM us to learn more.

#ShopSense #RetailTech #InventoryManagement #EdgeAI #RetailOperations
```

**Instagram Post Meta:**

```
Platform: Instagram
Format: Single image + caption
Content Pillar: Education (same as LinkedIn, adapted)
Target Reach: 500+ impressions
Target Engagement Rate: 3%+
Alt Text: "Mobile phone showing ShopSense dashboard with real-time inventory accuracy"
Call-to-Action: "DM us" / "Link in bio"
Best Time to Post: Tuesday 5:00 PM or Thursday 9:00 AM
Status: DRAFT
```

### Blog Post Outline

**Topic:** Case study — "[Retail Chain] cuts shrinkage 18% with ShopSense"

**Outline:**

```markdown
# Case Study: How [Retail Chain] Cut Shrinkage by 18% in 4 Weeks

## Introduction (100 words)
- Hook: [Retail chain] was losing $X to shrinkage monthly
- Problem: No visibility, manual processes, blame game with staff
- Solution: Deployed ShopSense edge AI
- Result: 18% reduction in shrinkage, $50K recovered monthly

## The Situation (200 words)
- Company background: [# stores, $ revenue, # employees]
- Challenge: Shrinkage hitting 2.5% (industry average 1.5%)
- Root causes: Manual audits, employee theft, vendor fraud, process gaps
- Business impact: Eating 30% of monthly profit margin
- Why they chose ShopSense: [Specific factors — flexibility, no hardware, ROI clarity]

## Deployment (200 words)
- Week 1: Setup + integration with POS system
- Week 2: AI learning inventory patterns
- Week 3-4: Real-time anomaly detection enabled
- Challenges during deployment: [Realistic challenges and solutions]
- Training: [Hours spent, staff buy-in]

## Results (300 words)
- Accuracy improved from [X%] to [92%]
- Shrinkage declined from 2.5% to 2.1% in 4 weeks
- [$ amount] recovered in first month alone
- Employee accountability improved (theft incidents down X%)
- Customer satisfaction improved (less out-of-stocks, better pricing accuracy)
- Operational efficiency: [time saved on audits]

## Testimonial (100 words)
- Direct quote from [Customer's Store Manager / Ops Lead]
- Why they're sticking with ShopSense
- Plans for rollout to other stores

## Key Takeaways (150 words)
1. Real-time visibility changes everything
2. Deployment is fast (2 weeks to ROI)
3. Staff adoption is higher than expected
4. Every retail chain has this problem
5. ShopSense is the fastest path to solve it

## Call-to-Action (50 words)
- Invite to pilot
- Link to demo video
- Link to pricing/proposal

---

**Total words:** ~1,100
**Time to write:** 2-3 hours
**Images needed:** 4-5 (screenshots, graphs, customer photo if available)
**Status:** OUTLINE ONLY — full draft due Wednesday after Content Engine writes it
```

### File Organization

**All drafts stored in Google Drive:**

```
ShopSense/Content/Drafts/
├─ LinkedIn_Carousel_[WEEK]_v1.gdoc
│  └─ [Content Engine drafts Tuesday, Brand Guardian reviews Wednesday]
├─ LinkedIn_Article_[WEEK]_v1.gdoc
├─ Instagram_Post1_[WEEK]_v1.gdoc
├─ Instagram_Post2_[WEEK]_v1.gdoc
├─ Blog_CaseStudy_[WEEK]_v1.gdoc
└─ [Additional platforms as needed]
```

**Each doc includes:**
- Content (main body)
- Meta section (audience, KPIs, CTA, hashtags)
- Notes (research sources, references, ideas for next iteration)

---

## Step 3: Wednesday Afternoon — Brand Review (2:00 PM)

### Brand Guardian Review Process

**Agent:** Brand Guardian (uses `marketing:brand-review` skill)

**Review criteria checklist:**

```
✓ Voice & Tone Match
  - Is tone [Friendly/Expert/Authentic]?
  - Does it match brand guidelines?
  - Consistency across platforms?

✓ Value Proposition Clear
  - Does it explain ShopSense's benefit (not just feature)?
  - Is the problem clear?
  - Is the solution clear?

✓ No Competitive Trash-Talk
  - Avoid naming competitors unless necessary
  - If mentioned: provide context (we're better because...)
  - Stay focused on our value, not their weakness

✓ Accuracy & Claims
  - All metrics verifiable?
  - Customer story accurate (if real)?
  - No exaggerations?

✓ CTA Clear & Appropriate
  - CTA matches content type (education = info request, social proof = demo request)
  - CTA is compelling, not pushy
  - Multiple ways to engage (email, WhatsApp, demo link)

✓ Diversity & Balance
  - Mix of educational, customer stories, product features, company culture
  - Platforms match format (LinkedIn = longer form, Instagram = visual first)
  - Not too sales-y overall (guideline: 60% educational, 40% promotional)

✓ Brand Colors & Visual Identity
  - Images use Ooru Logix color palette
  - Fonts/graphics on-brand
  - Not generic stock photos (unless unavoidable)
```

### Review Workflow

**In Google Doc (same doc where Content Engine drafted):**

```
Brand Guardian adds comments:

[Highlighted sentence]
Comment: "This is great, but let's soften 'We're the only solution' to 'We're the fastest solution' — more credible."

[Highlighted stat]
Comment: "Can you verify this 18% reduction claim? Need to attach proof or make it '[Customer] achieved X reduction' to be safer."

[Overall comment on doc]
"Love the education angle here. The CTA feels strong. One small tweak on the competitive positioning — see comment above. Once fixed, this is APPROVED!"
```

**If major revisions needed:**

```
Brand Guardian creates v2 comment:
"This needs a bigger overhaul — currently too product-focused, not enough customer value. I'll suggest some rewrites in detailed comments."

Content Engine makes revisions:
[Entire paragraphs rewritten to be more benefit-focused]

Brand Guardian reviews v2:
"Perfect! APPROVED for scheduling."
```

**Approval indicator:**

```
Doc status:
- DRAFT (in progress)
- UNDER REVIEW (Brand Guardian looking at it)
- CHANGES REQUESTED (Brand Guardian provided feedback)
- APPROVED (ready to schedule)
- PUBLISHED (live)
```

### Blog Post Review

**Blog posts go through additional review:**

1. **Content accuracy:** Are facts/case study accurate?
2. **SEO:** Does it target a keyword? Does it answer the search intent?
3. **Word count:** Optimal range (800-1,500 words)?
4. **Links:** Are there relevant internal/external links?
5. **Formatting:** Headings, subheadings, bullet points for readability?

**Blog Review Template (separate doc):**

```markdown
# Blog Post Review — [Title]

**Reviewer:** Brand Guardian
**Date:** Wednesday [DATE]

## Content Quality
- [ ] Headline is compelling and keyword-targeted
- [ ] Intro paragraph hooks reader
- [ ] Body flows logically
- [ ] Conclusion summarizes + CTAs to next step

## Accuracy
- [ ] All claims are verified
- [ ] Customer case study is accurate (if included)
- [ ] Metrics are current

## SEO
- [ ] Primary keyword appears in first 100 words
- [ ] Keyword density 1-2% (not keyword-stuffed)
- [ ] Meta description drafted
- [ ] Internal links to relevant posts
- [ ] External authority links (if relevant)

## Readability
- [ ] Headings break up content
- [ ] Paragraph length < 150 words
- [ ] Bullet points for key takeaways
- [ ] Images placed strategically
- [ ] Captions for images

## Brand Alignment
- [ ] Tone matches brand voice
- [ ] Value prop clear (not too much feature-dump)
- [ ] CTA appropriate and clear

## Final Verdict
- [ ] APPROVED — ready to publish
- [ ] APPROVED WITH MINOR EDITS — list edits below
- [ ] CHANGES REQUESTED — provide detailed feedback

## Feedback
[Reviewer comments and requested changes]
```

---

## Step 4: Thursday — Schedule Approved Content

### Platform Scheduling

**Agent:** Social Scheduler (uses Buffer/Later APIs)

**Scheduling logic:**

```javascript
// For each APPROVED content piece:

if (platform === 'linkedin') {
  // LinkedIn: Post at 8:00 AM or 10:00 AM IST (Tuesday-Thursday best)
  // Avoid Friday/weekend (lower engagement)

  scheduleTime = findOptimalLITime();  // 8:00 AM Tue-Thu

  // Buffer API
  await buffer.create({
    profile_id: linkedinProfileId,
    text: postCopy,
    image: imageUrl,
    schedule_at: scheduleTime,
    shorten_links: true,
  });
}

else if (platform === 'instagram') {
  // Instagram: Post at 5:00 PM or 9:00 AM IST
  // Best times: Tuesday, Wednesday, Thursday, Friday

  scheduleTime = findOptimalIGTime();  // 5:00 PM or 9:00 AM

  // Later API (or Buffer)
  await later.schedule({
    image_url: imageUrl,
    caption: postCopy,
    schedule_at: scheduleTime,
    alt_text: generateAltText(imageUrl),
  });
}

else if (platform === 'blog') {
  // Blog: Usually publish Thursday or Friday
  // Coordinate with social scheduler (post teaser on same day or next day)

  publishDate = nextThursdayOrFriday();

  // WordPress API (or Webflow, etc.)
  await blog.publish({
    title: postTitle,
    body: postContent,
    featured_image: imageUrl,
    status: 'scheduled',
    publish_at: publishDate,
    seo_meta_description: metaDescription,
    categories: ['Retail', 'Case Studies'],
    tags: ['ShopSense', 'AI', 'Inventory'],
  });

  // Create social media post promoting blog
  const socialPromo = generateBlogPromo(postTitle);
  scheduleBloomPromo(socialPromo, publishDate + 1_hour);
}
```

**Firestore scheduling record:**

```javascript
{
  scheduled_post_id: 'POST-' + contentId,

  content_id: contentId,
  pillar: 'education' | 'customer_story' | 'product' | 'culture',

  title: 'Why Retail Loses 2% to Shrinkage...',
  platform: 'linkedin' | 'instagram' | 'blog',

  copy: '[Full content]',
  image_url: 'https://...',

  scheduled_at: timestamp,
  publish_at: timestamp,

  cta: 'Schedule a demo',

  status: 'scheduled',  // scheduled → published → monitoring → completed

  metrics: {
    published_at: null,
    impressions: null,
    engagement: null,
    clicks: null,
    replies: null,
  },

  created_by: 'Social Scheduler',
  approved_by: 'Brand Guardian',
  created_at: timestamp,
}
```

### Scheduling Spreadsheet

**Google Sheet:** `ShopSense/Content Calendar (Master)`

```
| Week | Day | Time | Platform | Title | Status | Impressions | Engagement |
|------|-----|------|----------|-------|--------|-------------|-----------|
| W1 | Mon | 8:00 AM | LinkedIn | "Why Retail Loses..." | SCHEDULED | - | - |
| W1 | Tue | 5:00 PM | Instagram | "Shrinkage costs..." | SCHEDULED | - | - |
| W1 | Wed | 9:00 AM | Blog | "How [Customer]..." | SCHEDULED | - | - |
| W1 | Thu | 8:00 AM | LinkedIn | "Future of AI..." | SCHEDULED | - | - |
| W1 | Fri | 10:00 AM | Instagram | "Meet the team..." | SCHEDULED | - | - |
```

---

## Step 5: Friday — Monitor & Publish Live

### Publishing (Noon or Automated)

**If using Buffer/Later:**
- Posts publish automatically at scheduled times
- Slack notification confirms each publish

**If manual:**
- Agent publishes each post at scheduled time
- Confirms publish + takes screenshot for records

### Engagement Monitoring

**Real-time monitoring:**

```javascript
// Check engagement every 4 hours for first 24 hours after publish

every 4 hours:
  for each published post:
    impressions = getPlatformMetrics(post_id).impressions
    engagement = getPlatformMetrics(post_id).engagement_count

    // Alert if underperforming
    if impressions < baseline * 0.5:
      slack_alert('Post underperforming: ' + post.title)

    // Alert if high engagement (opportunity for engagement)
    if engagement > baseline * 1.5:
      slack_alert('🔥 Post performing well! Consider engagement loop.')
```

**Slack monitoring channel:**

```
Posted: "Why Retail Loses 2% to Shrinkage" to LinkedIn
⏱ 1 hour: 312 impressions (on pace for 1,500+)
⏱ 4 hours: 892 impressions, 47 engagements (14 saves, 28 comments, 5 shares)
⏱ 24 hours: 2,104 impressions, 118 engagements (target was 2,000 — WE HIT IT!)

Top comment: [Quoted positive comment from audience]
```

### Comment Response

**Policy:**
- Reply to all comments within 24 hours
- Positive comments: Authentic thank you + relevant follow-up
- Questions: Direct answer + relevant resource link
- Objections: Address directly + offer demo/call

**Example responses:**

```
Comment: "How does this compare to [competitor]?"
Response: "Great question! We differ in 3 ways:
1. Real-time (not batch)
2. No hardware install
3. Hybrid cloud (privacy-first)

Happy to do a deeper comparison call if you're curious — DM me!"

---

Comment: "Looks interesting for big retailers, but what about SMBs?"
Response: "Perfect question — SMBs often have the highest shrinkage %!
We work with stores as small as 5 locations.
Let's chat about your specific situation — interested in a pilot?"
```

---

## Step 6: Ongoing — Track Performance

### Daily Content Monitoring

**Each day (part of Daily Close automation):**

```
File: obsidian/knowledge/marketing/Daily_Content_[DATE].md

For each published post (live):
  - Impressions
  - Engagement rate
  - Top comment
  - Any issues/spam
  - Sentiment of audience interaction
```

### Weekly Content Report

**File:** `obsidian/knowledge/marketing/Weekly_Content_[WEEK].md`

```markdown
# Content Performance — Week of [DATE]

## Publishing Summary
- Posts published: 5
- Platforms: LinkedIn (2), Instagram (2), Blog (1)
- Status: All published on schedule ✓

## Engagement Metrics

### LinkedIn
| Post | Impressions | Engagement | Rate |
|------|-------------|-----------|------|
| Post 1 | 2,104 | 118 | 5.6% |
| Post 2 | 1,856 | 94 | 5.1% |
| **Avg** | **1,980** | **106** | **5.3%** |

**Target:** 2,000 impressions / post
**Baseline:** 1,500 impressions / post
**Status:** ✓ Above target

### Instagram
| Post | Reaches | Engagement | Rate |
|------|---------|-----------|------|
| Post 1 | 487 | 52 | 10.7% |
| Post 2 | 523 | 61 | 11.7% |
| **Avg** | **505** | **56.5** | **11.2%** |

**Target:** 500 reaches / post
**Status:** ✓ On target

### Blog
| Post | Page Views | Avg Time | Bounce |
|-----|-----------|---------|--------|
| Case Study | 324 | 4:23 | 32% |

**Target:** 200+ views
**Status:** ✓ Exceeded target

## Audience Insights
- LinkedIn follower growth: +12 new followers
- Instagram growth: +8 new followers
- Comment sentiment: 92% positive
- Top conversation theme: Product accuracy (9 mentions)

## Content Themes Performance

**Education posts:** 5.3% avg engagement (strong!)
**Customer story:** 6.2% engagement (strongest!)
**Product feature:** 4.1% engagement (weaker)
**Company culture:** 11.2% engagement on IG (very strong!)

**Recommendation:** Increase customer stories and culture content next week.

## Competitor Activity
- [Competitor A] posted on [topic] (147 likes) — trending area
- [Competitor B] launched [campaign] — watch for audience overlap

## Next Week's Adjustments
1. Increase customer story focus (performing well)
2. Shift product posts to more education angle
3. Expand culture content on Instagram
4. Watch [trending topic] for content opportunities
```

---

## Content Repurposing

### Blog → Social

**When a blog post publishes:**

```
Original: 1,200-word case study blog post

Repurposing:
1. LinkedIn carousel (3 key takeaways + CTA)
2. LinkedIn article (excerpt + link to full blog)
3. Instagram post (stat from blog + link in bio)
4. Email newsletter (send blog link)
5. Twitter/X thread (thread version of blog)
```

**Repurposing queue (Firestore):**

```javascript
{
  repurposing_id: 'REUSE-' + blogPostId,
  source_content: 'blog_post_id',

  formats: [
    { platform: 'linkedin_carousel', status: 'draft', due_date: today + 1_day },
    { platform: 'instagram', status: 'draft', due_date: today + 1_day },
    { platform: 'email_newsletter', status: 'pending', due_date: today + 3_days },
    { platform: 'twitter_thread', status: 'pending', due_date: today + 3_days },
  ],

  created_at: now(),
}
```

---

## Error Handling

| Error | Recovery |
|-------|----------|
| Content not approved by review deadline | Publish Friday + prioritize Monday next week |
| Image missing for social post | Use placeholder + add real image before publish |
| Platform scheduling fails (Buffer API down) | Manual publish at scheduled time |
| Post underperforms significantly | Boost post in next 24h or rewrite for next week |
| Negative comments | Reply professionally + flag for Brand Guardian if needed |
| Content published before approval | Delete + repost once approved (if platform allows) |

---

## Success Metrics

**Content Pipeline Success:**

✓ 5 pieces of content created weekly (mix of platforms)
✓ 100% brand review compliance (all content reviewed before publish)
✓ 80%+ of posts meet impression targets
✓ 5%+ average engagement rate on LinkedIn
✓ 10%+ average engagement rate on Instagram
✓ 200+ views per blog post (minimum)
✓ 100% on-time publishing (no missed deadlines)
✓ Positive sentiment in comments (>90%)
✓ Growing follower counts week-over-week

