import React from 'react';
import { motion } from 'framer-motion';
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
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
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
              </motion.div>
            );
          })}
        </div>

        {/* Clean Pitch Deck Request Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
              <svg className="w-4 h-4 fill-current text-emerald-600 shrink-0" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.761.889 2.795.889h.001c3.182 0 5.768-2.587 5.769-5.767.001-3.182-2.586-5.775-5.77-5.775zm3.376 8.212c-.144.405-.837.774-1.17.824-.312.045-.694.076-2.029-.476-1.579-.652-2.6-2.259-2.678-2.363-.079-.104-.648-.864-.648-1.648 0-.784.405-1.171.55-1.328.144-.157.315-.197.42-.197.106 0 .211.001.303.006.098.005.23-.037.36.275.132.316.452 1.103.492 1.184.04.081.066.175.013.28-.052.106-.079.172-.157.263-.079.092-.165.205-.236.276-.079.079-.161.165-.069.323.092.158.408.673.875 1.09.601.537 1.109.703 1.267.782.158.079.25.066.342-.04.092-.105.395-.461.5-.619.106-.158.211-.132.356-.079.145.053.921.434 1.079.513.158.079.263.118.303.184.04.066.04.382-.104.787zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.435 5.176L2 22l4.981-1.399C8.423 21.492 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
              <span>CHAT VIA WHATSAPP</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
