import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Tracks', path: '/tracks' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Sponsors', path: '/sponsors' },
    { label: 'Mentors', path: '/mentors' },
    { label: 'Teams', path: '/teams' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-black text-white border-b-2 border-black py-2 shadow-md'
          : 'bg-transparent py-2.5 sm:py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Clean, Compact OTC Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src="/otc-logo.jpg"
            alt="OTC Logo"
            className="h-8 sm:h-9 w-auto rounded object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md border-2 border-black shadow-[3px_3px_0px_#000000]">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`text-xs font-sans font-medium px-3 py-1 rounded transition-colors ${
                  isActive ? 'bg-black text-white font-semibold' : 'text-gray-800 hover:text-black hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            to="/sponsors"
            className="px-3.5 py-1.5 text-xs font-sans font-semibold rounded-md border-2 border-black bg-white text-black hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_#000000]"
          >
            Sponsor
          </Link>
          <Link
            to="/register"
            className="px-4 py-1.5 text-xs font-sans font-semibold rounded-md border-2 border-black bg-yellow-300 text-black hover:bg-yellow-400 transition-colors shadow-[2px_2px_0px_#000000] flex items-center gap-1.5"
          >
            <span>Register Team</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-black bg-white rounded-md border-2 border-black shadow-[2px_2px_0px_#000000]"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-black border-b-2 border-black px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-sans font-medium text-gray-900 hover:bg-gray-100 px-3 py-2 rounded"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-yellow-300 text-black rounded-md border-2 border-black font-sans font-semibold text-sm shadow-[2px_2px_0px_#000000]"
            >
              Register Team
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
