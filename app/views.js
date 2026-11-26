// views.js — merender tiap halaman situs dari data.js dan grafik charts.js.
// Setiap view mengembalikan string HTML yang dimasukkan ke <main id="view">.

import { META, KEY_INDICATORS, SERIES, TOPICS, INDICATOR_TABLE, PROVINCES, SOURCES, fmtId } from './data.js';
import { lineChart, barChart } from './charts.js';

function kpiCard(k) {
  return `<article class="kpi">
    <p class="kpi-label">${k.label}</p>
    <p class="kpi-value">${fmtId(k.value, k.decimals ?? 2)} <span class="kpi-unit">${k.unit}</span></p>
    <p class="kpi-desc">${k.desc}</p>
    <p class="kpi-src">Sumber: ${k.source}, ${k.year}</p>
  </article>`;
}

function sourceLine() {
  return `<p class="src-note">Seluruh angka di halaman ini bersumber dari BPS, Bank Indonesia, dan Bank Dunia; sumber dan tahun tercantum pada setiap angka. Terakhir diperbarui ${META.updated}.</p>`;
}

function yearOptions(selected) {
  const years = [2019, 2020, 2021, 2022, 2023, 2024];
  return years.map((y) => `<option value="${y}"${y === selected ? ' selected' : ''}>${y}</option>`).join('');
}

function homeView(year) {
  const cards = KEY_INDICATORS.map(kpiCard).join('');
  const series = SERIES.filter((s) => s.years.includes(year));
  const charts = series.map((s) => {
    const idx = s.years.indexOf(year);
    return `<section class="chart-card">
      <h3>${s.title}</h3>
      <p class="chart-sub">${s.unit} · Sumber: ${s.source} · Nilai ${year}: <strong>${String(s.values[idx]).replace('.', ',')}</strong></p>
      ${lineChart(s)}
    </section>`;
  }).join('');
  const topicLinks = TOPICS.map((t) => `<a class="topic" href="#/indikator/${t.id}"><strong>${t.name}</strong><span>${t.blurb}</span></a>`).join('');
  return `
  <section class="hero">
    <p class="eyebrow">Portal statistik resmi · ${META.country}</p>
    <h1>Angka-angka Indonesia, dalam satu tempat.</h1>
    <p class="lede">Penduduk, ekonomi, ketenagakerjaan, dan kesejahteraan — dirangkum dari publikasi resmi, lengkap dengan sumber dan tahunnya.</p>
    <div class="hero-actions">
      <a class="btn primary" href="#/indikator">Lihat semua indikator</a>
      <a class="btn" href="#/data">Tabel data provinsi</a>
    </div>
  </section>
  <section aria-labelledby="kpi-h">
    <div class="section-head"><h2 id="kpi-h">Angka kunci ${year}</h2>
      <label class="year-picker">Tahun
        <select id="year-select" data-year-picker>${yearOptions(year)}</select>
      </label>
    </div>
    <div class="kpi-grid">${cards}</div>
  </section>
  <section aria-labelledby="tren-h">
    <h2 id="tren-h">Tren ${year}</h2>
    <div class="chart-grid">${charts}</div>
  </section>
  <section aria-labelledby="topik-h">
    <h2 id="topik-h">Jelajahi per topik</h2>
    <div class="topic-grid">${topicLinks}</div>
  </section>
  ${sourceLine()}`;
}

function indicatorsView(topicId, query) {
  const q = (query || '').trim().toLowerCase();
  let rows = INDICATOR_TABLE;
  let title = 'Semua indikator';
  if (topicId) {
    const t = TOPICS.find((x) => x.id === topicId);
    if (t) { title = `Indikator: ${t.name}`; rows = rows.filter((r) => r.topic === topicId); }
  }
  if (q) rows = rows.filter((r) => r.name.toLowerCase().includes(q) || r.source.toLowerCase().includes(q));
  const chips = [{ id: '', name: 'Semua' }, ...TOPICS].map((t) =>
    `<a class="chip${(!topicId && t.id === '') || topicId === t.id ? ' active' : ''}" href="#/indikator${t.id ? '/' + t.id : ''}">${t.name}</a>`).join('');
  const body = rows.length
    ? rows.map((r) => `<tr><td>${r.name}</td><td class="num">${r.value}</td><td class="num">${r.year}</td><td>${r.source}</td></tr>`).join('')
    : `<tr><td colspan="4">Tidak ada indikator yang cocok dengan “${query}”. Coba kata kunci lain.</td></tr>`;
  return `
  <section>
    <h1>${title}</h1>
    <p class="lede">Daftar indikator nasional beserta nilai, tahun, dan sumbernya. Klik nama kolom untuk mengurutkan, ketik di kolom cari untuk menyaring.</p>
    <div class="toolbar">
      <div class="chips">${chips}</div>
      <label class="search">Cari indikator
        <input id="indicator-search" type="search" placeholder="mis. inflasi, PDB, kemiskinan" value="${query || ''}" data-indicator-search>
      </label>
    </div>
    <table class="data-table" data-sortable>
      <thead><tr>
        <th data-sort="name">Indikator</th>
        <th data-sort="value" class="num">Nilai</th>
        <th data-sort="year" class="num">Tahun</th>
        <th data-sort="source">Sumber</th>
      </tr></thead>
      <tbody>${body}</tbody>
    </table>
    <p class="count">${rows.length} indikator ditampilkan.</p>
  </section>
  ${sourceLine()}`;
}

function dataView(sortKey, query, order) {
  const q = (query || '').trim().toLowerCase();
  let rows = PROVINCES.map((p) => ({ ...p }));
  if (q) rows = rows.filter((p) => p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  const keys = ['name', 'population', 'area', 'density', 'capital'];
  const key = keys.includes(sortKey) ? sortKey : 'population';
  rows.sort((a, b) => {
    const av = a[key], bv = b[key];
    const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv), 'id');
    return order === 'asc' ? cmp : -cmp;
  });
  const body = rows.length
    ? rows.map((p) => `<tr><td>${p.name}</td><td class="num">${fmtId(p.population)}</td><td class="num">${fmtId(p.area, 0)}</td><td class="num">${fmtId(p.density, 0)}</td><td>${p.capital}</td></tr>`).join('')
    : `<tr><td colspan="5">Tidak ada provinsi yang cocok dengan “${query}”.</td></tr>`;
  const arrow = (k) => (key === k ? (order === 'asc' ? ' ▲' : ' ▼') : '');
  const chart = barChart(
    [...PROVINCES].sort((a, b) => b.population - a.population).map((p) => ({ label: p.name, value: p.population })),
    { title: 'Penduduk per provinsi', unit: 'juta jiwa, BPS 2024' },
  );
  return `
  <section>
    <h1>Data provinsi</h1>
    <p class="lede">Sepuluh provinsi berpenduduk terbanyak di Indonesia. Klik nama kolom untuk mengurutkan, ketik untuk menyaring. Penduduk: proyeksi BPS 2024; luas: km².</p>
    <div class="toolbar">
      <label class="search">Cari provinsi atau ibu kota
        <input id="province-search" type="search" placeholder="mis. Jawa, Medan" value="${query || ''}" data-province-search>
      </label>
    </div>
    <table class="data-table">
      <thead><tr>
        <th><a href="#/data?sort=name&order=${key === 'name' && order === 'desc' ? 'asc' : 'desc'}">Provinsi${arrow('name')}</a></th>
        <th class="num"><a href="#/data?sort=population&order=${key === 'population' && order === 'desc' ? 'asc' : 'desc'}">Penduduk (juta)${arrow('population')}</a></th>
        <th class="num"><a href="#/data?sort=area&order=${key === 'area' && order === 'desc' ? 'asc' : 'desc'}">Luas (km²)${arrow('area')}</a></th>
        <th class="num"><a href="#/data?sort=density&order=${key === 'density' && order === 'desc' ? 'asc' : 'desc'}">Kepadatan (jiwa/km²)${arrow('density')}</a></th>
        <th><a href="#/data?sort=capital&order=${key === 'capital' && order === 'desc' ? 'asc' : 'desc'}">Ibu kota${arrow('capital')}</a></th>
      </tr></thead>
      <tbody>${body}</tbody>
    </table>
    <p class="count">${rows.length} provinsi ditampilkan. Sumber: BPS, 2024.</p>
    <h2>Penduduk per provinsi</h2>
    ${chart}
  </section>
  ${sourceLine()}`;
}

function aboutView() {
  const list = SOURCES.map((s) => `<li><strong>${s.name}</strong> — ${s.note}</li>`).join('');
  return `
  <section class="about">
    <h1>Tentang ${META.agency}</h1>
    <p class="lede">${META.agency} (${META.agencyShort}) menyusun dan menyajikan angka-angka resmi tentang Indonesia agar mudah ditemukan, dibaca, dan dibandingkan — tanpa iklan dan tanpa pelacakan.</p>
    <h2>Sumber data</h2>
    <ul>${list}</ul>
    <h2>Cara membaca situs ini</h2>
    <ul>
      <li><strong>Beranda</strong> menampilkan angka kunci dan tren lima tahun terakhir.</li>
      <li><strong>Indikator</strong> memuat seluruh indikator dengan nilai, tahun, dan sumbernya; gunakan kolom cari dan klik nama kolom untuk mengurutkan.</li>
      <li><strong>Data provinsi</strong> membandingkan sepuluh provinsi berpenduduk terbanyak, lengkap dengan grafik batang.</li>
    </ul>
    <h2>Metodologi singkat</h2>
    <p>Pertumbuhan ekonomi dihitung dari PDB harga konstan 2010. Inflasi adalah perubahan Indeks Harga Konsumen Desember terhadap Desember tahun sebelumnya. Tingkat pengangguran terbuka berasal dari Survei Angkatan Kerja Nasional bulan Agustus. Angka kemiskinan dihitung dari garis kemiskinan dan Susenas Maret. Penduduk adalah hasil proyeksi pertengahan tahun.</p>
    <h2>Kontak</h2>
    <p>Pertanyaan tentang data: <a href="mailto:data@lembaga-data-nusantara.example">data@lembaga-data-nusantara.example</a>. Situs ini bekerja sepenuhnya offline: semua file dimuat dari folder situs ini sendiri.</p>
  </section>
  ${sourceLine()}`;
}

function notFoundView(path) {
  return `<section><h1>Halaman tidak ditemukan</h1>
  <p class="lede">Alamat “${path}” tidak ada di situs ini. Coba salah satu halaman berikut:</p>
  <p><a class="btn primary" href="#/">Beranda</a> <a class="btn" href="#/indikator">Indikator</a> <a class="btn" href="#/data">Data provinsi</a></p></section>`;
}

export function renderRoute(route) {
  if (route.page === 'home') return homeView(route.year);
  if (route.page === 'indikator') return indicatorsView(route.topic, route.query);
  if (route.page === 'data') return dataView(route.sort, route.query, route.order);
  if (route.page === 'tentang') return aboutView();
  return notFoundView(route.raw);
}
