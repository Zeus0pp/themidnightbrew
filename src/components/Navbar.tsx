import React, { useState, useEffect } from 'react';
import { Coffee, MapPin, Menu as MenuIcon, X, PhoneCall, Sparkles, ShoppingBag, Instagram } from 'lucide-react';
import { Page, CartItem } from '../types';
import { CAFE_INFO, handleInstagramClick } from '../data/menu';
import logoImg from '../assets/images/midnight_brew_logo_1782467675049.jpg';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onSelectCategory
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center px-4 gap-2">
      <header
        className={`w-full max-w-[1044px] min-h-[74.8333px] md:h-[74.8333px] font-normal italic transition-all duration-300 rounded-[2rem] flex flex-col justify-center ${
          isScrolled
            ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-xl py-3 px-6 border border-[#EAE0D5]/60'
            : 'bg-[#FAF6F0]/90 backdrop-blur-md shadow-lg py-4 px-6 border border-[#EAE0D5]/30'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => {
              sessionStorage.removeItem('homeScrollPos');
              onNavigate('home');
            }}
            className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#CAA662]/40 group-hover:border-[#CAA662] shadow-inner transition-all duration-300 bg-[#FAF6F0] flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#CAA662] absolute" />
              <img src={logoImg} alt="The Midnight Brew Logo" className="relative z-10 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <div>
              <span className="block font-cursive text-xl sm:text-2xl font-bold tracking-wide text-[#2A1810] group-hover:text-[#CAA662] transition-colors">
                The Midnight Brew
              </span>
              <span className="block text-[8px] sm:text-[9px] font-sans tracking-[0.2em] uppercase text-[#2A1810]/60">
                CAFÉ & EATERY
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id === 'home') {
                      sessionStorage.removeItem('homeScrollPos');
                    }
                    if (link.id === 'menu') {
                      onSelectCategory?.('All');
                    }
                    onNavigate(link.id);
                  }}
                  className={`text-sm font-medium transition-all duration-300 cursor-pointer ${
                    active
                      ? 'text-[#CAA662] font-semibold'
                      : 'text-[#2A1810]/70 hover:text-[#CAA662]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            
            <a
              href={CAFE_INFO.social.instagram}
              onClick={handleInstagramClick}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 p-2.5 rounded-full bg-[#FFFFFF]/80 border border-[#EAE0D5] hover:border-[#CAA662] hover:bg-[#CAA662] text-[#2A1810]/70 hover:text-[#2A1810] hover:scale-110 hover:-rotate-12 active:scale-95 transition-all duration-300 shadow-sm flex items-center justify-center"
              aria-label="Instagram"
              title="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4 transition-transform duration-300" />
            </a>
          </nav>

          {/* Right CTAs - Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={CAFE_INFO.social.instagram}
              onClick={handleInstagramClick}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#FFFFFF]/80 border border-[#EAE0D5] hover:border-[#CAA662] hover:bg-[#CAA662] text-[#2A1810]/70 hover:text-[#2A1810] hover:scale-110 hover:-rotate-12 active:scale-95 transition-all duration-300 shadow-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full text-[#2A1810] hover:bg-[#EAE0D5] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="w-full max-w-[1044px] md:hidden bg-[#FAF6F0]/95 backdrop-blur-md border border-[#EAE0D5] rounded-[2rem] px-6 py-6 shadow-2xl animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const active = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id === 'home') {
                      sessionStorage.removeItem('homeScrollPos');
                    }
                    if (link.id === 'menu') {
                      onSelectCategory?.('All');
                    }
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3.5 rounded-xl text-base font-sans transition-all cursor-pointer ${
                    active
                      ? 'bg-[#CAA662] text-[#2A1810] font-bold shadow-md'
                      : 'bg-[#FFFFFF] text-[#2A1810] hover:bg-[#F5EBE1]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="pt-4 border-t border-[#EAE0D5]/60 flex flex-col gap-3">
              <div className="flex gap-2">
                <a
                  href={CAFE_INFO.social.instagram}
                  onClick={handleInstagramClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-sans font-bold text-[#2A1810] bg-[#FFFFFF] hover:bg-[#CAA662] rounded-xl border border-[#EAE0D5] hover:border-[#CAA662] transition-all group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-[#CAA662] group-hover:text-[#2A1810]" />
                  <span>Follow on Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
