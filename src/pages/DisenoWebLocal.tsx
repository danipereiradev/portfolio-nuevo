import { Fragment, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Briefcase, Building2, ClipboardList, Factory, MapPin } from 'lucide-react';
import HeroCta from '../components/HeroCta';
import { TextSection } from '../components/TextSection';
import { ServiceIncludes } from '../components/ServiceOnPage';
import SEOBenefits from '../components/SEOBenefits';
import Portfolio from '../components/Portfolio';
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
  type LocalWebCity,
} from '../data/localWebCities';
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
      {/* HERO: H1 = "Diseño web en {ciudad}". No reutilices el H1 de /diseno-web. */}
      <HeroCta
        title={`Diseño web en ${city.ciudad}`}
        breadcrumbs={[
          { href: '/', label: 'Inicio' },
          { href: SITE_WEB_PATH, label: SITE_WEB_LABEL },
          { label: `Diseño web en ${city.ciudad}` },
        ]}
        description={
          <p>
            {withCity(city.hero_lead, city.ciudad)}
          </p>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        backgroundUrl='/video/hero-nubes.jpg'
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo={`DisenoWeb Local — ${city.ciudad}`}
        formId='contacto'
        hasBackground
        overlay='none'
        hasReviewBadge
        isTopHero
      />

      {/* INTRO LOCAL: reescribe siempre. Si vale para otra ciudad, no publiques. */}
      <TextSection
        label={`Diseño web en ${city.ciudad}`}
        title={`Una web para tu negocio en ${city.ciudad}. Sin inflarla.`}
        paragraphs={city.intro_local.map((para) =>
          withCity(para, city.ciudad),
        )}
      />

      {geo ? (
        <TextSection
          muted
          title={geo.heading}
          paragraphs={geo.body ? [withCity(geo.body, city.ciudad)] : []}
        />
      ) : null}

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
            No cubrimos “todo”. Cubrimos negocios a los que una web clara les
            cambia el día a día.
          </>
        }
        benefits={city.sectores_locales.map((sector) => ({
          icon: MapPin,
          title: sector.title,
          description: withCity(sector.description, city.ciudad),
        }))}
      />

      <ServiceIncludes
        title='Qué montamos'
        intro={
          <>
            La base de una web de negocio. El resto va por escrito en la
            propuesta.{' '}
            <strong className='font-extrabold'>Sin sorpresas.</strong>
          </>
        }
        items={[
          {
            title: 'Diseño adaptado a tu marca',
            description: (
              <>
                Colores, estructura y tono de tu negocio.{' '}
                <strong className='font-extrabold'>
                  No reutilizamos el mismo diseño entre clientes
                </strong>
                .
              </>
            ),
          },
          {
            title: 'Se ve y se usa en el móvil',
            description:
              'La mayor parte de tus visitas llegan del teléfono. Si ahí no se entiende, la web no sirve.',
          },
          {
            title: 'Formulario y WhatsApp',
            description: (
              <>
                Para que te escriban.{' '}
                <strong className='font-extrabold'>
                  Sin eso, la web es un folleto
                </strong>
                .
              </>
            ),
          },
          {
            title: 'Publicación a tu nombre',
            description:
              'Dominio, hosting para arrancar y la web tuya. Google tiene títulos y encabezados limpios; el SEO continuo, si lo quieres, se habla aparte.',
          },
        ]}
      />

      <SEOBenefits
        title='Para autónomos, pymes y empresas'
        subtitle={
          <>
            No hacemos webs de agencia para impresionar a otras agencias. Las
            hacemos para que{' '}
            <strong className='font-extrabold'>te encuentren y te escriban</strong>
            .
          </>
        }
        benefits={[
          {
            icon: Briefcase,
            title: 'Autónomos y profesionales',
            description: (
              <>
                Una página que explique qué haces, se vea bien en el teléfono y
                deje un{' '}
                <strong className='font-extrabold'>formulario o WhatsApp</strong>
                . Eso ya es una web profesional.
              </>
            ),
          },
          {
            icon: Building2,
            title: 'Pequeños negocios',
            description: (
              <>
                Servicios, quiénes sois, cómo os contactan. Si hace falta más —
                citas, área privada, tienda—{' '}
                <strong className='font-extrabold'>
                  te lo decimos en la propuesta
                </strong>
                , no te lo colamos.
              </>
            ),
          },
          {
            icon: Factory,
            title: 'Pymes y empresas',
            description: (
              <>
                Servicios, zona de trabajo y cómo pedir presupuesto. Si tu
                cliente es otra empresa, que lo entienda{' '}
                <strong className='font-extrabold'>a la primera</strong>.
              </>
            ),
          },
        ]}
      />

      <Portfolio
        ids={city.casos_relevantes}
        contained
        note={<>{city.casos_note}</>}
        sectorPrompt='¿Quieres ver algo más parecido a tu negocio? Te enseñamos proyectos similares antes de empezar.'
        sectorCtaText='Ver ejemplos de mi sector'
        sectorCtaHref='#contacto'
      />

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
                <strong className='font-extrabold'>Aún no hay nada que pagar</strong>
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
                <strong className='font-extrabold'>Precio y plazos por escrito</strong>
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

  if (!city) {
    return <NotFound />;
  }

  return <LocalWebCityPage city={city} />;
};

export default DisenoWebLocal;
