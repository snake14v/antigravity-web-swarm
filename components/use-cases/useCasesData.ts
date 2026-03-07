import { 
  Coffee, CloudRain, TrendingUp, Truck, Mic, ShieldAlert, 
  Menu, UserCheck, Battery, MessageSquare, AlertTriangle, Search, FileText, 
  Users, Award, Recycle, MapPin, DollarSign 
} from 'lucide-react';

export const slides = [
  {
    id: 1,
    icon: Coffee,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/20",
    title: "The 'Morning Rush' Algorithm",
    description: "Gemini analyzes 6 months of sales data + today's weather. It predicts you will run out of Milk by 8:15 AM. A reorder is auto-scheduled for 7:00 AM delivery via Dunzo.",
    tag: "INVENTORY LOGIC",
    stat: "Saved ₹12k/mo in lost sales"
  },
  {
    id: 2,
    icon: CloudRain,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
    title: "Rainy Day Protocol",
    description: "Hyper-local weather sensors detect rain at Sony World Signal. The OS automatically switches your Zomato/Swiggy listing to 'Delivery Priority' mode, increases prep time buffers, and sends a 'Chai & Pakoda' push notification to locals.",
    tag: "CONTEXT AWARENESS",
    stat: "+40% Order Acceptance Rate"
  },
  {
    id: 3,
    icon: TrendingUp,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/20",
    title: "The 'Biryani Index'",
    description: "Dynamic Pricing engine kicking in post-9 PM. Perishable items like Biryani get auto-discounted by 10% every 30 mins to ensure zero wastage by closing time.",
    tag: "DYNAMIC PRICING",
    stat: "Zero Food Waste Goal"
  },
  {
    id: 4,
    icon: Truck,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20",
    title: "Vendor Auto-Negotiation",
    description: "ShopSmart-OS aggregates order volume from 5 nearby cafes in Koramangala. It automatically negotiates a bulk discount with the vegetable vendor for the combined order.",
    tag: "SUPPLY CHAIN",
    stat: "15% Cost Reduction"
  },
  {
    id: 5,
    icon: Mic,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/20",
    title: "Staff Language Bridge",
    description: "Kitchen Display System (KDS) translates ticket notes instantly. Waiter types 'Less Spicy' in English -> Chef hears 'Swalpa Khara' in Kannada via headset.",
    tag: "OPERATIONS",
    stat: "Error Rate < 1%"
  },
  {
    id: 6,
    icon: ShieldAlert,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20",
    title: "The 'Bandh' Shield",
    description: "Verified news alerts filter out fake WhatsApp rumors about strikes or shutdowns. The OS advises whether to open shop based on real police ticker data.",
    tag: "RISK MANAGEMENT",
    stat: "Uptime Optimization"
  },
  {
    id: 7,
    icon: Menu,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/20",
    title: "Smart-Menu Engineering",
    description: "During peak traffic (1 PM - 2 PM), the Digital QR Menu auto-hides low-margin, high-prep-time items to streamline kitchen throughput.",
    tag: "THROUGHPUT",
    stat: "Table Turnaround -5 mins"
  },
  {
    id: 8,
    icon: UserCheck,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20",
    title: "Customer 'Face-Pay' (Beta)",
    description: "Opt-in loyalty system recognizes regulars via camera. As they walk in, the POS pulls up their 'Usual Order' and applies their stored credits.",
    tag: "CX & LOYALTY",
    stat: "Checkout time: 3s"
  },
  {
    id: 9,
    icon: Battery,
    color: "text-lime-400",
    bgColor: "bg-lime-400/10",
    borderColor: "border-lime-400/20",
    title: "Energy Vampire Hunter",
    description: "CCTV analysis detects empty zones in the cafe. The OS interfaces with smart plugs to dim lights and lower AC cooling in unoccupied areas.",
    tag: "COST SAVING",
    stat: "₹8000/mo Energy Savings"
  },
  {
    id: 10,
    icon: MessageSquare,
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
    borderColor: "border-indigo-400/20",
    title: "The 'Review Ambulance'",
    description: "Instant SMS alert to the owner when a 1-star review hits Google Maps. AI drafts a polite, context-aware apology offering a refund to mitigate damage.",
    tag: "REPUTATION",
    stat: "4.8 Star Maintenance"
  },
  {
    id: 11,
    icon: AlertTriangle,
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
    borderColor: "border-rose-400/20",
    title: "Inventory Theft Pattern",
    description: "Logic Core matches POS sales against inventory weight sensors. If 10 coffees are sold but 1kg beans used (instead of 200g), it flags a theft anomaly.",
    tag: "SECURITY",
    stat: "Loss Prevention"
  },
  {
    id: 12,
    icon: Search,
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
    borderColor: "border-sky-400/20",
    title: "Hyper-Local SEO Bot",
    description: "Auto-updates Google Business Profile with 'Fresh Samosas Now' posts exactly when the batch comes out of the fryer, triggering local 'Near Me' search spikes.",
    tag: "MARKETING",
    stat: "Local Impressions +300%"
  },
  {
    id: 13,
    icon: FileText,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/20",
    title: "Compliance Autopilot",
    description: "Auto-generates FSSAI hygiene logs. CCTV timestamps cleaning schedules, creating a tamper-proof digital audit trail for inspectors.",
    tag: "COMPLIANCE",
    stat: "100% Audit Readiness"
  },
  {
    id: 14,
    icon: Users,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/20",
    title: "Dynamic Staffing",
    description: "Uber-style 'Surge Staffing'. If demand prediction hits 150%, the OS sends alerts to a pool of pre-vetted freelance waiters for a 4-hour shift.",
    tag: "HR TECH",
    stat: "Flexibility"
  },
  {
    id: 15,
    icon: Award,
    color: "text-fuchsia-400",
    bgColor: "bg-fuchsia-400/10",
    borderColor: "border-fuchsia-400/20",
    title: "Bangalore OG Badge",
    description: "NFT-based loyalty badges for top 100 customers. 'Bangalore OGs' get secret menu access, gamifying retention without giving away cash discounts.",
    tag: "WEB3 LOYALTY",
    stat: "Retention +25%"
  },
  {
    id: 16,
    icon: Recycle,
    color: "text-teal-400",
    bgColor: "bg-teal-400/10",
    borderColor: "border-teal-400/20",
    title: "Waste-to-Wealth",
    description: "At 10 PM, remaining perishable food is listed on a localized marketplace for piggery/composting pickups, turning disposal cost into micro-revenue.",
    tag: "SUSTAINABILITY",
    stat: "Eco-Friendly"
  },
  {
    id: 17,
    icon: MapPin,
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
    borderColor: "border-violet-400/20",
    title: "Competitor Watch",
    description: "Geospatial analysis alerts you if a new cafe opens within 500m. Suggests tactical promo offers to retain your customer base during their launch week.",
    tag: "STRATEGY",
    stat: "Market Defense"
  },
  {
    id: 18,
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    title: "The 'Exit Strategy'",
    description: "Generates a professional Valuation Report based on verified cash flow and customer LTV, helping merchants sell their business for 3x market multiple.",
    tag: "FINANCE",
    stat: "Wealth Creation"
  }
];

export const expandedSlides = slides.slice(0, 18);
export const remainingSlides = slides.slice(18);
