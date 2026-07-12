import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Mail,
  Phone,
  User,
  Globe,
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import {
  trackFormSubmit,
  trackFormStep,
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
  const [currentStep, setCurrentStep] = useState(1);
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
    email: '',
    phone: '',
    company: '',
    plan: preselectedPlan || '',
    lowCostBudget: '',
    description: '',
    inspiration: '',
    preferredContact: '',
    urgency: '',
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true;
    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$|^\+\d{1,3}\d{6,14}$/;
    const cleanPhone = phone.replace(/[\s-()]/g, '');
    return phoneRegex.test(cleanPhone);
  };

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

  const validateCurrentStep = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (currentStep) {
      case 1:
        if (!formData.name || !validateName(formData.name)) {
          newErrors.name =
            'El nombre debe contener solo letras y tener entre 2-50 caracteres';
        }
        if (!formData.email || !validateEmail(formData.email)) {
          newErrors.email = 'Por favor, introduce un email válido';
        }
        if (formData.phone && !validatePhone(formData.phone)) {
          newErrors.phone =
            'Formato de teléfono inválido (ej: +34 600 000 000)';
        }
        break;

      case 2:
        if (!formData.plan) {
          newErrors.plan = 'Selecciona un plan';
        }
        if (!formData.description || formData.description.trim().length < 20) {
          newErrors.description =
            'La descripción debe tener al menos 20 caracteres';
        }
        if (formData.description.trim().length > 1000) {
          newErrors.description =
            'La descripción no puede superar los 1000 caracteres';
        }
        break;

      case 3:
        if (!formData.preferredContact) {
          newErrors.preferredContact =
            'Selecciona un método de contacto preferido';
        }
        if (
          !antiSpamAnswer ||
          antiSpamAnswer.toLowerCase().trim() !== antiSpamQuestion.answer
        ) {
          newErrors.antiSpam =
            'Respuesta incorrecta. Por favor, inténtalo de nuevo.';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    const sanitizedValue =
      typeof value === 'string' ? sanitizeText(value) : value;

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

  const nextStep = () => {
    if (!validateCurrentStep()) {
      trackFormError(`validation_step_${currentStep}`, formData.plan);
      return;
    }

    if (currentStep < 3) {
      const nextStepNumber = currentStep + 1;
      setCurrentStep(nextStepNumber);

      const stepNames = [
        '',
        'Información Básica',
        'Selección de Plan',
        'Preferencias',
      ];
      trackFormStep(nextStepNumber, stepNames[nextStepNumber]);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) {
      trackFormError(`validation_step_${currentStep}`, formData.plan);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formspreeEndpoint = 'https://formspree.io/f/movlevkj';

      const formDataToSend = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'No proporcionado',
        company: formData.company || 'No especificada',
        plan: formData.plan,
        description: formData.description,
        inspiration: formData.inspiration || 'No especificada',
        preferredContact: formData.preferredContact,
        urgency: formData.urgency || 'No especificada',
        submissionDate: new Date().toLocaleString('es-ES'),
        _replyto: formData.email,
        _subject: `Nueva Solicitud de Presupuesto - ${formData.name} - ${formData.plan}`,
        message: `
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone || 'No proporcionado'}
Empresa: ${formData.company || 'No especificada'}

Plan Seleccionado: ${formData.plan}

Descripción: ${formData.description}

Inspiración: ${formData.inspiration || 'No especificada'}

Método de contacto preferido: ${formData.preferredContact}
Urgencia: ${formData.urgency || 'No especificada'}

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

      if (!response.ok) {
        const result = await response.json();
        throw new Error(
          result.error || `Error ${response.status}: ${response.statusText}`,
        );
      }

      const planPrices: { [key: string]: number } = {
        'Página Web': 0,
        'Tienda Online': 0,
        'Diseño Web': 0,
        'Posicionamiento SEO': 0,
        'Auditoría Ecommerce': 0,
        'Mantenimiento Web': 0,
        'Desarrollo a Medida': 0,
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='space-y-6'>
            <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center md:text-left'>
              Información de Contacto
            </h3>

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
                  Email *
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150 ${
                      errors.email
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark'
                    }`}
                    placeholder='tu@email.com'
                  />
                </div>
                {errors.email && <ErrorMessage error={errors.email} />}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 text-center md:text-left'>
                  Teléfono
                </label>
                <div className='relative'>
                  <Phone className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                  <input
                    type='tel'
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150 ${
                      errors.phone
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark'
                    }`}
                    placeholder='+34 600 000 000'
                  />
                </div>
                {errors.phone && <ErrorMessage error={errors.phone} />}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 text-center md:text-left'>
                  Empresa
                </label>
                <div className='relative'>
                  <Globe className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                  <input
                    type='text'
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange('company', e.target.value)
                    }
                    className='w-full pl-10 pr-4 py-3 border-2 border-ink-dark rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150'
                    placeholder='Tu empresa (opcional)'
                    maxLength={100}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className='space-y-6'>
            <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center md:text-left'>
              Selecciona tu Plan
            </h3>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Plan de Servicio *
              </label>
              <div className='grid gap-4'>
                <button
                  type='button'
                  onClick={() => handleInputChange('plan', 'Página Web')}
                  className={`p-5 text-left border-2 rounded-xl transition-all duration-150 ${
                    formData.plan === 'Página Web'
                      ? 'border-accent bg-gray-50 shadow-[4px_4px_0_0_#14b8a6]'
                      : errors.plan
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-bold text-gray-900'>Página Web</h4>
                    {formData.plan === 'Página Web' && (
                      <Check className='w-5 h-5 text-accent' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600'>
                    Sitio web profesional para empresas y autónomos
                  </p>
                </button>

                <button
                  type='button'
                  onClick={() => handleInputChange('plan', 'Tienda Online')}
                  className={`p-5 text-left border-2 rounded-xl transition-all duration-150 ${
                    formData.plan === 'Tienda Online'
                      ? 'border-accent bg-gray-50 shadow-[4px_4px_0_0_#14b8a6]'
                      : errors.plan
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-bold text-gray-900'>Tienda Online</h4>
                    {formData.plan === 'Tienda Online' && (
                      <Check className='w-5 h-5 text-accent' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600'>
                    Solución completa para vender productos online
                  </p>
                </button>

                <button
                  type='button'
                  onClick={() =>
                    handleInputChange('plan', 'Desarrollo a Medida')
                  }
                  className={`p-5 text-left border-2 rounded-xl transition-all duration-150 ${
                    formData.plan === 'Desarrollo a Medida'
                      ? 'border-accent bg-gray-50 shadow-[4px_4px_0_0_#14b8a6]'
                      : errors.plan
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-bold text-gray-900'>
                      Desarrollo a Medida
                    </h4>
                    {formData.plan === 'Desarrollo a Medida' && (
                      <Check className='w-5 h-5 text-accent' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600'>
                    Soluciones digitales y aplicaciones web a medida
                  </p>
                </button>

                <button
                  type='button'
                  onClick={() =>
                    handleInputChange('plan', 'Auditoría Ecommerce')
                  }
                  className={`p-5 text-left border-2 rounded-xl transition-all duration-150 ${
                    formData.plan === 'Auditoría Ecommerce'
                      ? 'border-accent bg-gray-50 shadow-[4px_4px_0_0_#14b8a6]'
                      : errors.plan
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-bold text-gray-900'>
                      Auditoría Ecommerce
                    </h4>
                    {formData.plan === 'Auditoría Ecommerce' && (
                      <Check className='w-5 h-5 text-accent' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600'>
                    Revisión de tu tienda online para mejorar conversión
                  </p>
                </button>

                <button
                  type='button'
                  onClick={() => handleInputChange('plan', 'Diseño Web')}
                  className={`p-5 text-left border-2 rounded-xl transition-all duration-150 ${
                    formData.plan === 'Diseño Web'
                      ? 'border-accent bg-gray-50 shadow-[4px_4px_0_0_#14b8a6]'
                      : errors.plan
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-bold text-gray-900'>Diseño Web</h4>
                    {formData.plan === 'Diseño Web' && (
                      <Check className='w-5 h-5 text-accent' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600'>
                    Diseño web profesional y moderno que convierte
                  </p>
                </button>

                <button
                  type='button'
                  onClick={() =>
                    handleInputChange('plan', 'Posicionamiento SEO')
                  }
                  className={`p-5 text-left border-2 rounded-xl transition-all duration-150 ${
                    formData.plan === 'Posicionamiento SEO'
                      ? 'border-accent bg-gray-50 shadow-[4px_4px_0_0_#14b8a6]'
                      : errors.plan
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-bold text-gray-900'>
                      Posicionamiento SEO
                    </h4>
                    {formData.plan === 'Posicionamiento SEO' && (
                      <Check className='w-5 h-5 text-accent' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600'>
                    Mejora tu visibilidad en Google y atrae más clientes
                  </p>
                </button>

                <button
                  type='button'
                  onClick={() => handleInputChange('plan', 'Mantenimiento Web')}
                  className={`p-5 text-left border-2 rounded-xl transition-all duration-150 ${
                    formData.plan === 'Mantenimiento Web'
                      ? 'border-accent bg-gray-50 shadow-[4px_4px_0_0_#14b8a6]'
                      : errors.plan
                        ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                        : 'border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-bold text-gray-900'>
                      Mantenimiento Web
                    </h4>
                    {formData.plan === 'Mantenimiento Web' && (
                      <Check className='w-5 h-5 text-accent' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600'>
                    Soporte, actualizaciones y seguridad continua
                  </p>
                </button>
              </div>
              {errors.plan && <ErrorMessage error={errors.plan} />}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2 text-center md:text-left'>
                Descripción del Proyecto *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                rows={4}
                className={`w-full p-4 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150 ${
                  errors.description
                    ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                    : 'border-ink-dark'
                }`}
                placeholder='Describe tu proyecto, objetivos, funcionalidades específicas...'
                maxLength={1000}
              />
              <div className='flex justify-between items-center mt-1'>
                {errors.description && (
                  <ErrorMessage error={errors.description} />
                )}
                <span className='text-sm text-gray-500 ml-auto'>
                  {formData.description.length}/1000 caracteres
                </span>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2 text-center md:text-left'>
                Referencias o Inspiración
              </label>
              <textarea
                value={formData.inspiration}
                onChange={(e) =>
                  handleInputChange('inspiration', e.target.value)
                }
                rows={3}
                className='w-full p-4 border-2 border-ink-dark rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150'
                placeholder='Webs de referencia, estilos que te gusten, colores preferidos...'
                maxLength={500}
              />
              <span className='text-sm text-gray-500'>
                {formData.inspiration.length}/500 caracteres
              </span>
            </div>
          </div>
        );

      case 3:
        return (
          <div className='space-y-6'>
            <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center md:text-left'>
              Preferencias de Contacto
            </h3>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                ¿Cómo prefieres que te contacte? *
              </label>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                {['Email', 'Teléfono', 'WhatsApp', 'Videollamada'].map(
                  (method) => {
                    const isSelected = formData.preferredContact === method;
                    return (
                      <label
                        key={method}
                        className={`flex items-center justify-center text-center px-3 py-3 border-2 rounded-lg font-bold text-sm cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'border-accent bg-gray-50 text-gray-900 shadow-[3px_3px_0_0_#14b8a6]'
                            : 'border-ink-dark text-gray-700 shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px]'
                        }`}
                      >
                        <input
                          type='radio'
                          name='preferredContact'
                          value={method}
                          checked={isSelected}
                          onChange={(e) =>
                            handleInputChange(
                              'preferredContact',
                              e.target.value,
                            )
                          }
                          className='sr-only'
                        />
                        {method}
                      </label>
                    );
                  },
                )}
              </div>
              {errors.preferredContact && (
                <ErrorMessage error={errors.preferredContact} />
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Urgencia del Proyecto
              </label>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                {['Muy urgente', 'Urgente', 'Normal', 'Sin prisa'].map(
                  (urgency) => {
                    const isSelected = formData.urgency === urgency;
                    return (
                      <label
                        key={urgency}
                        className={`flex items-center justify-center text-center px-3 py-3 border-2 rounded-lg font-bold text-sm cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'border-accent bg-gray-50 text-gray-900 shadow-[3px_3px_0_0_#14b8a6]'
                            : 'border-ink-dark text-gray-700 shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px]'
                        }`}
                      >
                        <input
                          type='radio'
                          name='urgency'
                          value={urgency}
                          checked={isSelected}
                          onChange={(e) =>
                            handleInputChange('urgency', e.target.value)
                          }
                          className='sr-only'
                        />
                        {urgency}
                      </label>
                    );
                  },
                )}
              </div>
            </div>

            {/* Verificación Anti-Spam */}
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
            <div className='bg-gray-50 p-6 rounded-lg border-2 border-ink-dark shadow-[4px_4px_0_0_#1a1a1a]'>
              <h4 className='font-bold text-gray-900 mb-2'>
                Resumen de tu Solicitud
              </h4>
              <div className='text-sm text-gray-800 space-y-1'>
                <p>
                  <strong>Nombre:</strong> {formData.name}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Plan:</strong> {formData.plan || 'No seleccionado'}
                </p>
                <p>
                  <strong>Descripción:</strong>{' '}
                  {formData.description
                    ? formData.description.substring(0, 100) + '...'
                    : 'Sin descripción'}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
          <div className='bg-gray-50 px-8 py-6'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-medium text-gray-600'>
                Paso {currentStep} de 3
              </span>
              <span className='text-sm font-medium text-gray-600'>
                {Math.round((currentStep / 3) * 100)}% completado
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-3 border-2 border-ink-dark overflow-hidden'>
              <div
                className='bg-accent h-full rounded-full transition-all duration-500'
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='p-8'>
            {renderStep()}

            <div className='flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-gray-200'>
              <Button
                type='button'
                onClick={prevStep}
                disabled={currentStep === 1}
                variant='ghost'
                className='px-6 py-3 text-base w-full sm:w-auto'
              >
                <ArrowLeft className='w-4 h-4' />
                Anterior
              </Button>

              {currentStep < 3 ? (
                <Button
                  type='button'
                  onClick={nextStep}
                  variant='primary'
                  className='px-6 py-3 text-base w-full sm:w-auto'
                >
                  Siguiente
                  <ArrowRight className='w-4 h-4' />
                </Button>
              ) : (
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
              )}
            </div>

            {submitStatus === 'error' && (
              <div className='mt-6 p-4 bg-gray-50 border-2 border-ink-dark rounded-lg shadow-[4px_4px_0_0_#1a1a1a]'>
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
