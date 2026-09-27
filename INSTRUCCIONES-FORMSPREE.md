# 🚨 CONFIGURACIÓN URGENTE - FORMSPREE

## Ya tienes cuenta en Formspree, ahora necesitas:

### 1. Crear un nuevo formulario:

1. Ve a tu dashboard de Formspree
2. Haz clic en **"+ New Form"**
3. Dale un nombre: **"Contacto Web Dani Pereira"**
4. Email de destino: **info.danipereira@gmail.com**
5. Haz clic en **"Create Form"**

### 2. Copiar tu Form ID:

Después de crear el formulario verás una URL como:

```
https://formspree.io/f/XXXXXXXX
```

**Copia solo la parte XXXXXXXX** (tu Form ID único)

### 3. Actualizar el código:

En el archivo `src/components/ContactForm.tsx`, línea 165, reemplaza:

```javascript
const formspreeEndpoint = 'https://formspree.io/f/xpzgkqyw';
```

Por:

```javascript
const formspreeEndpoint = 'https://formspree.io/f/TU_FORM_ID_AQUI';
```

### 4. Configurar el formulario en Formspree:

- ✅ **Email notifications:** Activado
- ✅ **Spam filtering:** Activado
- ✅ **reCAPTCHA:** Desactivado (usamos verificación propia)

## 🎯 Una vez hecho esto:

1. Completa el formulario en tu web
2. Envía una prueba
3. Revisa email (incluyendo spam)
4. ¡Deberías recibir el email formateado!

## 📞 Si no funciona:

- Verifica que el Form ID sea correcto
- Revisa la consola del navegador para errores
- Comprueba que el formulario esté activo en Formspree

¿Cuál es tu Form ID de Formspree para que lo actualice en el código?
