import { useState } from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  id?: string;
}

const Testimonials = ({ id = 'testimonials' }: TestimonialsProps = {}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials = [
    {
      name: 'Arantxa',
      company: 'Mobile One2One, S.L.',
      website: 'https://www.o2ods.com/',
      date: '27/11/2025',
      text: 'Durante el tiempo que ha durado la colaboración con Daniel, ha quedado en evidencia que es un desarrollador altamente competente, con un enfoque claro en la excelencia técnica y la experiencia de usuario.',
      highlight:
        'Ha demostrado un dominio sobresaliente de frameworks modernos, una gran sensibilidad por el diseño y un compromiso constante con la calidad.',
      rating: 5,
      avatar: 'A',
    },
    {
      name: 'Víctor',
      company: 'O Alicornio - Casa Rural',
      website: 'oalicornio.com',
      date: '15/3/2024',
      text: 'Dani me ayudó a crear la web de mi casa rural en O Courel cuando estaba empezando. Necesitaba algo sencillo pero profesional, y él lo consiguió.',
      highlight:
        'Gracias a la web, la casa está llena todos los fines de semana de primavera y verano. No me lo esperaba tan rápido.',
      rating: 5,
      avatar: 'V',
    },
    {
      name: 'Alex',
      company: 'Confusion Wear',
      website: 'confusionwear.com',
      date: '22/8/2023',
      text: 'Teníamos web pero necesitábamos un cambio urgente. El diseño estaba anticuado y no nos posicionábamos en Google. Dani vino, hizo un rediseño completo.',
      highlight:
        'Los resultados se notaron en semanas. Empezamos a aparecer en búsquedas y las visitas desde Google se multiplicaron.',
      rating: 5,
      avatar: 'A',
    },
    {
      name: 'Sumera',
      company: 'Delish Vegan Madrid',
      website: 'delishvegann.com',
      date: '10/11/2023',
      text: 'We needed a complete e-commerce solution for our vegan bakery and Dani delivered beyond our expectations. The shop is beautiful, easy to manage.',
      highlight:
        'He integrated our delivery system perfectly and the national shipping works flawlessly. Our online orders have tripled!',
      rating: 4,
      avatar: 'S',
    },
    {
      name: 'Irene',
      company: 'Chicxsdelacalle',
      website: 'chicxsdelacalle.com',
      date: '5/6/2022',
      text: 'Tengo una tienda online de merchandising de bandas y Dani me hizo la web desde cero. Entendió perfectamente el rollo que buscaba.',
      highlight:
        'Siempre que necesito algo, me atiende al momento. Nunca me he quedado tirada, y eso en este negocio es ORO.',
      rating: 5,
      avatar: 'I',
    },
    {
      name: 'Irene',
      company: 'Camisetas Ahora',
      website: 'camisetas-ahora.com',
      date: '18/9/2021',
      text: 'Esta fue mi primera web con Dani y después repetí con otro proyecto. Para Camisetas Ahora necesitaba algo funcional y directo.',
      highlight:
        'La plataforma funciona perfecta, los clientes pueden personalizar sus camisetas sin problemas y el sistema de pedidos es muy fiable.',
      rating: 5,
      avatar: 'I',
    },
    {
      name: 'Bruno Tomás',
      company: 'El Viaje de los Elefantes',
      website: 'elviajedeloselefantes.com',
      date: '17/5/2025',
      text: 'Daniel es un gran profesional. Me ha hecho dos páginas webs para mis dos proyectos profesionales los cuales son de campos totalmente diferentes.',
      highlight:
        'Estoy muy contento con el resultado. Volvería a trabajar con él sin ninguna duda.',
      rating: 5,
      avatar: 'BT',
    },
    {
      name: 'Carlos Rodríguez',
      company: 'Carper Sonido',
      website: 'carper-sonido.com',
      date: '17/5/2025',
      text: 'Trabajar con Dani ha sido una de las mejores decisiones que hemos tomado para nuestra presencia online. Nos desarrolló una web 100% a medida.',
      highlight:
        "Hoy aparecemos en las primeras posiciones de Google para búsquedas clave como 'alquiler sonido en Vigo' y 'comprar sonido en Vigo'.",
      rating: 5,
      avatar: 'CR',
    },
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  // Swipe handlers para móvil
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  const getVisibleTestimonials = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return testimonials.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <section
      id={id}
      className='scroll-mt-24 py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden'
    >
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10'
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80'></div>
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Lo que Dicen Mis Clientes
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-6'>
            Testimonios reales de empresarios que han confiado en mi trabajo
            para transformar su presencia digital
          </p>

          {/* Rating */}
          <div className='flex items-center justify-center gap-3 flex-wrap'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 272 92'
              className='h-8 w-auto'
              aria-label='Google'
            >
              <path fill='#EA4335' d='M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z'/>
              <path fill='#FBBC05' d='M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z'/>
              <path fill='#4285F4' d='M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z'/>
              <path fill='#34A853' d='M225 3v65h-9.5V3h9.5z'/>
              <path fill='#EA4335' d='M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z'/>
              <path fill='#4285F4' d='M35.29 41.41V32h31.77c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.79.36 15.69 16.32.23 35.37.23c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.67l-22.56.07z'/>
            </svg>
            <div className='flex items-center gap-1'>
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className='w-6 h-6 fill-yellow-400 text-yellow-400'
                />
              ))}
              <div className='relative'>
                <Star className='w-6 h-6 fill-yellow-200 text-yellow-200' />
                <div
                  className='absolute inset-0 overflow-hidden'
                  style={{ width: '80%' }}
                >
                  <Star className='w-6 h-6 fill-yellow-400 text-yellow-400' />
                </div>
              </div>
            </div>
            <span className='text-2xl font-bold text-gray-900'>4.8</span>
            <span className='text-gray-500'>/ 5</span>
          </div>
        </div>

        <div className='relative max-w-7xl mx-auto'>
          {/* Carousel Container */}
          <div 
            className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${currentSlide}-${index}`}
                className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 relative overflow-hidden border border-white/20 flex flex-col'
              >
                {/* Quote Icon */}
                <div className='absolute top-4 right-4 opacity-10'>
                  <Quote className='w-12 h-12 text-accent' />
                </div>

                {/* Stars */}
                <div className='flex items-center gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-5 h-5 text-yellow-400 fill-current'
                    />
                  ))}
                  {testimonial.rating < 5 && (
                    <Star className='w-5 h-5 text-yellow-200 fill-current' />
                  )}
                </div>

                {/* Main Text */}
                <blockquote className='text-sm text-gray-700 leading-relaxed mb-4 flex-grow'>
                  "{testimonial.text}"
                </blockquote>

                {/* Highlight Text */}
                {testimonial.highlight && (
                  <div className='bg-gray-50 border-l-4 border-accent p-3 rounded-r-lg mb-4'>
                    <p className='text-xs text-gray-800 font-medium italic'>
                      "{testimonial.highlight}"
                    </p>
                  </div>
                )}

                {/* Author Info */}
                <div className='mt-auto'>
                  <h4 className='font-bold text-gray-900 text-sm'>
                    {testimonial.name}
                  </h4>
                  <p className='text-accent font-medium text-xs'>
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className='flex justify-center mt-8 gap-3'>
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-accent scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
