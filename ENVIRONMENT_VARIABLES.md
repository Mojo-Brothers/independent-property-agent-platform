# ENVIRONMENT VARIABLES SPECIFICATION
## IVORY & GRACE PROPERTY – Property Marketing & Advisory Platform

File acuan template: `.env.example`.  
File konfigurasi lokal: `.env` (diabaikan oleh Git via `.gitignore`).

---

## 1. CLIENT-SAFE ENVIRONMENT VARIABLES (PREFIX: `PUBLIC_`)

Variabel dengan awalan `PUBLIC_` dapat dibaca oleh Astro di sisi browser klien dan aman dipublikasikan:

| Variabel | Tipe Data | Diperlukan? | Contoh Nilai | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `PUBLIC_SUPABASE_URL` | URL | Ya (untuk Supabase) | `https://xyzproject.supabase.co` | Endpoint REST API Supabase |
| `PUBLIC_SUPABASE_ANON_KEY` | JWT String | Ya (untuk Supabase) | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` | Public Anonymous Client Key yang dilindungi oleh RLS |
| `PUBLIC_TURNSTILE_SITE_KEY` | String | Opsional | `0x4AAAAAAABcDeFgHiJkLm` | Site Key Cloudflare Turnstile bot protection |
| `PUBLIC_AGENT_NAME` | String | Default: `IVORY & GRACE PROPERTY` | `IVORY & GRACE PROPERTY` | Nama brand entitas bisnis |
| `PUBLIC_AGENT_TITLE` | String | Default: `Property Marketing & Advisory` | `Property Marketing & Advisory` | Kategori bisnis |
| `PUBLIC_WHATSAPP_NUMBER` | String | Format internasional | `62895372115913` | Nomor WhatsApp kontak utama (tanpa tanda +) |
| `PUBLIC_OFFICIAL_EMAIL` | Email | Default: `advisory@ivorygraceproperty.com` | `advisory@ivorygraceproperty.com` | Email korespondensi resmi |
| `PUBLIC_SITE_URL` | URL | Default: Pages.dev | `https://ivorygraceproperty.pages.dev` | Basis URL kanonikal & sitemap |

---

## 2. SERVER-ONLY SECRETS (DILARANG MENGGUNAKAN PREFIX `PUBLIC_`)

Variabel berikut **HANYA BOLEH DILETAKKAN DI SISI SERVER** (Cloudflare Pages Secrets / server environment) dan tidak boleh bocor ke bundle JavaScript publik:

| Variabel | Tipe Data | Diperlukan? | Contoh Nilai | Risiko Keamanan |
| :--- | :--- | :--- | :--- | :--- |
| `SUPABASE_SERVICE_ROLE_KEY` | JWT Secret | Ya (untuk backend tasks) | `eyJhbGciOiJIUzI1Ni...` | **KRITIS.** Melewati Row Level Security (RLS). Jangan pernah diekspos ke klien! |
| `TURNSTILE_SECRET_KEY` | String | Opsional | `0x4AAAAAAABcDeFg...` | Rahasia verifikasi respons captcha token |

---

## 3. RUNTIME FALLBACK CAPABILITY

Platform ini dirancang dengan kapabilitas *graceful fallback*:
* Apabila `PUBLIC_SUPABASE_URL` belum diisi, platform secara otomatis menyajikan data katalog portofolio terverifikasi (`DEMO_PROPERTIES`) tanpa menimbulkan kegagalan build (Zero-Crash Guarantee).
* Formulir inquiry tetap menerima input dan mencatatnya ke log server.
