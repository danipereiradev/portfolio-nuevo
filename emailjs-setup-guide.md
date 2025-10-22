# 📧 Guía de Configuración EmailJS

## 🚀 Pasos para Configurar EmailJS

### 1. Crear Cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" y crea tu cuenta gratuita
3. Verifica tu email

### 2. Configurar Servicio de Email

1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Gmail"** (recomendado)
4. Conecta tu cuenta **info.danipereira@gmail.com**
5. Copia el **Service ID** que se genera

### 3. Crear Template de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Usa este template:

```html
Asunto: 🚀 Nueva Solicitud de Presupuesto - {{project_type}}

NUEVA SOLICITUD DE PRESUPUESTO
Fecha: {{submission_date}}

=== INFORMACIÓN DE CONTACTO ===
👤 Nombre: {{from_name}}
📧 Email: {{from_email}}
📱 Teléfono: {{phone}}
🏢 Empresa: {{company}}

=== DETALLES DEL PROYECTO ===
🎯 Tipo: {{project_type}}
💰 Presupuesto: {{budget}}
⏰ Plazo: {{timeline}}

=== CARACTERÍSTICAS REQUERIDAS ===
✨ {{features}}

=== DESCRIPCIÓN DEL PROYECTO ===
📝 {{description}}

=== INSPIRACIÓN/REFERENCIAS ===
💡 {{inspiration}}

=== PREFERENCIAS DE CONTACTO ===
📞 Método preferido: {{preferred_contact}}
🚨 Urgencia: {{urgency}}

---
Este email fue enviado desde el formulario de contacto de danipereiraweb.es
```

4. Guarda el template y copia el **Template ID**

### 4. Obtener Public Key

1. Ve a **"Account"** → **"General"**
2. Copia tu **Public Key**

### 5. Actualizar el Código

En el archivo `src/components/ContactForm.tsx`, reemplaza estas líneas:

```javascript
// REEMPLAZAR ESTOS VALORES:
const serviceId = 'YOUR_SERVICE_ID';     // Tu Service ID de Gmail
const templateId = 'YOUR_TEMPLATE_ID';   // Tu Template ID
const publicKey = 'YOUR_PUBLIC_KEY';     // Tu Public Key
```

### 6. Configurar Límites (Opcional)

- Plan gratuito: 200 emails/mes
- Para más emails, considera el plan de pago

## 🔧 Ejemplo de Configuración Final

```javascript
const serviceId = 'service_abc123';      // Ejemplo
const templateId = 'template_xyz789';    // Ejemplo
const publicKey = 'user_def456';         // Ejemplo
```

## ✅ Verificar Funcionamiento

1. Completa el formulario en tu web
2. Envía una solicitud de prueba
3. Revisa tu email info.danipereira@gmail.com
4. ¡Deberías recibir el email formateado!

## 🚨 Importante

- Mantén tus keys seguras
- No las subas a repositorios públicos
- El Public Key es seguro para frontend
- Service ID y Template ID también son seguros

## 📞 Soporte

Si tienes problemas:

- Revisa la consola del navegador para errores
- Verifica que las keys sean correctas
- Comprueba que el servicio de Gmail esté activo
- Revisa la carpeta de spam

¡Una vez configurado, recibirás todos los formularios directamente en tu email! 🎉
