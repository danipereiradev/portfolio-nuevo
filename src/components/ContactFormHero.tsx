import { useState } from 'react';
import Button from './Button';
import {
  trackFormError,
  trackGoogleAdsFormConversion,
  unlockGoogleAdsFormConversion,
} from '../utils/analytics';
import { BUSINESS_HOURS_LABEL, FORM_CC_EMAIL } from '../config/contact';
import { AlertCircle } from 'lucide-react';
import TestimonialsSingle from './TestimonialSingle';

const PROJECT_TYPES = [
  'Web nueva',
  'Rediseñar la que ya tengo',
  'Tienda online',
  'Aplicación movil',
  'Mantenimiento web',
  'Todavía no lo tengo claro',
] as const;

const emptyForm = (page: string) => ({
  name: '',
  email: '',
  phone: '',
  projectType: '',
  consent: false,
  page,
});

interface ContactHeroFormHeroProps {
  title: string;
  description: string;
  page: string;
  id?: string;
  className?: string;
  showProjectType?: boolean;
  showEmail?: boolean;
  projectTypes?: readonly string[];
}

export const ContactFormHero = ({
  title,
  description,
  page,
  id,
  className = '',
  showProjectType = false,
  showEmail = false,
  projectTypes = PROJECT_TYPES,
}: ContactHeroFormHeroProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');
  const [formData, setFormData] = useState(() => emptyForm(page));

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

    if (isSubmitting) return;

    if (!validateForm()) {
      trackFormError('validation_error');
      return;
    }

    unlockGoogleAdsFormConversion();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formspreeEndpoint = 'https://formspree.io/f/movlevkj';

      const origen = page;
      const pagina = window.location.pathname;

      const formDataToSend: Record<string, string | boolean> = {
        name: formData.name,
        phone: formData.phone,
        origen,
        page: origen,
        pagina,
        consent: formData.consent,

        submissionDate: new Date().toLocaleString('es-ES'),
        _subject: `[${origen}] Nueva solicitud — ${formData.name}`,
        _cc: FORM_CC_EMAIL,
        message: `
Origen: ${origen}
Página: ${pagina}
Nombre: ${formData.name}
${showEmail ? `Email: ${formData.email}\n` : ''}Teléfono: ${formData.phone}
${showProjectType ? `Qué necesita: ${formData.projectType}\n` : ''}consent: ${formData.consent}
Fecha: ${new Date().toLocaleString('es-ES')}
        `,
      };

      if (showEmail) {
        formDataToSend.email = formData.email;
        formDataToSend._replyto = formData.email;
      }

      if (showProjectType) {
        formDataToSend.projectType = formData.projectType;
      }

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
      // Orden: Formspree OK , mostramos mensaje de agradecimiento y nos quedamos en la página

      trackGoogleAdsFormConversion();
      setIsFormSent(true);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      trackFormError('submit_failed');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsFormSent(false);
      }, 10000);

      setFormData(emptyForm(page));
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
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    return nameRegex.test(trimmedName) && trimmedName.length >= 2;
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name || !validateName(formData.name)) {
      newErrors.name =
        'El nombre debe contener solo letras y tener entre 2-50 caracteres';
    }

    if (showEmail) {
      const emailValue = formData.email.trim();
      if (!emailValue || !validateEmail(emailValue)) {
        newErrors.email = 'Introduce un email válido';
      }
    }

    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      newErrors.phone = 'Introduce un teléfono válido';
    }

    if (showProjectType && !formData.projectType) {
      newErrors.projectType = 'Elige qué necesitas';
    }

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
    <div className={`z-10 flex w-full justify-center md:w-1/2 ${className}`.trim()}>
      <form
        id={id}
        onSubmit={handleSubmit}
        className={`w-full rounded-lg bg-surface-muted p-content-pad shadow-xl md:w-3/4 ${
          id ? 'scroll-mt-[calc(var(--site-header-h)+1rem)]' : ''
        }`}
        action=''
      >
        <div className='page-title-block text-center'>
          <h2 className='text-2xl font-extrabold text-black md:text-3xl lg:text-4xl'>
            {title}
          </h2>
          <span className='block text-sm font-extrabold uppercase tracking-wide text-accent'>
            {BUSINESS_HOURS_LABEL}
          </span>
          <p className='text-center text-lg text-gray-900'>{description}</p>
        </div>
        <div className='form-fields mt-page-gap flex flex-col gap-content-gap'>
          <input
            type='text'
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent transition-all duration-150 ${
              errors.name
                ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
                : 'border-gray-400'
            }`}
            placeholder='Tu nombre *'
            maxLength={50}
          />
          {errors.name && <ErrorMessage error={errors.name} />}
          {showEmail ? (
            <>
              <input
                type='email'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent transition-all duration-150 ${
                  errors.email
                    ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
                    : 'border-gray-400'
                }`}
                autoComplete='email'
                placeholder='Tu email *'
              />
              {errors.email && <ErrorMessage error={errors.email} />}
            </>
          ) : null}
          <input
            type='tel'
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent transition-all duration-150 ${
              errors.phone
                ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
                : 'border-gray-400'
            }`}
            placeholder='Tu teléfono *'
            autoComplete='tel'
            inputMode='tel'
          />
          {errors.phone && <ErrorMessage error={errors.phone} />}
          {showProjectType ? (
            <>
              <select
                value={formData.projectType}
                onChange={(e) =>
                  handleInputChange('projectType', e.target.value)
                }
                aria-label='Qué necesitas'
                required
                className={`w-full border-2 rounded-lg bg-white py-3 pl-4 pr-4 text-xl transition-all duration-150 focus:outline-none focus:border-accent md:text-2xl ${
                  errors.projectType
                    ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
                    : 'border-gray-400'
                } ${formData.projectType ? 'text-ink-dark' : 'text-gray-400'}`}
              >
                <option value=''>¿Qué necesitas?</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <ErrorMessage error={errors.projectType} />
              )}
            </>
          ) : null}

          <div className='flex items-center gap-2'>
            <span className='relative flex-shrink-0 text-neutral-300 flex items-center justify-center w-11 h-11 -ml-2 -mt-1 md:w-5 md:h-5 md:ml-0 md:mt-0.5'>
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
                className='w-6 h-6 md:w-12 md:h-12 accent-accent border-2 border-ink-dark rounded'
              />
            </span>
            <span className='text-md md:text-xl italic text-gray-900 leading-relaxed pt-2 md:pt-0 text-start'>
              He leido y acepto la{' '}
              <a href='/politica-de-privacidad' className='text-accent'>
                política de privacidad
              </a>
            </span>
          </div>

          <Button
            type='submit'
            disabled={isSubmitting}
            isLoading={isSubmitting}
            variant='primary'
            className='self-center !mx-0 md:self-start'
          >
            {isSubmitting ? 'Enviando...' : 'Pedir propuesta'}
          </Button>

          <TestimonialsSingle />
        </div>
        {submitStatus === 'error' && (
          <div className='mt-2 p-4 bg-gray-50 border-2 border-ink-dark rounded-lg shadow-[4px_4px_0_0_#1a1a1a]'>
            <div className='flex items-center gap-2 text-gray-800'>
              <p className='font-medium'>
                Ha habido un error enviando tu mensaje
              </p>
            </div>
            <p className='text-gray-700 text-sm mt-1'>
              Por favor, inténtalo de nuevo o contáctanos directamente por
              email: hola@36web.es. Disculpa las molestias.
            </p>
          </div>
        )}
        {isFormSent && (
          <span className='text-black font-bold text-lg'>
            Tus datos han sido enviados correctamente. Nos pondremos en contacto
            en breve. ¡Gracias!
          </span>
        )}
      </form>
    </div>
  );
};
