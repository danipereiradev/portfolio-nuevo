import {
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
  localWebCityPath,
} from '../config/contact';
import {
  LOCAL_WEB_CITY_LIST,
  getLocalWebCity,
  getRelatedCities,
} from '../data/localWebCities';

type LocalWebSpainSectionProps = {
  /** En páginas de ciudad, solo relatedCitySlugs (máx. 3), no el listado entero. */
  currentSlug?: string;
  /** En `/diseno-web` el hub ya es esta página: no repetir el enlace. */
  includeHubLink?: boolean;
};

/**
 * Enlaces internos a las páginas locales publicadas.
 * Hub: todas. Landing de ciudad: hub + 2–3 relacionadas.
 */
export const LocalWebSpainSection = ({
  currentSlug,
  includeHubLink = false,
}: LocalWebSpainSectionProps) => {
  const currentCity = getLocalWebCity(currentSlug);
  const cities = currentCity
    ? getRelatedCities(currentCity)
    : LOCAL_WEB_CITY_LIST;

  if (!currentCity && LOCAL_WEB_CITY_LIST.length === 0) return null;
  if (currentCity && cities.length === 0 && !includeHubLink) return null;

  const heading = currentCity
    ? 'Tambien ofrecemos diseño web en:'
    : 'Diseño web en España';
  const subtitle = currentCity
    ? 'Diseño web por ciudades.'
    : 'Páginas de diseño web por ciudad.';

  return (
    <section className='page-section'>
      <div className='container mx-auto max-w-4xl text-center'>
        <div className='page-title-block mx-auto'>
          <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            {heading}
          </h2>
          <p className='text-xl text-ink-dark md:text-2xl'>{subtitle}</p>
        </div>
        <ul className='mt-page-gap flex flex-col items-center gap-3 text-lg md:text-xl'>
          {includeHubLink ? (
            <li>
              <a href={SITE_WEB_PATH} className='font-bold text-link underline'>
                {SITE_WEB_LABEL} (toda España)
              </a>
            </li>
          ) : null}
          {cities.map((city) => (
            <li key={city.slug}>
              <a
                href={localWebCityPath(city.slug)}
                className='font-bold text-link underline'
              >
                Diseño web en {city.ciudad}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
