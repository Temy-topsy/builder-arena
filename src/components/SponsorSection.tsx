import React from 'react';
import { Users, Cpu, ShieldCheck, Award, Mail, ArrowRight } from 'lucide-react';

export const SponsorSection: React.FC = () => {
  const valuePillars = [
    {
      title: 'TALENT PIPELINE',
      icon: Users,
      desc: 'Access a vetted pipeline of student engineers, product designers, and technical founders from OOU.',
    },
    {
      title: 'PRODUCT ADOPTION',
      icon: Cpu,
      desc: 'Integrate your API, developer tools, or cloud infrastructure directly into builder projects.',
    },
    {
      title: 'BRAND LEADERSHIP',
      icon: ShieldCheck,
      desc: 'Position your organization at the forefront of Nigerian university tech and innovation.',
    },
    {
      title: 'THOUGHT LEADERSHIP',
      icon: Award,
      desc: 'Deliver keynotes, lead developer workshops, and join our esteemed final judging panel.',
    },
  ];

  return (
    <section id="sponsors" className="py-28 sm:py-36 relative bg-neo-hero border-t-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4 flex flex-col items-center">
          <span className="neo-tag">
            PARTNERSHIPS & SPONSORSHIP
          </span>

          <div className="inline-block bg-white text-black border-3 border-black px-6 sm:px-10 py-3 sm:py-4 rounded-md shadow-[6px_6px_0px_#000000]">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight leading-tight">
              BUILD WITH THE NEXT GENERATION
            </h2>
          </div>

          <p className="font-sans font-normal text-base sm:text-lg text-white max-w-2xl text-center leading-relaxed drop-shadow-sm pt-2">
            Support student builders solving high-impact problems across FinTech, AgricTech, Web3, and Artificial Intelligence.
          </p>
        </div>

        {/* 4 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {valuePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white text-black p-6 sm:p-7 rounded-lg border-3 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#000000] transition-all flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-md bg-black text-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000] mb-5">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-display font-black text-lg text-black uppercase tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm font-sans font-normal leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Clean Pitch Deck Request Card */}
        <div
          className="bg-white text-black border-3 border-black rounded-xl p-8 sm:p-12 shadow-[8px_8px_0px_#000000] max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="neo-tag">
            BECOME A SPONSOR
          </span>

          <h3 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight">
            REQUEST THE OFFICIAL PARTNERSHIP DECK
          </h3>

          <p className="text-gray-700 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Detailed information on sponsorship packages, keynote addresses, track naming rights, exhibition booths, and custom developer activations are available in our official partnership deck.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="mailto:ooutechcommunity@gmail.com?subject=Builders%20Arena%202026%20Sponsorship%20Deck%20Request&body=Hello%20OTC%20Team%2C%0A%0AWe%20would%20like%20to%20request%20the%20sponsorship%20pitch%20deck%20for%20Builders%20Arena%202026.%0A%0ACompany%20Name%3A%0AContact%20Person%3A%0AEmail%20%2F%20Phone%3A"
              className="neo-btn-primary px-8 py-4 text-xs sm:text-sm font-display uppercase tracking-wider flex items-center justify-center gap-2.5 w-full sm:w-auto"
            >
              <Mail className="w-4 h-4" />
              <span>REQUEST SPONSORSHIP DECK</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/2348061764593?text=Hello%20OTC%20Team%2C%20we%20would%20like%20to%20inquire%20about%20sponsoring%20Builders%20Arena%202026."
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn-secondary px-8 py-4 text-xs sm:text-sm font-display uppercase tracking-wider flex items-center justify-center gap-2.5 w-full sm:w-auto"
            >
              <svg className="w-4 h-4 fill-current text-[#25D366] shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>CHAT VIA WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
