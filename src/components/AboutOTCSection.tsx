import React from 'react';
import { Terminal, Users, Code, Award, Globe } from 'lucide-react';

export const AboutOTCSection: React.FC = () => {
  const otcPills = [
    { label: 'COMMUNITY', icon: Users },
    { label: 'WORKSHOPS', icon: Code },
    { label: 'CONFERENCES', icon: Globe },
    { label: 'HACKATHONS', icon: Award },
    { label: 'BUILDERS', icon: Terminal },
  ];

  return (
    <section className="py-24 relative bg-neo-hero border-t-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: OTC Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-white border-3 border-black flex items-center justify-center p-1.5 shadow-[4px_4px_0px_#000000] shrink-0 overflow-hidden">
                <img
                  src="/otc-logo.jpg"
                  alt="OOU Tech Community Logo"
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white uppercase mt-1 tracking-tight">
                  OOU TECH COMMUNITY (OTC)
                </h2>
              </div>
            </div>

            <div className="bg-white text-black border-3 border-black p-6 rounded-md shadow-[6px_6px_0px_#000000] space-y-4">
              <p className="font-sans font-medium text-base sm:text-lg leading-relaxed">
                A university technology community bridging the gap between <strong className="underline">academic learning</strong> and <strong className="text-black bg-yellow-300 px-1.5 py-0.5 rounded">industry execution</strong>.
              </p>
              <p className="font-sans font-normal text-xs sm:text-sm text-gray-800 leading-relaxed">
                OTC empowers hundreds of student developers, designers, and tech innovators at Olabisi Onabanjo University with hands-on bootcamps, open-source mentorship, developer meetups, and high-impact hackathons.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {otcPills.map((pill, idx) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-black text-white border-2 border-black font-mono text-xs font-bold shadow-[3px_3px_0px_#000000]"
                  >
                    <Icon className="w-3.5 h-3.5 text-white" />
                    <span>{pill.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Achievements Box */}
          <div className="lg:col-span-6 bg-black text-white border-3 border-black rounded-md p-8 space-y-6 shadow-[8px_8px_0px_#000000]">
            <h3 className="font-display font-black text-xl text-[#00D9FF] uppercase flex items-center gap-2 border-b-2 border-white/30 pb-3">
              COMMUNITY IMPACT HIGHLIGHTS
            </h3>

            <div className="space-y-4 font-sans text-sm">
              <div className="p-4 rounded bg-white text-black border-2 border-black shadow-[4px_4px_0px_#000000] flex items-start gap-3">
                <span className="bg-black text-[#00D9FF] font-mono font-black text-xs px-2 py-1 rounded">01</span>
                <div>
                  <strong className="text-black block font-display font-black">500+ Student Developers Trained</strong>
                  <span className="text-gray-700 text-xs font-normal">Active bootcamps across Web Development, Mobile Dev, UI/UX, and AI tooling.</span>
                </div>
              </div>

              <div className="p-4 rounded bg-white text-black border-2 border-black shadow-[4px_4px_0px_#000000] flex items-start gap-3">
                <span className="bg-black text-[#00D9FF] font-mono font-black text-xs px-2 py-1 rounded">02</span>
                <div>
                  <strong className="text-black block font-display font-black">Annual Flagship Tech Summit</strong>
                  <span className="text-gray-700 text-xs font-normal">Gathering 1,000+ students, industry founders, and tech executives yearly on campus.</span>
                </div>
              </div>

              <div className="p-4 rounded bg-white text-black border-2 border-black shadow-[4px_4px_0px_#000000] flex items-start gap-3">
                <span className="bg-black text-[#00D9FF] font-mono font-black text-xs px-2 py-1 rounded">03</span>
                <div>
                  <strong className="text-black block font-display font-black">Startup & Project Incubation</strong>
                  <span className="text-gray-700 text-xs font-normal">Guiding student projects into registered tech ventures and internships.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
