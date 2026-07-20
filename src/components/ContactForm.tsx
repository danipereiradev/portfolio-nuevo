import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Mail,
  Phone,
  User,
  Briefcase,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  trackFormSubmit,
  trackFormError,
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
  trackEmailClick,
} from '../utils/analytics';
import { useContactModal } from '../contexts/ContactModalContext';
import { buildWhatsAppUrl, getWhatsAppMessageForPath } from '../config/contact';
import Button from './Button';

interface ContactFormProps {
  preselectedPlan?: string;
  isInModal?: boolean;
}

const ContactForm = ({
  preselectedPlan,
  isInModal = false,
}: ContactFormProps = {}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const bottomWhatsAppUrl = buildWhatsAppUrl(
    getWhatsAppMessageForPath(pathname),
  );
  const { closeModal } = useContactModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [antiSpamAnswer, setAntiSpamAnswer] = useState('');
  const [antiSpamQuestion] = useState(() => {
    // El año se calcula en tiempo real (nunca hardcodeado) para que la
    // pregunta siga siendo correcta automáticamente en años futuros.
    const currentYear = new Date().getFullYear().toString();
    const questions = [
      { question: '¿Cuánto es 5 + 3?', answer: '8' },
      {
        question: '¿De qué color es el cielo en un día despejado?',
        answer: 'azul',
      },
      { question: '¿Cuántas patas tiene un gato?', answer: '4' },
      {
        question: '¿Cuál es el año actual? (4 dígitos)',
        answer: currentYear,
      },
      { question: '¿Cuál es la capital de España?', answer: 'madrid' },
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  });
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    businessType: '',
    plan: preselectedPlan || '',
    description: '',
  });

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$|^\+\d{1,3}\d{6,14}$/;
    const cleanPhone = value.replace(/[\s-()]/g, '');
    return phoneRegex.test(cleanPhone);
  };

  const isContactAnEmail = (value: string): boolean => validateEmail(value);

  const sanitizeText = (text: string): string => {
    return text
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
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

    const contactValue = formData.contact.trim();
    if (
      !contactValue ||
      (!validateEmail(contactValue) && !validatePhone(contactValue))
    ) {
      newErrors.contact = 'Introduce un email o un teléfono válido';
    }

    if (!formData.businessType || formData.businessType.trim().length < 2) {
      newErrors.businessType = 'Indica el tipo de negocio';
    }

    if (!formData.plan) {
      newErrors.plan = 'Selecciona un plan';
    }

    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }
    if (formData.description.trim().length > 500) {
      newErrors.description =
        'La descripción no puede superar los 500 caracteres';
    }

    if (
      !antiSpamAnswer ||
      antiSpamAnswer.toLowerCase().trim() !== antiSpamQuestion.answer
    ) {
      newErrors.antiSpam =
        'Respuesta incorrecta. Por favor, inténtalo de nuevo.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    if (!validateForm()) {
      trackFormError('validation_error', formData.plan);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formspreeEndpoint = 'https://formspree.io/f/movlevkj';
      const contactIsEmail = isContactAnEmail(formData.contact);

      const formDataToSend: Record<string, string> = {
        name: formData.name,
        contact: formData.contact,
        businessType: formData.businessType,
        plan: formData.plan,
        description: formData.description,
        submissionDate: new Date().toLocaleString('es-ES'),
        _subject: `Nueva Solicitud de Presupuesto - ${formData.name} - ${formData.plan}`,
        message: `
Nombre: ${formData.name}
Email o teléfono: ${formData.contact}
Tipo de negocio: ${formData.businessType}

Plan Seleccionado: ${formData.plan}

Descripción: ${formData.description}

Fecha: ${new Date().toLocaleString('es-ES')}
        `,
      };

      if (contactIsEmail) {
        formDataToSend._replyto = formData.contact;
      }

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(
          result.error || `Error ${response.status}: ${response.statusText}`,
        );
      }

      const planPrices: { [key: string]: number } = {
        'Web a Medida': 0,
        'Web Profesional 360': 0,
        'Tienda Online': 0,
        'Mantenimiento Web': 0,
        '360 Presencia': 0,
        '360 Gestión': 0,
        'No sé cuál necesito': 0,
        'Proyecto personalizado': 0,
      };
      const planValue = planPrices[formData.plan] || 0;
      trackFormSubmit(formData.plan, planValue);

      if (isInModal) {
        closeModal();
      }
      navigate('/gracias');
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      trackFormError('submit_failed', formData.plan);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ErrorMessage = ({ error }: { error: string }) => (
    <div className='flex items-center gap-2 text-accent text-sm mt-1'>
      <AlertCircle className='w-4 h-4' />
      {error}
    </div>
  );

  const planOptions = [
    {
      value: 'Web Profesional 360',
      description: 'Web de alcance definido, con precio claro y proceso rápido',
    },
    {
      value: 'Web a Medida',
      description:
        'Proyecto con funcionalidades, estructura o integraciones específicas',
    },
    {
      value: 'Tienda Online',
      description: 'Solución completa para vender productos online',
    },
    {
      value: 'Mantenimiento Web',
      description: 'Soporte, actualizaciones y seguridad continua',
    },
    {
      value: '360 Presencia',
      description: 'Web profesional para autónomos y negocios locales',
    },
    {
      value: '360 Gestión',
      description: 'Web profesional con panel para editar tú mismo la web',
    },
    {
      value: 'No sé cuál necesito',
      description: 'Te ayudamos a elegir según lo que necesita tu negocio',
    },
    {
      value: 'Proyecto personalizado',
      description: 'Tu proyecto no encaja en los packs anteriores',
    },
  ];

  const formContent = (
    <>
      <div className='text-center mb-12 md:mb-16'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4'>
          Cuéntanos qué necesitas
        </h2>
        <p className='text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto'>
          Trabajamos con empresas, autónomos y negocios que necesitan crear o
          mejorar su presencia online. Cuéntanos sobre tu proyecto y te
          enviaremos una propuesta personalizada en un máximo de 2 horas.
        </p>
      </div>

      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-lg border-2 border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] overflow-hidden'>
          <form onSubmit={handleSubmit} className='p-8 space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 text-center md:text-left'>
                  Nombre Completo *
                </label>
                <div className='relative'>
                  <User className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150 ${
                      errors.name
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark'
                    }`}
                    placeholder='Tu nombre completo'
                    maxLength={50}
                  />
                </div>
                {errors.name && <ErrorMessage error={errors.name} />}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 text-center md:text-left'>
                  Email o Teléfono *
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                  <input
                    type='text'
                    value={formData.contact}
                    onChange={(e) =>
                      handleInputChange('contact', e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150 ${
                      errors.contact
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark'
                    }`}
                    placeholder='tu@email.com o 600 000 000'
                  />
                </div>
                {errors.contact && <ErrorMessage error={errors.contact} />}
              </div>

              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2 text-center md:text-left'>
                  Tipo de Negocio *
                </label>
                <div className='relative'>
                  <Briefcase className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                  <input
                    type='text'
                    value={formData.businessType}
                    onChange={(e) =>
                      handleInputChange('businessType', e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150 ${
                      errors.businessType
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark'
                    }`}
                    placeholder='Ej: veterinaria, asesoría, tienda de ropa...'
                    maxLength={100}
                  />
                </div>
                {errors.businessType && (
                  <ErrorMessage error={errors.businessType} />
                )}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Plan que te Interesa *
              </label>
              <div className='grid sm:grid-cols-2 gap-4'>
                {planOptions.map((option) => {
                  const isSelected = formData.plan === option.value;
                  return (
                    <button
                      key={option.value}
                      type='button'
                      onClick={() => handleInputChange('plan', option.value)}
                      className={`p-5 text-left border-2 rounded-xl transition-all duration-150 ${
                        isSelected
                          ? 'border-accent bg-gray-50 shadow-[4px_4px_0_0_#14b8a6]'
                          : errors.plan
                            ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                            : 'border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px]'
                      }`}
                    >
                      <div className='flex items-start justify-between mb-2'>
                        <h4 className='font-bold text-gray-900'>
                          {option.value}
                        </h4>
                        {isSelected && (
                          <Check className='w-5 h-5 text-accent flex-shrink-0' />
                        )}
                      </div>
                      <p className='text-sm text-gray-600'>
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>
              {errors.plan && <ErrorMessage error={errors.plan} />}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2 text-center md:text-left'>
                Breve Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                rows={3}
                className={`w-full p-4 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150 ${
                  errors.description
                    ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                    : 'border-ink-dark'
                }`}
                placeholder='Cuéntanos brevemente qué necesitas...'
                maxLength={500}
              />
              <div className='flex justify-between items-center mt-1'>
                {errors.description && (
                  <ErrorMessage error={errors.description} />
                )}
                <span className='text-sm text-gray-500 ml-auto'>
                  {formData.description.length}/500 caracteres
                </span>
              </div>
            </div>

            <div className='bg-yellow-50 p-4 rounded-lg border-2 border-ink-dark shadow-[4px_4px_0_0_#1a1a1a]'>
              <label className='block text-sm font-medium text-gray-700 mb-2 text-center md:text-left'>
                Verificación de Seguridad *
              </label>
              <p className='text-sm text-gray-600 mb-3'>
                {antiSpamQuestion.question}
              </p>
              <input
                type='text'
                value={antiSpamAnswer}
                onChange={(e) => setAntiSpamAnswer(e.target.value)}
                className={`w-full px-4 py-2 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150 ${
                  errors.antiSpam
                    ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                    : 'border-ink-dark'
                }`}
                placeholder='Tu respuesta...'
                required
              />
              {errors.antiSpam && <ErrorMessage error={errors.antiSpam} />}
            </div>

            <div className='flex justify-center pt-2'>
              <Button
                type='submit'
                disabled={isSubmitting}
                isLoading={isSubmitting}
                variant='primary'
                className='px-8 py-3 text-base w-full sm:w-auto'
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                {!isSubmitting && <Check className='w-4 h-4' />}
              </Button>
            </div>

            {submitStatus === 'error' && (
              <div className='mt-2 p-4 bg-gray-50 border-2 border-ink-dark rounded-lg shadow-[4px_4px_0_0_#1a1a1a]'>
                <div className='flex items-center gap-2 text-gray-800'>
                  <AlertCircle className='w-5 h-5' />
                  <p className='font-medium'>Error al enviar la solicitud</p>
                </div>
                <p className='text-gray-700 text-sm mt-1'>
                  Por favor, inténtalo de nuevo o contáctanos directamente por
                  email: hola@pereiraweb.es
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className='text-center mt-12'>
        <p className='text-gray-600 mb-4'>¿Prefieres contactar directamente?</p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <a
            href='mailto:hola@pereiraweb.es'
            onClick={() => trackEmailClick('ContactFormBottom')}
            className='flex items-center gap-2 text-accent hover:text-accent-hover font-medium'
          >
            <Mail className='w-5 h-5' />
            hola@pereiraweb.es
          </a>
          <span className='hidden sm:block text-gray-300'>|</span>
          <a
            href={bottomWhatsAppUrl}
            target='_blank'
            rel='noopener noreferrer'
            onClick={(e) => {
              e.preventDefault();
              trackWhatsAppClick('ContactFormBottom');
              trackGoogleAdsWhatsAppConversion(bottomWhatsAppUrl);
            }}
            className='flex items-center gap-2 text-accent hover:text-accent-hover font-medium'
          >
            <Phone className='w-5 h-5' />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );

  if (isInModal) {
    return formContent;
  }

  return (
    <section id='contact' className='py-20 bg-white'>
      <div className='container mx-auto px-6'>{formContent}</div>
    </section>
  );
};

export default ContactForm;
