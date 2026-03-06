import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Info, Zap, Shield, Star, ArrowRight, Sparkles } from 'lucide-react';
import { PageRoute } from '../types';

const tiers = [
  {
    name: 'The Basic Byte',
    monthlyPrice: 1999,
    annualPrice: 1599,
    description: 'Digital foundation for small kiosks and pop-ups.',
    features: [
      'Digital QR Menu',
      'Real-time Inventory List',
      'Basic Sales Reports',
      'Email Support'
    ],
    cta: 'Start with Byte',
    recommended: false,
    color: 'from-cyan-400 to-blue-500',
    textColor: 'text-cyan-400',
    glow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]',
    borderFocus: 'group-hover:border-cyan-400/50',
    icon: <Zap className="text-cyan-400" size={28} />
  },
  {
    name: 'The Logic Core',
    monthlyPrice: 4999,
    annualPrice: 3999,
    description: 'Full ShopSmart-OS for busy cafes and retail.',
    features: [
      'Everything in Basic',
      'Full ShopSmart-OS Dashboard',
      'Staff Task Management',
      'WhatsApp Alerts',
      'Predictive Depletion'
    ],
    cta: 'Get Logic Core',
    recommended: true,
    color: 'from-garden-400 to-emerald-600',
    textColor: 'text-garden-400',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]',
    borderFocus: 'border-garden-500/50',
    icon: <Star className="text-garden-400" size={28} />
  },
  {
    name: 'Cyber-Garden Prime',
    monthlyPrice: 14999,
    annualPrice: 11999,
    description: 'Total domination package for multi-outlet brands.',
    features: [
      'Everything in Core',
      'ShopSmart-Vision AI Insights',
      'Professional Monthly Reel',
      'Local SEO Boost',
      'Priority Support (Feet-on-Street)'
    ],
    cta: 'Go Prime',
    recommended: false,
    color: 'from-pink-400 to-purple-600',
    textColor: 'text-pink-400',
    glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]',
    borderFocus: 'group-hover:border-pink-400/50',
    icon: <Shield className="text-pink-400" size={28} />
  }
];

const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-cyber-950/30 backdrop-blur-lg relative overflow-hidden border-t border-white/5">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[40%] w-96 h-96 bg-garden-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-mono mb-6 backdrop-blur-sm">
            <Sparkles size={16} className="text-yellow-400" />
            <span>Transparent Pricing. No Hidden Fees.</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-garden-400 to-cyan-400">Subscription</span> Menu
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            High-volume "Lean" model designed for Bellandur margins. Choose the cognitive leverage your business needs.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-bold tracking-wider uppercase ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-20 h-10 rounded-full bg-cyber-900 border border-white/20 p-1 transition-colors hover:border-white/40"
            >
              <div 
                className={`w-8 h-8 rounded-full bg-gradient-to-r from-garden-400 to-cyan-400 transition-transform duration-300 shadow-lg ${isAnnual ? 'translate-x-10' : 'translate-x-0'}`}
              ></div>
            </button>
            <span className={`text-sm font-bold tracking-wider uppercase flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
              Annually <span className="bg-garden-500/20 text-garden-400 text-[10px] px-2 py-1 rounded-full border border-garden-500/30">SAVE 20%</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-5 py-3 rounded-xl text-sm border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
            <Info size={18} />
            <span><strong>Bellandur Founders' Discount:</strong> Lifetime 20% off for the first 10 merchants.</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {tiers.map((tier, index) => (
            <div 
              key={tier.name} 
              className={`group relative rounded-3xl p-8 transition-all duration-500 backdrop-blur-xl bg-cyber-900/40 border border-white/10 ${tier.borderFocus} ${tier.glow} ${
                tier.recommended ? 'md:-translate-y-4 scale-105 z-20 bg-cyber-800/60' : 'hover:-translate-y-2 z-10'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Top Gradient Line */}
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${tier.color} rounded-t-3xl opacity-80 group-hover:opacity-100 transition-opacity`}></div>

              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-garden-400 to-emerald-600 text-cyber-950 font-bold px-4 py-1 rounded-full text-xs tracking-widest uppercase shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-400 text-sm h-10">{tier.description}</p>
                </div>
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${tier.textColor}`}>
                  {tier.icon}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-gray-400 text-2xl">₹</span>
                  <span className="text-5xl font-bold text-white tracking-tight">
                    {(isAnnual ? tier.annualPrice : tier.monthlyPrice).toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-500 ml-1">/mo</span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-garden-400 mt-2 font-mono">
                    Billed ₹{(tier.annualPrice * 12).toLocaleString('en-IN')} yearly
                  </div>
                )}
                {!isAnnual && (
                  <div className="text-sm text-transparent mt-2 font-mono select-none">
                    Spacer
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-10">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 rounded-full p-0.5 ${tier.recommended ? 'bg-garden-500/20 text-garden-400' : 'bg-white/10 text-gray-300 group-hover:' + tier.textColor + ' group-hover:bg-white/20'} transition-colors`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-gray-300 text-sm leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to={PageRoute.CONTACT}
                className={`block w-full text-center py-4 rounded-xl font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                  tier.recommended 
                    ? `bg-gradient-to-r ${tier.color} text-cyber-950 hover:shadow-lg hover:scale-[1.02]` 
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                }`}
              >
                {tier.cta}
                <ArrowRight size={18} className={tier.recommended ? 'group-hover:translate-x-1 transition-transform' : ''} />
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ / Trust Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-cyber-800/50 to-cyber-900/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-garden-500/50 to-transparent"></div>
            
            <h3 className="text-3xl font-bold text-white mb-6">Why no setup fee?</h3>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              We offer <span className="text-white font-semibold">"Zero-Down" Onboarding</span> for the first 90 days. We believe in Subscription over CapEx. We don't want your 2 Lakhs upfront; we want to be your growth partner for the next 5 years.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-6 bg-black/20 rounded-2xl border border-white/5">
                <Shield className="text-garden-400 mb-4" size={24} />
                <h4 className="text-white font-bold mb-2">Cancel Anytime</h4>
                <p className="text-sm text-gray-500">No long-term lock-ins. If we don't deliver value, you can leave with your data.</p>
              </div>
              <div className="p-6 bg-black/20 rounded-2xl border border-white/5">
                <Zap className="text-cyan-400 mb-4" size={24} />
                <h4 className="text-white font-bold mb-2">Instant Setup</h4>
                <p className="text-sm text-gray-500">Our field engineers deploy the system in your store within 24 hours.</p>
              </div>
              <div className="p-6 bg-black/20 rounded-2xl border border-white/5">
                <Star className="text-pink-400 mb-4" size={24} />
                <h4 className="text-white font-bold mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-500">Direct WhatsApp line to our Bellandur-based engineering team.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricingSection;