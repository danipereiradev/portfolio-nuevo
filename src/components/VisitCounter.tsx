import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

const NAMESPACE = 'danipereiraweb.es';
const KEY = 'visits';
const SESSION_KEY = 'dpw_visit_counted';

const VisitCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const registerVisit = async () => {
      try {
        if (!sessionStorage.getItem(SESSION_KEY)) {
          await fetch(
            `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`,
          );
          sessionStorage.setItem(SESSION_KEY, '1');
        }

        const response = await fetch(
          `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`,
        );
        const data = await response.json();

        if (typeof data.value === 'number') {
          setCount(data.value);
        }
      } catch {
        // Si falla el servicio, no mostramos el contador
      }
    };

    registerVisit();
  }, []);

  if (count === null) return null;

  return (
    <span className='inline-flex items-center gap-1.5 text-xs text-gray-500'>
      <Eye className='w-3.5 h-3.5 opacity-70' aria-hidden='true' />
      <span>{count.toLocaleString('es-ES')} visitas</span>
    </span>
  );
};

export default VisitCounter;
