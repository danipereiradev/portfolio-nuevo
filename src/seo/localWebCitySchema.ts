import {
  CONTACT_EMAIL,
  PHONE_NUMBER,
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
} from '../config/contact';
import {
  getPublishedLocalWebFaqs,
  type LocalWebCity,
} from '../data/localWebCities';

export const SITE_URL = 'https://36web.es';

export const localWebCityPageUrl = (slug: string) =>
  `${SITE_URL}${SITE_WEB_PATH}/${slug}/`;

/** Schema Organization + Service (sin LocalBusiness ni dirección de la ciudad). */
export const buildLocalWebCityJsonLd = (city: LocalWebCity) => {
  const pageUrl = localWebCityPageUrl(city.slug);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: '36web',
        url: `${SITE_URL}/`,
        email: CONTACT_EMAIL,
        telephone: `+${PHONE_NUMBER}`,
      },
      {
        '@type': 'Service',
        name: `Diseño web en ${city.ciudad}`,
        serviceType: 'Diseño web',
        description: city.description,
        url: pageUrl,
        areaServed: {
          '@type': 'City',
          name: city.ciudad,
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: city.provincia,
          },
        },
        provider: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: SITE_WEB_LABEL,
            item: `${SITE_URL}${SITE_WEB_PATH}/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `Diseño web en ${city.ciudad}`,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: getPublishedLocalWebFaqs(city).map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
};
