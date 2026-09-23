import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIAS_BLOG } from '@/data/blog';

/**
 * Colección del blog. Cada artículo es un Markdown en `src/content/blog/` y su
 * cabecera se valida aquí al construir: si falta la descripción, se pasa de
 * largo o la categoría no existe, el build falla con el nombre del archivo en
 * lugar de publicar una página rota. Añadir un artículo es añadir un archivo.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string().max(110),
    /** título corto para la pestaña y el buscador: con « · EXCELSIUS» no debe pasar de 62 */
    tituloSeo: z.string().max(50).optional(),
    /** lo que muestra Google bajo el título: fuera de este rango se recorta o se ve pobre */
    descripcion: z.string().min(70).max(165),
    /** respuesta directa de 40 a 60 palabras: la que citan los asistentes */
    resumen: z.string().min(120).max(420),
    publicado: z.coerce.date(),
    actualizado: z.coerce.date().optional(),
    categoria: z.enum(CATEGORIAS_BLOG),
    etiquetas: z.array(z.string()).default([]),
    /** slug de un curso de `src/data/cursos.ts` que el artículo recomienda */
    curso: z.string().optional(),
    /** ruta de un servicio relacionado, por ejemplo /software/ */
    servicio: z.string().optional(),
    destacado: z.boolean().default(false),
    /** los borradores no se publican ni entran al sitemap */
    borrador: z.boolean().default(false),
    faq: z
      .array(z.object({ pregunta: z.string(), respuesta: z.string() }))
      .default([]),
  }),
});

export const collections = { blog };
