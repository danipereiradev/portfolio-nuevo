import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Bruno Tomás",
      company: "El Viaje de los Elefantes",
      website: "elviajedeloselefantes.com",
      date: "17/5/2025",
      text: "Daniel es un gran profesional. Me ha hecho dos páginas webs para mis dos proyectos profesionales los cuales son de campos totalmente diferentes. Y en ambos he quedado muy satisfecho, pues entendió mi idea para plasmarla en cada página. Además también me dio ideas para que fueran más atractivas.",
      highlight: "Estoy muy contento con el resultado. Volvería a trabajar con él sin ninguna duda.",
      rating: 5,
      avatar: "BT"
    },
    {
      name: "Carlos Rodríguez",
      company: "Carper Sonido",
      website: "carper-sonido.com",
      date: "17/5/2025",
      text: "Trabajar con Dani ha sido una de las mejores decisiones que hemos tomado para nuestra presencia online. Nos desarrolló una web 100% a medida, sin plantillas, con un diseño limpio y bien pensado, utilizando WordPress como backend pero construida con HTML, CSS y JavaScript.",
      highlight: "Además de eso, nos integró una tienda online sencilla con Shopify y se encargó del SEO on page. Gracias a ese trabajo, hoy aparecemos en las primeras posiciones de Google para búsquedas clave como 'alquiler sonido en Vigo', 'comprar sonido en Vigo' o 'servicio técnico sonido en Vigo'.",
      extraText: "Desde entonces, nuestro negocio ha crecido mucho: pasamos de ser una persona a formar un equipo de tres, y seguimos en expansión. Dani entiende lo que necesita cada proyecto y lo hace fácil, sin tecnicismos y sin hacerte sentir fuera, algo que es muy importante para los que no tenemos ni idea de informática.",
      rating: 5,
      avatar: "CR"
    }
  ];

  // Auto-scroll del carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Cambia cada 8 segundos para dar tiempo a leer

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTest = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lo que Dicen Mis Clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Testimonios reales de empresarios que han confiado en mi trabajo para transformar su presencia digital
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-white/20">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-20 h-20 text-blue-600" />
            </div>

            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(currentTest.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Main Text */}
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 text-center">
              "{currentTest.text}"
            </blockquote>

            {/* Highlight Text */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
              <p className="text-blue-800 font-medium italic">
                "{currentTest.highlight}"
              </p>
            </div>

            {/* Extra Text for Carlos */}
            {currentTest.extraText && (
              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                {currentTest.extraText}
              </p>
            )}

            {/* Author Info */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {currentTest.avatar}
              </div>
              <div className="text-center">
                <h4 className="font-bold text-gray-900 text-lg">{currentTest.name}</h4>
                <p className="text-blue-600 font-medium">{currentTest.company}</p>
                <p className="text-gray-500 text-sm">{currentTest.website}</p>
                <p className="text-gray-400 text-xs">{currentTest.date}</p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  index === currentTestimonial 
                    ? 'bg-blue-600 scale-110' 
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