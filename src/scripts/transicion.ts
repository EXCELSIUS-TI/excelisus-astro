/**
 * Velo de transición entre páginas.
 *
 * El sitio es multipágina: cada enlace recarga el documento, así que la
 * transición se reparte en dos mitades. Al pulsar un enlace interno se marca
 * la navegación en `sessionStorage` y se baja el velo sobre la página que se
 * abandona; al cargar la siguiente, un guion en línea del `<head>` ve esa
 * marca y muestra el velo antes del primer pintado. Esta función se ocupa del
 * resto: retirarlo cuando la página está lista y nunca antes de 1,5 s.
 */

const CLAVE = 'exc-navegando';
const MINIMO = 1500;

const menosMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** ¿El clic va a otra página del sitio, en esta misma pestaña? */
function esNavegacionInterna(evento: MouseEvent): boolean {
  if (evento.defaultPrevented || evento.button !== 0) return false;
  if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return false;

  const enlace = (evento.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!enlace || enlace.target === '_blank' || enlace.hasAttribute('download')) return false;
  if (enlace.origin !== window.location.origin) return false;

  // un ancla dentro de la misma página no es una navegación
  const mismaPagina = enlace.pathname === window.location.pathname && enlace.search === window.location.search;
  if (mismaPagina && enlace.hash) return false;

  // descargas y archivos sueltos: los abre el navegador, no hay página nueva
  if (/\.(pdf|zip|jpe?g|png|webp|svg|txt|xml)$/i.test(enlace.pathname)) return false;

  return true;
}

export function iniciarTransicion(): void {
  const velo = document.getElementById('velo-navegacion');
  if (!velo) return;

  const raiz = document.documentElement;
  const reduce = menosMovimiento();

  const ocultar = () => {
    delete raiz.dataset.navegando;
    velo.setAttribute('aria-hidden', 'true');
  };
  const mostrar = () => {
    raiz.dataset.navegando = 'true';
    velo.setAttribute('aria-hidden', 'false');
  };

  // --- llegada: el velo ya está puesto si venimos de otra página ---
  if (raiz.dataset.navegando) {
    /* `performance.now()` cuenta desde el inicio de esta navegación, así que
       el mínimo se mide de puerta a puerta y no desde que corre el guion */
    const retirar = () => window.setTimeout(ocultar, Math.max(0, MINIMO - performance.now()));

    if (document.readyState === 'complete') retirar();
    else window.addEventListener('load', retirar, { once: true });

    // red lenta o un recurso que nunca llega: el velo no se queda puesto
    window.setTimeout(ocultar, 6000);
  }

  // --- salida: se marca la navegación y se baja el velo ---
  document.addEventListener('click', (evento) => {
    if (!esNavegacionInterna(evento)) return;
    try {
      sessionStorage.setItem(CLAVE, '1');
    } catch {
      /* sin almacenamiento el velo solo se ve al salir, no al llegar */
    }
    if (!reduce) mostrar();
  });

  // volver atrás restaura la página desde la caché: el velo sobra
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) ocultar();
  });
  // si la navegación se cancela, el velo no puede quedarse puesto
  window.addEventListener('pagehide', () => {
    try {
      if (!raiz.dataset.navegando) sessionStorage.removeItem(CLAVE);
    } catch {
      /* nada que limpiar */
    }
  });
}
