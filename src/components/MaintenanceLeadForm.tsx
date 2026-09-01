import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Button from './Button';
import {
  trackFormError,
  trackFormSubmit,
  trackGoogleAdsFormConversion,
  trackMaintenanceFormSubmit,
  unlockGoogleAdsFormConversion,
} from '../utils/analytics';
import { BUSINESS_HOURS_LABEL, FORM_CC_EMAIL } from '../config/contact';
import {
  MAINTENANCE_FORM_ORIGIN,
  MAINTENANCE_NEED_OPTIONS,
} from '../config/maintenanceOffer';

const emptyForm = () => ({
  name: '',
  email: '',
  phone: '',
  website: '',
  need: '',
  message: '',
  consent: false,
});

const inputClass = (hasError: boolean) =>
  `w-full text-xl md:text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent transition-all duration-150 ${
    hasError
      ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
      : 'border-gray-400'
  }`;

const MaintenanceLeadForm = ({ className = '' }: { className?: string }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');
  const [formData, setFormData] = useState(emptyForm);

  const sanitizeText = (text: string): string =>
    text
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: sanitizeText(value) }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = (value: string): boolean =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  const validatePhone = (value: string): boolean => {
    const cleanPhone = value.replace(/[\s\-().]/g, '');
    const spanishPhone = /^(?:\+34|0034|34)?[6789]\d{8}$/;
    const internationalPhone = /^\+[1-9]\d{7,14}$/;
    return spanishPhone.test(cleanPhone) || internationalPhone.test(cleanPhone);
  };

  const validateName = (name: string): boolean => {
    const trimmedName = name.trim();
    return (
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(trimmedName) &&
      trimmedName.length >= 2
    );
  };

  const validateWebsite = (value: string): boolean => {
    if (!value.trim()) return true;
    try {
      const withProto = /^https?:\/\//i.test(value)
        ? value
        : `https://${value}`;
      const url = new URL(withProto);
      return url.hostname.includes('.');
    } catch {
      return false;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name || !validateName(formData.name)) {
      newErrors.name =
        'El nombre debe contener solo letras y tener entre 2-50 caracteres';
    }

    if (!formData.email.trim() || !validateEmail(formData.email.trim())) {
      newErrors.email = 'Introduce un email válido';
    }

    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      newErrors.phone = 'Introduce un teléfono válido';
    }

    if (!validateWebsite(formData.website)) {
      newErrors.website = 'Introduce una URL válida';
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'Cuéntanos qué le pasa a la web (mínimo 10 caracteres)';
    }

    if (!formData.consent) {
      newErrors.consent = 'Acepta la política de privacidad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      trackFormError('validation_error', MAINTENANCE_FORM_ORIGIN);
      return;
    }

    unlockGoogleAdsFormConversion();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const origen = MAINTENANCE_FORM_ORIGIN;
      const pagina = window.location.pathname;
      const needLabel =
        MAINTENANCE_NEED_OPTIONS.find((option) => option.value === formData.need)
          ?.label || '';

      const formDataToSend: Record<string, string | boolean> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        need: needLabel,
        detalle: formData.message,
        origen,
        page: origen,
        pagina,
        consent: formData.consent,
        submissionDate: new Date().toLocaleString('es-ES'),
        _subject: `[${origen}] Nueva solicitud — ${formData.name}`,
        _replyto: formData.email,
        _cc: FORM_CC_EMAIL,
        message: `
Origen: ${origen}
Página: ${pagina}
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
URL: ${formData.website || '—'}
Qué necesita: ${needLabel || '—'}
Mensaje: ${formData.message}
consent: ${formData.consent}
Fecha: ${new Date().toLocaleString('es-ES')}
        `,
      };

      const response = await fetch('https://formspree.io/f/movlevkj', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || result.ok !== true) {
        throw new Error(
          result?.error ||
            result?.errors?.[0]?.message ||
            `Error ${response.status}: ${response.statusText}`,
        );
      }

      trackFormSubmit(origen);
      trackMaintenanceFormSubmit();
      trackGoogleAdsFormConversion();
      setIsFormSent(true);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      trackFormError('submit_failed', MAINTENANCE_FORM_ORIGIN);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsFormSent(false);
      }, 10000);
      setFormData(emptyForm());
    }
  };

  const ErrorMessage = ({ error }: { error: string }) => (
    <div className='mt-1 flex items-center gap-2 text-sm text-accent'>
      <AlertCircle className='h-4 w-4' />
      {error}
    </div>
  );

  return (
    <div className={`z-10 flex w-full justify-center md:w-1/2 ${className}`.trim()}>
      <form
        id='contacto'
        onSubmit={handleSubmit}
        className='hero-cta-form w-full scroll-mt-[calc(var(--site-header-h)+1rem)] rounded-lg bg-surface-muted p-content-pad shadow-xl md:w-3/4'
        action=''
      >
        <div className='page-title-block text-center'>
          <h2 className='text-2xl font-extrabold text-black md:text-3xl lg:text-4xl'>
            Cuéntanos qué le pasa
          </h2>
          <span className='block text-sm font-extrabold uppercase tracking-wide text-accent'>
            {BUSINESS_HOURS_LABEL}
          </span>
          <p className='text-center text-lg text-gray-900'>
            URL, síntoma y cómo te localizamos. Te respondemos en horario laboral.
          </p>
        </div>
        <div className='form-fields mt-page-gap flex flex-col gap-content-gap'>
          <input
            type='text'
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={inputClass(Boolean(errors.name))}
            placeholder='Tu nombre *'
            maxLength={50}
          />
          {errors.name ? <ErrorMessage error={errors.name} /> : null}
          <input
            type='email'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={inputClass(Boolean(errors.email))}
            autoComplete='email'
            placeholder='Tu email *'
          />
          {errors.email ? <ErrorMessage error={errors.email} /> : null}
          <input
            type='tel'
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={inputClass(Boolean(errors.phone))}
            placeholder='Tu teléfono *'
            autoComplete='tel'
            inputMode='tel'
          />
          {errors.phone ? <ErrorMessage error={errors.phone} /> : null}
          <input
            type='text'
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className={inputClass(Boolean(errors.website))}
            placeholder='URL de tu web'
            inputMode='url'
            autoComplete='url'
          />
          {errors.website ? <ErrorMessage error={errors.website} /> : null}
          <select
            value={formData.need}
            onChange={(e) => handleInputChange('need', e.target.value)}
            className={inputClass(false)}
          >
            {MAINTENANCE_NEED_OPTIONS.map((option) => (
              <option key={option.value || 'empty'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`${inputClass(Boolean(errors.message))} min-h-32 resize-y text-lg md:text-xl`}
            placeholder='Qué le pasa a la web *'
            maxLength={2000}
          />
          {errors.message ? <ErrorMessage error={errors.message} /> : null}

          <div className='flex items-center gap-2'>
            <span className='relative -ml-2 -mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center text-neutral-300 md:ml-0 md:mt-0.5 md:h-5 md:w-5'>
              <input
                type='checkbox'
                required
                checked={formData.consent}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    consent: e.target.checked,
                  }));
                  if (errors.consent) {
                    setErrors((prev) => ({ ...prev, consent: '' }));
                  }
                }}
                className='h-6 w-6 rounded border-2 border-ink-dark accent-accent md:h-12 md:w-12'
              />
            </span>
            <span className='text-md pt-2 text-start italic leading-relaxed text-gray-900 md:pt-0 md:text-xl'>
              He leido y acepto la{' '}
              <a href='/politica-de-privacidad' className='text-accent'>
                política de privacidad
              </a>
            </span>
          </div>
          {errors.consent ? <ErrorMessage error={errors.consent} /> : null}

          <Button
            type='submit'
            disabled={isSubmitting}
            isLoading={isSubmitting}
            variant='primary'
            className='self-center !mx-0 md:self-start'
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </div>
        {submitStatus === 'error' ? (
          <div className='mt-2 rounded-lg border-2 border-ink-dark bg-gray-50 p-4 shadow-[4px_4px_0_0_#1a1a1a]'>
            <p className='font-medium text-gray-800'>
              Ha habido un error enviando tu mensaje
            </p>
            <p className='mt-1 text-sm text-gray-700'>
              Inténtalo de nuevo o escríbenos a hola@36web.es.
            </p>
          </div>
        ) : null}
        {isFormSent ? (
          <span className='text-lg font-bold text-black'>
            Tus datos han sido enviados correctamente. Nos pondremos en
            contacto en breve. ¡Gracias!
          </span>
        ) : null}
      </form>
    </div>
  );
};

export default MaintenanceLeadForm;
