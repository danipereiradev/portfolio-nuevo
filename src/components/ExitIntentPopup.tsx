import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertCircle, Calendar, Check, Mail, User, X } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { trackFormError, trackGuideSubscribe } from '../utils/analytics';
import Button from './Button';

const STORAGE_KEY = 'exit-intent-guide-claimed';
const SUBSCRIBE_ENDPOINT = '/.netlify/functions/subscribe';
const DESKTOP_MIN_TIME_MS = 30000;
const MOBILE_MIN_TIME_MS = 8000;
const CALENDLY_URL =
  'https://calendly.com/hola-pereiraweb/sesion-gratuita-pereiraweb';

// Secciones de precios en las distintas landings.
const PRICING_SECTION_IDS = ['packs', 'pricing', 'precios', 'planes'];

const isMobileViewport = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 767px)').matches;

const findPricingSection = () => {
  for (const id of PRICING_SECTION_IDS) {
    const el = document.getElementById(id);
    if (el) return el;
  }
  return null;
};

const ExitIntentPopup = () => {
  const { pathname } = useLocation();
  const { isOpen: isContactModalOpen } = useContactModal();

  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [desktopReady, setDesktopReady] = useState(false);
  const [mobileReady, setMobileReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consent: false,
  });

  const isExcludedPage =
    pathname === '/gracias' ||
    pathname === '/contacto' ||
    pathname === '/web-start' ||
    pathname === '/web-start/' ||
    pathname === '/politica-de-privacidad' ||
    pathname === '/terminos-y-condiciones' ||
    pathname === '/politica-de-cookies' ||
    pathname === '/aviso-legal';

  const hasTriggeredRef = useRef(false);
  const isOpenRef = useRef(false);
  const isContactModalOpenRef = useRef(isContactModalOpen);
  const isExcludedPageRef = useRef(isExcludedPage);

  useBodyScrollLock(isOpen);

  const benefits = [
    'Qué tipo de web necesitas realmente.',
    'Qué debe incluir.',
    'Cómo evitar gastar de más.',
    'Qué preguntar antes de contratar.',
  ];

  // Solo se persiste si el usuario ya pidió/descargó la guía.
  const markGuideClaimed = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // localStorage puede fallar en modo privado estricto
    }
  }, []);

  const hasClaimedGuide = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    hasTriggeredRef.current = hasTriggered;
  }, [hasTriggered]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    isContactModalOpenRef.current = isContactModalOpen;
  }, [isContactModalOpen]);

  useEffect(() => {
    isExcludedPageRef.current = isExcludedPage;
  }, [isExcludedPage]);

  const openPopup = useCallback(() => {
    if (
      hasTriggeredRef.current ||
      isOpenRef.current ||
      isExcludedPageRef.current ||
      isContactModalOpenRef.current ||
      hasClaimedGuide()
    ) {
      return;
    }

    hasTriggeredRef.current = true;
    setHasTriggered(true);
    setIsOpen(true);
  }, [hasClaimedGuide]);

  const closePopup = useCallback(() => {
    // Solo cerramos. Sin localStorage: en la siguiente carga de página
    // podrá volver a mostrarse si aún no reclamó la guía.
    setIsOpen(false);
  }, []);

  // Tiempos mínimos distintos en desktop / móvil.
  useEffect(() => {
    if (isExcludedPage || hasClaimedGuide()) return;

    setDesktopReady(false);
    setMobileReady(false);

    const desktopTimer = window.setTimeout(() => {
      setDesktopReady(true);
    }, DESKTOP_MIN_TIME_MS);

    const mobileTimer = window.setTimeout(() => {
      setMobileReady(true);
    }, MOBILE_MIN_TIME_MS);

    return () => {
      window.clearTimeout(desktopTimer);
      window.clearTimeout(mobileTimer);
    };
  }, [isExcludedPage, hasClaimedGuide, pathname]);

  // Desktop: exit-intent (cursor sale por arriba) tras 30 s.
  useEffect(() => {
    if (!desktopReady || isExcludedPage || isMobileViewport()) return;

    const handleMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget !== null) return;
      if (e.clientY > 0) return;
      openPopup();
    };

    document.addEventListener('mouseout', handleMouseOut);
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, [desktopReady, isExcludedPage, openPopup]);

  // Móvil: al llegar a la sección de precios (mejor momento de conversión).
  useEffect(() => {
    if (!mobileReady || isExcludedPage || !isMobileViewport()) return;

    let observer: IntersectionObserver | null = null;
    let retryId: number | undefined;
    let attempts = 0;

    const attachScrollFallback = () => {
      const onScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight <= 0 ? 1 : scrollTop / docHeight;
        if (progress >= 0.55) {
          openPopup();
          window.removeEventListener('scroll', onScroll);
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    };

    let detachFallback: (() => void) | undefined;

    const attachObserver = () => {
      const section = findPricingSection();
      if (!section) {
        attempts += 1;
        if (attempts < 8) {
          retryId = window.setTimeout(attachObserver, 400);
          return;
        }
        // Páginas sin bloque de precios: fallback por scroll.
        detachFallback = attachScrollFallback();
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
              openPopup();
              observer?.disconnect();
              return;
            }
          }
        },
        { threshold: [0.2, 0.35, 0.5] },
      );

      observer.observe(section);

      const rect = section.getBoundingClientRect();
      const alreadyVisible =
        rect.top < window.innerHeight * 0.85 &&
        rect.bottom > window.innerHeight * 0.15;
      if (alreadyVisible) {
        openPopup();
      }
    };

    attachObserver();

    return () => {
      if (retryId) window.clearTimeout(retryId);
      observer?.disconnect();
      detachFallback?.();
    };
  }, [mobileReady, isExcludedPage, openPopup, pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closePopup]);

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const validateName = (name: string): boolean => {
    const trimmedName = name.trim();
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    return nameRegex.test(trimmedName) && trimmedName.length >= 2;
  };

  const sanitizeText = (text: string): string => {
    return text
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
  };

  const handleInputChange = (field: 'name' | 'email', value: string) => {
    const sanitizedValue = sanitizeText(value);
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name || !validateName(formData.name)) {
      newErrors.name =
        'El nombre debe contener solo letras y tener entre 2-50 caracteres';
    }

    if (!formData.email || !validateEmail(formData.email.trim())) {
      newErrors.email = 'Introduce un email válido';
    }

    if (!formData.consent) {
      newErrors.consent = 'Debes marcar la casilla para recibir la guía';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      trackFormError('validation_error', 'Exit Intent');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          consent: true,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(
          result.error || `Error ${response.status}: ${response.statusText}`,
        );
      }

      // No usar trackFormSubmit: dispararía conversión Ads de contacto.
      trackGuideSubscribe('exit_intent_popup');
      markGuideClaimed();
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error al enviar formulario exit intent:', error);
      trackFormError('submit_failed', 'Exit Intent');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className='fixed inset-0 z-[9999] flex items-center justify-center p-4'
        onClick={closePopup}
        role='dialog'
        aria-modal='true'
        aria-labelledby='exit-intent-title'
      >
        <div className='absolute inset-0 bg-black/70 backdrop-blur-sm' />

        <div
          className='relative bg-white rounded-lg border-2 border-ink-dark shadow-[8px_8px_0_0_#1a1a1a] w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain animate-fade-in'
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closePopup}
            className='absolute top-4 right-4 z-10 p-2 bg-white border-2 border-ink-dark rounded-full shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            aria-label='Cerrar'
          >
            <X className='w-5 h-5 text-gray-700' />
          </button>

          <div className='p-6 md:p-8'>
            {submitStatus === 'success' ? (
              <div className='text-center pr-8'>
                <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink-dark bg-accent/10 shadow-[3px_3px_0_0_#1a1a1a]'>
                  <Check className='h-7 w-7 text-accent' />
                </div>
                <h2
                  id='exit-intent-title'
                  className='text-2xl md:text-3xl font-extrabold text-gray-900 mb-3'
                >
                  ¡Perfecto!
                </h2>
                <p className='text-lg font-semibold text-gray-800 mb-4'>
                  Acabamos de enviarte la guía.
                </p>
                <p className='text-base text-gray-600 leading-relaxed mb-8'>
                  Mientras la recibes, si prefieres hablar directamente sobre tu
                  proyecto, puedes reservar una sesión gratuita de 20 minutos.
                </p>
                <Button
                  href={CALENDLY_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='primary'
                  fullWidth
                  className='px-8 py-3 text-base'
                >
                  Reservar sesión
                  <Calendar className='w-4 h-4' />
                </Button>
              </div>
            ) : (
              <>
                <div className='mb-6 pr-8'>
                  <p className='text-sm font-bold text-accent mb-2'>
                    Antes de irte...
                  </p>
                  <h2
                    id='exit-intent-title'
                    className='text-2xl md:text-3xl font-extrabold text-gray-900 mb-3'
                  >
                    Crea la web que tu negocio necesita.
                  </h2>
                  <p className='text-base text-gray-600 leading-relaxed'>
                    Descarga gratis una guía práctica para evitar errores,
                    ahorrar dinero y saber exactamente qué necesita tu negocio
                    antes de pedir presupuesto.
                  </p>
                </div>

                <ul className='space-y-2.5 mb-6'>
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className='flex items-start gap-2.5 text-sm md:text-base text-gray-800'
                    >
                      <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleSubmit} className='space-y-5'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Nombre *
                    </label>
                    <div className='relative'>
                      <User className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                      <input
                        type='text'
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150 ${
                          errors.name
                            ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                            : 'border-ink-dark'
                        }`}
                        placeholder='Tu nombre'
                        maxLength={50}
                        autoComplete='name'
                      />
                    </div>
                    {errors.name && (
                      <div className='flex items-center gap-2 text-accent text-sm mt-1'>
                        <AlertCircle className='w-4 h-4' />
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email *
                    </label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                      <input
                        type='email'
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150 ${
                          errors.email
                            ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                            : 'border-ink-dark'
                        }`}
                        placeholder='tu@email.com'
                        autoComplete='email'
                      />
                    </div>
                    {errors.email && (
                      <div className='flex items-center gap-2 text-accent text-sm mt-1'>
                        <AlertCircle className='w-4 h-4' />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className='flex items-start gap-3 cursor-pointer'>
                      <span className='relative flex-shrink-0 mt-0.5 flex items-center justify-center w-11 h-11 -ml-2 -mt-1 md:w-5 md:h-5 md:ml-0 md:mt-0.5'>
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
                          className='w-6 h-6 md:w-4 md:h-4 accent-accent border-2 border-ink-dark rounded'
                        />
                      </span>
                      <span className='text-sm text-gray-600 leading-relaxed pt-2 md:pt-0'>
                        Quiero recibir la guía y consejos relacionados con la
                        creación de páginas web.{' '}
                        <b>Puedo darme de baja cuando quiera.</b>
                      </span>
                    </label>
                    {errors.consent && (
                      <div className='flex items-center gap-2 text-accent text-sm mt-1'>
                        <AlertCircle className='w-4 h-4' />
                        {errors.consent}
                      </div>
                    )}
                  </div>

                  <div className='pt-1'>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                      variant='primary'
                      fullWidth
                      className='px-8 py-3 text-base'
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviarme la guía gratis'}
                      {!isSubmitting && <Check className='w-4 h-4' />}
                    </Button>
                  </div>

                  {submitStatus === 'error' && (
                    <div className='p-4 bg-gray-50 border-2 border-ink-dark rounded-lg shadow-[4px_4px_0_0_#1a1a1a]'>
                      <div className='flex items-center gap-2 text-gray-800'>
                        <AlertCircle className='w-5 h-5' />
                        <p className='font-medium'>Error al enviar</p>
                      </div>
                      <p className='text-gray-700 text-sm mt-1'>
                        Inténtalo de nuevo o escríbenos a hola@pereiraweb.es
                      </p>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExitIntentPopup;
