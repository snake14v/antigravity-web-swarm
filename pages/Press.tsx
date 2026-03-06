import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';

const Press: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen bg-cyber-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <h1 className="text-4xl font-bold mb-12 flex items-center gap-4">
            <Newspaper className="text-neon-cyan" size={40} />
            Press & Media
        </h1>

        <div className="space-y-8">
            <div className="bg-cyber-800 border border-white/10 p-6 rounded-xl hover:border-neon-cyan/50 transition-colors">
                <span className="text-xs font-mono text-gray-500">FEB 2026</span>
                <h2 className="text-2xl font-bold text-white mb-2">Ooru Logix Raises Series A to Digitize Bellandur</h2>
                <p className="text-gray-400 mb-4">
                    Leading venture capital firms back the "Local-First" operating system designed for India's unorganized retail sector.
                </p>
                <a href="#" className="text-neon-cyan flex items-center gap-2 text-sm font-bold">Read Release <ExternalLink size={14}/></a>
            </div>

            <div className="bg-cyber-800 border border-white/10 p-6 rounded-xl hover:border-neon-cyan/50 transition-colors">
                <span className="text-xs font-mono text-gray-500">JAN 2026</span>
                <h2 className="text-2xl font-bold text-white mb-2">Case Study: Reducing Food Waste by 40%</h2>
                <p className="text-gray-400 mb-4">
                    How 'xgo3dfood labs' used ShopSmart-OS predictive depletion algorithms to save ₹4.5 Lakhs in annual inventory costs.
                </p>
                <a href="#" className="text-neon-cyan flex items-center gap-2 text-sm font-bold">Read Case Study <ExternalLink size={14}/></a>
            </div>

            <div className="bg-cyber-800 border border-white/10 p-6 rounded-xl hover:border-neon-cyan/50 transition-colors">
                <span className="text-xs font-mono text-gray-500">NOV 2025</span>
                <h2 className="text-2xl font-bold text-white mb-2">The "Sovereign Merchant" Manifesto</h2>
                <p className="text-gray-400 mb-4">
                    Our founder speaks at TechSparks about why data ownership is the only moat left for small businesses in the age of AI.
                </p>
                <a href="#" className="text-neon-cyan flex items-center gap-2 text-sm font-bold">Watch Keynote <ExternalLink size={14}/></a>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Press;