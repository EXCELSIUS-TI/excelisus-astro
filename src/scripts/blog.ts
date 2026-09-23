/**
 * Comportamiento de las páginas del blog: el índice que marca la sección que
 * se está leyendo, copiar el enlace y el menú nativo de compartir.
 */

/** Resalta en el índice el encabezado que está a la vista. */
function seguirLectura(): void {
  const indice = document.querySelector<HTMLElement>('[data-indice]');
  if (!indice) return;

  const enlaces = new Map<string, HTMLAnchorElement>();
  indice.querySelectorAll<HTMLAnchorElement>('a[data-seccion]').forEach((a) => {
    enlaces.set(a.dataset.seccion ?? '', a);
  });

  const secciones = [...enlaces.keys()]
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);
  if (!secciones.length) return;

  const marcar = (id: string) => {
    enlaces.forEach((a, clave) => a.setAttribute('aria-current', String(clave === id)));
  };

  // la sección activa es la última cuyo título ya pasó la franja superior
  const observador = new IntersectionObserver(
    (entradas) => {
      const visibles = entradas.filter((e) => e.isIntersecting);
      if (visibles.length) marcar(visibles[0].target.id);
    },
    { rootMargin: '0px 0px -70% 0px', threshold: 0 },
  );
  secciones.forEach((s) => observador.observe(s));
}

/** Copiar enlace y compartir con el menú del sistema. */
function compartir(): void {
  document.querySelectorAll<HTMLElement>('[data-compartir]').forEach((caja) => {
    const url = caja.dataset.url ?? window.location.href;
    const titulo = caja.dataset.titulo ?? document.title;
    const aviso = caja.querySelector<HTMLElement>('[data-aviso]');

    const avisar = (texto: string) => {
      if (!aviso) return;
      aviso.textContent = texto;
      window.setTimeout(() => (aviso.textContent = ''), 2400);
    };

    caja.querySelector('[data-copiar]')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url);
        avisar('Enlace copiado');
      } catch {
        avisar('No se pudo copiar');
      }
    });

    // el menú nativo solo aparece donde existe: casi siempre en el móvil
    const nativo = caja.querySelector<HTMLElement>('[data-nativo]');
    if (nativo && typeof navigator.share === 'function') {
      nativo.hidden = false;
      nativo.querySelector('button')?.addEventListener('click', () => {
        navigator.share({ title: titulo, url }).catch(() => {
          /* la persona cerró el menú: no es un error */
        });
      });
    }
  });
}

/** Filtro por categoría del listado, con la categoría en la URL. */
function filtrar(): void {
  const botones = document.querySelectorAll<HTMLButtonElement>('[data-filtro-blog]');
  const fichas = document.querySelectorAll<HTMLElement>('[data-ficha-blog]');
  if (!botones.length) return;

  const aplicar = (clave: string) => {
    fichas.forEach((f) => {
      f.hidden = clave !== 'todos' && f.dataset.fichaBlog !== clave;
    });
    botones.forEach((b) => {
      const activo = b.dataset.filtroBlog === clave;
      b.dataset.activo = String(activo);
      b.setAttribute('aria-pressed', String(activo));
    });
  };

  botones.forEach((b) =>
    b.addEventListener('click', () => {
      const clave = b.dataset.filtroBlog ?? 'todos';
      aplicar(clave);
      history.replaceState(null, '', clave === 'todos' ? location.pathname : `#${clave}`);
    }),
  );

  const inicial = location.hash.slice(1);
  aplicar(inicial && document.querySelector(`[data-filtro-blog="${inicial}"]`) ? inicial : 'todos');
}

export function iniciarBlog(): void {
  seguirLectura();
  compartir();
  filtrar();
}
