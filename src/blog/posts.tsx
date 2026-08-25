import { SITE_SHOP_PATH, SITE_WEB_PATH } from '../config/contact';
import { BlogFigure } from '../components/BlogArticle';
import type { BlogPost } from './types';

const cuantoCuesta: BlogPost = {
  slug: 'cuanto-cuesta-una-pagina-web-profesional',
  title: 'Cuánto cuesta una página web profesional en 2026',
  description:
    'En 2026 una página web profesional en España suele ir de 600 € a 3.000 € + IVA, según alcance. Qué entra en el precio, qué no, y cómo pedimos presupuesto en 36web.',
  date: '2026-08-21',
  author: 'Dani Pereira',
  image: '/img/portfolio/mock-delish.png',
  imageAlt: 'Mock de página web profesional',
  category: 'Diseño web',
  content: (
    <>
      <p>
        Una página web profesional en España en 2026 suele costar entre{' '}
        <strong>600 € y 3.000 € + IVA</strong>. El número concreto depende de
        cuántas páginas hace falta, si hay que migrar una web antigua, los
        idiomas y lo que tenga que hacer el sitio: que te escriban, que reserven
        o que informen.
      </p>
      <BlogFigure
        src='/img/portfolio/mock-carper.png'
        alt='Mock de página web profesional de Carper Sonido'
        caption='Una web de empresa no es una plantilla: estructura, fichas y un contacto que se usa.'
      />
      <p>
        No hay un pack cerrado que valga para todos. Quien te da un precio único
        sin preguntar o te está vendiendo una plantilla, o te lo inventa. Aquí
        te dejamos orientación de verdad, y cómo lo presupuestamos en
        36web.
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
          <strong>Funciones.</strong> Formulario o WhatsApp entra en un proyecto
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
              <td>600 € – 900 € + IVA</td>
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
        Muchas de las páginas web que montamos caen en esa horquilla de 600 € a
        3.000 €. Si el caso se sale, te lo decimos antes de empezar, no a mitad
        de obra.
      </p>

      <h2>Qué incluye el precio de un diseño web</h2>
      <p>
        En un proyecto típico de <a href={SITE_WEB_PATH}>diseño web a medida</a>{' '}
        entra esto:
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
        src='/img/portfolio/mock-core.png'
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
        Pedir presupuesto de diseño web es gratis. Nos cuentas el caso. En 24–48
        h laborables te mandamos qué entra, cuánto sale y cuándo está. Si
        encaja, el 50% al aceptar y arrancamos. El resto, al publicar. Si no
        encaja, lo dices y no pasa nada.
      </p>
      <p>
        El plazo va por escrito. Una página web de negocio suele estar en 3 a 8
        semanas cuando tenemos textos y fotos. Cuenta desde el arranque pagado,
        no desde el primer mensaje.
      </p>

      <h2>¿Cuánto cuesta una página web en Madrid en 2026?</h2>
      <p>
        36web es una agencia de diseño web y marketing digital en Madrid.
        El precio no cambia por código postal: trabajamos en remoto con
        autónomos y empresas de toda España. Si estás en Madrid, también podemos
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

export const posts: BlogPost[] = [cuantoCuesta];

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug);

export const getRelatedPosts = (slug: string, limit = 3) =>
  posts.filter((post) => post.slug !== slug).slice(0, limit);

export type { BlogPost } from './types';
export { BLOG_PATH, formatPostDate, getPostPath } from './types';
