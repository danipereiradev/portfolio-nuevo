// Compara el copy único de cada ciudad local (3-gram Jaccard, sin topónimos).
// Uso: npm run local-web:similar
//
// Aviso ≥ 40%: Google puede tratarlas como doorway pages.

import { mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const WARN_AT = 0.4;
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const dir = mkdtempSync(path.join(os.tmpdir(), 'local-web-'));
const outfile = path.join(dir, 'cities.mjs');

try {
  await build({
    absWorkingDir: rootDir,
    entryPoints: ['src/data/localWebCities.ts'],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile,
    logLevel: 'silent',
  });

  const { LOCAL_WEB_CITY_LIST, scoreLocalWebCitySimilarity } = await import(
    pathToFileURL(outfile).href
  );

  const pairs = [];
  for (let i = 0; i < LOCAL_WEB_CITY_LIST.length; i += 1) {
    for (let j = i + 1; j < LOCAL_WEB_CITY_LIST.length; j += 1) {
      const left = LOCAL_WEB_CITY_LIST[i];
      const right = LOCAL_WEB_CITY_LIST[j];
      pairs.push({
        left: left.slug,
        right: right.slug,
        score: scoreLocalWebCitySimilarity(left, right),
      });
    }
  }

  pairs.sort((a, b) => b.score - a.score);

  const pct = (score) => `${String(Math.round(score * 100)).padStart(3, ' ')}%`;
  const warned = pairs.filter((pair) => pair.score >= WARN_AT);

  console.log(
    `Similitud de copy local (${LOCAL_WEB_CITY_LIST.length} ciudades, ${pairs.length} pares). Aviso ≥ ${Math.round(WARN_AT * 100)}%.\n`,
  );

  for (const pair of pairs) {
    const flag = pair.score >= WARN_AT ? '  ⚠' : '   ';
    console.log(`${flag} ${pct(pair.score)}  ${pair.left} ↔ ${pair.right}`);
  }

  console.log(
    warned.length === 0
      ? '\nNingún par llega al umbral. El copy está suficientemente distinto.'
      : `\n${warned.length} par(es) por encima del umbral. Reescribe hero, intro, sectores, necesidades o FAQs.`,
  );
} finally {
  rmSync(dir, { recursive: true, force: true });
}
