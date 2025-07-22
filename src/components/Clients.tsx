import React, { useEffect } from 'react';
import { Star, Award, TrendingUp, Users } from 'lucide-react';

const Clients = () => {
  const clients = [
    // Empresas grandes primero
    { name: "Acciona", sector: "Energía e Infraestructuras" },
    { name: "Ferrovial", sector: "Construcción y Servicios" },
    { name: "Banco Santander", sector: "Servicios Financieros" },
    { name: "Inditex", sector: "Moda y Retail" },
    // Empresas medianas y pequeñas
    { name: "Gastro Garden", sector: "Restauración y Gastronomía" },
    { name: "Chicxsdelacalle", sector: "Moda Urbana" },
    { name: "Confusion Wear", sector: "Moda y Streetwear" },
    { name: "Camisetas Ahora", sector: "Textil y Personalización" },
    { name: "El Viaje de los Elefantes", sector: "Turismo y Viajes" },
    { name: "Algo que Apostar", sector: "Entretenimiento" },
    { name: "Carper Sonido", sector: "Audio y Tecnología" },
    { name: "Hastalavista", sector: "Servicios Digitales" }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "100+", label: "Clientes Satisfechos" },
    { icon: <Award className="w-8 h-8" />, number: "200+", label: "Proyectos Completados" },
    { icon: <Star className="w-8 h-8" />, number: "5⭐", label: "Valoración Media" },
    { icon: <TrendingUp className="w-8 h-8" />, number: "+10", label: "Años de Experiencia" }
  ];

  // Duplicamos los clientes para el efecto infinito
  const duplicatedClients = [...clients, ...clients];

  return (
    <section id="clients" className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Proyectos en los que he Participado
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            He colaborado en proyectos diversos, desde startups hasta grandes corporaciones, 
            aportando mi experiencia en desarrollo web y soluciones digitales
          </p>
        </div>

        {/* Infinite Horizontal Scroll */}
        <div className="relative mb-20">
          <div className="overflow-hidden">
            <div className="flex animate-scroll-infinite">
              {duplicatedClients.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 mx-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
                >
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                    {client.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{client.sector}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient overlays para efecto fade */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;