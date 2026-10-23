import React from 'react';
import { MessageCircle, ArrowUpRight, Heart } from 'lucide-react';
import { BRAND_NAME, BRAND_TAGLINE, TECHIE_DOX_URL, WHATSAPP_RAW_NUMBER, WHATSAPP_PHONE_NUMBER } from '../data/services';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-white border-t-2 border-zinc-900 pt-12 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Brand Information */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-yellow-300 text-zinc-950 font-black text-sm flex items-center justify-center border-2 border-zinc-900 shadow-[2px_2px_0px_#ffffff]">
              D+
            </span>
            <h2 className="text-2xl font-black tracking-tight text-white">{BRAND_NAME}</h2>
          </div>
          <p className="text-xs text-zinc-400 font-bold">{BRAND_TAGLINE}</p>
        </div>

        {/* WhatsApp Connect */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-zinc-300 font-medium">
            Koi bhi query ho, kabhi bhi message karein. We are always happy to help!
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
              'Hello Dox Help, I have a service query.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-zinc-950 hover:bg-yellow-300 text-xs sm:text-sm font-black transition-all border-2 border-white shadow-[3px_3px_0px_#FACC15] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Chat on WhatsApp ({WHATSAPP_PHONE_NUMBER})</span>
          </a>
        </div>

        {/* Subtle Credit & Copyright */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-2.5">
          <p className="font-medium">
            © {new Date().getFullYear()} {BRAND_NAME}. Independent Digital Service Partner.
          </p>
          <div className="font-semibold text-zinc-400 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/techiedox/Dox-Help"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 font-bold"
            >
              GitHub <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1">
              <span>By</span>
              <a
                href={TECHIE_DOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:underline inline-flex items-center gap-0.5 font-bold"
              >
                Techie Dox <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
