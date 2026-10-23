import React from 'react';
import { MessageCircle, X, ExternalLink } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER } from '../data/services';

interface WhatsAppSuccessModalProps {
  whatsappUrl: string | null;
  onClose: () => void;
}

export const WhatsAppSuccessModal: React.FC<WhatsAppSuccessModalProps> = ({ whatsappUrl, onClose }) => {
  if (!whatsappUrl) return null;

  const handleOpen = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-sm bg-white rounded-2xl border border-zinc-200 shadow-xl p-6 text-center animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg border border-zinc-200 text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-xl bg-zinc-950 text-white flex items-center justify-center mx-auto mb-3.5">
          <MessageCircle className="w-6 h-6 text-emerald-400 stroke-[2]" />
        </div>

        <h3 className="text-base font-bold text-zinc-950 leading-tight mb-1.5">
          Ready to Send on WhatsApp
        </h3>

        <p className="text-xs text-zinc-600 font-normal leading-relaxed mb-5">
          Your enquiry details have been formatted. Clicking below will open WhatsApp with {WHATSAPP_PHONE_NUMBER}.
          <br />
          <strong className="text-zinc-900 font-semibold block mt-1">
            Please press "Send" in WhatsApp to deliver your message.
          </strong>
        </p>

        <div className="space-y-2">
          <button
            onClick={handleOpen}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Open WhatsApp Chat</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-white text-zinc-600 font-medium text-xs border border-zinc-200 hover:bg-zinc-50 cursor-pointer"
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};
