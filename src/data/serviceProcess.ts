// Proceso de trabajo compartido por las páginas de servicio (página web,
// tienda online, mantenimiento). Mismo esquema en las tres para que el
// cliente reconozca la forma de trabajar de PereiraWeb en cualquier página.
export interface ServiceProcessStep {
  number: string;
  title: string;
  description: string;
}

export const defaultServiceProcess: ServiceProcessStep[] = [
  {
    number: '1',
    title: 'Nos cuentas qué necesitas',
    description:
      'Nos explicas tu negocio, tu proyecto y qué necesitas conseguir con la web.',
  },
  {
    number: '2',
    title: 'Analizamos el alcance',
    description:
      'Revisamos qué incluye el proyecto: estructura, funcionalidades, contenidos y plazos.',
  },
  {
    number: '3',
    title: 'Preparamos una propuesta',
    description:
      'Recibes una propuesta cerrada con alcance, plazos y opciones de pago antes de empezar.',
  },
  {
    number: '4',
    title: 'Diseñamos, desarrollamos o mantenemos',
    description:
      'Trabajamos tu proyecto con una base técnica sólida y comunicación directa durante todo el proceso.',
  },
  {
    number: '5',
    title: 'Revisamos y acompañamos',
    description:
      'Revisamos el resultado contigo y te acompañamos tras la publicación o durante el servicio contratado.',
  },
];
