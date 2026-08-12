// Proceso de trabajo compartido por tienda online y mantenimiento.
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
      'Qué vendes, qué web tienes ahora o qué te falla. WhatsApp vale.',
  },
  {
    number: '2',
    title: 'Miramos el alcance',
    description:
      'Páginas, catálogo, cambios mensuales… lo concreto, no un pack genérico.',
  },
  {
    number: '3',
    title: 'Te enviamos la propuesta',
    description:
      'Precio, plazos y qué entra. Si no te cuadra, no pasa nada.',
  },
  {
    number: '4',
    title: 'Trabajamos el proyecto',
    description:
      'Diseño, desarrollo o el plan de mantenimiento. Hablas con quien lo hace.',
  },
  {
    number: '5',
    title: 'Revisión y puesta en marcha',
    description:
      'Afinamos contigo, publicamos o activamos el plan, y te dejamos usándolo.',
  },
];
