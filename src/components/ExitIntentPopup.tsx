import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertCircle, Calendar, Check, Mail, User, X } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import {
  trackFormError,
  trackGuideSubscribe,
  trackExitIntentPopupView,
  trackExitIntentPopupClose,
  trackExitIntentPopupSubmit,
  trackExitIntentPopupCalendlyClick,
  trackExitIntentPopupNotShown,
  trackExitIntentPopupNotInterested,
  markPageEngagementStart,
  getExitIntentEngagementParams,
  type ExitIntentTrigger,
  type ExitIntentCloseMethod,
  type ExitIntentNotShownReason,
} from '../utils/analytics';
import Button from './Button';

const STORAGE_CLAIMED = 'exit-intent-guide-claimed';
const STORAGE_NOT_INTERESTED = 'exit-intent-not-interested';
const STORAGE_DISMISS_UNTIL = 'exit-intent-dismissed-until';
/** Dedup de popup_not_shown entre recargas (el sitio navega con <a> full reload). */
const STORAGE_NOT_SHOWN_REPORTED = 'exit-intent-not-shown-reported';
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 días
const SUBSCRIBE_ENDPOINT = '/.netlify/functions/subscribe';

/** Desktop: exit-intent activo a partir de aquí. */
const DESKTOP_EXIT_MIN_MS = 15000;
/** Desktop: si no hubo exit-intent, se muestra igual. */
const DESKTOP_GUARANTEED_MS = 30000;
/** Móvil: puede mostrarse por precios/scroll a partir de aquí. */
const MOBILE_EARLY_MS = 8000;
/** Móvil: si no llegó a precios/scroll, se muestra igual. */
const MOBILE_GUARANTEED_MS = 18000;

const CALENDLY_URL =
  'https://calendly.com/hola-pereiraweb/sesion-gratuita-pereiraweb';

const PRICING_SECTION_IDS = ['packs', 'pricing', 'precios', 'planes'];

const EXCLUDED_PATHS = new Set([
  '/gracias',
  '/contacto',
  '/condiciones-del-proyecto',
  '/preguntas-frecuentes',
  '/politica-de-privacidad',
  '/terminos-y-condiciones',
  '/politica-de-cookies',
  '/aviso-legal',
]);

const normalizePath = (pathname: string) =>
  pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;

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

const readNotShownReported = (): Set<ExitIntentNotShownReason> => {
  try {
    const raw = sessionStorage.getItem(STORAGE_NOT_SHOWN_REPORTED);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed as ExitIntentNotShownReason[]);
  } catch {
    return new Set();
  }
};

const persistNotShownReported = (reasons: Set<ExitIntentNotShownReason>) => {
  try {
    sessionStorage.setItem(
      STORAGE_NOT_SHOWN_REPORTED,
      JSON.stringify([...reasons]),
    );
  } catch {
    // ignore
  }
};

const ExitIntentPopup = () => {
  const { pathname } = useLocation();
  const { isOpen: isContactModalOpen } = useContactModal();
  const normalizedPath = normalizePath(pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
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

  const isExcludedPage = EXCLUDED_PATHS.has(normalizedPath);

  const hasTriggeredRef = useRef(false);
  const isOpenRef = useRef(false);
  const isContactModalOpenRef = useRef(isContactModalOpen);
  const isExcludedPageRef = useRef(isExcludedPage);
  const pendingOpenRef = useRef(false);
  const pendingTriggerRef = useRef<ExitIntentTrigger | null>(null);
  const desktopExitReadyRef = useRef(false);
  const triggerRef = useRef<ExitIntentTrigger | null>(null);
  const submitStatusRef = useRef(submitStatus);
  /** Evita spam de popup_not_shown (una vez por razón y pestaña/sesión). */
  const notShownReportedRef = useRef<Set<ExitIntentNotShownReason>>(
    readNotShownReported(),
  );

  useBodyScrollLock(isOpen);

  useEffect(() => {
    submitStatusRef.current = submitStatus;
  }, [submitStatus]);

  const reportNotShown = useCallback(
    (reason: ExitIntentNotShownReason, trigger?: ExitIntentTrigger) => {
      // Releer sessionStorage: el ref solo no basta con full page reload.
      const reported = readNotShownReported();
      if (reported.has(reason) || notShownReportedRef.current.has(reason)) {
        return;
      }
      reported.add(reason);
      notShownReportedRef.current = reported;
      persistNotShownReported(reported);
      trackExitIntentPopupNotShown(reason, trigger);
    },
    [],
  );

  const benefits = [
    'Qué tipo de web necesitas realmente.',
    'Qué debe incluir.',
    'Cómo evitar gastar de más.',
    'Qué preguntar antes de contratar.',
  ];

  const markGuideClaimed = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_CLAIMED, '1');
      localStorage.removeItem(STORAGE_DISMISS_UNTIL);
    } catch {
      // localStorage puede fallar en modo privado estricto
    }
  }, []);

  const hasClaimedGuide = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_CLAIMED) === '1';
    } catch {
      return false;
    }
  }, []);

  const hasNotInterested = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_NOT_INTERESTED) === '1';
    } catch {
      return false;
    }
  }, []);

  const isInDismissCooldown = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_DISMISS_UNTIL);
      if (!raw) return false;
      const until = Number(raw);
      if (!Number.isFinite(until)) return false;
      if (Date.now() < until) return true;
      localStorage.removeItem(STORAGE_DISMISS_UNTIL);
      return false;
    } catch {
      return false;
    }
  }, []);

  /** Cierre suave (X / overlay / Escape): no mostrar 7 días. */
  const markSoftDismiss = useCallback(() => {
    try {
      localStorage.setItem(
        STORAGE_DISMISS_UNTIL,
        String(Date.now() + DISMISS_COOLDOWN_MS),
      );
    } catch {
      // ignore
    }
  }, []);

  /** Rechazo explícito: no volver a mostrar. */
  const markNotInterested = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_NOT_INTERESTED, '1');
      localStorage.removeItem(STORAGE_DISMISS_UNTIL);
    } catch {
      // ignore
    }
  }, []);

  /** Motivo de bloqueo persistente, o null si puede mostrarse. */
  const getPersistentBlockReason =
    useCallback((): ExitIntentNotShownReason | null => {
      if (hasClaimedGuide()) return 'cookie';
      if (hasNotInterested()) return 'not_interested';
      if (isInDismissCooldown()) return 'cooldown';
      return null;
    }, [hasClaimedGuide, hasNotInterested, isInDismissCooldown]);

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

  const openPopup = useCallback(
    (trigger: ExitIntentTrigger) => {
      if (isExcludedPageRef.current) {
        return;
      }

      const blockReason = getPersistentBlockReason();
      if (blockReason) {
        reportNotShown(blockReason, trigger);
        return;
      }

      // Ya se mostró o está abierto en esta sesión: silencio, sin evento.
      if (hasTriggeredRef.current || isOpenRef.current) {
        return;
      }

      // Si el modal de contacto está abierto, reintentamos al cerrarlo.
      if (isContactModalOpenRef.current) {
        pendingOpenRef.current = true;
        pendingTriggerRef.current = trigger;
        return;
      }

      pendingOpenRef.current = false;
      pendingTriggerRef.current = null;
      triggerRef.current = trigger;
      hasTriggeredRef.current = true;
      setHasTriggered(true);
      setIsOpen(true);
      trackExitIntentPopupView(trigger);
    },
    [getPersistentBlockReason, reportNotShown],
  );

  const closePopup = useCallback(
    (method: ExitIntentCloseMethod = 'button') => {
      // Solo abandono: si ya convirtió, basta con submit / guide_subscribe.
      if (isOpenRef.current && submitStatusRef.current !== 'success') {
        trackExitIntentPopupClose(
          method,
          'form',
          triggerRef.current ?? undefined,
        );
        markSoftDismiss();
      }
      setIsOpen(false);
    },
    [markSoftDismiss],
  );

  const handleNotInterested = useCallback(() => {
    if (!isOpenRef.current || submitStatusRef.current === 'success') return;

    trackExitIntentPopupNotInterested(triggerRef.current ?? undefined);
    markNotInterested();
    hasTriggeredRef.current = true;
    setHasTriggered(true);
    setIsOpen(false);
  }, [markNotInterested]);

  // Reintento cuando se cierra el modal de contacto.
  useEffect(() => {
    if (!isContactModalOpen && pendingOpenRef.current) {
      const trigger = pendingTriggerRef.current ?? 'desktop_guaranteed';
      pendingOpenRef.current = false;
      pendingTriggerRef.current = null;
      openPopup(trigger);
    }
  }, [isContactModalOpen, openPopup]);

  // Reinicia el reloj de engagement al cambiar de ruta (SPA).
  useEffect(() => {
    markPageEngagementStart();
  }, [normalizedPath]);

  // Disparadores: escritorio + móvil. Siempre hay un fallback garantizado.
  useEffect(() => {
    if (isExcludedPage) return;

    const blockReason = getPersistentBlockReason();
    if (blockReason) {
      // No emitir en cada pageview: solo cuando el popup habría saltado
      // (timer garantizado), y como máximo 1 vez por razón y sesión.
      const delayMs = isMobileViewport()
        ? MOBILE_GUARANTEED_MS
        : DESKTOP_GUARANTEED_MS;
      const trigger: ExitIntentTrigger = isMobileViewport()
        ? 'mobile_guaranteed'
        : 'desktop_guaranteed';
      const timerId = window.setTimeout(() => {
        reportNotShown(blockReason, trigger);
      }, delayMs);
      return () => window.clearTimeout(timerId);
    }

    // Ya se mostró en esta sesión: no rearmar triggers ni emitir evento.
    if (hasTriggeredRef.current) {
      return;
    }

    pendingOpenRef.current = false;
    desktopExitReadyRef.current = false;

    const timers: number[] = [];
    const cleanups: Array<() => void> = [];

    const schedule = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    // ---- Desktop ----
    schedule(() => {
      desktopExitReadyRef.current = true;
    }, DESKTOP_EXIT_MIN_MS);

    // Exit-intent: cursor sale por arriba (o mouseleave del documento).
    // En móvil este disparador no aplica (hay vía propia); no se marca
    // mobile_disabled aquí para no ensuciar analítica.
    const handleMouseOut = (e: MouseEvent) => {
      if (!desktopExitReadyRef.current || isMobileViewport()) return;
      if (e.relatedTarget !== null) return;
      if (e.clientY > 0) return;
      openPopup('desktop_exit_intent');
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (!desktopExitReadyRef.current || isMobileViewport()) return;
      if (e.clientY > 0) return;
      openPopup('desktop_exit_intent');
    };

    document.addEventListener('mouseout', handleMouseOut);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    cleanups.push(() => {
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave,
      );
    });

    // Garantizado en desktop si no hubo exit-intent.
    schedule(() => {
      if (!isMobileViewport()) openPopup('desktop_guaranteed');
    }, DESKTOP_GUARANTEED_MS);

    // ---- Móvil ----
    // Si en el futuro se desactiva el popup en móvil, se registra mobile_disabled.
    const MOBILE_POPUP_ENABLED = true;

    let observer: IntersectionObserver | null = null;
    let mobileEarly = false;

    const openMobilePopup = (trigger: ExitIntentTrigger) => {
      if (!isMobileViewport()) return;
      if (!MOBILE_POPUP_ENABLED) {
        reportNotShown('mobile_disabled', trigger);
        return;
      }
      openPopup(trigger);
    };

    const tryMobilePricingOrScroll = () => {
      if (!isMobileViewport() || !mobileEarly) return;

      const section = findPricingSection();
      if (section) {
        observer?.disconnect();
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
                openMobilePopup('mobile_pricing');
                observer?.disconnect();
                return;
              }
            }
          },
          { threshold: [0.15, 0.25, 0.4] },
        );
        observer.observe(section);

        const rect = section.getBoundingClientRect();
        const alreadyVisible =
          rect.top < window.innerHeight * 0.9 &&
          rect.bottom > window.innerHeight * 0.1;
        if (alreadyVisible) openMobilePopup('mobile_pricing');
      }
    };

    const handleScroll = () => {
      if (!isMobileViewport() || !mobileEarly) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight <= 0 ? 1 : scrollTop / docHeight;

      // Umbral bajo para que casi siempre dispare al explorar.
      if (progress >= 0.35) {
        openMobilePopup('mobile_scroll');
      } else {
        tryMobilePricingOrScroll();
      }
    };

    schedule(() => {
      mobileEarly = true;
      if (isMobileViewport()) {
        tryMobilePricingOrScroll();
        handleScroll();
      }
    }, MOBILE_EARLY_MS);

    window.addEventListener('scroll', handleScroll, { passive: true });
    cleanups.push(() => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
    });

    // Garantizado en móvil si no llegó a precios/scroll.
    schedule(() => {
      openMobilePopup('mobile_guaranteed');
    }, MOBILE_GUARANTEED_MS);

    // Reintentos cortos por si el bloque de precios monta tarde (SPA).
    schedule(() => {
      if (isMobileViewport() && mobileEarly) tryMobilePricingOrScroll();
    }, MOBILE_EARLY_MS + 600);
    schedule(() => {
      if (isMobileViewport() && mobileEarly) tryMobilePricingOrScroll();
    }, MOBILE_EARLY_MS + 1600);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      cleanups.forEach((fn) => fn());
      observer?.disconnect();
    };
  }, [
    isExcludedPage,
    getPersistentBlockReason,
    normalizedPath,
    openPopup,
    reportNotShown,
  ]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup('escape');
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
      trackFormError('exit_intent_validation_error', 'Exit Intent', {
        trigger: triggerRef.current ?? undefined,
        ...getExitIntentEngagementParams(),
      });
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

      const engagement = getExitIntentEngagementParams();
      trackExitIntentPopupSubmit(triggerRef.current ?? undefined);
      trackGuideSubscribe('exit_intent_popup', {
        trigger: triggerRef.current ?? undefined,
        ...engagement,
      });
      markGuideClaimed();
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error al enviar formulario exit intent:', error);
      trackFormError('exit_intent_submit_failed', 'Exit Intent', {
        trigger: triggerRef.current ?? undefined,
        ...getExitIntentEngagementParams(),
      });
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
        onClick={() => closePopup('overlay')}
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
            onClick={() => closePopup('button')}
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
                  onClick={() =>
                    trackExitIntentPopupCalendlyClick(
                      triggerRef.current ?? undefined,
                    )
                  }
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
                    Descarga <b>GRATIS</b> una guía práctica para evitar
                    errores, ahorrar dinero y saber exactamente qué necesita tu
                    negocio antes de pedir presupuesto.
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
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_var(--color-accent)] transition-all duration-150 ${
                          errors.name
                            ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
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
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_var(--color-accent)] transition-all duration-150 ${
                          errors.email
                            ? 'border-accent shadow-[3px_3px_0_0_var(--color-accent)]'
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
                      </span>
                    </label>
                    {errors.consent && (
                      <div className='flex items-center gap-2 text-accent text-sm mt-1'>
                        <AlertCircle className='w-4 h-4' />
                        {errors.consent}
                      </div>
                    )}
                  </div>

                  <div className='pt-1 space-y-3'>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                      variant='primary'
                      fullWidth
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviarme la guía gratis'}
                      {!isSubmitting && <Check className='w-4 h-4' />}
                    </Button>
                    <button
                      type='button'
                      onClick={handleNotInterested}
                      disabled={isSubmitting}
                      className='w-full text-center text-sm font-medium text-gray-500 hover:text-gray-800 underline underline-offset-2 disabled:opacity-50'
                    >
                      No me interesa
                    </button>
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
