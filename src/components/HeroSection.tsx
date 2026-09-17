import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Star } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-44 pb-32 sm:pt-52 sm:pb-44 overflow-hidden bg-neo-hero flex items-center justify-center">

      {/* OFFICIAL OOU AUDITORIUM HERO BACKGROUND IMAGE (Spread Full Width & Height) */}
      <img
        src="/hero-auditorium-bg.png"
        alt="OOU Auditorium Venue Full Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-70 scale-105 pointer-events-none z-0"
      />

      {/* Light Gradient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6C5CE7]/40 via-[#4A6CF7]/30 to-[#1E1B4B]/85 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center py-8">

        {/* Eyebrow Label */}


        {/* HEADLINE STACK WITH GENEROUS BREATHING ROOM */}
        <div className="relative space-y-3 sm:space-y-4 mb-12 sm:mb-16 text-center">
          {/* Line 1: Builders */}
          <div className="inline-block bg-white text-black border-3 border-black rounded-md px-6 sm:px-12 py-2 sm:py-3 shadow-[6px_6px_0px_#000000]">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-8xl tracking-tight leading-none uppercase">
              Builders
            </h1>
          </div>

          <br />

          {/* Line 2: Arena */}
          <div className="inline-block bg-white text-black border-3 border-black rounded-md px-6 sm:px-12 py-2 sm:py-3 shadow-[6px_6px_0px_#000000]">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-8xl tracking-tight leading-none uppercase">
              Arena
            </h1>
          </div>

          <br />

          {/* Line 3: Hackathon 2026 */}
          <div className="inline-flex items-center gap-3 sm:gap-4 bg-blue-300 text-black border-3 border-black rounded-md px-5 sm:px-10 py-2 sm:py-3 shadow-[6px_6px_0px_#000000]">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-7xl tracking-tight leading-none uppercase">
              Hackathon
            </h1>
            <span className="bg-black text-white font-mono text-lg sm:text-2xl font-black px-2.5 sm:px-3 py-1 rounded border-2 border-black">
              2026
            </span>
          </div>
        </div>

        {/* CTAS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-300 text-black rounded-md border-2 border-black font-sans font-bold text-sm shadow-[4px_4px_0px_#000000] hover:bg-blue-400 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000000] transition-all flex items-center justify-center gap-2"
          >
            <span>Register Your Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/sponsors"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-md border-2 border-black font-sans font-bold text-sm shadow-[4px_4px_0px_#000000] hover:bg-gray-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000000] transition-all flex items-center justify-center gap-2"
          >
            <span>Partner With Us</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
