# 📧 Guía Rápida: Conectar Formulario a email

## 🚀 OPCIÓN 1: Formspree (Recomendado - Más Fácil)

### ✅ Ventajas:

- ✅ **Súper fácil** - Solo 2 pasos
- ✅ **Funciona en cualquier hosting** (Netlify, Vercel, etc.)
- ✅ **Plan gratuito** - 50 envíos/mes
- ✅ **Sin código adicional**

### 📋 Pasos:

1. **Ve a [formspree.io](https://formspree.io)** y crea cuenta gratis
2. **Crea un nuevo formulario** con email: `info.danipereira@gmail.com`
3. **Copia el Form ID** (algo como `xpzgkqyw`)
4. **Reemplaza en el código:**
   ```javascript
   const formspreeEndpoint = 'https://formspree.io/f/xpzgkqyw'; // Tu Form ID aquí
   ```
5. **¡Listo!** - Ya recibirás emails

---

## 🚀 OPCIÓN 2: Netlify Forms (Si despliegas en Netlify)

### ✅ Ventajas:

- ✅ **Completamente gratis**
- ✅ **Cero configuración**
- ✅ **Integrado con Netlify**

### 📋 Pasos:

1. **Descomenta las líneas en el código:**
   ```html
   name="contact-form"
   method="POST"
   data-netlify="true"
   data-netlify-honeypot="bot-field"
   ```
2. **Descomenta los campos ocultos:**
   ```html
   <input type="hidden" name="form-name" value="contact-form" />
   <input type="hidden" name="bot-field" />
   ```
3. **Despliega en Netlify**
4. **Ve a tu dashboard de Netlify** → Forms
5. **¡Listo!** - Recibirás notificaciones por email

---

## 🎯 ¿Cuál Elegir?

### 👍 **Usa Formspree si:**

- Quieres la solución más fácil
- Despliegas en cualquier plataforma
- No te importa el límite de 50 emails/mes

### 👍 **Usa Netlify Forms si:**

- Despliegas específicamente en Netlify
- Quieres completamente gratis sin límites
- Prefieres todo integrado

---

## 🔧 Configuración Actual

El código está preparado para **Formspree**. Solo necesitas:

1. **Ir a formspree.io**
2. **Crear cuenta con info.danipereira@gmail.com**
3. **Copiar tu Form ID**
4. **Reemplazar `YOUR_FORM_ID` en el código**

¡En 5 minutos tendrás emails llegando a tu bandeja! 📨

---

## 📞 Resultado

Recibirás emails con este formato:

```
🚀 Nueva Solicitud de Presupuesto - Juan Pérez

Nombre: Juan Pérez
Email: juan@ejemplo.com
Teléfono: +34 600 000 000
Empresa: Mi Empresa SL

Tipo de Proyecto: E-commerce
Presupuesto: €6,000 - €10,000
Plazo: 1 mes

Características: Diseño Responsivo, SEO Optimizado, Sistema de Pagos

Descripción: Necesito una tienda online para vender productos...

Método de contacto preferido: Email
Urgencia: Normal

Fecha: 15/1/2025, 14:30:25
```

¡Súper fácil! 🎉
