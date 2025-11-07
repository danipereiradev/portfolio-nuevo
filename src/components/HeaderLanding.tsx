import { useState } from 'react';
import { Code2, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import AboutMe from './AboutMe';

const HeaderLanding = () => {
  const [aboutMeOpen, setAboutMeOpen] = useState(false);

  return (
    <>
      <header className='fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md shadow-md'>
        <div className='container mx-auto px-6 py-3'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link to='/' className='flex items-center space-x-2'>
              <Code2 className='w-7 h-7 text-blue-600' />
              <span className='text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                DPW
              </span>
            </Link>

            {/* Right side - Sobre mí + Teléfono */}
            <div className='flex items-center gap-4'>
              <button
                onClick={() => setAboutMeOpen(true)}
                className='hidden md:block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200'
              >
                Sobre mí
              </button>

              <a
                href='tel:+34644669828'
                className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-blue-700 transition-all duration-200 shadow-md'
              >
                <Phone className='w-4 h-4' />
                <span className='hidden sm:inline'>+34 644 669 828</span>
                <span className='sm:hidden'>Llamar</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Me Modal */}
      <AboutMe isOpen={aboutMeOpen} onClose={() => setAboutMeOpen(false)} />
    </>
  );
};

export default HeaderLanding;

