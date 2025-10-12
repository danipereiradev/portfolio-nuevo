import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Portfolio = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      title: t('portfolio.delish.title'),
      description: t('portfolio.delish.desc'),
      image:
        'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'CSS3'],
      category: t('contact.project.ecommerce'),
      url: 'https://delishvegan.com',
    },
    {
      title: t('portfolio.carper.title'),
      description: t('portfolio.carper.desc'),
      image:
        'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['WordPress', 'HTML5', 'CSS3', 'JavaScript'],
      category: t('contact.project.corporate'),
      url: 'https://carpersonido.com',
    },
    {
      title: t('portfolio.chicxs.title'),
      description: t('portfolio.chicxs.desc'),
      image:
        'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['WordPress', 'WooCommerce', 'CSS3', 'JavaScript'],
      category: t('contact.project.ecommerce'),
      url: 'https://chicxsdelacalle.com',
    },
    {
      title: t('portfolio.confusion.title'),
      description: t('portfolio.confusion.desc'),
      image:
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
      category: 'Fashion',
      url: 'https://confusionwear.com',
    },
    {
      title: t('portfolio.camisetas.title'),
      description: t('portfolio.camisetas.desc'),
      image:
        'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['WordPress', 'WooCommerce', 'jQuery', 'CSS3'],
      category: t('contact.project.ecommerce'),
      url: 'https://camisetas-ahora.com',
    },
    {
      title: t('portfolio.elefantes.title'),
      description: t('portfolio.elefantes.desc'),
      image:
        'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['WordPress', 'CSS3', 'JavaScript', 'PHP'],
      category: 'Influencer/Travel',
      url: 'https://elviajedeloselefantes.com',
    },
    {
      title: t('portfolio.alicornio.title'),
      description: t('portfolio.alicornio.desc'),
      image:
        'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['WordPress', 'Elementor', 'SEO', 'CSS3'],
      category: t('contact.project.corporate'),
      url: 'https://oalicornio.com',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id='portfolio' className='py-20 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            {t('portfolio.title')}
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            {t('portfolio.description')}
          </p>
        </div>

        <div className='relative max-w-6xl mx-auto'>
          {/* Carousel Container */}
          <div className='overflow-hidden rounded-3xl shadow-2xl'>
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className='min-w-full'>
                  <div className='grid lg:grid-cols-2 gap-0 bg-white'>
                    {/* Project Image */}
                    <div className='relative overflow-hidden group'>
                      <img
                        src={project.image}
                        alt={project.title}
                        className='w-full h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-700'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                      <div className='absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <span className='bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800'>
                          {project.category}
                        </span>
                      </div>

                      {/* Navigation Arrows - Positioned over the image */}
                      <button
                        onClick={prevSlide}
                        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100'
                      >
                        <ChevronLeft className='w-6 h-6 text-gray-700' />
                      </button>
                      <button
                        onClick={nextSlide}
                        className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100'
                      >
                        <ChevronRight className='w-6 h-6 text-gray-700' />
                      </button>
                    </div>

                    {/* Project Info */}
                    <div className='p-8 lg:p-12 flex flex-col justify-center text-center lg:text-left'>
                      <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-4'>
                        {project.title}
                      </h3>
                      <p className='text-gray-600 text-lg leading-relaxed mb-6'>
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className='flex flex-wrap gap-2 mb-6 justify-center lg:justify-start'>
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className='bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200'
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className='flex gap-4 justify-center lg:justify-start'>
                        <a
                          href={project.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200'
                        >
                          <ExternalLink className='w-4 h-4' />
                          {t('portfolio.view')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className='flex justify-center mt-8 gap-2'>
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
