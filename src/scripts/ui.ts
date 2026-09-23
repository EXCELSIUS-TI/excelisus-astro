/** Comportamientos compartidos: revelados, menú, barra de progreso y acordeones. */
import { iniciarOrbes } from './orbes';
import { iniciarTransicion } from './transicion';

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Revelado al entrar en viewport. Marca `data-in="true"` sobre `.rv` y sobre
 * los titulares enmascarados; el CSS hace el resto.
 */
export function iniciarRevelados(): void {
  const piezas = document.querySelectorAll<HTMLElement>('.rv, .mask');
  if (!piezas.length) return;

  if (reduce() || !('IntersectionObserver' in window)) {
    piezas.forEach((p) => p.setAttribute('data-in', 'true'));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        const el = entrada.target as HTMLElement;
        const retraso = Number(el.dataset.retraso ?? 0);
        window.setTimeout(() => el.setAttribute('data-in', 'true'), retraso);
        observador.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  );

  piezas.forEach((p) => observador.observe(p));
}

/** Menú principal: lo abren el rail (escritorio) y la topbar (móvil). */
export function iniciarMenu(): void {
  const menu = document.getElementById('menu-principal');
  const disparadores = document.querySelectorAll<HTMLButtonElement>('[data-menu]');
  if (!menu || !disparadores.length) return;

  let abierto = false;

  const pintar = () => {
    menu.dataset.abierto = String(abierto);
    menu.setAttribute('aria-hidden', String(!abierto));
    document.body.style.overflow = abierto ? 'hidden' : '';
    disparadores.forEach((d) => {
      d.setAttribute('aria-expanded', String(abierto));
      d.dataset.abierto = String(abierto);
      const texto = d.querySelector<HTMLElement>('[data-menu-texto]');
      if (texto) texto.textContent = abierto ? 'Cerrar' : 'Menú';
    });

    // el aspa del propio menú solo existe para cerrar
    disparadores.forEach((d) => {
      if (d.classList.contains('menu__cerrar')) d.tabIndex = abierto ? 0 : -1;
    });
  };

  const alternar = () => {
    abierto = !abierto;
    pintar();
  };
  const cerrar = () => {
    if (!abierto) return;
    abierto = false;
    pintar();
  };

  // el menú se cierra con sus submenús recogidos
  menu.addEventListener('transitionend', () => {
    if (abierto) return;
    menu.querySelectorAll<HTMLElement>('[data-submenu]').forEach((g) => {
      g.dataset.abierto = 'false';
      g.querySelector<HTMLElement>('[data-submenu-panel]')?.style.setProperty('max-height', '0px');
      g.querySelector('[data-submenu-boton]')?.setAttribute('aria-expanded', 'false');
    });
  });

  disparadores.forEach((d) => d.addEventListener('click', alternar));
  menu.querySelectorAll('a[href]').forEach((a) => a.addEventListener('click', cerrar));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrar();
  });
  pintar();
}

/** Barra fina de progreso de lectura en el borde superior. */
export function iniciarProgreso(): void {
  const barra = document.getElementById('progreso');
  if (!barra) return;

  let pendiente = false;
  const actualizar = () => {
    const alto = document.documentElement.scrollHeight - window.innerHeight;
    const avance = alto > 0 ? window.scrollY / alto : 0;
    barra.style.transform = `scaleX(${Math.min(1, Math.max(0, avance))})`;
    pendiente = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    },
    { passive: true },
  );
  actualizar();
}

/**
 * Acordeones del temario. El detalle se anima con `max-height` calculada,
 * así funciona con contenido de cualquier largo.
 */
export function iniciarAcordeones(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-acordeon]');

  items.forEach((item) => {
    const boton = item.querySelector<HTMLButtonElement>('[data-acordeon-boton]');
    const panel = item.querySelector<HTMLElement>('[data-acordeon-panel]');
    if (!boton || !panel) return;

    const ajustar = (abierto: boolean) => {
      item.dataset.abierto = String(abierto);
      boton.setAttribute('aria-expanded', String(abierto));
      panel.style.maxHeight = abierto ? `${panel.scrollHeight}px` : '0px';
    };

    ajustar(item.dataset.abierto === 'true');

    boton.addEventListener('click', () => {
      ajustar(item.dataset.abierto !== 'true');
    });

    window.addEventListener('resize', () => {
      if (item.dataset.abierto === 'true') panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
  });
}

/** Filtro por línea de especialización del listado de cursos. */
export function iniciarFiltros(): void {
  const botones = document.querySelectorAll<HTMLButtonElement>('[data-filtro]');
  const tarjetas = document.querySelectorAll<HTMLElement>('[data-categoria]');
  if (!botones.length || !tarjetas.length) return;

  const contador = document.querySelector<HTMLElement>('[data-conteo]');

  const aplicar = (clave: string) => {
    let visibles = 0;
    tarjetas.forEach((t) => {
      const mostrar = clave === 'todos' || t.dataset.categoria === clave;
      // se oculta la celda de la rejilla, no solo la tarjeta: si no, el hueco
      // se queda ocupando su columna
      const celda = t.closest('li') ?? t;
      (celda as HTMLElement).hidden = !mostrar;
      if (mostrar) visibles++;
    });
    botones.forEach((b) => {
      b.dataset.activo = String(b.dataset.filtro === clave);
      b.setAttribute('aria-pressed', String(b.dataset.filtro === clave));
    });
    if (contador) contador.textContent = String(visibles).padStart(2, '0');
  };

  botones.forEach((b) => b.addEventListener('click', () => aplicar(b.dataset.filtro ?? 'todos')));

  // permite entrar directo a una línea: /cursos/#datos
  const desdeHash = window.location.hash.replace('#', '');
  aplicar(desdeHash && document.querySelector(`[data-filtro="${desdeHash}"]`) ? desdeHash : 'todos');
}


/**
 * Tema claro/oscuro. El valor real ya está puesto en `data-tema` por el script
 * en línea del <head>; aquí solo se alterna, se guarda y se avisa al resto
 * (el hero repinta su visor cuando cambia).
 */
export function iniciarTema(): void {
  const botones = document.querySelectorAll<HTMLButtonElement>('[data-tema-toggle]');
  if (!botones.length) return;

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  /** `guardar` solo es cierto cuando la persona pulsa: si no, la preferencia
      del sistema seguiría mandando en la siguiente visita. */
  const aplicar = (tema: 'claro' | 'oscuro', guardar = false) => {
    document.documentElement.dataset.tema = tema;
    if (meta) meta.content = tema === 'claro' ? '#FFFFFF' : '#05070F';
    botones.forEach((b) =>
      b.setAttribute('aria-label', tema === 'oscuro' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'),
    );
    if (guardar) {
      try {
        localStorage.setItem('exc-tema', tema);
      } catch {
        /* navegación privada: el tema dura lo que dure la página */
      }
    }
    window.dispatchEvent(new CustomEvent('exc:tema', { detail: tema }));
  };

  aplicar(document.documentElement.dataset.tema === 'claro' ? 'claro' : 'oscuro');

  botones.forEach((b) =>
    b.addEventListener('click', () =>
      aplicar(document.documentElement.dataset.tema === 'claro' ? 'oscuro' : 'claro', true),
    ),
  );

  // mientras nadie haya elegido, el sitio sigue al sistema
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    let elegido: string | null = null;
    try {
      elegido = localStorage.getItem('exc-tema');
    } catch {
      elegido = null;
    }
    if (!elegido) aplicar(e.matches ? 'claro' : 'oscuro');
  });
}

/**
 * Submenú de «Cursos» dentro del menú principal: despliega las tres líneas de
 * especialización con sus cursos, como el mega menú de la maqueta.
 */
export function iniciarSubmenu(): void {
  const grupos = document.querySelectorAll<HTMLElement>('[data-submenu]');

  grupos.forEach((grupo) => {
    const boton = grupo.querySelector<HTMLButtonElement>('[data-submenu-boton]');
    const panel = grupo.querySelector<HTMLElement>('[data-submenu-panel]');
    if (!boton || !panel) return;

    const ajustar = (abierto: boolean) => {
      grupo.dataset.abierto = String(abierto);
      boton.setAttribute('aria-expanded', String(abierto));
      panel.style.maxHeight = abierto ? `${panel.scrollHeight}px` : '0px';
    };

    ajustar(false);
    boton.addEventListener('click', () => ajustar(grupo.dataset.abierto !== 'true'));

    // al abrir el menú principal el panel mide 0: se recalcula al mostrarse
    window.addEventListener('resize', () => {
      if (grupo.dataset.abierto === 'true') panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
  });
}

/** Pestañas (objetivos / público / requisitos de la landing de SST). */
export function iniciarPestanas(): void {
  const grupos = document.querySelectorAll<HTMLElement>('[data-pestanas]');

  grupos.forEach((grupo) => {
    const botones = grupo.querySelectorAll<HTMLButtonElement>('[data-pestana]');
    const paneles = grupo.querySelectorAll<HTMLElement>('[data-panel]');
    if (!botones.length) return;

    const mostrar = (id: string) => {
      botones.forEach((b) => {
        const activa = b.dataset.pestana === id;
        b.dataset.activa = String(activa);
        b.setAttribute('aria-selected', String(activa));
        b.tabIndex = activa ? 0 : -1;
      });
      paneles.forEach((p) => {
        p.hidden = p.dataset.panel !== id;
      });
    };

    botones.forEach((b) => b.addEventListener('click', () => mostrar(b.dataset.pestana ?? '')));

    // flechas izquierda/derecha, como espera un tablist
    grupo.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const lista = [...botones];
      const actual = lista.findIndex((b) => b.dataset.activa === 'true');
      const siguiente = e.key === 'ArrowRight' ? (actual + 1) % lista.length : (actual - 1 + lista.length) % lista.length;
      mostrar(lista[siguiente].dataset.pestana ?? '');
      lista[siguiente].focus();
    });

    mostrar(botones[0].dataset.pestana ?? '');
  });
}

/**
 * Paralaje: la capa marcada con `data-paralaje` se desplaza dentro de su
 * contenedor a medida que este cruza la pantalla, más despacio que el resto de
 * la página. Solo se calcula cuando el bloque está a la vista, y quien pide
 * menos movimiento no recibe ninguno.
 */
export function iniciarParalaje(): void {
  const capas = document.querySelectorAll<HTMLElement>('[data-paralaje]');
  if (!capas.length || reduce()) return;

  /** desplazamiento máximo, en píxeles, hacia arriba y hacia abajo */
  const FUERZA = 60;
  const visibles = new Set<HTMLElement>();

  const pintar = () => {
    const alto = window.innerHeight;
    visibles.forEach((capa) => {
      const caja = (capa.parentElement ?? capa).getBoundingClientRect();
      // -1 cuando el bloque entra por abajo, +1 cuando sale por arriba
      const avance = (caja.top + caja.height / 2 - alto / 2) / (alto / 2 + caja.height / 2);
      capa.style.transform = `translate3d(0, ${(-avance * FUERZA).toFixed(1)}px, 0)`;
    });
  };

  let pendiente = false;
  const alHacerScroll = () => {
    if (pendiente || !visibles.size) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pintar();
      pendiente = false;
    });
  };

  // solo se sigue lo que está en pantalla
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        const capa = e.target as HTMLElement;
        if (e.isIntersecting) visibles.add(capa);
        else visibles.delete(capa);
      }
      pintar();
    },
    { rootMargin: '10% 0px' },
  );

  capas.forEach((c) => observador.observe(c));
  window.addEventListener('scroll', alHacerScroll, { passive: true });
  window.addEventListener('resize', alHacerScroll, { passive: true });
  pintar();
}

/** El mapa de contacto avisa cuando termina de cargar y se retira el orbe. */
export function iniciarMapa(): void {
  const mapa = document.querySelector<HTMLElement>('[data-mapa]');
  const marco = mapa?.querySelector<HTMLIFrameElement>('[data-mapa-marco]');
  if (!mapa || !marco) return;

  const listo = () => mapa.setAttribute('data-cargado', 'true');
  if (marco.contentWindow?.location.href && marco.dataset.cargado) listo();
  marco.addEventListener('load', listo);
  // si el iframe no dispara `load` —bloqueado, sin red—, no dejamos el orbe eterno
  window.setTimeout(listo, 8000);
}

/** Todo lo que corre en cada página. */
export function iniciarUI(): void {
  iniciarTema();
  iniciarRevelados();
  iniciarMenu();
  iniciarSubmenu();
  iniciarProgreso();
  iniciarAcordeones();
  iniciarFiltros();
  iniciarPestanas();
  iniciarParalaje();
  iniciarOrbes();
  iniciarMapa();
  iniciarTransicion();
}
