import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../types/service';
import { WHATSAPP_RAW_NUMBER } from '../data/services';

interface EnquiryModalProps {
  service: ServiceItem | null;
  category: ServiceCategory | null;
  categories: ServiceCategory[];
  onClose: () => void;
  onSuccessPrompt: (whatsappUrl: string) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  service,
  category,
  categories,
  onClose,
  onSuccessPrompt,
}) => {
  // Only active categories can be chosen
  const activeCategories = categories.filter((c) => c.status === 'active');

  const [customerName, setCustomerName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    category?.id || activeCategories[0]?.id || 'herbalife'
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string>(service?.id || '');
  const [description, setDescription] = useState('');

  // Optional conditional fields for social media / creative services
  const [platform, setPlatform] = useState('');
  const [contentType, setContentType] = useState('');
  const [creativesCount, setCreativesCount] = useState('');
  const [budget, setBudget] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (category) setSelectedCategoryId(category.id);
    if (service) setSelectedServiceId(service.id);
  }, [service, category]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const currentCategory = activeCategories.find((c) => c.id === selectedCategoryId) || activeCategories[0];
  const currentServices = currentCategory ? currentCategory.services : [];
  const currentService = currentServices.find((s) => s.id === selectedServiceId) || currentServices[0];

  const isSocialMediaOrAI = selectedCategoryId === 'social-media-ai';

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!customerName.trim()) {
      newErrors.customerName = 'Please enter your name.';
    }
    if (!selectedServiceId) {
      newErrors.serviceId = 'Please select a service.';
    }
    if (!description.trim()) {
      newErrors.description = 'Please describe your requirement or issue.';
    } else if (description.trim().length < 5) {
      newErrors.description = 'Please provide a little more detail (min 5 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const catTitle = currentCategory ? currentCategory.title : 'Digital Services';
    const srvName = currentService ? currentService.name : 'General Enquiry';

    let text = `Hello Dox Help,\n\nI want to enquire about a service.\n\n`;
    text += `Name: ${customerName.trim()}\n`;
    text += `Category: ${catTitle}\n`;
    text += `Service: ${srvName}\n`;
    text += `Requirement: ${description.trim()}\n`;

    if (isSocialMediaOrAI) {
      if (platform) text += `Platform: ${platform}\n`;
      if (contentType) text += `Content Type: ${contentType}\n`;
      if (creativesCount) text += `Creatives/Reels Count: ${creativesCount}\n`;
      if (budget) text += `Budget: ${budget}\n`;
    }

    if (preferredDate) {
      text += `Preferred Date: ${preferredDate}\n`;
    }

    text += `\nPlease share the price and next steps.`;
    return text;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(message)}`;

    onSuccessPrompt(whatsappUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        className="relative z-10 w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border-t-2 sm:border-2 border-zinc-900 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] sm:shadow-[6px_6px_0px_#18181b] max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
      >
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-zinc-300" />
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 pt-3 pb-4 border-b-2 border-zinc-900 flex items-center justify-between bg-[#FFFDF9]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-900 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>WhatsApp Direct Enquiry</span>
            </div>
            <h2 id="enquiry-modal-title" className="text-xl sm:text-2xl font-black text-zinc-950 leading-tight">
              Tell Us What You Need 📝
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border-2 border-zinc-900 bg-zinc-100 text-zinc-700 hover:text-black hover:bg-zinc-200 shadow-[2px_2px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label="Close enquiry form"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-4 overflow-y-auto space-y-4 text-left text-xs sm:text-sm flex-1">
          {/* Privacy & Safety Note */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex items-start gap-2.5 text-xs text-zinc-800">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 stroke-[2.5]" />
            <p className="font-semibold leading-relaxed">
              <strong>Safe & Secure:</strong> Hum kabhi bhi password ya bank OTP nahi mangte. Direct WhatsApp par simple guidance milegi!
            </p>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-900 mb-1.5">
              Aapka Naam / Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (errors.customerName) setErrors({ ...errors, customerName: '' });
              }}
              placeholder="e.g., Rohit Sharma"
              className={`w-full px-4 py-2.5 rounded-2xl border-2 border-zinc-900 font-bold text-xs sm:text-sm shadow-[2px_2px_0px_#18181b] focus:outline-none transition-all ${
                errors.customerName ? 'bg-red-50 border-red-500' : 'bg-white'
              }`}
            />
            {errors.customerName && (
              <p className="text-xs text-red-600 font-bold mt-1">{errors.customerName}</p>
            )}
          </div>

          {/* Category & Service Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-900 mb-1.5">
                Category
              </label>
              <select
                value={selectedCategoryId}
                onChange={(e) => {
                  const newCat = e.target.value;
                  setSelectedCategoryId(newCat);
                  const matchingCat = activeCategories.find((c) => c.id === newCat);
                  if (matchingCat && matchingCat.services.length > 0) {
                    setSelectedServiceId(matchingCat.services[0].id);
                  }
                }}
                className="w-full px-3 py-2.5 rounded-2xl border-2 border-zinc-900 font-bold text-xs sm:text-sm bg-white shadow-[2px_2px_0px_#18181b] focus:outline-none"
              >
                {activeCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-900 mb-1.5">
                Service <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => {
                  setSelectedServiceId(e.target.value);
                  if (errors.serviceId) setErrors({ ...errors, serviceId: '' });
                }}
                className="w-full px-3 py-2.5 rounded-2xl border-2 border-zinc-900 font-bold text-xs sm:text-sm bg-white shadow-[2px_2px_0px_#18181b] focus:outline-none"
              >
                {currentServices.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Requirement Description */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-900 mb-1.5">
              Kya Help Chahiye? / Requirement Details <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              placeholder="Detail likhein (e.g., FSSAI basic registration karwana hai, ya 5 Instagram reels edit karni hain)..."
              className={`w-full px-4 py-2.5 rounded-2xl border-2 border-zinc-900 font-bold text-xs sm:text-sm shadow-[2px_2px_0px_#18181b] focus:outline-none transition-all resize-none ${
                errors.description ? 'bg-red-50 border-red-500' : 'bg-white'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-600 font-bold mt-1">{errors.description}</p>
            )}
          </div>

          {/* Conditional Fields for Social Media & AI Content */}
          {isSocialMediaOrAI && (
            <div className="p-4 rounded-2xl bg-sky-50/70 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-950">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Creative & Video Preferences (Optional)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Platform */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-800 mb-1">
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-zinc-900 font-bold text-xs bg-white"
                  >
                    <option value="">Select platform...</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook / Meta Ads">Facebook / Meta Ads</option>
                    <option value="YouTube Shorts">YouTube Shorts</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Multi-platform">Multi-platform</option>
                  </select>
                </div>

                {/* Content Type */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-800 mb-1">
                    Content Type
                  </label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-zinc-900 font-bold text-xs bg-white"
                  >
                    <option value="">Select type...</option>
                    <option value="Reels / Shorts (9:16)">Reels / Shorts (9:16)</option>
                    <option value="AI Visuals / Images">AI Visuals / Images</option>
                    <option value="Post & Ad Creative">Post & Ad Creative</option>
                    <option value="Motion Graphics">Motion Graphics</option>
                    <option value="Complete Monthly Package">Complete Monthly Package</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-800 mb-1">
                    Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-zinc-900 font-bold text-xs bg-white"
                  >
                    <option value="">Select budget range...</option>
                    <option value="Under ₹1,000">Under ₹1,000</option>
                    <option value="₹1,000 - ₹3,000">₹1,000 - ₹3,000</option>
                    <option value="₹3,000 - ₹7,000">₹3,000 - ₹7,000</option>
                    <option value="₹7,000+">₹7,000+</option>
                    <option value="Discuss on WhatsApp">Discuss on WhatsApp</option>
                  </select>
                </div>

                {/* Number of Creatives */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-800 mb-1">
                    Number of Creatives / Reels
                  </label>
                  <input
                    type="text"
                    value={creativesCount}
                    onChange={(e) => setCreativesCount(e.target.value)}
                    placeholder="e.g. 3 Reels, or 10 Creatives"
                    className="w-full px-2.5 py-2 rounded-xl border border-zinc-900 font-bold text-xs bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Preferred Delivery Date / Timeline */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-900 mb-1.5">
              Preferred Timeline (Optional)
            </label>
            <input
              type="text"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              placeholder="e.g., 24-48 hours, is weekend, ya flexible"
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-zinc-900 font-bold text-xs sm:text-sm bg-white shadow-[2px_2px_0px_#18181b]"
            />
          </div>

          <p className="text-[11px] text-zinc-500 font-semibold">
            💡 Submit karte hi WhatsApp open hoga with your enquiry details. Aap wahan direct send kar sakte hain.
          </p>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-zinc-950 text-white font-black text-sm sm:text-base border-2 border-zinc-900 shadow-[3px_3px_0px_#FACC15] hover:bg-zinc-800 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>Send Enquiry to WhatsApp 🚀</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
