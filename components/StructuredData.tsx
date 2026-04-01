import React from 'react';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ooru Logix",
  "url": "https://www.oorulogix.com",
  "logo": "https://www.oorulogix.com/og-image.png",
  "description": "AI-powered edge intelligence for Bangalore's retail merchants. Real-time inventory tracking, predictive analytics, and zero-latency operations.",
  "foundingDate": "2026",
  "founder": {
    "@type": "Person",
    "name": "Vaishak R N"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.linkedin.com/company/oorulogix"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "hello@oorulogix.com",
    "availableLanguage": ["English", "Kannada", "Hindi"]
  }
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "ShopSense",
  "description": "Edge AI retail intelligence system using dual Raspberry Pi 4 and computer vision for real-time inventory tracking, automated billing, and predictive analytics — works offline.",
  "brand": {
    "@type": "Brand",
    "name": "Ooru Logix"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Ooru Logix"
  },
  "category": "AI Retail Hardware",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "25000",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/PreOrder",
    "url": "https://www.oorulogix.com/#/pricing"
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Ooru Logix",
  "description": "AI solutions and edge intelligence for Bangalore retail businesses.",
  "url": "https://www.oorulogix.com",
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "JP Nagar",
    "addressRegion": "Bangalore, Karnataka",
    "postalCode": "560078",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "12.9063",
    "longitude": "77.5857"
  },
  "areaServed": {
    "@type": "City",
    "name": "Bangalore"
  },
  "priceRange": "$$"
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ooru Logix",
  "url": "https://www.oorulogix.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.oorulogix.com/#/features?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

interface StructuredDataProps {
  type?: 'organization' | 'product' | 'localBusiness' | 'website' | 'all';
}

const StructuredData: React.FC<StructuredDataProps> = ({ type = 'all' }) => {
  const schemas: object[] = [];

  if (type === 'all' || type === 'organization') schemas.push(organizationSchema);
  if (type === 'all' || type === 'product') schemas.push(productSchema);
  if (type === 'all' || type === 'localBusiness') schemas.push(localBusinessSchema);
  if (type === 'all' || type === 'website') schemas.push(websiteSchema);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
