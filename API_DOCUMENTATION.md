# API SPECIFICATION & CONTRACTS
## Robby Viory Fansya – Independent Property Agent Platform

Seluruh endpoint server-side dijalankan menggunakan Cloudflare Pages Functions (`/api/*`).

---

## 1. PUBLIC INQUIRY ENDPOINT

* **Endpoint:** `POST /api/inquiries`
* **Access Level:** Public Anonymous (dibatasi oleh rate limiting)
* **Deskripsi:** Menerima pengajuan minat calon pembeli terhadap properti atau permintaan jadwal survey.

### Request Body (JSON)
```json
{
  "full_name": "Bpk. Hendra Gunawan",
  "phone_whatsapp": "081288229911",
  "email": "hendra@example.com",
  "property_id": "demo-prop-01",
  "budget_range": "Rp 500 Juta - Rp 1 Miliar",
  "purchase_purpose": "Tempat Tinggal Pribadi",
  "message": "Ingin jadwal survey hari Sabtu ini.",
  "consent_agreed": true
}
```

### Validasi Skema (Zod)
* `full_name`: string, min 2, max 100 char.
* `phone_whatsapp`: string, min 8, max 20 digit.
* `email`: valid email (opsional).
* `budget_range`: non-empty string.
* `purchase_purpose`: enum (`Tempat Tinggal Pribadi`, `Investasi Sewa`, `Pilihan Pertama Anak`, `Lainnya`).
* `consent_agreed`: boolean, must be true.

### Response (200 OK)
```json
{
  "success": true,
  "message": "Permintaan informasi berhasil terkirim. Bpk. Robby Viory Fansya akan segera menghubungi Anda melalui WhatsApp."
}
```

---

## 2. DEVELOPER PARTNERSHIP APPLICATION ENDPOINT

* **Endpoint:** `POST /api/partnerships`
* **Access Level:** Public Anonymous
* **Deskripsi:** Menerima proposal pengajuan kerja sama pemasaran dari pengembang / developer properti.

### Request Body (JSON)
```json
{
  "company_name": "PT Pos Properti Indonesia",
  "project_name": "Cluster Residensial Koridor Bekasi",
  "pic_name": "Bpk. Ahmad Fauzi",
  "email": "ahmad.fauzi@posproperti.co.id",
  "phone": "0811998877",
  "proposal_message": "Mengajukan diskusi kemitraan pemasaran properti dan penjadwalan presentasi proyek."
}
```

### Response (200 OK)
```json
{
  "success": true,
  "message": "Pengajuan kemitraan berhasil diterima. Kami akan meninjau materi proyek dan menghubungi Anda dalam 1x24 jam kerja."
}
```

---

## 3. ADMIN AUTHENTICATION ENDPOINTS

### A. Login
* **Endpoint:** `POST /api/auth/login`
* **Request:** `{ "email": "robby@robbyproperty.com", "password": "..." }`
* **Response (200 OK):** Menetapkan HTTP-Only secure cookie `ipa_admin_token` selama 7 hari.

### B. Logout
* **Endpoint:** `POST /api/auth/logout`
* **Response (200 OK):** Menghapus session cookie `ipa_admin_token`.
