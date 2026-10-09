import { useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Button from './Button';
import {
  trackFormError,
  isFormStartTypingEvent,
  trackFormStart,
  trackFormSubmit,
  trackGa4FormSubmit,
  trackGoogleAdsFormConversion,
  unlockGoogleAdsFormConversion,
} from '../utils/analytics';
import {
  BUSINESS_HOURS_LABEL,
  FORM_CC_EMAIL,
  FORM_THANKS_PATH,
} from '../config/contact';

const FORM_ORIGIN = 'Página de contacto';

const SERVICES = [
  'Diseño web',
  'Tienda online',
  'Aplicaciones',
  'Mantenimiento web',
  'No sé cuál necesito',
] as const;

const fieldClass = (hasError: boolean) =>
  `w-full text-lg md:text-xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white text-ink-dark caret-ink-dark focus:outline-none focus:border-accent transition-all duration-150 ${
    hasError
      ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
      : 'border-gray-400'
  }`;

const emptyForm = () => ({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  consent: false,
});

export default function ContactPageForm() {
  const fieldId = useId();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');
  const [formData, setFormData] = useState(emptyForm);
  const hasStartedRef = useRef(false);
  const isSubmittingRef = useRef(false);

  const markFormStart = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackFormStart(FORM_ORIGIN);
  };

  const handleTypedInput = (
    event: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (isFormStartTypingEvent(event.nativeEvent)) markFormStart();
  };

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
    if (!formData.email.trim() || !validateEmail(formData.email.trim())) {
      newErrors.email = 'Introduce un email válido';
    }
    if (!formData.phone.trim() || !validatePhone(formData.phone.trim())) {
      newErrors.phone = 'Introduce un teléfono válido';
    }
    if (!formData.service) {
      newErrors.service = 'Elige el servicio que te interesa';
    }
    const message = formData.message.trim();
    if (message.length < 10) {
      newErrors.message = 'Cuéntanos un poco más (mínimo 10 caracteres)';
    }
    if (message.length > 1000) {
      newErrors.message = 'El mensaje no puede superar los 1000 caracteres';
    }
    if (!formData.consent) {
      newErrors.consent = 'Acepta la política de privacidad';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    setSubmitStatus('idle');

    try {
      const pagina = window.location.pathname;
      const payload: Record<string, string | boolean> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        origen: FORM_ORIGIN,
        page: FORM_ORIGIN,
        pagina,
        consent: formData.consent,
        submissionDate: new Date().toLocaleString('es-ES'),
        _subject: `[${FORM_ORIGIN}] ${formData.service} — ${formData.name}`,
        _replyto: formData.email.trim(),
        _cc: FORM_CC_EMAIL,
        message: `
Origen: ${FORM_ORIGIN}
Página: ${pagina}
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Servicio: ${formData.service}

Mensaje:
${formData.message}

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
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result || result.ok !== true) {
        throw new Error(
          result?.error ||
            result?.errors?.[0]?.message ||
            `Error ${response.status}: ${response.statusText}`,
        );
      }

      trackFormSubmit(FORM_ORIGIN);
      trackGa4FormSubmit(FORM_ORIGIN);
      void trackGoogleAdsFormConversion({
        email: formData.email,
        phone: formData.phone,
      });
      navigate(FORM_THANKS_PATH);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      trackFormError('submit_failed');
      setSubmitStatus('error');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const ErrorMessage = ({ error }: { error: string }) => (
    <div className='flex items-center gap-2 text-accent text-sm mt-1'>
      <AlertCircle className='w-4 h-4' />
      {error}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full rounded-lg bg-surface-muted p-content-pad text-ink-dark shadow-xl'
      action=''
    >
      <div className='page-title-block text-center'>
        <h2 className='text-2xl font-extrabold text-black md:text-3xl'>
          Cuéntanos tu proyecto
        </h2>
        <span className='block text-sm font-extrabold uppercase tracking-wide text-accent'>
          {BUSINESS_HOURS_LABEL}
        </span>
        <p className='text-center text-base text-gray-900 md:text-lg'>
          Te respondemos con una propuesta. Precio y plazos por escrito.
        </p>
      </div>

      <div className='form-fields mt-5 flex flex-col gap-4'>
        <label htmlFor={`${fieldId}-name`} className='-mb-3 font-bold'>
          Nombre *
        </label>
        <input
          id={`${fieldId}-name`}
          name='name'
          type='text'
          value={formData.name}
          onInput={handleTypedInput}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={fieldClass(Boolean(errors.name))}
          placeholder='Nombre *'
          autoComplete='name'
          maxLength={50}
          required
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <ErrorMessage error={errors.name} /> : null}

        <label htmlFor={`${fieldId}-email`} className='-mb-3 font-bold'>
          Email *
        </label>
        <input
          id={`${fieldId}-email`}
          name='email'
          type='email'
          value={formData.email}
          onInput={handleTypedInput}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={fieldClass(Boolean(errors.email))}
          placeholder='Email *'
          autoComplete='email'
          required
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <ErrorMessage error={errors.email} /> : null}

        <label htmlFor={`${fieldId}-phone`} className='-mb-3 font-bold'>
          Teléfono *
        </label>
        <input
          id={`${fieldId}-phone`}
          name='phone'
          type='tel'
          value={formData.phone}
          onInput={handleTypedInput}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={fieldClass(Boolean(errors.phone))}
          placeholder='Teléfono *'
          autoComplete='tel'
          inputMode='tel'
          required
          aria-invalid={Boolean(errors.phone)}
        />
        {errors.phone ? <ErrorMessage error={errors.phone} /> : null}

        <label htmlFor={`${fieldId}-service`} className='-mb-3 font-bold'>
          Servicio que te interesa *
        </label>
        <select
          id={`${fieldId}-service`}
          name='service'
          value={formData.service}
          onInput={handleTypedInput}
          onChange={(e) => handleInputChange('service', e.target.value)}
          className={fieldClass(Boolean(errors.service))}
          required
          aria-invalid={Boolean(errors.service)}
        >
          <option value=''>Elige un servicio</option>
          {SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service ? <ErrorMessage error={errors.service} /> : null}

        <label htmlFor={`${fieldId}-message`} className='-mb-3 font-bold'>
          Cuéntanos qué necesitas *
        </label>
        <textarea
          id={`${fieldId}-message`}
          name='message'
          value={formData.message}
          onInput={handleTypedInput}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className={`${fieldClass(Boolean(errors.message))} min-h-[8rem] resize-y`}
          placeholder='Qué haces, qué necesitas y para cuándo...'
          maxLength={1000}
          required
          aria-invalid={Boolean(errors.message)}
        />
        <div className='-mt-2 flex justify-between gap-2'>
          {errors.message ? <ErrorMessage error={errors.message} /> : <span />}
          <span className='ml-auto text-sm text-ink-medium'>
            {formData.message.length}/1000
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <span className='relative -ml-2 -mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center text-neutral-300 md:ml-0 md:mt-0.5 md:h-5 md:w-5'>
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
              className='h-6 w-6 rounded border-2 border-ink-dark accent-accent md:h-12 md:w-12'
            />
          </span>
          <label
            htmlFor={`${fieldId}-consent`}
            className='text-md pt-2 text-start italic leading-relaxed text-gray-900 md:pt-0 md:text-xl'
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
        {errors.consent ? <ErrorMessage error={errors.consent} /> : null}

        <Button
          type='submit'
          disabled={isSubmitting}
          isLoading={isSubmitting}
          variant='primary'
          className='w-full self-center'
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </div>

      {submitStatus === 'error' ? (
        <div
          role='alert'
          className='mt-4 rounded-lg border-2 border-ink-dark bg-gray-50 p-4'
        >
          <p className='font-medium text-gray-800'>
            Ha habido un error enviando tu mensaje
          </p>
          <p className='mt-1 text-sm text-gray-700'>
            Hemos conservado tus datos. Inténtalo de nuevo o escríbenos a
            hola@36web.es.
          </p>
        </div>
      ) : null}
    </form>
  );
}
