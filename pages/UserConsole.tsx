import React, { useState } from 'react';
import { db, collection, query, where, getDocs, orderBy, limit } from '../services/firebase';
import { Search, Loader2, CheckCircle, Clock, AlertCircle, ArrowRight, Shield, Zap, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import PaymentPortal from '../components/PaymentPortal';
import { updateDoc, doc } from '../services/firebase';

interface RegistrationData {
  businessName: string;
  ownerName: string;
  status: string;
  paymentStatus?: string;
  utr?: string;
  timestamp: any;
}

const UserConsole: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RegistrationData | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setSearched(true);
    setResult(null);

    try {
      const q = query(
        collection(db, 'registrations'),
        where('email', '==', email.toLowerCase().trim()),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setResult(querySnapshot.docs[0].data() as RegistrationData);
      } else {
        toast.error('No registration found for this email address.');
      }
    } catch (err) {
      console.error('Error tracking status:', err);
      toast.error('Failed to fetch status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (utr: string) => {
    if (!result || !email) return;
    
    setLoading(true);
    try {
      const q = query(
        collection(db, 'registrations'),
        where('email', '==', email.toLowerCase().trim()),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        await updateDoc(doc(db, 'registrations', docId), {
          utr,
          paymentStatus: 'pending_verification'
        });
        
        toast.success('UTR submitted for verification');
        // Refresh result
        setResult({
          ...result,
          utr,
          paymentStatus: 'pending_verification'
        });
      }
    } catch (err) {
      console.error('Error updating payment:', err);
      toast.error('Failed to submit payment details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status: string, paymentStatus?: string) => {
    if (paymentStatus === 'pending_verification') {
      return {
        label: 'Payment Pending Verification',
        icon: <Clock className="text-yellow-400" size={32} />,
        color: 'text-yellow-400',
        desc: 'Your ₹100 token has been received. Our finance team is verifying the UTR.'
      };
    }
    if (paymentStatus === 'verified' && status === 'pending') {
      return {
        label: 'Node Synchronized',
        icon: <CheckCircle className="text-garden-400" size={32} />,
        color: 'text-garden-400',
        desc: 'Payment verified. A Field Engineer will contact you for the on-site audit.'
      };
    }
    
    switch (status) {
      case 'contacted':
        return {
          label: 'Engineer Assigned',
          icon: <Zap className="text-neon-cyan" size={32} />,
          color: 'text-neon-cyan',
          desc: 'A Field Engineer has been assigned to your node audit.'
        };
      case 'audited':
        return {
          label: 'Grid Active',
          icon: <Shield className="text-neon-blue" size={32} />,
          color: 'text-neon-blue',
          desc: 'Audit complete. Your business is now a live node in the Ooru Logix grid.'
        };
      case 'rejected':
        return {
          label: 'Synchronization Failed',
          icon: <AlertCircle className="text-red-400" size={32} />,
          color: 'text-red-400',
          desc: 'The registration could not be processed at this time.'
        };
      default:
        return {
          label: 'Registration Received',
          icon: <Clock className="text-gray-400" size={32} />,
          color: 'text-gray-400',
          desc: 'Your application is in the queue. Complete payment to move to verification.'
        };
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-cyber-950 relative overflow-hidden px-4">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[128px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-mono mb-4">
            <Search size={12} />
            NODE_STATUS_TRACKER v1.0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Track Your <span className="text-neon-cyan">Grid Status</span></h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Enter your registered email address to monitor the synchronization status of your business node.
          </p>
        </div>

        <div className="glass-panel rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl bg-cyber-900/40 backdrop-blur-xl">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1 relative group">
              <input 
                id="emailTrack"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email..."
                aria-label="Email address to track status"
                className="w-full py-4 px-6 bg-cyber-950 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan transition-all group-hover:border-white/20"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-neon-cyan hover:bg-cyan-400 text-black font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.2)] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/50"
              aria-label={loading ? 'Tracking status...' : 'Track Status'}
            >
              {loading ? <Loader2 className="animate-spin" size={20} aria-hidden="true" /> : <Zap size={20} aria-hidden="true" />}
              TRACK_STATUS
            </button>
          </form>

          {searched && !loading && result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/5 border border-white/10 rounded-3xl">
                <div className="w-24 h-24 rounded-full bg-cyber-950 flex items-center justify-center border border-white/5 shadow-inner">
                  {getStatusDisplay(result.status, result.paymentStatus).icon}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-white">{result.businessName}</h3>
                    <span className={`text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-1 bg-white/5 rounded border border-white/5 ${getStatusDisplay(result.status, result.paymentStatus).color}`}>
                      {getStatusDisplay(result.status, result.paymentStatus).label}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {getStatusDisplay(result.status, result.paymentStatus).desc}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-white/5 pt-4">
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase">Guardian</p>
                      <p className="text-xs text-white">{result.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase">UTR Sync</p>
                      <p className="text-xs text-neon-cyan font-mono">{result.utr || 'Pending'}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-[10px] text-gray-500 font-mono uppercase">Enrolled On</p>
                      <p className="text-xs text-white">
                        {result.timestamp?.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Section for unpaid nodes */}
              {result.paymentStatus !== 'verified' && result.paymentStatus !== 'pending_verification' && !result.utr && (
                <div className="mt-8 animate-in zoom-in duration-500">
                  <div className="flex items-center gap-2 mb-6 px-4">
                    <div className="w-1 h-1 rounded-full bg-neon-pink"></div>
                    <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-neon-pink">Action Required: Node Activation</h4>
                  </div>
                  <PaymentPortal 
                    businessName={result.businessName} 
                    onPaymentSubmitted={handlePaymentSubmit} 
                  />
                </div>
              )}

              {/* Progress Stepper */}
              <div className="mt-12">
                <div className="flex items-center justify-between px-4 mb-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500">Synchronization Pipeline</h4>
                  <span className="text-[10px] text-neon-cyan font-mono">ENCRYPTED_STREAM</span>
                </div>
                <div className="relative flex justify-between">
                  {/* Line */}
                  <div className="absolute top-5 left-0 w-full h-[1px] bg-white/5 -z-10"></div>
                  
                  {[
                    { label: 'Register', active: true },
                    { label: 'Payment', active: !!result.utr },
                    { label: 'Audit', active: result.status === 'audited' || result.status === 'contacted' },
                    { label: 'Active', active: result.status === 'audited' }
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        step.active ? 'bg-neon-cyan border-neon-cyan text-black shadow-[0_0_15px_rgba(0,255,255,0.3)]' : 'bg-cyber-950 border-white/10 text-gray-600'
                      }`}>
                        {step.active ? <CheckCircle size={20} /> : <Clock size={20} />}
                      </div>
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${step.active ? 'text-white' : 'text-gray-600'}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {searched && !loading && !result && (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-white font-bold mb-2">Node Not Found</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                We couldn't find any registration for <span className="text-white">{email}</span>. Please verify your email or register your business.
              </p>
              <button 
                onClick={() => window.location.href = '#/contact'}
                className="mt-6 text-neon-cyan hover:underline hover:text-cyan-400 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan rounded px-2 py-1"
                aria-label="Go to Registration Page"
              >
                Go to Registration <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <MapPin className="text-garden-500 mb-4" size={24} />
              <h4 className="text-white font-bold mb-2 text-sm">On-Site Audits</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed">Field engineers operate within 5km of Bellandur ORR for minimum latency.</p>
           </div>
           <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <AlertCircle className="text-neon-purple mb-4" size={24} />
              <h4 className="text-white font-bold mb-2 text-sm">Need Assistance?</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed">Reach out to <span className="text-white">support@oorulogix.com</span> if your status remains {"'"}Pending{"'"} for &gt;24h.</p>
           </div>
           <div className="p-6 bg-neon-cyan/10 border border-neon-cyan/20 rounded-2xl">
              <Zap className="text-neon-cyan mb-4" size={24} />
              <h4 className="text-neon-cyan font-bold mb-2 text-sm">Priority Access</h4>
              <p className="text-[10px] text-cyan-400 leading-relaxed">Verified payments move to the top of the synchronization queue automatically.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserConsole;
