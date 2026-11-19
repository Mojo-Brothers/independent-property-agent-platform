# SECURITY ARCHITECTURE & THREAT MITIGATION
## Robby Viory Fansya – Independent Property Agent Platform

**Security Standard:** Zero-Trust / Defense-in-Depth  
**Auditor Role:** Security Engineer & Technical Auditor  
**Date:** November 19, 2026  

---

## 1. ACCESS CONTROL & ROLE BOUNDARIES

### 1.1 Strict Admin Provisioning (No Public Registration)
* Fitur registrasi publik ditutup pada Supabase Auth (`Disable Email Signup`).
* Akun admin hanya dibuat melalui provisioning langsung oleh super admin via SQL migration / CLI aman.
* Form login di `/admin/login` tidak menyediakan tombol "Daftar Akun Baru".

### 1.2 Principle of Least Privilege
* Pengunjung publik (anon) hanya memiliki izin `SELECT` pada baris berstatus `'Published'` di tabel `properties`, `property_projects`, `property_images`, dan `property_units`.
* Pengunjung publik dilarang keras membaca data tabel `leads`, `inquiries`, `partnership_requests`, `admin_users`, dan `activity_logs`.
* Pengunjung publik hanya diizinkan melakukan `INSERT` ke `inquiries` dan `partnership_requests` melalui validasi server-side.

---

## 2. CREDENTIAL SEGREGATION & ENVIRONMENT PROTECTION

| Credential | Scope | Penempatan | Tingkat Paparan |
| :--- | :--- | :--- | :--- |
| `PUBLIC_SUPABASE_URL` | Client & Server | `.env` (`PUBLIC_*`) | Aman diketahui publik (API Gateway URL) |
| `PUBLIC_SUPABASE_ANON_KEY` | Client & Server | `.env` (`PUBLIC_*`) | Aman (dibatasi oleh PostgreSQL RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Only | Cloudflare Secrets | **SANGAT RAHASIA (Bypass RLS)**. Tidak boleh ada prefix `PUBLIC_` dan tidak di-bundle ke client JS. |
| `TURNSTILE_SECRET_KEY` | Server-Only | Cloudflare Secrets | Sangat Rahasia (Verifikasi Token Bot) |

---

## 3. INPUT VALIDATION & ANTI-SPAM PROTECTION

1. **Zod Schema Validation:**
   * Setiap payload formulir `/api/inquiries` dan `/api/partnerships` divalidasi tipe data, panjang string minimum dan maksimum sebelum dikirim ke database.
2. **Bot Flooding & Spam Protection:**
   * Didukung Cloudflare Turnstile token validation untuk memblokir automated scraper dan bot spam form tanpa membebani calon pembeli dengan visual CAPTCHA.
3. **Audit Trail (Activity Logs):**
   * Setiap perubahan data penting oleh admin dicatat pada tabel `activity_logs` lengkap dengan timestamp, tindakan (*INSERT/UPDATE/DELETE*), dan alamat IP.

---

## 4. KEPATUHAN HUKUM DATA PRIBADI (UU PDP NO. 27/2022)

* Calon pembeli wajib mencentang persetujuan pemrosesan data pribadi pada setiap formulir.
* Data prospek tidak dibagikan atau dijual ke pihak ketiga.
* Disediakan halaman Kebijakan Privasi (`/privacy-policy`) yang menjelaskan hak konsumen atas penghapusan atau koreksi data pribadi mereka.
