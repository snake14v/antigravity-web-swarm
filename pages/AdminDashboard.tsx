import React, { useEffect, useState } from 'react';
import { db, collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from '../services/firebase';
import { LayoutDashboard, Users, Clock, CheckCircle, XCircle, Trash2, ExternalLink, Search, Filter, Loader2, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';

interface Registration {
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
  status: 'pending' | 'contacted' | 'audited' | 'rejected';
  utr?: string;
  amountPaid?: number;
  paymentStatus?: 'pending_verification' | 'verified' | 'failed';
  timestamp: any;
}

const AdminDashboard: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'registry' | 'payments'>('registry');

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

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'registrations', id), { status });
      toast.success(`Status updated to ${status}`);
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status');
    }
  };

  const verifyPayment = async (id: string) => {
    try {
      await updateDoc(doc(db, 'registrations', id), { 
        paymentStatus: 'verified' 
      });
      toast.success('Payment verified successfully');
    } catch (err) {
      console.error('Error verifying payment:', err);
      toast.error('Failed to verify payment');
    }
  };

  const deleteRegistration = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      try {
        await deleteDoc(doc(db, 'registrations', id));
        toast.success('Registration deleted');
      } catch (err) {
        console.error('Error deleting registration:', err);
        toast.error('Failed to delete registration');
      }
    }
  };

  const filteredData = registrations.filter(reg => {
    const matchesSearch = reg.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          reg.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-mono mb-4">
              <LayoutDashboard size={12} />
              ADMIN_CONTROL_PANEL v1.0
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Intelligence Grid <span className="text-neon-cyan">ATS</span></h1>
            <p className="text-gray-400 mt-2">Manage and track incoming business nodes for the Ooru Logix ecosystem.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-cyber-900 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan">
                {activeTab === 'registry' ? <Users size={20} /> : <CheckCircle size={20} />}
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {activeTab === 'registry' 
                    ? registrations.length 
                    : registrations.filter(r => r.paymentStatus === 'pending_verification').length}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                  {activeTab === 'registry' ? 'Total Nodes' : 'Unverified Payments'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/5 pb-1">
          <button 
            onClick={() => setActiveTab('registry')}
            className={`pb-4 px-4 text-sm font-bold tracking-widest uppercase transition-all relative ${
              activeTab === 'registry' ? 'text-neon-cyan' : 'text-gray-500 hover:text-white'
            }`}
          >
            Node Registry
            {activeTab === 'registry' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('payments')}
            className={`pb-4 px-4 text-sm font-bold tracking-widest uppercase transition-all relative ${
              activeTab === 'payments' ? 'text-neon-cyan' : 'text-gray-500 hover:text-white'
            }`}
          >
            Received Payments
            {activeTab === 'payments' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div>}
          </button>
        </div>

        {/* Filters & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input 
              type="text" 
              placeholder="Search by business or owner name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-cyber-900 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-neon-cyan transition-colors"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-cyber-900 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-neon-cyan transition-colors appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="audited">Audited</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table/List */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-500">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-mono text-sm uppercase tracking-widest">Fetching Grid Data...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <p className="font-mono text-sm uppercase tracking-widest">No matching nodes found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    {activeTab === 'registry' ? (
                      <>
                        <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Business / Owner</th>
                        <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Details</th>
                        <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Contact</th>
                        <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Status</th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Business Unit</th>
                        <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">UTR / Reference</th>
                        <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Amount / Time</th>
                        <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Payment Status</th>
                      </>
                    )}
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredData.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors group">
                      {activeTab === 'registry' ? (
                        <>
                          <td className="px-6 py-6">
                            <div className="font-bold text-white mb-1">{reg.businessName}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Users size={12} /> {reg.ownerName}
                            </div>
                            {reg.address && (
                              <div className="text-[10px] text-gray-600 mt-1 truncate max-w-[200px]" title={reg.address}>
                                {reg.address}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-6">
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5 w-fit">
                                {reg.merchantType}
                              </span>
                              <span className="text-[10px] text-gray-500">
                                POS: {reg.currentPos || 'N/A'} | Vol: {reg.dailyOrders || 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <div className="text-sm text-white">{reg.phone}</div>
                            {reg.email && <div className="text-xs text-gray-400">{reg.email}</div>}
                            <div className="text-[10px] text-gray-500 font-mono mt-1">
                              {reg.timestamp?.toDate().toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${getStatusColor(reg.status)}`}>
                              {reg.status}
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-6">
                            <div className="font-bold text-white mb-1">{reg.businessName}</div>
                            <div className="text-xs text-gray-500">{reg.ownerName}</div>
                          </td>
                          <td className="px-6 py-6">
                            <div className="font-mono text-neon-cyan text-sm">{reg.utr || 'NOT_FOUND'}</div>
                            <div className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">Unique Transaction Ref</div>
                          </td>
                          <td className="px-6 py-6">
                            <div className="text-sm text-white font-bold">₹{reg.amountPaid || '0'}</div>
                            <div className="text-[10px] text-gray-500 font-mono">
                              {reg.timestamp?.toDate().toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${getPaymentStatusColor(reg.paymentStatus)}`}>
                              {reg.paymentStatus?.replace('_', ' ') || 'unpaid'}
                            </span>
                          </td>
                        </>
                      )}
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          {activeTab === 'registry' ? (
                            <>
                              <button 
                                onClick={() => updateStatus(reg.id, 'contacted')}
                                className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                title="Mark as Contacted"
                              >
                                <Clock size={16} />
                              </button>
                              <button 
                                onClick={() => updateStatus(reg.id, 'audited')}
                                className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                                title="Mark as Audited"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button 
                                onClick={() => updateStatus(reg.id, 'rejected')}
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                title="Mark as Rejected"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={() => verifyPayment(reg.id)}
                                disabled={reg.paymentStatus === 'verified'}
                                className={`p-2 rounded-lg transition-colors ${
                                  reg.paymentStatus === 'verified' 
                                    ? 'bg-green-500/10 text-green-500/50 cursor-not-allowed' 
                                    : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                                }`}
                                title="Verify Payment"
                              >
                                <CheckCircle size={16} />
                              </button>
                            </>
                          )}
                          <div className="w-px h-6 bg-white/10 mx-1"></div>
                          <button 
                            onClick={() => deleteRegistration(reg.id)}
                            className="p-2 rounded-lg bg-gray-500/10 text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                            title="Delete Node"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
