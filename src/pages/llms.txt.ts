import type { APIRoute } from 'astro';
import { site, contacto, servicios, rutas } from '@/data/site';
import { categorias, cursosPorCategoria } from '@/data/cursos';
import { blog, categoriasBlog } from '@/data/blog';
import { articulosPublicados } from '@/utils/blog';

/**
 * /llms.txt — índice legible por modelos de lenguaje (llmstxt.org).
 *
 * Es el mapa corto del sitio: qué es Excelsius, cómo contactarla y qué páginas
 * existen, con una línea por cada una. El contenido completo vive en
 * /llms-full.txt. Se genera desde `src/data/`, así que nunca se desfasa del
 * sitio publicado.
 */
export const GET: APIRoute = async () => {
  const articulos = await articulosPublicados();
  const u = (ruta: string) => `${site.url}${ruta}`;

  const lineas = [
    `# ${site.nombre}`,
    '',
    `> ${site.descripcion}`,
    '',
    'Excelsius es una empresa peruana de tecnología con sede en Lima. Trabaja en dos frentes:',
    'desarrollo e implementación de software a medida (sistemas web, apps móviles, ERP Odoo,',
    'Business Intelligence con Power BI y Machine Learning) y formación profesional en vivo',
    'en seguridad y gestión ambiental, marketing digital y análisis de datos, con certificación',
    'por horas académicas.',
    '',
    '## Datos de contacto',
    '',
    `- Teléfono y WhatsApp: ${contacto.telefono} (+51 951 753 920)`,
    `- Correo: ${contacto.correo}`,
    `- Dirección: ${contacto.direccion}, ${contacto.ciudad}`,
    `- Atención: ${contacto.horario}. ${contacto.horarioClases}`,
    `- Sitio: ${site.url}`,
    '',
    '## Páginas principales',
    '',
    `- [Inicio](${u(rutas.inicio)}): qué hace Excelsius, servicios, cursos, método de trabajo y contacto.`,
    `- [Nosotros](${u(rutas.nosotros)}): equipo de ingenieros full stack, compromisos y stack de trabajo.`,
    `- [Servicios](${u(rutas.servicios)}): las seis líneas de servicio con entregables y tecnologías.`,
    `- [Cursos](${u(rutas.cursos)}): catálogo completo de cursos de especialización en vivo.`,
    `- [Desarrollo de software](${u('/software/')}): software a medida, aplicaciones móviles iOS y Android, comercio electrónico, ERP Odoo, CRM Vtiger, macros en Excel, Business Intelligence y aulas virtuales.`,
    `- [Servicio de análisis de datos](${u('/servicio-analisis-de-datos/')}): consultoría en análisis de datos, Business Intelligence, tableros en Power BI, Machine Learning y Microsoft Fabric, con la metodología en cuatro fases.`,
    `- [Capacitaciones SST para empresas](${u('/curso-sst-1/')}): cursos in house de Seguridad y Salud en el Trabajo conforme a la Ley 29783 (primeros auxilios, trabajos en altura, IPERC).`,
    `- [Blog](${u(blog.ruta)}): ${blog.descripcion}`,
    `- [Contacto](${u(rutas.contacto)}): canales de atención, formulario y ubicación.`,
    `- [Políticas de privacidad](${u('/politicas-privacidad/')}): qué datos personales se recopilan, para qué se usan y cómo ejercer los derechos de la Ley N.° 29733.`,
    '',
    '## Cursos',
    '',
    ...categorias.flatMap((c) => [
      `### ${c.nombre}`,
      '',
      ...cursosPorCategoria(c.id).map((k) =>
        `- [${k.titulo}](${u(`/cursos/${k.slug}/`)}): ${k.resumen} ${
          k.proximo
            ? 'Próximo inicio por confirmar.'
            : `${k.horas}, ${k.sesiones}, ${k.dias} de ${k.horario}.`
        }`,
      ),
      '',
    ]),
    '## Servicios',
    '',
    ...servicios.map((s) => `- [${s.nombre}](${u(`${rutas.servicios}#${s.id}`)}): ${s.resumen}`),
    '',
    '## Blog',
    '',
    ...articulos.map(
      (a) => `- [${a.data.titulo}](${u(`${blog.ruta}${a.id}/`)}) (${categoriasBlog[a.data.categoria].nombre}): ${a.data.descripcion}`,
    ),
    '',
    '## Opcional',
    '',
    `- [Contenido completo del sitio](${u('/llms-full.txt')}): temarios, objetivos, públicos y preguntas frecuentes de todos los cursos, y el texto íntegro de los artículos del blog, en un solo archivo.`,
    `- [RSS del blog](${u(`${blog.ruta}rss.xml`)})`,
    `- [Mapa del sitio](${u('/sitemap.xml')})`,
    '',
  ];

  return new Response(lineas.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
