import { TALENT_PATH, talentApplyPath } from '../config/contact';
import Button from './Button';

type TalentRecruitStripProps = {
  compact?: boolean;
  /** Si hay ciudad, copy y CTA de la landing local. */
  ciudad?: string;
};

/**
 * Bloque discreto de captación. Home, footer y final de páginas locales
 * (después del CTA comercial). No va en landings de Ads.
 */
export const TalentRecruitStrip = ({
  compact = false,
  ciudad,
}: TalentRecruitStripProps) => (
  <section
    className={
      compact ? 'border-t border-ink-light' : ciudad ? 'page-section' : 'page-section pt-0'
    }
  >
    <div
      className={`container mx-auto max-w-3xl text-center ${
        compact ? 'py-8' : ''
      }`}
    >
      <p className='text-lg font-extrabold text-ink-dark md:text-xl'>
        ¿Eres diseñador/a o desarrollador/a?
      </p>
      <p className='mt-2 text-ink-medium md:text-lg'>
        {ciudad
          ? `Estamos ampliando el equipo de 36web en ${ciudad}.`
          : 'Estamos ampliando el equipo de 36web en distintas ciudades de España.'}
      </p>
      {ciudad ? (
        <p className='mt-2 text-ink-medium md:text-lg'>
          Si trabajas en diseño web, WordPress, frontend, ecommerce o marketing
          digital, queremos conocerte.
        </p>
      ) : null}
      {ciudad ? (
        <Button href={talentApplyPath(ciudad)} className='mt-6'>
          Enviar candidatura
        </Button>
      ) : (
        <a
          href={TALENT_PATH}
          className='mt-4 inline-block font-bold text-link underline'
        >
          Enviar candidatura
        </a>
      )}
    </div>
  </section>
);
