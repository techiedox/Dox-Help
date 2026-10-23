import React, { useEffect } from 'react';
import { X, CheckCircle, FileText, ArrowRight, AlertTriangle, ShieldCheck, MessageCircle, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../types/service';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  category: ServiceCategory | null;
  onClose: () => void;
  onProceedToEnquiry: (service: ServiceItem, category: ServiceCategory) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  category,
  onClose,
  onProceedToEnquiry,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service || !category) return null;

  const isCategoryActive = category.status === 'active';
  const isServiceAvailable = isCategoryActive && (service.isAvailable !== false);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-service-title"
        className="relative z-10 w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border-t-2 sm:border-2 border-zinc-900 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] sm:shadow-[6px_6px_0px_#18181b] max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
      >
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-zinc-300" />
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 pt-3 pb-4 border-b-2 border-zinc-900 flex items-start justify-between gap-4 bg-[#FFFDF9]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-zinc-900 bg-yellow-300 px-2.5 py-0.5 rounded-md border border-zinc-900 shadow-[1px_1px_0px_#18181b]">
                {category.title}
              </span>
              {/* Availability Status */}
              {isServiceAvailable ? (
                <span className="text-[11px] font-black text-white bg-zinc-950 px-2.5 py-0.5 rounded-md border border-zinc-900">
                  ✨ Available Now
                </span>
              ) : (
                <span className="text-[11px] font-bold text-zinc-700 bg-zinc-100 border border-zinc-400 px-2 py-0.5 rounded-md">
                  {category.statusLabel}
                </span>
              )}
            </div>
            <h2 id="modal-service-title" className="text-xl sm:text-2xl font-black text-zinc-950 leading-snug">
              {service.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border-2 border-zinc-900 bg-zinc-100 text-zinc-700 hover:text-black hover:bg-zinc-200 shadow-[2px_2px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="px-5 sm:px-6 py-4 overflow-y-auto space-y-4 text-left text-xs sm:text-sm">
          {/* Inactive Warning if service unavailable */}
          {!isServiceAvailable && (
            <div className="p-3.5 rounded-2xl bg-zinc-100 border-2 border-zinc-900 text-zinc-800 flex items-start gap-2.5 shadow-[2px_2px_0px_#18181b]">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 stroke-[2.5]" />
              <div>
                <p className="font-black text-zinc-950">Service Currently Unavailable</p>
                <p className="text-xs text-zinc-600 mt-0.5 font-medium">
                  Yeh service upcoming pipeline mein hai. Abhi direct enquiry accept nahi ho rahi.
                </p>
              </div>
            </div>
          )}

          {/* Short description */}
          <div>
            <p className="text-zinc-800 font-bold leading-relaxed text-sm">
              {service.shortDesc}
            </p>
          </div>

          {/* What is included */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-950 mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
              <span>Assistance Included in This Service</span>
            </h3>
            <ul className="space-y-2">
              {service.includedPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-zinc-800 font-semibold text-xs sm:text-sm">
                  <CheckCircle className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required documents if any */}
          {service.requiredDocs && service.requiredDocs.length > 0 && (
            <div className="p-4 rounded-2xl bg-yellow-50/60 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-950 mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600 stroke-[2.5]" />
                <span>Documents Needed / Required Details</span>
              </h3>
              <ul className="space-y-1.5">
                {service.requiredDocs.map((doc, idx) => (
                  <li key={idx} className="text-xs text-zinc-800 font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-zinc-600 mt-2 font-medium italic">
                * Note: Kabhi bhi passwords, OTPs ya sensitive ATM PINs share na karein.
              </p>
            </div>
          )}

          {/* Pricing indicator */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_#18181b]">
            <div>
              <span className="text-[11px] font-bold text-zinc-500 block">Service Charges</span>
              <span className="text-base font-black text-zinc-950">
                {isServiceAvailable ? (service.pricingNote || 'Price on enquiry') : 'Not Active'}
              </span>
            </div>
            <span className="text-[11px] text-zinc-600 text-right font-medium max-w-[180px]">
              {isServiceAvailable ? 'Based on specific requirements & complexity' : 'Service currently inactive'}
            </span>
          </div>

          {/* Disclaimer if any */}
          {service.disclaimer && (
            <div className="p-3 rounded-xl bg-zinc-100 border border-zinc-300 flex items-start gap-2 text-[11px] text-zinc-600 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-zinc-800 shrink-0 mt-0.5" />
              <span>{service.disclaimer}</span>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-5 border-t-2 border-zinc-900 bg-white flex flex-col sm:flex-row items-center gap-3">
          {isServiceAvailable ? (
            <button
              onClick={() => onProceedToEnquiry(service, category)}
              className="w-full py-3.5 px-6 rounded-2xl bg-zinc-950 text-white font-black text-sm sm:text-base border-2 border-zinc-900 shadow-[3px_3px_0px_#10B981] hover:bg-zinc-800 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
              <span>Enquire on WhatsApp</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          ) : (
            <button
              disabled
              className="w-full py-3 px-5 rounded-2xl bg-zinc-100 text-zinc-400 font-black text-xs sm:text-sm border-2 border-zinc-300 cursor-not-allowed flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-zinc-400 stroke-[2]" />
              <span>Service Currently Unavailable</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-white text-zinc-950 font-bold text-sm border-2 border-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
