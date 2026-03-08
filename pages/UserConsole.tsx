import React, { useState } from 'react';
import { db, collection, query, where, getDocs, orderBy, limit, updateDoc, doc } from '../services/firebase';
import { 
  Search, Loader2, CheckCircle, Clock, AlertCircle, 
  ArrowRight, Shield, Zap, MapPin, MessageSquare, 
  Terminal, User, Activity, Code 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import PaymentPortal from '../components/PaymentPortal';
import { Registration, PageRoute } from '../types';

const UserConsole: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Registration | null>(null);
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
        setResult({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as Registration);
      } else {
        toast.error('No node found with this email signature.');
      }
    } catch (err) {
      console.error('Error tracking status:', err);
      toast.error('Sync error. Please re-authenticate.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (utr: string) => {
    if (!result || !email) return;
    
    setLoading(true);
    try {
      const docId = result.id;
      await updateDoc(doc(db, 'registrations', docId), {
        utr,
        paymentStatus: 'pending_verification'
      });
      
      toast.success('UTR broadcasted to finance nodes');
      setResult({
        ...result,
        utr,
        paymentStatus: 'pending_verification'
      });
    } catch (err) {
      console.error('Error updating payment:', err);
      toast.error('Transaction broadcast failed');
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status: string, paymentStatus?: string) => {
    if (paymentStatus === 'pending_verification') {
      return {
        label: 'Payment Verifying',
        icon: <Activity className="text-yellow-400 animate-pulse" size={32} />,
        color: 'text-yellow-400',
        desc: 'UTR received. Core system is validating transaction against banking grid.'
      };
    }
    if (paymentStatus === 'verified' && status === 'pending') {
      return {
        label: 'Node Synchronized',
        icon: <CheckCircle className="text-garden-400" size={32} />,
        color: 'text-garden-400',
        desc: 'Verification complete. A Field Engineer will engage for on-site protocol.'
      };
    }
    
    switch (status) {
      case 'contacted':
        return {
          label: 'Engineer Assigned',
          icon: <Zap className="text-neon-cyan" size={32} />,
          color: 'text-neon-cyan',
          desc: 'High-priority engagement. An engineer is inbound for node audit.'
        };
      case 'audited':
        return {
          label: 'Grid Active',
          icon: <Shield className="text-neon-blue" size={32} />,
          color: 'text-neon-blue',
          desc: 'Synchronization complete. Your business is now a live logic node.'
        };
      case 'rejected':
        return {
          label: 'Link Severed',
          icon: <AlertCircle className="text-red-400" size={32} />,
          color: 'text-red-400',
          desc: 'Node synchronization failed compliance checks.'
        };
      default:
        return {
          label: 'Signature Found',
          icon: <Clock className="text-gray-400" size={32} />,
          color: 'text-gray-400',
          desc: 'Initial handshake successful. Awaiting activation payment.'
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
            <Terminal size={12} />
            GRID_PROTOCOL_TRACKER v2.0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Node <span className="text-neon-cyan">Sync Tracking</span></h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Input your registered email signature to monitor real-time synchronization with the Ooru Logix mainframe.
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
                placeholder="Enter email signature..."
                className="w-full py-4 px-6 bg-cyber-950 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all group-hover:border-white/20 font-mono text-sm"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-neon-cyan hover:bg-cyan-400 text-black font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.2)] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
              INTIATE_PULL
            </button>
          </form>

          {searched && !loading && result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Primary Status Card */}
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
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 font-mono">
                    {getStatusDisplay(result.status, result.paymentStatus).desc}
                  </p>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-white/5 pt-4">
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase">Guardian</p>
                      <p className="text-xs text-white">{result.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase">Node ID</p>
                      <p className="text-xs text-neon-cyan font-mono truncate max-w-[100px]">{result.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase">Type</p>
                      <p className="text-xs text-white uppercase">{result.merchantType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase">Engineer</p>
                      <p className="text-xs text-white font-mono">{result.assignedEngineer || 'UNASSIGNED'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signal Hub */}
              <div className="p-6 bg-cyber-950 border border-white/5 rounded-3xl">
                 <div className="flex items-center gap-2 mb-4">
                    <Zap size={14} className="text-neon-cyan" />
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Signal Hub</h4>
                 </div>
                 <div className="flex gap-3">
                    <input 
                       id="signalMsg"
                       type="text" 
                       placeholder="Send a status signal to the hub..."
                       className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-neon-cyan"
                       onKeyDown={async (e) => {
                         if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value;
                            if (!val) return;
                            
                            try {
                               const updatedLog = [
                                 ...(result.communicationLog || []),
                                 {
                                   date: new Date().toISOString(),
                                   message: val,
                                   type: 'whatsapp' as any,
                                   sender: 'NODE_GUARDIAN'
                                 }
                               ];
                               await updateDoc(doc(db, 'registrations', result.id), {
                                 communicationLog: updatedLog
                               });
                               toast.success('Signal broadcasted');
                               setResult({...result, communicationLog: updatedLog});
                               (e.target as HTMLInputElement).value = '';
                            } catch (err) {
                               toast.error('Signal lost');
                            }
                         }
                       }}
                    />
                    <button 
                       onClick={() => {
                          const input = document.getElementById('signalMsg') as HTMLInputElement;
                          input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                       }}
                       className="px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan rounded-xl text-[10px] font-mono hover:bg-neon-cyan hover:text-black transition-all"
                    >
                       SEND_SIGNAL
                    </button>
                 </div>
                 <p className="text-[9px] text-gray-600 font-mono mt-3 uppercase italic">Direct encrypted channel to Field Engineering.</p>
              </div>

              {/* Admin Feedback / Stream */}
              {(result.feedbackToUser || (result.communicationLog && result.communicationLog.length > 0)) && (
                <div className="p-8 bg-neon-cyan/5 border border-neon-cyan/20 rounded-3xl">
                   <div className="flex items-center gap-2 mb-4">
                      <MessageSquare size={16} className="text-neon-cyan" />
                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neon-cyan">Mainframe Comms Log</h4>
                   </div>
                   {result.feedbackToUser && (
                     <div className="mb-6 pb-6 border-b border-neon-cyan/10">
                        <p className="text-sm text-gray-300 leading-relaxed italic">
                          "{result.feedbackToUser}"
                        </p>
                        <span className="text-[9px] font-mono text-neon-cyan/60 uppercase mt-2 block">Direct Command from Admin Terminal</span>
                     </div>
                   )}
                   <div className="space-y-3">
                      {result.communicationLog?.slice(-3).map((log, i) => (
                        <div key={i} className="flex gap-3 text-[11px] font-mono">
                           <span className="text-gray-600">[{new Date(log.date).toLocaleTimeString()}]</span>
                           <span className="text-neon-cyan">SYS_MSG:</span>
                           <span className="text-gray-400">{log.message}</span>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {/* Mandatory Checks Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                   <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                     <Code size={12} /> Compliance Checklist
                   </h4>
                   <div className="space-y-3">
                      {[
                        { label: 'Identity Auth', key: 'phoneVerified' },
                        { label: 'Geo Mapping', key: 'addressVerified' },
                        { label: 'KYC Sync', key: 'kycUploaded' },
                        { label: 'Site Audit', key: 'siteSurveyDone' }
                      ].map((check) => (
                        <div key={check.key} className="flex items-center justify-between">
                           <span className="text-xs text-gray-400">{check.label}</span>
                           {result.mandatoryChecks?.[check.key as keyof typeof result.mandatoryChecks] ? (
                             <CheckCircle size={14} className="text-garden-500" />
                           ) : (
                             <Clock size={14} className="text-gray-700" />
                           )}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Terminal size={64} />
                   </div>
                   <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                     <Activity size={12} /> Operational Specs
                   </h4>
                   <div className="space-y-3">
                      <div className="flex justify-between">
                         <span className="text-xs text-gray-400">Audit Score</span>
                         <span className="text-xs font-bold text-white">{result.auditScore || 0}/100</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-xs text-gray-400">UTR Signal</span>
                         <span className="text-xs font-mono text-neon-cyan">{result.utr ? 'LOCKED' : 'AWAITING'}</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-xs text-gray-400">Last Sync</span>
                         <span className="text-[10px] font-mono text-gray-500">
                           {result.lastUpdated ? new Date(result.lastUpdated.toDate()).toLocaleString() : 'System Boot'}
                         </span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Payment Section for unpaid nodes */}
              {result.paymentStatus !== 'verified' && result.paymentStatus !== 'pending_verification' && !result.utr && (
                <div className="mt-8 animate-in zoom-in duration-500">
                  <div className="flex items-center gap-2 mb-6 px-4">
                    <div className="w-1 h-1 rounded-full bg-neon-pink"></div>
                    <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-neon-pink">Action Required: Engagement Payment</h4>
                  </div>
                  <PaymentPortal 
                    businessName={result.businessName} 
                    onPaymentSubmitted={handlePaymentSubmit} 
                  />
                </div>
              )}

            </div>
          )}

          {searched && !loading && !result && (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-white font-bold mb-2">Node Handshake Failed</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Email signature <span className="text-white">{email}</span> not found in active grid clusters.
              </p>
              <button 
                onClick={() => window.location.href = '#/register'}
                className="mt-6 text-neon-cyan hover:underline hover:text-cyan-400 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
              >
                Register Business Node <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserConsole;
