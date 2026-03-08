import React, { useState } from 'react';
import { ShieldCheck, CheckCircle, Users, TrendingUp, Zap, Clock, ArrowRight, Shield, Loader2, CreditCard } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp } from '../services/firebase';
import toast from 'react-hot-toast';
import PaymentPortal from '../components/PaymentPortal';

const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    merchantType: 'Cafe / QSR (Quick Service)',
    currentPos: 'None',
    dailyOrders: '0-50',
    challenges: '',
    foundersDiscount: false,
    agreedToAudit: false
  });

  const handleStepOneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async (utr: string) => {
    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'registrations'), {
        ...formData,
        utr,
        amountPaid: 100,
        paymentStatus: 'pending_verification',
        timestamp: serverTimestamp(),
        status: 'pending',
        mandatoryChecks: {
          phoneVerified: false,
          addressVerified: false,
          kycUploaded: false,
          termsAgreed: formData.agreedToAudit,
          siteSurveyDone: false
        },
        communicationLog: [{
          date: new Date().toISOString(),
          message: 'Node initialization handshake received. Awaiting manual logic audit.',
          type: 'system',
          sender: 'OORU_LOGIX_HUB'
        }]
      });
      setSubmitted(true);
      toast.success('Registration and payment submitted successfully');
    } catch (err) {
      console.error('Error saving registration:', err);
      setError('Failed to synchronize node. Please check your connection and try again.');
      toast.error('Failed to submit registration');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [id]: val
    }));
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-cyber-950 px-4">
        <div className="text-center max-w-lg animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-garden-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-garden-400 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Node Synchronized</h2>
          <p className="text-xl text-gray-400 mb-8">
            Your registration and ₹100 activation token have been received. A Field Engineer will contact you within 24 hours to schedule your audit.
          </p>
          <div className="p-4 bg-cyber-900 border border-white/10 rounded-xl mb-8">
            <p className="text-sm text-gray-500 font-mono">
              TRANSACTION_ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </p>
          </div>
          <button 
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
            className="text-garden-400 hover:text-white underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-garden-500 rounded px-2"
            aria-label="Register another business node"
          >
            Register another business node
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-cyber-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-garden-500/5 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[128px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-garden-500/10 border border-garden-500/20 text-garden-400 text-[10px] font-mono mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-garden-500 animate-pulse"></span>
                GRID ENROLLMENT OPEN
              </div>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Join the Unified <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-garden-400 to-cyan-400">Intelligence Grid</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                The goal is 100% penetration in Green Glen Layout. Don't be the last "Dark Node" on the street. Synchronize your business with the Ooru Logix ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <TrendingUp size={20}/>, title: "Revenue Leakage Audit", desc: "Identify 15-20% hidden losses in your current ops." },
                { icon: <Shield size={20}/>, title: "DPDP 2026 Readiness", desc: "Full compliance check for upcoming data laws." },
                { icon: <Zap size={20}/>, title: "Inventory Burn Logic", desc: "Predictive stock depletion models for your SKU." },
                { icon: <Users size={20}/>, title: "Priority Access", desc: "First-mover advantage in the Bellandur network." }
              ].map((benefit, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-garden-500/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-garden-500/10 flex items-center justify-center text-garden-400 mb-4 group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <h3 className="text-white font-bold mb-2">{benefit.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-3">
                  {[
                    { bg: 'bg-neon-cyan', icon: 'B' },
                    { bg: 'bg-neon-purple', icon: 'K' },
                    { bg: 'bg-neon-pink', icon: 'I' },
                    { bg: 'bg-garden-500', icon: 'H' }
                  ].map((user, i) => (
                    <div 
                      key={i}
                      className={`w-10 h-10 rounded-full border-2 border-cyber-950 flex items-center justify-center text-cyber-950 font-bold ${user.bg}`}
                    >
                      {user.icon}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  <strong className="text-white">50+ Merchants</strong> already synchronized in Bellandur.
                </p>
              </div>
              <div className="p-4 bg-garden-500/5 border border-garden-500/20 rounded-xl">
                <p className="text-xs text-garden-400 italic">
                  "Ooru Logix didn't just give us software; they gave us a competitive edge we didn't know we were missing." — <span className="font-bold">Owner, Green Glen Cafe</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Urgency Badge */}
            <div className="absolute -top-4 -right-4 z-20 bg-neon-pink text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
              3 SLOTS LEFT THIS WEEK
            </div>

            <div className="bg-cyber-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-garden-500 to-cyan-500"></div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Request System Audit</h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <p className="text-sm text-gray-500">Enter your credentials to begin synchronization.</p>
                  <a href="#/track" className="text-[10px] font-mono text-neon-cyan hover:underline hover:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                    Already registered? Track Node <ArrowRight size={10} />
                  </a>
                </div>
              </div>

              {step === 1 ? (
                <form onSubmit={handleStepOneSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
                      {error}
                    </div>
                  )}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="businessName" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Business Entity Name</label>
                      <input 
                        type="text" 
                        id="businessName" 
                        required
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-garden-500 focus:ring-1 focus:ring-garden-500 transition-colors placeholder:text-gray-700"
                        placeholder="e.g. Bellandur Gourmet Labs"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ownerName" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Node Guardian (Owner)</label>
                        <input 
                          type="text" 
                          id="ownerName" 
                          required
                          value={formData.ownerName}
                          onChange={handleInputChange}
                          className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-garden-500 focus:ring-1 focus:ring-garden-500 transition-colors"
                          placeholder="Full Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Comm Link (Phone)</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-garden-500 transition-colors"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Network Identity (Email)</label>
                        <input 
                          type="email" 
                          id="email" 
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-garden-500 transition-colors"
                          placeholder="owner@business.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="merchantType" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Merchant Classification</label>
                        <select 
                          id="merchantType"
                          value={formData.merchantType}
                          onChange={handleInputChange}
                          className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-garden-500 focus:ring-1 focus:ring-garden-500 transition-colors appearance-none"
                        >
                          <option>Cafe / QSR (Quick Service)</option>
                          <option>Gym / Fitness Studio</option>
                          <option>Retail / Boutique</option>
                          <option>Pharmacy / Medical</option>
                          <option>Cloud Kitchen</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Physical Node Location (Address)</label>
                      <input 
                        type="text" 
                        id="address" 
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-garden-500 transition-colors placeholder:text-gray-700"
                        placeholder="Street Address, Green Glen Layout"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="currentPos" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Current POS System</label>
                        <select 
                          id="currentPos"
                          value={formData.currentPos}
                          onChange={handleInputChange}
                          className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-garden-500 transition-colors appearance-none"
                        >
                          <option>None (Pen & Paper)</option>
                          <option>Petpooja</option>
                          <option>DotPe</option>
                          <option>Pine Labs</option>
                          <option>Custom/Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="dailyOrders" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Avg. Daily Transactions</label>
                        <select 
                          id="dailyOrders"
                          value={formData.dailyOrders}
                          onChange={handleInputChange}
                          className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-garden-500 transition-colors appearance-none"
                        >
                          <option>0 - 50</option>
                          <option>51 - 150</option>
                          <option>151 - 300</option>
                          <option>300+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="challenges" className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Primary Operational Challenges (Optional)</label>
                      <textarea 
                        id="challenges" 
                        rows={3}
                        value={formData.challenges}
                        onChange={handleInputChange as any}
                        className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-garden-500 focus:ring-1 focus:ring-garden-500 transition-colors placeholder:text-gray-700 resize-none"
                        placeholder="e.g. Inventory tracking is a mess, high staff turnover..."
                      ></textarea>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                      <label className="flex items-center gap-3 text-sm text-gray-400 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          id="foundersDiscount"
                          checked={formData.foundersDiscount}
                          onChange={handleInputChange}
                          className="w-4 h-4 rounded bg-cyber-950 border-white/10 text-garden-500 focus:ring-garden-500" 
                        />
                        <span className="group-hover:text-white transition-colors">Apply "Bellandur Founders' Discount" (20% Lifetime)</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm text-gray-400 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          id="agreedToAudit"
                          required 
                          checked={formData.agreedToAudit}
                          onChange={handleInputChange}
                          className="w-4 h-4 rounded bg-cyber-950 border-white/10 text-garden-500 focus:ring-garden-500" 
                        />
                        <span className="group-hover:text-white transition-colors">I agree to the 15-min on-site System Audit.</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-garden-500 hover:bg-garden-400 text-cyber-950 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(16,185,129,0.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-garden-500/50"
                  >
                    CONTINUE TO ACTIVATION <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                  
                  <div className="flex items-center justify-center gap-4 text-[10px] text-gray-600 font-mono">
                    <span className="flex items-center gap-1"><ShieldCheck size={10}/> SECURE_SSL</span>
                    <span className="flex items-center gap-1"><Clock size={10}/> 24H_RESPONSE</span>
                  </div>
                </form>
              ) : (
                <PaymentPortal 
                  businessName={formData.businessName} 
                  onPaymentSubmitted={handleFinalSubmit} 
                />
              )}
            </div>
          </div>

        </div>
        
        {/* Local SEO Serving Areas */}
        <div className="mt-16 text-center opacity-40 hover:opacity-100 transition-opacity pb-10">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-6 border-t border-white/5 pt-10">
            &gt; SERVING_ACTIVE_NODES_IN: 
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-mono text-[9px] text-gray-400">
            <span>JP_NAGAR</span>
            <span>BELLANDUR</span>
            <span>JAYANAGAR</span>
            <span>WHITEFIELD</span>
            <span>HSR_LAYOUT</span>
            <span>KORAMANGALA</span>
          </div>
        </div>

      </div>
    </div>
  );
};


export default Contact;