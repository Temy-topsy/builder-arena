import React from 'react';
import { NUMBERS_METRICS } from '../data/hackathonData';
import { TrendingUp, Quote } from 'lucide-react';

export const NumbersSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-neo-hero border-t-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 flex flex-col items-center">
          <span className="neo-tag flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>IMPACT & REACH</span>
          </span>

          <div className="inline-block bg-white text-black border-3 border-black px-8 py-3 rounded-md shadow-[6px_6px_0px_#000000]">
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight">
              THE NUMBERS
            </h2>
          </div>
        </div>

        {/* 6 Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {NUMBERS_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white text-black border-3 border-black p-5 rounded-md text-center shadow-[5px_5px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000000] transition-all"
            >
              <div className="font-display font-black text-3xl sm:text-4xl text-black mb-1">
                {metric.count}
              </div>
              <div className="font-mono text-[10px] sm:text-xs font-black text-black uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Core Funding Quote Banner */}
        <div className="bg-black text-white border-3 border-black rounded-md p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-[8px_8px_0px_#000000] relative space-y-4">
          <Quote className="w-12 h-12 text-[#00D9FF] mx-auto" />
          <p className="font-display font-extrabold text-2xl sm:text-4xl uppercase leading-tight">
            "WE ARE NOT JUST ASKING FOR FUNDING."
          </p>
          <p className="font-sans text-base sm:text-xl text-[#00D9FF] font-black">
            We're offering access, talent, innovation and measurable growth.
          </p>
        </div>
      </div>
    </section>
  );
};
