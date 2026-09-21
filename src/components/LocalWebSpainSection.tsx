import {
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
  localWebCityPath,
} from '../config/contact';
import { LOCAL_WEB_CITY_LIST } from '../data/localWebCities';

type LocalWebSpainSectionProps = {
  /** En páginas de ciudad, no enlazamos la actual. */
  currentSlug?: string;
  /** En `/diseno-web` el hub ya es esta página: no repetir el enlace. */
  includeHubLink?: boolean;
};

/**
 * Enlaces internos a las páginas locales publicadas.
 * Si no hay ciudades en `LOCAL_WEB_CITIES`, no se pinta nada.
 */
export const LocalWebSpainSection = ({
  currentSlug,
  includeHubLink = false,
}: LocalWebSpainSectionProps) => {
  if (LOCAL_WEB_CITY_LIST.length === 0) return null;

  return (
    <section className='page-section'>
      <div className='container mx-auto max-w-4xl text-center'>
        <div className='page-title-block mx-auto'>
          <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            Diseño web en España
          </h2>
          <p className='text-xl text-ink-dark md:text-2xl'>
            Páginas de diseño web por ciudad, con contenido propio. No son un
            clon.
          </p>
        </div>
        <ul className='mt-page-gap flex flex-col items-center gap-3 text-lg md:text-xl'>
          {includeHubLink ? (
            <li>
              <a href={SITE_WEB_PATH} className='font-bold text-link underline'>
                {SITE_WEB_LABEL} (toda España)
              </a>
            </li>
          ) : null}
          {LOCAL_WEB_CITY_LIST.map((city) => (
            <li key={city.slug}>
              {city.slug === currentSlug ? (
                <span className='font-bold text-ink-dark'>
                  Diseño web en {city.ciudad}
                </span>
              ) : (
                <a
                  href={localWebCityPath(city.slug)}
                  className='font-bold text-link underline'
                >
                  Diseño web en {city.ciudad}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
