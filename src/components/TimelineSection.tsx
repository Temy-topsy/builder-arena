import React, { useState } from 'react';
import { TIMELINE_STEPS, SCHEDULE_DAYS } from '../data/hackathonData';

export const TimelineSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(0);

  return (
    <section id="schedule" className="py-28 sm:py-36 relative bg-neo-hero border-t-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4 flex flex-col items-center">

          <div className="inline-block bg-white text-black border-3 border-black px-6 sm:px-10 py-3 sm:py-4 rounded-md shadow-[6px_6px_0px_#000000]">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
              48 HOURS. ONE MISSION.
            </h2>
          </div>

          <p className="font-sans font-normal text-base sm:text-lg text-white max-w-2xl text-center leading-relaxed drop-shadow-sm pt-2">
            From screening to live demo pitches, experience a structured 48-hour build journey.
          </p>
        </div>

        {/* 8-Step Horizontal Timeline Bar */}
        <div className="mb-20 overflow-x-auto pb-6 scrollbar-thin">
          <div className="flex items-center min-w-[900px] justify-between relative px-4">
            {/* Connecting line */}
            <div className="absolute top-6 left-8 right-8 h-1.5 bg-black z-0" />

            {TIMELINE_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="flex flex-col items-center relative z-10 text-center w-28 group"
                data-cursor={step.title}
              >
                <div className="w-12 h-12 rounded-md bg-white text-black border-3 border-black flex items-center justify-center font-mono font-black text-sm shadow-[4px_4px_0px_#000000] group-hover:bg-yellow-300 group-hover:scale-105 transition-all mb-3">
                  {step.stepNumber}
                </div>
                <h4 className="font-display font-black text-xs text-white bg-black px-2 py-1 rounded border border-black uppercase tracking-wider mb-1.5">
                  {step.title}
                </h4>
                <p className="text-xs text-white/90 font-sans font-normal leading-snug hidden sm:block">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed 2-Day Schedule Interactive Box */}
        <div className="bg-white text-black border-3 border-black rounded-xl p-6 sm:p-10 shadow-[8px_8px_0px_#000000]">
          {/* Day Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-3 border-black pb-6 mb-8">
            <div>
              <h3 className="font-display font-black text-2xl uppercase mt-1">HACKATHON SCHEDULE</h3>
            </div>

            <div className="flex items-center gap-2">
              {SCHEDULE_DAYS.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDay(idx)}
                  className={`px-4 py-2 rounded-md font-mono text-xs font-bold border-2 border-black transition-all ${activeDay === idx
                    ? 'bg-yellow-300 text-black shadow-[3px_3px_0px_#000000]'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                    }`}
                >
                  {day.dayTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Active Day Details */}
          <div>
            <div className="mb-6">
              <h3 className="font-display font-black text-2xl uppercase text-black">
                {SCHEDULE_DAYS[activeDay].dayTitle}
              </h3>
              <p className="font-mono text-xs font-bold text-gray-700 uppercase tracking-wider mt-1">
                {SCHEDULE_DAYS[activeDay].subTitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SCHEDULE_DAYS[activeDay].activities.map((act, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-gray-50 border-2 border-black shadow-[3px_3px_0px_#000000] flex items-start gap-4"
                >
                  <div className="px-2.5 py-1 rounded bg-black text-white font-mono text-xs font-bold shrink-0 border border-black">
                    {act.time}
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-black text-base mb-1">
                      {act.title}
                    </h5>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
