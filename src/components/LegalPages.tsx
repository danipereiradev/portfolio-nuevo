import React, { useState } from 'react';
import { X, FileText, Shield, Cookie, Scale } from 'lucide-react';

interface LegalPagesProps {
  isOpen: boolean;
  onClose: () => void;
  page: 'privacy' | 'terms' | 'cookies' | 'legal';
}

const LegalPages: React.FC<LegalPagesProps> = ({ isOpen, onClose, page }) => {
  if (!isOpen) return null;

  const getPageContent = () => {
    switch (page) {
      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Política de Privacidad</h1>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Responsable del Tratamiento</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Responsable:</strong> Daniel Pereira Gesteiro</p>
                  <p><strong>NIF:</strong> 36153235H</p>
                  <p><strong>Dirección:</strong> Plaza de la Solidaridad 7 - 4C, 28850 Torrejón de Ardoz, Madrid</p>
                  <p><strong>Email:</strong> info.danipereira@gmail.com</p>
                  <p><strong>Teléfono:</strong> +34 644 669 828</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Información que Recopilamos</h2>
                <p className="mb-4">Recopilamos la siguiente información cuando utilizas nuestros servicios:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Datos de contacto:</strong> Nombre, email, teléfono, empresa</li>
                  <li><strong>Datos del proyecto:</strong> Tipo de proyecto, presupuesto, plazos, descripción</li>
                  <li><strong>Datos técnicos:</strong> Dirección IP, navegador, dispositivo utilizado</li>
                  <li><strong>Cookies:</strong> Para mejorar la experiencia de usuario</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalidad del Tratamiento</h2>
                <p className="mb-4">Utilizamos tus datos para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Responder a tus consultas y solicitudes de presupuesto</li>
                  <li>Proporcionar servicios de desarrollo web</li>
                  <li>Enviar comunicaciones comerciales (con tu consentimiento)</li>
                  <li>Cumplir con obligaciones legales</li>
                  <li>Mejorar nuestros servicios</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base Legal</h2>
                <p className="mb-4">El tratamiento de tus datos se basa en:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Consentimiento:</strong> Para comunicaciones comerciales</li>
                  <li><strong>Ejecución contractual:</strong> Para prestación de servicios</li>
                  <li><strong>Interés legítimo:</strong> Para mejora de servicios</li>
                  <li><strong>Cumplimiento legal:</strong> Para obligaciones fiscales y contables</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Conservación de Datos</h2>
                <p>Conservaremos tus datos durante:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Datos de contacto:</strong> Hasta que solicites su eliminación</li>
                  <li><strong>Datos contractuales:</strong> Durante la relación comercial + 6 años</li>
                  <li><strong>Datos fiscales:</strong> 4 años según normativa fiscal</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Tus Derechos</h2>
                <p className="mb-4">Tienes derecho a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Acceso:</strong> Conocer qué datos tenemos sobre ti</li>
                  <li><strong>Rectificación:</strong> Corregir datos inexactos</li>
                  <li><strong>Supresión:</strong> Eliminar tus datos</li>
                  <li><strong>Limitación:</strong> Restringir el tratamiento</li>
                  <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                  <li><strong>Oposición:</strong> Oponerte al tratamiento</li>
                </ul>
                <p className="mt-4">Para ejercer estos derechos, contacta con nosotros en: info.danipereira@gmail.com</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Seguridad</h2>
                <p>Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contacto</h2>
                <p>Para cualquier consulta sobre esta política de privacidad, puedes contactarnos en:</p>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p><strong>Email:</strong> info.danipereira@gmail.com</p>
                  <p><strong>Teléfono:</strong> +34 644 669 828</p>
                  <p><strong>Dirección:</strong> Plaza de la Solidaridad 7 - 4C, 28850 Torrejón de Ardoz, Madrid</p>
                </div>
              </section>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Términos y Condiciones</h1>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Información General</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Titular:</strong> Daniel Pereira Gesteiro</p>
                  <p><strong>NIF:</strong> 36153235H</p>
                  <p><strong>Dirección:</strong> Plaza de la Solidaridad 7 - 4C, 28850 Torrejón de Ardoz, Madrid</p>
                  <p><strong>Email:</strong> info.danipereira@gmail.com</p>
                  <p><strong>Teléfono:</strong> +34 644 669 828</p>
                  <p><strong>Actividad:</strong> Servicios de desarrollo y diseño web</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Objeto</h2>
                <p>Los presentes términos y condiciones regulan el uso de este sitio web y la contratación de servicios de desarrollo web, diseño web, consultoría tecnológica y servicios relacionados.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Servicios</h2>
                <p className="mb-4">Ofrecemos los siguientes servicios:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Desarrollo de páginas web corporativas</li>
                  <li>Desarrollo de tiendas online (e-commerce)</li>
                  <li>Desarrollo de aplicaciones web</li>
                  <li>Diseño UX/UI</li>
                  <li>Optimización SEO</li>
                  <li>Mantenimiento y soporte web</li>
                  <li>Consultoría tecnológica</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Proceso de Contratación</h2>
                <ol className="list-decimal pl-6 space-y-2">
                  <li><strong>Solicitud:</strong> El cliente solicita presupuesto a través del formulario web o email</li>
                  <li><strong>Propuesta:</strong> Enviamos propuesta detallada en máximo 48 horas</li>
                  <li><strong>Aceptación:</strong> El cliente acepta la propuesta y condiciones</li>
                  <li><strong>Pago inicial:</strong> Se requiere pago del 50% para iniciar el proyecto</li>
                  <li><strong>Desarrollo:</strong> Ejecutamos el proyecto según especificaciones</li>
                  <li><strong>Entrega:</strong> Entregamos el proyecto y se abona el 50% restante</li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Precios y Pagos</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Los precios se especifican en cada propuesta comercial</li>
                  <li>Todos los precios incluyen IVA cuando sea aplicable</li>
                  <li>Pago: 50% al inicio, 50% a la entrega</li>
                  <li>Formas de pago: Transferencia bancaria, PayPal</li>
                  <li>Plazo de pago: 7 días desde la facturación</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Plazos de Entrega</h2>
                <p>Los plazos se especifican en cada propuesta. Los retrasos por causas imputables al cliente no serán responsabilidad nuestra.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Propiedad Intelectual</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>El cliente adquiere los derechos de uso del proyecto una vez abonado íntegramente</li>
                  <li>Nos reservamos el derecho a mostrar el proyecto en nuestro portfolio</li>
                  <li>El código fuente y metodologías desarrolladas son de nuestra propiedad</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Garantías</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Garantizamos el correcto funcionamiento durante 3 meses post-entrega</li>
                  <li>Corrección gratuita de errores de programación</li>
                  <li>No incluye modificaciones de diseño o funcionalidades adicionales</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitación de Responsabilidad</h2>
                <p>Nuestra responsabilidad se limita al importe del proyecto contratado. No nos hacemos responsables de daños indirectos o lucro cesante.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Resolución de Conflictos</h2>
                <p>Para la resolución de controversias, las partes se someten a los juzgados y tribunales de Madrid, renunciando a cualquier otro fuero que pudiera corresponderles.</p>
              </section>
            </div>
          </div>
        );

      case 'cookies':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Política de Cookies</h1>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué son las cookies?</h2>
                <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos ayudan a mejorar tu experiencia de navegación y a entender cómo utilizas nuestro sitio.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tipos de cookies que utilizamos</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookies Técnicas (Necesarias)</h3>
                    <p className="text-gray-600 mb-2">Esenciales para el funcionamiento del sitio web.</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Mantener la sesión del usuario</li>
                      <li>Recordar preferencias de idioma</li>
                      <li>Seguridad y autenticación</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookies Analíticas</h3>
                    <p className="text-gray-600 mb-2">Nos ayudan a entender cómo los usuarios interactúan con el sitio.</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Google Analytics (estadísticas de uso)</li>
                      <li>Páginas más visitadas</li>
                      <li>Tiempo de permanencia</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookies de Funcionalidad</h3>
                    <p className="text-gray-600 mb-2">Mejoran la experiencia del usuario.</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Recordar formularios completados</li>
                      <li>Preferencias de visualización</li>
                      <li>Configuración personalizada</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de cookies</h2>
                <p className="mb-4">Puedes gestionar las cookies de las siguientes maneras:</p>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Configuración del navegador</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800">
                    <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                    <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                    <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                    <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Importante</h3>
                  <p className="text-sm text-yellow-800">Deshabilitar las cookies técnicas puede afectar al funcionamiento correcto del sitio web.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies de terceros</h2>
                <p className="mb-4">Utilizamos servicios de terceros que pueden instalar sus propias cookies:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Analytics:</strong> Para análisis de tráfico web</li>
                  <li><strong>Google Fonts:</strong> Para cargar fuentes tipográficas</li>
                  <li><strong>Pexels:</strong> Para mostrar imágenes optimizadas</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Consentimiento</h2>
                <p>Al continuar navegando por este sitio web, aceptas el uso de cookies según se describe en esta política. Puedes retirar tu consentimiento en cualquier momento modificando la configuración de tu navegador.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contacto</h2>
                <p>Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos:</p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p><strong>Email:</strong> info.danipereira@gmail.com</p>
                  <p><strong>Teléfono:</strong> +34 644 669 828</p>
                </div>
              </section>
            </div>
          </div>
        );

      case 'legal':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Aviso Legal</h1>
            </div>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Datos Identificativos</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>Titular:</strong> Daniel Pereira Gesteiro</p>
                      <p><strong>NIF:</strong> 36153235H</p>
                      <p><strong>Domicilio:</strong> Plaza de la Solidaridad 7 - 4C</p>
                      <p><strong>Código Postal:</strong> 28850</p>
                      <p><strong>Localidad:</strong> Torrejón de Ardoz, Madrid</p>
                    </div>
                    <div>
                      <p><strong>Email:</strong> info.danipereira@gmail.com</p>
                      <p><strong>Teléfono:</strong> +34 644 669 828</p>
                      <p><strong>Sitio web:</strong> desarrolloweb-danipereira.com</p>
                      <p><strong>Actividad:</strong> Desarrollo y diseño web</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Objeto</h2>
                <p>El presente aviso legal regula el uso del sitio web desarrolloweb-danipereira.com (en adelante, "el sitio web"), del que es titular Daniel Pereira Gesteiro.</p>
                <p className="mt-4">La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este aviso legal.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Condiciones de Uso</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>El acceso y uso de este sitio web es gratuito</li>
                  <li>El usuario se compromete a hacer un uso adecuado de los contenidos</li>
                  <li>Queda prohibido el uso del sitio web para fines ilícitos o lesivos</li>
                  <li>No se permite la reproducción, distribución o modificación de los contenidos sin autorización</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Responsabilidad</h2>
                <p className="mb-4">El titular del sitio web no se hace responsable de:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>La continuidad y disponibilidad de los contenidos</li>
                  <li>La ausencia de errores en dichos contenidos</li>
                  <li>La ausencia de virus o elementos lesivos</li>
                  <li>Los daños producidos por el acceso o uso del sitio web</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Propiedad Intelectual</h2>
                <p>Todos los contenidos del sitio web (textos, imágenes, sonidos, código fuente, marcas o logotipos) son propiedad de Daniel Pereira Gesteiro o de terceros que han autorizado su uso.</p>
                <p className="mt-4">Queda prohibida la reproducción, distribución, comunicación pública y transformación de dichos contenidos sin la autorización expresa del titular.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Enlaces</h2>
                <p>El sitio web puede contener enlaces a otros sitios web. El titular no se hace responsable del contenido de dichos sitios ni de las condiciones de uso de los mismos.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Protección de Datos</h2>
                <p>El tratamiento de datos personales se rige por lo dispuesto en nuestra <button className="text-blue-600 hover:underline">Política de Privacidad</button>, en cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modificaciones</h2>
                <p>El titular se reserva el derecho a modificar cualquier tipo de información que pudiera aparecer en el sitio web, sin que exista obligación de preavisar o poner en conocimiento de los usuarios dichas modificaciones.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Legislación Aplicable</h2>
                <p>El presente aviso legal se rige por la legislación española. Para la resolución de cualquier controversia, las partes se someterán a los juzgados y tribunales de Madrid.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contacto</h2>
                <p>Para cualquier consulta relacionada con este aviso legal, puedes contactar con nosotros:</p>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p><strong>Email:</strong> info.danipereira@gmail.com</p>
                  <p><strong>Teléfono:</strong> +34 644 669 828</p>
                  <p><strong>Dirección:</strong> Plaza de la Solidaridad 7 - 4C, 28850 Torrejón de Ardoz, Madrid</p>
                </div>
              </section>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {page === 'privacy' && <Shield className="w-6 h-6 text-blue-600" />}
            {page === 'terms' && <FileText className="w-6 h-6 text-blue-600" />}
            {page === 'cookies' && <Cookie className="w-6 h-6 text-blue-600" />}
            {page === 'legal' && <Scale className="w-6 h-6 text-blue-600" />}
            <h2 className="text-xl font-bold text-gray-900">
              {page === 'privacy' && 'Política de Privacidad'}
              {page === 'terms' && 'Términos y Condiciones'}
              {page === 'cookies' && 'Política de Cookies'}
              {page === 'legal' && 'Aviso Legal'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {getPageContent()}
        </div>
      </div>
    </div>
  );
};

export default LegalPages;