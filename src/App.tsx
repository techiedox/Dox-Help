/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceCatalogue } from './components/ServiceCatalogue';
import { PaymentSection } from './components/PaymentSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { EnquiryModal } from './components/EnquiryModal';
import { WhatsAppSuccessModal } from './components/WhatsAppSuccessModal';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { SERVICE_CATEGORIES } from './data/services';
import { ServiceCategory, ServiceItem } from './types/service';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  // Enquiry modal state
  const [enquiryService, setEnquiryService] = useState<ServiceItem | null>(null);
  const [enquiryCategory, setEnquiryCategory] = useState<ServiceCategory | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [pendingWhatsAppUrl, setPendingWhatsAppUrl] = useState<string | null>(null);

  const handleSelectService = (service: ServiceItem, category: ServiceCategory) => {
    setSelectedService(service);
    setSelectedCategory(category);
  };

  const handleProceedToEnquiry = (service: ServiceItem, category: ServiceCategory) => {
    // Only proceed for active categories
    if (category.status !== 'active') return;
    setSelectedService(null);
    setEnquiryService(service);
    setEnquiryCategory(category);
    setIsEnquiryModalOpen(true);
  };

  const handleEnquirySuccess = (whatsappUrl: string) => {
    setIsEnquiryModalOpen(false);
    setPendingWhatsAppUrl(whatsappUrl);
  };

  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPayment = () => {
    const el = document.getElementById('payment-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col selection:bg-zinc-900 selection:text-white pb-20 sm:pb-24">
      {/* Compact Header */}
      <Header
        onNavigateToServices={scrollToServices}
        onNavigateToPayment={scrollToPayment}
      />

      <main className="flex-1">
        {/* Compact Hero Section */}
        <Hero onExploreClick={scrollToServices} />

        {/* Professional Service Catalogue with Accordions & Filters */}
        <ServiceCatalogue
          categories={SERVICE_CATEGORIES}
          onSelectService={handleSelectService}
        />

        {/* Payment QR Code Section */}
        <PaymentSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Two Persistent Circular Floating Action Buttons (Left: WhatsApp, Right: Install App) */}
      <FloatingActions />

      {/* Service Detail Modal / Bottom Sheet */}
      <ServiceDetailModal
        service={selectedService}
        category={selectedCategory}
        onClose={() => {
          setSelectedService(null);
          setSelectedCategory(null);
        }}
        onProceedToEnquiry={handleProceedToEnquiry}
      />

      {/* Structured WhatsApp Enquiry Modal */}
      {isEnquiryModalOpen && (
        <EnquiryModal
          service={enquiryService}
          category={enquiryCategory}
          categories={SERVICE_CATEGORIES}
          onClose={() => setIsEnquiryModalOpen(false)}
          onSuccessPrompt={handleEnquirySuccess}
        />
      )}

      {/* WhatsApp Open Prompt Modal */}
      <WhatsAppSuccessModal
        whatsappUrl={pendingWhatsAppUrl}
        onClose={() => setPendingWhatsAppUrl(null)}
      />
    </div>
  );
}
