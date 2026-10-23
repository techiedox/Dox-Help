import React from 'react';
import { MessageCircle, ArrowDown, Zap, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { WHATSAPP_RAW_NUMBER } from '../data/services';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative bg-[#FFFDF9] py-12 sm:py-16 border-b-2 border-zinc-900 overflow-hidden">
      {/* Subtle background polka-dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#18181b 2px, transparent 2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Compact Category Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-zinc-950 text-xs font-black mb-4 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>DOX HELP • DIGITAL SERVICE PARTNER</span>
        </div>

        {/* Big Playful & Personal Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-950 tracking-tight leading-[1.12] mb-4">
          Your Work.{' '}
          <span className="inline-block relative">
            <span className="relative z-10 underline decoration-yellow-400 decoration-wavy decoration-3 sm:decoration-4">
              Our Help!
            </span>
          </span>
        </h1>

        {/* Clean, Direct Supporting Text (No Card Container) */}
        <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-700 font-semibold leading-relaxed mb-8">
          Herbalife support, essential digital services aur social media solutions — apni requirement select karein aur WhatsApp par direct enquiry bhejein.
        </p>

        {/* Action Buttons: Chunky, tactile, cheerful */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-10">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-yellow-300 text-zinc-950 font-black text-sm sm:text-base border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#18181b] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Services 🚀</span>
            <ArrowDown className="w-4 h-4 stroke-[3]" />
          </button>

          <a
            href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
              'Hello! Mujhe Dox Help ki ek service ke baare mein baat karni hai.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-zinc-950 text-white font-black text-sm sm:text-base border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:bg-zinc-800 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#18181b] transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
            <span>Contact on WhatsApp 💬</span>
          </a>
        </div>

        {/* Playful Trust Stickers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto">
          <div className="p-2.5 rounded-2xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex items-center gap-2 text-left">
            <Zap className="w-4 h-4 text-amber-500 shrink-0 stroke-[2.5]" />
            <span className="text-xs font-black text-zinc-900">Instant Reply</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex items-center gap-2 text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
            <span className="text-xs font-black text-zinc-900">100% Genuine</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex items-center gap-2 text-left">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
            <span className="text-xs font-black text-zinc-900">Step-by-Step</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex items-center gap-2 text-left">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0 stroke-[2.5]" />
            <span className="text-xs font-black text-zinc-900">Zero Jhanjhat</span>
          </div>
        </div>
      </div>
    </section>
  );
};
