export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  recommended?: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: any;
}

export interface TeamMember {
  role: string;
  title: string;
  description: string;
}

export enum PageRoute {
  HOME = '/',
  FEATURES = '/features',
  MANIFESTO = '/manifesto',
  PRICING = '/pricing',
  CONTACT = '/register',
  CAREERS = '/careers',
  LEGAL = '/legal',
  PRESS = '/press',
  SITEMAP = '/sitemap',
  INVENTORY_LOGIC = '/inventory-logic',
  LOGIN = '/login',
  SIGNUP = '/signup',
  DASHBOARD = '/admin',
  ABOUT = '/about',
  PARTNERS = '/partners',
  TRACK = '/track',
  DYNAMIC_PRICING = '/dynamic-pricing',
  LANGUAGE_BRIDGE = '/language-bridge',
  WEBSITE_DESIGN = '/web-design'
}