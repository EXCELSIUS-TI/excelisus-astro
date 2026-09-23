import { getCollection, type CollectionEntry } from 'astro:content';
import { cursos } from '@/data/cursos';

/**
 * Consultas del blog. Las páginas, el sitemap, el RSS y los archivos para
 * modelos de lenguaje piden los artículos por aquí, así que el criterio de
 * qué se publica y en qué orden vive en un solo sitio.
 */

export type Articulo = CollectionEntry<'blog'>;

/** Artículos publicados, del más reciente al más antiguo. */
export async function articulosPublicados(): Promise<Articulo[]> {
  const todos = await getCollection('blog', ({ data }) => !data.borrador);

  // un curso recomendado que no existe es un enlace roto: mejor fallar aquí
  for (const a of todos) {
    if (a.data.curso && !cursos.some((c) => c.slug === a.data.curso)) {
      throw new Error(
        `El artículo «${a.id}» recomienda el curso «${a.data.curso}», que no está en src/data/cursos.ts.`,
      );
    }
  }

  return todos.sort((a, b) => b.data.publicado.getTime() - a.data.publicado.getTime());
}

/** Fecha de la última revisión: la de actualización si existe. */
export const fechaDe = (a: Articulo): Date => a.data.actualizado ?? a.data.publicado;

/** Minutos de lectura a 220 palabras por minuto, que es un ritmo de pantalla. */
export function minutosDeLectura(texto = ''): number {
  const palabras = texto
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`[\]()-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 220));
}

/** Cantidad de palabras, para el esquema `BlogPosting`. */
export const palabrasDe = (texto = ''): number => texto.split(/\s+/).filter(Boolean).length;

/**
 * Artículos relacionados: primero los de la misma categoría, después los que
 * comparten etiquetas, y se completa con los más recientes.
 */
export function relacionados(actual: Articulo, todos: Articulo[], cuantos = 3): Articulo[] {
  const puntaje = (a: Articulo) =>
    (a.data.categoria === actual.data.categoria ? 10 : 0) +
    a.data.etiquetas.filter((e) => actual.data.etiquetas.includes(e)).length;

  return todos
    .filter((a) => a.id !== actual.id)
    .map((a) => ({ a, p: puntaje(a) }))
    .sort((x, y) => y.p - x.p || y.a.data.publicado.getTime() - x.a.data.publicado.getTime())
    .slice(0, cuantos)
    .map(({ a }) => a);
}

const FORMATO_FECHA = new Intl.DateTimeFormat('es-PE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** «14 de septiembre de 2026». Se fija en UTC para que el build no dependa del huso. */
export const fechaLegible = (d: Date): string => FORMATO_FECHA.format(d);

/** «2026-09-14», el formato de `datetime`, sitemap y esquemas. */
export const fechaIso = (d: Date): string => d.toISOString().slice(0, 10);
