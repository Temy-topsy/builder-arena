import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Crown } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-28 relative bg-neo-hero border-t-3 border-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center space-y-8">

        {/* Giant Neo-Brutalist Typography Header Box */}
        <div className="inline-block bg-white text-black border-3 border-black px-10 sm:px-16 py-6 rounded-md shadow-[10px_10px_0px_#000000]">
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-9xl uppercase tracking-tight leading-none">
            READY TO <span className="text-black decoration-[#00D9FF]">BUILD?</span>
          </h2>
        </div>

        <div className="bg-black text-white border-3 border-black p-6 rounded-md shadow-[6px_6px_0px_#000000] max-w-2xl">
          <p className="text-lg sm:text-2xl font-sans font-medium leading-relaxed">
            The next generation of Nigerian technology isn't waiting to be discovered. <strong className="text-[#00D9FF] underline font-bold">They're building.</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl pt-4">
          <Link
            to="/register"
            className="w-full sm:w-auto flex-1 neo-btn-primary py-4 px-8 text-xs sm:text-sm font-display uppercase tracking-wider flex items-center justify-center gap-2"
            data-cursor="REGISTER"
          >
            <span>REGISTER YOUR TEAM</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/sponsors"
            className="w-full sm:w-auto flex-1 neo-btn-secondary py-4 px-8 text-xs sm:text-sm font-display uppercase tracking-wider flex items-center justify-center gap-2"
            data-cursor="SPONSOR"
          >
            <span>SPONSOR BUILDERS ARENA</span>
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto bg-black text-white hover:bg-white hover:text-black border-3 border-black font-mono text-xs uppercase font-extrabold px-6 py-4 rounded-md shadow-[5px_5px_0px_#000000] transition-all flex items-center justify-center gap-2"
            data-cursor="COMMUNITY"
          >
            <span>JOIN COMMUNITY</span>
          </a>
        </div>
      </div>
    </section>
  );
};
