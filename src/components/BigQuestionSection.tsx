import React from 'react';
import { BookOpen, Globe, Check } from 'lucide-react';

export const BigQuestionSection: React.FC = () => {
  const classroomItems = [
    'Theory & Memorization',
    'Written Examinations',
    'Isolated Assignments',
    'Individual learning',
    'Abstract academic projects',
  ];

  const realWorldItems = [
    'Real Customer Problems',
    'Active Product Users',
    'Cross-functional Teams',
    'Shipped Working Products',
    'Scalable Tech Businesses',
    'Measurable Community Impact',
  ];

  return (
    <section className="py-24 relative bg-neo-hero border-t-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Neo-Brutalist Title Box */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 flex flex-col items-center">
          <span className="neo-tag">
            THE BIG QUESTION
          </span>

          <div className="inline-block bg-white text-black border-3 border-black px-8 py-3 rounded-md shadow-[6px_6px_0px_#000000]">
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight">
              WHY BUILDERS ARENA?
            </h2>
          </div>

          <div className="bg-black text-white border-2 border-black px-6 py-3 rounded-md shadow-[4px_4px_0px_#000000] font-sans font-medium text-lg sm:text-xl">
            Students are learning technology. <span className="text-[#00D9FF] underline font-semibold">But are they building with it?</span>
          </div>
        </div>

        {/* Asymmetric Neo-Brutalist Split-Screen Section with Image Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* LEFT: THE CLASSROOM */}
          <div className="bg-white text-black border-3 border-black rounded-md overflow-hidden relative shadow-[8px_8px_0px_#000000] space-y-6 flex flex-col justify-between">
            {/* Image Header */}
            <div className="relative h-48 w-full border-b-3 border-black bg-black">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
                alt="Lecture Classroom"
                className="w-full h-full object-cover opacity-75 grayscale"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-black text-white flex items-center justify-center border-2 border-black font-bold">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-gray-300 font-bold uppercase tracking-widest block">CURRENT REALITY</span>
                    <h3 className="font-display font-black text-2xl uppercase text-white">THE CLASSROOM</h3>
                  </div>
                </div>
                <span className="neo-tag bg-black text-white">THEORY FOCUS</span>
              </div>
            </div>

            <div className="p-8 pt-0 space-y-3 font-mono text-xs sm:text-sm font-medium">
              {classroomItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded bg-gray-100 border-2 border-black text-gray-700 shadow-[3px_3px_0px_#000000]"
                >
                  <span className="text-black font-black">0{idx + 1}.</span>
                  <span className="line-through decoration-black decoration-2">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: THE REAL WORLD */}
          <div className="bg-[#00D9FF] text-black border-3 border-black rounded-md overflow-hidden relative shadow-[8px_8px_0px_#000000] space-y-6 flex flex-col justify-between">
            {/* Image Header */}
            <div className="relative h-48 w-full border-b-3 border-black bg-black">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="Hackathon Team Shipping"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#00D9FF] text-black flex items-center justify-center border-2 border-black">
                    <Globe className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#00D9FF] font-black uppercase tracking-widest block">THE GOAL</span>
                    <h3 className="font-display font-black text-2xl uppercase text-white">THE REAL WORLD</h3>
                  </div>
                </div>
                <span className="neo-tag bg-white text-black">PRODUCT EXECUTION</span>
              </div>
            </div>

            <div className="p-8 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {realWorldItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3.5 rounded bg-white text-black border-2 border-black font-mono text-xs font-semibold shadow-[3px_3px_0px_#000000]"
                >
                  <span className="bg-black text-[#00D9FF] w-5 h-5 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#00D9FF] stroke-[3]" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Statement Banner */}
        <div className="bg-black text-white border-3 border-black p-8 sm:p-12 rounded-md shadow-[8px_8px_0px_#000000] text-center max-w-4xl mx-auto mb-16 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop"
            alt="Developers Background"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />
          <p className="relative z-10 font-display text-xl sm:text-3xl font-bold leading-relaxed uppercase">
            "Builders Arena exists to <span className="text-[#00D9FF] underline font-bold">close the gap</span> between learning technology and using technology to solve real problems."
          </p>
        </div>
      </div>
    </section>
  );
};
