# Formulario en el hosting — formularios.excelsius.biz

La web vive en **Cloudflare** (se publica sola con cada cambio en GitHub). Cloudflare no
ejecuta PHP, así que el formulario se queda en el hosting (cPanel):

```
Visitante → www.excelsius.biz/api/contacto.php (Cloudflare, worker/index.js)
          → formularios.excelsius.biz/api/contacto.php (cPanel)
          → mail() → informes@excelsius.biz
```

El navegador no nota el reenvío: el formulario sigue enviando a `/api/contacto.php`.

## Instalación en cPanel (una sola vez)

1. **Domains → Create A New Domain** (o *Subdomains*): `formularios.excelsius.biz`.
   - Document root: `formularios.excelsius.biz` (carpeta propia, **no** `public_html`:
     el `.htaccess` de `public_html` redirige todo a www y crearía un bucle).
   - Desmarca «Share document root» si aparece.
2. **SSL/TLS Status → Run AutoSSL** hasta que el subdominio salga con candado verde.
3. **File Manager** → entra a la carpeta del subdominio y sube el contenido de
   `hosting/formularios/` tal cual:
   ```
   formularios.excelsius.biz/
   ├── .htaccess
   └── api/
       ├── config.php
       └── contacto.php
   ```
   (Settings → *Show Hidden Files* para ver el `.htaccess`.)
4. **Borra** `public_html/api/testmail.php` si existe (era una herramienta de prueba).

## Comprobar

- `https://formularios.excelsius.biz/api/config.php` → **403**.
- `https://formularios.excelsius.biz/` → redirige a la web.
- Enviar el formulario desde la web → «Mensaje enviado…» y llega a informes@.

Si el hosting responde 409 (desafío anti-bots con cookie `humans_XXXX`), el formulario
lo resuelve solo (`src/scripts/enviarFormulario.ts`); un 409 seguido de 200 en F12 es normal.

## Cuando se cambie el PHP

Los archivos de `hosting/formularios/` **no** se publican solos: tras cambiarlos en
GitHub hay que volver a subirlos al subdominio por File Manager.
