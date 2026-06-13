import { X } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import ContactForm from './ContactForm';
import { useEffect } from 'react';

const ContactFormModal = () => {
  const { isOpen, closeModal, preselectedPlan } = useContactModal();

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-[9999] flex items-center justify-center p-4'
      onClick={closeModal}
    >
      {/* Overlay oscuro */}
      <div className='absolute inset-0 bg-black/70 backdrop-blur-sm' />

      {/* Contenedor del modal */}
      <div
        className='relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          onClick={closeModal}
          className='sticky top-4 right-4 float-right z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200'
          aria-label='Cerrar modal'
        >
          <X className='w-6 h-6 text-gray-700' />
        </button>

        {/* Formulario - sin el wrapper section */}
        <div className='p-6 md:p-8 pt-12'>
          <ContactForm preselectedPlan={preselectedPlan} isInModal={true} />
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;
