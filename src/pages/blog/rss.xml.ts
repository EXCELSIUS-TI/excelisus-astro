import type { APIRoute } from 'astro';
import { site } from '@/data/site';
import { blog, categoriasBlog } from '@/data/blog';
import { absoluta } from '@/seo/seo';
import { articulosPublicados, fechaDe } from '@/utils/blog';

/**
 * /blog/rss.xml — canal RSS 2.0 del blog. Lo leen los lectores de noticias,
 * Feedly y varios agregadores que también usan los asistentes de IA para
 * descubrir contenido nuevo. Se arma a mano para no sumar dependencias.
 */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const articulos = await articulosPublicados();
  const ultima = articulos.length ? fechaDe(articulos[0]) : new Date();

  const items = articulos.map((a) => {
    const url = absoluta(`${blog.ruta}${a.id}/`);
    return [
      '    <item>',
      `      <title>${esc(a.data.titulo)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <description>${esc(a.data.resumen)}</description>`,
      `      <category>${esc(categoriasBlog[a.data.categoria].nombre)}</category>`,
      ...a.data.etiquetas.map((e) => `      <category>${esc(e)}</category>`),
      `      <pubDate>${a.data.publicado.toUTCString()}</pubDate>`,
      '    </item>',
    ].join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${esc(`Blog de ${site.nombre}`)}</title>`,
    `    <link>${absoluta(blog.ruta)}</link>`,
    `    <description>${esc(blog.descripcion)}</description>`,
    '    <language>es-PE</language>',
    `    <lastBuildDate>${ultima.toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${absoluta(`${blog.ruta}rss.xml`)}" rel="self" type="application/rss+xml" />`,
    '    <image>',
    `      <url>${absoluta('/favicon.png')}</url>`,
    `      <title>${esc(`Blog de ${site.nombre}`)}</title>`,
    `      <link>${absoluta(blog.ruta)}</link>`,
    '    </image>',
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
