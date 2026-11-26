// app.js — router hash dan interaksi situs: pemilih tahun, pencarian,
// dan pengurutan tabel. Semua halaman dirender dari views.js.

import { renderRoute } from './views.js';

const view = document.getElementById('view');
const navLinks = document.querySelectorAll('[data-nav]');
let state = { year: 2024, indicatorQuery: '', provinceQuery: '' };

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [pathPart, queryPart] = raw.split('?');
  const parts = pathPart.split('/').filter(Boolean);
  const params = new URLSearchParams(queryPart || '');
  if (parts.length === 0) return { page: 'home', year: state.year, raw };
  if (parts[0] === 'indikator') return { page: 'indikator', topic: parts[1] || '', query: state.indicatorQuery, raw };
  if (parts[0] === 'data') {
    return {
      page: 'data',
      sort: params.get('sort') || 'population',
      order: params.get('order') || 'desc',
      query: state.provinceQuery,
      raw,
    };
  }
  if (parts[0] === 'tentang') return { page: 'tentang', raw };
  return { page: '404', raw };
}

function markActive(route) {
  navLinks.forEach((a) => {
    const key = a.getAttribute('data-nav');
    const active = (route.page === 'home' && key === 'home')
      || (route.page === 'indikator' && key === 'indikator')
      || (route.page === 'data' && key === 'data')
      || (route.page === 'tentang' && key === 'tentang');
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function wireInteractions(route) {
  const yearSelect = view.querySelector('[data-year-picker]');
  if (yearSelect) {
    yearSelect.addEventListener('change', () => {
      state.year = Number(yearSelect.value);
      render();
    });
  }
  const indSearch = view.querySelector('[data-indicator-search]');
  if (indSearch) {
    indSearch.addEventListener('input', () => {
      state.indicatorQuery = indSearch.value;
      const pos = indSearch.selectionStart;
      render();
      const again = view.querySelector('[data-indicator-search]');
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    });
  }
  const provSearch = view.querySelector('[data-province-search]');
  if (provSearch) {
    provSearch.addEventListener('input', () => {
      state.provinceQuery = provSearch.value;
      const pos = provSearch.selectionStart;
      render();
      const again = view.querySelector('[data-province-search]');
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    });
  }
  const sortable = view.querySelector('[data-sortable]');
  if (sortable) wireSortable(sortable, route);
}

// Pengurutan tabel indikator di sisi klien (klik nama kolom).
function wireSortable(table, route) {
  let sortKey = 'name';
  let asc = true;
  table.querySelectorAll('th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.getAttribute('data-sort');
      const col = { name: 0, value: 1, year: 2, source: 3 }[key];
      if (sortKey === key) asc = !asc; else { sortKey = key; asc = true; }
      const tbody = table.querySelector('tbody');
      const rows = [...tbody.querySelectorAll('tr')];
      rows.sort((a, b) => {
        const av = a.children[col].textContent.trim();
        const bv = b.children[col].textContent.trim();
        const an = parseFloat(av.replace(/[^\d,.-]/g, '').replace(',', '.'));
        const bn = parseFloat(bv.replace(/[^\d,.-]/g, '').replace(',', '.'));
        const cmp = !Number.isNaN(an) && !Number.isNaN(bn) ? an - bn : av.localeCompare(bv, 'id');
        return asc ? cmp : -cmp;
      });
      rows.forEach((r) => tbody.appendChild(r));
      table.querySelectorAll('th').forEach((h) => h.classList.remove('sorted-asc', 'sorted-desc'));
      th.classList.add(asc ? 'sorted-asc' : 'sorted-desc');
    });
  });
}

function render() {
  const route = parseHash();
  view.innerHTML = renderRoute(route);
  markActive(route);
  wireInteractions(route);
  document.title = route.page === 'home'
    ? 'Lembaga Data Nusantara — Statistik Indonesia'
    : `${view.querySelector('h1')?.textContent || 'Statistik'} — Lembaga Data Nusantara`;
}

window.addEventListener('hashchange', render);
render();
