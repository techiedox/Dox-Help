import React, { useState } from 'react';
import { QrCode, ShieldCheck, MessageCircle, Copy, Check, ExternalLink, ArrowRight, Smartphone } from 'lucide-react';
import { WHATSAPP_RAW_NUMBER } from '../data/services';

export const PaymentSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const qrImagePath = '/assets/aistudio/photo_2026-10-22_23-44-39_4aee81fa.jpg';
  const upiId = '8292061543@ybl';
  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=Dox%20Help&cu=INR`;

  const paymentWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    `Hello Dox Help, I have completed/am making payment to UPI ID ${upiId}. Sharing my screenshot & details here.`
  )}`;

  const handleCopyUPI = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="payment-section" className="py-12 sm:py-16 border-t-2 border-zinc-900 bg-[#FFFDF9]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border-2 border-zinc-900 p-6 sm:p-8 shadow-[4px_4px_0px_#18181b] relative overflow-hidden">
          {/* Top Badge */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 text-zinc-900 text-xs font-black mb-2 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
              <QrCode className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>UPI Payment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              Scan & Pay Online
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-semibold">
              GPay, PhonePe, Paytm ya kisi bhi UPI app se direct payment karein.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Square QR Display Area with Exact Image */}
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 sm:w-72 sm:h-72 bg-black p-3.5 rounded-2xl border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] flex flex-col items-center justify-center relative overflow-hidden">
                <img
                  src={qrImagePath}
                  alt={`Official Payment QR Code - ${upiId}`}
                  className="w-full h-full object-contain rounded-xl"
                  loading="eager"
                />
              </div>

              {/* Clickable UPI ID Box */}
              <div className="mt-3.5 text-center w-full">
                <a
                  href={upiIntentUrl}
                  className="inline-flex items-center justify-between gap-2.5 px-4 py-2 bg-yellow-300 hover:bg-yellow-400 rounded-2xl border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] text-xs font-black text-zinc-950 transition-all cursor-pointer w-full sm:w-auto"
                  title="Click to open UPI payment app"
                >
                  <span className="text-zinc-700">UPI ID:</span>
                  <span className="font-black underline decoration-zinc-900 underline-offset-2">{upiId}</span>
                  <button
                    onClick={handleCopyUPI}
                    className="p-1 rounded-lg bg-white/80 hover:bg-white text-zinc-900 border border-zinc-900"
                    title="Copy UPI ID"
                    aria-label="Copy UPI ID"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </button>
                </a>
                <p className="text-[11px] text-zinc-500 font-semibold mt-1.5">
                  {copied ? '✅ UPI ID copied to clipboard!' : '👆 Tap UPI ID to open payment app or copy'}
                </p>
              </div>
            </div>

            {/* Quick Actions & Guidelines */}
            <div className="flex-1 space-y-4 text-left w-full">
              {/* 1-Tap Pay Button */}
              <a
                href={upiIntentUrl}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-yellow-300 text-zinc-950 font-black text-sm border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4 stroke-[2.5]" />
                <span>Pay via UPI App (PhonePe / GPay / Paytm)</span>
              </a>

              {/* Share Slip on WhatsApp CTA */}
              <a
                href={paymentWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-zinc-950 text-white font-black text-sm border-2 border-zinc-900 shadow-[3px_3px_0px_#10B981] hover:bg-zinc-800 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                <span>Share Payment Slip on WhatsApp</span>
              </a>

              {/* Genuine Safety Note */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 border-2 border-zinc-900 text-xs text-zinc-700 font-semibold shadow-[2px_2px_0px_#18181b] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                <p className="text-[11px] leading-relaxed">
                  Payment karte waqt UPI ID <strong>{upiId}</strong> zaroor verify karein. Payment hone ke baad screenshot WhatsApp par bhejein for fast confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
