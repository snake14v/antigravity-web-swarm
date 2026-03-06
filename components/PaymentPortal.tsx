import React, { useState } from 'react';
import { Smartphone, QrCode, Clipboard, ExternalLink, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentPortalProps {
  businessName: string;
  onPaymentSubmitted: (utr: string) => void;
}

const PaymentPortal: React.FC<PaymentPortalProps> = ({ businessName, onPaymentSubmitted }) => {
  const [utr, setUtr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const upiId = "rnv.279@ptyous";
  const payeeName = "Vaishak RN";
  const amount = "100";
  
  // UPI Deep Link construction
  const upilink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Registration token for ${businessName}`)}`;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    toast.success('UPI ID copied to clipboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (utr.length < 12) {
      toast.error('Please enter a valid 12-digit UTR number');
      return;
    }
    setSubmitting(true);
    // Simulate minor delay for "verification effect"
    setTimeout(() => {
      onPaymentSubmitted(utr);
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-cyber-900/50 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan shadow-[0_0_20px_rgba(0,255,255,0.1)]">
          <Smartphone size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight italic">NODE ACTIVATION</h2>
          <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Mandatory ₹100 Registration Token</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* QR Section */}
        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-white p-6 rounded-2xl flex flex-col items-center justify-center overflow-hidden">
               <div className="mb-4 text-center">
                  <div className="text-[#002f6c] font-black text-xl mb-1">{payeeName}</div>
                  <div className="text-[#0f172a] font-mono text-[10px] font-bold opacity-60 tracking-tighter">{upiId}</div>
               </div>
               
               <div className="w-64 h-64 bg-white p-2 rounded-xl border border-gray-100 shadow-sm relative">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(upilink)}`}
                    alt="UPI QR Code"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <QrCode size={120} />
                  </div>
               </div>

               <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[9px] text-[#002f6c] font-bold uppercase tracking-widest">Live Verify Protocol v4.0</span>
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
             <button 
               onClick={handleCopyUPI}
               className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors group"
             >
                <span className="text-xs font-mono uppercase tracking-widest">Copy UPI ID</span>
                <Clipboard size={16} className="group-hover:text-neon-cyan" />
             </button>
             
             <a 
               href={upilink}
               className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-neon-cyan text-black rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(0,255,255,0.2)] md:hidden"
             >
                <Smartphone size={18} /> Direct App Pay
             </a>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <div className="p-5 bg-garden-500/5 border border-garden-500/10 rounded-2xl">
             <p className="text-xs text-garden-400 font-medium leading-relaxed mb-4">
                <CheckCircle size={14} className="inline mr-2" />
                Your business intelligence node is ready. Complete the ₹100 activation to synchronize with the Ooru Logix grid.
             </p>
             <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] pt-4 border-t border-white/5">
                <span>Account Sync</span>
                <span className="text-neon-cyan">Pending</span>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
               <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">Enter Transaction UTR (12 Digit)</label>
               <input 
                 type="text" 
                 pattern="\d{12}"
                 required
                 value={utr}
                 onChange={(e) => setUtr(e.target.value.replace(/\D/g, '').slice(0, 12))}
                 placeholder="Check Receipt for UTR / Ref No."
                 className="w-full py-4 px-5 bg-cyber-950 border border-white/10 rounded-xl text-white font-mono text-lg focus:border-neon-cyan focus:outline-none transition-colors"
               />
               <p className="text-[9px] text-gray-600 italic">Mandatory 12-digit number from payment confirmation page.</p>
            </div>

            <button
              type="submit"
              disabled={submitting || utr.length < 12}
              className="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] bg-white text-black hover:bg-neon-cyan transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {submitting ? (
                 <>
                   <Loader2 className="animate-spin" size={18} />
                   VERIFYING_NODE...
                 </>
               ) : (
                 <>
                   ACTIVATE NODE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </>
               )}
            </button>
          </form>
          
          <div className="text-center pt-4">
            <span className="text-[9px] text-gray-600 font-mono tracking-widest uppercase">Encryption: AES-256 System-Locked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;
