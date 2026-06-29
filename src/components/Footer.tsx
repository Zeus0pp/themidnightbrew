import React from 'react';
import { Coffee, MapPin, Clock, Phone, Mail, Instagram, Navigation, Heart, ArrowUpRight } from 'lucide-react';
import { Page } from '../types';
import { CAFE_INFO, handleInstagramClick } from '../data/menu';
import logoImg from '../assets/images/midnight_brew_logo_1782467675049.jpg';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#EAE0D5] border-t border-[#EAE0D5]/80 text-[#2A1810] relative overflow-hidden pt-16 pb-10">
      {/* Subtle Background Glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#CAA662]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-[#EAE0D5]/60 pt-6">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#CAA662]/40 shadow-inner bg-[#FAF6F0] flex items-center justify-center">
                <Coffee className="w-6 h-6 text-[#CAA662] absolute" />
                <img src={logoImg} alt="The Midnight Brew Logo" className="relative z-10 w-full h-full object-cover" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <span className="font-cursive text-3xl font-bold tracking-wide text-[#2A1810]">
                The Midnight Brew
              </span>
            </div>
            <p className="text-sm text-[#2A1810]/70 leading-relaxed">
              Greater Noida's premier late-night sanctuary. Where artisanal craft coffee meets bold evening dining for night owls, students, and nocturnal creatives.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CAFE_INFO.social.instagram}
                onClick={handleInstagramClick}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#FFFFFF] border border-[#EAE0D5] hover:border-[#CAA662] hover:text-[#CAA662] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CAFE_INFO.social.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#FFFFFF] border border-[#EAE0D5] hover:border-[#CAA662] hover:text-[#CAA662] transition-all"
                aria-label="Google Maps"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-4">
            <h4 className="font-sans text-lg font-semibold text-[#CAA662] border-b border-[#EAE0D5]/40 pb-2">
              Site Architecture
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                  }}
                  className="text-[#2A1810]/80 hover:text-[#CAA662] flex items-center gap-1.5 transition-colors"
                >
                  <span>Homepage (Atmosphere & Hook)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('menu');
                  }}
                  className="text-[#2A1810]/80 hover:text-[#CAA662] flex items-center gap-1.5 transition-colors"
                >
                  <span>Full Menu (Conversion Engine)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                  }}
                  className="text-[#2A1810]/80 hover:text-[#CAA662] flex items-center gap-1.5 transition-colors"
                >
                  <span>Location & Contact (The Closer)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Nocturnal Hours */}
          <div className="space-y-4">
            <h4 className="font-sans text-lg font-semibold text-[#CAA662] border-b border-[#EAE0D5]/40 pb-2">
              Nocturnal Hours
            </h4>
            <div className="space-y-3 text-sm text-[#2A1810]/80">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#CAA662] mt-1 shrink-0" />
                <div>
                  <span className="block font-semibold text-[#2A1810]">Tuesday – Sunday</span>
                  <span className="font-mono text-xs text-[#CAA662]">{CAFE_INFO.hours.weekdays}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#CAA662] mt-1 shrink-0" />
                <div>
                  <span className="block font-semibold text-[#2A1810]">Monday</span>
                  <span className="font-mono text-xs text-[#CAA662]">{CAFE_INFO.hours.weekends}</span>
                </div>
              </div>
              <p className="text-xs text-[#2A1810]/60 italic pt-1">
                Kitchen stays open until 30 minutes before closing.
              </p>
            </div>
          </div>

          {/* Col 4: Visit Sanctuary */}
          <div className="space-y-4">
            <h4 className="font-sans text-lg font-semibold text-[#CAA662] border-b border-[#EAE0D5]/40 pb-2">
              Visit Sanctuary
            </h4>
            <div className="space-y-3 text-sm text-[#2A1810]/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#CAA662] mt-1 shrink-0" />
                <span>{CAFE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#CAA662] shrink-0" />
                <a href={`tel:${CAFE_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#CAA662] font-mono">
                  {CAFE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#CAA662] shrink-0" />
                <a href={`mailto:${CAFE_INFO.email}`} className="hover:text-[#CAA662]">
                  {CAFE_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2A1810]/50">
          <p>© {new Date().getFullYear()} The Midnight Brew Bistro. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('admin')} className="hover:text-[#CAA662] transition-colors">Admin Portal</button>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#CAA662] fill-[#CAA662]" /> for Night Owls
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
