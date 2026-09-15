import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BUILDER_PROFILES } from '../data/hackathonData';
import { Sparkles, Zap } from 'lucide-react';

export const BuildersSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProfiles = filter === 'all'
    ? BUILDER_PROFILES
    : BUILDER_PROFILES.filter((p) => p.category === filter);

  return (
    <section id="mentors" className="py-28 sm:py-36 relative bg-neo-hero border-t-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4 flex flex-col items-center">
          <span className="neo-tag">
            EXECUTIVE TEAM & MENTORS
          </span>

          <div className="inline-block bg-white text-black border-3 border-black px-6 sm:px-10 py-3 sm:py-4 rounded-md shadow-[6px_6px_0px_#000000]">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
              MEET THE BUILDERS
            </h2>
          </div>

          <p className="font-sans font-normal text-base sm:text-lg text-white max-w-2xl text-center leading-relaxed drop-shadow-sm pt-2">
            The hackathon leads, organizers, judges, and technical mentors building the arena.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {['all', 'lead', 'organizer', 'mentor', 'judge', 'speaker'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-md font-sans text-xs font-semibold capitalize tracking-wide transition-all border-2 border-black ${
                filter === cat
                  ? 'bg-yellow-300 text-black shadow-[3px_3px_0px_#000000]'
                  : 'bg-white text-black shadow-[2px_2px_0px_#000000] hover:bg-black hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Builders' : cat}
            </button>
          ))}
        </div>

        {/* Builder Profile Cards Grid with Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProfiles.map((builder, idx) => (
            <motion.div
              key={builder.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white text-black border-3 border-black rounded-lg p-6 relative flex flex-col items-center text-center shadow-[6px_6px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#000000] transition-all group overflow-hidden"
              data-cursor={builder.name}
            >
              {/* Badge Tag Header */}
              <div className="w-full flex items-center justify-between mb-5 border-b-2 border-black pb-3">
                <span className="font-sans text-xs font-medium text-gray-800 bg-gray-100 px-2.5 py-0.5 rounded border border-gray-300">
                  {builder.organization || 'OOU Tech Community'}
                </span>
                <span className="font-sans text-xs font-bold text-white bg-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {builder.badge || 'Lead'}
                </span>
              </div>

              {/* PROFILE IMAGE CONTAINER */}
              <div className="relative w-full max-w-[200px] aspect-square rounded-lg border-3 border-black shadow-[4px_4px_0px_#000000] mb-5 bg-gray-100 overflow-hidden group-hover:scale-[1.02] transition-transform">
                <img
                  src={builder.avatarUrl}
                  alt={builder.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              </div>

              {/* BUILDER NAME & ROLE */}
              <div className="space-y-2 mb-3 w-full">
                <h3 className="font-display font-extrabold text-xl text-black tracking-tight">
                  {builder.name}
                </h3>
                <div>
                  <span className="font-sans text-xs font-bold text-black bg-yellow-300 px-3 py-1 rounded-md border-2 border-black inline-block shadow-[2px_2px_0px_#000000]">
                    {builder.role}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 text-xs sm:text-sm font-sans font-normal leading-relaxed mb-4 px-1 line-clamp-3">
                {builder.bio}
              </p>

              {/* Skills Tags */}
              {builder.skills && builder.skills.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-auto pt-3 border-t border-gray-200 w-full">
                  {builder.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-sans font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
