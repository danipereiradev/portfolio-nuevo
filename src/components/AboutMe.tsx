import React from 'react';
import { X, User, ExternalLink, Briefcase, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutMeProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const experience = [
    {
      company: 'Kelea',
      role: 'Front-end Software Developer',
      period: 'Junio 2024 - Presente',
      location: 'A Coruña, Galicia',
      description:
        'Desarrollo front-end en proyectos para <strong>Inditex</strong> utilizando tecnologías modernas.',
    },
    {
      company: 'Babel',
      role: 'Front-end Software Developer',
      period: 'Julio 2021 - Enero 2024',
      location: 'Barcelona',
      description:
        'Desarrollo front-end para diversos clientes corporativos. Actualización de código legacy a React 17-18, corrección de bugs y mejoras de rendimiento. Creación de UI completas desde cero usando React, React Query, React Testing Library, Tailwind y Konvajs. Trabajo en proyectos para empresas como <strong>Banco Santander Alemania</strong>, <strong>Ferrovial</strong>, <strong>Acciona</strong> y <strong>Xacobeo 21/22</strong>.',
    },
    {
      company: 'Pg Webs',
      role: 'Freelance Web Designer',
      period: 'Septiembre 2016 - Abril 2022',
      location: 'Logroño, La Rioja',
      description: 'Diseño y desarrollo web freelance para diversos clientes.',
    },
    {
      company: 'Grupo Reprogalicia',
      role: 'Web Designer',
      period: 'Marzo 2016 - Junio 2016',
      location: 'Galicia',
      description:
        'Migración completa de e-commerce, actualización de diseño y funcionalidad usando CSS y Bootstrap. Mejora significativa en tasas de accesibilidad y UX.',
    },
  ];
  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <User className='w-6 h-6 text-blue-600' />
            <h2 className='text-xl font-bold text-gray-900'>
              {t('about.title')}
            </h2>
          </div>

          <div className='flex items-center gap-4'>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
            >
              <X className='w-6 h-6 text-gray-500' />
            </button>
          </div>
        </div>

        <div className='p-6 overflow-y-auto max-h-[calc(90vh-80px)]'>
          <div className='space-y-8'>
            {/* Profile Image */}
            <div className='flex justify-center mb-8'>
              <div className='w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white'>
                <img
                  src='/dpg.webp'
                  alt='Dani Pereira - Desarrollador Web'
                  className='w-full h-full object-cover'
                />
              </div>
            </div>

            {/* Personal Story */}
            <div className='prose max-w-none'>
              <div className='text-gray-700 leading-relaxed space-y-4'>
                <p>
                  Soy un desarrollador autodidacta y naturalmente curioso (un
                  caso clásico de TDAH, seamos honestos). Mi primera experiencia
                  con el código surgió por necesidad: romper, arreglar y
                  reconstruir una tienda online para el negocio de música y
                  audio de mi familia sin conocimiento previo. Fue entonces
                  cuando me di cuenta de lo mucho que disfruto este mundo.
                </p>
                <p>
                  Antes de eso, pasé la mitad de mi vida tocando la batería, y
                  aunque la programación es ahora mi día a día, la música sigue
                  siendo una gran parte de quien soy.
                </p>
                <p>
                  Me veo como alguien alegre, cercano, abierto y con buen
                  sentido del humor, pero también profundamente comprometido,
                  especialmente con las causas sociales. He sido voluntario en
                  diferentes proyectos apoyando a migrantes en situaciones
                  vulnerables, y no tengo miedo de hablar de cosas que importan,
                  siempre desde un lugar honesto y con una mentalidad de
                  crecimiento personal continuo.
                </p>
                <p>
                  Me gusta el punk rock y me encanta viajar para asistir a
                  festivales por todas partes. Cuando logro vencer la
                  procrastinación, el deporte también juega un papel clave en mi
                  vida, especialmente el boxeo, que me ayuda tanto física como
                  mentalmente.
                </p>
              </div>
            </div>

            {/* Experience Section */}
            <div className='border-t border-gray-200 pt-6'>
              <div className='flex items-center gap-2 mb-6'>
                <Briefcase className='w-6 h-6 text-blue-600' />
                <h3 className='text-2xl font-bold text-gray-900'>
                  Experiencia Profesional
                </h3>
              </div>

              <div className='space-y-6'>
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className='bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-200 hover:shadow-md transition-shadow duration-200'
                  >
                    <div className='flex flex-col md:flex-row md:items-start md:justify-between mb-3'>
                      <div>
                        <h4 className='text-lg font-bold text-gray-900'>
                          {job.company}
                        </h4>
                        <p className='text-blue-700 font-medium'>{job.role}</p>
                      </div>
                      <div className='flex items-center gap-2 text-gray-600 text-sm mt-2 md:mt-0'>
                        <Calendar className='w-4 h-4' />
                        <span>{job.period}</span>
                      </div>
                    </div>
                    <p className='text-sm text-gray-500 mb-2'>{job.location}</p>
                    <p
                      className='text-gray-700 leading-relaxed'
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* LinkedIn Section */}
            <div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
              <h3 className='font-semibold text-blue-900 mb-3'>
                Mi currículum completo lo encontrarás en mi LinkedIn:
              </h3>
              <a
                href='https://www.linkedin.com/in/dani-pereira-396618226/'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium'
              >
                <ExternalLink className='w-5 h-5' />
                Ver LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
