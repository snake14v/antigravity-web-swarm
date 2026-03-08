import React, { useEffect, useState } from 'react';
import { db, collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp } from '../services/firebase';
import { 
  LayoutDashboard, Users, Clock, CheckCircle, XCircle, Trash2, 
  ExternalLink, Search, Filter, Loader2, MoreVertical, 
  Kanban, List, Edit2, MessageSquare, ShieldCheck, 
  ArrowRight, Phone, MapPin, Mail, AlertTriangle, Save, X, Plus, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Registration, 
  RegistrationStatus, 
  PaymentStatus, 
  CommunicationLogEntry, 
  MandatoryChecklist,
  PageRoute 
} from '../types';

const STATUS_ORDER: RegistrationStatus[] = ['pending', 'contacted', 'audited', 'rejected'];

const AdminDashboard: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'registry' | 'payments' | 'kanban'>('registry');
  const [selectedRegId, setSelectedRegId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'registrations'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Registration[];
      setRegistrations(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleUpdateRegistration = async (id: string, updates: Partial<Registration>) => {
    try {
      await updateDoc(doc(db, 'registrations', id), {
        ...updates,
        lastUpdated: serverTimestamp()
      });
      toast.success('Registration updated successfully');
    } catch (err) {
      console.error('Error updating registration:', err);
      toast.error('Failed to update registration');
    }
  };

  const VALIDATION_PROTOCOLS = {
    contacted: (reg: Registration) => ({
      passed: !!reg.mandatoryChecks?.phoneVerified,
      error: 'Tele-Authentication (Phone) required'
    }),
    audited: (reg: Registration) => ({
      passed: !!reg.mandatoryChecks?.addressVerified && !!reg.mandatoryChecks?.siteSurveyDone && reg.paymentStatus === 'verified',
      error: 'Infrastructure Sync (Address/Survey) and verified payment required'
    }),
    rejected: () => ({ passed: true, error: '' }),
    pending: () => ({ passed: true, error: '' })
  };

  const updateStatus = async (reg: Registration, newStatus: RegistrationStatus) => {
    const protocol = VALIDATION_PROTOCOLS[newStatus](reg);
    if (!protocol.passed) {
      toast.error(`PROTOCOL_LOCK: ${protocol.error}`);
      return;
    }

    try {
      await updateDoc(doc(db, 'registrations', reg.id), { 
        status: newStatus,
        lastUpdated: serverTimestamp()
      });
      toast.success(`Node transition to ${newStatus.toUpperCase()} successful`);
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status');
    }
  };

  const verifyPayment = async (id: string) => {
    try {
      await updateDoc(doc(db, 'registrations', id), { 
        paymentStatus: 'verified',
        lastUpdated: serverTimestamp()
      });
      toast.success('Payment verified successfully');
    } catch (err) {
      console.error('Error verifying payment:', err);
      toast.error('Failed to verify payment');
    }
  };

  const deleteRegistration = async (id: string) => {
    if (window.confirm('CRITICAL: Purge this node from the grid? This action is irreversible.')) {
      try {
        await deleteDoc(doc(db, 'registrations', id));
        toast.success('Node purged successfully');
      } catch (err) {
        console.error('Error deleting registration:', err);
        toast.error('Failed to purge node');
      }
    }
  };

  const addLogMessage = async (regId: string, message: string, type: CommunicationLogEntry['type']) => {
    const reg = registrations.find(r => r.id === regId);
    if (!reg) return;

    const newLog: CommunicationLogEntry = {
      date: new Date().toISOString(),
      message,
      type,
      sender: 'ADMIN_TERMINAL'
    };

    const updatedLog = [...(reg.communicationLog || []), newLog];
    
    try {
      await updateDoc(doc(db, 'registrations', regId), {
        communicationLog: updatedLog,
        lastUpdated: serverTimestamp()
      });
      toast.success('Log entry added');
    } catch (err) {
      console.error('Error adding log:', err);
      toast.error('Failed to add log entry');
    }
  };

  const filteredData = registrations.filter(reg => {
    const matchesSearch = reg.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          reg.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || reg.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'contacted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'audited': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending_verification': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-cyber-950 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-mono mb-4">
              <Terminal size={12} />
              GRID_MAINFRAME_AUDIT v2.0
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Intelligence Grid <span className="text-neon-cyan">ATS</span></h1>
            <p className="text-gray-400 mt-2">Specialized Multi-Agent Tracking System for Bangalore Node Deployments.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-cyber-900 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan text-sm font-bold">
                 {registrations.length}
              </div>
              <div>
                <div className="text-2xl font-bold text-white">NODES</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Total Registrations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & View Toggles */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-center justify-between border-b border-white/5 pb-6">
          <div className="flex gap-2 p-1 bg-cyber-900 border border-white/10 rounded-xl w-full lg:w-auto">
            {[
              { id: 'registry', icon: List, label: 'Table View' },
              { id: 'kanban', icon: Kanban, label: 'Kanban Board' },
              { id: 'payments', icon: CheckCircle, label: 'Finance' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${
                  activeTab === tab.id ? 'bg-neon-cyan text-black shadow-lg shadow-cyan-500/20' : 'text-gray-500 hover:text-white'
                }`}
              >
                <tab.icon size={14} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-3/5">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="text" 
                placeholder="Search GRID nodes (Business, Owner, ID)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-cyber-900 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>
            {activeTab !== 'kanban' && (
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-cyber-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-cyan transition-colors appearance-none min-w-[150px]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="audited">Audited</option>
                <option value="rejected">Rejected</option>
              </select>
            )}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-gray-500">
            <Loader2 className="animate-spin mb-4 text-neon-cyan" size={48} />
            <p className="font-mono text-sm uppercase tracking-widest animate-pulse">Synchronizing with GRID Hub...</p>
          </div>
        ) : activeTab === 'kanban' ? (
          <KanbanBoard 
            registrations={filteredData} 
            updateStatus={updateStatus} 
            onSelect={(id) => { setSelectedRegId(id); setShowModal(true); }}
          />
        ) : activeTab === 'registry' ? (
          <NodeTable 
            data={filteredData} 
            updateStatus={updateStatus} 
            onEdit={(reg) => { setSelectedRegId(reg.id); setShowModal(true); }}
            deleteRegistration={deleteRegistration}
            getStatusColor={getStatusColor}
          />
        ) : (
          <FinanceTable 
            data={registrations.filter(r => r.paymentStatus === 'pending_verification' || r.paymentStatus === 'verified')} 
            verifyPayment={verifyPayment}
            getPaymentStatusColor={getPaymentStatusColor}
            deleteRegistration={deleteRegistration}
          />
        )}

        {/* Detailed Modal */}
        <AnimatePresence>
          {showModal && selectedRegId && (
            <RegistrationModal 
              reg={registrations.find(r => r.id === selectedRegId)!} 
              onClose={() => { setShowModal(false); setSelectedRegId(null); }}
              onUpdate={handleUpdateRegistration}
              onLogMessage={addLogMessage}
              onUpdateStatus={(status) => updateStatus(registrations.find(r => r.id === selectedRegId)!, status)}
              validationProtocols={VALIDATION_PROTOCOLS}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

// --- Sub-Components ---

const KanbanBoard: React.FC<{ 
  registrations: Registration[], 
  updateStatus: (reg: Registration, status: RegistrationStatus) => void,
  onSelect: (id: string) => void
}> = ({ registrations, updateStatus, onSelect }) => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-8 min-h-[60vh]">
      {STATUS_ORDER.map((status) => (
        <div key={status} className="flex-none w-80 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                status === 'pending' ? 'bg-yellow-500' : 
                status === 'contacted' ? 'bg-blue-500' : 
                status === 'audited' ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              {status}
            </h3>
            <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400 font-mono">
              {registrations.filter(r => r.status === status).length}
            </span>
          </div>
          <div className="flex-1 bg-black/20 border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
            {registrations.filter(r => r.status === status).map(reg => (
              <motion.div 
                layoutId={reg.id}
                key={reg.id}
                onClick={() => onSelect(reg.id)}
                className="p-4 bg-cyber-900 border border-white/10 rounded-xl hover:border-neon-cyan/50 cursor-pointer transition-all active:scale-[0.98] group"
              >
                <div className="flex justify-between items-start mb-2">
                   <h4 className="text-sm font-bold text-white group-hover:text-neon-cyan transition-colors">{reg.businessName}</h4>
                   <Edit2 size={12} className="text-gray-600 group-hover:text-neon-cyan" />
                </div>
                <p className="text-[10px] text-gray-500 mb-4 line-clamp-2">{reg.address}</p>
                <div className="flex justify-between items-center text-[9px] font-mono">
                   <span className="text-gray-600 uppercase tracking-tighter">POS: {reg.currentPos}</span>
                   <span className={`px-1.5 py-0.5 rounded border border-white/10 ${
                     reg.paymentStatus === 'verified' ? 'text-green-400 border-green-500/20' : 'text-yellow-500'
                   }`}>
                      {reg.paymentStatus === 'verified' ? 'PAID' : 'UNPAID'}
                   </span>
                </div>
              </motion.div>
            ))}
            {registrations.filter(r => r.status === status).length === 0 && (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl">
                 <p className="text-[10px] font-mono text-gray-700 italic">No nodes in pipeline</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const NodeTable: React.FC<{ 
  data: Registration[], 
  updateStatus: (reg: Registration, status: RegistrationStatus) => void,
  onEdit: (reg: Registration) => void,
  deleteRegistration: (id: string) => void,
  getStatusColor: (status: string) => string
}> = ({ data, updateStatus, onEdit, deleteRegistration, getStatusColor }) => (
  <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-cyber-900/20">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Business Node</th>
            <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Classification</th>
            <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Guardian / Contact</th>
            <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Pipeline State</th>
            <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((reg) => (
            <tr key={reg.id} className="hover:bg-white/5 transition-colors group">
              <td className="px-6 py-5">
                <div className="font-bold text-white mb-1">{reg.businessName}</div>
                <div className="text-[10px] font-mono text-gray-600 truncate max-w-[180px]">{reg.id}</div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10">
                  {reg.merchantType}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="text-sm text-white">{reg.ownerName}</div>
                <div className="text-xs text-gray-500">{reg.phone}</div>
              </td>
              <td className="px-6 py-5">
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${getStatusColor(reg.status)}`}>
                  {reg.status}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(reg)} className="p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteRegistration(reg.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const FinanceTable: React.FC<{ 
  data: Registration[], 
  verifyPayment: (id: string) => void,
  getPaymentStatusColor: (status?: string) => string,
  deleteRegistration: (id: string) => void
}> = ({ data, verifyPayment, getPaymentStatusColor, deleteRegistration }) => (
  <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-cyber-900/20">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Node</th>
            <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">UTR Reference</th>
            <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Auth Status</th>
            <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((reg) => (
            <tr key={reg.id} className="hover:bg-white/5 transition-colors group text-sm">
              <td className="px-6 py-5">
                <div className="font-bold text-white">{reg.businessName}</div>
                <div className="text-xs text-gray-500 font-mono">₹{reg.amountPaid || 100}</div>
              </td>
              <td className="px-6 py-5">
                <div className="text-neon-cyan font-mono font-bold tracking-widest">{reg.utr || 'NOT_SUPPLIED'}</div>
              </td>
              <td className="px-6 py-5">
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${getPaymentStatusColor(reg.paymentStatus)}`}>
                  {reg.paymentStatus || 'unknown'}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                   <button 
                     disabled={reg.paymentStatus === 'verified'}
                     onClick={() => verifyPayment(reg.id)}
                     className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                       reg.paymentStatus === 'verified' ? 'bg-green-500/5 text-green-500/30' : 'bg-green-500 text-black hover:scale-105'
                     }`}
                   >
                     {reg.paymentStatus === 'verified' ? 'VERIFIED' : 'VERIFY_NOW'}
                   </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const RegistrationModal: React.FC<{
  reg: Registration,
  onClose: () => void,
  onUpdate: (id: string, updates: Partial<Registration>) => Promise<void>,
  onLogMessage: (id: string, msg: string, type: CommunicationLogEntry['type']) => Promise<void>,
  onUpdateStatus: (status: RegistrationStatus) => Promise<void>,
  validationProtocols: Record<RegistrationStatus, (reg: Registration) => { passed: boolean; error: string }>
}> = ({ reg, onClose, onUpdate, onLogMessage, onUpdateStatus, validationProtocols }) => {
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'checks' | 'comm' | 'notes'>('info');
  const [newLog, setNewLog] = useState('');
  const [logType, setLogType] = useState<CommunicationLogEntry['type']>('system');
  const [editData, setEditData] = useState<Partial<Registration>>({
    assignedEngineer: reg.assignedEngineer || '',
    auditScore: reg.auditScore || 0,
    adminNotes: reg.adminNotes || '',
    feedbackToUser: reg.feedbackToUser || ''
  });

  const handleToggleCheck = (key: keyof MandatoryChecklist) => {
    const currentChecks = reg.mandatoryChecks || {
      phoneVerified: false,
      addressVerified: false,
      kycUploaded: false,
      termsAgreed: false,
      siteSurveyDone: false
    };
    onUpdate(reg.id, {
      mandatoryChecks: {
        ...currentChecks,
        [key]: !currentChecks[key]
      }
    });
  };

  const handleSaveInfo = () => {
    onUpdate(reg.id, editData);
    toast.success('Information synced');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-cyber-900 border border-white/10 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
      >
        {/* Modal Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-start bg-gradient-to-br from-white/5 to-transparent">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">{reg.businessName}</h2>
              <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-white/5 rounded-full border border-white/10 ${
                reg.status === 'pending' ? 'text-yellow-500' : 
                reg.status === 'contacted' ? 'text-blue-400' : 
                reg.status === 'audited' ? 'text-green-400' : 'text-red-400'
              }`}>{reg.status}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
              <span className="flex items-center gap-1"><Users size={12}/> {reg.ownerName}</span>
              <span className="flex items-center gap-1"><MapPin size={12}/> {reg.address}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto flex">
          {/* Side Nav */}
          <div className="w-56 border-r border-white/5 p-4 flex flex-col gap-2">
            {[
              { id: 'info', label: 'Processing', icon: Edit2 },
              { id: 'checks', label: 'Mandatory Checks', icon: ShieldCheck },
              { id: 'comm', label: 'Comms Grid', icon: MessageSquare },
              { id: 'notes', label: 'Internal Logs', icon: List },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeSubTab === tab.id ? 'bg-neon-cyan text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
            
            <div className="mt-auto pt-6 border-t border-white/5">
               <h4 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4">Node Transition</h4>
               <div className="flex flex-col gap-2">
                   {STATUS_ORDER.map(s => {
                     const protocol = validationProtocols[s](reg);
                     return (
                      <button 
                        key={s}
                        disabled={reg.status === s || !protocol.passed}
                        onClick={() => onUpdateStatus(s)}
                        title={!protocol.passed ? `LOCK: ${protocol.error}` : ''}
                        className={`text-[10px] font-bold px-3 py-2 rounded-lg border transition-all text-left flex items-center justify-between group ${
                          reg.status === s ? 'bg-white/5 border-white/10 text-gray-500 opacity-50' : 
                          !protocol.passed ? 'border-red-500/10 text-red-500/20 cursor-not-allowed grayscale' : 
                          'border-white/5 hover:border-neon-cyan/50 text-gray-400 hover:text-white'
                        }`}
                      >
                        {reg.status === s ? (
                          <span className="flex items-center gap-1.5 font-mono text-neon-cyan"><CheckCircle size={10}/> CURRENT_STATE</span>
                        ) : (
                          <>
                            <span className={!protocol.passed ? 'opacity-50' : ''}>{s.toUpperCase()}</span>
                            {protocol.passed ? (
                              <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                            ) : (
                              <ShieldCheck size={10} className="text-red-500/50" />
                            )}
                          </>
                        )}
                      </button>
                     );
                   })}
                </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-8">
            {activeSubTab === 'info' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-mono text-gray-500 uppercase">Assigned Field Engineer</label>
                     <input 
                       type="text" 
                       value={editData.assignedEngineer}
                       onChange={(e) => setEditData({...editData, assignedEngineer: e.target.value})}
                       className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-cyan"
                       placeholder="Enter Engineer Code/Name"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-mono text-gray-500 uppercase">Audit Score (0-100)</label>
                     <input 
                       type="number" 
                       value={editData.auditScore}
                       onChange={(e) => setEditData({...editData, auditScore: parseInt(e.target.value)})}
                       className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-cyan"
                     />
                   </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase">Feedback to Merchant (Visible to user)</label>
                    <textarea 
                       value={editData.feedbackToUser}
                       onChange={(e) => setEditData({...editData, feedbackToUser: e.target.value})}
                       rows={4}
                       className="w-full bg-cyber-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-cyan resize-none"
                       placeholder="Direct communication channel to the business owner tracking dashboard."
                    />
                 </div>
                 <button 
                   onClick={handleSaveInfo}
                   className="w-full py-4 bg-neon-cyan text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                 >
                   <Save size={18} /> SYNC_PROCESSING_DATA
                 </button>
              </div>
            )}

            {activeSubTab === 'checks' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl flex items-start gap-3 mb-6">
                   <AlertTriangle size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                   <p className="text-[11px] text-yellow-400/80 leading-relaxed font-mono">
                     ADVISORY: System status transitions (CONTACTED, AUDITED) are logically locked until mandatory node validations are completed.
                   </p>
                </div>
                
                {[
                  { id: 'phoneVerified', label: 'Tele-Authentication (Phone Verified)', desc: 'Confirmed owner identity and primary contact number.' },
                  { id: 'addressVerified', label: 'Geo-Verification (Address Audit)', desc: 'Physical node location manually cross-checked with maps.' },
                  { id: 'kycUploaded', label: 'Identity Protocol (KYC Docs)', desc: 'Merchant legal identity/GST documents verified.' },
                  { id: 'siteSurveyDone', label: 'Infrastructure Check (Site Survey)', desc: 'Field engineer confirmed technical grid requirements.' },
                  { id: 'termsAgreed', label: 'Logic Layer Agreement', desc: 'Merchant signed digital terms of synchronization.' },
                ].map(check => (
                  <div key={check.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group">
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white mb-1">{check.label}</h4>
                      <p className="text-[10px] text-gray-500 italic">{check.desc}</p>
                    </div>
                    <button 
                      onClick={() => handleToggleCheck(check.id as any)}
                      className={`w-12 h-6 rounded-full relative transition-all ${
                        (reg.mandatoryChecks?.[check.id as keyof MandatoryChecklist]) ? 'bg-neon-cyan' : 'bg-white/10'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                        (reg.mandatoryChecks?.[check.id as keyof MandatoryChecklist]) ? 'right-1 bg-black' : 'left-1 bg-gray-600'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeSubTab === 'comm' && (
              <div className="flex flex-col h-full bg-cyber-950/50 rounded-2xl border border-white/5 animate-in fade-in duration-300">
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {(reg.communicationLog || []).length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-20">
                       <MessageSquare size={48} className="mb-4" />
                       <p className="text-xs font-mono">LOG_STREAM_EMPTY</p>
                    </div>
                  ) : (
                    reg.communicationLog?.map((log, i) => (
                      <div key={i} className={`flex flex-col ${log.sender === 'ADMIN_TERMINAL' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                          log.sender === 'ADMIN_TERMINAL' ? 'bg-neon-cyan text-black rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'
                        }`}>
                          {log.message}
                        </div>
                        <div className="text-[8px] font-mono text-gray-600 mt-1 uppercase">
                          {log.type} // {new Date(log.date).toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 border-t border-white/5 flex gap-2">
                  <select 
                    value={logType}
                    onChange={(e) => setLogType(e.target.value as any)}
                    className="bg-cyber-900 border border-white/10 rounded-xl px-3 py-1 text-[10px] font-bold text-gray-400 focus:outline-none"
                  >
                    <option value="system">SYS</option>
                    <option value="email">MAIL</option>
                    <option value="whatsapp">WA</option>
                    <option value="call">CALL</option>
                  </select>
                  <input 
                    type="text" 
                    value={newLog}
                    onChange={(e) => setNewLog(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (onLogMessage(reg.id, newLog, logType), setNewLog(''))}
                    placeholder="Broadcast message to log stream..."
                    className="flex-1 bg-cyber-900 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-neon-cyan"
                  />
                  <button 
                    onClick={() => { onLogMessage(reg.id, newLog, logType); setNewLog(''); }}
                    className="p-2 bg-neon-cyan text-black rounded-xl hover:scale-105 transition-transform"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {activeSubTab === 'notes' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                 <textarea 
                   value={editData.adminNotes}
                   onChange={(e) => setEditData({...editData, adminNotes: e.target.value})}
                   rows={12}
                   className="w-full bg-cyber-950 border border-white/10 rounded-2xl p-6 text-sm font-mono text-gray-300 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple resize-none"
                   placeholder="INTERNAL_DEBUG_NOTES: Document technical anomalies, merchant behavioral patterns, or grid deployment challenges here. These are invisible to the end user."
                 />
                 <button 
                   onClick={handleSaveInfo}
                   className="w-full py-4 border border-neon-purple text-neon-purple font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-neon-purple/10 transition-all"
                 >
                   <Save size={18} /> PERSIST_INTERNAL_BUFFER
                 </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default AdminDashboard;
