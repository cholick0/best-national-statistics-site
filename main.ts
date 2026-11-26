// main.ts — menyerahkan situs statistik nasional ke make.fun (Node 22, stdlib saja).
//
// Program ini menyalin app/ (situs statis: index.html, CSS, dan modul JS-nya)
// serta screenshots/ dari samping file ini ke direktori keluaran, lalu menulis
// /output/dossier.json dengan buildDossier dari vendor/makefun-frontend.ts.
// vendor/makefun-frontend.ts disalin dari kit tanpa diubah: scorer menuntut
// dossier.json sama persis dengan yang ditulis salinan vendor itu sendiri.
//
// Di luar container grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Batas yang sama dengan gerbang scorer (reference/gate.json): hanya
// text_max_bytes yang membentuk isi dossier; batas lainnya menolak entri
// yang memang akan ditolak scorer (lebih dari 4 screenshot, satu di atas
// 256 KiB, app/ lebih dari 993 entri atau 16 MiB).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
