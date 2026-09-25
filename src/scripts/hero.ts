/**
 * Hero del home: el visor de arquitectura.
 *
 * Todo se dibuja por código sobre dos canvas —sin video ni imágenes—:
 *   · el visor circular, con el grafo de servicios girando dentro;
 *   · los cuatro puertos de datos que convergen en el nodo objetivo;
 *   · la señal de throughput que corre por el borde inferior.
 *
 * Es la misma mecánica del hero de referencia (óptica, aro graduado, puertos
 * y traza viva), traducida de quirófano a plataforma tecnológica.
 */

/* ============================================================
   Tonos
   Cada lámina de la portada tiene su paleta. El canvas no puede heredar
   variables CSS, así que los colores viven aquí como "r,g,b" y se mezclan
   cuadro a cuadro hacia el tono objetivo.
   ============================================================ */
type RGB = [number, number, number];
type Tono = { principal: RGB; secundario: RGB; tercero: RGB; interior: RGB; interior2: RGB };

const TONOS: Tono[] = [
  // 01 · software: celeste y azul de marca
  { principal: [94, 211, 255], secundario: [47, 123, 255], tercero: [94, 211, 255], interior: [12, 26, 72], interior2: [7, 13, 34] },
  // 02 · consultoría: naranja sobre morado
  { principal: [255, 158, 44], secundario: [157, 78, 221], tercero: [255, 141, 0], interior: [44, 14, 70], interior2: [18, 7, 30] },
  // 03 · cursos: dorado y naranja sobre azul
  { principal: [255, 199, 0], secundario: [47, 123, 255], tercero: [255, 141, 0], interior: [10, 26, 84], interior2: [6, 12, 36] },
];

const mezcla = structuredClone(TONOS[0]);
let tonoObjetivo = 0;
let CELESTE = '';
let AZUL = '';
let TERCERO = '';
let INTERIOR = '';
let INTERIOR2 = '';

const aTexto = (c: RGB) => c.map(Math.round).join(',');
const pintarTono = () => {
  CELESTE = aTexto(mezcla.principal);
  AZUL = aTexto(mezcla.secundario);
  TERCERO = aTexto(mezcla.tercero);
  INTERIOR = aTexto(mezcla.interior);
  INTERIOR2 = aTexto(mezcla.interior2);
};
pintarTono();

/** Acerca los colores actuales al tono objetivo; `k` = 1 salta de golpe. */
const mezclarTono = (k: number) => {
  const destino = TONOS[tonoObjetivo];
  for (const clave of Object.keys(destino) as (keyof Tono)[]) {
    for (let c = 0; c < 3; c++) mezcla[clave][c] += (destino[clave][c] - mezcla[clave][c]) * k;
  }
  pintarTono();
};

/** Redibujos para el modo sin movimiento, donde no hay bucle de cuadros. */
const redibujos: (() => void)[] = [];

function cambiarTono(i: number): void {
  tonoObjetivo = i;
  if (menosMovimiento()) {
    mezclarTono(1);
    redibujos.forEach((f) => f());
  }
}

const menosMovimiento = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Puertos alrededor del visor: ángulo en grados y etiqueta técnica. */
const PUERTOS = [
  { ang: 130, etiqueta: 'SQL · ETL' },
  { ang: 230, etiqueta: 'API · REST' },
  { ang: 332, etiqueta: 'ML · MODELO' },
  { ang: 44, etiqueta: 'BI · TABLERO' },
];

/** Grafo que vive dentro del visor: dos órbitas de servicios más el núcleo. */
const NODOS = [
  { r: 0.0, a: 0, etiqueta: 'CORE' },
  { r: 0.42, a: 18, etiqueta: 'API' },
  { r: 0.44, a: 96, etiqueta: 'DB' },
  { r: 0.4, a: 168, etiqueta: 'ETL' },
  { r: 0.46, a: 248, etiqueta: 'AUTH' },
  { r: 0.43, a: 312, etiqueta: 'CACHE' },
  { r: 0.76, a: 52, etiqueta: 'WEB' },
  { r: 0.74, a: 130, etiqueta: 'APP' },
  { r: 0.78, a: 212, etiqueta: 'BI' },
  { r: 0.75, a: 290, etiqueta: 'ML' },
];

/** Aristas del grafo, por índice de nodo. */
const ARISTAS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 6], [1, 9], [2, 3], [2, 8], [3, 8],
  [4, 7], [5, 6], [5, 9], [6, 7], [8, 9],
];

/* ============================================================
   Visor
   ============================================================ */
function visor(canvas: HTMLCanvasElement, area: HTMLElement): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const reduce = menosMovimiento();
  let W = 0;
  let H = 0;
  let movil = false;

  // trama de líneas de barrido, generada una sola vez
  const tramaCanvas = document.createElement('canvas');
  tramaCanvas.width = 1;
  tramaCanvas.height = 3;
  const tramaCtx = tramaCanvas.getContext('2d');
  if (tramaCtx) {
    tramaCtx.fillStyle = 'rgba(0,0,0,.34)';
    tramaCtx.fillRect(0, 2, 1, 1);
  }
  const trama = ctx.createPattern(tramaCanvas, 'repeat');

  const redimensionar = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    movil = W < 900;
  };
  redimensionar();

  // el puntero mueve el visor y el objetivo; ex/ey lo siguen con inercia
  let mx = 0.5;
  let my = 0.5;
  let ex = 0.5;
  let ey = 0.5;

  const punteroFino = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const onMove = (e: MouseEvent) => {
    const r = canvas.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width;
    my = (e.clientY - r.top) / r.height;
  };
  const onLeave = () => {
    mx = 0.5;
    my = 0.5;
  };
  if (punteroFino) {
    area.addEventListener('mousemove', onMove);
    area.addEventListener('mouseleave', onLeave);
  }

  const t0 = performance.now();
  let raf = 0;

  const frame = (ahora: number) => {
    const t = ahora - t0;
    ex += (mx - ex) * 0.06;
    mezclarTono(0.045);
    ey += (my - ey) * 0.06;

    // el sistema "respira" cada ~4 s, como un monitor en marcha
    const respiracion = 1 + 0.012 * Math.sin((t / 4000) * Math.PI * 2);
    const R = (movil ? Math.min(W, H) * 0.29 : Math.min(W, H) * 0.33) * respiracion;
    const cx = (movil ? W * 0.5 : W * 0.7) + (ex - 0.5) * 16;
    const cy = (movil ? H * 0.3 : H * 0.47) + (ey - 0.5) * 10;

    ctx.clearRect(0, 0, W, H);

    /* ---------- lo que se ve dentro del visor ---------- */
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();

    // fondo del visor
    const fondo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    fondo.addColorStop(0, `rgba(${INTERIOR},.92)`);
    fondo.addColorStop(0.65, `rgba(${INTERIOR2},.95)`);
    fondo.addColorStop(1, 'rgba(5,7,15,.98)');
    ctx.fillStyle = fondo;
    ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);

    // retícula de coordenadas del monitor
    ctx.strokeStyle = `rgba(${CELESTE},.07)`;
    ctx.lineWidth = 1;
    const paso = R / 4;
    for (let i = -4; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + i * paso, cy - R);
      ctx.lineTo(cx + i * paso, cy + R);
      ctx.moveTo(cx - R, cy + i * paso);
      ctx.lineTo(cx + R, cy + i * paso);
      ctx.stroke();
    }

    // el grafo gira despacio sobre sí mismo
    const giroGrafo = t * 0.00006;
    const pos = NODOS.map((n) => {
      const a = (n.a * Math.PI) / 180 + giroGrafo;
      const rr = n.r * R * 0.82;
      return { x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr, etiqueta: n.etiqueta, orbita: n.r };
    });

    // aristas
    ctx.lineWidth = 1;
    for (const [a, b] of ARISTAS) {
      ctx.strokeStyle = `rgba(${CELESTE},.16)`;
      ctx.beginPath();
      ctx.moveTo(pos[a].x, pos[a].y);
      ctx.lineTo(pos[b].x, pos[b].y);
      ctx.stroke();
    }

    // paquetes viajando por las aristas
    for (let i = 0; i < ARISTAS.length; i++) {
      const [a, b] = ARISTAS[i];
      const f = (t / 3200 + i * 0.13) % 1;
      const px = pos[a].x + (pos[b].x - pos[a].x) * f;
      const py = pos[a].y + (pos[b].y - pos[a].y) * f;
      ctx.fillStyle = `rgba(${CELESTE},${0.85 - Math.abs(f - 0.5)})`;
      ctx.fillRect(px - 1.6, py - 1.6, 3.2, 3.2);
    }

    // nodos
    for (let i = 0; i < pos.length; i++) {
      const p = pos[i];
      const late = 0.5 + 0.5 * Math.sin(t * 0.0022 + i);
      const nucleo = p.orbita === 0;
      const r = nucleo ? 7 + 2 * late : 3.6;

      ctx.fillStyle = nucleo ? `rgba(${CELESTE},.95)` : `rgba(${AZUL},.95)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(${CELESTE},${0.18 + 0.28 * late})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r + 6, 0, Math.PI * 2);
      ctx.stroke();

      if (!movil && !nucleo) {
        ctx.fillStyle = 'rgba(233,237,247,.5)';
        ctx.font = '8px ui-monospace, Menlo, Consolas, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(p.etiqueta, p.x, p.y - 10);
      }
    }

    // viñeta óptica: los bordes del visor se apagan
    const vinieta = ctx.createRadialGradient(cx, cy, R * 0.35, cx, cy, R);
    vinieta.addColorStop(0, 'rgba(0,0,0,0)');
    vinieta.addColorStop(0.75, 'rgba(0,0,0,.28)');
    vinieta.addColorStop(1, 'rgba(0,0,0,.94)');
    ctx.fillStyle = vinieta;
    ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);

    if (trama) {
      ctx.fillStyle = trama;
      ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    }

    // barrido de radar
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 0.00042);
    const luz = ctx.createLinearGradient(-R, 0, R, 0);
    luz.addColorStop(0.42, `rgba(${CELESTE},0)`);
    luz.addColorStop(0.49, `rgba(${CELESTE},.12)`);
    luz.addColorStop(0.52, 'rgba(255,255,255,.08)');
    luz.addColorStop(0.6, `rgba(${CELESTE},0)`);
    ctx.fillStyle = luz;
    ctx.fillRect(-R, -R, 2 * R, 2 * R);
    ctx.restore();
    ctx.restore();

    /* ---------- aro graduado ---------- */
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${CELESTE},.55)`;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();

    const giro = t * 0.00004;
    for (let i = 0; i < 72; i++) {
      const a = (i * Math.PI) / 36 + giro;
      const mayor = i % 6 === 0;
      const r1 = R + 10;
      const r2 = R + (mayor ? 24 : 15);
      ctx.strokeStyle = `rgba(${CELESTE},${mayor ? 0.7 : 0.25})`;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
    }

    // arco de estado, girando despacio al revés
    const base = -Math.PI / 2 - t * 0.00006;
    ctx.lineWidth = 3;
    ctx.strokeStyle = `rgba(${CELESTE},.9)`;
    ctx.beginPath();
    ctx.arc(cx, cy, R + 5, base - Math.PI / 12, base + Math.PI / 12);
    ctx.stroke();
    ctx.font = '9px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillStyle = `rgba(${CELESTE},.9)`;
    ctx.textAlign = 'center';
    ctx.fillText('SLA', cx + Math.cos(base) * (R + 36), cy + Math.sin(base) * (R + 36) + 3);

    // cruz central
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,.22)';
    ctx.beginPath();
    ctx.moveTo(cx - R * 0.08, cy);
    ctx.lineTo(cx + R * 0.08, cy);
    ctx.moveTo(cx, cy - R * 0.08);
    ctx.lineTo(cx, cy + R * 0.08);
    ctx.stroke();

    /* ---------- los cuatro puertos convergen en el objetivo ---------- */
    const tx = cx + (ex - 0.5) * R * 0.9;
    const ty = cy + (ey - 0.5) * R * 0.9;
    const PR = R * (movil ? 1.22 : 1.24);

    for (let p = 0; p < PUERTOS.length; p++) {
      const pa = (PUERTOS[p].ang * Math.PI) / 180;
      const px = cx + Math.cos(pa) * PR;
      const py = cy + Math.sin(pa) * PR;

      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${TERCERO},.2)`;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(tx, ty);
      ctx.stroke();

      // el paquete avanza del puerto al objetivo
      let f = (t / 2600 + p * 0.27) % 1;
      f = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
      const qx = px + (tx - px) * f;
      const qy = py + (ty - py) * f;
      const ang = Math.atan2(ty - py, tx - px);

      ctx.save();
      ctx.translate(qx, qy);
      ctx.rotate(ang);
      const estela = ctx.createLinearGradient(-26, 0, 6, 0);
      estela.addColorStop(0, `rgba(${TERCERO},0)`);
      estela.addColorStop(1, `rgba(${TERCERO},.95)`);
      ctx.fillStyle = estela;
      ctx.fillRect(-26, -1, 32, 2);
      ctx.fillStyle = `rgba(${TERCERO},1)`;
      ctx.fillRect(2, -1.5, 5, 3);
      ctx.restore();

      // marcador del puerto y su etiqueta
      ctx.fillStyle = `rgba(${TERCERO},.95)`;
      ctx.fillRect(px - 3, py - 3, 6, 6);
      ctx.strokeStyle = `rgba(${TERCERO},.5)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.stroke();

      if (!movil) {
        ctx.fillStyle = 'rgba(139,147,168,.95)';
        ctx.font = '9px ui-monospace, Menlo, Consolas, monospace';
        const izquierda = Math.cos(pa) < 0;
        ctx.textAlign = izquierda ? 'right' : 'left';
        ctx.fillText(PUERTOS[p].etiqueta, px + (izquierda ? -14 : 14), py + 3);
      }
    }

    // objetivo
    const pulso = 0.5 + 0.5 * Math.sin(t * 0.005);
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${CELESTE},${0.55 + 0.4 * pulso})`;
    ctx.beginPath();
    ctx.arc(tx, ty, 6 + 3 * pulso, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(tx - 14, ty);
    ctx.lineTo(tx - 8, ty);
    ctx.moveTo(tx + 8, ty);
    ctx.lineTo(tx + 14, ty);
    ctx.moveTo(tx, ty - 14);
    ctx.lineTo(tx, ty - 8);
    ctx.moveTo(tx, ty + 8);
    ctx.lineTo(tx, ty + 14);
    ctx.stroke();

    if (!reduce) raf = requestAnimationFrame(frame);
  };

  const onResize = () => {
    redimensionar();
    if (reduce) frame(t0);
  };
  window.addEventListener('resize', onResize, { passive: true });

  if (reduce) {
    frame(t0);
    redibujos.push(() => frame(t0));
  } else raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    if (punteroFino) {
      area.removeEventListener('mousemove', onMove);
      area.removeEventListener('mouseleave', onLeave);
    }
  };
}

/* ============================================================
   Señal de throughput
   ============================================================ */

/** Un ciclo de tráfico: pulsos digitales con ruido, fase 0→1. */
const pulso = (p: number) => {
  const cuadro = p < 0.12 ? 1 : p < 0.2 ? 0.55 : p < 0.34 ? 0.82 : p < 0.46 ? 0.2 : p < 0.6 ? 0.66 : 0.12;
  const rizo = 0.06 * Math.sin(p * Math.PI * 24);
  return cuadro * 0.8 + rizo;
};

function senal(canvas: HTMLCanvasElement, ritmo: () => number): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const reduce = menosMovimiento();
  let W = 0;
  let H = 0;
  let buffer: number[] = [];
  let fase = 0;
  let anterior = performance.now();
  let raf = 0;

  const redimensionar = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buffer = new Array(Math.max(1, Math.ceil(W))).fill(0);
  };
  redimensionar();

  const pintar = () => {
    const y0 = H * 0.72;
    const amp = H * 0.5;

    ctx.clearRect(0, 0, W, H);

    // traza completa, tenue
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${CELESTE},.3)`;
    ctx.beginPath();
    for (let x = 0; x < W; x++) {
      const y = y0 - amp * buffer[x];
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // cabeza brillante: los últimos 140 px
    const cabeza = Math.max(0, W - 140);
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = `rgba(${CELESTE},1)`;
    ctx.shadowColor = `rgba(${CELESTE},.8)`;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    for (let x = cabeza; x < W; x++) {
      const y = y0 - amp * buffer[x];
      if (x === cabeza) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(W - 1, y0 - amp * buffer[W - 1], 2.2, 0, Math.PI * 2);
    ctx.fill();

    // línea base
    ctx.strokeStyle = 'rgba(255,255,255,.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y0 + 0.5);
    ctx.lineTo(W, y0 + 0.5);
    ctx.stroke();
  };

  const estatico = () => {
    for (let i = 0; i < buffer.length; i++) buffer[i] = pulso(((i / buffer.length) * 4) % 1);
    pintar();
  };

  const frame = (ahora: number) => {
    const dt = Math.min(50, ahora - anterior);
    anterior = ahora;

    const periodo = 60000 / ritmo();
    const pasos = Math.max(1, Math.round(dt * 0.18)); // ~180 px/s
    for (let i = 0; i < pasos; i++) {
      fase = (fase + dt / pasos / periodo) % 1;
      buffer.push(pulso(fase));
      buffer.shift();
    }

    pintar();
    raf = requestAnimationFrame(frame);
  };

  const onResize = () => {
    redimensionar();
    if (reduce) estatico();
  };
  window.addEventListener('resize', onResize, { passive: true });

  if (reduce) {
    estatico();
    redibujos.push(estatico);
  } else {
    anterior = performance.now();
    raf = requestAnimationFrame(frame);
  }

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
  };
}

/* ============================================================
   Lecturas del HUD
   ============================================================ */
function lecturas(): { detener: () => void; ritmo: () => number } {
  const campos = {
    lat: document.querySelector<HTMLElement>('[data-lectura="latencia"]'),
    req: document.querySelector<HTMLElement>('[data-lectura="peticiones"]'),
    des: document.querySelector<HTMLElement>('[data-lectura="despliegues"]'),
    grande: document.querySelector<HTMLElement>('[data-lectura="throughput"]'),
  };

  // el primer valor es fijo para que el HTML servido y el pintado coincidan
  let rpm = 148;

  const medir = () => {
    const latencia = 38 + Math.round(Math.random() * 9);
    const peticiones = (1.1 + Math.random() * 0.4).toFixed(1);
    rpm = 142 + Math.round(Math.random() * 16);

    if (campos.lat) campos.lat.textContent = String(latencia);
    if (campos.req) campos.req.textContent = `${peticiones}k`;
    if (campos.grande) campos.grande.textContent = String(rpm);
  };

  if (menosMovimiento()) {
    return { detener: () => {}, ritmo: () => rpm };
  }

  medir();
  const id = window.setInterval(medir, 2600);
  void campos.des;

  return { detener: () => window.clearInterval(id), ritmo: () => rpm };
}

/* ============================================================
   Portada rotativa
   ============================================================ */

/** Tiempo que cada lámina queda en pantalla. */
const DURACION_LAMINA = 7000;

/**
 * Rota las láminas del texto del hero. El reloj es la barra de avance del paso
 * activo: al terminar su animación CSS se pasa a la siguiente, así que pausar
 * la barra (hover, foco o pestaña oculta) pausa también la rotación.
 */
function portada(raiz: HTMLElement, alCambiar: (i: number) => void): () => void {
  const contenedor = raiz.querySelector<HTMLElement>('.hero__laminas');
  const laminas = [...raiz.querySelectorAll<HTMLElement>('[data-lamina]')];
  const pasos = [...raiz.querySelectorAll<HTMLButtonElement>('[data-paso]')];
  if (!contenedor || laminas.length < 2) return () => {};

  const auto = !menosMovimiento();
  let actual = 0;

  raiz.style.setProperty('--duracion', `${DURACION_LAMINA}ms`);
  if (auto) raiz.toggleAttribute('data-auto', true);

  const mostrar = (i: number) => {
    if (i === actual) return;
    // la primera lámina entra con animaciones de carga: se retiran para que,
    // de aquí en adelante, todas entren y salgan por transición
    if (!contenedor.hasAttribute('data-rotando')) {
      laminas[0]
        .querySelectorAll('.anim-rise, .anim-fade')
        .forEach((el) => el.classList.remove('anim-rise', 'anim-fade'));
      contenedor.toggleAttribute('data-rotando', true);
    }
    actual = i;
    alCambiar(i);
    laminas.forEach((lamina, j) => {
      const activa = j === i;
      lamina.toggleAttribute('data-activa', activa);
      lamina.toggleAttribute('inert', !activa);
      if (activa) lamina.removeAttribute('aria-hidden');
      else lamina.setAttribute('aria-hidden', 'true');
    });
    pasos.forEach((paso, j) => {
      if (j === i) paso.setAttribute('aria-current', 'true');
      else paso.removeAttribute('aria-current');
    });
  };

  const onClick = (e: Event) => {
    const paso = (e.target as HTMLElement).closest<HTMLElement>('[data-paso]');
    if (paso) mostrar(Number(paso.dataset.paso));
  };
  const onFin = (e: AnimationEvent) => {
    // solo cuenta la barra del paso activo, no las entradas del titular
    if ((e.target as Element).matches('.hero__paso[aria-current] i')) {
      mostrar((actual + 1) % laminas.length);
    }
  };
  const pausar = () => raiz.toggleAttribute('data-pausa', true);
  const seguir = () => {
    if (!raiz.matches(':hover, :focus-within') && !document.hidden) {
      raiz.removeAttribute('data-pausa');
    }
  };
  const onVisibilidad = () => (document.hidden ? pausar() : seguir());

  raiz.addEventListener('click', onClick);
  if (auto) {
    raiz.addEventListener('animationend', onFin);
    raiz.addEventListener('pointerenter', pausar);
    raiz.addEventListener('pointerleave', seguir);
    raiz.addEventListener('focusin', pausar);
    raiz.addEventListener('focusout', () => requestAnimationFrame(seguir));
    document.addEventListener('visibilitychange', onVisibilidad);
  }

  return () => {
    raiz.removeEventListener('click', onClick);
    raiz.removeEventListener('animationend', onFin);
    document.removeEventListener('visibilitychange', onVisibilidad);
  };
}

/** Arranca el hero si sus elementos existen en la página. */
export function iniciarHero(): void {
  const area = document.getElementById('hero');
  const elVisor = document.getElementById('visor') as HTMLCanvasElement | null;
  const elSenal = document.getElementById('senal') as HTMLCanvasElement | null;
  if (!area || !elVisor || !elSenal) return;

  const hud = lecturas();
  const pararVisor = visor(elVisor, area);
  const pararSenal = senal(elSenal, hud.ritmo);
  const elPortada = area.querySelector<HTMLElement>('[data-portada]');
  const pararPortada = elPortada
    ? portada(elPortada, (i) => {
        area.dataset.tono = String(i);
        cambiarTono(i);
      })
    : () => {};

  window.addEventListener('pagehide', () => {
    pararVisor();
    pararSenal();
    pararPortada();
    hud.detener();
  });
}
