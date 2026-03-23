import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Database, Users, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { PageRoute } from '../types';

const Careers: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen bg-cyber-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-mono tracking-widest uppercase">Back to Systems</span>
          </Link>
        </div>
        
        <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Build the Logic Layer</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                We are looking for engineers who are tired of building SaaS for San Francisco. Build for Bellandur.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-cyber-900 border border-white/10 p-8 rounded-2xl hover:border-neon-cyan/50 transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-neon-cyan/10 rounded-lg text-neon-cyan">
                        <Code size={24} />
                    </div>
                    <span className="bg-white/5 text-xs font-bold px-2 py-1 rounded">BANGALORE / HYBRID</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Frontend Architect</h3>
                <p className="text-gray-400 mb-6">Expertise in React, Tailwind, and WebGL. You will build high-performance dashboards that run on low-end Android tablets in kitchens.</p>
                <button onClick={() => toast.success('Application portal opening soon!')} className="text-neon-cyan font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    Apply Now <ArrowRight size={16} />
                </button>
            </div>

            <div className="bg-cyber-900 border border-white/10 p-8 rounded-2xl hover:border-neon-purple/50 transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-neon-purple/10 rounded-lg text-neon-purple">
                        <Database size={24} />
                    </div>
                    <span className="bg-white/5 text-xs font-bold px-2 py-1 rounded">REMOTE</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Data Engineer (Gemini Specialist)</h3>
                <p className="text-gray-400 mb-6">You will fine-tune Gemini 2.5 Flash models on unstructured Indian retail data. Python and Firebase expertise required.</p>
                <button onClick={() => toast.success('Application portal opening soon!')} className="text-neon-purple font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    Apply Now <ArrowRight size={16} />
                </button>
            </div>
        </div>

        <div className="bg-garden-500/10 border border-garden-500/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Field Engineers</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Not a coder? We need "Feet-on-Street" engineers who understand the pulse of the market. Your job is to deploy nodes and train merchants.
            </p>
            <Link to={PageRoute.CONTACT} className="inline-block bg-garden-600 hover:bg-garden-500 text-white font-bold py-3 px-8 rounded-full transition-colors">
                Join the Field Team
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Careers;