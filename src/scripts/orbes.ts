import { resolvePreset, MODE_DRAWS } from 'thinking-orbs/engine';
import type { OrbState, OrbSize } from 'thinking-orbs/engine';

/**
 * Orbes de `thinking-orbs` sobre canvas, sin React.
 *
 * El paquete publica su componente para React, pero también expone el motor
 * (`thinking-orbs/engine`): geometría y pintor de canvas puros. Este sitio no
 * carga ningún framework, así que se usa el motor directamente —misma
 * animación, cero kilobytes de React—.
 *
 * El tema no se detecta con la convención del paquete (`data-theme`), porque
 * aquí el tema vive en `data-tema`; se le pasa resuelto y se repinta cuando
 * cambia.
 */

type Control = { detener: () => void };

const menosMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esOscuro = () => document.documentElement.dataset.tema !== 'claro';

/** Monta un orbe en un canvas y devuelve su control. */
export function crearOrbe(
  canvas: HTMLCanvasElement,
  estado: OrbState = 'working',
  tamano: OrbSize = 64,
  velocidad = 1,
): Control {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { detener: () => {} };

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(tamano * dpr);
  canvas.height = Math.round(tamano * dpr);
  canvas.style.width = `${tamano}px`;
  canvas.style.height = `${tamano}px`;

  const { mode, speed, opts } = resolvePreset(estado, tamano);
  const dibujar = MODE_DRAWS[mode];
  const ritmo = speed * velocidad;

  let oscuro = esOscuro();
  const pintar = (t: number) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, tamano, tamano);
    dibujar(ctx, tamano, t, oscuro, opts);
  };

  // sin movimiento: un solo fotograma, el mismo que usa el componente oficial
  if (menosMovimiento()) {
    pintar(0.6);
    const alCambiarTema = () => {
      oscuro = esOscuro();
      pintar(0.6);
    };
    window.addEventListener('exc:tema', alCambiarTema);
    return { detener: () => window.removeEventListener('exc:tema', alCambiarTema) };
  }

  let raf = 0;
  let corriendo = false;
  const bucle = () => {
    pintar((performance.now() / 1000) * ritmo);
    if (corriendo) raf = requestAnimationFrame(bucle);
  };
  const arrancar = () => {
    if (corriendo) return;
    corriendo = true;
    raf = requestAnimationFrame(bucle);
  };
  const parar = () => {
    corriendo = false;
    cancelAnimationFrame(raf);
  };

  // fuera de pantalla no se anima
  const observador = new IntersectionObserver(([e]) => (e.isIntersecting ? arrancar() : parar()));
  observador.observe(canvas);

  const alCambiarTema = () => {
    oscuro = esOscuro();
    if (!corriendo) pintar((performance.now() / 1000) * ritmo);
  };
  window.addEventListener('exc:tema', alCambiarTema);

  pintar(0);
  arrancar();

  return {
    detener: () => {
      parar();
      observador.disconnect();
      window.removeEventListener('exc:tema', alCambiarTema);
    },
  };
}

/** Monta los orbes declarados en el HTML con `data-orbe`. */
export function iniciarOrbes(raiz: ParentNode = document): void {
  raiz.querySelectorAll<HTMLCanvasElement>('canvas[data-orbe]:not([data-listo])').forEach((c) => {
    c.dataset.listo = 'true';
    crearOrbe(
      c,
      (c.dataset.estado as OrbState) || 'working',
      (Number(c.dataset.tamano) || 64) as OrbSize,
    );
  });
}
