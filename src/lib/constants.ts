export const BRAND = {
  name: 'Robby Viory Fansya',
  title: 'Independent Property Agent',
  company: 'Robby Viory Fansya Property Advisory',
  tagline: 'Mitra Strategis Pemasaran Properti & Solusi Investasi Hunian Terpercaya',
  area: 'Bekasi Kota, Kabupaten Bekasi, Cikarang & Sekitarnya',
  phone: '0812-8000-0000', // Default placeholder changeable in settings/dashboard
  whatsapp: '6281280000000',
  email: 'info@robbyproperty.com',
  address: 'Bekasi Digital Business Hub, Kota Bekasi, Jawa Barat, Indonesia',
  disclaimerShort: 'Informasi harga, spesifikasi, dan ketersediaan unit dapat berubah sewaktu-waktu sesuai konfirmasi pihak pengembang/pemilik unit.',
};

export const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Robby', href: '/about' },
  { label: 'Layanan', href: '/services' },
  { label: 'Katalog Properti', href: '/properties' },
  { label: 'Kemitraan Developer', href: '/developer-partnership' },
  { label: 'Kontak', href: '/contact' },
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
