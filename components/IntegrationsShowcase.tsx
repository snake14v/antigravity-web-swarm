import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  BarChart3,
  Send,
  Settings,
  Brain,
  Zap,
  FileText,
  Network,
  Grid3x3,
  Globe,
  Search,
  Clock,
  Check
} from 'lucide-react';

interface Integration {
  name: string;
  tools: string[];
  color: string;
  icon: React.FC<any>;
}

interface Category {
  title: string;
  subtitle: string;
  integrations: Integration[];
  bgGradient: string;
}

const IntegrationsShowcase: React.FC = () => {
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedCount(prev => {
        if (prev < 11) return prev + 1;
        clearInterval(timer);
        return 11;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const categories: Category[] = [
    {
      title: 'Sales & Prospecting',
      subtitle: 'Lead gen & deal intelligence',
      bgGradient: 'from-neon-cyan/5 via-transparent to-neon-cyan/5',
      integrations: [
        { name: 'Apollo', tools: ['Lead enrichment', 'Prospecting', 'Sequences', 'Org intelligence'], color: 'text-neon-cyan', icon: Send },
        { name: 'Vibe Prospecting', tools: ['Business matching', 'Entity enrichment', 'CSV export'], color: 'text-neon-pink', icon: Zap }
      ]
    },
    {
      title: 'Engineering & DevOps',
      subtitle: 'Infrastructure, AI models & system control',
      bgGradient: 'from-neon-purple/5 via-transparent to-neon-purple/5',
      integrations: [
        { name: 'Kubernetes', tools: ['Cluster ops', 'Deployments', 'Helm', 'Port forwarding'], color: 'text-blue-400', icon: Network },
        { name: 'Desktop Commander', tools: ['File ops', 'Process mgmt', 'Search', 'Edit blocks'], color: 'text-green-400', icon: Settings },
        { name: 'Hugging Face', tools: ['Model hub', 'Papers', 'Spaces', 'Doc search'], color: 'text-yellow-400', icon: Brain }
      ]
    },
    {
      title: 'Design & Browser',
      subtitle: 'UI systems & web automation',
      bgGradient: 'from-neon-pink/5 via-transparent to-neon-pink/5',
      integrations: [
        { name: 'Figma', tools: ['Design context', 'Screenshots', 'Design system', 'Variables'], color: 'text-neon-pink', icon: Grid3x3 },
        { name: 'Chrome Browser', tools: ['Navigation', 'Page reading', 'JS execution', 'Form input'], color: 'text-amber-400', icon: Globe }
      ]
    },
    {
      title: 'Research & Knowledge',
      subtitle: 'Web intelligence & document access',
      bgGradient: 'from-blue-400/5 via-transparent to-blue-400/5',
      integrations: [
        { name: 'Tavily Research', tools: ['Deep search', 'Crawling', 'Extraction', 'Site mapping'], color: 'text-green-400', icon: BarChart3 },
        { name: 'Exa Search', tools: ['Semantic search', 'Web fetch'], color: 'text-neon-purple', icon: Search },
        { name: 'Google Drive', tools: ['File fetch', 'Search', 'Document access'], color: 'text-amber-400', icon: FileText }
      ]
    },
    {
      title: 'Automation',
      subtitle: 'Scheduled workflows & task orchestration',
      bgGradient: 'from-green-400/5 via-transparent to-green-400/5',
      integrations: [
        { name: 'Scheduled Tasks', tools: ['Cron workflows', 'Event triggers', 'Task management'], color: 'text-neon-cyan', icon: Clock }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full py-20 px-4 md:px-8 bg-gradient-to-b from-cyber-950 via-cyber-900 to-cyber-950 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-neon-purple/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-16 p-4 md:p-6 bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-pink/10 border border-white/10 rounded-2xl backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="border-r border-white/5 last:border-r-0">
              <div className="text-2xl md:text-3xl font-bold text-neon-cyan">{animatedCount}</div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">MCPs Verified</div>
            </div>
            <div className="border-r border-white/5 last:border-r-0">
              <div className="text-2xl md:text-3xl font-bold text-neon-pink">24</div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">Agents Active</div>
            </div>
            <div className="border-r border-white/5 last:border-r-0">
              <div className="text-2xl md:text-3xl font-bold text-amber-400">8</div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">Automated Workflows</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-neon-purple">90+</div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">Knowledge Files</div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            AI COMMAND <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">INFRASTRUCTURE</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            11 verified MCP servers. 24 autonomous agents. 90+ knowledge files. Every integration tested live.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-12">
          {categories.map((category, categoryIdx) => (
            <motion.div key={categoryIdx} variants={itemVariants} className="space-y-4">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  {category.integrations[0]?.icon && React.createElement(category.integrations[0].icon, { size: 24 })}
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500">{category.subtitle}</p>
              </div>
              <div className={`grid grid-cols-1 md:grid-cols-2 ${category.integrations.length >= 3 ? 'lg:grid-cols-3' : ''} gap-4`}>
                {category.integrations.map((integration, idx) => (
                  <motion.div key={idx} variants={itemVariants}
                    className={`group p-5 rounded-2xl border border-white/10 bg-gradient-to-br ${category.bgGradient} hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 cursor-pointer`}>
                    <div className="flex items-start justify-between mb-3">
                      <div><h4 className="font-semibold text-white group-hover:text-neon-cyan transition-colors">{integration.name}</h4></div>
                      <div className={`${integration.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
                        {React.createElement(integration.icon, { size: 18 })}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {integration.tools.map((tool, toolIdx) => (
                        <div key={toolIdx} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-neon-cyan/40"></div>
                          <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{tool}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                      <Check size={12} className="text-green-400" />
                      <span className="text-[10px] text-green-400/80 uppercase tracking-wider font-medium">Verified Live</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <p className="text-gray-400 mb-4">11 verified integrations and 24 autonomous agents \u2014 every connection tested live, no fluff</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-[9px] px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-mono">Live-tested</span>
            <span className="text-[9px] px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple font-mono">Multi-agent coordination</span>
            <span className="text-[9px] px-3 py-1 rounded-full bg-neon-pink/10 border border-neon-pink/30 text-neon-pink font-mono">Production-grade</span>
            <span className="text-[9px] px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono">AI-native</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntegrationsShowcase;
