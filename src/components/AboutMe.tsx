import React from 'react';
import { X, User, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutMeProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  
  if (!isOpen) return null;

  const content = {
    title: "Sobre Mí",
    text: `Soy un desarrollador autodidacta y naturalmente curioso (un caso clásico de TDAH, seamos honestos). Mi primera experiencia con el código surgió por necesidad: romper, arreglar y reconstruir una tienda online para el negocio de música y audio de mi familia sin conocimiento previo. Fue entonces cuando me di cuenta de lo mucho que disfruto este mundo.

Antes de eso, pasé la mitad de mi vida tocando la batería, y aunque la programación es ahora mi día a día, la música sigue siendo una gran parte de quien soy.

Me veo como alguien alegre, cercano, abierto y con buen sentido del humor, pero también profundamente comprometido, especialmente con las causas sociales. He sido voluntario en diferentes proyectos apoyando a migrantes en situaciones vulnerables, y no tengo miedo de hablar de cosas que importan, siempre desde un lugar honesto y con una mentalidad de crecimiento personal continuo.

Me gusta el punk rock y me encanta viajar para asistir a festivales por todas partes. Cuando logro vencer la procrastinación, el deporte también juega un papel clave en mi vida, especialmente el boxeo, que me ayuda tanto física como mentalmente.

Creo que soy un buen compañero de equipo, y realmente disfruto ayudar a otros y ser ayudado a cambio. Y sí, en muchos sentidos, sigo siendo ese niño de 14 años emocionado por descubrir cosas nuevas... solo que ahora con más herramientas, más cicatrices, y constantemente desaprendiendo y reconstruyéndome.`,
    curriculum: "Mi currículum completo lo encontrarás en mi LinkedIn:",
    linkedinText: "Ver LinkedIn"
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">
              {t('about.title')}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Profile Image Placeholder */}
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <img 
                  src="/dpg.webp" 
                  alt="Dani Pereira - Desarrollador Web"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="prose max-w-none">
              <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                {content.text.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* LinkedIn Section */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">{content.curriculum}</h3>
              <a
                href="https://www.linkedin.com/in/dani-pereira-396618226/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                {content.linkedinText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;