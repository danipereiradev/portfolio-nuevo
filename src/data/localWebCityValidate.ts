import pagesMeta from '../seo/pagesMeta.json';
import { localWebCityPath } from '../config/contact';
import {
  LOCAL_WEB_COMMON_FAQS,
  LOCAL_WEB_PRESENCIA_TIPOS,
  type LocalWebCity,
  type LocalWebFaq,
} from './localWebCityTypes';

const MIN_INTRO_CHARS = 380;
const MIN_FAQ_LOCAL = 2;
const MIN_SECTORES = 3;
const MIN_NECESIDADES = 3;
const MIN_RASGOS = 2;
const MIN_MUNICIPIOS = 2;
const MAX_RELATED = 3;
const SIMILARITY_WARN_THRESHOLD = 0.4;

const GENERIC_FAQ_STEMS = [
  'haceis diseno web en',
  'haceis diseno web para negocios de',
  'trabajais con negocios de',
  'cuanto cuesta una web',
  'cuanto tarda una web',
  'el plazo cuenta desde',
  'y si luego quiero una tienda online',
  'la web es mia',
];

const STOPWORDS = new Set([
  'a',
  'al',
  'como',
  'con',
  'de',
  'del',
  'el',
  'en',
  'es',
  'esta',
  'este',
  'esto',
  'hay',
  'la',
  'las',
  'le',
  'les',
  'lo',
  'los',
  'mas',
  'no',
  'nos',
  'o',
  'para',
  'por',
  'que',
  'se',
  'si',
  'sin',
  'su',
  'sus',
  'te',
  'tu',
  'un',
  'una',
  'y',
  'ya',
]);

const fold = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

const stripPunctuation = (value: string) =>
  fold(value).replace(/[¿?¡!.,;:()«»"'%/]/g, ' ').replace(/\s+/g, ' ').trim();

const localTokens = (city: LocalWebCity): string[] => {
  const raw = [
    city.ciudad,
    city.provincia,
    city.comunidad,
    city.contexto_local.area,
    ...city.contexto_local.zonas,
    ...city.contexto_local.municipios_cercanos,
    ...city.contexto_local.rasgos_locales,
  ];
  return raw.map((token) => stripPunctuation(token)).filter((token) => token.length >= 4);
};

const stripPlaceNames = (text: string, cities: LocalWebCity[]) => {
  let next = stripPunctuation(text);
  const names = cities
    .flatMap((city) => [
      city.ciudad,
      city.provincia,
      city.comunidad,
      city.contexto_local.area,
      ...city.contexto_local.zonas,
      ...city.contexto_local.municipios_cercanos,
    ])
    .map((name) => stripPunctuation(name))
    .filter((name) => name.length >= 4)
    .sort((a, b) => b.length - a.length);

  for (const name of names) {
    next = next.split(name).join(' ');
  }
  return next.replace(/\s+/g, ' ').trim();
};

const faqQuestionKey = (question: string, city?: LocalWebCity) => {
  let key = stripPunctuation(question);
  if (city) {
    for (const token of localTokens(city).sort((a, b) => b.length - a.length)) {
      key = key.split(token).join(' ');
    }
  }
  return key.replace(/\s+/g, ' ').trim();
};

const isGenericFaqQuestion = (faq: LocalWebFaq, city: LocalWebCity) => {
  const key = faqQuestionKey(faq.question, city);
  return GENERIC_FAQ_STEMS.some(
    (stem) => key === stem || key.startsWith(`${stem} `) || key.startsWith(stem),
  );
};

const mentionsLocalPlace = (faq: LocalWebFaq, city: LocalWebCity) => {
  const haystack = stripPunctuation(`${faq.question} ${faq.answer}`);
  return localTokens(city).some((token) => haystack.includes(token));
};

const answerHasLocalDetail = (faq: LocalWebFaq, city: LocalWebCity) => {
  const haystack = stripPunctuation(faq.answer);
  const detailTokens = [
    ...city.contexto_local.zonas,
    ...city.contexto_local.rasgos_locales,
    city.contexto_local.area,
  ]
    .map((token) => stripPunctuation(token))
    .filter((token) => token.length >= 4);
  return detailTokens.some((token) => haystack.includes(token));
};

const isReallyLocalFaq = (faq: LocalWebFaq, city: LocalWebCity) => {
  const commonKeys = new Set(
    LOCAL_WEB_COMMON_FAQS.map((item) => faqQuestionKey(item.question)),
  );
  if (commonKeys.has(faqQuestionKey(faq.question, city))) return false;
  if (isGenericFaqQuestion(faq, city) && !answerHasLocalDetail(faq, city)) {
    return false;
  }
  return mentionsLocalPlace(faq, city);
};

const tokenize = (text: string) =>
  text
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 3 && !STOPWORDS.has(word));

const shingles = (words: string[], size: number) => {
  const grams = new Set<string>();
  if (words.length < size) {
    if (words.length > 0) grams.add(words.join(' '));
    return grams;
  }
  for (let index = 0; index <= words.length - size; index += 1) {
    grams.add(words.slice(index, index + size).join(' '));
  }
  return grams;
};

const fingerprint = (city: LocalWebCity, peers: LocalWebCity[]) => {
  const raw = [
    city.hero_lead,
    ...city.intro_local,
    ...city.sectores_locales.flatMap((sector) => [sector.title, sector.description]),
    ...city.necesidades_locales.flatMap((need) => [need.title, need.description]),
    ...city.faq_local.flatMap((faq) => [faq.question, faq.answer]),
    city.cta_local.title,
    city.cta_local.description,
  ].join(' ');
  return shingles(tokenize(stripPlaceNames(raw, peers)), 3);
};

const jaccard = (left: Set<string>, right: Set<string>) => {
  if (left.size === 0 && right.size === 0) return 1;
  let intersection = 0;
  for (const gram of left) {
    if (right.has(gram)) intersection += 1;
  }
  return intersection / (left.size + right.size - intersection);
};

export const assertCity = (city: LocalWebCity, allSlugs: Set<string>) => {
  const intro = city.intro_local.join(' ');
  const path = localWebCityPath(city.slug);

  if (!city.slug || !/^[a-z0-9-]+$/.test(city.slug)) {
    throw new Error(`[local-web] slug inválido: "${city.slug}"`);
  }
  if (!city.comunidad.trim()) {
    throw new Error(`[local-web] ${city.slug}: falta comunidad.`);
  }
  if (intro.length < MIN_INTRO_CHARS) {
    throw new Error(
      `[local-web] intro_local de ${city.slug} es demasiado corta. Escribe contenido local, no un párrafo genérico.`,
    );
  }
  if (!intro.includes(city.ciudad)) {
    throw new Error(
      `[local-web] intro_local de ${city.slug} debe nombrar "${city.ciudad}".`,
    );
  }
  if (!city.contexto_local.area.trim()) {
    throw new Error(`[local-web] ${city.slug}: contexto_local.area es obligatorio.`);
  }
  if (city.contexto_local.rasgos_locales.length < MIN_RASGOS) {
    throw new Error(
      `[local-web] ${city.slug}: mínimo ${MIN_RASGOS} rasgos_locales.`,
    );
  }
  if (
    city.relatedCitySlugs.length > 0 &&
    city.contexto_local.municipios_cercanos.length < MIN_MUNICIPIOS
  ) {
    throw new Error(
      `[local-web] ${city.slug}: mínimo ${MIN_MUNICIPIOS} municipios_cercanos (tiene ciudades relacionadas).`,
    );
  }
  if (city.sectores_locales.length < MIN_SECTORES) {
    throw new Error(`[local-web] ${city.slug}: mínimo ${MIN_SECTORES} sectores_locales.`);
  }
  if (city.necesidades_locales.length < MIN_NECESIDADES) {
    throw new Error(
      `[local-web] ${city.slug}: mínimo ${MIN_NECESIDADES} necesidades_locales.`,
    );
  }
  if (
    city.necesidades_locales.some(
      (need) => need.title.trim().length < 8 || need.description.trim().length < 12,
    )
  ) {
    throw new Error(
      `[local-web] ${city.slug}: cada necesidad_local necesita title y description (no una frase genérica).`,
    );
  }
  if (
    new Set(city.necesidades_locales.map((need) => need.title.trim().toLowerCase()))
      .size !== city.necesidades_locales.length
  ) {
    throw new Error(`[local-web] ${city.slug}: titles de necesidades_locales repetidos.`);
  }
  if (city.faq_local.length < MIN_FAQ_LOCAL) {
    throw new Error(
      `[local-web] ${city.slug}: mínimo ${MIN_FAQ_LOCAL} faq_local (solo las ligadas a la ciudad).`,
    );
  }
  if (!city.faq_local.some((faq) => faq.question.includes(city.ciudad))) {
    throw new Error(
      `[local-web] ${city.slug}: al menos una pregunta de FAQ local debe nombrar "${city.ciudad}".`,
    );
  }
  const genericLocalFaqs = city.faq_local.filter((faq) => !isReallyLocalFaq(faq, city));
  if (genericLocalFaqs.length > 0) {
    throw new Error(
      `[local-web] ${city.slug}: faq_local tiene preguntas generales. Muévelas a LOCAL_WEB_COMMON_FAQS o reescríbelas con dato de la plaza: ${genericLocalFaqs
        .map((faq) => `"${faq.question}"`)
        .join(', ')}`,
    );
  }
  if (!city.hero_lead.includes(city.ciudad)) {
    throw new Error(`[local-web] hero_lead de ${city.slug} debe nombrar la ciudad.`);
  }
  if (!city.title.includes(city.ciudad) || !city.description.includes(city.ciudad)) {
    throw new Error(
      `[local-web] title y description de ${city.slug} deben ser únicos y nombrar la ciudad.`,
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(city.verified_at) || Number.isNaN(Date.parse(city.verified_at))) {
    throw new Error(
      `[local-web] ${city.slug}: verified_at debe ser una fecha ISO YYYY-MM-DD.`,
    );
  }
  if (!LOCAL_WEB_PRESENCIA_TIPOS.includes(city.presencia_local.tipo)) {
    throw new Error(
      `[local-web] ${city.slug}: presencia_local.tipo inválido (${city.presencia_local.tipo}).`,
    );
  }
  if (city.presencia_local.mostrar && !city.presencia_local.nombre?.trim()) {
    throw new Error(
      `[local-web] ${city.slug}: presencia_local.mostrar=true exige nombre. No inventes dirección.`,
    );
  }
  if (city.relatedCitySlugs.length > MAX_RELATED) {
    throw new Error(
      `[local-web] ${city.slug}: relatedCitySlugs máximo ${MAX_RELATED}. No listes todas las ciudades.`,
    );
  }
  if (new Set(city.relatedCitySlugs).size !== city.relatedCitySlugs.length) {
    throw new Error(`[local-web] ${city.slug}: relatedCitySlugs repetidos.`);
  }
  if (city.relatedCitySlugs.includes(city.slug)) {
    throw new Error(`[local-web] ${city.slug}: no te enlaces a ti misma.`);
  }
  for (const related of city.relatedCitySlugs) {
    if (!allSlugs.has(related)) {
      throw new Error(
        `[local-web] ${city.slug} apunta a relatedCitySlugs "${related}" que no existe.`,
      );
    }
  }

  const meta = (pagesMeta as Record<string, { title?: string; description?: string }>)[
    path
  ];
  if (!meta) {
    throw new Error(
      `[local-web] Falta "${path}" en src/seo/pagesMeta.json. Sin esa entrada el HTML estático no lleva title/canonical propios.`,
    );
  }
  if (meta.title !== city.title || meta.description !== city.description) {
    throw new Error(
      `[local-web] title/description de ${path} no coinciden con pagesMeta.json. Unifica las dos fuentes.`,
    );
  }
};

export const scoreLocalWebCitySimilarity = (
  left: LocalWebCity,
  right: LocalWebCity,
) =>
  jaccard(
    fingerprint(left, [left, right]),
    fingerprint(right, [left, right]),
  );

export const warnSimilarLocalWebCities = (cities: LocalWebCity[]) => {
  for (let i = 0; i < cities.length; i += 1) {
    for (let j = i + 1; j < cities.length; j += 1) {
      const left = cities[i];
      const right = cities[j];
      const score = scoreLocalWebCitySimilarity(left, right);
      if (score < SIMILARITY_WARN_THRESHOLD) continue;
      const percent = Math.round(score * 100);
      console.warn(
        `[local-web] ${left.slug} y ${right.slug} se parecen demasiado (${percent}%). Reescribe hero, intro, sectores, necesidades o FAQs locales; Google las trata como doorway pages.`,
      );
    }
  }
};
