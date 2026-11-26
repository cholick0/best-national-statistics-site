[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/cholick0/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/cholick0/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# Lembaga Data Nusantara — Situs Statistik Indonesia

Situs statistik nasional yang bekerja sepenuhnya offline dari file statis: angka kunci Indonesia (penduduk, PDB, inflasi, pengangguran, kemiskinan), grafik tren tahunan, tabel indikator yang bisa dicari dan diurutkan, serta data sepuluh provinsi berpenduduk terbanyak — semua angka nyata dengan sumber dan tahunnya (BPS, Bank Indonesia, Bank Dunia).

Entri untuk [make.fun — Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## Menjalankan

```sh
node serve.ts
# buka http://localhost:8080
```

## Menyerahkan (dossier)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Struktur

- `app/index.html` — halaman utama situs
- `app/style.css` — tampilan (teal + amber, font sistem saja)
- `app/data.js` — semua angka beserta sumber dan tahunnya
- `app/charts.js` — grafik garis dan batang SVG dari data sendiri
- `app/views.js` — halaman: beranda, indikator, data provinsi, tentang
- `app/app.js` — router hash, pemilih tahun, pencarian, pengurutan tabel
- `main.ts` — menyalin `app/` dan `screenshots/` ke `/output` dan menulis `dossier.json`
- `screenshots/` — tangkapan layar nyata situs ini di browser
