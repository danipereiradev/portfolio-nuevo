import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AlertCircle, X } from 'lucide-react';
import Button from './Button';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import {
  ADS_LAUNCH_EXIT_FORM_ORIGIN,
  FORM_CC_EMAIL,
} from '../config/contact';
import {
  isFormStartTypingEvent,
  trackExitPopupSubmit,
  trackExitPopupView,
  trackFormError,
  trackFormStart,
  trackFormSubmit,
  trackGa4FormSubmit,
  trackGoogleAdsFormConversion,
  unlockGoogleAdsFormConversion,
} from '../utils/analytics';

const STORAGE_KEY = 'launch-exit-popup-seen';
const MOBILE_DELAY_MS = 30_000;
const EXIT_ARM_MS = 1_500;
const MOBILE_QUERY = '(max-width: 767px)';

const fieldClass = (hasError: boolean) =>
  `w-full text-xl md:text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white text-ink-dark caret-ink-dark focus:outline-none focus:border-accent transition-all duration-150 ${
    hasError
      ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
      : 'border-gray-400'
  }`;

const hasSeenPopup = (): boolean => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

const markPopupSeen = (): void => {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // Safari privado / sin almacenamiento.
  }
};

const isMobileViewport = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;

const validatePhone = (value: string): boolean => {
  const cleanPhone = value.replace(/[\s\-().]/g, '');
  const spanishPhone = /^(?:\+34|0034|34)?[6789]\d{8}$/;
  const internationalPhone = /^\+[1-9]\d{7,14}$/;
  return spanishPhone.test(cleanPhone) || internationalPhone.test(cleanPhone);
};

const LaunchExitPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; consent?: string }>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');
  const hasStartedRef = useRef(false);
  const isSubmittingRef = useRef(false);
  const openedRef = useRef(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useBodyScrollLock(isOpen);

  const openPopup = () => {
    if (openedRef.current || hasSeenPopup()) return;
    openedRef.current = true;
    markPopupSeen();
    setIsOpen(true);
    trackExitPopupView();
  };

  const closePopup = () => {
    markPopupSeen();
    setIsOpen(false);
  };

  useEffect(() => {
    if (hasSeenPopup()) return undefined;

    let armed = false;
    let armTimer: number | undefined;
    let mobileTimer: number | undefined;

    const onMouseOut = (event: MouseEvent) => {
      if (!armed || isMobileViewport()) return;
      if (event.clientY > 8) return;
      if (
        event.relatedTarget instanceof Node &&
        document.documentElement.contains(event.relatedTarget)
      ) {
        return;
      }
      openPopup();
    };

    armTimer = window.setTimeout(() => {
      armed = true;
    }, EXIT_ARM_MS);

    if (isMobileViewport()) {
      mobileTimer = window.setTimeout(openPopup, MOBILE_DELAY_MS);
    } else {
      document.documentElement.addEventListener('mouseout', onMouseOut);
    }

    return () => {
      if (armTimer) window.clearTimeout(armTimer);
      if (mobileTimer) window.clearTimeout(mobileTimer);
      document.documentElement.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePopup();
    };
    document.addEventListener('keydown', onKeyDown);
    phoneInputRef.current?.focus();

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const markFormStart = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackFormStart(ADS_LAUNCH_EXIT_FORM_ORIGIN);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmittingRef.current || isSubmitting) return;

    const newErrors: { phone?: string; consent?: string } = {};
    const phoneValue = phone.trim();
    if (!phoneValue || !validatePhone(phoneValue)) {
      newErrors.phone = 'Introduce un teléfono válido';
    }
    if (!consent) {
      newErrors.consent = 'Acepta la política de privacidad';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      trackFormError('validation_error');
      return;
    }

    isSubmittingRef.current = true;
    unlockGoogleAdsFormConversion();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const origen = ADS_LAUNCH_EXIT_FORM_ORIGIN;
      const pagina = window.location.pathname;

      const response = await fetch('https://formspree.io/f/movlevkj', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneValue,
          origen,
          page: origen,
          pagina,
          consent,
          submissionDate: new Date().toLocaleString('es-ES'),
          _subject: `[${origen}] Llamada urgente — ${phoneValue}`,
          _cc: FORM_CC_EMAIL,
          message: `
Origen: ${origen}
Página: ${pagina}
Teléfono: ${phoneValue}
consent: ${consent}
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

      trackFormSubmit(origen);
      trackGa4FormSubmit(origen);
      trackExitPopupSubmit();
      trackGoogleAdsFormConversion();
      setIsFormSent(true);
      setPhone('');
      setConsent(false);
    } catch (error) {
      console.error('Error al enviar popup de salida:', error);
      trackFormError('submit_failed');
      setSubmitStatus('error');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-[10000] flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby='launch-exit-title'
      onClick={closePopup}
    >
      <div className='absolute inset-0 bg-black/70 backdrop-blur-sm' />
      <div
        className='relative w-full max-w-lg overflow-y-auto rounded-lg border-2 border-ink-dark bg-white p-6 shadow-[8px_8px_0_0_#1a1a1a] md:p-8'
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type='button'
          onClick={closePopup}
          className='absolute right-4 top-4 rounded-full border-2 border-ink-dark bg-white p-2 shadow-[3px_3px_0_0_#1a1a1a] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#1a1a1a]'
          aria-label='Cerrar'
        >
          <X className='h-5 w-5 text-ink-dark' />
        </button>

        {isFormSent ? (
          <p className='pr-10 text-lg font-extrabold text-ink-dark md:text-xl'>
            Te llamamos en cinco minutos. Gracias.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='page-title-block pr-10 text-left'>
              <h2
                id='launch-exit-title'
                className='text-2xl font-extrabold text-ink-dark md:text-3xl'
              >
                👋 ¡Espera! No te vayas con dudas sobre tu negocio.
              </h2>
              <p className='text-base text-ink-dark md:text-lg'>
                ¿No sabes si esta web incluye lo que necesitas o si tu sector
                requiere algo más complejo? Déjanos tu teléfono. Te llamamos en
                5 minutos, resolvemos tus dudas en un minuto y no te vendemos
                nada. Sin presiones.
              </p>
            </div>

            <input
              ref={phoneInputRef}
              type='tel'
              value={phone}
              onInput={(event) => {
                if (isFormStartTypingEvent(event.nativeEvent)) markFormStart();
              }}
              onChange={(event) => {
                setPhone(event.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              className={fieldClass(Boolean(errors.phone))}
              placeholder='Tu teléfono *'
              autoComplete='tel'
              inputMode='tel'
              required
            />
            {errors.phone ? (
              <div className='-mt-2 flex items-center gap-2 text-sm text-accent'>
                <AlertCircle className='h-4 w-4' />
                {errors.phone}
              </div>
            ) : null}

            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                required
                checked={consent}
                onChange={(event) => {
                  setConsent(event.target.checked);
                  if (errors.consent) {
                    setErrors((prev) => ({ ...prev, consent: '' }));
                  }
                }}
                className='h-6 w-6 rounded border-2 border-ink-dark accent-accent md:h-5 md:w-5'
              />
              <span className='text-sm italic leading-relaxed text-gray-900 md:text-base'>
                He leido y acepto la{' '}
                <a
                  href='/politica-de-privacidad'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-accent'
                >
                  política de privacidad
                </a>
              </span>
            </div>

            <Button
              type='submit'
              disabled={isSubmitting}
              isLoading={isSubmitting}
              variant='primary'
              className='mt-1 self-center'
            >
              {isSubmitting ? 'Enviando...' : 'Quiero que me llaméis'}
            </Button>

            {submitStatus === 'error' ? (
              <p className='text-sm text-ink-dark'>
                Ha habido un error. Inténtalo de nuevo o llámanos al 644 665
                352.
              </p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
};

export default LaunchExitPopup;
