import React from 'react';
import FeaturesSection from '../components/FeaturesSection';
import UseCasesGrid from '../components/UseCasesGrid';

const Features: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen bg-cyber-900 text-white overflow-hidden">
      <FeaturesSection />
      <UseCasesGrid />
    </div>
  );
};

export default Features;