import {
  CONTACT_PATH,
  SITE_MAINTENANCE_PATH,
  SITE_SHOP_PATH,
  SITE_WEB_PATH,
} from '../config/contact';
import { BlogFigure } from '../components/BlogArticle';
import type { BlogPost } from './types';

const cuantoCuesta: BlogPost = {
  slug: 'cuanto-cuesta-una-pagina-web-profesional',
  title: 'Cuánto cuesta una página web profesional en 2026',
  description:
    'En 2026 una página web profesional en España suele ir de 590 € a 3.000 € + IVA, según alcance. Qué entra en el precio, qué no, y cómo pedimos presupuesto en 36web.',
  date: '2026-08-21',
  author: 'Equipo 36web',
  readingMinutes: 6,
  image: '/img/portfolio/new/carper.webp',
  imageAlt: 'Mock de página web profesional',
  category: 'Diseño web',
  content: (
    <>
      <p>
        Una página web profesional en España en 2026 suele costar entre{' '}
        <strong>590 € y 3.000 € + IVA</strong>. El número concreto depende de
        cuántas páginas hace falta, si hay que migrar una web antigua, los
        idiomas y lo que tenga que hacer el sitio: que te escriban, que reserven
        o que informen.
      </p>
      <BlogFigure
        src='/img/portfolio/new/carper.webp'
        alt='Mock de página web profesional de Carper Sonido'
        caption='Una web de empresa no es una plantilla: estructura, fichas y un contacto que se usa.'
      />
      <p>
        No hay un pack cerrado que valga para todos. Quien te da un precio único
        sin preguntar o te está vendiendo una plantilla, o te lo inventa. Aquí
        te dejamos orientación de verdad, y cómo lo presupuestamos en 36web.
      </p>

      <h2>Qué marca el precio de una página web en 2026</h2>
      <p>
        El diseño web a medida no se cobra por “bonito”. Se cobra por alcance.
        Estas son las variables que más mueven el presupuesto:
      </p>
      <ul>
        <li>
          <strong>Páginas y estructura.</strong> Una home, servicios y contacto
          no es lo mismo que una web de empresa con casos, equipo, blog y varias
          líneas de negocio.
        </li>
        <li>
          <strong>Contenidos.</strong> Si tienes textos y fotos, el proyecto
          avanza. Redactar todo desde cero o producir foto se valora aparte.
        </li>
        <li>
          <strong>Idiomas.</strong> Un segundo idioma no es “copiar y pegar”:
          hay que montar la estructura, las URLs y revisar.
        </li>
        <li>
          <strong>Web nueva o rediseño.</strong> Partir de una web antigua
          (dominio, marcas, redirecciones) suma trabajo. No es un parche sobre
          lo que ya tienes.
        </li>
        <li>
          <strong>Funciones.</strong> Formulario y WhatsApp entra en un proyecto
          típico. Reservas, área privada o integraciones raras, no.
        </li>
      </ul>

      <h2>Orientación de precios (2026)</h2>
      <p>
        Rangos de una web a medida, no de una plantilla de 79 €. El IVA va
        aparte. El precio cerrado va en la propuesta, por escrito.
      </p>
      <div className='overflow-hidden rounded-lg border-2 border-ink-dark'>
        <table>
          <thead>
            <tr>
              <th>Tipo de web</th>
              <th>Orientación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Web sencilla (home, servicios, contacto)</td>
              <td>590 € – 900 € + IVA</td>
            </tr>
            <tr>
              <td>Web de empresa o autónomo con más páginas</td>
              <td>900 € – 2.000 € + IVA</td>
            </tr>
            <tr>
              <td>Web a medida más compleja</td>
              <td>2.000 € – 3.000 € + IVA, o más</td>
            </tr>
            <tr>
              <td>Tienda online / ecommerce</td>
              <td>Otro proyecto. Se presupuesta aparte.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Muchas de las páginas web que montamos caen en esa horquilla de 590 € a
        3.000 €. Si el caso se sale, te lo decimos antes de empezar, no a mitad
        de obra.
      </p>

      <h2>Qué incluye el precio de un diseño web</h2>
      <p>
        En un proyecto típico de <a href={SITE_WEB_PATH}>diseño web a medida</a>{' '}
        entra esto:
      </p>
      <BlogFigure
        src='/img/portfolio/new/hoyviajamos.webp'
        alt='Mock de página web de Hoy Viajamos'
        caption='Diseño, móvil y publicación con tu dominio. Eso es lo que entra en el precio.'
      />
      <ul>
        <li>Estructura y diseño de la página web, con tu marca.</li>
        <li>Versión móvil (responsive).</li>
        <li>Formulario y WhatsApp, para que te puedan escribir.</li>
        <li>
          Base de SEO on-page: títulos, encabezados, URLs limpias y que cargue.
        </li>
        <li>Publicación con tu dominio. El dominio es tuyo.</li>
        <li>Hosting para arrancar, confirmado en la propuesta.</li>
        <li>Panel sencillo para textos y fotos del día a día.</li>
      </ul>
      <p>
        Cuando está online, la web queda a tu nombre. Archivos y accesos, tuyos.
      </p>

      <h2>Qué no entra (y conviene saberlo)</h2>
      <ul>
        <li>
          El SEO mes a mes. Dejamos una base razonable. Posicionar de continuo
          es otro trabajo.
        </li>
        <li>Redactar todos los textos desde cero, si no hay nada.</li>
        <li>Fotografía o vídeo de producción.</li>
        <li>
          Una <a href={SITE_SHOP_PATH}>tienda online</a>: catálogo, pagos y
          envíos es un ecommerce, no una web corporativa.
        </li>
        <li>
          Mantenimiento mensual. Es opcional, para cuando no quieres tocar la
          web tú.
        </li>
      </ul>

      <h2>Página web barata, plantilla o a medida</h2>
      <p>
        Una plantilla de marketplace sale barata porque es la misma para todos.
        Sirve si te da igual parecerte al de al lado. Un diseño web a medida se
        adapta a tu marca, tus textos y cómo te tienen que encontrar.
      </p>
      <BlogFigure
        src='/img/portfolio/new/elefantes.webp'
        alt='Mock de diseño web a medida'
        caption='A medida no es más caro por sistema. Es la base que pide el caso.'
      />
      <p>
        WordPress encaja cuando quieres editar contenido con facilidad. El
        desarrollo a medida entra cuando la página tiene que hacer algo que una
        plantilla no resuelve bien. En la propuesta te decimos qué base usamos y
        por qué. Sin venderte lo más caro por sistema.
      </p>

      <h2>Cómo se paga y cuánto tarda</h2>
      <p>
        Pedir presupuesto de diseño web es gratis. Nos cuentas el caso. Te
        devolvemos propuesta en el mismo día: qué entra, cuánto sale y cuándo
        está. Si encaja, el 50% al aceptar y arrancamos. El resto, al publicar.
        Si no encaja, lo dices y no pasa nada.
      </p>
      <p>
        El plazo va por escrito. Una página web de negocio suele estar en 3 a 8
        semanas cuando tenemos textos y fotos. Cuenta desde el arranque pagado,
        no desde el primer mensaje.
      </p>

      <h2>¿Cuánto cuesta una página web en Madrid en 2026?</h2>
      <p>
        36web es una agencia de diseño web y marketing digital en Madrid. El
        precio no cambia por código postal: trabajamos en remoto con autónomos y
        empresas de toda España. Si estás en Madrid, también podemos vernos. Lo
        que cambia el precio es el alcance del proyecto, no la ciudad.
      </p>
    </>
  ),
};

const erroresContratarWeb: BlogPost = {
  slug: 'errores-al-contratar-una-pagina-web',
  title: '10 errores al contratar una página web (y cómo evitarlos)',
  description:
    'Dominio a nombre de otro, presupuestos sin detalle, webs que no se ven en el móvil… Los 10 errores más comunes al contratar una página web y cómo evitar cada uno.',
  date: '2026-11-04',
  author: 'Equipo 36web',
  readingMinutes: 8,
  image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
  imageAlt: 'Portátil con código de una página web sobre un escritorio',
  category: 'Diseño web',
  faq: [
    {
      q: '¿Qué tengo que pedir antes de contratar una página web?',
      a: 'Un presupuesto por escrito con las páginas y funciones incluidas, el plazo, el número de revisiones, quién es el titular del dominio y los accesos, y qué pasa con el mantenimiento después de publicar.',
    },
    {
      q: '¿El dominio de mi web tiene que estar a mi nombre?',
      a: 'Sí. El dominio debe estar registrado a tu nombre o al de tu empresa, aunque lo gestione la agencia. Si está a nombre del proveedor, depender de él para cambiar de web o de hosting puede salir caro.',
    },
    {
      q: '¿Una web nueva ya viene posicionada en Google?',
      a: 'No. Una web bien hecha trae una base técnica de SEO, pero aparecer arriba en Google requiere trabajo continuo: contenidos, SEO local, ficha de Google y autoridad.',
    },
    {
      q: '¿Cuánto tarda en hacerse una página web profesional?',
      a: 'Una web de negocio suele estar lista en 3 a 8 semanas cuando están los textos y las fotos. Lo que más retrasa un proyecto es no tener el contenido preparado.',
    },
  ],
  content: (
    <>
      <p>
        Contratar una página web parece sencillo hasta que algo falla: la web no
        trae clientes, no puedes cambiar un texto sin pagar o descubres que el
        dominio no está a tu nombre. Casi siempre el problema no es técnico,
        sino una decisión tomada al principio, antes de firmar.
      </p>
      <p>
        <strong>En resumen:</strong> los errores más comunes al contratar una
        página web son elegir solo por precio, no tener el dominio y los
        accesos a tu nombre, aceptar un presupuesto sin detalle, olvidar el
        móvil, dar por hecho el SEO y no preguntar por el mantenimiento. Te los
        explicamos uno a uno, con lo que tienes que pedir para evitarlos.
      </p>

      <h2>1. Elegir la web solo por el precio</h2>
      <p>
        Una web de 200 € y otra de 1.500 € no son el mismo producto con
        distinto precio. La barata suele ser una plantilla genérica, igual que
        la de tu competencia, sin estrategia y sin nadie detrás cuando algo se
        rompe. Lo barato acaba saliendo caro cuando hay que rehacerla al año.
      </p>
      <p>
        <strong>Cómo evitarlo:</strong> compara qué incluye cada propuesta, no
        solo la cifra final. Si quieres una referencia de precios reales, lee{' '}
        <a href='/blog/cuanto-cuesta-una-pagina-web-profesional'>
          cuánto cuesta una página web profesional
        </a>
        .
      </p>

      <h2>2. No tener el dominio ni los accesos a tu nombre</h2>
      <p>
        Es el error más caro y el más frecuente. Si el dominio, el hosting o el
        panel de la web están a nombre del proveedor, cambiar de agencia se
        convierte en una negociación. En el peor caso, pierdes la dirección que
        tus clientes ya conocen.
      </p>
      <p>
        <strong>Cómo evitarlo:</strong> exige por escrito que el dominio esté a
        tu nombre y que recibirás todos los accesos: dominio, hosting, gestor de
        contenidos, Google Analytics y ficha de Google.
      </p>

      <BlogFigure
        src='https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1600&q=80'
        alt='Dos personas revisando y firmando un contrato en una mesa'
        caption='Lo que no está por escrito, no existe. Foto: Gabrielle Henderson / Unsplash.'
      />

      <h2>3. Aceptar un presupuesto sin detalle</h2>
      <p>
        «Web corporativa: 900 €» no es un presupuesto, es un precio. Sin saber
        cuántas páginas, qué funciones, cuántas rondas de cambios y qué plazo,
        cualquier petición a mitad de proyecto puede convertirse en un extra.
      </p>
      <p>
        <strong>Cómo evitarlo:</strong> pide una propuesta con secciones,
        funcionalidades (formulario, WhatsApp, reservas, idiomas…), número de
        revisiones, calendario y forma de pago. Si algo no aparece, pregunta.
      </p>

      <h2>4. Olvidarse del móvil y de la velocidad</h2>
      <p>
        La mayoría de visitas a una web de negocio llegan desde el móvil. Si en
        el teléfono los textos se cortan, los botones no se pueden pulsar o la
        página tarda en cargar, ese cliente se va a la siguiente opción de
        Google.
      </p>
      <p>
        <strong>Cómo evitarlo:</strong> pide ver el diseño en móvil antes que en
        ordenador y prueba la web en tu propio teléfono antes de publicarla.
        Una web que carga en menos de tres segundos marca la diferencia.
      </p>

      <BlogFigure
        src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80'
        alt='Smartphone con una aplicación abierta junto al teclado de un portátil'
        caption='Tu cliente te va a conocer desde el móvil. Foto: Rahul Chakraborty / Unsplash.'
      />

      <h2>5. Pensar que el SEO viene de serie</h2>
      <p>
        Publicar una web no significa aparecer en Google. Una web bien
        construida trae una base técnica (títulos, estructura, velocidad), pero
        posicionarse para «tu servicio + tu ciudad» requiere trabajo continuo.
      </p>
      <p>
        <strong>Cómo evitarlo:</strong> pregunta qué SEO incluye la web y qué
        queda fuera. Si dependes de clientes de tu zona, el{' '}
        <a href='/servicios/seo'>SEO local</a> y la ficha de Google suelen ser
        lo primero que hay que trabajar.
      </p>

      <h2>6. No preparar los textos y las fotos</h2>
      <p>
        El cuello de botella de casi todos los proyectos no es el diseño, es el
        contenido. Webs que podrían estar en tres semanas se alargan meses
        esperando los textos de «Quiénes somos» o unas fotos decentes.
      </p>
      <p>
        <strong>Cómo evitarlo:</strong> antes de empezar, reúne tus servicios,
        precios orientativos, preguntas frecuentes de clientes y fotos reales
        de tu negocio. Si no tienes tiempo, pregunta si la agencia puede
        redactar los textos.
      </p>

      <h2>7. Una web sin objetivo claro</h2>
      <p>
        Una web no está para «estar en internet». Está para que te llamen, te
        escriban, reserven o compren. Si no está claro qué tiene que hacer el
        visitante, el diseño acaba siendo bonito pero inútil.
      </p>
      <p>
        <strong>Cómo evitarlo:</strong> define una acción principal (llamar,
        pedir presupuesto, reservar) y asegúrate de que el botón está visible
        en todas las páginas, también en el móvil.
      </p>

      <BlogFigure
        src='https://images.unsplash.com/photo-1505873802958-fd51cd5204fb?auto=format&fit=crop&w=1600&q=80'
        alt='Hombre rascándose la cabeza frente a un portátil'
        caption='Si el visitante tiene que pensar qué hacer, ya lo has perdido. Foto: Shane Rounce / Unsplash.'
      />

      <h2>8. No preguntar por el mantenimiento</h2>
      <p>
        Una web necesita actualizaciones, copias de seguridad y alguien que
        responda cuando algo falla. Muchas webs se quedan abandonadas el día
        después de publicarse, hasta que un plugin desactualizado las rompe o
        las hackea.
      </p>
      <p>
        <strong>Cómo evitarlo:</strong> pregunta quién se encarga de la web
        después del lanzamiento, cuánto cuesta y qué incluye. Si prefieres
        olvidarte, un servicio de{' '}
        <a href={SITE_MAINTENANCE_PATH}>mantenimiento web</a> lo resuelve.
      </p>

      <h2>9. Olvidar lo legal: cookies y privacidad</h2>
      <p>
        Formularios, analítica y anuncios implican tratar datos personales. Una
        web sin política de privacidad, aviso legal o un banner de cookies
        correcto puede acarrear sanciones y, además, transmite poca confianza.
      </p>
      <p>
        <strong>Cómo evitarlo:</strong> confirma que la web incluye los textos
        legales, el consentimiento en los formularios y un aviso de cookies que
        permita aceptar o rechazar.
      </p>

      <h2>10. No pedir ejemplos ni referencias reales</h2>
      <p>
        Cualquiera puede enseñar plantillas bonitas. Lo que cuenta es lo que ha
        conseguido para negocios como el tuyo: webs publicadas que puedes
        visitar, reseñas verificables y resultados concretos.
      </p>
      <p>
        <strong>Cómo evitarlo:</strong> pide webs reales en las que puedas
        entrar y lee sus reseñas en Google. Puedes ver cómo lo hacemos nosotros
        en nuestros <a href='/casos-de-exito'>casos de éxito</a>.
      </p>

      <BlogFigure
        src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80'
        alt='Gráficas de analítica web en la pantalla de un portátil'
        caption='Una buena web se mide en llamadas, mensajes y ventas. Foto: Luke Chesser / Unsplash.'
      />

      <h2>Checklist antes de firmar</h2>
      <ul>
        <li>Presupuesto por escrito con páginas, funciones, revisiones y plazos.</li>
        <li>Dominio y accesos a tu nombre.</li>
        <li>Diseño pensado primero para el móvil.</li>
        <li>Qué SEO incluye y qué no.</li>
        <li>Quién prepara los textos y las fotos.</li>
        <li>Una acción principal clara: llamar, escribir, reservar o comprar.</li>
        <li>Mantenimiento, copias de seguridad y soporte después de publicar.</li>
        <li>Textos legales y aviso de cookies.</li>
        <li>Webs reales y reseñas que puedas comprobar.</li>
      </ul>
      <p>
        Si estás pensando en una web nueva o en rehacer la tuya, en{' '}
        <a href={SITE_WEB_PATH}>diseño web</a> te contamos cómo trabajamos, y
        si vendes online, mira <a href={SITE_SHOP_PATH}>tiendas online</a>.
        Y si quieres que revisemos tu web antes de decidir nada,{' '}
        <a href={CONTACT_PATH}>escríbenos</a>: es gratis.
      </p>
    </>
  ),
};

export const posts: BlogPost[] = [erroresContratarWeb, cuantoCuesta];

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug);

export const getRelatedPosts = (slug: string, limit = 3) =>
  posts.filter((post) => post.slug !== slug).slice(0, limit);

export type { BlogPost } from './types';
export { BLOG_PATH, formatPostDate, getPostPath } from './types';
