export type UnitStatus = 'Available' | 'Reserved' | 'Sold' | 'Unavailable' | 'Coming Soon';
export type ListingStatus = 'Draft' | 'Published' | 'Archived';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Follow Up' | 'Negotiation' | 'Converted' | 'Lost';
export type PartnershipStatus = 'Prospect' | 'Contacted' | 'Proposal Sent' | 'Under Review' | 'Negotiation' | 'Approved' | 'Rejected';

export interface Developer {
  id: string;
  name: string;
  legal_name: string;
  pic_name: string;
  phone: string;
  email: string;
  website?: string;
  status: 'Active' | 'Pending Verification' | 'Inactive';
  verification_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyProject {
  id: string;
  developer_id: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  district: string;
  address: string;
  marketing_type: 'Exclusive' | 'Co-Brokering' | 'Open Listing';
  status: ListingStatus;
  hero_image_url?: string;
  brochure_url?: string;
  created_at: string;
  updated_at: string;
  developer?: Developer;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  thumbnail_url?: string;
  alt_text: string;
  sort_order: number;
  is_cover: boolean;
  storage_path?: string;
  created_at: string;
}

export interface PropertyUnit {
  id: string;
  property_id: string;
  unit_number: string;
  block: string;
  price: number;
  status: UnitStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  project_id?: string;
  title: string;
  slug: string;
  property_type: 'Rumah Cluster' | 'Rumah Ready Stock' | 'Ruko Komersial' | 'Kavling Tanah' | 'Secondary Property';
  listing_type: 'Primary / Baru' | 'Secondary' | 'Developer Project';
  price_min: number;
  price_max?: number;
  price_display: string;
  land_area_sqm: number;
  building_area_sqm: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  carports: number;
  electricity_va: number;
  water_source: string;
  certificate_type: 'SHM' | 'HGB' | 'PPJB' | 'Girik / Lainnya';
  status: ListingStatus;
  is_featured: boolean;
  is_demo: boolean;
  last_inventory_verified_at: string;
  description: string;
  location_city: string;
  location_district: string;
  address_short: string;
  coordinates?: { lat: number; lng: number };
  created_at: string;
  updated_at: string;
  project?: PropertyProject;
  images: PropertyImage[];
  units?: PropertyUnit[];
}

export interface Lead {
  id: string;
  full_name: string;
  phone_whatsapp: string;
  email?: string;
  source: string;
  status: LeadStatus;
  notes?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  lead_id?: string;
  property_id?: string;
  project_id?: string;
  full_name: string;
  phone_whatsapp: string;
  email?: string;
  budget_range: string;
  purchase_purpose: 'Tempat Tinggal Pribadi' | 'Investasi Sewa' | 'Pilihan Pertama Anak' | 'Lainnya';
  message?: string;
  consent_agreed: boolean;
  status: LeadStatus;
  created_at: string;
  property?: Property;
}

export interface PartnershipRequest {
  id: string;
  company_name: string;
  project_name: string;
  pic_name: string;
  email: string;
  phone: string;
  proposal_message: string;
  status: PartnershipStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface WebsiteSetting {
  id: string;
  setting_key: string;
  setting_value: Record<string, any>;
  category: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  payload?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}
