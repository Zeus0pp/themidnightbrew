import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, ArrowLeft } from 'lucide-react';
import { Page } from '../types';
import { CAFE_INFO } from '../data/menu';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate
}) => {

  return (
    <div className="min-h-screen pt-36 md:pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <button
        onClick={() => {
          onNavigate('home');
        }}
        className="mb-6 flex items-center justify-center w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#EAE0D5] text-[#2A1810] hover:text-[#CAA662] hover:border-[#CAA662] transition-colors shadow-sm cursor-pointer"
        aria-label="Back to Home"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* --- PAGE HEADER --- */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 animate-in fade-in slide-in-from-top-6 duration-500">
        <span className="px-3.5 py-1 rounded-full bg-[#CAA662]/10 text-[#CAA662] border border-[#CAA662]/30 font-mono text-xs tracking-wider uppercase">
          The Sanctuary
        </span>
        <h1 className="font-sans text-4xl sm:text-6xl font-extrabold text-[#2A1810]">
          Visit Our Sanctuary
        </h1>
        <p className="text-sm sm:text-base text-[#2A1810]/70 font-light">
          Find your late-night study nook, bold artisanal brews, and nocturnal celebration space.
        </p>
      </div>

      {/* --- MAIN CLOSER GRID (Map + Contact Actions) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Left Column: Dark Mode Map Frame (wider) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] rounded-3xl border border-[#EAE0D5] p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#CAA662] flex items-center gap-1.5">
              <Navigation className="w-4 h-4" />
              <span>Physical Location</span>
            </span>
            <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
              ● Kitchen Active
            </span>
          </div>

          <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#2A1810] pr-4">
            {CAFE_INFO.address}
          </h3>

          {/* Styled Map Container */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#EAE0D5] bg-[#EAE0D5] shadow-inner group">
            <iframe
              title="Google Maps Location"
              width="100%"
              height="100%"
              className="absolute inset-0 z-0 grayscale-[20%] contrast-125"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(CAFE_INFO.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            />
            
            <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-2">
              <a
                href={`https://maps.google.com/maps?daddr=${encodeURIComponent(CAFE_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#2A1810] hover:bg-[#1A0F0A] text-[#CAA662] text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Get Directions</span>
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#2A1810]/70 leading-relaxed font-serif italic">
            Located in Neelkanth Plaza near ICICI Bank, Alpha-I Commercial Belt, Greater Noida.
          </p>
        </div>

        {/* Right Column: Direct Actions & Hours */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Contact Actions */}
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#EAE0D5] p-6 shadow-2xl space-y-4">
            <h3 className="font-sans text-lg font-bold text-[#CAA662]">
              Need Instant Assistance?
            </h3>
            
            <div className="space-y-3">
              <a
                href={`tel:${CAFE_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF6F0] border border-[#EAE0D5] hover:border-[#CAA662] transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FFFFFF] text-[#CAA662] group-hover:bg-[#CAA662] group-hover:text-[#2A1810] transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-[#2A1810]">Call Host Desk</span>
                    <span className="font-mono text-xs text-[#CAA662]">{CAFE_INFO.phone}</span>
                  </div>
                </div>
                <span className="text-xs text-[#2A1810]/50 group-hover:text-[#CAA662]">Tap to Call →</span>
              </a>

              <a
                href={`mailto:${CAFE_INFO.email}?subject=Private%20Event%20Inquiry`}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF6F0] border border-[#EAE0D5] hover:border-[#CAA662] transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FFFFFF] text-[#CAA662] group-hover:bg-[#CAA662] group-hover:text-[#2A1810] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-[#2A1810]">Event & Catering Email</span>
                    <span className="text-xs text-[#2A1810]/70">{CAFE_INFO.email}</span>
                  </div>
                </div>
                <span className="text-xs text-[#2A1810]/50 group-hover:text-[#CAA662]">Send Email →</span>
              </a>
            </div>
          </div>

          {/* Hours Summary Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FFFFFF] to-[#F5EBE1] border border-[#CAA662]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#CAA662] font-mono text-xs font-bold uppercase">
              <Clock className="w-4 h-4" />
              <span>Sanctuary Operating Hours</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#2A1810]/90 pt-1 font-mono">
              <div>
                <span className="block text-[#2A1810]/50">Tue - Sun</span>
                <span>{CAFE_INFO.hours.weekdays}</span>
              </div>
              <div>
                <span className="block text-[#2A1810]/50">Monday</span>
                <span>{CAFE_INFO.hours.weekends}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
