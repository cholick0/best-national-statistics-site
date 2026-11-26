// data.js — seluruh angka situs ini, lengkap dengan sumber dan tahunnya.
// Angka-angka di bawah adalah angka resmi Indonesia yang diterbitkan
// Badan Pusat Statistik (BPS), Bank Indonesia, dan Bank Dunia.
// Tidak ada angka contoh atau placeholder di file ini.

export const META = {
  country: 'Indonesia',
  agency: 'Lembaga Data Nusantara',
  agencyShort: 'LDN',
  updated: '26 November 2026',
  note: 'Angka di situs ini adalah angka resmi yang diterbitkan BPS, Bank Indonesia, dan Bank Dunia. Setiap angka mencantumkan sumber dan tahunnya.',
};

// Indikator kunci di halaman utama. value = angka terbaru, unit, source, year.
export const KEY_INDICATORS = [
  { id: 'populasi', label: 'Penduduk', value: 281.6, unit: 'juta jiwa', source: 'BPS', year: 2024, topic: 'kependudukan', desc: 'Hasil proyeksi penduduk pertengahan tahun.' },
  { id: 'pdb', label: 'PDB (harga berlaku)', value: 22139, decimals: 0, unit: 'triliun rupiah', source: 'BPS', year: 2024, topic: 'ekonomi', desc: 'Produk domestik bruto atas dasar harga berlaku.' },
  { id: 'pdb-tumbuh', label: 'Pertumbuhan ekonomi', value: 5.03, unit: '% (y-on-y)', source: 'BPS', year: 2024, topic: 'ekonomi', desc: 'Pertumbuhan PDB atas dasar harga konstan 2010.' },
  { id: 'pdb-kapita', label: 'PDB per kapita', value: 4960, decimals: 0, unit: 'dolar AS', source: 'BPS / Bank Dunia', year: 2024, topic: 'ekonomi', desc: 'PDB per kapita atas dasar harga berlaku.' },
  { id: 'inflasi', label: 'Inflasi (Desember, y-on-y)', value: 1.57, unit: '%', source: 'BPS', year: 2024, topic: 'ekonomi', desc: 'Inflasi Desember terhadap Desember tahun sebelumnya.' },
  { id: 'pengangguran', label: 'Tingkat pengangguran terbuka', value: 4.76, unit: '%', source: 'BPS', year: 2024, topic: 'ketenagakerjaan', desc: 'Survei Angkatan Kerja Nasional, Agustus 2024.' },
  { id: 'kemiskinan', label: 'Penduduk miskin', value: 9.03, unit: '%', source: 'BPS', year: 2024, topic: 'sosial', desc: 'Persentase penduduk miskin, Maret 2024.' },
  { id: 'harapan-hidup', label: 'Angka harapan hidup', value: 74.1, unit: 'tahun', source: 'BPS', year: 2024, topic: 'sosial', desc: 'Angka harapan hidup saat lahir.' },
];

// Deret tahunan untuk grafik. Setiap deret: label, unit, source, dan nilai per tahun.
export const SERIES = [
  {
    id: 'pertumbuhan-pdb', title: 'Pertumbuhan ekonomi', unit: '% per tahun', source: 'BPS',
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [5.02, -2.07, 3.70, 5.31, 5.05, 5.03],
  },
  {
    id: 'inflasi', title: 'Inflasi (Desember, y-on-y)', unit: '%', source: 'BPS',
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
  },
  {
    id: 'pengangguran', title: 'Tingkat pengangguran terbuka (Agustus)', unit: '%', source: 'BPS',
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [5.28, 7.07, 6.49, 5.86, 5.32, 4.76],
  },
  {
    id: 'kemiskinan', title: 'Penduduk miskin', unit: '%', source: 'BPS',
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [9.41, 9.78, 10.14, 9.54, 9.36, 9.03],
  },
  {
    id: 'penduduk', title: 'Jumlah penduduk', unit: 'juta jiwa', source: 'BPS',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [270.20, 273.52, 275.77, 278.69, 281.60],
  },
];

// Topik indikator: dipakai halaman indikator per topik.
export const TOPICS = [
  { id: 'ekonomi', name: 'Ekonomi', blurb: 'Pertumbuhan, harga, dan nilai tukar.' },
  { id: 'kependudukan', name: 'Kependudukan', blurb: 'Jumlah, sebaran, dan struktur penduduk.' },
  { id: 'ketenagakerjaan', name: 'Ketenagakerjaan', blurb: 'Angkatan kerja, pengangguran, dan upah.' },
  { id: 'sosial', name: 'Sosial', blurb: 'Kemiskinan, kesehatan, dan pendidikan.' },
];

// Tabel indikator lengkap (halaman Indikator).
export const INDICATOR_TABLE = [
  { name: 'Pertumbuhan ekonomi', value: '5,03%', year: 2024, source: 'BPS', topic: 'ekonomi' },
  { name: 'PDB harga berlaku', value: 'Rp22.139 triliun', year: 2024, source: 'BPS', topic: 'ekonomi' },
  { name: 'PDB per kapita', value: 'US$4.960', year: 2024, source: 'BPS / Bank Dunia', topic: 'ekonomi' },
  { name: 'Inflasi (Des, y-on-y)', value: '1,57%', year: 2024, source: 'BPS', topic: 'ekonomi' },
  { name: 'Inflasi inti', value: '2,26%', year: 2024, source: 'BPS', topic: 'ekonomi' },
  { name: 'Nilai tukar rupiah (rata-rata)', value: 'Rp15.848 per US$', year: 2024, source: 'Bank Indonesia', topic: 'ekonomi' },
  { name: 'Cadangan devisa', value: 'US$155,7 miliar', year: 2024, source: 'Bank Indonesia', topic: 'ekonomi' },
  { name: 'Jumlah penduduk', value: '281,6 juta jiwa', year: 2024, source: 'BPS', topic: 'kependudukan' },
  { name: 'Laju pertumbuhan penduduk', value: '0,82% per tahun', year: 2024, source: 'BPS', topic: 'kependudukan' },
  { name: 'Kepadatan penduduk', value: '147 jiwa/km²', year: 2024, source: 'BPS', topic: 'kependudukan' },
  { name: 'Penduduk usia produktif (15–64 th)', value: '69,3%', year: 2024, source: 'BPS', topic: 'kependudukan' },
  { name: 'Tingkat pengangguran terbuka', value: '4,76%', year: 2024, source: 'BPS', topic: 'ketenagakerjaan' },
  { name: 'Tingkat partisipasi angkatan kerja', value: '70,63%', year: 2024, source: 'BPS', topic: 'ketenagakerjaan' },
  { name: 'Pekerja informal', value: '59,17%', year: 2024, source: 'BPS', topic: 'ketenagakerjaan' },
  { name: 'Upah minimum rata-rata provinsi', value: 'Rp3,25 juta/bulan', year: 2024, source: 'BPS', topic: 'ketenagakerjaan' },
  { name: 'Penduduk miskin', value: '9,03%', year: 2024, source: 'BPS', topic: 'sosial' },
  { name: 'Angka harapan hidup', value: '74,1 tahun', year: 2024, source: 'BPS', topic: 'sosial' },
  { name: 'Angka melek huruf (15 th+)', value: '96,2%', year: 2024, source: 'BPS', topic: 'sosial' },
  { name: 'Rata-rata lama sekolah', value: '9,0 tahun', year: 2024, source: 'BPS', topic: 'sosial' },
  { name: 'Indeks Pembangunan Manusia', value: '75,02', year: 2024, source: 'BPS', topic: 'sosial' },
];

// Sepuluh provinsi berpenduduk terbanyak, proyeksi BPS 2024 (juta jiwa).
export const PROVINCES = [
  { name: 'Jawa Barat', population: 50.35, area: 35377, density: 1423, capital: 'Bandung' },
  { name: 'Jawa Timur', population: 41.81, area: 47803, density: 875, capital: 'Surabaya' },
  { name: 'Jawa Tengah', population: 37.89, area: 32801, density: 1155, capital: 'Semarang' },
  { name: 'Sumatera Utara', population: 15.59, area: 72981, density: 214, capital: 'Medan' },
  { name: 'Banten', population: 12.43, area: 9663, density: 1286, capital: 'Serang' },
  { name: 'DKI Jakarta', population: 10.56, area: 664, density: 15906, capital: 'Jakarta' },
  { name: 'Sulawesi Selatan', population: 9.36, area: 46717, density: 200, capital: 'Makassar' },
  { name: 'Lampung', population: 9.03, area: 34624, density: 261, capital: 'Bandar Lampung' },
  { name: 'Sumatera Selatan', population: 8.90, area: 91592, density: 97, capital: 'Palembang' },
  { name: 'Riau', population: 6.64, area: 87024, density: 76, capital: 'Pekanbaru' },
];

export const SOURCES = [
  { name: 'Badan Pusat Statistik (BPS)', note: 'Berita Resmi Statistik dan publikasi Statistik Indonesia 2025.' },
  { name: 'Bank Indonesia', note: 'Statistik Ekonomi dan Keuangan Indonesia 2024.' },
  { name: 'Bank Dunia', note: 'World Development Indicators, data Indonesia 2024.' },
];

// Format angka Indonesia: koma desimal, titik ribuan.
export function fmtId(n, decimals = 2) {
  return n.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
