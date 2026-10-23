import React, { useEffect } from 'react';
import { X, Share2, PlusSquare, CheckCircle, Download } from 'lucide-react';
import { BRAND_NAME } from '../data/services';

interface InstallModalProps {
  isOpen: boolean;
  isIOS: boolean;
  isInstalled: boolean;
  onClose: () => void;
  onNativeInstall?: () => void;
  canPromptNative: boolean;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  isIOS,
  isInstalled,
  onClose,
  onNativeInstall,
  canPromptNative,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-modal-title"
        className="relative z-10 w-full max-w-sm bg-white rounded-2xl border border-zinc-200 shadow-xl p-5 sm:p-6 text-left animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-bold text-base">
              D+
            </div>
            <div>
              <h3 id="install-modal-title" className="font-bold text-base text-zinc-950 leading-tight">
                Install {BRAND_NAME}
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium">Fast home screen web app</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg border border-zinc-200 text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content based on state */}
        {isInstalled ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-center space-y-1.5">
              <CheckCircle className="w-7 h-7 text-zinc-900 mx-auto stroke-[2]" />
              <p className="text-xs font-bold text-zinc-900">App Already Installed</p>
              <p className="text-[11px] text-zinc-500 font-normal">
                {BRAND_NAME} is installed on your device. You can launch it directly from your home screen.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : canPromptNative ? (
          <div className="space-y-4">
            <p className="text-xs text-zinc-600 font-normal leading-relaxed">
              Install {BRAND_NAME} on your device for fast access and seamless WhatsApp enquiries right from your home screen.
            </p>
            <button
              onClick={() => {
                if (onNativeInstall) onNativeInstall();
              }}
              className="w-full py-3 rounded-2xl bg-yellow-300 text-zinc-950 font-black text-xs sm:text-sm border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <rect x="5" y="2" width="14" height="20" rx="3.5" />
                <line x1="10.5" y1="5.5" x2="13.5" y2="5.5" />
                <path d="M12 9v6" />
                <path d="M9.5 12.5L12 15l2.5-2.5" />
                <circle cx="12" cy="18.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
              <span>Install Dox Help App Now</span>
            </button>
          </div>
        ) : isIOS ? (
          <div className="space-y-4">
            <p className="text-xs text-zinc-600 font-normal leading-relaxed">
              Follow these 2 quick steps to add {BRAND_NAME} to your iPhone or iPad:
            </p>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div className="text-xs font-medium text-zinc-800">
                  Tap the <span className="font-semibold">Share</span> icon <Share2 className="inline w-3 h-3 stroke-[2] ml-1" /> in Safari.
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <div className="text-xs font-medium text-zinc-800">
                  Scroll down and tap <span className="font-semibold">Add to Home Screen</span> <PlusSquare className="inline w-3 h-3 stroke-[2] ml-1" />.
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Got It
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-zinc-600 font-normal leading-relaxed">
              To install {BRAND_NAME} on your browser:
            </p>
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 space-y-1">
              <p>• <strong>Chrome / Android:</strong> Tap the browser menu (⋮) and choose <strong>Install App</strong>.</p>
              <p>• <strong>Desktop:</strong> Click the install icon in your address bar.</p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Understood
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
