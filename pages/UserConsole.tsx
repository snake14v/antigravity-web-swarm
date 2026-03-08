import React, { useState, useEffect } from 'react';
import { db, collection, query, where, getDocs, orderBy, limit, updateDoc, doc, onSnapshot } from '../services/firebase';
import { 
  Search, Loader2, CheckCircle, Clock, AlertCircle, 
  ArrowRight, Shield, Zap, MapPin, MessageSquare, 
  Terminal, User as UserIcon, Activity, Code, List, Lock, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import PaymentPortal from '../components/PaymentPortal';
import { Registration, PageRoute } from '../types';
import { useAuth } from '../context/AuthContext';

const UserConsole: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<Registration | null>(null);
  const [noAppFound, setNoAppFound] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    setNoAppFound(false);

    // Use onSnapshot for real-time updates from administrative changes
    const q = query(
      collection(db, 'registrations'),
      where('email', '==', user.email.toLowerCase().trim()),
      orderBy('timestamp', 'desc'),
      limit(1)
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        setResult({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as Registration);
        setNoAppFound(false);
      } else {
        setResult(null);
        setNoAppFound(true);
      }
      setLoading(false);
    }, (err) => {
      console.error('Error tracking status:', err);
      toast.error('Sync error. Mainframe connection interrupted.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handlePaymentSubmit = async (utr: string) => {
    if (!result || !user?.email) return;
    
    setLoading(true);
    try {
      const docId = result.id;
      // Also add a log entry for the user
      const updatedLog = [
        ...(result.communicationLog || []),
        {
          date: new Date().toISOString(),
          message: `UTR Signal Sent: ${utr}. Awaiting finance verification.`,
          type: 'system' as any,
          sender: 'NODE_GUARDIAN'
        }
      ];

      await updateDoc(doc(db, 'registrations', docId), {
        utr,
        paymentStatus: 'pending_verification',
        communicationLog: updatedLog,
        lastUpdated: new Date()
      });
      
      toast.success('UTR broadcasted to finance nodes');
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

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-mono mb-4">
            <Terminal size={12} />
            GRID_PROTOCOL_TRACKER v2.0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">System <span className="text-neon-cyan">Sync Dashboard</span></h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Secure session for <span className="text-white font-mono">{user?.email}</span>. Real-time parity with Ooru Logix Mainframe.
          </p>
        </div>

        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-gray-500">
            <Loader2 className="animate-spin mb-4 text-neon-cyan" size={48} />
            <p className="font-mono text-xs uppercase tracking-widest animate-pulse">Requesting Node Status...</p>
          </div>
        ) : noAppFound ? (
          <div className="glass-panel rounded-3xl border border-white/10 p-12 text-center animate-in fade-in duration-500 bg-cyber-900/40 backdrop-blur-xl">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-600">
              <Lock size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Active Application</h3>
            <p className="text-gray-400 max-w-sm mx-auto mb-8 font-mono text-sm">
              Your account is verified, but we haven't found a grid registration for this email. 
              Initiate a node sync to join the network.
            </p>
            <button 
              onClick={() => window.location.href = '#/register'}
              className="bg-neon-cyan hover:bg-cyan-400 text-black font-bold py-4 px-10 rounded-2xl transition-all shadow-[0_0_20px_rgba(0,255,255,0.2)]"
            >
              REGISTER BUSINESS NODE
            </button>
          </div>
        ) : result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Primary Status Card */}
            <div className="glass-panel rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl bg-cyber-900/40 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-32 h-32 rounded-full bg-cyber-950 flex items-center justify-center border border-white/5 shadow-inner relative">
                  <div className="absolute inset-0 rounded-full border border-neon-cyan/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                  {getStatusDisplay(result.status, result.paymentStatus).icon}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                    <h3 className="text-3xl font-bold text-white tracking-tight">{result.businessName}</h3>
                    <div className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-white/5 rounded-full border border-white/5 ${getStatusDisplay(result.status, result.paymentStatus).color}`}>
                      {getStatusDisplay(result.status, result.paymentStatus).label}
                    </div>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed mb-6 font-mono opacity-80">
                    {getStatusDisplay(result.status, result.paymentStatus).desc}
                  </p>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-white/5 pt-6">
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">Guardian</p>
                      <p className="text-sm text-white font-medium">{result.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">Node ID</p>
                      <p className="text-sm text-neon-cyan font-mono truncate">{result.id.substring(0, 12)}...</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">Grid Area</p>
                      <p className="text-sm text-white uppercase">{result.address.split(',')[0]}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">Field Eng.</p>
                      <p className="text-sm text-white font-mono">{result.assignedEngineer || 'SEARCHING...'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Progress Tracking */}
              <div className="mt-12 pt-10 border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Comms Log Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                        <MessageSquare size={14} className="text-neon-cyan" /> Mainframe_Log Stream
                      </h4>
                      <span className="text-[9px] text-neon-cyan italic animate-pulse">ENCRYPTED</span>
                    </div>
                    <div className="bg-cyber-950/80 border border-white/5 rounded-2xl p-6 h-64 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                       {result.feedbackToUser && (
                         <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/10 rounded-xl mb-4 text-sm text-neon-cyan italic leading-relaxed">
                            " {result.feedbackToUser} "
                            <span className="block text-[10px] font-mono mt-2 opacity-60">ADMIN_DIRECTIVE_LOCKED</span>
                         </div>
                       )}
                       {(!result.communicationLog || result.communicationLog.length === 0) ? (
                         <p className="text-[10px] font-mono text-gray-700 text-center py-10 italic">Initializing stream...</p>
                       ) : (
                         result.communicationLog.slice().reverse().map((log, i) => (
                           <div key={i} className={`flex flex-col ${log.sender === 'NODE_GUARDIAN' ? 'items-end' : 'items-start'}`}>
                             <div className={`max-w-[90%] p-3 rounded-2xl text-[11px] leading-relaxed ${
                               log.sender === 'NODE_GUARDIAN' ? 'bg-white/5 text-gray-400 rounded-tr-none' : 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded-tl-none'
                             }`}>
                               {log.message}
                             </div>
                             <span className="text-[8px] font-mono text-gray-600 mt-1 uppercase">
                               {log.sender === 'NODE_GUARDIAN' ? 'YOU' : 'HUB'} // {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                             </span>
                           </div>
                         ))
                       )}
                    </div>
                    
                    {/* Interaction Hub */}
                    <div className="flex gap-2">
                       <input 
                         id="signalMsg"
                         type="text" 
                         placeholder="Broadcast sync request to terminal..."
                         className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-neon-cyan font-mono"
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
                                 communicationLog: updatedLog,
                                 lastUpdated: new Date()
                               });
                               (e.target as HTMLInputElement).value = '';
                             } catch (err) {
                               toast.error('Signal drop. Retry.');
                             }
                           }
                         }}
                       />
                       <button 
                         onClick={() => {
                           const input = document.getElementById('signalMsg') as HTMLInputElement;
                           input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                         }}
                         className="p-2 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded-xl hover:bg-neon-cyan hover:text-black transition-all"
                       >
                         <Zap size={18} />
                       </button>
                    </div>
                  </div>

                  {/* Operational Tracker */}
                  <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                       <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                         <Code size={14} className="text-neon-cyan" /> Grid Pipeline Progression
                       </h4>
                       <div className="space-y-5">
                          {[
                            { label: 'Register Node', active: true, desc: 'Initial handshake complete.' },
                            { label: 'Payment Sync', active: result.paymentStatus === 'verified' || !!result.utr, desc: 'Awaiting verify' },
                            { label: 'Site Protocol', active: result.status === 'audited' || result.status === 'contacted', desc: 'Eng. inbound' },
                            { label: 'Live Node', active: result.status === 'audited', desc: 'Sync finalized' }
                          ].map((step, i) => (
                            <div key={i} className="flex items-start gap-4">
                               <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0 ${
                                 step.active ? 'bg-neon-cyan border-neon-cyan text-black' : 'border-white/10 text-gray-600'
                               }`}>
                                 {step.active ? <CheckCircle size={12} /> : <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>}
                               </div>
                               <div>
                                  <p className={`text-xs font-bold uppercase tracking-wide ${step.active ? 'text-white' : 'text-gray-600'}`}>
                                    {step.label}
                                  </p>
                                  <p className="text-[10px] text-gray-500 italic font-mono">{step.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="bg-neon-cyan/5 border border-neon-cyan/10 rounded-2xl p-6 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-5">
                          <Activity size={80} />
                       </div>
                       <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-gray-500 mb-4">Node Metrics</h4>
                       <div className="grid grid-cols-2 gap-4 relative z-10">
                          <div className="p-3 bg-cyber-950/50 rounded-xl border border-white/5">
                             <p className="text-[9px] text-gray-600 font-mono uppercase mb-1">Audit Score</p>
                             <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-white tracking-widest">{result.auditScore || 0}</span>
                                <span className="text-[9px] text-gray-600 font-mono">/100</span>
                             </div>
                          </div>
                          <div className="p-3 bg-cyber-950/50 rounded-xl border border-white/5">
                             <p className="text-[9px] text-gray-600 font-mono uppercase mb-1">Last Update</p>
                             <p className="text-[10px] text-white font-mono">
                               {result.lastUpdated ? new Date(result.lastUpdated.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'SYNCING...'}
                             </p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Portal */}
              {result.paymentStatus !== 'verified' && result.paymentStatus !== 'pending_verification' && !result.utr && (
                <div className="mt-8 animate-in zoom-in duration-500 bg-neon-purple/5 border border-neon-purple/20 p-8 rounded-3xl">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard size={20} className="text-neon-purple" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-neon-purple">Activation Required: Node Synchronization Service</h4>
                  </div>
                  <PaymentPortal 
                    businessName={result.businessName} 
                    onPaymentSubmitted={handlePaymentSubmit} 
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Support Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-garden-500/30 transition-colors">
              <MapPin className="text-garden-500 mb-4 group-hover:animate-bounce" size={24} />
              <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-widest">Geo Presence</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed font-mono">Operations prioritized within 5km of Bellandur main node cluster.</p>
           </div>
           <div className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-neon-purple/30 transition-colors">
              <AlertCircle className="text-neon-purple mb-4 group-hover:rotate-12 transition-transform" size={24} />
              <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-widest">Sync Help</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed font-mono">Node ID mismatch? Broadcast to <span className="text-white">sync@oorulogix.com</span>.</p>
           </div>
           <div className="p-6 bg-neon-cyan/10 border border-neon-cyan/20 rounded-2xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-neon-cyan opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <Activity className="text-neon-cyan mb-4 group-hover:scale-110 transition-transform" size={24} />
              <h4 className="text-neon-cyan font-bold mb-2 text-sm uppercase tracking-widest">Priority Sync</h4>
              <p className="text-[10px] text-cyan-400/70 leading-relaxed font-mono">Founders' Nodes (Green Glen Zone) bypass standard audit buffers.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserConsole;
