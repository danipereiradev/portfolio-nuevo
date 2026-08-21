import { SITE_SHOP_PATH, SITE_WEB_PATH } from '../config/contact';
import { BlogFigure } from '../components/BlogArticle';
import type { BlogPost } from './types';

const cuantoCuesta: BlogPost = {
  slug: 'cuanto-cuesta-una-pagina-web-profesional',
  title: 'Cuánto cuesta una página web profesional',
  description:
    'Una página web profesional en España suele ir de 400 € a 3.000 € + IVA, según alcance. Qué entra en el precio, qué no, y cómo pedimos presupuesto en PereiraWeb.',
  date: '2026-08-21',
  author: 'Dani Pereira',
  image: '/img/portfolio/mock-delish.png',
  imageAlt: 'Mock de página web profesional',
  category: 'Diseño web',
  content: (
    <>
      <p>
        Una página web profesional en España suele costar entre{' '}
        <strong>400 € y 3.000 € + IVA</strong>. El número concreto depende de
        cuántas páginas hace falta, si hay que migrar una web antigua, los
        idiomas y lo que tenga que hacer el sitio: que te escriban, que
        reserven o que informen.
      </p>
      <BlogFigure
        src='/img/portfolio/mock-carper.png'
        alt='Mock de página web profesional de Carper Sonido'
        caption='Una web de empresa no es una plantilla: estructura, fichas y un contacto que se usa.'
      />
      <p>
        No hay un pack cerrado que valga para todos. Quien te da un precio
        único sin preguntar o te está vendiendo una plantilla, o te lo
        inventa. Aquí te dejamos orientación de verdad, y cómo lo
        presupuestamos en PereiraWeb.
      </p>

      <h2>Qué marca el precio de una página web</h2>
      <p>
        El diseño web a medida no se cobra por “bonito”. Se cobra por
        alcance. Estas son las variables que más mueven el presupuesto:
      </p>
      <ul>
        <li>
          <strong>Páginas y estructura.</strong> Una home, servicios y
          contacto no es lo mismo que una web de empresa con casos, equipo,
          blog y varias líneas de negocio.
        </li>
        <li>
          <strong>Contenidos.</strong> Si tienes textos y fotos, el proyecto
          avanza. Redactar todo desde cero o producir foto se valora aparte.
        </li>
        <li>
          <strong>Idiomas.</strong> Un segundo idioma no es “copiar y
          pegar”: hay que montar la estructura, las URLs y revisar.
        </li>
        <li>
          <strong>Web nueva o rediseño.</strong> Partir de una web antigua
          (dominio, marcas, redirecciones) suma trabajo. No es un parche
          sobre lo que ya tienes.
        </li>
        <li>
          <strong>Funciones.</strong> Formulario o WhatsApp entra en un
          proyecto típico. Reservas, área privada o integraciones raras, no.
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
              <td>400 € – 900 € + IVA</td>
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
        Muchas de las páginas web que montamos caen en esa horquilla de 400 €
        a 3.000 €. Si el caso se sale, te lo decimos antes de empezar, no a
        mitad de obra.
      </p>

      <h2>Qué incluye el precio de un diseño web</h2>
      <p>
        En un proyecto típico de{' '}
        <a href={SITE_WEB_PATH}>diseño web a medida</a> entra esto:
      </p>
      <BlogFigure
        src='/img/portfolio/mock-viajamos.png'
        alt='Mock de página web de Hoy Viajamos'
        caption='Diseño, móvil y publicación con tu dominio. Eso es lo que entra en el precio.'
      />
      <ul>
        <li>Estructura y diseño de la página web, con tu marca.</li>
        <li>Versión móvil (responsive).</li>
        <li>Formulario o WhatsApp, para que te puedan escribir.</li>
        <li>
          Base de SEO on-page: títulos, encabezados, URLs limpias y que
          cargue.
        </li>
        <li>Publicación con tu dominio. El dominio es tuyo.</li>
        <li>Hosting para arrancar, confirmado en la propuesta.</li>
        <li>Panel sencillo para textos y fotos del día a día.</li>
      </ul>
      <p>Cuando está online, la web queda a tu nombre. Archivos y accesos, tuyos.</p>

      <h2>Qué no entra (y conviene saberlo)</h2>
      <ul>
        <li>
          El SEO mes a mes. Dejamos una base razonable. Posicionar de
          continuo es otro trabajo.
        </li>
        <li>Redactar todos los textos desde cero, si no hay nada.</li>
        <li>Fotografía o vídeo de producción.</li>
        <li>
          Una{' '}
          <a href={SITE_SHOP_PATH}>tienda online</a>: catálogo, pagos y
          envíos es un ecommerce, no una web corporativa.
        </li>
        <li>
          Mantenimiento mensual. Es opcional, para cuando no quieres tocar
          la web tú.
        </li>
      </ul>

      <h2>Página web barata, plantilla o a medida</h2>
      <p>
        Una plantilla de marketplace sale barata porque es la misma para
        todos. Sirve si te da igual parecerte al de al lado. Un diseño web a
        medida se adapta a tu marca, tus textos y cómo te tienen que
        encontrar.
      </p>
      <BlogFigure
        src='/img/portfolio/mock-core.png'
        alt='Mock de diseño web a medida'
        caption='A medida no es más caro por sistema. Es la base que pide el caso.'
      />
      <p>
        WordPress encaja cuando quieres editar contenido con facilidad. El
        desarrollo a medida entra cuando la página tiene que hacer algo que
        una plantilla no resuelve bien. En la propuesta te decimos qué base
        usamos y por qué. Sin venderte lo más caro por sistema.
      </p>

      <h2>Cómo se paga y cuánto tarda</h2>
      <p>
        Pedir presupuesto de diseño web es gratis. Nos cuentas el caso. En
        24–48 h laborables te mandamos qué entra, cuánto sale y cuándo está.
        Si encaja, el 50% al aceptar y arrancamos. El resto, al publicar. Si
        no encaja, lo dices y no pasa nada.
      </p>
      <p>
        El plazo va por escrito. Una página web de negocio suele estar en 3
        a 8 semanas cuando tenemos textos y fotos. Cuenta desde el arranque
        pagado, no desde el primer mensaje.
      </p>

      <h2>¿Cuánto cuesta una página web en Madrid?</h2>
      <p>
        PereiraWeb es un estudio de diseño web en Madrid. El precio no
        cambia por código postal: trabajamos en remoto con autónomos y
        empresas de toda España. Si estás en Madrid, también podemos
        vernos. Lo que cambia el precio es el alcance del proyecto, no la
        ciudad.
      </p>
      <p>
        Si te interesa el stack, no solo el precio:{' '}
        <a href='/blog/tecnologias-para-crear-una-pagina-web'>
          tecnologías para crear una página web
        </a>
        .
      </p>
    </>
  ),
};

const tecnologias: BlogPost = {
  slug: 'tecnologias-para-crear-una-pagina-web',
  title: 'Tecnologías para crear una página web',
  description:
    'HTML, CSS, JavaScript, CMS como WordPress y frameworks como React o Next.js. Qué tecnología usar para crear una página web, y cuándo encaja cada una.',
  date: '2026-08-21',
  author: 'Dani Pereira',
  image: '/img/portfolio/hatena-mock.webp',
  imageAlt: 'Mock de página web desarrollada a medida',
  category: 'Desarrollo web',
  content: (
    <>
      <p>
        Para crear una página web se usan, de base, tres lenguajes:{' '}
        <strong>HTML, CSS y JavaScript</strong>. Encima puede ir un CMS
        (WordPress, Shopify) o un framework (React, Next.js, Vue). No hay
        una pila correcta para todos los casos. Hay una que encaja con lo
        que la web tiene que hacer.
      </p>
      <BlogFigure
        src='/img/portfolio/mock-carper.png'
        alt='Página web de empresa hecha con desarrollo a medida'
        caption='Da igual el stack: HTML, CSS y JavaScript son lo que ve el navegador.'
      />
      <p>
        Este artículo resume las tecnologías de desarrollo web que verás al
        contratar un{' '}
        <a href={SITE_WEB_PATH}>diseño web a medida</a>: lenguajes de
        programación, librerías, frameworks y CMS. Sin moda de turno. Con
        criterio de proyecto.
      </p>

      <h2>Lenguajes de programación para una página web</h2>
      <p>
        Toda web, da igual el CMS o el framework, acaba en el navegador como
        HTML, CSS y JavaScript. El resto son herramientas para producir eso
        más rápido, con panel de edición o con más control.
      </p>
      <ul>
        <li>
          <strong>HTML.</strong> La estructura: títulos, párrafos, enlaces,
          formularios. Sin HTML no hay página web.
        </li>
        <li>
          <strong>CSS.</strong> El aspecto: tipografía, color, móvil,
          layout. Una web que no se lee en el teléfono suele pecar aquí.
        </li>
        <li>
          <strong>JavaScript.</strong> Lo que se mueve en el navegador:
          menús, formularios, carritos, filtros. Casi todas las webs
          modernas lo usan.
        </li>
        <li>
          <strong>TypeScript.</strong> JavaScript con tipos. En PereiraWeb
          lo usamos en desarrollos a medida: menos errores, más claro qué
          hace cada pieza.
        </li>
        <li>
          <strong>PHP.</strong> El lenguaje de WordPress. El servidor
          monta la página y te deja un panel para textos y fotos.
        </li>
      </ul>
      <p>
        Python, Ruby o Go también sirven para la parte de servidor. En webs
        de negocio en España lo habitual es PHP (WordPress) o JavaScript /
        TypeScript (a medida).
      </p>

      <h2>Librerías de JavaScript</h2>
      <p>
        Una librería es un trozo de código que resuelve una cosa. No te
        impone cómo montar toda la web. Ejemplos que siguen saliendo:
        jQuery (cada vez menos), Swiper para carruseles, librerías de
        fechas o de mapas.
      </p>
      <BlogFigure
        src='/img/portfolio/silly-sally-mock.webp'
        alt='Web a medida montada con framework de JavaScript'
        caption='React, Next o WordPress: la tecnología se elige después de saber qué tiene que hacer la web.'
      />
      <p>
        <strong>React</strong> es una librería para construir interfaces.
        Se usa tanto que mucha gente la llama framework. Encima de React
        suelen ir frameworks de verdad: Next.js, Remix, Astro con React.
        Vue y Svelte cubren un territorio parecido.
      </p>
      <p>
        En una web de empresa no hace falta “la librería de moda”. Hace
        falta que cargue, que se edite si toca y que no se rompa en el
        móvil.
      </p>

      <h2>Frameworks para desarrollo web</h2>
      <p>
        Un framework es un armazón: te dice cómo organizar rutas,
        componentes y datos. Acelera un desarrollo a medida. También te
        ata a sus reglas.
      </p>
      <ul>
        <li>
          <strong>React + Vite.</strong> Webs a medida rápidas de
          publicar. Encaja cuando el diseño es propio y el contenido no
          cambia cada día.
        </li>
        <li>
          <strong>Next.js.</strong> Framework sobre React. Útil si hace
          falta SEO fino, varias páginas y algo de servidor. No es
          obligatorio “porque está de moda”.
        </li>
        <li>
          <strong>Vue o Angular.</strong> Otras formas de montar la
          interfaz. Angular suele ir a proyectos grandes de empresa. Vue,
          a equipos que lo dominan.
        </li>
        <li>
          <strong>Astro o Svelte.</strong> Sitios que tienen que pesar
          poco. Bien para contenido que se lee, no para un panel enorme.
        </li>
      </ul>
      <p>
        Un framework no sustituye el diseño web. Monta la página. El
        criterio de qué usar lo pone el caso, no el catálogo de
        tecnologías.
      </p>

      <h2>CMS para crear una página web</h2>
      <p>
        Un CMS (Content Management System) es un panel para que edites
        textos, fotos y páginas sin tocar código. Es la opción de mucha
        pyme y autónomo que quiere cambiar un párrafo un martes.
      </p>
      <ul>
        <li>
          <strong>WordPress.</strong> El CMS más usado del mundo. Plugins,
          plantillas y, bien montado, una web seria. Mal montado, lenta y
          llena de parches. El problema no es WordPress: es usarlo como
          cajón de sastre.
        </li>
        <li>
          <strong>WooCommerce.</strong> WordPress para vender. Catálogo,
          pagos y pedidos. Encaja en muchas{' '}
          <a href={SITE_SHOP_PATH}>tiendas online</a> de tamaño medio.
        </li>
        <li>
          <strong>Shopify.</strong> CMS de ecommerce alojado. Panel
          sencillo y apps. Menos control de la base; más rapidez para
          abrir tienda.
        </li>
        <li>
          <strong>Webflow u otros builders.</strong> Sirven para
          prototipos o sitios muy visuales. Para un negocio que tiene que
          durar años, suele pesar más el hosting, el SEO y quién la
          mantiene.
        </li>
      </ul>
      <p>
        Headless CMS (un panel por un lado, la web por otro) tiene sentido
        cuando hay varios canales o un equipo de contenido grande. En una
        web de servicios de 8 páginas, casi nunca.
      </p>

      <h2>WordPress, framework o desarrollo a medida</h2>
      <p>
        La pregunta útil no es “¿cuál es mejor tecnología para crear una
        página web?”. Es “¿qué tiene que hacer esta?”.
      </p>
      <div className='overflow-hidden rounded-lg border-2 border-ink-dark'>
        <table>
          <thead>
            <tr>
              <th>Si el caso es…</th>
              <th>Suele encajar…</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Web de empresa o autónomo, textos que cambian</td>
              <td>WordPress (CMS)</td>
            </tr>
            <tr>
              <td>Diseño propio, pocas páginas, máximo control</td>
              <td>HTML/CSS/JS o React (framework / librería)</td>
            </tr>
            <tr>
              <td>Tienda con catálogo y pagos</td>
              <td>WooCommerce o Shopify</td>
            </tr>
            <tr>
              <td>App web o proceso que una plantilla no cubre</td>
              <td>Desarrollo a medida (TypeScript, React…)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        En PereiraWeb no hay un stack único. WordPress si encaja. A medida
        si el caso lo pide. Te lo decimos en la propuesta, sin venderte lo
        más caro por sistema. El{' '}
        <a href='/blog/cuanto-cuesta-una-pagina-web-profesional'>
          precio de una página web profesional
        </a>{' '}
        lo marca el alcance, no el nombre del framework.
      </p>

      <h2>Qué tecnología usamos en PereiraWeb</h2>
      <p>
        Estudio de diseño y desarrollo web en Madrid. En webs de negocio
        trabajamos sobre todo con:
      </p>
      <BlogFigure
        src='/img/portfolio/mock-chicxs.png'
        alt='Tienda online montada con CMS WooCommerce'
        caption='WooCommerce o Shopify cuando hay que vender. Una web corporativa no necesita un ecommerce.'
      />
      <ul>
        <li>HTML, CSS y JavaScript / TypeScript.</li>
        <li>React y Vite cuando el desarrollo es a medida.</li>
        <li>WordPress cuando hace falta un CMS claro.</li>
        <li>WooCommerce o Shopify si el proyecto es una tienda online.</li>
      </ul>
      <p>
        Tailwind, librerías de sliders o un CMS headless entran si aportan.
        No si solo quedan bien en una ficha técnica.
      </p>

      <h2>Cómo elegir tecnologías para tu página web</h2>
      <p>
        Empieza por el uso: ¿consultas, ventas, marca, blog? Luego el
        mantenimiento: ¿la vas a editar tú cada semana? Luego el presupuesto
        y el plazo. La tecnología es la consecuencia.
      </p>
      <p>
        Si alguien te vende “solo React” o “solo WordPress” antes de
        preguntarte qué tiene que hacer la página, está vendiendo su
        herramienta, no tu web. En 24–48 h laborables te decimos qué entra,
        con qué se monta y cuánto sale. Por escrito.
      </p>
    </>
  ),
};

export const posts: BlogPost[] = [tecnologias, cuantoCuesta];

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug);

export const getRelatedPosts = (slug: string, limit = 3) =>
  posts.filter((post) => post.slug !== slug).slice(0, limit);

export type { BlogPost } from './types';
export { BLOG_PATH, formatPostDate, getPostPath } from './types';
