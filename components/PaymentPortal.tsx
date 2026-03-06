import React, { useState } from 'react';
import { Smartphone, QrCode, Clipboard, Loader2, CheckCircle, ArrowRight, Zap } from 'lucide-react';
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
  const note = encodeURIComponent(`Registration token for ${businessName}`);

  // Standard UPI deep link (works for QR and generic apps)
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${note}`;

  // App-specific deep links
  const gpayLink   = `tez://upi/pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${note}`;
  const phonepeLink = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${note}`;
  const paytmLink  = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${note}`;
  const bhimLink   = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${note}`;

  // QR encodes the standard UPI link
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&ecc=M&data=${encodeURIComponent(upiLink)}`;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    toast.success('UPI ID copied!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (utr.length < 12) {
      toast.error('Please enter a valid UTR number (min 12 digits)');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      onPaymentSubmitted(utr);
      setSubmitting(false);
    }, 1500);
  };

  const upiApps = [
    {
      name: 'GPay',
      link: gpayLink,
      color: 'from-blue-500 to-blue-600',
      emoji: '🟦',
      fallback: upiLink
    },
    {
      name: 'PhonePe',
      link: phonepeLink,
      color: 'from-purple-600 to-purple-700',
      emoji: '🟣',
      fallback: upiLink
    },
    {
      name: 'Paytm',
      link: paytmLink,
      color: 'from-sky-400 to-sky-500',
      emoji: '🔵',
      fallback: upiLink
    },
    {
      name: 'BHIM',
      link: bhimLink,
      color: 'from-orange-500 to-orange-600',
      emoji: '🟠',
      fallback: upiLink
    },
  ];

  return (
    <div className="bg-cyber-900/50 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-500">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan shadow-[0_0_20px_rgba(0,255,255,0.1)]">
          <Smartphone size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight italic">NODE ACTIVATION</h2>
          <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Mandatory ₹100 Registration Token</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* === Left: QR + App Buttons === */}
        <div className="space-y-5">

          {/* QR */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-white p-5 rounded-2xl flex flex-col items-center gap-3">
               <div className="text-center">
                 <div className="text-[#002f6c] font-black text-xl leading-none">{payeeName}</div>
                 <div className="text-[#334155] font-mono text-[11px] mt-0.5">{upiId}</div>
               </div>
               <img
                 src={qrUrl}
                 alt="UPI QR Code — Scan with any UPI app"
                 className="w-56 h-56 object-contain"
               />
               <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 <span className="text-[9px] text-green-700 font-bold uppercase tracking-widest">UPI Verified • ₹100.00</span>
               </div>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyUPI}
            className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors group"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Copy UPI ID: {upiId}</span>
            <Clipboard size={16} className="group-hover:text-neon-cyan" />
          </button>

          {/* Direct UPI App Buttons — shown on ALL devices */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-3">
              <Zap size={10} className="inline mr-1" />
              Tap to Open App Directly
            </p>
            <div className="grid grid-cols-2 gap-2">
              {upiApps.map((app) => (
                <a
                  key={app.name}
                  href={app.link}
                  onClick={(e) => {
                    // Try deep link, fallback to generic UPI after 500ms if app not installed
                    setTimeout(() => {
                      if (document.hasFocus()) {
                        window.location.href = app.fallback;
                      }
                    }, 600);
                  }}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${app.color} text-white font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg`}
                >
                  <span>{app.emoji}</span> {app.name}
                </a>
              ))}
            </div>
            <p className="text-[9px] text-gray-600 text-center mt-2 italic">
              On desktop, scan QR with your phone camera
            </p>
          </div>
        </div>

        {/* === Right: UTR Form === */}
        <div className="space-y-6">
          <div className="p-5 bg-garden-500/5 border border-garden-500/10 rounded-2xl">
            <p className="text-xs text-garden-400 font-medium leading-relaxed mb-4">
              <CheckCircle size={14} className="inline mr-2" />
              Pay ₹100 using QR code or any UPI app button. Then enter the UTR / Reference number below.
            </p>
            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] pt-4 border-t border-white/5">
              <span>Account Sync</span>
              <span className="text-neon-cyan">Pending</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                Transaction UTR / Ref No. (min 12 digits)
              </label>
              <input
                type="text"
                inputMode="numeric"
                required
                value={utr}
                onChange={(e) => setUtr(e.target.value.replace(/\D/g, '').slice(0, 16))}
                placeholder="e.g. 123456789012"
                className="w-full py-4 px-5 bg-cyber-950 border border-white/10 rounded-xl text-white font-mono text-lg focus:border-neon-cyan focus:outline-none transition-colors"
              />
              <p className="text-[9px] text-gray-600 italic">Found in your UPI app receipt after payment</p>
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

          <div className="text-center pt-2">
            <span className="text-[9px] text-gray-600 font-mono tracking-widest uppercase">Encryption: AES-256 System-Locked</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentPortal;
