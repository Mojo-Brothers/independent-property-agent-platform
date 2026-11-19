# ROBBY VIORY FANSYA – INDEPENDENT PROPERTY AGENT (IPA)
## Digital Business Platform & Corporate Marketing Portal

Platform bisnis digital, katalog portofolio perumahan, dan sistem CRM pemasaran properti mandiri milik **Robby Viory Fansya** sebagai *Independent Property Agent (IPA)* yang berfokus pada koridor strategis **Kota Bekasi, Kabupaten Bekasi, Cikarang, Grand Wisata, dan sekitarnya**.

---

## 🌟 FITUR UTAMA SISTEM

### A. Public Website (Portal Publik)
* **Beranda (`/`):** Hero korporat elegan, identitas Independent Property Agent, area of expertise Bekasi–Cikarang, featured properties, skema kemitraan developer, dan floating WhatsApp CTA.
* **Tentang Robby (`/about`):** Profil profesional, filosofi kerja *evidence-based*, arsitektur pemasaran digital, serta visi kemitraan tanpa klaim fiktif.
* **Layanan (`/services`):** 7 pilar layanan pemasaran properti (Developer Partnership, New Property, Ready Stock, Residential Advisory, Secondary Property, Buyer Acquisition, Digital Campaign).
* **Katalog Listing Properti (`/properties`):** Filter multi-parameter dinamis (Wilayah, Tipe Properti, Rentang Budget, Kata Kunci).
* **Detail Properti (`/properties/[slug]`):** Galeri foto interaktif, spesifikasi teknis lengkap (LT/LB, KT/KM, Listrik, Air, Legalitas), matriks ketersediaan unit fisik (Available/Reserved/Sold), tanggal verifikasi inventori, dan modal inquiry.
* **Kemitraan Pengembang (`/developer-partnership`):** Media presentasi resmi bagi pengembang (misal: PT Pos Properti Indonesia & developer cluster), penjelasan model Co-Brokering / Exclusive Agency, alur kerja sama, dan formulir aplikasi kemitraan.
* **Kontak (`/contact`):** Saluran WhatsApp, email resmi, jam operasional, peta area, dan formulir konsultasi langsung.
* **Legalitas & Kepatuhan:** Kebijakan Privasi (UU PDP No. 27/2022), Syarat & Ketentuan Layanan, serta Disclaimer Listing & Harga Properti.
* **SEO & Sinyal Mesin Pencari:** `sitemap.xml`, `robots.txt`, OpenGraph meta tags, Canonical URLs, dan Schema.org `RealEstateAgent` JSON-LD.

### B. Admin Dashboard & CRM System (`/admin`)
* **Portal Login Tertutup (`/admin/login`):** Keamanan tinggi tanpa registrasi publik (registrasi publik dinonaktifkan).
* **Ringkasan Dashboard (`/admin`):** Metrik ringkas total listing, rasio stok unit fisik, prospek leads masuk, dan proposal kemitraan pengembang.
* **Kelola Properti (`/admin/properties`):** Tabel listing aktif, filter kategori, status publikasi, dan verifikasi inventori.
* **Kelola Pengembang (`/admin/developers`):** Database developer, PIC resmi, status verifikasi legalitas.
* **Kelola Proyek Kawasan (`/admin/projects`):** Master data kawasan cluster & perumahan pengembang.
* **Inventori Stok Unit (`/admin/units`):** Matriks stok fisik per nomor unit dan blok (*Available, Reserved, Sold*).
* **Lead & Inquiry CRM (`/admin/leads`):** Manajemen prospek calon pembeli dengan tahapan pipeline (*New, Contacted, Qualified, Follow Up, Negotiation, Converted, Lost*).
* **Pengajuan Kemitraan (`/admin/partnerships`):** Pipeline penawaran kerja sama proyek dari pengembang.
* **Pengaturan Platform & SEO (`/admin/settings`):** Sinkronisasi kontak WhatsApp, email, dan meta description.

---

## 🛠️ TECHNOLOGY STACK (FREE-TIER INFRASTRUCTURE)

* **Frontend:** [Astro](https://astro.build/) (Hybrid SSR/SSG), TypeScript, Tailwind CSS, Lucide Icons.
* **Styling & Design System:** Tailwind CSS kustom dengan palet warna korporat (*Deep Navy `#0A192F`*, *Warm White/Alabaster `#F8FAFC`*, dan aksen *Champagne Gold `#D4AF37`*).
* **Serverless Compute:** Cloudflare Pages Functions (`@astrojs/cloudflare`).
* **Backend Database & Auth:** Supabase PostgreSQL 15+, Row Level Security (RLS), Supabase Storage.
* **Hosting & CDN:** Cloudflare Pages (Gratis, Subdomain `*.pages.dev`, HTTPS otomatis).
* **Bot Protection:** Cloudflare Turnstile token validation.

---

## 🚀 PANDUAN MENJALANKAN SECARA LOKAL

### 1. Prasyarat
* Node.js v18+ atau v20+ (diuji pada v26.13.0)
* npm v9+

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi konfigurasi Supabase Anda (atau biarkan kosong untuk mode preview data terverifikasi).

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Akses website melalui browser di `http://localhost:4321`.

### 5. Memeriksa Tipe & Build Produksi
```bash
npm run check
npm run build
```

---

## 🔐 KREDENSIAL SETUP AWAL ADMIN

Untuk pengujian awal dashboard administrasi di `/admin/login`:
* **Email:** `robby@robbyproperty.com`
* **Kata Sandi:** `AdminProperti2026!`

*(Catatan: Setelah menghubungkan Supabase, akun admin dapat diprovisioning langsung melalui Supabase Auth dengan mematikan fitur registrasi publik).*

---

## 📁 DOKUMENTASI LENGKAP ARSITEKTUR

1. [ARCHITECTURE.md](ARCHITECTURE.md) – Desain arsitektur sistem Cloudflare + Supabase.
2. [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) – Skema 12 tabel PostgreSQL & constraints.
3. [ERD.md](ERD.md) – Diagram relasi antar tabel (Entity Relationship Diagram).
4. [API_DOCUMENTATION.md](API_DOCUMENTATION.md) – Kontrak API endpoint serverless.
5. [SECURITY.md](SECURITY.md) – Arsitektur keamanan, RLS policies, dan perlindungan data PII.
6. [DEPLOYMENT.md](DEPLOYMENT.md) – Panduan deployment Cloudflare Pages & Supabase.
7. [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) – Kamus variabel lingkungan.
8. [TEST_REPORT.md](TEST_REPORT.md) – Laporan pengujian fungsional dan keamanan.
9. [PROJECT_STATUS.md](PROJECT_STATUS.md) – Status milestone proyek dan Quality Gates.

---
© 2026 Robby Viory Fansya. Hak Cipta Dilindungi Undang-Undang.
