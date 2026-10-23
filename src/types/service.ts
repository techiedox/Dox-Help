export type AvailabilityStatus = 'active' | 'coming_soon' | 'currently_unavailable';

export type ServiceCategoryId =
  | 'herbalife'
  | 'popular'
  | 'social-media-ai'
  | 'govt-identity'
  | 'cyber-cafe'
  | 'banking-bills'
  | 'business-prof';

export interface ServiceItem {
  id: string;
  categoryId: ServiceCategoryId;
  name: string;
  shortDesc: string;
  badge?: string;
  pricingNote?: string; // "Price on enquiry" by default
  includedPoints: string[];
  requiredDocs?: string[];
  disclaimer?: string;
  isAvailable?: boolean; // Defaults to true if category is active
}

export interface ServiceCategory {
  id: ServiceCategoryId;
  title: string;
  shortTitle: string;
  tagline: string;
  iconName: string;
  status: AvailabilityStatus; // 'active', 'coming_soon', or 'currently_unavailable'
  statusLabel: string; // 'Available Now', 'Coming Soon', 'Currently Unavailable'
  services: ServiceItem[];
}

export interface EnquiryFormData {
  customerName: string;
  categoryTitle: string;
  serviceName: string;
  description: string;
  // Optional conditional fields for social media / creative services
  platform?: string;
  contentType?: string;
  creativesCount?: string;
  budget?: string;
  preferredDate?: string;
}
