import React from 'react';
import { NIGERIAN_PROBLEMS } from '../data/hackathonData';
import { Target, ArrowDown } from 'lucide-react';

export const BuildForNigeriaSection: React.FC = () => {
  return (
    <section className="py-28 sm:py-36 relative bg-neo-hero border-t-3 border-black overflow-hidden">

      {/* Background Tech Image Overlay */}
      <img
        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop"
        alt="Nigerian Tech Ecosystem"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 flex flex-col items-center gap-4">

          <div className="inline-block bg-white text-black border-3 border-black px-6 sm:px-10 py-3 sm:py-4 rounded-md shadow-[6px_6px_0px_#000000]">
            <h2 className="font-display font-extrabold text-3xl sm:text-6xl uppercase tracking-tight">
              BUILD FOR <span className="text-black underline decoration-yellow-400 decoration-4">NIGERIA</span>
            </h2>
          </div>

          <p className="font-sans font-normal text-base sm:text-lg text-white max-w-2xl text-center leading-relaxed drop-shadow-sm pt-2">
            Solve real problems. Build real products. Create real impact.
          </p>
        </div>

        {/* Nigerian Problem Statement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {NIGERIAN_PROBLEMS.map((problem, idx) => (
            <div
              key={idx}
              className="bg-white text-black border-3 border-black p-6 rounded-lg shadow-[6px_6px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#000000] transition-all flex items-start gap-4 group"
              data-cursor="PROBLEM"
            >
              <div className="w-11 h-11 rounded-md bg-yellow-300 text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000]">
                <Target className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <div className="space-y-1.5">
                <span className="font-sans text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  CHALLENGE 0{idx + 1}
                </span>
                <p className="font-sans text-base sm:text-lg font-medium text-black leading-snug">
                  "{problem}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Down Indicator Button */}
        <div className="text-center space-y-3 flex flex-col items-center">

        </div>
      </div>
    </section>
  );
};
