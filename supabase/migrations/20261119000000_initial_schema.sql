-- ==============================================================================
-- IVORY & GRACE PROPERTY - PROPERTY MARKETING & ADVISORY DIGITAL PLATFORM
-- INITIAL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- Target DB: PostgreSQL 15+ (Supabase)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. ADMIN USERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'super_admin' CHECK (role IN ('super_admin', 'property_manager', 'editor')),
    phone VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 2. DEVELOPERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.developers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    pic_name VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'Pending Verification' CHECK (status IN ('Active', 'Pending Verification', 'Inactive')),
    verification_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 3. PROPERTY PROJECTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.property_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_id UUID REFERENCES public.developers(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    address TEXT,
    marketing_type VARCHAR(50) NOT NULL DEFAULT 'Open Listing' CHECK (marketing_type IN ('Exclusive', 'Co-Brokering', 'Open Listing')),
    status VARCHAR(50) NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published', 'Archived')),
    hero_image_url TEXT,
    brochure_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 4. PROPERTIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.property_projects(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('Rumah Cluster', 'Rumah Ready Stock', 'Ruko Komersial', 'Kavling Tanah', 'Secondary Property')),
    listing_type VARCHAR(50) NOT NULL CHECK (listing_type IN ('Primary / Baru', 'Secondary', 'Developer Project')),
    price_min BIGINT NOT NULL CHECK (price_min >= 0),
    price_max BIGINT,
    price_display VARCHAR(100) NOT NULL,
    land_area_sqm INT NOT NULL DEFAULT 0,
    building_area_sqm INT NOT NULL DEFAULT 0,
    bedrooms SMALLINT NOT NULL DEFAULT 0,
    bathrooms SMALLINT NOT NULL DEFAULT 0,
    floors SMALLINT NOT NULL DEFAULT 1,
    carports SMALLINT NOT NULL DEFAULT 1,
    electricity_va INT NOT NULL DEFAULT 1300,
    water_source VARCHAR(100) DEFAULT 'PDAM',
    certificate_type VARCHAR(50) NOT NULL DEFAULT 'SHM' CHECK (certificate_type IN ('SHM', 'HGB', 'PPJB', 'Girik / Lainnya')),
    status VARCHAR(50) NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published', 'Archived')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_demo BOOLEAN NOT NULL DEFAULT false,
    last_inventory_verified_at DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT NOT NULL,
    location_city VARCHAR(100) NOT NULL,
    location_district VARCHAR(100) NOT NULL,
    address_short VARCHAR(255) NOT NULL,
    coordinates POINT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 5. PROPERTY UNITS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.property_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    unit_number VARCHAR(50) NOT NULL,
    block VARCHAR(50) NOT NULL,
    price BIGINT NOT NULL CHECK (price >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Reserved', 'Sold', 'Unavailable', 'Coming Soon')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 6. PROPERTY IMAGES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    alt_text VARCHAR(255) NOT NULL,
    sort_order INT NOT NULL DEFAULT 1,
    is_cover BOOLEAN NOT NULL DEFAULT false,
    storage_path VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 7. LEADS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    phone_whatsapp VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    source VARCHAR(100) NOT NULL DEFAULT 'Website Inquiry',
    status VARCHAR(50) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Follow Up', 'Negotiation', 'Converted', 'Lost')),
    notes TEXT,
    assigned_to UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 8. INQUIRIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    project_id UUID REFERENCES public.property_projects(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_whatsapp VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    budget_range VARCHAR(100) NOT NULL,
    purchase_purpose VARCHAR(100) NOT NULL CHECK (purchase_purpose IN ('Tempat Tinggal Pribadi', 'Investasi Sewa', 'Pilihan Pertama Anak', 'Lainnya')),
    message TEXT,
    consent_agreed BOOLEAN NOT NULL DEFAULT true,
    ip_hash VARCHAR(64),
    status VARCHAR(50) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Follow Up', 'Negotiation', 'Converted', 'Lost')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 9. PARTNERSHIP REQUESTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.partnership_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    pic_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    proposal_message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Prospect' CHECK (status IN ('Prospect', 'Contacted', 'Proposal Sent', 'Under Review', 'Negotiation', 'Approved', 'Rejected')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 10. MEDIA ASSETS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name VARCHAR(255) NOT NULL,
    storage_path VARCHAR(255) NOT NULL UNIQUE,
    file_size_bytes INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    bucket VARCHAR(100) NOT NULL DEFAULT 'property-assets',
    uploaded_by UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 11. WEBSITE SETTINGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.website_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value JSONB NOT NULL DEFAULT '{}'::jsonb,
    category VARCHAR(50) NOT NULL DEFAULT 'general',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 12. ACTIVITY LOGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID,
    payload JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- INDEXES FOR QUERY OPTIMIZATION
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(location_city);
CREATE INDEX IF NOT EXISTS idx_property_projects_slug ON public.property_projects(slug);
CREATE INDEX IF NOT EXISTS idx_property_units_property ON public.property_units(property_id);
CREATE INDEX IF NOT EXISTS idx_property_images_property ON public.property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_property ON public.inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_partnership_status ON public.partnership_requests(status);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON public.activity_logs(created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnership_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if caller is an active authenticated admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE auth_user_id = auth.uid() AND is_active = true
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROPERTIES & PROJECTS: Public can only SELECT 'Published' items
CREATE POLICY "Public can view published projects"
    ON public.property_projects FOR SELECT
    TO anon, authenticated
    USING (status = 'Published');

CREATE POLICY "Admins have full access to projects"
    ON public.property_projects FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Public can view published properties"
    ON public.properties FOR SELECT
    TO anon, authenticated
    USING (status = 'Published');

CREATE POLICY "Admins have full access to properties"
    ON public.properties FOR ALL
    TO authenticated
    USING (public.is_admin());

-- 2. PROPERTY IMAGES & UNITS: Public can view for published properties
CREATE POLICY "Public can view images for published properties"
    ON public.property_images FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.properties
            WHERE public.properties.id = public.property_images.property_id
            AND public.properties.status = 'Published'
        )
    );

CREATE POLICY "Admins have full access to property images"
    ON public.property_images FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Public can view units for published properties"
    ON public.property_units FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.properties
            WHERE public.properties.id = public.property_units.property_id
            AND public.properties.status = 'Published'
        )
    );

CREATE POLICY "Admins have full access to property units"
    ON public.property_units FOR ALL
    TO authenticated
    USING (public.is_admin());

-- 3. INQUIRIES & PARTNERSHIPS: Public can INSERT, only Admin can SELECT/UPDATE/DELETE
CREATE POLICY "Public can submit inquiries"
    ON public.inquiries FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Admins have full access to inquiries"
    ON public.inquiries FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Public can submit partnership requests"
    ON public.partnership_requests FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Admins have full access to partnership requests"
    ON public.partnership_requests FOR ALL
    TO authenticated
    USING (public.is_admin());

-- 4. LEADS, DEVELOPERS, ADMIN USERS, SETTINGS, LOGS, MEDIA: ADMIN ONLY
CREATE POLICY "Admins have full access to leads"
    ON public.leads FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Admins have full access to developers"
    ON public.developers FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Admins have full access to admin_users"
    ON public.admin_users FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Public can view general website settings"
    ON public.website_settings FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admins can manage website settings"
    ON public.website_settings FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Admins have full access to media assets"
    ON public.media_assets FOR ALL
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Admins can view activity logs"
    ON public.activity_logs FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Server can insert activity logs"
    ON public.activity_logs FOR INSERT
    TO authenticated
    WITH CHECK (true);
