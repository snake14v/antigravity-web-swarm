import React from 'react';

const Legal: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen bg-cyber-950 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <h1 className="text-4xl font-bold mb-12">Legal & Compliance</h1>

        <div className="space-y-12">
            <section>
                <h2 className="text-2xl font-bold text-neon-cyan mb-4">Privacy Policy (DPDP 2026 Ready)</h2>
                <div className="bg-cyber-900 p-6 rounded-xl border border-white/5 text-gray-400 space-y-4">
                    <p>
                        Ooru Logix acts as a <strong>Data Processor</strong>. The Merchant remains the <strong>Data Fiduciary</strong>. 
                        We do not sell, rent, or trade end-customer data to third parties.
                    </p>
                    <p>
                        All personally identifiable information (PII) captured via Ooru Vision (CCTV Analysis) is processed at the edge or anonymously. 
                        Faces are blurred before any cloud retention unless explicitly authorized for security incidents.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-neon-purple mb-4">Terms of Service</h2>
                <div className="bg-cyber-900 p-6 rounded-xl border border-white/5 text-gray-400 space-y-4">
                    <p>
                        <strong>1. Service Availability:</strong> While we aim for 99.9% uptime, Ooru Logix acknowledges the infrastructure challenges of Bangalore. 
                        Our "Local-First" architecture ensures basic POS functions work offline.
                    </p>
                    <p>
                        <strong>2. Payments:</strong> Subscription fees are billed monthly. Failure to pay within 7 days of the billing cycle will result in a graceful degradation of features to "Basic Mode".
                    </p>
                </div>
            </section>
        </div>

      </div>
    </div>
  );
};

export default Legal;