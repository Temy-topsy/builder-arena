import React from 'react';
import { motion } from 'framer-motion';
import { FINALIST_TEAMS_GRID } from '../data/hackathonData';
import { Award, Users, UserCheck, Sparkles } from 'lucide-react';

export const FinalistModelSection: React.FC = () => {
  const modelStats = [
    { value: '15', label: 'FINALIST TEAMS', color: '#00D9FF' },
    { value: '75', label: 'BUILDERS', color: '#FF9F00' },
    { value: '15', label: 'CORE VOLUNTEERS', color: '#F451D7' },
    { value: '10', label: 'MENTORS & JUDGES', color: '#FFFFFF' },
  ];

  return (
    <section id="teams" className="py-28 sm:py-36 relative bg-neo-hero border-t-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4 flex flex-col items-center">
          <span className="neo-tag">
            ELITE SELECTION MODEL
          </span>

          <div className="inline-block bg-white text-black border-3 border-black px-6 sm:px-10 py-3 sm:py-4 rounded-md shadow-[6px_6px_0px_#000000]">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
              THE FINALIST MODEL
            </h2>
          </div>

          <p className="font-sans font-normal text-base sm:text-lg text-white max-w-2xl text-center leading-relaxed drop-shadow-sm pt-2">
            A tight, highly competitive structure designed for maximum mentor focus, deep technical execution, and quality product outcomes.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {modelStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white text-black border-3 border-black p-6 rounded-lg text-center shadow-[6px_6px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#000000] transition-all"
            >
              <div className="font-display font-black text-5xl sm:text-7xl text-black mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-xs font-bold tracking-wider text-black uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Criteria Callouts (Clean & Without Icons) */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="neo-tag bg-black text-white px-5 py-2.5 tracking-wider">
            MAXIMUM 5 BUILDERS PER TEAM
          </div>
          <div className="neo-tag-accent px-5 py-2.5 tracking-wider font-bold">
            SELECTED VIA COMPETITIVE SCREENING
          </div>
        </div>

      </div>
    </section>
  );
};
