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
  WEBSITE_DESIGN = '/web-design',
  SURVEILLANCE = '/surveillance',
  HOME_AUTOMATION = '/home-automation'
}

export type RegistrationStatus = 'pending' | 'contacted' | 'audited' | 'rejected';
export type PaymentStatus = 'pending_verification' | 'verified' | 'failed' | 'unpaid';

export interface CommunicationLogEntry {
  date: any;
  message: string;
  type: 'email' | 'whatsapp' | 'call' | 'system';
  sender: string;
}

export interface MandatoryChecklist {
  phoneVerified: boolean;
  addressVerified: boolean;
  kycUploaded: boolean;
  termsAgreed: boolean;
  siteSurveyDone: boolean;
}

export interface Registration {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  merchantType: string;
  currentPos: string;
  dailyOrders: string;
  challenges: string;
  foundersDiscount: boolean;
  agreedToAudit: boolean;
  status: RegistrationStatus;
  utr?: string;
  amountPaid?: number;
  paymentStatus?: PaymentStatus;
  timestamp: any;
  
  // New Admin fields
  assignedEngineer?: string;
  auditScore?: number;
  adminNotes?: string;
  feedbackToUser?: string;
  communicationLog?: CommunicationLogEntry[];
  mandatoryChecks?: MandatoryChecklist;
  lastUpdated?: any;
}