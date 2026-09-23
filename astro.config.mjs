import { defineConfig } from 'astro/config';

/**
 * Salida 100 % estática: `dist/` se sube tal cual a `public_html` en cPanel.
 * `format: 'directory'` genera `/cursos/index.html`, así Apache sirve las URL
 * limpias sin necesidad de reescrituras.
 */
export default defineConfig({
  site: 'https://www.excelsius.biz',
  /* 'ignore' acepta la URL con y sin barra final: en `astro dev`, `always`
     devolvía 404 al entrar a /curso-sst-1 sin barra. El sitio se sigue
     generando en carpetas (/curso-sst-1/index.html) y el .htaccess redirige
     a la versión con barra en producción, que es la canónica. */
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  /* El código de los artículos se resalta al construir con los dos temas a la
     vez; `components/blog/Prosa.astro` elige cuál pintar según `data-tema`. */
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
      wrap: false,
    },
  },
  /* El sitemap y el robots se generan en `src/pages/`, a partir de
     `src/seo/seo.ts`: así llevan prioridad, frecuencia y `lastmod` propios,
     que la integración no permite afinar por página. */
});
