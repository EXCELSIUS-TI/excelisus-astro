/**
 * Worker de www.excelsius.biz
 *
 * La web es estática (Astro → dist/) y Cloudflare la sirve sola. Este Worker solo
 * corre para /api/*: Cloudflare no ejecuta PHP, así que el formulario se reenvía al
 * hosting (cPanel), donde contacto.php envía el correo a informes@excelsius.biz.
 * El navegador sigue enviando a /api/contacto.php del mismo dominio: no cambia nada
 * en el formulario. Detalle en hosting/LEEME.md.
 */

/** Subdominio del hosting que recibe el formulario (DNS sin proxy: nube gris). */
const ORIGEN_FORMULARIOS = 'https://formularios.excelsius.biz';

/** Únicos scripts que se reenvían. Cualquier otro /api/* responde 404. */
const SCRIPTS = new Set(['/api/contacto.php']);

/** Cabeceras del navegador que el PHP necesita (la cookie resuelve el anti-bots del hosting). */
const CABECERAS = ['content-type', 'accept', 'accept-language', 'cookie', 'user-agent'];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      if (!SCRIPTS.has(url.pathname)) return new Response('No encontrado', { status: 404 });
      return reenviar(request, url);
    }

    return env.ASSETS.fetch(request);
  },
};

async function reenviar(request, url) {
  const headers = new Headers();
  for (const nombre of CABECERAS) {
    const valor = request.headers.get(nombre);
    if (valor) headers.set(nombre, valor);
  }
  // IP real del visitante: el PHP la usa para el límite de 1 envío cada 30 s.
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) headers.set('x-forwarded-for', ip);

  const conCuerpo = !['GET', 'HEAD'].includes(request.method);

  let respuesta;
  try {
    respuesta = await fetch(ORIGEN_FORMULARIOS + url.pathname + url.search, {
      method: request.method,
      headers,
      body: conCuerpo ? request.body : undefined,
      redirect: 'manual',
    });
  } catch {
    return Response.json(
      { ok: false, error: 'No pudimos enviar tu mensaje. Escríbenos a informes@excelsius.biz o por WhatsApp.' },
      { status: 502, headers: { 'cache-control': 'no-store' } },
    );
  }

  const salida = new Response(respuesta.body, respuesta);
  salida.headers.set('cache-control', 'no-store');
  return salida;
}
