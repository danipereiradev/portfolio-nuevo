import { Fragment, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  ClipboardList,
  Factory,
  MapPin,
} from 'lucide-react';
import HeroCta from '../components/HeroCta';
import { HeroParallaxBg, HERO_NUBES_URL } from '../components/HeroParallaxBg';
import { TextSection } from '../components/TextSection';
import { ServiceIncludes } from '../components/ServiceOnPage';
import SEOBenefits from '../components/SEOBenefits';
import LocalWebDemos from '../components/LocalWebDemos';
import Testimonials from '../components/Testimonials';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import { LocalWebSpainSection } from '../components/LocalWebSpainSection';
import { TalentRecruitStrip } from '../components/TalentRecruitStrip';
import NotFound from './NotFound';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  SITE_MAINTENANCE_LABEL,
  SITE_MAINTENANCE_PATH,
  SITE_SHOP_LABEL,
  SITE_SHOP_PATH,
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
} from '../config/contact';
import {
  getLocalGeoContext,
  getLocalWebCity,
  getPublishedLocalWebFaqs,
  isLocalWebCityListed,
  type LocalWebCity,
} from '../data/localWebCities';
import { LOCAL_WEB_INCLUDES } from '../data/localWebIncludes';
import { getLocalWebDemos } from '../data/localWebDemos';
import { buildLocalWebCityJsonLd } from '../seo/localWebCitySchema';

/** Resalta el nombre de la ciudad al tono de 36web (negrita). */
const withCity = (text: string, ciudad: string) => {
  const parts = text.split(ciudad);
  return parts.map((part, index) => (
    <Fragment key={index}>
      {part}
      {index < parts.length - 1 ? (
        <strong className='font-extrabold'>{ciudad}</strong>
      ) : null}
    </Fragment>
  ));
};

const LocalWebCityPage = ({ city }: { city: LocalWebCity }) => {
  const path = `${SITE_WEB_PATH}/${city.slug}`;

  usePageMeta(path);

  const jsonLd = useMemo(() => buildLocalWebCityJsonLd(city), [city]);
  useJsonLd(`jsonld-diseno-web-${city.slug}`, jsonLd);

  const geo = getLocalGeoContext(city);
  const necesidades =
    city.necesidades_locales.length >= 3 ? city.necesidades_locales : [];

  return (
    <>
      <div className='relative overflow-hidden bg-ink-dark'>
        <HeroParallaxBg src={HERO_NUBES_URL} fetchPriority='high' />
        <div
          className='pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-black/40 to-black/55'
          aria-hidden='true'
        />
        {/* HERO: H1 = "Diseño web en {ciudad}". No reutilices el H1 de /diseno-web. */}
        <HeroCta
          title={`Diseño web en ${city.ciudad}`}
          breadcrumbs={[
            { href: '/', label: 'Inicio' },
            { href: SITE_WEB_PATH, label: SITE_WEB_LABEL },
            { label: `Diseño web en ${city.ciudad}` },
          ]}
          description={<p>{withCity(city.hero_lead, city.ciudad)}</p>}
          buttonText='PEDIR PROPUESTA'
          buttonHref='#contacto'
          heroType='form'
          hasButton={false}
          formTitle='Te llamamos'
          formDescription='Propuesta en el mismo día. Sin compromiso.'
          formSectionInfo={`DisenoWeb Local — ${city.ciudad}`}
          formId='contacto'
          hasBackground={false}
          onMedia
          overlay='none'
          hasReviewBadge
          isTopHero
        />

        {/* INTRO LOCAL: reescribe siempre. Si vale para otra ciudad, no publiques. */}
        <TextSection
          className='bg-white'
          label={`Diseño web en ${city.ciudad}`}
          title={`Una web para tu negocio en ${city.ciudad}.`}
          paragraphs={city.intro_local.map((para) =>
            withCity(para, city.ciudad),
          )}
        />

        {geo ? (
          <TextSection
            onMedia
            title={geo.heading}
            paragraphs={geo.body ? [withCity(geo.body, city.ciudad)] : []}
          />
        ) : null}
      </div>

      {necesidades.length > 0 ? (
        <SEOBenefits
          title={`Qué suele necesitar un negocio de ${city.ciudad} en su web`}
          benefits={necesidades.map((need) => ({
            icon: ClipboardList,
            title: need.title,
            description: withCity(need.description, city.ciudad),
          }))}
        />
      ) : null}

      {/* SECTORES LOCALES: lista distinta por ciudad. No copies la de Valencia en A Coruña. */}
      <SEOBenefits
        title={`Sectores con los que trabajamos en ${city.ciudad}`}
        subtitle={
          <>
            Trabajamos con negocios que necesitan una web clara para explicar
            sus servicios, generar contactos y facilitar presupuestos o
            reservas.
          </>
        }
        benefits={city.sectores_locales.map((sector) => ({
          icon: MapPin,
          title: sector.title,
          description: withCity(sector.description, city.ciudad),
        }))}
      />

      <ServiceIncludes
        title={LOCAL_WEB_INCLUDES.title}
        intro={LOCAL_WEB_INCLUDES.intro}
        items={LOCAL_WEB_INCLUDES.items.map((item) => ({
          title: item.title,
          description: item.description,
        }))}
      />

      <SEOBenefits
        title='Para autónomos, pymes y empresas'
        subtitle={
          <>
            Creamos webs pensadas para explicar bien tu negocio,
            <strong className='font-extrabold'> generar contactos</strong> y
            facilitar que un cliente entienda rápido qué haces.
          </>
        }
        benefits={[
          {
            icon: Briefcase,
            title: 'Autónomos y profesionales',
            description: (
              <>
                Una web clara para presentar tus servicios, mostrar cómo
                trabajas y facilitar que te contacten por{' '}
                <strong className='font-extrabold'>
                  formulario, teléfono o WhatsApp
                </strong>
                .
              </>
            ),
          },
          {
            icon: Building2,
            title: 'Pequeños negocios',
            description: (
              <>
                <strong className='font-extrabold'>
                  Servicios, horarios, ubicación y contacto
                </strong>
                . Si necesitas citas, área privada, tienda online u otras
                funciones, se define antes de empezar.
              </>
            ),
          },
          {
            icon: Factory,
            title: 'Pymes y empresas',
            description: (
              <>
                <strong className='font-extrabold'>
                  Servicios, zonas de trabajo, capacidades y solicitud de
                  presupuesto
                </strong>
                . Si vendes a otras empresas, la web debe dejar claro
                rápidamente qué podéis ofrecer y cómo contactaros.
              </>
            ),
          },
        ]}
      />

      <LocalWebDemos ciudad={city.ciudad} demos={getLocalWebDemos(city)} />

      <Testimonials />

      <SEOProcess
        title='Cómo trabajamos'
        subtitle={
          <>
            Atención directa. Diseño web cercano, profesional y{' '}
            <strong className='font-extrabold'>sin intermediarios</strong>.
          </>
        }
        compact
        steps={[
          {
            number: '1',
            title: 'Nos cuentas tu negocio',
            description: (
              <>
                Formulario, WhatsApp o llamada. Qué haces y qué tiene que hacer
                la web.{' '}
                <strong className='font-extrabold'>
                  Aún no hay nada que pagar
                </strong>
                .
              </>
            ),
          },
          {
            number: '2',
            title: 'Diseñamos y desarrollamos',
            description: (
              <>
                Diseño y desarrollo con tu marca. Te vamos mostrando el avance.{' '}
                <strong className='font-extrabold'>
                  Precio y plazos por escrito
                </strong>
                .
              </>
            ),
          },
          {
            number: '3',
            title: 'Revisas y publicamos',
            description: (
              <>
                Revisas, encaja, publicamos. La web queda{' '}
                <strong className='font-extrabold'>a tu nombre</strong>.
              </>
            ),
          },
        ]}
      />

      <section className='page-section'>
        <div className='container mx-auto max-w-4xl text-center'>
          <div className='page-title-block mx-auto'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Diseño web, tienda o mantenimiento
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              Esta página es para una web de presentación en {city.ciudad}. Si
              el proyecto es otra cosa, ve al servicio que toca.
            </p>
          </div>
          <ul className='mt-page-gap flex flex-col items-center gap-3 text-lg md:text-xl'>
            <li>
              <a
                href={SITE_SHOP_PATH}
                className='font-bold text-link underline'
              >
                {SITE_SHOP_LABEL}
              </a>
            </li>
            <li>
              <a
                href={SITE_MAINTENANCE_PATH}
                className='font-bold text-link underline'
              >
                {SITE_MAINTENANCE_LABEL}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <LocalWebSpainSection currentSlug={city.slug} />

      {/* FAQ LOCAL: no reutilices las preguntas de /diseno-web. */}
      <div id='faq'>
        <SEOFAQ
          title={`Preguntas de diseño web en ${city.ciudad}`}
          faqs={getPublishedLocalWebFaqs(city)}
          ctaText='PEDIR PROPUESTA'
          ctaHref='#contacto'
        />
      </div>

      {/* CTA LOCAL: título y cierre propios de la ciudad. */}
      <HeroCta
        title={city.cta_local.title}
        description={<p>{withCity(city.cta_local.description, city.ciudad)}</p>}
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo={`DisenoWeb Local CTA — ${city.ciudad}`}
        hasBackground={false}
        hasReviewBadge
      />

      <TalentRecruitStrip ciudad={city.ciudad} />
    </>
  );
};

const DisenoWebLocal = () => {
  const { ciudad: slug } = useParams<{ ciudad: string }>();
  const city = getLocalWebCity(slug);

  if (!city || !isLocalWebCityListed(city.slug)) {
    return <NotFound />;
  }

  return <LocalWebCityPage city={city} />;
};

export default DisenoWebLocal;
