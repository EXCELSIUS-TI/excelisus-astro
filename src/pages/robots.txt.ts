import type { APIRoute } from 'astro';
import { absoluta, RASTREADORES_IA, todasLasPaginas } from '@/seo/seo';

/**
 * /robots.txt — generado desde la misma configuración que el sitemap.
 *
 * Se admite de forma explícita a los rastreadores de asistentes: así las
 * respuestas sobre Excelsius salen de la fuente y no de terceros. Se apunta
 * al sitemap y a los archivos pensados para modelos de lenguaje.
 */
export const GET: APIRoute = () => {
  const privadas = todasLasPaginas().filter((p) => p.privada);

  const lineas = [
    '# Todos los rastreadores pueden leer el sitio.',
    'User-agent: *',
    'Allow: /',
    ...privadas.map((p) => `Disallow: ${p.ruta}`),
    '',
    '# Rastreadores de asistentes y buscadores generativos.',
    ...RASTREADORES_IA.flatMap((agente) => [`User-agent: ${agente}`, 'Allow: /', '']),
    '# Mapa del sitio y resúmenes para modelos de lenguaje.',
    `Sitemap: ${absoluta('/sitemap.xml')}`,
    `# Índice: ${absoluta('/llms.txt')}`,
    `# Contenido completo: ${absoluta('/llms-full.txt')}`,
    '',
  ];

  return new Response(lineas.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
