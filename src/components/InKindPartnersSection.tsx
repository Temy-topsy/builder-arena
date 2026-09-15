import React from 'react';
import { IN_KIND_PARTNERS } from '../data/hackathonData';
import { Link } from 'react-router-dom';
import { Handshake, ArrowRight } from 'lucide-react';

export const InKindPartnersSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-neo-hero border-t-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 flex flex-col items-center">
          <span className="neo-tag flex items-center gap-1.5">
            <Handshake className="w-3.5 h-3.5" />
            <span>OPERATIONAL INFRASTRUCTURE</span>
          </span>

          <div className="inline-block bg-white text-black border-3 border-black px-8 py-3 rounded-md shadow-[6px_6px_0px_#000000]">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
              IN-KIND PARTNERS
            </h2>
          </div>

          <p className="font-sans font-medium text-sm sm:text-base text-white bg-black px-6 py-2.5 rounded-md border-2 border-black shadow-[4px_4px_0px_#000000]">
            Essential operational resources empowering student teams to build seamlessly without friction.
          </p>
        </div>

        {/* 4 Neo-Brutalist Chunky Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {IN_KIND_PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="bg-white text-black border-3 border-black rounded-md p-6 relative shadow-[6px_6px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000000] transition-all"
            >
              <div className="mb-4 p-2.5 bg-[#00D9FF] rounded border-2 border-black inline-flex items-center justify-center shadow-[2px_2px_0px_#000000]">
                <partner.icon className="w-7 h-7 text-black stroke-[2.5]" />
              </div>
              <h3 className="font-display font-black text-lg text-black uppercase mb-2">
                {partner.title}
              </h3>
              <p className="text-gray-800 text-xs sm:text-sm font-sans font-normal leading-relaxed">
                {partner.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Custom Partnership CTA Banner */}
        <div className="bg-black text-white border-3 border-black p-8 rounded-md shadow-[8px_8px_0px_#000000] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="font-display font-black text-xl uppercase text-[#00D9FF]">
              Have something else to contribute?
            </h4>
            <p className="text-gray-300 text-xs sm:text-sm font-sans font-normal">
              Custom hardware, cloud credits, API access or catering partnerships welcome.
            </p>
          </div>

          <Link
            to="/sponsors"
            className="shrink-0 neo-btn-primary px-6 py-3.5 text-xs font-display uppercase tracking-wider flex items-center gap-2"
          >
            <span>CUSTOM PARTNERSHIP</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
