import type { APIRoute } from 'astro';
import { todasLasPaginas, paginasDelBlog, absoluta } from '@/seo/seo';

/**
 * /sitemap.xml — un solo archivo con todas las páginas indexables.
 *
 * Se genera desde `src/seo/seo.ts`, que a su vez saca las fichas de curso del
 * catálogo: publicar un curso nuevo lo añade aquí sin tocar nada. `lastmod`
 * solo se emite cuando la página declara una fecha real; ponerle la del build
 * a todo el sitio es ruido que los buscadores terminan ignorando.
 */
export const GET: APIRoute = async () => {
  const urls = [...todasLasPaginas(), ...(await paginasDelBlog())]
    .filter((p) => !p.privada)
    .map((p) =>
      [
        '  <url>',
        `    <loc>${absoluta(p.ruta)}</loc>`,
        p.actualizado ? `    <lastmod>${p.actualizado}</lastmod>` : '',
        `    <changefreq>${p.cambio}</changefreq>`,
        `    <priority>${p.prioridad.toFixed(1)}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
