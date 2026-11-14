# Despliegue a cPanel — www.excelsius.biz

> **OBSOLETO (nov-2026).** La web ya no se sube a cPanel: se publica en Cloudflare con cada
> cambio en GitHub (`wrangler.jsonc`). Solo el formulario sigue en el hosting, en el
> subdominio `formularios.excelsius.biz`: ver **`hosting/LEEME.md`**. Este documento queda
> como referencia histórica (secciones de correo en cPanel aún válidas).

> Mismo esquema que `academic-navigator-astro` (tfgtfmasesores.com): los PHP viven en
> `public/api/` y Astro los copia solos a `dist/api/` en cada build. Solo se sube el contenido de `dist/`.

## 1. Cómo funciona el formulario

Hay un solo formulario (`src/components/ui/Formulario.astro`) usado en 7 sitios. Todos envían a
**informes@excelsius.biz** (llegan ahí y salen desde ahí, así pasan SPF/DKIM del dominio).

| Dónde está | Asunto del correo |
| --- | --- |
| Inicio (sección Contacto) | `[EXCELSIUS · excelsius.biz] Contacto desde el inicio — Nombre (Empresa)` |
| `/contacto/` | `… Formulario de contacto — …` |
| `/servicios/` | `… Cotización de servicios — …` |
| `/cursos/<slug>/` (6 fichas) | `… Curso: <título del curso> — …` |
| `/curso-sst-1/` | `… Capacitación SST para empresa — …` |
| `/servicio-analisis-de-datos/` | `… Servicio de análisis de datos — …` |
| `/software/` | `… Desarrollo de software — …` |

Cada correo trae nombre, empresa, correo, teléfono, «me interesa», mensaje, la página exacta
desde la que se envió y dos botones: **Responder por correo** (Reply-To del cliente) y
**Escribir por WhatsApp** (un celular de 9 cifras que empieza en 9 se asume de Perú, +51).

El botón **Enviar por WhatsApp** sigue disponible como segunda vía (abre `wa.me/51951753920`
con el mensaje redactado); ese no pasa por el servidor.

| Archivo | Qué hace |
| --- | --- |
| `public/api/config.php` | Correo, etiqueta del asunto, clave de prueba y la plantilla del correo |
| `public/api/contacto.php` | Recibe el formulario, valida y envía |
| `public/api/testmail.php` | Envía un mensaje de ejemplo a informes@ (protegido con clave) |
| `src/scripts/enviarFormulario.ts` | Envío desde el navegador; resuelve el desafío anti-bots del hosting si lo hay (§5) |

Protección: campo trampa (`website`), 1 envío cada 30 s por IP, consentimiento de privacidad
obligatorio y `config.php` bloqueado desde el `.htaccess`.

## 2. Antes de compilar

En `public/api/config.php` cambia **`TEST_KEY`** (`cambia-esta-clave`) por una clave propia.

## 3. Build y subida

```bash
pnpm install
pnpm build
```

Verifica que existan `dist/.htaccess` y `dist/api/{config,contacto,testmail}.php`.

> ⚠️ **Hoy `public_html` tiene el WordPress en producción.** Apache busca `index.php` antes que
> `index.html`: si solo se suben los archivos encima, la portada seguiría siendo WordPress.

1. cPanel → **Backup** (o comprime `public_html` completo) y exporta la base de datos desde
   phpMyAdmin. Guárdalo fuera del servidor.
2. En **File Manager** mueve el contenido actual de `public_html` a una carpeta fuera de la web
   (p. ej. `~/wordpress-respaldo/`), incluidos `index.php`, `wp-*`, `.htaccess` y `xmlrpc.php`.
   Si hay otras carpetas que no son de WordPress (subdominios, `.well-known`, verificaciones),
   déjalas donde están.
3. Comprime **el contenido** de `dist/` (no la carpeta) en un `.zip`, súbelo a `public_html` y
   usa **Extract**. Borra el `.zip`.
4. **Settings → Show Hidden Files** y confirma que está el `.htaccess`.
5. El sitio usa una caché nginx delante de Apache: si tras subir aún ves el WordPress, purga la
   caché desde cPanel (*Nginx Caching → Clear Cache*, si existe) o espera unos minutos.

El `.htaccess` redirige todo a `https://www.excelsius.biz` (la misma URL del sitemap, canónicas
y Open Graph), añade la barra final a las URL y redirige las rutas viejas de WordPress
(`/cursos/seguridad-y-gestion-ambiental/`, etc.). Si el SSL no estuviera activo, comenta las tres
líneas de https/www.

## 4. Correo en cPanel

El MX de excelsius.biz apunta al mismo servidor (`MX 0 excelsius.biz`) y el SPF ya incluye la IP
del hosting, así que `mail()` entrega en local:

1. **Email Accounts**: confirma que existe **informes@excelsius.biz** (si no, el correo se pierde).
2. **Email Routing → excelsius.biz**: debe estar en **Local Mail Exchanger** (o Automatic).
   Si algún día el correo pasa a Google Workspace / Outlook, cámbialo a *Remote*.
3. **Email Deliverability → excelsius.biz**: SPF y DKIM en verde.

## 5. Probar

1. `https://www.excelsius.biz/api/testmail.php?key=TU_CLAVE`
   → `{"ok":true,...}` y llega a informes@ un mensaje de ejemplo con el diseño real.
2. `/contacto/` → rellena y envía → aparece «Mensaje enviado…» bajo el botón y llega a informes@.
3. Una ficha de curso (`/cursos/…`) → el asunto debe llevar `Curso: <título>`.
4. `https://www.excelsius.biz/api/config.php` → debe dar **403**.
5. Si no llega: revisa SPAM, **cPanel → Track Delivery**, y F12 → Network → `contacto.php`.

> Si el hosting protege los `.php` con un desafío anti-bots (cookie `humans_XXXX`, respuesta 409),
> el formulario lo resuelve solo: lee la cookie del desafío y reintenta. Un 409 seguido de un
> 200/422 en F12 es normal.

## 6. Después de probar

- **Borra `api/testmail.php`** del servidor (o cambia `TEST_KEY`).
- Search Console: envía `https://www.excelsius.biz/sitemap.xml` (verificación en
  `site.verificacionGoogle` de `src/data/site.ts`).

## Checklist

- [ ] `TEST_KEY` cambiada
- [ ] `pnpm build` genera `dist/.htaccess` y `dist/api/*.php`
- [ ] Respaldo del WordPress (archivos + base de datos) descargado
- [ ] WordPress movido fuera de `public_html`
- [ ] Contenido de `dist/` subido a `public_html`
- [ ] Cuenta informes@excelsius.biz existe · Email Routing local · SPF/DKIM en verde
- [ ] `/api/testmail.php?key=...` → correo recibido en informes@
- [ ] Formulario probado desde `/contacto/` y desde una ficha de curso
- [ ] `/api/config.php` responde 403
- [ ] `testmail.php` borrado
- [ ] Sitemap enviado en Search Console
