// Casos de éxito del rediseño.
// Pendiente: Dani rellena estos casos con clientes reales (nombre, servicios,
// resultado y enlace). Mientras la lista esté vacía, la sección no se muestra.

export type CaseItem = {
  name: string;
  services: string[];
  result: string;
  href: string;
  image?: string;
};

export const CASES: CaseItem[] = [];
