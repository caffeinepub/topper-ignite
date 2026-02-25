import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Videos', href: '#videos' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-nav-bg/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-3 group"
            aria-label="Go to top"
          >
            <img
              src="/assets/generated/topper-ignite-logo.dim_256x256.png"
              alt="Topper Ignite Logo"
              className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover ring-2 ring-brand-fire/60 group-hover:ring-brand-fire transition-all duration-200 shadow-md shadow-brand-fire/30"
            />
            <div className="flex flex-col leading-none">
              <span className="font-heading font-black text-base md:text-lg text-white tracking-tight">
                TOPPER
              </span>
              <span className="font-heading font-black text-base md:text-lg text-brand-fire tracking-widest -mt-0.5">
                IGNITE
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-5 py-2 rounded-full text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://www.youtube.com/@TopperIgnite"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 rounded-full bg-brand-fire text-white text-sm font-bold hover:bg-brand-ember transition-all duration-200 shadow-md shadow-brand-fire/30 hover:shadow-brand-fire/50"
            >
              Subscribe Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-nav-bg/98 backdrop-blur-md rounded-2xl mb-4 p-4 flex flex-col gap-2 border border-white/10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-semibold transition-all"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://www.youtube.com/@TopperIgnite"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-3 rounded-xl bg-brand-fire text-white font-bold text-center hover:bg-brand-ember transition-all"
            >
              Subscribe Now
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
