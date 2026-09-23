/**
 * Configuración de posicionamiento del sitio.
 *
 * Aquí vive todo lo que un buscador —o un asistente— lee de cada página:
 * título, descripción, imagen para compartir, si se indexa y qué peso tiene
 * dentro del mapa del sitio. Las páginas pueden seguir pasando su título y su
 * descripción a mano; esto es el respaldo y la fuente única del sitemap y del
 * robots.txt, que se generan a partir de estas mismas rutas.
 */

import { site, contacto } from '@/data/site';
import { cursos } from '@/data/cursos';
import { blog } from '@/data/blog';

/** Límites a partir de los cuales Google recorta en los resultados. */
export const LIMITES = { titulo: 62, descripcion: 165, descripcionMinima: 70 } as const;

export type Cambio = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type PaginaSeo = {
  /** ruta publicada, siempre con barra final */
  ruta: string;
  titulo: string;
  descripcion: string;
  /** peso relativo dentro del sitio, de 0 a 1 */
  prioridad: number;
  cambio: Cambio;
  /** fuera del índice y fuera del sitemap */
  privada?: boolean;
  /** fecha de última revisión del contenido, si se conoce */
  actualizado?: string;
  /** imagen para compartir, si no es la de la marca */
  imagen?: ImagenSocial;
};

export type ImagenSocial = { src: string; ancho: number; alto: number; tipo: string };

/** Las tarjetas se generan a 1200 × 630, la proporción que piden las redes. */
export const MEDIDA_SOCIAL = { ancho: 1200, alto: 630 } as const;

export const IMAGEN_POR_DEFECTO: ImagenSocial = {
  src: '/img/og.png',
  ...MEDIDA_SOCIAL,
  tipo: 'image/png',
};

/**
 * Tarjeta de un curso, generada por `scripts/og.py`. Va en JPEG porque
 * WhatsApp no previsualiza WebP de forma fiable y una foto en PNG pesa cinco
 * veces más.
 */
export const tarjetaDeCurso = (slug: string): ImagenSocial => ({
  src: `/img/og/${slug}.jpg`,
  ...MEDIDA_SOCIAL,
  tipo: 'image/jpeg',
});

/**
 * Las páginas fijas. Los cursos se añaden solos desde `src/data/cursos.ts`,
 * así que publicar uno nuevo no obliga a tocar este archivo.
 */
export const paginas: PaginaSeo[] = [
  {
    ruta: '/',
    /* sin la marca: la plantilla añade « · EXCELSIUS» a todos los títulos y
       con `site.titulo` el nombre salía dos veces */
    titulo: 'Software a medida, datos y capacitación',
    descripcion: site.descripcion,
    prioridad: 1,
    cambio: 'weekly',
  },
  {
    ruta: '/servicios/',
    titulo: 'Servicios',
    descripcion:
      'Software a medida, apps móviles, diseño web, Business Intelligence con Power BI, Machine Learning e implementación de ERP Odoo en Perú.',
    prioridad: 0.9,
    cambio: 'monthly',
  },
  {
    ruta: '/software/',
    titulo: 'Desarrollo de software a medida',
    descripcion:
      'Software a medida, apps iOS y Android, ecommerce, ERP Odoo, CRM Vtiger, macros en Excel y aulas virtuales, por ingenieros certificados en Perú.',
    prioridad: 0.9,
    cambio: 'monthly',
  },
  {
    ruta: '/servicio-analisis-de-datos/',
    titulo: 'Análisis de datos y Business Intelligence',
    descripcion:
      'Análisis de datos para empresas en Perú: integración de fuentes, modelado, tableros en Power BI, Machine Learning y Fabric, con capacitación del equipo.',
    prioridad: 0.9,
    cambio: 'monthly',
  },
  {
    ruta: '/cursos/',
    titulo: 'Cursos',
    descripcion:
      'Cursos de especialización en vivo con IA aplicada: SSOMA, marketing digital, SQL Server, Python y Power BI. Certificación por horas académicas.',
    prioridad: 0.9,
    cambio: 'weekly',
  },
  {
    ruta: '/curso-sst-1/',
    titulo: 'Cursos SST en Lima y todo el Perú',
    descripcion:
      'Capacitaciones en Seguridad y Salud en el Trabajo para empresas: primeros auxilios, trabajos en altura e IPERC. Cumple la Ley 29783, virtual o presencial.',
    prioridad: 0.8,
    cambio: 'monthly',
  },
  {
    ruta: blog.ruta,
    titulo: blog.titulo,
    descripcion: blog.descripcion,
    prioridad: 0.8,
    cambio: 'weekly',
  },
  {
    ruta: '/nosotros/',
    titulo: 'Nosotros',
    descripcion:
      'EXCELSIUS es una empresa de ingenieros full stack que desarrolla software, implementa ERP y analítica, y capacita equipos en seguridad, marketing y datos.',
    prioridad: 0.7,
    cambio: 'yearly',
  },
  {
    ruta: '/contacto/',
    titulo: 'Contacto',
    descripcion:
      'Conversemos sobre tu proyecto de software, analítica de datos o capacitación. WhatsApp, teléfono, correo y oficina de EXCELSIUS en Lima.',
    prioridad: 0.7,
    cambio: 'yearly',
  },
  {
    ruta: '/politicas-privacidad/',
    titulo: 'Políticas de privacidad',
    descripcion:
      'Qué datos personales recopila EXCELSIUS, para qué los usa y cómo ejercer los derechos reconocidos por la Ley N.° 29733 de Protección de Datos Personales.',
    prioridad: 0.3,
    cambio: 'yearly',
    actualizado: '2026-01-01',
  },
];

/**
 * Descripción de un curso a partir de sus datos. El horario ya termina en
 * punto —«7:30 – 10:30 p. m.»—, así que la frase no añade otro.
 */
export const descripcionDeCurso = (c: {
  subtitulo: string;
  horas: string;
  dias: string;
  horario: string;
}): string =>
  `${c.subtitulo}. ${c.horas} en vivo, ${c.dias.toLowerCase()} de ${c.horario.replace(/\.$/, '')}.`;

/** Las fichas de curso, derivadas del catálogo. */
export const paginasDeCursos = (): PaginaSeo[] =>
  cursos.map((c) => ({
    ruta: `/cursos/${c.slug}/`,
    titulo: c.tituloSeo ?? c.titulo,
    descripcion: descripcionDeCurso(c),
    prioridad: c.destacado ? 0.9 : 0.8,
    cambio: 'weekly',
    imagen: tarjetaDeCurso(c.slug),
  }));

/** Tarjeta social de un artículo, generada por `scripts/og.py`. */
export const tarjetaDeArticulo = (slug: string): ImagenSocial => ({
  src: `/img/og/blog/${slug}.jpg`,
  ...MEDIDA_SOCIAL,
  tipo: 'image/jpeg',
});

/** Todo lo que se publica, en el orden en que conviene rastrearlo. */
export const todasLasPaginas = (): PaginaSeo[] => [...paginas, ...paginasDeCursos()];

/**
 * Los artículos del blog para el sitemap. Es asíncrono porque sale de la
 * colección de contenido; cada uno lleva su `lastmod` real, que es la fecha
 * que Search Console usa para decidir cuándo volver a rastrearlo.
 */
export async function paginasDelBlog(): Promise<PaginaSeo[]> {
  const { articulosPublicados, fechaDe, fechaIso } = await import('@/utils/blog');
  return (await articulosPublicados()).map((a) => ({
    ruta: `${blog.ruta}${a.id}/`,
    titulo: a.data.tituloSeo ?? a.data.titulo,
    descripcion: a.data.descripcion,
    prioridad: a.data.destacado ? 0.8 : 0.7,
    cambio: 'monthly' as const,
    actualizado: fechaIso(fechaDe(a)),
    imagen: tarjetaDeArticulo(a.id),
  }));
}

/** Datos de una ruta concreta; sirve de respaldo a lo que pase la página. */
export const seoDe = (ruta: string): PaginaSeo | undefined =>
  todasLasPaginas().find((p) => p.ruta === ruta);

/** URL absoluta a partir de una ruta del sitio. */
export const absoluta = (ruta: string): string => new URL(ruta, site.url).href;

/**
 * Rastreadores de asistentes y buscadores generativos que se admiten de forma
 * explícita: interesa que las respuestas sobre Excelsius salgan de la fuente.
 */
export const RASTREADORES_IA = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'meta-externalagent',
] as const;

/** Perfiles públicos: alimentan `sameAs` del esquema de la organización. */
export const perfiles = contacto.redes.map((r) => r.url);
