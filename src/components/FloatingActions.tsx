import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_RAW_NUMBER } from '../data/services';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { InstallModal } from './InstallModal';

// Custom Remade Mobile App Download / Install Icon (Cartoonish / Neobrutalist Line Style)
const MobileAppInstallIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Smartphone Frame */}
    <rect x="5" y="2" width="14" height="20" rx="3.5" />
    {/* Speaker notch */}
    <line x1="10.5" y1="5.5" x2="13.5" y2="5.5" />
    {/* Download Arrow inside Screen */}
    <path d="M12 9v6" />
    <path d="M9.5 12.5L12 15l2.5-2.5" />
    {/* Home Indicator */}
    <circle cx="12" cy="18.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const MobileAppInstalledIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="5" y="2" width="14" height="20" rx="3.5" />
    <path d="M9 12.5l2 2 4-4" strokeWidth="2.5" />
    <circle cx="12" cy="18.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const FloatingActions: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome === 'unsupported' || outcome === 'dismissed') {
        setShowInstallModal(true);
      }
    } else {
      setShowInstallModal(true);
    }
  };

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    'Hello Dox Help, I would like assistance with your digital services.'
  )}`;

  return (
    <>
      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-5 inset-x-0 z-40 pointer-events-none px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Left Circle: WhatsApp */}
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Dox Help on WhatsApp"
            className="pointer-events-auto group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-zinc-950 text-white border-2 border-zinc-900 flex items-center justify-center shadow-[3px_3px_0px_#10B981] hover:scale-105 active:scale-95 active:shadow-[1px_1px_0px_#10B981] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 stroke-[2.5]" />

            {/* Hover Tooltip */}
            <span className="hidden sm:group-hover:inline-block absolute left-16 px-3 py-1.5 bg-zinc-950 text-white text-xs font-black rounded-xl whitespace-nowrap shadow-[2px_2px_0px_#10B981] border-2 border-zinc-900 pointer-events-none transition-opacity">
              Contact us on WhatsApp 💬
            </span>
          </a>

          {/* Right Circle: Install / Download PWA with Remade Smartphone Install Icon (Identical Color Combination Kept) */}
          <button
            onClick={handleInstallClick}
            type="button"
            aria-label="Install Dox Help"
            className="pointer-events-auto group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-yellow-300 text-zinc-950 border-2 border-zinc-900 flex items-center justify-center shadow-[3px_3px_0px_#18181b] hover:scale-105 active:scale-95 active:shadow-[1px_1px_0px_#18181b] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            {isInstalled ? (
              <MobileAppInstalledIcon className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-950" />
            ) : (
              <MobileAppInstallIcon className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-950" />
            )}

            {/* Hover Tooltip */}
            <span className="hidden sm:group-hover:inline-block absolute right-16 px-3 py-1.5 bg-zinc-950 text-white text-xs font-black rounded-xl whitespace-nowrap shadow-[2px_2px_0px_#FACC15] border-2 border-zinc-900 pointer-events-none transition-opacity">
              {isInstalled ? 'App Installed 🎉' : 'Install Dox Help App 📲'}
            </span>
          </button>
        </div>
      </div>

      {/* Companion Install Instruction Modal */}
      <InstallModal
        isOpen={showInstallModal}
        isIOS={isIOS}
        isInstalled={isInstalled}
        canPromptNative={isInstallable}
        onClose={() => setShowInstallModal(false)}
        onNativeInstall={async () => {
          setShowInstallModal(false);
          await install();
        }}
      />
    </>
  );
};
