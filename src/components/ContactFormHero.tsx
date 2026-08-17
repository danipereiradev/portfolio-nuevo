import { useState } from 'react';
import Button from './Button';
import {
  trackFormError,
  trackGoogleAdsFormConversion,
  unlockGoogleAdsFormConversion,
} from '../utils/analytics';
import { markFormSubmissionSuccess } from '../config/formSubmission';
import { AlertCircle } from 'lucide-react';
import TestimonialsSingle from './TestimonialSingle';

interface ContactHeroFormHeroProps {
  title: string;
  description: string;
  page: string;
}

export const ContactFormHero = ({
  title,
  description,
  page,
}: ContactHeroFormHeroProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false,
    page,
  });

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

      const formDataToSend: Record<string, string | boolean> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        page,
        consent: formData.consent,

        submissionDate: new Date().toLocaleString('es-ES'),
        _subject: `Nueva Solicitud de Presupuesto - ${formData.name}`,
        _replyto: formData.email,
        message: `
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
consent: ${formData.consent}
page: ${page}
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

      const result = await response.json().catch(() => null);

      // Formspree confirma éxito con HTTP 2xx y { ok: true }.

      // Sin ambas condiciones no redirigimos ni disparamos conversión.
      if (!response.ok || !result || result.ok !== true) {
        throw new Error(
          result?.error ||
            result?.errors?.[0]?.message ||
            `Error ${response.status}: ${response.statusText}`,
        );
      }
      // Orden: Formspree OK , mostramos mensaje de agradecimiento y nos quedamos en la página

      trackGoogleAdsFormConversion();
      markFormSubmissionSuccess();
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

      setFormData({
        name: '',
        email: '',
        phone: '',
        consent: false,
        page,
      });
    }
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  /*   const validatePhone = (value: string): boolean => {
    const cleanPhone = value.replace(/[\s\-().]/g, '');
    // España: móvil/fijo (6/7/8/9 + 8 dígitos), con o sin +34 / 0034 / 34
    const spanishPhone = /^(?:\+34|0034|34)?[6789]\d{8}$/;
    // Internacional: + y entre 8 y 15 dígitos en total
    const internationalPhone = /^\+[1-9]\d{7,14}$/;
    return spanishPhone.test(cleanPhone) || internationalPhone.test(cleanPhone);
  }; */

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

    const emailValue = formData.email.trim();
    if (!emailValue || !validateEmail(emailValue)) {
      newErrors.email = 'Introduce un email válido';
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
    <div className='flex justify-end items-center md:w-1/2 z-10 '>
      <form
        onSubmit={handleSubmit}
        className='bg-[#f4f4f4] rounded-2xl justify-center p-12 w-3/4 shadow-xl'
        action=''
      >
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-extrabold text-black text-center mt-4 mb-0'>
          {title}
        </h2>
        <p className='text-gray-900 text-center text-lg'>{description}</p>
        <div className='form-fields flex flex-col gap-4 mt-12'>
          <input
            type='text'
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent transition-all duration-150 ${
              errors.name
                ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                : 'border-gray-400'
            }`}
            placeholder='Tu nombre *'
            maxLength={50}
          />
          {errors.name && <ErrorMessage error={errors.name} />}
          <input
            type='email'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent transition-all duration-150 ${
              errors.name
                ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                : 'border-gray-400'
            }`}
            placeholder='Tu email *'
            autoComplete='email'
          />
          {errors.email && <ErrorMessage error={errors.email} />}
          <input
            type='tel'
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent transition-all duration-150 ${
              errors.name
                ? 'border-accent shadow-[3px_3px_0_0_#14b8a6]'
                : 'border-gray-400'
            }`}
            placeholder='Tu teléfono'
            autoComplete='tel'
            inputMode='tel'
          />
          {errors.phone && <ErrorMessage error={errors.phone} />}

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
            <span className='text-xl italic text-gray-900 leading-relaxed pt-2 md:pt-0 text-start'>
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
            className='px-8 py-3 text-base w-full sm:w-auto'
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
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
              email: hola@pereiraweb.es. Disculpa las molestias.
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
