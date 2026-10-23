# Dox Help — Your Digital Service Partner 🚀

A modern, mobile-first, playful service enquiry platform for **Dox Help**, designed and developed in collaboration with **Techie Dox**. 

Customers can explore available services, understand assistance details, make secure UPI payments, and submit structured enquiries directly to **WhatsApp (+91 8292061543)**.

---

## 🌟 Key Features

### 1. Active Service Catalogue (3 Core Categories)
- **🌿 Herbalife Services (18 Items)**: Associate ID onboarding, coach conversion, distributor registration, KYC & document verification, FoSCoS FSSAI licence filing & renewals, account troubleshooting, invoice downloads, and policy assistance.
- **📄 Popular & Online Services (10 Items)**: PAN card application & corrections, basic FSSAI registration, GSTIN collation, Udyam MSME registration, online exam/job form filling, PDF tools, and passport photo editing.
- **🎬 Social Media & AI Content Services (12 Items)**: Custom AI images & conceptual videos, high-converting promotional reels, kinetic typography, Instagram reels editing, Meta ad campaign setup, and profile revamp.

### 2. Extensible Future Categories (Built-in Availability Status)
Configured in `src/data/services.ts` with explicit availability states (`active`, `coming_soon`, `currently_unavailable`) without cluttering the UI:
- **🏛️ Government & Identity Services** (Coming Soon)
- **🖨️ Cyber Cafe & Document Services** (Currently Unavailable)
- **💳 Banking & Bill Payment Services** (Currently Unavailable)
- **💼 Business & Professional Services** (Coming Soon)

### 3. Structured WhatsApp Enquiries (+91 8292061543)
- Validates customer name and requirement description.
- Automatically generates prefilled WhatsApp chat links (`https://wa.me/918292061543?text=...`) matching a structured enquiry format.
- Contextual optional fields for creative services (budget range, content type, quantity of reels, preferred delivery timeline).

### 4. Seamless UPI Payment Integration
- Official PhonePe QR code embedded in a dedicated payment section.
- Clickable UPI ID (`8292061543@ybl`) with direct `upi://pay` app redirection on smartphones.
- 1-tap clipboard copy for instant transfers.

### 5. Progressive Web App (PWA)
- Installable as a standalone app on Android, iOS Safari, Windows, and macOS.
- Native `beforeinstallprompt` trigger with custom smartphone install button.
- 2-step guided instructions for iPhone & iPad users.
- Offline precaching powered by `vite-plugin-pwa` and Workbox.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 (Strict monochrome ink & sunny yellow accent palette)
- **Icons**: Lucide React
- **PWA**: `vite-plugin-pwa` + Workbox
- **State Management**: Centralized TypeScript service configuration (`src/data/services.ts`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation

```bash
# Clone repository
git clone https://github.com/techiedox/Dox-Help.git

# Navigate to project directory
cd Dox-Help

# Install dependencies
npm install

# Start local development server
npm run dev
```

The app will be running at `http://localhost:3000`.

### Building for Production

```bash
# Build production bundle with PWA service worker
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```text
├── public/
│   ├── assets/              # Uploaded brand assets & QR code
│   ├── favicon.ico          # Browser favicon
│   ├── icon.svg             # Vector brand icon
│   ├── pwa-192x192.png      # PWA home screen icon
│   └── pwa-512x512.png      # High-res splash icon
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Compact navbar with quick actions
│   │   ├── Hero.tsx         # High-impact personal hero section
│   │   ├── ServiceCatalogue.tsx # Category cards with accordions & search
│   │   ├── ServiceDetailModal.tsx # Bottom sheet / detail modal
│   │   ├── EnquiryModal.tsx # Structured WhatsApp enquiry form
│   │   ├── PaymentSection.tsx # Clickable UPI ID & QR payment card
│   │   ├── FloatingActions.tsx # WhatsApp & PWA install floating action buttons
│   │   └── Footer.tsx       # Attribution & direct contact links
│   ├── data/
│   │   └── services.ts      # Maintainable master service catalogue
│   ├── hooks/
│   │   └── usePWAInstall.ts # React PWA install & standalone detection hook
│   ├── types/
│   │   └── service.ts       # TypeScript interfaces
│   ├── App.tsx              # Main application root
│   └── main.tsx             # Entry point
└── vite.config.ts           # Vite + Tailwind + VitePWA config
```

---

## 📞 Contact & Support

- **Brand**: Dox Help
- **Tagline**: *Your Digital Service Partner.*
- **WhatsApp Support**: [+91 8292061543](https://wa.me/918292061543)
- **UPI ID**: `8292061543@ybl`
- **Developed by**: [Techie Dox](https://techiedox.vercel.app/)
