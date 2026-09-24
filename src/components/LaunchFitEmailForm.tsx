import { useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Button from './Button';
import {
  isFormStartTypingEvent,
  trackFormError,
  trackFormStart,
  trackGa4FormSubmit,
  trackLandingPromo590FitSubmit,
} from '../utils/analytics';
import { ADS_LAUNCH_FIT_FORM_ORIGIN, FORM_CC_EMAIL } from '../config/contact';
import { getLaunchPriceAmountLabel } from '../config/launchOffer';

const emptyForm = () => ({
  email: '',
  sector: '',
  consent: false,
  newsletter: true,
});

const fieldClass = (hasError: boolean) =>
  `w-full text-xl md:text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white text-ink-dark caret-ink-dark focus:outline-none focus:border-accent transition-all duration-150 ${
    hasError
      ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
      : 'border-gray-400'
  }`;

const LaunchFitEmailForm = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');
  const [formData, setFormData] = useState(emptyForm);
  const hasStartedRef = useRef(false);
  const isSubmittingRef = useRef(false);

  const markFormStart = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackFormStart(ADS_LAUNCH_FIT_FORM_ORIGIN);
  };

  const handleTypedInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (isFormStartTypingEvent(event.nativeEvent)) markFormStart();
  };

  const sanitizeText = (text: string): string =>
    text
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');

  const handleInputChange = (field: 'email' | 'sector', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: sanitizeText(value) }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const emailValue = formData.email.trim();
    const sectorValue = formData.sector.trim();

    if (!emailValue || !validateEmail(emailValue)) {
      newErrors.email = 'Introduce un email válido';
    }
    if (sectorValue.length < 2) {
      newErrors.sector = 'Dinos tu sector o a qué te dedicas';
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
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const origen = ADS_LAUNCH_FIT_FORM_ORIGIN;
      const pagina = window.location.pathname;
      const email = formData.email.trim();
      const sector = formData.sector.trim();

      const response = await fetch('https://formspree.io/f/movlevkj', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          sector,
          origen,
          page: origen,
          pagina,
          lista: 'newsletter encaje 590',
          newsletter: formData.newsletter ? 'sí' : 'no',
          consent: formData.consent,
          submissionDate: new Date().toLocaleString('es-ES'),
          _subject: `[${origen}] ¿Encaja desde ${getLaunchPriceAmountLabel()}? — ${sector}`,
          _replyto: email,
          _cc: FORM_CC_EMAIL,
          message: `
Origen: ${origen}
Página: ${pagina}
Email: ${email}
Sector: ${sector}
Newsletter: ${formData.newsletter ? 'sí' : 'no'}
consent: ${formData.consent}
Fecha: ${new Date().toLocaleString('es-ES')}
          `,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || result.ok !== true) {
        throw new Error(
          result?.error ||
            result?.errors?.[0]?.message ||
            `Error ${response.status}: ${response.statusText}`,
        );
      }

      trackGa4FormSubmit(origen);
      trackLandingPromo590FitSubmit();
      setIsFormSent(true);
      setFormData(emptyForm());
      hasStartedRef.current = false;
    } catch (error) {
      console.error('Error al enviar formulario de encaje:', error);
      trackFormError('submit_failed');
      setSubmitStatus('error');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const ErrorMessage = ({ error }: { error: string }) => (
    <div className='mt-1 flex items-center gap-2 text-sm text-accent'>
      <AlertCircle className='h-4 w-4' />
      {error}
    </div>
  );

  return (
    <section id='encaje' className='page-section'>
      <div className='container mx-auto flex max-w-3xl flex-col gap-page-gap'>
        <div className='page-title-block mx-auto text-center'>
          <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            ¿Encaja desde {getLaunchPriceAmountLabel()}?
          </h2>
          <p className='text-xl text-ink-dark md:text-2xl'>
            Dinos tu sector. Te respondemos por email si cabe en esta oferta o
            va a medida. Sin llamada.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='w-full rounded-lg bg-surface-muted p-content-pad text-ink-dark shadow-xl'
          action=''
          noValidate
        >
          {isFormSent ? (
            <p className='text-center text-lg font-bold text-ink-dark md:text-xl'>
              Te escribo a ese email para decirte si entra. Revisa también spam.
            </p>
          ) : (
            <div className='flex flex-col gap-content-gap'>
              <div>
                <input
                  type='email'
                  value={formData.email}
                  onInput={handleTypedInput}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={fieldClass(Boolean(errors.email))}
                  autoComplete='email'
                  placeholder='Tu email *'
                  aria-label='Tu email'
                />
                {errors.email ? <ErrorMessage error={errors.email} /> : null}
              </div>
              <div>
                <input
                  type='text'
                  value={formData.sector}
                  onInput={handleTypedInput}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                  className={fieldClass(Boolean(errors.sector))}
                  placeholder='Tu sector (ej. clínica, reformas, sonido) *'
                  aria-label='Tu sector'
                  maxLength={80}
                />
                {errors.sector ? <ErrorMessage error={errors.sector} /> : null}
              </div>

              <label className='flex items-start gap-3 text-start text-md italic leading-relaxed text-gray-900 md:text-xl'>
                <input
                  type='checkbox'
                  checked={formData.newsletter}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      newsletter: e.target.checked,
                    }))
                  }
                  className='mt-1 h-6 w-6 flex-shrink-0 accent-accent md:h-7 md:w-7'
                />
                <span>
                  Quiero emails de 36web: si entra en la oferta, ejemplos y si
                  quedan plazas.
                </span>
              </label>

              <label className='flex items-start gap-3 text-start text-md italic leading-relaxed text-gray-900 md:text-xl'>
                <input
                  type='checkbox'
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
                  className='mt-1 h-6 w-6 flex-shrink-0 accent-accent md:h-7 md:w-7'
                />
                <span>
                  He leído y acepto la{' '}
                  <a
                    href='/politica-de-privacidad'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-accent'
                  >
                    política de privacidad
                  </a>
                  .
                </span>
              </label>
              {errors.consent ? <ErrorMessage error={errors.consent} /> : null}

              <Button
                type='submit'
                disabled={isSubmitting}
                isLoading={isSubmitting}
                variant='primary'
                className='!mx-0 mt-2 self-center md:self-start'
              >
                {isSubmitting ? 'Enviando...' : 'Dime si entra'}
              </Button>
            </div>
          )}

          {submitStatus === 'error' ? (
            <div className='mt-4 rounded-lg border-2 border-ink-dark bg-gray-50 p-4 shadow-[4px_4px_0_0_#1a1a1a]'>
              <p className='font-medium text-gray-800'>
                Ha habido un error enviando tu mensaje
              </p>
              <p className='mt-1 text-sm text-gray-700'>
                Inténtalo de nuevo o escríbenos a hola@36web.es.
              </p>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default LaunchFitEmailForm;
