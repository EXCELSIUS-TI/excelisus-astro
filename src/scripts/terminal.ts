/**
 * Anima la demostración de terminal: teclea el comando y va soltando la
 * salida, como una ejecución de verdad. Arranca cuando la sección entra en
 * pantalla y solo una vez.
 *
 * Sin JavaScript —o con `prefers-reduced-motion`— el HTML ya trae el comando
 * escrito y la salida completa: la animación es un añadido, no un requisito.
 */

const RITMO_TECLEO = 45;
const RITMO_SALIDA = 110;
const PAUSA_TRAS_COMANDO = 420;

export function iniciarTerminal(): void {
  const demo = document.querySelector<HTMLElement>('[data-terminal]');
  if (!demo || demo.dataset.listo) return;
  demo.dataset.listo = 'true';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const comando = demo.querySelector<HTMLElement>('[data-comando]');
  const cursor = demo.querySelector<HTMLElement>('[data-cursor]');
  const salida = [...demo.querySelectorAll<HTMLElement>('[data-salida]')];
  if (!comando || !salida.length) return;

  // el CSS oculta la salida solo cuando hay animación, así que se marca aquí
  demo.dataset.animado = 'true';
  const texto = comando.dataset.texto ?? comando.textContent ?? '';
  comando.textContent = '';

  let temporizadores: number[] = [];
  const luego = (fn: () => void, ms: number) => temporizadores.push(window.setTimeout(fn, ms));

  const correr = () => {
    // teclea el comando letra a letra
    for (let i = 1; i <= texto.length; i++) {
      luego(() => (comando.textContent = texto.slice(0, i)), i * RITMO_TECLEO);
    }

    // y después imprime la salida, línea a línea
    const inicio = texto.length * RITMO_TECLEO + PAUSA_TRAS_COMANDO;
    salida.forEach((linea, i) => {
      luego(() => linea.setAttribute('data-visible', 'true'), inicio + i * RITMO_SALIDA);
    });

    // al terminar, el cursor se va: el proceso acabó
    luego(() => cursor?.setAttribute('hidden', ''), inicio + salida.length * RITMO_SALIDA + 500);
  };

  const observador = new IntersectionObserver(
    (entradas) => {
      if (!entradas[0].isIntersecting) return;
      observador.disconnect();
      correr();
    },
    { threshold: 0.35 },
  );
  observador.observe(demo);

  // si la pestaña se cierra a mitad, no dejamos temporizadores colgando
  window.addEventListener('pagehide', () => {
    temporizadores.forEach(clearTimeout);
    temporizadores = [];
  });
}
