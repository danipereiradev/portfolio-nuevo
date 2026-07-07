import { Award, Tag, ShoppingCart, Wallet, Clock, Send, MapPin } from 'lucide-react';

const trustPoints = [
  { icon: Award, text: '+12 años de experiencia' },
  { icon: Tag, text: 'Web desde 969€ IVA incluido' },
  { icon: ShoppingCart, text: 'Tienda online desde 1.799€ IVA incluido' },
  { icon: Wallet, text: 'Pago fraccionado disponible' },
  { icon: Clock, text: 'Entrega en 2-3 semanas' },
  { icon: Send, text: 'Propuesta en menos de 24h' },
  { icon: MapPin, text: 'Clientes en toda España' },
];

const TrustBar = () => {
  return (
    <section className='bg-white py-8 md:py-10 border-b border-gray-100'>
      <div className='mx-auto w-full max-w-screen-2xl px-6'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-6'>
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className='flex flex-col items-center text-center gap-2 px-2'
              >
                <div className='w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent'>
                  <Icon className='w-5 h-5 md:w-6 md:h-6' />
                </div>
                <p className='text-xs md:text-sm font-semibold text-gray-800 leading-snug'>
                  {point.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
