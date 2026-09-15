import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Lightbulb, Wrench, ArrowRight } from 'lucide-react';
import { Track } from '../types';
import { Link } from 'react-router-dom';

interface TrackModalProps {
  track: Track | null;
  onClose: () => void;
}

export const TrackModal: React.FC<TrackModalProps> = ({ track, onClose }) => {
  if (!track) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_#000000]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded bg-black text-white hover:bg-gray-800 border-2 border-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-4 mb-6 border-b-3 border-black pb-4">
            <div className="w-13 h-13 rounded-md bg-black text-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000] p-2.5 shrink-0">
              <track.icon className="w-7 h-7 text-white stroke-[2]" />
            </div>
            <div>
              <span className="neo-tag">
                CHALLENGE TRACK
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase mt-1">{track.name}</h3>
            </div>
          </div>

          <p className="font-sans font-normal text-gray-800 text-base leading-relaxed mb-6">
            {track.fullDesc}
          </p>

          {/* Build Around List */}
          <div className="mb-6">
            <h4 className="font-sans text-sm font-black text-black uppercase mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-black" />
              FOCUS AREAS
            </h4>
            <div className="flex flex-wrap gap-2">
              {track.buildAround.map((area, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded text-sm font-sans font-bold bg-black text-white border border-black shadow-[2px_2px_0px_#000000]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Sample Problem Statements */}
          <div className="mb-6">
            <h4 className="font-sans text-sm font-black text-black uppercase mb-3 flex items-center gap-1.5">
              SAMPLE CHALLENGE BRIEFS
            </h4>
            <div className="space-y-2">
              {track.sampleProblems.map((problem, idx) => (
                <div key={idx} className="p-3.5 rounded bg-gray-100 border-2 border-black text-black font-sans text-sm font-medium shadow-[3px_3px_0px_#000000] flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{problem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Stacks */}
          <div className="mb-8">
            <h4 className="font-sans text-sm font-black text-black uppercase mb-3 flex items-center gap-1.5">
              RECOMMENDED STACK & APIS
            </h4>
            <div className="flex flex-wrap gap-2">
              {track.recommendedTools.map((tool, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded bg-yellow-300 text-black font-sans text-sm font-bold border border-black shadow-[2px_2px_0px_#000000]">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-3 border-black">
            <Link
              to="/register"
              onClick={onClose}
              className="flex-1 py-3.5 px-5 rounded neo-btn-primary text-center text-xs sm:text-sm font-display uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>REGISTER FOR THIS TRACK</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onClose}
              className="py-3.5 px-5 rounded neo-btn-secondary text-xs sm:text-sm font-sans uppercase font-bold"
            >
              CLOSE PREVIEW
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
