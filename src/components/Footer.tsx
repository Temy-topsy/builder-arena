import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t-3 border-black py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b-2 border-white/20">

          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/otc-logo.jpg"
                alt="OOU Tech Community Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-md object-contain border-2 border-white/40 shadow-[3px_3px_0px_#000000] bg-white"
              />
              <div className="bg-white text-black font-display font-black px-3.5 py-1.5 rounded border-2 border-black inline-block text-base sm:text-lg shadow-[4px_4px_0px_#000000]">
                BUILDERS ARENA <span className="text-[#00D9FF] bg-black px-2 py-0.5 rounded font-mono text-xs">2026</span>
              </div>
            </div>

            <p className="font-mono text-xs text-[#00D9FF] uppercase tracking-widest font-black">
              Code. Create. Solve.
            </p>

            <p className="text-gray-300 text-xs sm:text-sm font-sans font-normal max-w-sm leading-relaxed">
              Organized by <strong className="text-white underline font-semibold">OOU Tech Community (OTC)</strong>. Empowering the next generation of university builders and problem solvers across Nigeria.
            </p>

            <div className="flex items-center gap-2.5 text-sm font-sans font-medium text-gray-300 pt-2">
              <MapPin className="w-4 h-4 text-[#00D9FF] shrink-0" />
              <span>Olabisi Onabanjo University, Ago-Iwoye, Ogun State, Nigeria</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs text-[#00D9FF] uppercase tracking-widest font-black">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans font-medium text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home Landing</Link></li>
              <li><Link to="/tracks" className="hover:text-white transition-colors">Challenge Tracks</Link></li>
              <li><Link to="/schedule" className="hover:text-white transition-colors">Hackathon Schedule</Link></li>
              <li><Link to="/sponsors" className="hover:text-white transition-colors">Sponsorship Tiers</Link></li>
              <li><Link to="/mentors" className="hover:text-white transition-colors">Mentors & Judges</Link></li>
              <li><Link to="/teams" className="hover:text-white transition-colors">15 Finalist Teams</Link></li>
              <li><Link to="/register" className="text-[#00D9FF] hover:text-white font-semibold transition-colors">Register Team</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono text-xs text-[#00D9FF] uppercase tracking-widest font-black">
              CONNECT WITH US
            </h4>

            <div className="space-y-3 text-sm font-sans font-medium text-gray-200">
              <a href="mailto:ooutechcommunity@gmail.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span>ooutechcommunity@gmail.com</span>
              </a>
              <a
                href="https://wa.me/2348061764593"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#25D366] transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-[#25D366] shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>+234 806 176 4593</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://substack.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Substack"
                className="w-9 h-9 rounded-md bg-white text-black border-2 border-black flex items-center justify-center hover:bg-yellow-300 transition-colors shadow-[2px_2px_0px_#000000]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 1.46H1.46v2.836h21.08V1.46z" />
                </svg>
              </a>
              <a
                href="https://x.com/OOU_Tech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-9 h-9 rounded-md bg-white text-black border-2 border-black flex items-center justify-center hover:bg-yellow-300 transition-colors shadow-[2px_2px_0px_#000000]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/oou-tech-community/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-md bg-white text-black border-2 border-black flex items-center justify-center hover:bg-yellow-300 transition-colors shadow-[2px_2px_0px_#000000]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs font-sans text-gray-400">
          <div className="w-full text-center sm:text-left">
            <p className="font-normal text-gray-400 text-center">
              © 2026 BUILDERS ARENA all rights reserved
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="shrink-0 flex items-center gap-1.5 bg-white text-black px-3.5 py-1.5 rounded font-mono text-xs font-bold border border-black shadow-[2px_2px_0px_#000000] hover:bg-yellow-300 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
