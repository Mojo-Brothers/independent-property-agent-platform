# DATABASE SCHEMA SPECIFICATION
## Robby Viory Fansya – Independent Property Agent Platform

**Database Engine:** PostgreSQL 15+ (Supabase)  
**Primary Key Convention:** UUID (v4 / `gen_random_uuid()`)  
**Security Model:** Row Level Security (RLS) Active on All 12 Tables  

---

## 1. TABLE DEFINITIONS

### 1. `admin_users`
Menyimpan data identitas administrator yang terikat dengan Supabase Auth (`auth.users`).
* `id` (UUID, PK)
* `auth_user_id` (UUID, FK -> `auth.users.id`, UNIQUE)
* `email` (VARCHAR(255), UNIQUE, NOT NULL)
* `full_name` (VARCHAR(255), NOT NULL)
* `role` (VARCHAR(50), CHECK `super_admin`, `property_manager`, `editor`)
* `phone` (VARCHAR(50))
* `is_active` (BOOLEAN, DEFAULT true)
* `last_login_at` (TIMESTAMPTZ)
* `created_at`, `updated_at` (TIMESTAMPTZ)

### 2. `developers`
Menyimpan profil pengembang properti dan status kemitraan resmi.
* `id` (UUID, PK)
* `name` (VARCHAR(255), NOT NULL)
* `legal_name` (VARCHAR(255))
* `pic_name` (VARCHAR(255))
* `phone` (VARCHAR(50))
* `email` (VARCHAR(255))
* `website` (VARCHAR(255))
* `status` (VARCHAR(50), CHECK `Active`, `Pending Verification`, `Inactive`)
* `verification_notes` (TEXT)
* `created_at`, `updated_at` (TIMESTAMPTZ)

### 3. `property_projects`
Menyimpan master data kawasan perumahan / cluster proyek developer.
* `id` (UUID, PK)
* `developer_id` (UUID, FK -> `developers.id`, ON DELETE SET NULL)
* `name` (VARCHAR(255), NOT NULL)
* `slug` (VARCHAR(255), UNIQUE, NOT NULL)
* `description` (TEXT)
* `city` (VARCHAR(100), NOT NULL)
* `district` (VARCHAR(100), NOT NULL)
* `address` (TEXT)
* `marketing_type` (VARCHAR(50), CHECK `Exclusive`, `Co-Brokering`, `Open Listing`)
* `status` (VARCHAR(50), CHECK `Draft`, `Published`, `Archived`)
* `hero_image_url`, `brochure_url` (TEXT)
* `created_at`, `updated_at` (TIMESTAMPTZ)

### 4. `properties`
Menyimpan tipe unit rumah, ruko, atau properti sekunder dengan spesifikasi teknis lengkap.
* `id` (UUID, PK)
* `project_id` (UUID, FK -> `property_projects.id`, ON DELETE SET NULL)
* `title` (VARCHAR(255), NOT NULL)
* `slug` (VARCHAR(255), UNIQUE, NOT NULL)
* `property_type` (VARCHAR(50), CHECK `Rumah Cluster`, `Rumah Ready Stock`, `Ruko Komersial`, `Kavling Tanah`, `Secondary Property`)
* `listing_type` (VARCHAR(50), CHECK `Primary / Baru`, `Secondary`, `Developer Project`)
* `price_min` (BIGINT, NOT NULL)
* `price_max` (BIGINT)
* `price_display` (VARCHAR(100), NOT NULL)
* `land_area_sqm` (INT, NOT NULL)
* `building_area_sqm` (INT, NOT NULL)
* `bedrooms` (SMALLINT, NOT NULL)
* `bathrooms` (SMALLINT, NOT NULL)
* `floors` (SMALLINT, NOT NULL)
* `carports` (SMALLINT, NOT NULL)
* `electricity_va` (INT, NOT NULL)
* `water_source` (VARCHAR(100))
* `certificate_type` (VARCHAR(50), CHECK `SHM`, `HGB`, `PPJB`, `Girik / Lainnya`)
* `status` (VARCHAR(50), CHECK `Draft`, `Published`, `Archived`)
* `is_featured` (BOOLEAN, DEFAULT false)
* `is_demo` (BOOLEAN, DEFAULT false)
* `last_inventory_verified_at` (DATE, NOT NULL)
* `description` (TEXT, NOT NULL)
* `location_city`, `location_district`, `address_short` (VARCHAR, NOT NULL)
* `created_at`, `updated_at` (TIMESTAMPTZ)

### 5. `property_units`
Menyimpan ketersediaan unit fisik spesifik per nomor unit dan blok.
* `id` (UUID, PK)
* `property_id` (UUID, FK -> `properties.id`, ON DELETE CASCADE)
* `unit_number` (VARCHAR(50), NOT NULL)
* `block` (VARCHAR(50), NOT NULL)
* `price` (BIGINT, NOT NULL)
* `status` (VARCHAR(50), CHECK `Available`, `Reserved`, `Sold`, `Unavailable`, `Coming Soon`)
* `notes` (TEXT)
* `created_at`, `updated_at` (TIMESTAMPTZ)

### 6. `property_images`
Menyimpan foto galeri properti dan urutan tampilan.
* `id` (UUID, PK)
* `property_id` (UUID, FK -> `properties.id`, ON DELETE CASCADE)
* `image_url` (TEXT, NOT NULL)
* `thumbnail_url` (TEXT)
* `alt_text` (VARCHAR(255), NOT NULL)
* `sort_order` (INT, DEFAULT 1)
* `is_cover` (BOOLEAN, DEFAULT false)
* `storage_path` (VARCHAR(255))
* `created_at` (TIMESTAMPTZ)

### 7. `leads`
Menyimpan basis data prospek calon pembeli dan tahapan CRM follow-up.
* `id` (UUID, PK)
* `full_name` (VARCHAR(255), NOT NULL)
* `phone_whatsapp` (VARCHAR(50), NOT NULL)
* `email` (VARCHAR(255))
* `source` (VARCHAR(100), NOT NULL)
* `status` (VARCHAR(50), CHECK `New`, `Contacted`, `Qualified`, `Follow Up`, `Negotiation`, `Converted`, `Lost`)
* `notes` (TEXT)
* `assigned_to` (UUID, FK -> `admin_users.id`)
* `created_at`, `updated_at` (TIMESTAMPTZ)

### 8. `inquiries`
Menyimpan tiket pertanyaan spesifik dari pengunjung terkait properti tertentu.
* `id` (UUID, PK)
* `lead_id` (UUID, FK -> `leads.id`, ON DELETE SET NULL)
* `property_id` (UUID, FK -> `properties.id`, ON DELETE SET NULL)
* `project_id` (UUID, FK -> `property_projects.id`, ON DELETE SET NULL)
* `full_name`, `phone_whatsapp` (VARCHAR, NOT NULL)
* `email` (VARCHAR(255))
* `budget_range` (VARCHAR(100), NOT NULL)
* `purchase_purpose` (VARCHAR(100), NOT NULL)
* `message` (TEXT)
* `consent_agreed` (BOOLEAN, NOT NULL)
* `ip_hash` (VARCHAR(64))
* `status` (VARCHAR(50), NOT NULL)
* `created_at`, `updated_at` (TIMESTAMPTZ)

### 9. `partnership_requests`
Menyimpan formulir pengajuan kerja sama pemasaran dari pengembang / developer.
* `id` (UUID, PK)
* `company_name`, `project_name`, `pic_name` (VARCHAR(255), NOT NULL)
* `email` (VARCHAR(255), NOT NULL)
* `phone` (VARCHAR(50), NOT NULL)
* `proposal_message` (TEXT, NOT NULL)
* `status` (VARCHAR(50), CHECK `Prospect`, `Contacted`, `Proposal Sent`, `Under Review`, `Negotiation`, `Approved`, `Rejected`)
* `notes` (TEXT)
* `created_at`, `updated_at` (TIMESTAMPTZ)

### 10. `media_assets`
Metadata file brosur PDF dan gambar di Supabase Storage.
* `id` (UUID, PK)
* `file_name` (VARCHAR(255), NOT NULL)
* `storage_path` (VARCHAR(255), UNIQUE, NOT NULL)
* `file_size_bytes` (INT, NOT NULL)
* `mime_type` (VARCHAR(100), NOT NULL)
* `bucket` (VARCHAR(100), NOT NULL)
* `uploaded_by` (UUID, FK -> `admin_users.id`)
* `created_at` (TIMESTAMPTZ)

### 11. `website_settings`
Konfigurasi dinamis branding, nomor WhatsApp, email, dan setting SEO.
* `id` (UUID, PK)
* `setting_key` (VARCHAR(100), UNIQUE, NOT NULL)
* `setting_value` (JSONB, NOT NULL)
* `category` (VARCHAR(50), NOT NULL)
* `updated_at` (TIMESTAMPTZ)

### 12. `activity_logs`
Catatan jejak audit aktivitas perubahan data oleh admin.
* `id` (UUID, PK)
* `user_id` (UUID, FK -> `admin_users.id`)
* `action` (VARCHAR(100), NOT NULL)
* `entity_type` (VARCHAR(100), NOT NULL)
* `entity_id` (UUID)
* `payload` (JSONB)
* `ip_address` (VARCHAR(50))
* `created_at` (TIMESTAMPTZ)
