# 📧 INSTRUCCIONES PARA CONFIGURAR FORMSPREE

## 🚨 IMPORTANTE: DEBES HACER ESTO PARA QUE FUNCIONE EL FORMULARIO

### Paso 1: Crear cuenta en Formspree

1. Ve a **https://formspree.io**
2. Haz clic en **"Get Started"**
3. Crea una cuenta gratuita con email: **info.danipereira@gmail.com**

### Paso 2: Crear un nuevo formulario

1. Una vez logueado, haz clic en **"+ New Form"**
2. Dale un nombre: **"Contacto Desarrollo Web Dani Pereira"**
3. En **"Email"** pon: **info.danipereira@gmail.com**
4. Haz clic en **"Create Form"**

### Paso 3: Obtener el Form ID

1. Después de crear el formulario, verás una URL como:
   `https://formspree.io/f/XXXXXXXX`
2. Copia el código que aparece después de `/f/` (ejemplo: `xpzgkqyw`)

### Paso 4: Actualizar el código

1. En el archivo `src/components/ContactForm.tsx`
2. Busca la línea:
   ```javascript
   const formspreeEndpoint = 'https://formspree.io/f/xpzgkqyw';
   ```
3. Reemplaza `xpzgkqyw` con tu Form ID real

### Paso 5: Verificar configuración

1. En tu dashboard de Formspree, ve a **Settings**
2. Asegúrate de que:
   - ✅ **Email notifications** esté activado
   - ✅ **Spam filtering** esté activado
   - ✅ **reCAPTCHA** esté desactivado (usamos verificación propia)

### Paso 6: Probar el formulario

1. Completa el formulario en tu web
2. Envía una solicitud de prueba
3. Revisa email **info.danipereira@gmail.com**
4. También revisa la carpeta de **SPAM**

## 🎯 Formato del email que recibirás:

```
Asunto: Nueva Solicitud de Presupuesto - [Nombre del Cliente]

Nombre: Juan Pérez
Email: juan@ejemplo.com
Teléfono: +34 600 000 000
Empresa: Mi Empresa SL

Tipo de Proyecto: E-commerce
Presupuesto: €6,000 - €10,000
Plazo: 1 mes

Características: Diseño Responsivo, SEO Optimizado, Sistema de Pagos

Descripción: Necesito una tienda online para vender productos...

Inspiración: Me gusta el diseño de...

Método de contacto preferido: Email
Urgencia: Normal

Fecha: 15/1/2025, 14:30:25
```

## 🔧 Si no funciona:

1. **Verifica el Form ID** - Debe ser exactamente el que te da Formspree
2. **Revisa la consola** del navegador para ver errores
3. **Comprueba el email** - Incluyendo carpeta de spam
4. **Verifica la cuenta** - Asegúrate de que tu cuenta Formspree esté verificada

## 📞 Plan gratuito de Formspree:

- ✅ **50 envíos por mes** (suficiente para empezar)
- ✅ **Sin límite de formularios**
- ✅ **Filtro anti-spam incluido**
- ✅ **Notificaciones por email**

¡Una vez configurado correctamente, recibirás todos los formularios directamente en email! 🎉

---

**RECUERDA:** El formulario NO funcionará hasta que configures tu propio Form ID de Formspree.
</parameter>
