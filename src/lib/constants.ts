export const BRAND = {
  name: 'IVORY & GRACE PROPERTY',
  brandName: 'IVORY & GRACE PROPERTY',
  parentBrand: 'IVORY & GRACE',
  category: 'Property Marketing & Advisory',
  title: 'Property Marketing & Advisory',
  company: 'IVORY & GRACE PROPERTY',
  tagline: 'Connecting Properties with Opportunities.',
  area: 'Bekasi Kota, Kabupaten Bekasi, Cikarang & Koridor Strategis Jabodetabek',
  phone: '0812-8000-0000', // Nomor kontak operasional
  whatsapp: '6281280000000',
  email: 'advisory@ivorygraceproperty.com',
  address: 'Bekasi Digital Business Hub, Kota Bekasi, Jawa Barat, Indonesia',
  disclaimerShort: 'Informasi harga, spesifikasi, dan ketersediaan unit bersifat indikatif dan dapat berubah sewaktu-waktu sesuai konfirmasi pihak pengembang / pemilik unit.',
};

export const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Kami', href: '/about' },
  { label: 'Layanan', href: '/services' },
  { label: 'Portofolio Properti', href: '/properties' },
  { label: 'Kemitraan Developer', href: '/developer-partnership' },
  { label: 'Pemilik Properti', href: '/services#property-owners' },
  { label: 'Kontak Tim', href: '/contact' },
];

export const PROPERTY_LOCATIONS = [
  'Semua Lokasi',
  'Kota Bekasi',
  'Kabupaten Bekasi',
  'Cikarang Pusat / Selatan',
  'Grand Wisata & Tambun',
  'Summarecon & Harapan Indah',
];

export const PROPERTY_TYPES = [
  'Semua Tipe',
  'Rumah Cluster',
  'Rumah Ready Stock',
  'Ruko Komersial',
  'Kavling Tanah',
  'Secondary Property',
];

export const PRICE_RANGES = [
  { label: 'Semua Harga', min: 0, max: Infinity },
  { label: '< Rp 500 Juta', min: 0, max: 500000000 },
  { label: 'Rp 500 Juta - Rp 1 Miliar', min: 500000000, max: 1000000000 },
  { label: 'Rp 1 Miliar - Rp 2 Miliar', min: 1000000000, max: 2000000000 },
  { label: '> Rp 2 Miliar', min: 2000000000, max: Infinity },
];
