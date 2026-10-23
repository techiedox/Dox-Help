import React, { useState, useMemo } from 'react';
import {
  Leaf,
  Sparkles,
  Video,
  Landmark,
  Printer,
  CreditCard,
  Briefcase,
  ChevronDown,
  Search,
  X,
  ArrowRight,
  AlertCircle,
  Clock,
  Star,
} from 'lucide-react';
import { ServiceCategory, ServiceItem, AvailabilityStatus } from '../types/service';

interface ServiceCatalogueProps {
  categories: ServiceCategory[];
  onSelectService: (service: ServiceItem, category: ServiceCategory) => void;
}

export const ServiceCatalogue: React.FC<ServiceCatalogueProps> = ({
  categories,
  onSelectService,
}) => {
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>('herbalife');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping
  const renderCategoryIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-zinc-950 stroke-[2.5]' };
    switch (iconName) {
      case 'Leaf':
        return <Leaf {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Video':
        return <Video {...props} />;
      case 'Landmark':
        return <Landmark {...props} />;
      case 'Printer':
        return <Printer {...props} />;
      case 'CreditCard':
        return <CreditCard {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  // Pastel accent color mapping for active and inactive categories
  const getCategoryTheme = (id: string, status: AvailabilityStatus) => {
    if (status !== 'active') {
      return {
        cardBg: 'bg-zinc-50',
        iconBg: 'bg-zinc-200',
        tagBg: 'bg-zinc-200 text-zinc-800',
        accentShadow: '#71717a',
      };
    }
    switch (id) {
      case 'herbalife':
        return {
          cardBg: 'bg-emerald-50/40',
          iconBg: 'bg-emerald-300',
          tagBg: 'bg-emerald-300 text-emerald-950',
          accentShadow: '#10B981',
        };
      case 'popular':
        return {
          cardBg: 'bg-amber-50/50',
          iconBg: 'bg-yellow-300',
          tagBg: 'bg-yellow-300 text-amber-950',
          accentShadow: '#F59E0B',
        };
      case 'social-media-ai':
        return {
          cardBg: 'bg-sky-50/40',
          iconBg: 'bg-sky-300',
          tagBg: 'bg-sky-300 text-sky-950',
          accentShadow: '#38BDF8',
        };
      default:
        return {
          cardBg: 'bg-white',
          iconBg: 'bg-zinc-100',
          tagBg: 'bg-zinc-100 text-zinc-900',
          accentShadow: '#18181b',
        };
    }
  };

  // Filtered categories
  const filteredCategories = useMemo(() => {
    let result = categories;
    if (statusFilter === 'active') {
      result = result.filter((c) => c.status === 'active');
    } else if (statusFilter === 'inactive') {
      result = result.filter((c) => c.status !== 'active');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result
        .map((cat) => {
          const matchingServices = cat.services.filter(
            (s) =>
              s.name.toLowerCase().includes(q) ||
              s.shortDesc.toLowerCase().includes(q) ||
              s.includedPoints.some((p) => p.toLowerCase().includes(q))
          );
          if (cat.title.toLowerCase().includes(q) || matchingServices.length > 0) {
            return {
              ...cat,
              services: matchingServices.length > 0 ? matchingServices : cat.services,
            };
          }
          return null;
        })
        .filter((c): c is ServiceCategory => c !== null);
    }

    return result;
  }, [categories, statusFilter, searchQuery]);

  const toggleCategory = (id: string) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id));
  };

  // Compact, non-wrapping status badge
  const renderStatusBadge = (status: AvailabilityStatus, label: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-zinc-950 text-white border border-zinc-900 whitespace-nowrap shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden min-[380px]:inline">Available Now</span>
            <span className="min-[380px]:hidden">Active</span>
          </span>
        );
      case 'coming_soon':
        return (
          <span className="inline-flex items-center gap-1 px-2 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-amber-100 text-amber-900 border border-zinc-800 whitespace-nowrap shrink-0">
            <Clock className="w-2.5 h-2.5 text-amber-800" />
            <span className="hidden min-[380px]:inline">Coming Soon</span>
            <span className="min-[380px]:hidden">Soon</span>
          </span>
        );
      case 'currently_unavailable':
        return (
          <span className="inline-flex items-center gap-1 px-2 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-zinc-100 text-zinc-600 border border-zinc-400 whitespace-nowrap shrink-0">
            <AlertCircle className="w-2.5 h-2.5 text-zinc-500" />
            <span className="hidden min-[380px]:inline">Unavailable</span>
            <span className="min-[380px]:hidden">Offline</span>
          </span>
        );
    }
  };

  return (
    <section id="services-section" className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-zinc-950 text-xs font-black mb-2 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-zinc-950" />
          <span>Services Catalogue</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          Explore Our Services
        </h2>
        <p className="text-xs sm:text-sm text-zinc-700 mt-1.5 font-semibold">
          Tap any category card below to see its available services.
        </p>
      </div>

      {/* Search Bar & Filter Controls */}
      <div className="space-y-3.5 mb-8">
        {/* Playful Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none stroke-[2.5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search (e.g. FSSAI, KYC, PAN, Reels)..."
            className="w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-2xl bg-white text-zinc-950 font-bold border-2 border-zinc-900 placeholder:text-zinc-400 text-xs sm:text-sm focus:outline-none shadow-[3px_3px_0px_#18181b] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-black cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-black">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl border-2 border-zinc-900 transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-zinc-950 text-white shadow-[2px_2px_0px_#FACC15]'
                : 'bg-white text-zinc-900 hover:bg-zinc-100 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            All Categories ({categories.length}) 📚
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3.5 py-1.5 rounded-xl border-2 border-zinc-900 transition-all cursor-pointer ${
              statusFilter === 'active'
                ? 'bg-emerald-300 text-zinc-950 shadow-[2px_2px_0px_#18181b]'
                : 'bg-white text-zinc-900 hover:bg-zinc-100 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            Available Now (3) ✨
          </button>
          <button
            onClick={() => setStatusFilter('inactive')}
            className={`px-3.5 py-1.5 rounded-xl border-2 border-zinc-900 transition-all cursor-pointer ${
              statusFilter === 'inactive'
                ? 'bg-yellow-300 text-zinc-950 shadow-[2px_2px_0px_#18181b]'
                : 'bg-white text-zinc-900 hover:bg-zinc-100 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            Upcoming & Offline (4) ⏳
          </button>
        </div>
      </div>

      {/* Accordion Categories List */}
      <div className="space-y-4">
        {filteredCategories.map((category) => {
          const isExpanded = expandedCategoryId === category.id || !!searchQuery.trim();
          const isActive = category.status === 'active';
          const theme = getCategoryTheme(category.id, category.status);

          return (
            <div
              key={category.id}
              className={`rounded-3xl border-2 border-zinc-900 transition-all overflow-hidden ${
                isExpanded
                  ? `shadow-[4px_4px_0px_#18181b] ${theme.cardBg}`
                  : 'bg-white hover:bg-zinc-50 shadow-[3px_3px_0px_#18181b]'
              }`}
            >
              {/* Category Card Header Button - Fixed, perfectly aligned flexbox */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-3.5 sm:p-5 flex items-center justify-between text-left gap-3 cursor-pointer focus:outline-none"
                aria-expanded={isExpanded}
              >
                {/* Left side: Icon + Title + Count + Tagline */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${theme.iconBg} border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] flex items-center justify-center shrink-0`}
                  >
                    {renderCategoryIcon(category.iconName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-sm sm:text-base font-black text-zinc-950 truncate">
                        {category.title}
                      </h3>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-400 shrink-0">
                        {category.services.length}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-600 font-semibold truncate mt-0.5">
                      {category.tagline}
                    </p>
                  </div>
                </div>

                {/* Right side: Fixed alignment for Status Badge + Dropdown Chevron */}
                <div className="flex items-center gap-2 shrink-0 self-center">
                  {renderStatusBadge(category.status, category.statusLabel)}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white border-2 border-zinc-900 flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#18181b] transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 bg-zinc-100' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-zinc-950 stroke-[3]" />
                  </div>
                </div>
              </button>

              {/* Accordion Body: Service List */}
              {isExpanded && (
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t-2 border-zinc-900 bg-white/70">
                  {/* Status Notice for Inactive Categories */}
                  {!isActive && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-zinc-100 border-2 border-zinc-900 text-xs text-zinc-800 flex items-start gap-2.5 font-bold shadow-[2px_2px_0px_#18181b]">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <div>
                        <strong className="text-zinc-950">{category.statusLabel}:</strong>{' '}
                        Yeh category currently planned / offline hai. Aap services dekh sakte hain, par direct enquiry abhi live nahi hai.
                      </div>
                    </div>
                  )}

                  {/* Clean Service Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => onSelectService(service, category)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectService(service, category);
                          }
                        }}
                        className={`p-3.5 sm:p-4 rounded-2xl border-2 border-zinc-900 text-left transition-all flex flex-col justify-between cursor-pointer ${
                          isActive
                            ? 'bg-white hover:bg-yellow-50/50 shadow-[2px_2px_0px_#18181b] hover:shadow-[4px_4px_0px_#18181b] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                            : 'bg-zinc-50 border-zinc-300 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <h4 className="text-xs sm:text-sm font-black text-zinc-950 line-clamp-1">
                              {service.name}
                            </h4>
                            {service.badge && (
                              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-300 shrink-0">
                                {service.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-600 font-medium line-clamp-2 leading-relaxed mb-3">
                            {service.shortDesc}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-[11px] font-black">
                          <span className="text-zinc-600">
                            {isActive ? (service.pricingNote || 'Price on enquiry') : 'Coming Soon'}
                          </span>
                          <span className="inline-flex items-center gap-1 text-zinc-950">
                            <span>{isActive ? 'Details' : 'View'}</span>
                            <ArrowRight className="w-3 h-3 stroke-[3]" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 px-4 rounded-3xl border-2 border-zinc-900 bg-white shadow-[3px_3px_0px_#18181b]">
            <Search className="w-8 h-8 text-zinc-400 mx-auto mb-2 stroke-[2.5]" />
            <h4 className="text-base font-black text-zinc-950">Koi matching service nahi mili</h4>
            <p className="text-xs text-zinc-600 mt-1 font-medium">
              Dusra word try karein ya filters reset karein.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-zinc-950 text-white text-xs font-black border-2 border-zinc-900 shadow-[2px_2px_0px_#FACC15] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
