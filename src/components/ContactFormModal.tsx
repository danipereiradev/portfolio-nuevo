import { X } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import ContactForm from './ContactForm';
import { useEffect } from 'react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

const ContactFormModal = () => {
  const { isOpen, closeModal, preselectedPlan } = useContactModal();

  useBodyScrollLock(isOpen);

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
      className='fixed inset-0 z-[9999] flex items-center justify-center md:p-4'
      onClick={closeModal}
    >
      <div className='absolute inset-0 bg-black/70 backdrop-blur-sm hidden md:block' />

      <div
        className='relative bg-white md:rounded-lg md:border-2 md:border-ink-dark md:shadow-[8px_8px_0_0_#1a1a1a] w-full md:max-w-4xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto overscroll-contain'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className='sticky top-4 right-4 float-right z-10 p-2 bg-white border-2 border-ink-dark rounded-full shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
          aria-label='Cerrar modal'
        >
          <X className='w-6 h-6 text-gray-700' />
        </button>

        <div className='p-6 md:p-8 pt-12'>
          <ContactForm preselectedPlan={preselectedPlan} isInModal={true} />
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;
