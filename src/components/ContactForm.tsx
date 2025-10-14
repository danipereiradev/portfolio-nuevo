import React, { useState } from 'react';
import {
  Mail,
  Phone,
  User,
  Globe,
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { trackFormSubmit, trackFormStep } from '../utils/analytics';

interface ContactFormProps {
  preselectedPlan?: string;
}

const ContactForm = ({ preselectedPlan }: ContactFormProps = {}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [antiSpamAnswer, setAntiSpamAnswer] = useState('');
  const [antiSpamQuestion] = useState(() => {
    const questions = [
      { question: '¿Cuánto es 5 + 3?', answer: '8' },
      {
        question: '¿De qué color es el cielo en un día despejado?',
        answer: 'azul',
      },
      { question: '¿Cuántas patas tiene un gato?', answer: '4' },
      { question: '¿En qué año estamos? (4 dígitos)', answer: '2025' },
      { question: '¿Cuál es la capital de España?', answer: 'madrid' },
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  });
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    email: '',
    phone: '',
    company: '',

    // Step 2: Plan Selection and Project Details
    plan: preselectedPlan || '',
    lowCostBudget: '',
    description: '',
    inspiration: '',

    // Step 3: Contact Preferences
    preferredContact: '',
    urgency: '',
  });

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validación de teléfono (formato español e internacional)
  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Campo opcional
    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$|^\+\d{1,3}\d{6,14}$/;
    const cleanPhone = phone.replace(/[\s-()]/g, '');
    return phoneRegex.test(cleanPhone);
  };

  // Sanitización de texto (prevenir XSS)
  const sanitizeText = (text: string): string => {
    return text
      .replace(/[<>]/g, '') // Eliminar solo < y >
      .replace(/javascript:/gi, '') // Eliminar javascript:
      .replace(/on\w+=/gi, ''); // Eliminar eventos onclick, onload, etc.
    // NO hacer trim aquí para preservar espacios mientras el usuario escribe
  };

  // Validación de nombre (solo letras, espacios, acentos)
  const validateName = (name: string): boolean => {
    const trimmedName = name.trim(); // Solo trim para validación
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    return nameRegex.test(trimmedName) && trimmedName.length >= 2;
  };

  // Validar paso actual
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
        if (
          formData.plan === 'Página Web Sencilla (Desde €350)' &&
          !formData.lowCostBudget
        ) {
          newErrors.lowCostBudget = 'Introduce tu presupuesto disponible';
        }
        if (
          formData.plan === 'Página Web Sencilla (Desde €350)' &&
          formData.lowCostBudget
        ) {
          const budget = parseFloat(formData.lowCostBudget);
          if (isNaN(budget) || budget < 350 || budget > 1000) {
            newErrors.lowCostBudget =
              'El presupuesto debe estar entre €350 y €1000';
          }
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
    // Sanitizar texto si es string
    const sanitizedValue =
      typeof value === 'string' ? sanitizeText(value) : value;

    setFormData((prev) => ({
      ...prev,
      [field]: sanitizedValue,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < 3) {
      const nextStepNumber = currentStep + 1;
      setCurrentStep(nextStepNumber);

      // Track form step
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
      // Limpiar errores al retroceder
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Tu endpoint de Formspree configurado
      const formspreeEndpoint = 'https://formspree.io/f/movlevkj';

      const formDataToSend = {
        // Información de contacto
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'No proporcionado',
        company: formData.company || 'No especificada',

        // Plan y detalles del proyecto
        plan: formData.plan,
        lowCostBudget:
          formData.plan === 'Página Web Sencilla (Desde €350)'
            ? `€${formData.lowCostBudget}`
            : 'N/A',
        description: formData.description,
        inspiration: formData.inspiration || 'No especificada',

        // Preferencias
        preferredContact: formData.preferredContact,
        urgency: formData.urgency || 'No especificada',

        // Información adicional
        submissionDate: new Date().toLocaleString('es-ES'),
        _replyto: formData.email,
        _subject: `Nueva Solicitud de Presupuesto - ${formData.name} - ${formData.plan}`,
        message: `
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone || 'No proporcionado'}
Empresa: ${formData.company || 'No especificada'}

Plan Seleccionado: ${formData.plan}
${
  formData.plan === 'Página Web Sencilla (Desde €350)'
    ? `Presupuesto disponible: €${formData.lowCostBudget}`
    : ''
}

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
          result.error || `Error ${response.status}: ${response.statusText}`
        );
      }

      console.log('Formulario enviado exitosamente');
      setSubmitStatus('success');

      // Track conversión exitosa
      const planPrices: { [key: string]: number } = {
        'Página Web Sencilla (Desde €350)': 350,
        'Página Web Autónomos y Pymes (Desde €750)': 750,
        'Tienda Online (Desde €1250)': 1250,
        'Aplicación Web o Móvil (Desde €3200)': 3200,
      };
      const planValue = planPrices[formData.plan] || 0;
      trackFormSubmit(formData.plan, planValue);

      // No resetear el formulario, mantener el estado de éxito para mostrar el mensaje
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si el formulario fue enviado exitosamente, mostrar mensaje de confirmación
  if (submitStatus === 'success') {
    return (
      <section
        id='contact'
        className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'
      >
        <div className='container mx-auto px-6'>
          <div className='max-w-2xl mx-auto'>
            <div className='bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center'>
              {/* Icono de éxito */}
              <div className='flex justify-center mb-6'>
                <div className='bg-green-100 rounded-full p-4'>
                  <CheckCircle className='w-16 h-16 text-green-600' />
                </div>
              </div>

              {/* Título */}
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                ¡Solicitud Enviada con Éxito!
              </h2>

              {/* Mensaje principal */}
              <p className='text-lg text-gray-700 mb-6 leading-relaxed'>
                Gracias por confiar en mí para tu proyecto. He recibido tu
                solicitud correctamente.
              </p>

              {/* Información de contacto */}
              <div className='bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6'>
                <div className='flex items-center justify-center gap-2 mb-3'>
                  <Mail className='w-5 h-5 text-blue-600' />
                  <h3 className='text-xl font-semibold text-blue-900'>
                    Te responderé pronto
                  </h3>
                </div>
                <p className='text-blue-800 font-medium'>
                  Me pondré en contacto contigo en un plazo máximo de{' '}
                  <span className='font-bold'>24 horas</span> para discutir los
                  detalles de tu proyecto.
                </p>
              </div>

              {/* Información adicional */}
              <div className='text-sm text-gray-600 mb-6'>
                <p className='mb-2'>
                  📧 Revisa tu bandeja de entrada (y spam) por si acaso
                </p>
                <p>
                  💬 También puedes contactarme directamente por WhatsApp si lo
                  prefieres
                </p>
              </div>

              {/* Botones de acción */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button
                  onClick={() => window.location.reload()}
                  className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200'
                >
                  Volver al Inicio
                </button>
                <a
                  href='https://wa.me/34644669828'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='border-2 border-green-500 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2'
                >
                  <Phone className='w-4 h-4' />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Componente para mostrar errores
  const ErrorMessage = ({ error }: { error: string }) => (
    <div className='flex items-center gap-2 text-red-600 text-sm mt-1'>
      <AlertCircle className='w-4 h-4' />
      {error}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-gray-900 mb-6'>
              Información de Contacto
            </h3>

            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nombre Completo *
                </label>
                <div className='relative'>
                  <User className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='Tu nombre completo'
                    maxLength={50}
                  />
                </div>
                {errors.name && <ErrorMessage error={errors.name} />}
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
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='tu@email.com'
                  />
                </div>
                {errors.email && <ErrorMessage error={errors.email} />}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Teléfono
                </label>
                <div className='relative'>
                  <Phone className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                  <input
                    type='tel'
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='+34 600 000 000'
                  />
                </div>
                {errors.phone && <ErrorMessage error={errors.phone} />}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
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
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
            <h3 className='text-2xl font-bold text-gray-900 mb-6'>
              Selecciona tu Plan
            </h3>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Plan de Servicio *
              </label>
              <div className='grid md:grid-cols-2 gap-4'>
                <button
                  type='button'
                  onClick={() =>
                    handleInputChange(
                      'plan',
                      'Página Web Sencilla (Desde €350)'
                    )
                  }
                  className={`p-5 text-left border-2 rounded-xl transition-all duration-200 ${
                    formData.plan === 'Página Web Sencilla (Desde €350)'
                      ? 'border-orange-500 bg-orange-50'
                      : errors.plan
                      ? 'border-red-500'
                      : 'border-gray-300 hover:border-orange-300'
                  }`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-bold text-gray-900'>
                      Landing Page Express
                    </h4>
                    {formData.plan === 'Página Web Sencilla (Desde €350)' && (
                      <Check className='w-5 h-5 text-orange-600' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600 mb-2'>
                    Solución rápida y económica para emprendedores
                  </p>
                  <p className='text-lg font-bold text-orange-600'>
                    Desde €350
                  </p>
                </button>

                <button
                  type='button'
                  onClick={() =>
                    handleInputChange(
                      'plan',
                      'Página Web Autónomos y Pymes (Desde €750)'
                    )
                  }
                  className={`p-5 text-left border-2 rounded-xl transition-all duration-200 ${
                    formData.plan ===
                    'Página Web Autónomos y Pymes (Desde €750)'
                      ? 'border-blue-500 bg-blue-50'
                      : errors.plan
                      ? 'border-red-500'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-bold text-gray-900'>
                      Página Web Autónomos y Pymes
                    </h4>
                    {formData.plan ===
                      'Página Web Autónomos y Pymes (Desde €750)' && (
                      <Check className='w-5 h-5 text-blue-600' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600 mb-2'>
                    Perfecta para empresas que buscan presencia digital
                    profesional
                  </p>
                  <p className='text-lg font-bold text-blue-600'>Desde €750</p>
                </button>

                <button
                  type='button'
                  onClick={() =>
                    handleInputChange('plan', 'Tienda Online (Desde €1250)')
                  }
                  className={`p-5 text-left border-2 rounded-xl transition-all duration-200 ${
                    formData.plan === 'Tienda Online (Desde €1250)'
                      ? 'border-green-500 bg-green-50'
                      : errors.plan
                      ? 'border-red-500'
                      : 'border-gray-300 hover:border-green-300'
                  }`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-bold text-gray-900'>Tienda Online</h4>
                    {formData.plan === 'Tienda Online (Desde €1250)' && (
                      <Check className='w-5 h-5 text-green-600' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600 mb-2'>
                    Solución completa para vender productos online
                  </p>
                  <p className='text-lg font-bold text-green-600'>
                    Desde €1250
                  </p>
                </button>

                <button
                  type='button'
                  onClick={() =>
                    handleInputChange(
                      'plan',
                      'Aplicación Web o Móvil (Desde €3200)'
                    )
                  }
                  className={`p-5 text-left border-2 rounded-xl transition-all duration-200 ${
                    formData.plan === 'Aplicación Web o Móvil (Desde €3200)'
                      ? 'border-purple-500 bg-purple-50'
                      : errors.plan
                      ? 'border-red-500'
                      : 'border-gray-300 hover:border-purple-300'
                  }`}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-bold text-gray-900'>
                      Aplicación Web o Móvil
                    </h4>
                    {formData.plan ===
                      'Aplicación Web o Móvil (Desde €3200)' && (
                      <Check className='w-5 h-5 text-purple-600' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600 mb-2'>
                    Desarrollo a medida para proyectos únicos
                  </p>
                  <p className='text-lg font-bold text-purple-600'>
                    Desde €3200
                  </p>
                </button>
              </div>
              {errors.plan && <ErrorMessage error={errors.plan} />}
            </div>

            {/* Campo de presupuesto Landing Page Express - solo visible si se selecciona este plan */}
            {formData.plan === 'Página Web Sencilla (Desde €350)' && (
              <div className='bg-orange-50 p-4 rounded-lg border border-orange-200'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Presupuesto disponible (en euros) *
                </label>
                <div className='relative'>
                  <span className='absolute left-3 top-3 text-gray-600 font-medium'>
                    €
                  </span>
                  <input
                    type='number'
                    min='350'
                    max='1000'
                    step='50'
                    value={formData.lowCostBudget}
                    onChange={(e) =>
                      handleInputChange('lowCostBudget', e.target.value)
                    }
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.lowCostBudget
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder='350'
                  />
                </div>
                <p className='text-sm text-gray-600 mt-2'>
                  Indica el presupuesto que tienes disponible para tu proyecto
                  (entre €350 y €1000)
                </p>
                {errors.lowCostBudget && (
                  <ErrorMessage error={errors.lowCostBudget} />
                )}
              </div>
            )}

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Descripción del Proyecto *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                rows={4}
                className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
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
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Referencias o Inspiración
              </label>
              <textarea
                value={formData.inspiration}
                onChange={(e) =>
                  handleInputChange('inspiration', e.target.value)
                }
                rows={3}
                className='w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
            <h3 className='text-2xl font-bold text-gray-900 mb-6'>
              Preferencias de Contacto
            </h3>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                ¿Cómo prefieres que te contacte? *
              </label>
              <div className='space-y-3'>
                {['Email', 'Teléfono', 'WhatsApp', 'Videollamada'].map(
                  (method) => (
                    <label key={method} className='flex items-center'>
                      <input
                        type='radio'
                        name='preferredContact'
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={(e) =>
                          handleInputChange('preferredContact', e.target.value)
                        }
                        className='mr-3 text-blue-600'
                      />
                      {method}
                    </label>
                  )
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
              <div className='space-y-3'>
                {['Muy urgente', 'Urgente', 'Normal', 'Sin prisa'].map(
                  (urgency) => (
                    <label key={urgency} className='flex items-center'>
                      <input
                        type='radio'
                        name='urgency'
                        value={urgency}
                        checked={formData.urgency === urgency}
                        onChange={(e) =>
                          handleInputChange('urgency', e.target.value)
                        }
                        className='mr-3 text-blue-600'
                      />
                      {urgency}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Verificación Anti-Spam */}
            <div className='bg-yellow-50 p-4 rounded-lg border border-yellow-200'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Verificación de Seguridad *
              </label>
              <p className='text-sm text-gray-600 mb-3'>
                {antiSpamQuestion.question}
              </p>
              <input
                type='text'
                value={antiSpamAnswer}
                onChange={(e) => setAntiSpamAnswer(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.antiSpam ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Tu respuesta...'
                required
              />
              {errors.antiSpam && <ErrorMessage error={errors.antiSpam} />}
            </div>
            <div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
              <h4 className='font-semibold text-blue-900 mb-2'>
                Resumen de tu Solicitud
              </h4>
              <div className='text-sm text-blue-800 space-y-1'>
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

  return (
    <section
      id='contact'
      className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'
    >
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Solicita tu Presupuesto
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Cuéntame sobre tu proyecto y te enviaré una propuesta personalizada
            en menos de 24 horas
          </p>
        </div>

        <div className='max-w-4xl mx-auto'>
          <div className='bg-white rounded-2xl shadow-2xl overflow-hidden'>
            {/* Progress Bar */}
            <div className='bg-gray-50 px-8 py-6'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium text-gray-600'>
                  Paso {currentStep} de 3
                </span>
                <span className='text-sm font-medium text-gray-600'>
                  {Math.round((currentStep / 3) * 100)}% completado
                </span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500'
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className='p-8'>
              {renderStep()}

              {/* Navigation Buttons */}
              <div className='flex justify-between mt-8 pt-6 border-t border-gray-200'>
                <button
                  type='button'
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ArrowLeft className='w-4 h-4' />
                  Anterior
                </button>

                {currentStep < 3 ? (
                  <button
                    type='button'
                    onClick={nextStep}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    Siguiente
                    <ArrowRight className='w-4 h-4' />
                  </button>
                ) : (
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <Check className='w-4 h-4' />
                      </>
                    )}
                  </button>
                )}
              </div>

              {submitStatus === 'error' && (
                <div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                  <div className='flex items-center gap-2 text-red-800'>
                    <AlertCircle className='w-5 h-5' />
                    <p className='font-medium'>Error al enviar la solicitud</p>
                  </div>
                  <p className='text-red-700 text-sm mt-1'>
                    Por favor, inténtalo de nuevo o contacta directamente por
                    email: web.danipereira@gmail.com
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className='text-center mt-12'>
          <p className='text-gray-600 mb-4'>
            ¿Prefieres contactar directamente?
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <a
              href='mailto:web.danipereira@gmail.com'
              className='flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium'
            >
              <Mail className='w-5 h-5' />
              web.danipereira@gmail.com
            </a>
            <span className='hidden sm:block text-gray-300'>|</span>
            <a
              href='https://wa.me/34644669828'
              className='flex items-center gap-2 text-green-600 hover:text-green-700 font-medium'
            >
              <Phone className='w-5 h-5' />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
