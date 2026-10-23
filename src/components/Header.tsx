import React, { useState } from 'react';
import { MessageCircle, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { WHATSAPP_RAW_NUMBER, BRAND_NAME, TECHIE_DOX_URL } from '../data/services';

interface HeaderProps {
  onNavigateToServices: () => void;
  onNavigateToPayment: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToServices, onNavigateToPayment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-zinc-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Wordmark with Playful Badge */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-white flex items-center justify-center font-black text-base border-2 border-zinc-900 shadow-[2px_2px_0px_#FACC15] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
            D+
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-tight text-zinc-950">
                {BRAND_NAME}
              </span>
            </div>
            <span className="text-[11px] text-zinc-600 font-bold leading-tight">
              by <span className="text-zinc-950">Techie Dox</span>
            </span>
          </div>
        </a>

        {/* Desktop Quick Nav */}
        <nav className="hidden sm:flex items-center gap-3 text-xs font-black text-zinc-800">
          <button
            onClick={onNavigateToServices}
            className="px-3 py-1.5 rounded-xl border-2 border-transparent hover:border-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer"
          >
            Services 📑
          </button>
          <button
            onClick={onNavigateToPayment}
            className="px-3 py-1.5 rounded-xl border-2 border-transparent hover:border-zinc-900 hover:bg-yellow-100 transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Pay QR</span>
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </button>
          <a
            href={TECHIE_DOX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-black transition-colors inline-flex items-center gap-1 font-bold pl-2"
          >
            Techie Dox <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* WhatsApp Quick CTA */}
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
              'Hello Dox Help, I want to enquire about a service.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-zinc-950 text-white text-xs font-black border-2 border-zinc-900 shadow-[2px_2px_0px_#10B981] hover:bg-zinc-800 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label="Contact Dox Help on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
            <span className="hidden min-[400px]:inline">WhatsApp Chat</span>
            <span className="min-[400px]:hidden">Chat</span>
          </a>

          {/* Compact Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border-2 border-zinc-900 text-zinc-900 bg-zinc-50 hover:bg-zinc-200 sm:hidden cursor-pointer shadow-[2px_2px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 stroke-[3]" /> : <Menu className="w-4 h-4 stroke-[3]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t-2 border-zinc-900 bg-[#FFFDF9] px-4 py-3 space-y-2 text-xs font-black animate-in slide-in-from-top-1">
          <button
            onClick={() => {
              onNavigateToServices();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex items-center justify-between"
          >
            <span>Browse All Services</span>
            <span>🚀</span>
          </button>
          <button
            onClick={() => {
              onNavigateToPayment();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl bg-yellow-300 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex items-center justify-between"
          >
            <span>Scan UPI Payment QR</span>
            <span>📱</span>
          </button>
          <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-zinc-600 text-xs font-bold">
            <span>By Techie Dox</span>
            <a
              href={TECHIE_DOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black inline-flex items-center gap-0.5 underline decoration-zinc-400"
            >
              techiedox.vercel.app <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
