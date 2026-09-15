import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TRACKS_DATA } from '../data/hackathonData';
import { Track } from '../types';
import { TrackModal } from './TrackModal';
import { ArrowRight, Zap } from 'lucide-react';

export const TracksSection: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <section id="tracks" className="py-28 sm:py-36 relative bg-neo-hero border-t-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4 flex flex-col items-center">
          <span className="neo-tag">
            CHALLENGE VERTICALS
          </span>
          <div className="inline-block bg-white text-black border-3 border-black px-6 sm:px-10 py-3 sm:py-4 rounded-md shadow-[6px_6px_0px_#000000]">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
              FOUR WAYS TO BUILD
            </h2>
          </div>
          <p className="font-sans font-normal text-base sm:text-lg text-white max-w-2xl text-center leading-relaxed drop-shadow-sm pt-2">
            Choose your challenge vertical and turn ambitious technical ideas into production software.
          </p>
        </div>

        {/* 4 Neo-Brutalist Track Cards with Rich Banner Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {TRACKS_DATA.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white text-black border-3 border-black rounded-md overflow-hidden relative group shadow-[8px_8px_0px_#000000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_#000000] transition-all flex flex-col justify-between"
              data-cursor={track.name}
            >
              {/* IMAGE BANNER CONTAINER */}
              <div className="relative h-48 w-full border-b-3 border-black overflow-hidden bg-black">
                <img
                  src={track.imageUrl}
                  alt={track.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/ai&software.png';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-11 h-11 rounded-md bg-white text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000]">
                    <track.icon className="w-5 h-5 text-black stroke-[2]" />
                  </div>
                  <span className="neo-tag bg-black text-white">
                    TRACK 0{idx + 1}
                  </span>
                </div>

                <h3 className="absolute bottom-4 left-4 font-display font-black text-3xl text-white uppercase tracking-tight flex items-center gap-2 drop-shadow-md">
                  <span>{track.name}</span>
                </h3>
              </div>

              {/* CARD CONTENT */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-sans text-base font-normal text-gray-800 leading-relaxed mb-6">
                    {track.shortDesc}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="font-mono text-xs font-black uppercase text-black block">
                      BUILD AROUND FOCUS AREAS:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {track.buildAround.map((item, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-3 py-1 rounded bg-black text-white font-mono text-xs font-bold border border-black shadow-[2px_2px_0px_#000000]"
                        >
                          • {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTrack(track)}
                  className="w-full neo-btn-primary py-3.5 px-6 text-xs font-display uppercase tracking-wider flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-black" />
                    {track.ctaText}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <TrackModal track={selectedTrack} onClose={() => setSelectedTrack(null)} />
    </section>
  );
};
