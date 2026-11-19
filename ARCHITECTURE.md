# SYSTEM ARCHITECTURE DOCUMENTATION
## IVORY & GRACE PROPERTY – Property Marketing & Advisory Platform

**Document Version:** 1.0.0  
**Target Environment:** Cloudflare Pages (Free Tier) + Supabase PostgreSQL (Free Tier)  
**Date:** November 19, 2026  

---

## 1. HIGH-LEVEL ARCHITECTURE OVERVIEW

Arsitektur platform dirancang dengan model **Edge-Rendered Hybrid Jamstack**:

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|  +-------------------------------------+   +------------------------------------+ |
|  |     Visitor Browser (Public)        |   |      Admin Browser (Protected)     | |
|  |   - Mobile (Priority 75%+ traffic)  |   |   - Desktop Management             | |
|  |   - Desktop Showcase & Filtering    |   |   - Direct CRM Pipeline            | |
|  +-------------------------------------+   +------------------------------------+ |
+------------------------------------------+----------------------------------------+
                                           | HTTPS
                                           v
+-----------------------------------------------------------------------------------+
|                        CLOUDFLARE PAGES GLOBAL NETWORK                            |
|                                                                                   |
|  +-----------------------------------+   +--------------------------------------+ |
|  |       Static Edge Cache (CDN)     |   |    Cloudflare Pages Functions        | |
|  |  - SSG Marketing Pages            |   |    (Serverless SSR Endpoints)        | |
|  |  - Optimized CSS & JS Chunks      |   |  - /api/inquiries                    | |
|  |  - Favicon, Sitemap, Robots.txt   |   |  - /api/partnerships                 | |
|  |  - Images & Visual Assets         |   |  - /api/auth/login & logout          | |
|  |                                   |   |  - Admin Protected Routes (/admin/*) | |
|  +-----------------------------------+   +--------------------------------------+ |
+------------------------------------------+----------------------------------------+
                                           | Secure REST / WebSocket
                                           v
+-----------------------------------------------------------------------------------+
|                         SUPABASE BACKEND INFRASTRUCTURE                           |
|                                                                                   |
|  +-------------------------+ +------------------------+ +-----------------------+ |
|  |      Supabase Auth      | |   PostgreSQL 15+ DB    | |   Supabase Storage    | |
|  |  - JWT Session Tokens   | |  - 12 Normalized Tables| |  - Property Images    | |
|  |  - No Public Signup     | |  - Row Level Security  | |  - PDF Brochures      | |
|  |  - Secure Admin Roles   | |  - Relational Integrity| |  - Compressed WebP    | |
|  +-------------------------+ +------------------------+ +-----------------------+ |
+-----------------------------------------------------------------------------------+
```

---

## 2. SEPARATION OF CONCERNS

1. **Public Zone (Static First):**
   * Halaman beranda, profil tentang, layanan, katalog properti, detail unit, dan legalitas dioptimasi agar menghasilkan waktu muat (TTFB) di bawah 1 detik dari edge Cloudflare.
   * Tidak ada query sensitif langsung dari browser klien ke tabel internal `leads`, `admin_users`, atau `partnership_requests`.
2. **Serverless Compute Zone:**
   * Cloudflare Pages Functions menangani validasi skema form menggunakan Zod, sanitasi string, verifikasi token Cloudflare Turnstile, dan komunikasi server-ke-server dengan Supabase REST API.
   * `SUPABASE_SERVICE_ROLE_KEY` hanya diakses pada layer ini dan tidak pernah dikirim ke browser pengunjung.
3. **Admin Management Zone:**
   * Seluruh rute di bawah `/admin` memerlukan session cookie/token terotentikasi.
   * Akses tidak sah akan dialihkan secara otomatis ke `/admin/login`.

---

## 3. FREE-TIER LIFECYCLE MANAGEMENT & BACKUP STRATEGY

* **Supabase Free Tier (500 MB DB):**
  * Proyek Supabase pada free tier akan di-pause jika tidak ada aktivitas selama 7 hari.
  * Solusi: Disediakan file migrasi `supabase/migrations/20261119000000_initial_schema.sql` di repository Git untuk disaster recovery dan deploy ulang instan kapan pun dibutuhkan.
* **Storage Optimization:**
  * Supabase Free Tier menyediakan 1 GB Object Storage.
  * Asset foto properti dikompresi ke format WebP dengan resolusi optimal (1200px max width) sehingga 1 GB dapat menampung lebih dari 6.000 foto properti.
