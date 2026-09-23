/**
 * Constructores de datos estructurados (schema.org).
 *
 * Los buscadores y los asistentes leen esto para saber qué es cada página,
 * quién la publica y qué responde. Tenerlos aquí evita que cada plantilla
 * repita el bloque del proveedor y que se desvíen entre sí.
 */

import { site, contacto } from '@/data/site';
import { absoluta, IMAGEN_POR_DEFECTO, perfiles } from './seo';

const TELEFONO = '+51 951 753 920';

/** La organización: se emite en todas las páginas desde el layout. */
export const organizacion = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organizacion`,
  name: site.nombre,
  legalName: site.nombreLargo,
  url: site.url,
  description: site.descripcion,
  logo: absoluta('/favicon.png'),
  image: absoluta(IMAGEN_POR_DEFECTO.src),
  telephone: TELEFONO,
  email: contacto.correo,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Alameda del Arcoíris 118',
    addressLocality: 'Santiago de Surco',
    addressRegion: 'Lima',
    addressCountry: 'PE',
  },
  areaServed: { '@type': 'Country', name: 'Perú' },
  sameAs: perfiles,
});

/** El sitio como tal: ayuda a que el nombre aparezca en los resultados. */
export const sitioWeb = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#sitio`,
  name: site.nombre,
  url: site.url,
  inLanguage: 'es-PE',
  publisher: { '@id': `${site.url}/#organizacion` },
});

/** Proveedor abreviado, para cursos y servicios. */
export const proveedor = () => ({
  '@type': 'Organization',
  name: site.nombre,
  url: site.url,
  telephone: TELEFONO,
  email: contacto.correo,
});

/** Ruta de navegación. `pasos` va del inicio a la página actual. */
export const migas = (pasos: { nombre: string; ruta: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: pasos.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.nombre,
    item: absoluta(p.ruta),
  })),
});

/** Preguntas frecuentes: son las que un asistente cita como respuesta. */
export const preguntasFrecuentes = (items: readonly { pregunta: string; respuesta: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((p) => ({
    '@type': 'Question',
    name: p.pregunta,
    acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
  })),
});

/**
 * Un artículo del blog. `BlogPosting` con autor, editor, fechas, sección,
 * palabras clave e imagen: con esto Google puede mostrarlo como artículo y
 * los asistentes saben quién lo publica y cuándo se revisó.
 */
export const articulo = (a: {
  titulo: string;
  descripcion: string;
  ruta: string;
  imagen: string;
  publicado: string;
  actualizado: string;
  seccion: string;
  etiquetas: readonly string[];
  palabras: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: a.titulo,
  description: a.descripcion,
  url: absoluta(a.ruta),
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluta(a.ruta) },
  image: absoluta(a.imagen),
  datePublished: a.publicado,
  dateModified: a.actualizado,
  inLanguage: 'es-PE',
  articleSection: a.seccion,
  keywords: a.etiquetas.join(', '),
  wordCount: a.palabras,
  author: { '@type': 'Organization', name: 'Equipo Excelsius', url: site.url },
  publisher: {
    '@type': 'Organization',
    '@id': `${site.url}/#organizacion`,
    name: site.nombre,
    logo: { '@type': 'ImageObject', url: absoluta('/favicon.png') },
  },
});

/** El listado del blog: un `Blog` con sus entradas enlazadas. */
export const listaBlog = (entradas: { titulo: string; ruta: string; publicado: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${site.url}/blog/#blog`,
  name: `Blog de ${site.nombre}`,
  url: absoluta('/blog/'),
  inLanguage: 'es-PE',
  publisher: { '@id': `${site.url}/#organizacion` },
  blogPost: entradas.map((e) => ({
    '@type': 'BlogPosting',
    headline: e.titulo,
    url: absoluta(e.ruta),
    datePublished: e.publicado,
  })),
});
