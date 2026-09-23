import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, Check } from 'lucide-react';
import { LOCAL_WEB_LISTED_CITIES } from '../data/localWebCities';
import {
  FORM_CC_EMAIL,
  TALENT_FORM_ORIGIN,
  TALENT_PATH,
  talentLandingOrigin,
} from '../config/contact';
import {
  trackFormError,
  trackGa4FormSubmit,
  trackTalentFormSubmit,
} from '../utils/analytics';
import Button from './Button';

export const TALENT_SPECIALTIES = [
  'Diseño web',
  'WordPress',
  'Frontend',
  'Ecommerce',
  'SEO',
  'Google Ads',
  'Diseño gráfico / branding',
  'Soporte / mantenimiento',
  'Otro',
] as const;

const EXPERIENCE = [
  'Menos de 1 año',
  '1–3 años',
  '3–5 años',
  '5–10 años',
  'Más de 10 años',
] as const;

const AVAILABILITY = [
  'Inmediata',
  'En 15 días',
  'En 1 mes',
  'A convenir',
  'Por proyecto',
] as const;

const MAX_CV_BYTES = 5 * 1024 * 1024;
const CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const fieldClass = (hasError: boolean) =>
  `w-full rounded-lg border-2 bg-white px-4 py-3 text-ink-dark caret-ink-dark transition-all duration-150 focus:border-accent focus:shadow-[3px_3px_0_0_var(--color-accent)] focus:outline-none ${
    hasError
      ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
      : 'border-ink-dark'
  }`;

const ErrorMessage = ({ error }: { error: string }) => (
  <div className='mt-1 flex items-center gap-2 text-sm text-accent'>
    <AlertCircle className='h-4 w-4' />
    {error}
  </div>
);

const emptyForm = {
  name: '',
  ciudad: '',
  provincia: '',
  especialidad: '',
  especialidadOtra: '',
  email: '',
  phone: '',
  portfolio: '',
  experiencia: '',
  disponibilidad: '',
  mensaje: '',
  consent: false,
  gotcha: '',
};

const normalizeUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const resolveCiudadQuery = (raw: string) => {
  const value = raw.trim();
  if (!value) return { display: '', slug: undefined as string | undefined };
  const lower = value.toLowerCase();
  const match = LOCAL_WEB_LISTED_CITIES.find(
    (city) => city.slug === lower || city.ciudad.toLowerCase() === lower,
  );
  if (match) return { display: match.ciudad, slug: match.slug };
  return { display: value, slug: undefined as string | undefined };
};

const TalentForm = () => {
  const [searchParams] = useSearchParams();
  const fromQuery = useMemo(
    () => resolveCiudadQuery(searchParams.get('ciudad') ?? ''),
    [searchParams],
  );
  const origen = fromQuery.slug
    ? talentLandingOrigin(fromQuery.slug)
    : TALENT_FORM_ORIGIN;

  const [formData, setFormData] = useState(() => ({
    ...emptyForm,
    ciudad: fromQuery.display,
  }));
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error' | 'success'>(
    'idle',
  );

  useEffect(() => {
    setFormData((prev) =>
      prev.ciudad === fromQuery.display
        ? prev
        : { ...prev, ciudad: fromQuery.display },
    );
  }, [fromQuery.display]);

  const citySuggestions = useMemo(
    () => LOCAL_WEB_LISTED_CITIES.map((city) => city.ciudad),
    [],
  );

  const especialidadValue =
    formData.especialidad === 'Otro'
      ? formData.especialidadOtra.trim()
      : formData.especialidad;

  const handleChange = (field: keyof typeof emptyForm, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (formData.name.trim().length < 2) {
      next.name = 'Escribe tu nombre';
    }
    if (formData.ciudad.trim().length < 2) {
      next.ciudad = 'La ciudad es obligatoria';
    }
    if (formData.provincia.trim().length < 2) {
      next.provincia = 'La provincia es obligatoria';
    }
    if (!formData.especialidad) {
      next.especialidad = 'Elige una especialidad';
    }
    if (formData.especialidad === 'Otro' && formData.especialidadOtra.trim().length < 2) {
      next.especialidadOtra = 'Indica tu especialidad';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      next.email = 'Introduce un email válido';
    }
    const phone = formData.phone.replace(/[\s\-().]/g, '');
    if (!/^(?:\+34|0034|34)?[6789]\d{8}$/.test(phone) && !/^\+[1-9]\d{7,14}$/.test(phone)) {
      next.phone = 'Introduce un teléfono válido';
    }
    if (formData.portfolio.trim().length < 8) {
      next.portfolio = 'Añade un enlace a portfolio o LinkedIn';
    }
    if (!formData.experiencia) {
      next.experiencia = 'Indica los años de experiencia';
    }
    if (!formData.disponibilidad) {
      next.disponibilidad = 'Indica tu disponibilidad';
    }
    if (cvFile) {
      if (cvFile.size > MAX_CV_BYTES) {
        next.cv = 'El CV no puede superar 5 MB';
      } else if (cvFile.type && !CV_TYPES.includes(cvFile.type) && !/\.(pdf|docx?)$/i.test(cvFile.name)) {
        next.cv = 'Adjunta un PDF o Word';
      }
    }
    if (!formData.consent) {
      next.consent = 'Acepta la política de privacidad';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (formData.gotcha) return;
    if (!validate()) {
      trackFormError('validation_error', 'talent');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const page = `${window.location.pathname}${window.location.search}`;
    const ciudad = formData.ciudad.trim();
    const especialidad = especialidadValue;
    const portfolio = normalizeUrl(formData.portfolio);

    const body = new FormData();
    body.append('name', formData.name.trim());
    body.append('email', formData.email.trim());
    body.append('phone', formData.phone.trim());
    body.append('ciudad', ciudad);
    body.append('provincia', formData.provincia.trim());
    body.append('especialidad', especialidad);
    body.append('portfolio', portfolio);
    body.append('experiencia', formData.experiencia);
    body.append('disponibilidad', formData.disponibilidad);
    body.append('mensaje', formData.mensaje.trim());
    body.append('origen', origen);
    body.append('page', page);
    body.append('consent', String(formData.consent));
    body.append('_subject', `[Talento] ${formData.name.trim()} — ${ciudad} — ${especialidad}`);
    body.append('_replyto', formData.email.trim());
    body.append('_cc', FORM_CC_EMAIL);
    body.append(
      'message',
      `Origen: ${origen}
Página: ${page}
Nombre: ${formData.name.trim()}
Ciudad: ${ciudad}
Provincia: ${formData.provincia.trim()}
Especialidad: ${especialidad}
Email: ${formData.email.trim()}
Teléfono: ${formData.phone.trim()}
Portfolio / LinkedIn: ${portfolio}
Años de experiencia: ${formData.experiencia}
Disponibilidad: ${formData.disponibilidad}
Mensaje: ${formData.mensaje.trim() || '—'}
`,
    );
    if (cvFile) {
      body.append('cv', cvFile, cvFile.name);
    }

    try {
      const response = await fetch('https://formspree.io/f/movlevkj', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result || result.ok !== true) {
        throw new Error(result?.error || `Error ${response.status}`);
      }

      trackGa4FormSubmit(origen);
      trackTalentFormSubmit(ciudad, especialidad);
      setSubmitStatus('success');
      setFormData(emptyForm);
      setCvFile(null);
    } catch (error) {
      console.error('Error al enviar candidatura:', error);
      trackFormError('submit_failed', 'talent');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className='rounded-lg border-2 border-ink-dark bg-white p-8 text-center shadow-[7px_7px_0_0_#1a1a1a]'>
        <Check className='mx-auto mb-4 h-10 w-10 text-accent' />
        <p className='text-xl font-extrabold text-ink-dark md:text-2xl'>
          Hemos recibido tu candidatura
        </p>
        <p className='mt-3 text-lg text-ink-dark'>
          Si encaja con un proyecto o con una ciudad, te escribimos. No implica
          una oferta de empleo fijo.
        </p>
      </div>
    );
  }

  return (
    <div className='overflow-hidden rounded-lg border-2 border-ink-dark bg-white shadow-[7px_7px_0_0_#1a1a1a]'>
      <form onSubmit={handleSubmit} className='space-y-6 p-6 text-ink-dark md:p-8' noValidate>
        <input
          type='text'
          name='_gotcha'
          value={formData.gotcha}
          onChange={(e) => handleChange('gotcha', e.target.value)}
          className='hidden'
          tabIndex={-1}
          autoComplete='off'
        />

        <div className='grid gap-6 md:grid-cols-2'>
          <div>
            <label className='mb-2 block text-sm font-medium' htmlFor='talent-name'>
              Nombre *
            </label>
            <input
              id='talent-name'
              type='text'
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={fieldClass(Boolean(errors.name))}
              autoComplete='name'
              maxLength={80}
            />
            {errors.name ? <ErrorMessage error={errors.name} /> : null}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium' htmlFor='talent-email'>
              Email *
            </label>
            <input
              id='talent-email'
              type='email'
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={fieldClass(Boolean(errors.email))}
              autoComplete='email'
            />
            {errors.email ? <ErrorMessage error={errors.email} /> : null}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium' htmlFor='talent-ciudad'>
              Ciudad *
            </label>
            <input
              id='talent-ciudad'
              type='text'
              value={formData.ciudad}
              onChange={(e) => handleChange('ciudad', e.target.value)}
              className={fieldClass(Boolean(errors.ciudad))}
              list='talent-ciudades'
              autoComplete='address-level2'
            />
            <datalist id='talent-ciudades'>
              {citySuggestions.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
            {errors.ciudad ? <ErrorMessage error={errors.ciudad} /> : null}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium' htmlFor='talent-provincia'>
              Provincia *
            </label>
            <input
              id='talent-provincia'
              type='text'
              value={formData.provincia}
              onChange={(e) => handleChange('provincia', e.target.value)}
              className={fieldClass(Boolean(errors.provincia))}
              autoComplete='address-level1'
            />
            {errors.provincia ? <ErrorMessage error={errors.provincia} /> : null}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium' htmlFor='talent-especialidad'>
              Especialidad *
            </label>
            <select
              id='talent-especialidad'
              value={formData.especialidad}
              onChange={(e) => handleChange('especialidad', e.target.value)}
              className={`${fieldClass(Boolean(errors.especialidad))} ${
                formData.especialidad ? 'text-ink-dark' : 'text-gray-400'
              }`}
            >
              <option value='' disabled>
                Elige especialidad
              </option>
              {TALENT_SPECIALTIES.map((item) => (
                <option key={item} value={item} className='text-ink-dark'>
                  {item}
                </option>
              ))}
            </select>
            {errors.especialidad ? <ErrorMessage error={errors.especialidad} /> : null}
          </div>
          {formData.especialidad === 'Otro' ? (
            <div>
              <label className='mb-2 block text-sm font-medium' htmlFor='talent-otra'>
                ¿Cuál? *
              </label>
              <input
                id='talent-otra'
                type='text'
                value={formData.especialidadOtra}
                onChange={(e) => handleChange('especialidadOtra', e.target.value)}
                className={fieldClass(Boolean(errors.especialidadOtra))}
              />
              {errors.especialidadOtra ? (
                <ErrorMessage error={errors.especialidadOtra} />
              ) : null}
            </div>
          ) : null}
          <div>
            <label className='mb-2 block text-sm font-medium' htmlFor='talent-phone'>
              Teléfono *
            </label>
            <input
              id='talent-phone'
              type='tel'
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={fieldClass(Boolean(errors.phone))}
              autoComplete='tel'
            />
            {errors.phone ? <ErrorMessage error={errors.phone} /> : null}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium' htmlFor='talent-portfolio'>
              Portfolio / LinkedIn *
            </label>
            <input
              id='talent-portfolio'
              type='text'
              inputMode='url'
              value={formData.portfolio}
              onChange={(e) => handleChange('portfolio', e.target.value)}
              className={fieldClass(Boolean(errors.portfolio))}
              placeholder='https://'
            />
            {errors.portfolio ? <ErrorMessage error={errors.portfolio} /> : null}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium' htmlFor='talent-experiencia'>
              Años de experiencia *
            </label>
            <select
              id='talent-experiencia'
              value={formData.experiencia}
              onChange={(e) => handleChange('experiencia', e.target.value)}
              className={`${fieldClass(Boolean(errors.experiencia))} ${
                formData.experiencia ? 'text-ink-dark' : 'text-gray-400'
              }`}
            >
              <option value='' disabled>
                Elige
              </option>
              {EXPERIENCE.map((item) => (
                <option key={item} value={item} className='text-ink-dark'>
                  {item}
                </option>
              ))}
            </select>
            {errors.experiencia ? <ErrorMessage error={errors.experiencia} /> : null}
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium' htmlFor='talent-disponibilidad'>
              Disponibilidad *
            </label>
            <select
              id='talent-disponibilidad'
              value={formData.disponibilidad}
              onChange={(e) => handleChange('disponibilidad', e.target.value)}
              className={`${fieldClass(Boolean(errors.disponibilidad))} ${
                formData.disponibilidad ? 'text-ink-dark' : 'text-gray-400'
              }`}
            >
              <option value='' disabled>
                Elige
              </option>
              {AVAILABILITY.map((item) => (
                <option key={item} value={item} className='text-ink-dark'>
                  {item}
                </option>
              ))}
            </select>
            {errors.disponibilidad ? (
              <ErrorMessage error={errors.disponibilidad} />
            ) : null}
          </div>
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium' htmlFor='talent-cv'>
            CV (opcional, PDF o Word, máx. 5 MB)
          </label>
          <input
            id='talent-cv'
            type='file'
            accept='.pdf,.doc,.docx,application/pdf'
            onChange={(e) => {
              setCvFile(e.target.files?.[0] ?? null);
              if (errors.cv) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.cv;
                  return next;
                });
              }
            }}
            className={fieldClass(Boolean(errors.cv))}
          />
          {errors.cv ? <ErrorMessage error={errors.cv} /> : null}
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium' htmlFor='talent-mensaje'>
            Mensaje
          </label>
          <textarea
            id='talent-mensaje'
            value={formData.mensaje}
            onChange={(e) => handleChange('mensaje', e.target.value)}
            className={`${fieldClass(false)} min-h-[8rem]`}
            maxLength={2000}
          />
        </div>

        <div className='flex items-start gap-3'>
          <input
            id='talent-consent'
            type='checkbox'
            checked={formData.consent}
            onChange={(e) => handleChange('consent', e.target.checked)}
            className='mt-1 h-5 w-5 accent-accent'
          />
          <label htmlFor='talent-consent' className='text-sm md:text-base'>
            He leído y acepto la{' '}
            <a
              href='/politica-de-privacidad'
              target='_blank'
              rel='noopener noreferrer'
              className='font-bold text-link underline'
            >
              política de privacidad
            </a>
            . *
          </label>
        </div>
        {errors.consent ? <ErrorMessage error={errors.consent} /> : null}

        {submitStatus === 'error' ? (
          <p className='text-accent'>
            No se ha podido enviar. Prueba de nuevo o escribe a hola@36web.es.
          </p>
        ) : null}

        <Button type='submit' disabled={isSubmitting} isLoading={isSubmitting} fullWidth>
          Enviar candidatura
        </Button>
        <p className='text-center text-sm text-ink-medium'>
          Recibes confirmación en esta página. Si encaja, te contactamos.{' '}
          <span className='sr-only'>Formulario {TALENT_PATH}</span>
        </p>
      </form>
    </div>
  );
};

export default TalentForm;
