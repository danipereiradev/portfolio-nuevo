/** Casos de aplicaciones del equipo. Las recreaciones se identifican expresamente. */
export const APP_PROJECTS = [
  {
    id: 'onygo',
    name: 'Onygo',
    sector: 'Movilidad · Android e iOS',
    description: 'Una app para que conductores y pasajeros compartan sus desplazamientos diarios, tanto habituales como puntuales.',
    contribution: 'Desarrollo completo del frontend para Android e iOS, con mapas, geolocalización y búsqueda de rutas.',
    technologies: 'React Native · Expo · TypeScript · Mapbox',
    images: ['onygo-01.webp', 'onygo-02.webp', 'onygo-03.webp'],
    url: 'https://play.google.com/store/apps/details?id=es.onygo.onygomobileapp&hl=es',
    linkLabel: 'Ver en Google Play',
  },
  {
    id: 'score-padel',
    name: 'Score Padel',
    sector: 'Deporte · Web y Android TV',
    description: 'Configuración de partidos de pádel y marcadores en tiempo real, con las reglas del juego y anuncios entre cambios de campo y de set.',
    contribution: 'Desarrollo del frontend del marcador para Android TV y de la herramienta de configuración de partidos, con apoyo al backend.',
    technologies: 'React · React Native · Expo · TypeScript · Node.js · MongoDB',
    images: ['score-padel-01.webp', 'score-padel-02.webp', 'score-padel-03.webp', 'score-padel-04.webp'],
    url: 'https://scorepadel.es/',
    linkLabel: 'Visitar proyecto',
  },
  {
    id: 'lets-play',
    name: 'Let’s Play',
    sector: 'Ocio · Aplicación web',
    description: 'Una plataforma de juegos para bares y espacios de ocio. Los usuarios participan desde el móvil y juegan directamente en el navegador.',
    contribution: 'Desarrollo de la plataforma y de la mayoría de sus juegos, con colaboración en el backend y coordinación del desarrollo.',
    technologies: 'React · TypeScript · Node.js · Express · MongoDB',
    images: ['lets-play-01.webp', 'lets-play-02.webp', 'lets-play-03.webp'],
  },
  {
    id: 'asistente-educativo',
    name: 'Asistente educativo con IA',
    sector: 'Educación · Aplicación web',
    description: 'Un chatbot para un centro educativo público, con conversaciones y documentos de apoyo en una misma herramienta.',
    contribution: 'Interfaz de chat y panel de administración, con historial de conversaciones, archivos adjuntos y gestión de usuarios.',
    technologies: 'Aplicación web · Chat con IA · Panel de administración',
    images: ['asistente-educativo-recreacion.webp'],
    illustration: true,
  },
] as const;
export type AppProject = (typeof APP_PROJECTS)[number];
export const appImage = (file: string) => `/img/portfolio/apps/${file}`;
