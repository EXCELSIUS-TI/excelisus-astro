import type { APIRoute } from 'astro';
import { site, contacto, servicios, proceso, razones, pagos, pagosNota, marcas } from '@/data/site';
import { cursos, categorias, categoriaPorId, faqCurso, respuestaCurso } from '@/data/cursos';
import { sst } from '@/data/sst';
import { blog, categoriasBlog } from '@/data/blog';
import { articulosPublicados, fechaIso, fechaDe } from '@/utils/blog';

/**
 * /llms-full.txt — todo el contenido del sitio en un solo archivo de texto.
 *
 * Pensado para que un asistente pueda responder con precisión sobre los cursos
 * sin rastrear página por página: incluye temarios completos, objetivos,
 * públicos, medios de pago y preguntas frecuentes. Se genera desde `src/data/`.
 */
export const GET: APIRoute = async () => {
  const articulos = await articulosPublicados();
  const u = (ruta: string) => `${site.url}${ruta}`;
  const L: string[] = [];
  const add = (...l: string[]) => L.push(...l);

  add(
    `# ${site.nombre} — contenido completo`,
    '',
    `> ${site.descripcion}`,
    '',
    `Última generación: ${new Date().toISOString().slice(0, 10)}. Fuente: ${site.url}`,
    '',
    '## La empresa',
    '',
    `${site.claim}. ${site.claimFuerte}.`,
    '',
    'Excelsius es una empresa peruana con un equipo de ingenieros full stack que desarrolla',
    'proyectos de software para distintos sectores apoyándose en inteligencia artificial y',
    'tecnologías actuales, y que además forma profesionales en cursos en vivo.',
    '',
    '### Contacto',
    '',
    `- Teléfono y WhatsApp: ${contacto.telefono} (+51 951 753 920)`,
    `- Correo: ${contacto.correo}`,
    `- Dirección: ${contacto.direccion}, ${contacto.ciudad}`,
    `- Horario de atención: ${contacto.horario}`,
    `- Clases: ${contacto.horarioClases}`,
    ...contacto.redes.map((r) => `- ${r.nombre}: ${r.url}`),
    '',
    '### Por qué Excelsius',
    '',
    ...razones.map((r) => `- **${r.titulo}**: ${r.detalle}`),
    '',
    '## Servicios',
    '',
  );

  for (const s of servicios) {
    add(
      `### ${s.nombre}`,
      '',
      s.resumen,
      '',
      s.detalle,
      '',
      `- Entregables: ${s.entregables.join('; ')}.`,
      `- Tecnologías: ${s.stack.join(', ')}.`,
      `- Página: ${u(`/servicios/#${s.id}`)}`,
      '',
    );
  }

  add('## Método de trabajo', '');
  for (const p of proceso) add(`${p.paso}. **${p.nombre}**: ${p.detalle}`);
  add('');

  add('## Cursos de especialización', '', 'Líneas:', '');
  for (const c of categorias) add(`- **${c.nombre}**: ${c.descripcion}`);
  add('');

  for (const curso of cursos) {
    const cat = categoriaPorId(curso.categoria);
    add(
      `### ${curso.titulo}`,
      '',
      `${curso.subtitulo}. Línea: ${cat.nombre}.`,
      `Página: ${u(`/cursos/${curso.slug}/`)}`,
      '',
      respuestaCurso(curso),
      '',
      '**Datos del programa**',
      '',
      `- Duración: ${curso.horas}`,
      `- Sesiones: ${curso.sesiones}`,
      `- Días: ${curso.dias}`,
      `- Horario: ${curso.horario}`,
      `- Modalidad: en vivo, con acceso a las grabaciones`,
      ...(curso.precio
        ? [`- Inversión: ${curso.precio.contado} (o ${curso.precio.cuotas})`]
        : []),
      ...(curso.proximo ? ['- Estado: próximo inicio, fechas por confirmar'] : []),
      '',
      '**Presentación**',
      '',
      curso.presentacion,
      '',
      '**Objetivos**',
      '',
      ...curso.objetivos.map((o) => `- ${o}`),
      '',
      '**Beneficios**',
      '',
      ...curso.beneficios.map((b) => `- ${b}`),
      '',
      '**Público objetivo**',
      '',
      curso.publico,
      '',
      '**Plan de estudios**',
      '',
    );

    curso.temario.forEach((m, n) => {
      add(`${n + 1}. ${m.titulo}`);
      if (m.temas) {
        for (const t of m.temas) {
          add(`   - ${t.titulo}`);
          for (const p of t.puntos ?? []) add(`     - ${p}`);
        }
      } else {
        for (const i of m.items ?? []) add(`   - ${i}`);
      }
    });

    add('', '**Preguntas frecuentes**', '');
    for (const p of faqCurso(curso)) add(`- ${p.pregunta} ${p.respuesta}`);
    add('');
  }

  add(
    '## Capacitaciones SST para empresas',
    '',
    `Página: ${u('/curso-sst-1/')}`,
    '',
    `${sst.hero.subtitulo} ${sst.hero.bajada}`,
    '',
    ...sst.cifras.map((c) => `- ${c.valor} ${c.etiqueta}`),
    '',
    '**Capacitaciones**',
    '',
    ...sst.capacitaciones.items.map((i) => `- **${i.nombre}**: ${i.detalle}`),
    '',
    '**Modalidad y entregables**',
    '',
    ...sst.modalidad.columnas.map((c) => `- ${c.titulo}: ${c.items.join('; ')}.`),
    '',
    '**Información del curso**',
    '',
    ...sst.informacion.pestanas.flatMap((p) => [
      `- ${p.nombre}:`,
      ...p.items.map((i) => `  - ${i.titulo}: ${i.detalle}`),
    ]),
    '',
    '**Preguntas frecuentes**',
    '',
    ...sst.faq.items.map((f) => `- ${f.pregunta} ${f.respuesta}`),
    '',
    '## Medios de pago',
    '',
    pagosNota,
    '',
    ...pagos.map((p) => `- **${p.nombre}**: ${p.detalle}`),
    '',
    '## Marcas y tecnologías',
    '',
    ...marcas.map((m) => `- ${m.nombre}: ${m.nota}`),
    '',
  );

  // el blog va completo: es el contenido que más preguntas responde
  add('## Blog', '', blog.descripcion, '');
  for (const a of articulos) {
    add(
      `### ${a.data.titulo}`,
      '',
      `- URL: ${u(`${blog.ruta}${a.id}/`)}`,
      `- Categoría: ${categoriasBlog[a.data.categoria].nombre}`,
      `- Publicado: ${fechaIso(a.data.publicado)} · Revisado: ${fechaIso(fechaDe(a))}`,
      '',
      `**En corto:** ${a.data.resumen}`,
      '',
      (a.body ?? '').trim(),
      '',
    );
    if (a.data.faq.length) {
      add('**Preguntas frecuentes**', '', ...a.data.faq.map((f) => `- ${f.pregunta} ${f.respuesta}`), '');
    }
  }

  return new Response(L.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
