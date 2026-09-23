/**
 * Envía un formulario a un PHP del sitio y resuelve el desafío anti-bots del hosting.
 *
 * Algunos cPanel protegen los .php: hasta que el navegador tiene la cookie
 * `humans_XXXX=1` responden 409 con un script `document.cookie = "humans_XXXX=1"`.
 * Un envío normal lo resuelve recargando, pero `fetch` no ejecuta ese script: aquí
 * se lee la cookie de la respuesta, se guarda y se reintenta una vez.
 */
export async function enviarFormulario(url: string, datos: FormData, reintento = true): Promise<Response> {
  const res = await fetch(url, {
    method: 'POST',
    body: datos,
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  });
  if (reintento && !(res.headers.get('content-type') ?? '').includes('json')) {
    const cookie = (await res.clone().text()).match(/document\.cookie\s*=\s*["']([^"';]+)/)?.[1];
    if (cookie) {
      document.cookie = `${cookie}; path=/; SameSite=Lax`;
      return enviarFormulario(url, datos, false);
    }
  }
  return res;
}
