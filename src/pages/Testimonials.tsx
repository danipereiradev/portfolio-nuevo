import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import ReactPlayer from 'react-player';

export const TestimonialsPage = () => {
  return (
    <>
      <Hero
        title='Volvería a trabajar con el sin ninguna duda'
        description='Estos son algunos highlights de las reseñas de nuestros clientes'
        backgroundUrl='public/img/web-design-charlesdeluvio.webp'
        buttonText='Ver reseñas'
        heroType='video'
        videoUrl='public/video/juanvi-testimonio.mp4'
      />
      <Testimonials />
    </>
  );
};
