import React, { useState } from 'react';
import { Mail, Phone, User, Globe, Euro, Calendar, Check, ArrowRight, ArrowLeft, Shield, AlertCircle } from 'lucide-react';
import SimonGame from './SimonGame';

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [antiSpamAnswer, setAntiSpamAnswer] = useState('');
  const [antiSpamQuestion, setAntiSpamQuestion] = useState(() => {
    const questions = [
      { question: "¿Cuánto es 5 + 3?", answer: "8" },
      { question: "¿De qué color es el cielo en un día despejado?", answer: "azul" },
      { question: "¿Cuántas patas tiene un gato?", answer: "4" },
      { question: "¿En qué año estamos? (4 dígitos)", answer: "2025" },
      { question: "¿Cuál es la capital de España?", answer: "madrid" }
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  });
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    email: '',
    phone: '',
    company: '',
    
    // Step 2: Project Details
    projectType: '',
    budget: '',
    customBudget: '',
    timeline: '',
    
    // Step 3: Requirements
    features: [],
    description: '',
    inspiration: '',
    
    // Step 4: Contact Preferences
    preferredContact: '',
    urgency: ''
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
      .replace(/on\w+=/gi, '') // Eliminar eventos onclick, onload, etc.
      // NO hacer trim aquí para preservar espacios mientras el usuario escribe
  };

  // Validación de nombre (solo letras, espacios, acentos)
  const validateName = (name: string): boolean => {
    const trimmedName = name.trim(); // Solo trim para validación
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    return nameRegex.test(trimmedName) && trimmedName.length >= 2;
  };

  // Validación de presupuesto personalizado
  const validateCustomBudget = (budget: string): boolean => {
    const num = parseFloat(budget);
    return !isNaN(num) && num > 0 && num <= 1000000; // Máximo 1M€
  };

  // Validar paso actual
  const validateCurrentStep = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    switch (currentStep) {
      case 1:
        if (!formData.name || !validateName(formData.name)) {
          newErrors.name = 'El nombre debe contener solo letras y tener entre 2-50 caracteres';
        }
        if (!formData.email || !validateEmail(formData.email)) {
          newErrors.email = 'Por favor, introduce un email válido';
        }
        if (formData.phone && !validatePhone(formData.phone)) {
          newErrors.phone = 'Formato de teléfono inválido (ej: +34 600 000 000)';
        }
        break;

      case 2:
        if (!formData.projectType) {
          newErrors.projectType = 'Selecciona un tipo de proyecto';
        }
        if (!formData.timeline) {
          newErrors.timeline = 'Selecciona un plazo deseado';
        }
        if (formData.budget === 'custom' && (!formData.customBudget || !validateCustomBudget(formData.customBudget))) {
          newErrors.customBudget = 'Introduce un presupuesto válido (máximo 1.000.000€)';
        }
        break;

      case 3:
        if (!formData.description || formData.description.trim().length < 20) {
          newErrors.description = 'La descripción debe tener al menos 20 caracteres';
        }
        if (formData.description.trim().length > 1000) {
          newErrors.description = 'La descripción no puede superar los 1000 caracteres';
        }
        break;

      case 4:
        if (!formData.preferredContact) {
          newErrors.preferredContact = 'Selecciona un método de contacto preferido';
        }
        if (!antiSpamAnswer || antiSpamAnswer.toLowerCase().trim() !== antiSpamQuestion.answer) {
          newErrors.antiSpam = 'Respuesta incorrecta. Por favor, inténtalo de nuevo.';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const projectTypes = [
    'Página Web Corporativa',
    'E-commerce',
    'Aplicación Web',
    'Landing Page',
    'Rediseño Web',
    'Mantenimiento Web'
  ];

  const budgetRangesByProject = {
    'Página Web Corporativa': [
      '€400 - €1,500',
      '€1,500 - €3,000',
      '€3,000 - €6,000',
      '€6,000 - €12,000',
      '€12,000+'
    ],
    'E-commerce': [
      '€800 - €2,500',
      '€2,500 - €5,000',
      '€5,000 - €10,000',
      '€10,000 - €20,000',
      '€20,000+'
    ],
    'Aplicación Web': [
      '€1,500 - €4,000',
      '€4,000 - €8,000',
      '€8,000 - €15,000',
      '€15,000 - €30,000',
      '€30,000+'
    ],
    'Landing Page': [
      '€400 - €800',
      '€800 - €1,500',
      '€1,500 - €2,500',
      '€2,500 - €4,000',
      '€4,000+'
    ],
    'Rediseño Web': [
      '€600 - €1,500',
      '€1,500 - €3,000',
      '€3,000 - €5,000',
      '€5,000 - €8,000',
      '€8,000+'
    ],
    'Mantenimiento Web': [
      '€40 - €100/mes',
      '€100 - €200/mes',
      '€200 - €400/mes',
      '€400 - €800/mes',
      '€800+/mes'
    ]
  };

  // Función para obtener rangos de presupuesto según el tipo de proyecto
  const getBudgetRanges = () => {
    return budgetRangesByProject[formData.projectType] || budgetRangesByProject['Página Web Corporativa'];
  };

  const timelineOptions = [
    'Lo antes posible',
    '1-2 semanas',
    '1 mes',
    '2-3 meses',
    'Más de 3 meses'
  ];

  const featureOptions = [
    'Diseño Responsivo',
    'SEO Optimizado',
    'Sistema de Pagos',
    'Blog/CMS',
    'Formularios Avanzados',
    'Integraciones API',
    'Multiidioma',
    'Dashboard Admin',
    'Chat en Vivo',
    'Analytics'
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    // Sanitizar texto si es string
    const sanitizedValue = typeof value === 'string' ? sanitizeText(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = formData.features;
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    
    handleInputChange('features', updatedFeatures);
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
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
        
        // Detalles del proyecto
        projectType: formData.projectType,
        budget: formData.budget === 'custom' ? `€${formData.customBudget} (personalizado)` : formData.budget,
        timeline: formData.timeline,
        
        // Características y descripción
        features: formData.features.length > 0 ? formData.features.join(', ') : 'Ninguna seleccionada',
        description: formData.description,
        inspiration: formData.inspiration || 'No especificada',
        
        // Preferencias
        preferredContact: formData.preferredContact,
        urgency: formData.urgency || 'No especificada',
        
        // Información adicional
        submissionDate: new Date().toLocaleString('es-ES'),
        _replyto: formData.email,
        _subject: `Nueva Solicitud de Presupuesto - ${formData.name}`,
        message: `
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone || 'No proporcionado'}
Empresa: ${formData.company || 'No especificada'}

Tipo de Proyecto: ${formData.projectType}
Presupuesto: ${formData.budget === 'custom' ? `€${formData.customBudget} (personalizado)` : formData.budget}
Plazo: ${formData.timeline}

Características: ${formData.features.length > 0 ? formData.features.join(', ') : 'Ninguna seleccionada'}

Descripción: ${formData.description}

Inspiración: ${formData.inspiration || 'No especificada'}

Método de contacto preferido: ${formData.preferredContact}
Urgencia: ${formData.urgency || 'No especificada'}

Fecha: ${new Date().toLocaleString('es-ES')}
        `
      };

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || `Error ${response.status}: ${response.statusText}`);
      }

      console.log('Formulario enviado exitosamente');
      setSubmitStatus('success');
      
      // No resetear el formulario, mantener el estado de éxito para mostrar el juego

    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si el formulario fue enviado exitosamente, mostrar el juego
  if (submitStatus === 'success') {
    return (
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <SimonGame />
          </div>
        </div>
      </section>
    );
  }

  // Componente para mostrar errores
  const ErrorMessage = ({ error }: { error: string }) => (
    <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
      <AlertCircle className="w-4 h-4" />
      {error}
    </div>
  );

  const isStepValid = () => {
    return Object.keys(errors).length === 0 && validateCurrentStep();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tu nombre completo"
                    maxLength={50}
                  />
                </div>
                {errors.name && <ErrorMessage error={errors.name} />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && <ErrorMessage error={errors.email} />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+34 600 000 000"
                  />
                </div>
                {errors.phone && <ErrorMessage error={errors.phone} />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu empresa (opcional)"
                    maxLength={100}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Detalles del Proyecto</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tipo de Proyecto *
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleInputChange('projectType', type)}
                    className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                      formData.projectType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : errors.projectType ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.projectType && <ErrorMessage error={errors.projectType} />}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Presupuesto Estimado *
                </label>
                {!formData.projectType && (
                  <p className="text-sm text-gray-500 mb-3 italic">
                    Selecciona primero el tipo de proyecto para ver los rangos de presupuesto
                  </p>
                )}
                <div className="space-y-2">
                  {getBudgetRanges().map((budget) => (
                    <label key={budget} className="flex items-center">
                      <input
                        type="radio"
                        name="budget"
                        value={budget}
                        checked={formData.budget === budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="mr-3 text-blue-600"
                        disabled={!formData.projectType}
                      />
                      <span className={!formData.projectType ? 'text-gray-400' : ''}>
                        {budget}
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="budget"
                      value="custom"
                      checked={formData.budget === 'custom'}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="mr-3 text-blue-600"
                      disabled={!formData.projectType}
                    />
                    <span className={!formData.projectType ? 'text-gray-400' : ''}>
                      Presupuesto personalizado
                    </span>
                  </label>
                  
                  {formData.budget === 'custom' && (
                    <div className="ml-6 mt-3">
                      <div className="relative">
                        <Euro className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          min="0"
                          max="1000000"
                          step="100"
                          value={formData.customBudget || ''}
                          onChange={(e) => handleInputChange('customBudget', e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.customBudget ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Introduce tu presupuesto en €"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Introduce el presupuesto que tienes disponible para este proyecto
                      </p>
                      {errors.customBudget && <ErrorMessage error={errors.customBudget} />}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Plazo Deseado *
                </label>
                <div className="space-y-2">
                  {timelineOptions.map((timeline) => (
                    <label key={timeline} className="flex items-center">
                      <input
                        type="radio"
                        name="timeline"
                        value={timeline}
                        checked={formData.timeline === timeline}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="mr-3 text-blue-600"
                      />
                      {timeline}
                    </label>
                  ))}
                </div>
                {errors.timeline && <ErrorMessage error={errors.timeline} />}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Características y Descripción</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Características Deseadas
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {featureOptions.map((feature) => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => handleFeatureToggle(feature)}
                    className={`p-3 text-left border rounded-lg transition-all duration-200 flex items-center ${
                      formData.features.includes(feature)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Check className={`w-4 h-4 mr-2 ${
                      formData.features.includes(feature) ? 'opacity-100' : 'opacity-0'
                    }`} />
                    {feature}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del Proyecto *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe tu proyecto, objetivos, funcionalidades específicas..."
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && <ErrorMessage error={errors.description} />}
                <span className="text-sm text-gray-500 ml-auto">
                  {formData.description.length}/1000 caracteres
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referencias o Inspiración
              </label>
              <textarea
                value={formData.inspiration}
                onChange={(e) => handleInputChange('inspiration', e.target.value)}
                rows={3}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Webs de referencia, estilos que te gusten, colores preferidos..."
                maxLength={500}
              />
              <span className="text-sm text-gray-500">
                {formData.inspiration.length}/500 caracteres
              </span>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Preferencias de Contacto</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ¿Cómo prefieres que te contacte? *
              </label>
              <div className="space-y-3">
                {['Email', 'Teléfono', 'WhatsApp', 'Videollamada'].map((method) => (
                  <label key={method} className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value={method}
                      checked={formData.preferredContact === method}
                      onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                      className="mr-3 text-blue-600"
                    />
                    {method}
                  </label>
                ))}
              </div>
              {errors.preferredContact && <ErrorMessage error={errors.preferredContact} />}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Urgencia del Proyecto
              </label>
              <div className="space-y-3">
                {['Muy urgente', 'Urgente', 'Normal', 'Sin prisa'].map((urgency) => (
                  <label key={urgency} className="flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value={urgency}
                      checked={formData.urgency === urgency}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                      className="mr-3 text-blue-600"
                    />
                    {urgency}
                  </label>
                ))}
              </div>
            </div>

            {/* Verificación Anti-Spam */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verificación de Seguridad *
              </label>
              <p className="text-sm text-gray-600 mb-3">
                {antiSpamQuestion.question}
              </p>
              <input
                type="text"
                value={antiSpamAnswer}
                onChange={(e) => setAntiSpamAnswer(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.antiSpam ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tu respuesta..."
                required
              />
              {errors.antiSpam && <ErrorMessage error={errors.antiSpam} />}
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Resumen de tu Solicitud</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Proyecto:</strong> {formData.projectType}</p>
                <p><strong>Presupuesto:</strong> {formData.budget === 'custom' ? `€${formData.customBudget} (personalizado)` : formData.budget}</p>
                <p><strong>Plazo:</strong> {formData.timeline}</p>
                <p><strong>Características:</strong> {formData.features.length} seleccionadas</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Solicita tu Presupuesto
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cuéntame sobre tu proyecto y te enviaré una propuesta personalizada en menos de 24 horas
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-gray-50 px-8 py-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Paso {currentStep} de 4
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round((currentStep / 4) * 100)}% completado
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Content */}
            <form 
              onSubmit={handleSubmit} 
              className="p-8"
            >
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isSubmitting 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {submitStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <p className="font-medium">Error al enviar la solicitud</p>
                  </div>
                  <p className="text-red-700 text-sm mt-1">
                    Por favor, inténtalo de nuevo o contacta directamente por email: info.danipereira@gmail.com
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">¿Prefieres contactar directamente?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:info.danipereira@gmail.com"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Mail className="w-5 h-5" />
              info.danipereira@gmail.com
            </a>
            <span className="hidden sm:block text-gray-300">|</span>
            <a
              href="https://wa.me/34644669828"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <Phone className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;