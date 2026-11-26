// charts.js — menggambar grafik SVG dari deret data sendiri, tanpa pustaka luar.
// Semua grafik digambar sebagai SVG murni: garis, batang, label sumbu, dan nilai.

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceTicks(min, max, count = 4) {
  const span = max - min || 1;
  const step = span / count;
  const ticks = [];
  for (let i = 0; i <= count; i++) ticks.push(min + step * i);
  return ticks;
}

// Grafik garis: deret tahunan dengan titik dan label nilai.
export function lineChart(series, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 260;
  const padL = 52, padR = 16, padT = 18, padB = 34;
  const vals = series.values;
  let min = Math.min(...vals);
  let max = Math.max(...vals);
  if (min > 0 && min / max > 0.6) min = Math.min(0, min - (max - min) * 0.25);
  else min = Math.min(0, min - (max - min) * 0.15);
  max = max + (max - min) * 0.1;
  const x = (i) => padL + (i * (w - padL - padR)) / (vals.length - 1);
  const y = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min);
  const ticks = niceTicks(min, max);
  let grid = '';
  for (const t of ticks) {
    grid += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" class="grid"/>` +
      `<text x="${padL - 8}" y="${y(t) + 4}" class="tick" text-anchor="end">${t.toFixed(1)}</text>`;
  }
  const points = vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  let dots = '';
  vals.forEach((v, i) => {
    dots += `<circle cx="${x(i)}" cy="${y(v)}" r="4" class="dot"/>` +
      `<text x="${x(i)}" y="${y(v) - 10}" class="vlabel" text-anchor="middle">${String(v).replace('.', ',')}</text>`;
  });
  let years = '';
  series.years.forEach((yr, i) => {
    years += `<text x="${x(i)}" y="${h - 10}" class="tick" text-anchor="middle">${yr}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Grafik ${esc(series.title)}" class="chart">` +
    grid + `<polyline points="${points}" class="line" fill="none"/>` + dots + years + `</svg>`;
}

// Grafik batang: dipakai untuk penduduk per provinsi.
export function barChart(items, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 300;
  const padL = 150, padR = 70, padT = 12, padB = 30;
  const max = Math.max(...items.map((d) => d.value));
  const rowH = (h - padT - padB) / items.length;
  const barH = Math.min(22, rowH * 0.6);
  let rows = '';
  items.forEach((d, i) => {
    const yTop = padT + i * rowH + (rowH - barH) / 2;
    const bw = (d.value / max) * (w - padL - padR);
    rows += `<text x="${padL - 10}" y="${yTop + barH / 2 + 4}" class="blabel" text-anchor="end">${esc(d.label)}</text>` +
      `<rect x="${padL}" y="${yTop}" width="${bw.toFixed(1)}" height="${barH}" rx="3" class="bar"/>` +
      `<text x="${padL + bw + 8}" y="${yTop + barH / 2 + 4}" class="vlabel">${String(d.value).replace('.', ',')}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Grafik batang ${esc(opts.title || '')}" class="chart">` +
    rows + `<text x="${padL}" y="${h - 8}" class="tick">${esc(opts.unit || '')}</text></svg>`;
}
