import {
  formatEuro,
  MAINTENANCE_INFRA_MONTHLY_AMOUNT,
  MAINTENANCE_INFRA_PAYMENT_ID,
  MAINTENANCE_INFRA_SETUP_AMOUNT,
  paymentPath,
} from './payments';

export const getMaintenanceInfraSetupLabel = (): string =>
  `${formatEuro(MAINTENANCE_INFRA_SETUP_AMOUNT)} + IVA`;

export const getMaintenanceInfraMonthlyLabel = (): string =>
  `${formatEuro(MAINTENANCE_INFRA_MONTHLY_AMOUNT)} + IVA / mes`;

export const MAINTENANCE_INFRA_PAY_PATH = paymentPath(
  MAINTENANCE_INFRA_PAYMENT_ID,
);

export const MAINTENANCE_INFRA_MONTHLY_INCLUDES = [
  'Mantenimiento y actualización de WordPress, plugins y plantilla',
  'Revisión técnica periódica',
  'Revisión de seguridad e implantación de mejoras',
  'Monitorización automatizada 24/7 de disponibilidad y seguridad',
  'Copias de seguridad externas al hosting',
  'Recuperación desde backup ante incidencias',
  'Gestión técnica del hosting',
  'Gestión de hasta 6 cuentas de correo corporativo',
  'Soporte y asesoramiento telefónico',
  'Gestión de incidencias de web, hosting y correo',
  'Revisión básica de rendimiento',
  'Hasta 2 horas mensuales de soporte y pequeñas actuaciones',
  'Respuesta laboral objetivo ≤ 24 h',
] as const;

export const MAINTENANCE_INFRA_SETUP_INCLUDES = [
  'Revisión inicial de WordPress',
  'Revisión de plugins, plantilla y usuarios',
  'Revisión del estado de seguridad',
  'Revisión de hosting y correo',
  'Revisión del sistema actual de copias',
  'Configuración de monitorización',
  'Configuración de backups externos',
  'Validación general del estado técnico antes de asumir el mantenimiento',
] as const;

export const MAINTENANCE_INFRA_CONDITIONS = [
  'La monitorización 24/7 es automatizada. La atención e intervención técnica se realiza dentro del horario y tiempos de respuesta establecidos.',
  'Las 2 horas mensuales no son acumulables.',
  'No están incluidos los costes de hosting, dominio, correo, licencias o servicios de terceros.',
  'Nuevos desarrollos, rediseños, nuevas funcionalidades o trabajos fuera del mantenimiento habitual se presupuestarán aparte.',
  'Si durante la puesta en marcha se detecta malware, una instalación previamente comprometida o una incidencia grave preexistente, se valorará antes de realizar trabajos adicionales.',
] as const;
