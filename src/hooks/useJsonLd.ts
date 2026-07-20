import { useEffect } from 'react';

/**
 * Inyecta un bloque de datos estructurados Schema.org (JSON-LD) en el
 * <head> mientras el componente que lo usa está montado, y lo retira al
 * desmontar. Pensado para páginas concretas que necesitan su propio
 * Schema (p. ej. una landing con ofertas/servicios), sin tocar el
 * ProfessionalService global que ya vive en index.html ni el hook
 * usePageMeta (title/description/canonical/OG).
 *
 * `id` debe ser único por página para evitar colisiones si en el futuro
 * varias páginas usan este hook a la vez (no debería ocurrir en una SPA
 * con una sola ruta activa, pero evita sorpresas en HMR/dev).
 */
export const useJsonLd = (id: string, data: Record<string, unknown>) => {
  useEffect(() => {
    let script = document.getElementById(id) as HTMLScriptElement | null;
    const isNew = !script;

    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);

    return () => {
      if (isNew) {
        script?.remove();
      }
    };
  }, [id, data]);
};
