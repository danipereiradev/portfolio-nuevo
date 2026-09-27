import { useId, useRef, useState } from 'react';
import Button from './Button';
import {
  trackFormError,
  isFormStartTypingEvent,
  trackFormStart,
  trackFormSubmit,
  trackGoogleAdsFormConversion,
  trackGa4FormSubmit,
  trackLandingPromo590FormSubmit,
  trackMaintenanceFormSubmit,
  unlockGoogleAdsFormConversion,
} from '../utils/analytics';
import {
  ADS_LAUNCH_FORM_ORIGIN,
  ADS_MAINTENANCE_FORM_FINAL,
  ADS_MAINTENANCE_FORM_HERO,
  BUSINESS_HOURS_LABEL,
  FORM_CC_EMAIL,
} from '../config/contact';
import { AlertCircle } from 'lucide-react';

const fieldClass = (hasError: boolean) =>
  `w-full text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white text-ink-dark caret-ink-dark focus:outline-none focus:border-accent transition-all duration-150 ${
    hasError
      ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
      : 'border-gray-400'
  }`;

const emptyForm = (page: string) => ({
  name: '',
  email: '',
  phone: '',
  consent: false,
  page,
});

interface ContactHeroFormHeroProps {
  title: string;
  description: string;
  page: string;
  id?: string;
  className?: string;
  submitLabel?: string;
  compactOnMobile?: boolean;
}

export const ContactFormHero = ({
  title,
  description,
  page,
  id,
  className = '',
  submitLabel = 'Pedir propuesta',
  compactOnMobile = false,
}: ContactHeroFormHeroProps) => {
  const fieldId = useId();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');
  const [formData, setFormData] = useState(() => emptyForm(page));
  const hasStartedRef = useRef(false);
  const isSubmittingRef = useRef(false);

  const markFormStart = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackFormStart(page);
  };

  const handleTypedInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (isFormStartTypingEvent(event.nativeEvent)) markFormStart();
  };

  const sanitizeText = (text: string): string => {
    return text
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
  };

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = sanitizeText(value);

    setFormData((prev) => ({
      ...prev,
      [field]: sanitizedValue,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmittingRef.current || isSubmitting) return;

    if (!validateForm()) {
      trackFormError('validation_error');
      return;
    }

    isSubmittingRef.current = true;
    unlockGoogleAdsFormConversion();
    setIsSubmitting(true);
    setIsFormSent(false);
    setSubmitStatus('idle');

    try {
      const formspreeEndpoint = 'https://formspree.io/f/movlevkj';

      const origen = page;
      const pagina = window.location.pathname;

      const formDataToSend: Record<string, string | boolean> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        origen,
        page: origen,
        pagina,
        consent: formData.consent,
        submissionDate: new Date().toLocaleString('es-ES'),
        _subject: `[${origen}] Nueva solicitud — ${formData.name}`,
        ...(formData.email.trim() ? { _replyto: formData.email.trim() } : {}),
        _cc: FORM_CC_EMAIL,
        message: `
Origen: ${origen}
Página: ${pagina}
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
consent: ${formData.consent}
Fecha: ${new Date().toLocaleString('es-ES')}
        `,
      };

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      const result = await response.json().catch(() => null);

      // Formspree confirma éxito con HTTP 2xx y { ok: true }.
      // Sin ambas condiciones no disparamos conversión.
      if (!response.ok || !result || result.ok !== true) {
        throw new Error(
          result?.error ||
            result?.errors?.[0]?.message ||
            `Error ${response.status}: ${response.statusText}`,
        );
      }
      // Orden: Formspree OK → GA4 form_submit → Ads → mensaje en la misma página
      trackFormSubmit(origen);
      trackGa4FormSubmit(origen);
      if (origen === ADS_LAUNCH_FORM_ORIGIN) {
        trackLandingPromo590FormSubmit();
      }
      if (
        origen === ADS_MAINTENANCE_FORM_HERO ||
        origen === ADS_MAINTENANCE_FORM_FINAL
      ) {
        trackMaintenanceFormSubmit(origen);
      }
      trackGoogleAdsFormConversion();
      setIsFormSent(true);
      setFormData(emptyForm(page));
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      trackFormError('submit_failed');
      setSubmitStatus('error');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const validatePhone = (value: string): boolean => {
    const cleanPhone = value.replace(/[\s\-().]/g, '');
    const spanishPhone = /^(?:\+34|0034|34)?[6789]\d{8}$/;
    const internationalPhone = /^\+[1-9]\d{7,14}$/;
    return spanishPhone.test(cleanPhone) || internationalPhone.test(cleanPhone);
  };

  const validateName = (name: string): boolean => {
    const trimmedName = name.trim();
    return (
      trimmedName.length >= 2 &&
      trimmedName.length <= 50 &&
      /\p{L}/u.test(trimmedName) &&
      !/[\p{Cc}<>]/u.test(trimmedName)
    );
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name || !validateName(formData.name)) {
      newErrors.name = 'Introduce tu nombre (entre 2 y 50 caracteres)';
    }

    const emailValue = formData.email.trim();
    const phoneValue = formData.phone.trim();

    if (emailValue && !validateEmail(emailValue)) {
      newErrors.email = 'Introduce un email válido';
    }
    if (!phoneValue || !validatePhone(phoneValue)) {
      newErrors.phone = 'Introduce un teléfono válido';
    }

    if (!formData.consent)
      newErrors.consent = 'Acepta la política de privacidad';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const ErrorMessage = ({ error }: { error: string }) => (
    <div className='flex items-center gap-2 text-accent text-sm mt-1'>
      <AlertCircle className='w-4 h-4' />
      {error}
    </div>
  );

  return (
    <div
      className={`z-10 flex w-full justify-center md:w-1/2 ${className}`.trim()}
    >
      <form
        id={id}
        onSubmit={handleSubmit}
        className='w-full rounded-lg bg-surface-muted p-content-pad text-ink-dark shadow-xl md:w-3/4'
        action=''
      >
        <div className='page-title-block text-center'>
          <h2 className='text-2xl font-extrabold text-black md:text-3xl lg:text-4xl'>
            {title}
          </h2>
          <span className='block text-sm font-extrabold uppercase tracking-wide text-accent'>
            {BUSINESS_HOURS_LABEL}
          </span>
          <p
            className={`text-center text-lg text-gray-900 ${
              compactOnMobile ? 'text-base md:text-lg' : ''
            }`}
          >
            {description}
          </p>
        </div>
        <div className='form-fields mt-5 flex flex-col gap-4'>
          <label
            htmlFor={`${fieldId}-name`}
            className='font-bold text-base -mb-3'
          >
            Nombre *
          </label>
          <input
            id={`${fieldId}-name`}
            name='name'
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${fieldId}-name-error` : undefined}
            type='text'
            value={formData.name}
            onInput={handleTypedInput}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={fieldClass(Boolean(errors.name))}
            placeholder='Nombre *'
            autoComplete='name'
            maxLength={50}
            required
          />
          {errors.name && (
            <div id={`${fieldId}-name-error`}>
              <ErrorMessage error={errors.name} />
            </div>
          )}
          <label
            htmlFor={`${fieldId}-email`}
            className='font-bold text-base -mb-3'
          >
            Email (opcional)
          </label>
          <input
            id={`${fieldId}-email`}
            name='email'
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? `${fieldId}-email-error` : undefined
            }
            type='email'
            value={formData.email}
            onInput={handleTypedInput}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={fieldClass(Boolean(errors.email))}
            autoComplete='email'
            placeholder='Email'
          />
          {errors.email && (
            <div id={`${fieldId}-email-error`}>
              <ErrorMessage error={errors.email} />
            </div>
          )}
          <label
            htmlFor={`${fieldId}-phone`}
            className='font-bold text-base -mb-3'
          >
            Teléfono *
          </label>
          <input
            id={`${fieldId}-phone`}
            name='phone'
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={
              errors.phone ? `${fieldId}-phone-error` : undefined
            }
            type='tel'
            value={formData.phone}
            onInput={handleTypedInput}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={fieldClass(Boolean(errors.phone))}
            placeholder='Teléfono *'
            autoComplete='tel'
            inputMode='tel'
            required
          />
          {errors.phone && (
            <div id={`${fieldId}-phone-error`}>
              <ErrorMessage error={errors.phone} />
            </div>
          )}

          <div className='flex items-center gap-2'>
            <span className='relative flex-shrink-0 text-neutral-300 flex items-center justify-center w-11 h-11 -ml-2 -mt-1 md:w-5 md:h-5 md:ml-0 md:mt-0.5'>
              <input
                id={`${fieldId}-consent`}
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
                className='w-6 h-6 md:w-12 md:h-12 accent-accent border-2 border-ink-dark rounded'
              />
            </span>
            <label
              htmlFor={`${fieldId}-consent`}
              className='text-md md:text-xl italic text-gray-900 leading-relaxed pt-2 md:pt-0 text-start'
            >
              He leído y acepto la{' '}
              <a
                href='/politica-de-privacidad'
                target='_blank'
                rel='noopener noreferrer'
                className='text-accent'
              >
                política de privacidad
              </a>
            </label>
          </div>
          {errors.consent && <ErrorMessage error={errors.consent} />}

          <Button
            type='submit'
            disabled={isSubmitting}
            isLoading={isSubmitting}
            variant='primary'
            className='self-center w-full'
          >
            {isSubmitting ? 'Enviando...' : submitLabel}
          </Button>
        </div>
        {submitStatus === 'error' && (
          <div
            role='alert'
            className='mt-2 p-4 bg-gray-50 border-2 border-ink-dark rounded-lg shadow-[4px_4px_0_0_#1a1a1a]'
          >
            <div className='flex items-center gap-2 text-gray-800'>
              <p className='font-medium'>
                Ha habido un error enviando tu mensaje
              </p>
            </div>
            <p className='text-gray-700 text-sm mt-1'>
              Hemos conservado tus datos. Inténtalo de nuevo o contáctanos por
              email: hola@36web.es. Disculpa las molestias.
            </p>
          </div>
        )}
        {isFormSent && (
          <span
            role='status'
            aria-live='polite'
            className='block mt-4 text-black font-bold text-lg'
          >
            Tus datos han sido enviados correctamente. Nos pondremos en contacto
            en breve. ¡Gracias!
          </span>
        )}
      </form>
    </div>
  );
};
