# EXCELSIUS · sitio en Astro

Reemplazo del sitio de WordPress de [excelsius.biz](https://www.excelsius.biz/) por un sitio
**estático en Astro**, listo para subir a cPanel.

- **Contenido**: el de excelsius.biz más las maquetas de `../excelsius-maquetas`
  (navbar y sección de cursos).
- **Colores**: los de la marca — azul `#0430cf`, azul oscuro `#021a73`, celeste `#5ED3FF`.
- **Tipografía**: Arimo (titulares y texto) e IBM Plex Mono (HUD y etiquetas técnicas),
  autoalojadas en `public/fonts/`.
- **Lenguaje visual**: el del sitio de referencia (`../drvictorserna`) — fondo oscuro, retícula,
  revelados al hacer scroll y un hero con visor dibujado por código; aquí el visor muestra una
  arquitectura tecnológica (grafo de servicios, puertos de datos y señal de throughput) en vez
  de material clínico.
- **Tema claro y oscuro**: el sitio arranca con la preferencia del sistema y se cambia desde el
  botón del rail (o de la barra superior en móvil).

## Puesta en marcha

El gestor de paquetes es **pnpm** (igual que en `../drvictorserna`); el proyecto fija
`pnpm@11.19.0` en `packageManager`, así que Corepack usa esa versión sola.

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # genera dist/
pnpm preview   # sirve dist/ como lo hará el servidor
pnpm check     # tipos y plantillas
pnpm auditar   # construye y revisa el sitio generado
```

`pnpm auditar` recorre `dist/` y avisa de enlaces internos rotos, recursos que no existen,
imágenes sin `alt`, páginas con más o menos de un `<h1>`, identificadores repetidos, metadatos
ausentes, títulos de más de 62 caracteres, descripciones fuera del rango 70-165, enlaces con
`target="_blank"` sin `rel` e imágenes publicadas que no usa nadie. Necesita Python.

`pnpm-workspace.yaml` guarda los ajustes del gestor: `allowBuilds` habilita los scripts de
instalación de `esbuild` y `sharp`, que pnpm 11 bloquea por defecto. Sin eso el instalador
termina con `ERR_PNPM_IGNORED_BUILDS`.

## Páginas

| Ruta | Archivo | Contenido |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Hero con visor, indicadores, servicios, método, cursos, por qué Excelsius y contacto |
| `/nosotros/` | `src/pages/nosotros.astro` | Quiénes somos, compromisos, stack y formación |
| `/servicios/` | `src/pages/servicios.astro` | Las seis líneas con entregables y tecnologías |
| `/cursos/` | `src/pages/cursos/index.astro` | Catálogo con filtro por línea de especialización |
| `/cursos/<slug>/` | `src/pages/cursos/[slug].astro` | Ficha del curso con temario en acordeón (6 páginas) |
| `/contacto/` | `src/pages/contacto.astro` | Canales, formulario y mapa |
| `/curso-sst-1/` | `src/pages/curso-sst-1.astro` | Landing de capacitaciones SST para empresas (misma URL que en WordPress) |
| `/servicio-analisis-de-datos/` | `src/pages/servicio-analisis-de-datos.astro` | Landing del servicio de análisis de datos (misma URL que en WordPress) |
| `/software/` | `src/pages/software.astro` | Landing de desarrollo de software (misma URL que en WordPress) |
| `/blog/` | `src/pages/blog/index.astro` | Listado del blog: destacado, filtro por categoría y rejilla |
| `/blog/<slug>/` | `src/pages/blog/[slug].astro` | Artículo con índice, FAQ, curso relacionado y compartir |
| `/blog/rss.xml` | `src/pages/blog/rss.xml.ts` | Canal RSS del blog |
| `/politicas-privacidad/` | `src/pages/politicas-privacidad.astro` | Política de privacidad (misma URL que en WordPress) |
| `/404.html` | `src/pages/404.astro` | Página de error |
| `/llms.txt` | `src/pages/llms.txt.ts` | Índice del sitio para modelos de lenguaje |
| `/llms-full.txt` | `src/pages/llms-full.txt.ts` | Todo el contenido (temarios incluidos) en un archivo |

## Dónde se edita el contenido

Todo el texto vive en tres archivos, sin tocar plantillas:

- `src/data/site.ts` — marca, contacto, menú, servicios, método, razones, indicadores y stack.
- `src/data/cursos.ts` — líneas de especialización y cursos (temarios, objetivos, horarios, precios).
- `src/data/sst.ts` — la landing de capacitaciones SST para empresas.
- `src/data/servicio-datos.ts` — la landing del servicio de análisis de datos.
- `src/data/software.ts` — la landing de desarrollo de software.
- `src/data/privacidad.ts` — el texto legal de la política de privacidad.

Para **agregar un curso** basta con añadir un objeto al arreglo `cursos`: la tarjeta, el filtro,
la página `/cursos/<slug>/`, el desplegable del menú y el sitemap se generan solos.

## Estructura de las páginas de curso

Cada `/cursos/<slug>/` sigue el orden del brochure institucional:

1. **Portada** — marca, título del curso, imagen y datos del programa.
2. **Presentación**, objetivos, beneficios y público objetivo, con una imagen de la ejecución.
3. **Plan de estudios** — sesiones, días y horario, más el temario en acordeón (dos niveles:
   módulo → tema → puntos).
4. **Modelo de certificado** (`components/comun/Certificado.astro`).
5. **Medios de pago** (`components/comun/MediosPago.astro`).
6. **Información institucional y marcas asociadas** (`components/comun/Institucional.astro`).

Entre medio van los bloques de posicionamiento: la **respuesta directa** («En corto») y las
**preguntas frecuentes**. Los bloques 5 y 6 se repiten en la página de inicio.

Las cubiertas de portada y de ejecución se **dibujan por código** (`components/cursos/Cubierta.astro`):
llevan el logotipo de la tecnología, la línea del curso y sus datos —duración, sesiones, días y
horario—, así que no conviene sustituirlas por una foto: se perdería esa información. Para eso
están los campos `imagen` e `imagenEjecucion`, pensados para cursos sin logotipo ni datos que
mostrar.

**Las fotos propias van en `imagenes`**, como secciones aparte con su texto:

```ts
imagenes: [
  {
    src: '/img/powerbi/powerbi.webp',
    alt: 'Panel de ventas en Power BI sobre una laptop: ingresos totales…',
    titulo: 'Lo que vas a construir',
    texto: 'Tableros como este: indicadores de negocio arriba…',
    pie: 'Panel de ventas construido en Power BI con datos de SQL Server.',
    ancho: 2752, alto: 1536,
    zona: 'presentacion', // o 'objetivos' | 'plan'
  },
]
```

El `alt` describe lo que se ve, el `pie` se imprime bajo la imagen y los tres campos alimentan
un `ImageObject` dentro del esquema `Course`: es lo que Google usa en resultados de imagen y lo
que cita un asistente. `ancho` y `alto` evitan el salto de maquetación mientras la foto carga.

## Marca

`public/favicon.png` (80 × 80, con transparencia) es **la única fuente del isotipo**: lo usan a
la vez el icono de la pestaña, el `apple-touch-icon`, el esquema `Organization` y el componente
`components/layout/Logo.astro`, que lo acompaña del logotipo tipográfico en su variante
`completo`. Cambiar la marca es reemplazar ese archivo.

Sus colores —índigo `#211C51`, naranja `#FF8D00` y dorado `#FFC700`— son los que alimentan las
paletas `naranja` e `indigo` de los cursos.

## Paleta por curso

El sitio es azul, pero cada página o curso puede llevar su propio acento sin salirse del
logotipo, que tiene **índigo `#211C51`, naranja `#FF8D00` y dorado `#FFC700`**. En los cursos
se elige con el campo `paleta` en `src/data/cursos.ts`; en una página suelta, poniendo
`data-paleta="…"` en el contenedor:

| Valor | Acento | Dónde se usa hoy |
| --- | --- | --- |
| `azul` (por defecto) | celeste sobre oscuro, azul `#0430cf` sobre claro | todos los cursos |
| `naranja` | naranja y dorado del logo, sobre índigo | Plan de Marketing 2027 con IA |
| `violeta` | morado con acentos naranja del logo | Marketing Digital, Estrategia de Redes y Optimización con IA |
| `python` | azul `#3776AB` y amarillo `#FFD43B` de Python | Python para Análisis de Datos |
| `powerbi` | amarillo `#F2C811` de Power BI sobre grafito | Power BI con IA para Analítica Avanzada |
| `sqlserver` | rojo `#CC2927` de SQL Server con sus grises | Análisis de Datos con SQL Server e IA |
| `calida` | morado, naranja y amarillo a la vez | Nosotros |
| `indigo` | índigo del logo con acento dorado | Cursos, Servicio de análisis de datos |

Las paletas viven en `src/styles/global.css` bajo `[data-paleta='…']` y redefinen los mismos
tokens del tema, así que cambian la portada, los botones, las tarjetas, el certificado, los
medios de pago y el bloque institucional de esa página sin tocar ningún componente. Hay que
declararlas también para `.zona-oscura`, porque los tokens heredan del ancestro más cercano y
la portada está por dentro.

La paleta `violeta` además **alterna colores por sección**: el plan de estudios y el certificado
van en morado y la respuesta corta, las preguntas frecuentes y los acentos del temario en
naranja. Esas reglas están al final de `src/pages/cursos/[slug].astro`, bajo
`[data-paleta='violeta']`, y usan el token `--velo-alt`.

> El token `--sobre-azul` define el color del texto encima del color primario: blanco sobre el
> azul corporativo, el morado y el azul de Python; índigo sobre el naranja del logo, donde el
> blanco no contrasta.

### Logotipos del stack

Las etiquetas de tecnología de los servicios (`.NET`, `React`, `Power BI`…) muestran el
logotipo de cada marca con su color oficial. Viven en `public/img/stack/` como archivos
sueltos y el mapa está en `src/data/logos-stack.ts`, generado a partir de simple-icons (CC0).

Se sirven como archivo y no incrustados a propósito: los trazos suman 37 kB y varias
tecnologías se repiten entre servicios, así que incrustarlos habría engordado cada página
unos 40 kB. Como archivos, el navegador descarga cada logotipo una vez y lo cachea; el inicio
solo creció 7 kB.

Para sumar una tecnología: añade su SVG a `public/img/stack/` y una línea al mapa. Lo que no
tiene logotipo propio —REST, Microsoft Fabric, SUNAT— no entra en el mapa y su etiqueta se
muestra solo con texto.

### Logotipos de tecnología

Un curso puede mostrar el logotipo de su tecnología con los colores de esa marca mediante el
campo `logo` (`'python'` y `'powerbi'`). Aparece en la portada, junto a la marca de Excelsius,
y dentro de las cubiertas, donde desplaza a la sigla del curso.

`components/cursos/LogoTec.astro` es el único punto de entrada: la portada y las cubiertas no
saben qué logotipos existen, así que sumar uno nuevo es añadir su componente y una rama ahí.
Cada logotipo trae sus degradados oficiales —Python en `#306998`→`#5A9FD4` y
`#FFD43B`→`#FFE873`, Power BI en `#c87e0e`→`#f9e589`, SQL Server en `#ee352c`→`#a91d22`— y se
usan de forma descriptiva, para identificar la tecnología del curso.

Python y Power BI van incrustados en el HTML y generan `id` distintos por instancia: dos logos
con el mismo id harían que el segundo pintara con las definiciones del primero. El de SQL
Server, en cambio, se sirve desde `public/img/marcas/sqlserver.svg`: pesa 12 kB y sus
degradados se llaman `a`, `b` y `c`, así que incrustado chocaría consigo mismo y con cualquier
otro SVG de la página.

## Demostración en terminal

Un curso puede mostrar el archivo que se escribe en clase junto a su ejecución
(`components/cursos/Terminal.astro`): a la izquierda el editor con el código resaltado, a la
derecha la terminal, que teclea el comando y suelta la salida línea a línea cuando la sección
entra en pantalla.

Se declara en el campo `terminal` del curso (`src/data/cursos.ts`) con el nombre del archivo,
las líneas de código, el comando y la salida. Hoy lo usa **Python para Análisis de Datos**.

El resaltado de sintaxis se calcula **al construir**, con un troceador de unas treinta líneas
dentro del propio componente: el fragmento es fijo y corto, así que la página no carga ningún
resaltador. Si el JavaScript no llega, el HTML ya trae el comando escrito y la salida completa.

> Detalle de maquetación: el `white-space: pre` va en cada línea y no en el bloque. Puesto en
> el bloque, los saltos que la plantilla mete entre elementos se convertían en líneas en blanco.

## Blog

Los artículos son archivos Markdown en **`src/content/blog/`** (colección de contenido de Astro,
esquema en `src/content.config.ts`). Para publicar uno nuevo basta con crear el archivo:

```md
---
titulo: 'Título completo del artículo (máx. 110)'
tituloSeo: 'Título corto para <title> (máx. 50)'
descripcion: 'Meta descripción de 70 a 165 caracteres.'
resumen: 'Respuesta directa de 120 a 420 caracteres: sale en «En corto», en el RSS y en llms.'
publicado: 2026-10-01
actualizado: 2026-10-15      # opcional
categoria: datos             # seguridad | datos | marketing | software
etiquetas: ['Power BI', 'DAX']
curso: power-bi-con-ia-para-analitica-avanzada   # opcional: slug de src/data/cursos.ts
servicio: /servicio-analisis-de-datos/            # opcional
destacado: false
borrador: false
faq:
  - pregunta: '¿…?'
    respuesta: '…'
---

## Primer apartado (H2: entra en el índice lateral)
```

Con eso se actualizan solos el listado, los relacionados, el **sitemap** (con `lastmod`), el
**RSS**, `llms.txt` / `llms-full.txt` (texto íntegro), los datos estructurados `BlogPosting`,
`BreadcrumbList` y `FAQPage`, y las metaetiquetas `article:*`. Luego se genera su tarjeta social
con `pnpm og` (sale en `public/img/og/blog/<slug>.jpg`, con la paleta de `/curso-sst-1/`).

- El blog usa `data-paleta="sst"` (morado `#6a0dad`, naranja `#ff6600`, amarillo `#ffcc00`),
  con tema claro y oscuro; cada categoría añade su tono (`src/data/blog.ts`).
- Las cubiertas se dibujan en CSS con el isotipo de `favicon.png`: no hacen falta fotos.
- El código se resalta con Shiki en dos temas (`astro.config.mjs`) y `Prosa.astro` pinta el
  que corresponde al tema activo.
- Un `curso` que no exista en el catálogo hace fallar el build a propósito.

**Search Console:** pega el código de verificación (método «etiqueta HTML») en
`site.verificacionGoogle` de `src/data/site.ts`, publica y envía
`https://www.excelsius.biz/sitemap.xml` en *Sitemaps*. El RSS (`/blog/rss.xml`) también puede
enviarse como sitemap para que Google descubra antes los artículos nuevos.

## Posicionamiento: SEO, GEO y AEO

Todo lo que leen buscadores y asistentes vive en **`src/seo/`**:

| Archivo | Qué contiene |
| --- | --- |
| `seo.ts` | Una entrada por página: título, descripción, imagen social, prioridad, frecuencia de cambio y `lastmod`. Las fichas de curso salen solas del catálogo. |
| `esquemas.ts` | Constructores de datos estructurados: organización, sitio, proveedor, migas y preguntas frecuentes. |

De esa configuración salen tres cosas, así que no pueden desincronizarse:

- **`/sitemap.xml`** (`src/pages/sitemap.xml.ts`): un solo archivo con las páginas
  indexables (incluidos todos los artículos del blog), con `priority` y `changefreq` por página. `lastmod` solo se emite donde hay una
  fecha real: ponerle la del build a todo el sitio es ruido que los buscadores ignoran.
- **`/robots.txt`** (`src/pages/robots.txt.ts`): permisos, rastreadores de IA admitidos uno a
  uno y el enlace al sitemap y a los archivos para modelos.
- **Los metadatos de cada página**: si una página no pasa título o descripción, los toma de
  `seo.ts`.

> Se retiró `@astrojs/sitemap`: generaba `sitemap-index.xml` + `sitemap-0.xml` y no permite
> afinar prioridad ni frecuencia por página.

`pnpm auditar` comprueba además que toda página publicada esté en el sitemap, que el sitemap no
apunte a nada inexistente, que ninguna página con `noindex` se cuele en él y que la canónica de
cada página coincida con su ruta real.

### Vista previa al compartir (Open Graph)

Cada página emite el juego completo de etiquetas para WhatsApp, Twitter/X, LinkedIn, Facebook
y Telegram: `og:type`, `og:locale`, `og:site_name`, `og:title`, `og:description`, `og:url`,
`og:image` con **`secure_url`, `type`, `width`, `height` y `alt`**, más `twitter:card`,
`twitter:title`, `twitter:description`, `twitter:image` y `twitter:image:alt`.

Las medidas importan: WhatsApp y LinkedIn dibujan el hueco de la vista previa **antes** de
descargar la imagen, y sin `width`/`height` el recorte baila.

- **Por defecto**: `/img/og.png` (1200 × 630), la tarjeta de marca.
- **Cada curso tiene la suya**: `/img/og/<slug>.jpg`, con el color de su paleta, su título, su
  subtítulo y su fotografía de fondo cuando la tiene. Se generan con **`pnpm og`**
  (`scripts/og.py`), que lee los cursos de `src/data/cursos.ts` para no mantener la lista dos
  veces. Hay que volver a ejecutarlo si cambia el título, la paleta o la foto de un curso.

Van en **JPEG** a propósito: WhatsApp no previsualiza WebP de forma fiable y la misma tarjeta
en PNG pesaba 465 kB frente a 92 kB.

> Para comprobar una vista previa: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/),
> [Twitter Card Validator](https://cards-dev.twitter.com/validator) o reenviando el enlace a un
> chat propio de WhatsApp. Las tres cachean, así que tras cambiar una tarjeta hay que forzar el
> rastreo desde esas herramientas.

- **Datos estructurados** por página: `Organization` y `WebSite` en todas —emitidos desde el
  layout, con `sameAs` a los perfiles sociales—, `Course` + `FAQPage` + `BreadcrumbList` en cada
  curso, `Service` + `FAQPage` + `BreadcrumbList` en la landing SST.
- **Respuesta directa** de 40-60 palabras en cada curso (`respuestaRapida` en los datos, o
  generada a partir de sus campos): es el párrafo que citan los asistentes.
- **Preguntas frecuentes** por curso (`faq`, con respaldo automático si no se escriben), que
  alimentan a la vez el acordeón visible y el esquema `FAQPage`.
- **`/llms.txt`** con el mapa del sitio en texto y **`/llms-full.txt`** con todo el contenido
  —temarios completos incluidos—, ambos generados desde `src/data/` en cada build.
- **`robots.txt`** permite explícitamente a GPTBot, ClaudeBot, PerplexityBot, Google-Extended y
  compañía, para que las respuestas sobre Excelsius salgan de la fuente.
- Canónicas absolutas sobre `https://www.excelsius.biz`, `max-snippet:-1`,
  `max-image-preview:large` y metadatos `geo.*` de Lima.

> El `.htaccess` sirve los `.txt` como UTF-8: sin esa línea Apache los entrega en ISO-8859-1 y
> las tildes de los temarios se rompen.

## Origen del contenido de `/servicio-analisis-de-datos/`

Esa URL **ya no existe en el WordPress**: sigue listada en su `page-sitemap.xml` pero devuelve
404, y no hay copia en Wayback Machine. El contenido se reconstruyó a partir de la página
hermana que sí sigue publicada, `/powerbi/` —de donde salen los servicios, la metodología en
cuatro fases, los beneficios y el «por qué elegirnos»—, más los servicios ya recogidos en
`site.ts`. Conviene que alguien de Excelsius revise el texto antes de publicar.

> En `/powerbi/` figuran **otra dirección y otro teléfono** (Dos de Mayo 516 Of. 201,
> Miraflores · 992005096) distintos a los de la portada, que son los que usa este sitio
> (Alameda del Arcoíris 118, Surco · 951 753 920). Hay que confirmar cuáles están vigentes.

## Tema claro / oscuro

El tema real vive en `data-tema` del `<html>`. Un script en línea del `<head>` lo escribe **antes
del primer pintado** (por eso no hay parpadeo blanco): usa lo guardado en `localStorage` y, si no
hay nada, la preferencia del sistema. Solo se guarda cuando la persona pulsa el botón.

Los colores salen de tokens CSS en `src/styles/global.css`: `:root[data-tema='oscuro']` y
`:root[data-tema='claro']`. Los componentes nunca escriben un color a mano, leen
`--fondo`, `--superficie`, `--texto`, `--mute`, `--line` y `--acento`.

Dos detalles de diseño deliberados:

- **El hero y las portadas se quedan oscuros en los dos temas** (clase `.zona-oscura`): son
  pantallas, y una pantalla no se vuelve blanca al cambiar el tema del sitio.
- **El acento cambia con el tema**: celeste sobre negro, azul de marca sobre blanco, porque
  `#0430cf` sobre negro y `#5ED3FF` sobre blanco no contrastan.

## Menú

El menú a pantalla completa lo abren el rail (escritorio) y la barra superior (móvil).
**Cursos** no navega: despliega el mega menú con las tres líneas y sus cursos, igual que la
maqueta del navbar de WordPress, más el acceso a las capacitaciones SST y el enlace a todo el
catálogo.

## Orbes de carga (`thinking-orbs`)

El paquete [`thinking-orbs`](https://www.npmjs.com/package/thinking-orbs) publica su componente
para React, pero también expone el motor en `thinking-orbs/engine`: geometría y pintor de canvas
puros, sin dependencias de framework. Este sitio **usa el motor directamente**
(`src/scripts/orbes.ts`), así que se obtiene la misma animación sin añadir React ni un solo
kilobyte de runtime: el guion compartido pasó de 8 kB a 19,6 kB (7,5 kB con gzip).

Se declaran en el HTML con el componente `components/ui/Orbe.astro`:

```astro
<Orbe estado="connecting" tamano={20} etiqueta="Abriendo WhatsApp" />
```

Los nueve estados del paquete están disponibles (`working`, `searching`, `solving`,
`listening`, `connecting`, `weaving`, `composing`, `breathing`, `shaping`) y los dos tamaños
afinados, 64 y 20.

Dónde se usan hoy —siempre sobre una espera real, no como adorno—:

- **Transición entre páginas** (`components/layout/VeloNavegacion.astro` +
  `scripts/transicion.ts`): al pulsar un enlace interno se baja un velo con el orbe y se marca
  la navegación en `sessionStorage`; al cargar la página siguiente, el guion en línea del
  `<head>` ve esa marca y muestra el velo **antes del primer pintado**, de modo que no hay
  parpadeo entre documentos. Se retira cuando la página está lista y nunca antes de **1,5 s**
  contados desde el inicio de la navegación, con un tope de seguridad de 6 s.

- **Botones del formulario**: mientras se abre WhatsApp o el cliente de correo, que tarda un
  momento sin que el navegador avise de nada.
- **Mapa de `/contacto/`**: el iframe de Google tarda en llegar; el orbe ocupa su sitio hasta
  que dispara `load`, con un tiempo de gracia de 8 s por si nunca lo hace.

Dos detalles de la integración: el tema no se detecta con la convención del paquete
(`data-theme`) sino con el `data-tema` de este sitio, y el orbe se repinta al cambiarlo; y con
`prefers-reduced-motion` se pinta un solo fotograma, como hace el componente oficial.

## Formularios

El formulario (`components/ui/Formulario.astro`) envía a **`public/api/contacto.php`**, que lo
manda por correo a **informes@excelsius.biz** con `mail()` del propio cPanel. El asunto indica
desde qué página llegó (`[EXCELSIUS · excelsius.biz] Curso: … — Nombre`). **WhatsApp**
(`wa.me/51951753920`) sigue como segunda vía, con el mensaje ya redactado.

La configuración (correo, clave de prueba, plantilla del correo) está en `public/api/config.php`.

## Subida a cPanel

Todo el procedimiento —respaldo del WordPress actual, subida, correo y pruebas— está en
**[`DEPLOY_CPANEL.md`](DEPLOY_CPANEL.md)**. En resumen: cambia `TEST_KEY` en
`public/api/config.php`, `pnpm build`, sube **el contenido** de `dist/` a `public_html/`
(después de sacar de ahí el WordPress) y prueba con `/api/testmail.php?key=…`.

El `.htaccess` ya trae: https + www, página 404, barra final en las URL, compresión, caché con
hash inmutable, cabeceras de seguridad, bloqueo de `api/config.php` y las redirecciones de las
URL viejas de WordPress.

> El servidor solo necesita PHP para el formulario: no hay base de datos ni Node.

## Pendientes conocidos

- **Fotos**: no hay banco de imágenes propio, así que el hero y las cubiertas de los cursos se
  dibujan con gradientes y canvas.
- **Redes sociales**: las URL de Facebook, Instagram y YouTube en `src/data/site.ts` están
  puestas por convención; conviene confirmarlas.
- **Indicadores** (`15+ años`, `120+ proyectos`): son cifras de ejemplo, ajústalas antes de publicar.
- **Medios de pago**: `pagos` en `src/data/site.ts` describe los canales sin números de cuenta.
  Cuando tengas las cuentas reales, se escriben en el campo `detalle`.
- **Marcas asociadas**: `marcas` en `src/data/site.ts` lista las tecnologías y estándares con
  los que trabajan, cada una con su logotipo oficial en vector
  (`components/comun/LogoMarca.astro`). Si más adelante hay aliados comerciales, se añaden ahí
  con su logo. **ISO 45001 e ISO 14001 usan un sello neutro dibujado por nosotros**: ISO no
  autoriza el uso de su logotipo a terceros, ni siquiera a organizaciones certificadas.
- **Fotos de los cursos**: mientras no existan, las cubiertas se dibujan por código; ver
  `imagen` e `imagenEjecucion` en `src/data/cursos.ts`.
