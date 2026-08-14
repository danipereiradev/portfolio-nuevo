import { useLanguage } from '../contexts/LanguageContext';
import { useContactModal } from '../contexts/ContactModalContext';
import {
  trackButtonClick,
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import { DEFAULT_WHATSAPP_MESSAGE, buildWhatsAppUrl } from '../config/contact';
import Button from './Button';
import { Mail } from 'lucide-react';

const WHATSAPP_URL = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

const Hero = () => {
  const { t } = useLanguage();
  const { openModal } = useContactModal();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Hero', t('hero.cta.whatsapp'));
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  const handleRequestProposal = () => {
    trackButtonClick('Solicitar propuesta', 'Hero');
    openModal();
  };

  const handleViewPortfolio = () => {
    trackButtonClick('Ver trabajos', 'Hero');
    scrollToSection('portfolio');
  };

  return (
    <section
      id='hero'
      style={{
        backgroundImage: 'url("/img/hero-bg-texture.avif")',
      }}
      className='relative bg-no-repeat bg-center bg-cover flex items-center overflow-hidden text-ink-dark pt-[var(--site-header-h)] pb-14 min-h-[70vh] md:pb-0 md:min-h-[100svh]'
    >
      <div className='bg-white opacity-50 absolute w-full inset-0'></div>

      <div className='flex md:flex-row flex-col hero-container max-w-6xl mx-auto items-center text-center'>
        <div className='mt-12 md:mt-0 pr-8 md:w-1/2 z-10 p-4 my-8'>
          <h1 className='text-5xl md:text-6xl font-extrabold text-gray-900 mb-6'>
            Agencia de diseño web y marketing digital
          </h1>
          <p className='text-xl md:text-2xl text-black'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quia veritatis voluptatibus, dicta id reprehenderit deserunt culpa
            corporis corrupti accusantium.
          </p>
          <Button className='mx-auto mt-4'>LLÁMANOS</Button>
        </div>

        <div className='flex justify-center items-center md:w-1/2 z-10 p-4'>
          <form
            className='bg-ink-dark md:w-[470px] rounded-2xl justify-center p-8'
            action=''
          >
            <h2 className='text-3xl md:text-4xl font-extrabold text-neutral-300 text-center mt-4 mb-0'>
              Nosotros te llamamos!
            </h2>
            <p className='text-neutral-300 text-center text-lg'>
              Envíanos tus datos y nosotros te contactamos
            </p>
            <div className='form-fields flex flex-col gap-4 mt-12'>
              <div className='name-fields flex flex-col md:flex-row gap-4'>
                <input
                  type='text'
                  /* value={formData.name} */
                  /*  onChange={(e) => handleInputChange('name', e.target.value)} */
                  className='md:w-1/2 text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent transition-all duration-150'
                  placeholder='Nombre*'
                  maxLength={50}
                />
                <input
                  type='text'
                  /* value={formData.name} */
                  /*  onChange={(e) => handleInputChange('name', e.target.value)} */
                  className='md:w-1/2 text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent transition-all duration-150'
                  placeholder='Apellidos'
                  maxLength={50}
                />
              </div>

              <input
                type='email'
                /* value={formData.email} */
                /* onChange={(e) => handleInputChange('email', e.target.value)} */
                className='w-full text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent transition-all duration-150'
                placeholder='tu@email.com*'
                autoComplete='email'
              />

              <input
                type='tel'
                /*  value={formData.phone} */
                /* onChange={(e) => handleInputChange('phone', e.target.value)} */
                className='w-full text-2xl pl-4 pr-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:border-accent transition-all duration-150'
                placeholder='Teléfono*'
                autoComplete='tel'
                inputMode='tel'
              />
              <textarea
                /* value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                } */
                rows={3}
                className='w-full p-4 border-2 rounded-lg bg-white focus:outline-none focus:border-accent focus:shadow-[3px_3px_0_0_#14b8a6] transition-all duration-150 text-md'
                placeholder='Cuentanos que crees que necesitas para aumentar las visitas o las ventas de tu negocio...'
                maxLength={500}
              />
              <label className='flex items-start gap-2 cursor-pointer'>
                <span className='relative flex-shrink-0 text-neutral-300 flex items-center justify-center w-11 h-11 -ml-2 -mt-1 md:w-5 md:h-5 md:ml-0 md:mt-0.5'>
                  <input
                    type='checkbox'
                    /*  checked={formData.consent} */
                    /* onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              consent: e.target.checked,
                            }));
                            if (errors.consent) {
                              setErrors((prev) => ({ ...prev, consent: '' }));
                            }
                          }} */
                    className='w-6 h-6 md:w-12 md:h-12 accent-accent border-2 border-ink-dark rounded'
                  />
                </span>
                <span className='text-md italic text-neutral-300 leading-relaxed pt-2 md:pt-0 text-start'>
                  He leido y acepto la política de privacidad
                </span>
              </label>
              <Button className='place-self-center'>ENVIAR</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
