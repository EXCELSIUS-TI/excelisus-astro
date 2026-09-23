/** Datos transversales del sitio: marca, contacto, navegación y copy fijo. */

export const site = {
  nombre: 'EXCELSIUS',
  nombreLargo: 'Excelsius Consultores',
  url: 'https://www.excelsius.biz',
  titulo: 'EXCELSIUS · Software a medida, datos y capacitación',
  /* la descripción se corta hacia los 160 caracteres en los resultados de
     búsqueda: entra lo esencial y nada más */
  descripcion:
    'Software a medida, apps móviles, ERP Odoo y Business Intelligence en Perú. Y cursos en vivo de seguridad, marketing y análisis de datos, con certificación.',
  claim:
    'Consultoría, desarrollo e implementación de tecnologías de la información',
  claimFuerte: 'Capacitación en Seguridad Ambiental, Marketing y Análisis de Datos',
  /**
   * Código de verificación de Google Search Console (método «etiqueta HTML»).
   * Se pega aquí el valor de `content` que da Search Console y la etiqueta
   * aparece en todas las páginas; vacío, no se emite nada.
   */
  verificacionGoogle: '',
} as const;

export const contacto = {
  telefono: '951 753 920',
  telefonoLink: 'tel:+51951753920',
  correo: 'informes@excelsius.biz',
  correoLink: 'mailto:informes@excelsius.biz',
  whatsapp: 'https://wa.link/m0gsz9',
  /** número en formato internacional, sin signos: lo pide wa.me */
  numeroWhatsapp: '51951753920',
  direccion: 'Calle Alameda del Arcoíris 118, Santiago de Surco',
  ciudad: 'Lima, Perú',
  horario: 'Lun a vie · 9:00 a. m. – 7:00 p. m.',
  horarioClases: 'Clases en vivo de 7:30 a 10:30 p. m.',
  redes: [
    { nombre: 'Facebook', url: 'https://www.facebook.com/excelsius.biz' },
    { nombre: 'Instagram', url: 'https://www.instagram.com/excelsius.biz' },
    { nombre: 'YouTube', url: 'https://www.youtube.com/@excelsius' },
  ],
} as const;

/**
 * Enlace de WhatsApp con el mensaje ya escrito. El enlace corto `wa.link` del
 * campo `whatsapp` no admite texto, así que para abrir la conversación con un
 * asunto concreto se arma sobre `wa.me`.
 */
export const linkWhatsapp = (mensaje: string): string =>
  `https://wa.me/${contacto.numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;

/** Enlace de correo con asunto —y cuerpo, si se pasa— ya rellenados. */
export const linkCorreo = (asunto: string, cuerpo?: string): string => {
  const partes = [`subject=${encodeURIComponent(asunto)}`];
  if (cuerpo) partes.push(`body=${encodeURIComponent(cuerpo)}`);
  return `${contacto.correoLink}?${partes.join('&')}`;
};

export const rutas = {
  inicio: '/',
  nosotros: '/nosotros/',
  servicios: '/servicios/',
  cursos: '/cursos/',
  blog: '/blog/',
  contacto: '/contacto/',
} as const;

/** Menú principal; `cursos` se despliega con las líneas de especialización. */
export const menu = [
  { nombre: 'Inicio', href: rutas.inicio, indice: '01' },
  { nombre: 'Nosotros', href: rutas.nosotros, indice: '02' },
  { nombre: 'Servicios', href: rutas.servicios, indice: '03' },
  { nombre: 'Cursos', href: rutas.cursos, indice: '04' },
  { nombre: 'Blog', href: rutas.blog, indice: '05' },
  { nombre: 'Contacto', href: rutas.contacto, indice: '06' },
] as const;

/** Servicios: son los que el sitio actual ofrece, reescritos con su alcance real. */
export const servicios = [
  {
    id: 'software',
    indice: '01',
    /** este servicio tiene landing propia */
    pagina: '/software/',
    nombre: 'Desarrollo de software a medida',
    resumen:
      'Sistemas web, CRM, ERP e intranets construidos sobre el proceso real de la empresa, no sobre una plantilla.',
    detalle:
      'Levantamos el proceso, lo modelamos y lo llevamos a un sistema propio: módulos de ventas, operaciones, almacén, facturación o atención, con roles, trazabilidad y reportes. Arquitectura por capas, base de datos normalizada y despliegue documentado para que el sistema sobreviva al equipo que lo construyó.',
    entregables: [
      'Análisis funcional y modelo de datos',
      'Aplicación web con panel de administración',
      'API documentada para integraciones',
      'Manual técnico y de usuario',
    ],
    stack: ['.NET', 'Node.js', 'React', 'Astro', 'SQL Server', 'PostgreSQL'],
  },
  {
    id: 'moviles',
    indice: '02',
    nombre: 'Aplicaciones móviles',
    resumen:
      'Apps iOS y Android, nativas o híbridas, conectadas al mismo backend que ya usa tu operación.',
    detalle:
      'Aplicaciones para fuerza de ventas, reparto, inspecciones en campo o atención al cliente, con trabajo sin conexión, sincronización, notificaciones y geolocalización. Publicamos en App Store y Google Play y dejamos el canal de actualizaciones en marcha.',
    entregables: [
      'App publicada en ambas tiendas',
      'Modo sin conexión y sincronización',
      'Notificaciones push segmentadas',
      'Tablero de uso y errores',
    ],
    stack: ['Flutter', 'React Native', 'Firebase', 'REST'],
  },
  {
    id: 'web',
    indice: '03',
    nombre: 'Diseño web y CMS',
    resumen:
      'Sitios rápidos, medibles y editables por tu equipo, pensados para convertir y no solo para verse bien.',
    detalle:
      'Diseño de interfaz, redacción orientada a búsqueda, estructura de contenidos y gestor para que marketing publique sin depender de un programador. Optimización de Core Web Vitals, datos estructurados y analítica conectada desde el primer día.',
    entregables: [
      'Diseño responsive y accesible',
      'Gestor de contenidos a medida',
      'SEO técnico y datos estructurados',
      'Analítica y eventos de conversión',
    ],
    stack: ['Astro', 'WordPress', 'Tailwind', 'GA4'],
  },
  {
    id: 'bi',
    indice: '04',
    /** este servicio tiene landing propia */
    pagina: '/servicio-analisis-de-datos/',
    nombre: 'Business Intelligence con Power BI',
    resumen:
      'Del dato disperso al tablero que se mira todas las mañanas: modelo, métricas y gobierno de la información.',
    detalle:
      'Integramos tus fuentes —ERP, Excel, bases de datos, plataformas de anuncios—, construimos el modelo dimensional, escribimos las métricas en DAX y publicamos tableros con actualización automática y permisos por área.',
    entregables: [
      'Modelo dimensional documentado',
      'Tableros por área y por rol',
      'Actualización automática programada',
      'Capacitación al equipo usuario',
    ],
    stack: ['Power BI', 'SQL Server', 'Microsoft Fabric', 'Azure'],
  },
  {
    id: 'ml',
    indice: '05',
    nombre: 'Machine Learning e IA aplicada',
    resumen:
      'Modelos que responden preguntas del negocio: qué se va a vender, quién se va a ir, qué conviene priorizar.',
    detalle:
      'Partimos del problema, no del algoritmo: pronóstico de demanda, detección de fuga de clientes, clasificación de documentos, scoring y asistentes con IA sobre tu propia información. Entregamos el modelo evaluado, su tablero y el proceso para reentrenarlo.',
    entregables: [
      'Exploración y preparación de datos',
      'Modelo evaluado con métricas claras',
      'Integración con Power BI o API',
      'Plan de reentrenamiento',
    ],
    stack: ['Python', 'scikit-learn', 'Pandas', 'Azure ML'],
  },
  {
    id: 'odoo',
    indice: '06',
    nombre: 'Implementación de ERP Odoo',
    resumen:
      'Odoo configurado, migrado y adoptado: ventas, compras, inventario, contabilidad y facturación electrónica.',
    detalle:
      'Analizamos el proceso, parametrizamos los módulos que la empresa realmente necesita, migramos maestros e históricos, desarrollamos lo que falte y acompañamos la puesta en marcha con capacitación por rol.',
    entregables: [
      'Parametrización por módulo',
      'Migración de maestros e históricos',
      'Desarrollos a medida sobre Odoo',
      'Capacitación y soporte de arranque',
    ],
    stack: ['Odoo', 'Python', 'PostgreSQL', 'SUNAT'],
  },
] as const;

/** Método de trabajo: la secuencia que el cliente va a vivir. */
export const proceso = [
  {
    paso: '01',
    nombre: 'Diagnóstico',
    detalle:
      'Entendemos el proceso, medimos dónde se pierde tiempo y definimos qué problema resuelve el software. Sin diagnóstico no hay propuesta.',
  },
  {
    paso: '02',
    nombre: 'Propuesta y alcance',
    detalle:
      'Alcance escrito, entregables, cronograma y presupuesto cerrado. Lo que no entra, también queda escrito.',
  },
  {
    paso: '03',
    nombre: 'Diseño y arquitectura',
    detalle:
      'Modelo de datos, arquitectura, prototipo navegable y criterios de aceptación antes de escribir la primera línea de producción.',
  },
  {
    paso: '04',
    nombre: 'Construcción por entregas',
    detalle:
      'Sprints con demo funcionando. Cada entrega se prueba con usuarios reales, no solo con el equipo técnico.',
  },
  {
    paso: '05',
    nombre: 'Despliegue y adopción',
    detalle:
      'Puesta en producción, migración de datos, capacitación por rol y manual. El sistema entra en uso, no en un servidor.',
  },
  {
    paso: '06',
    nombre: 'Soporte y evolución',
    detalle:
      'Monitoreo, mejoras y nuevas funciones con acuerdo de servicio. El software acompaña al negocio mientras cambia.',
  },
] as const;

/** Razones de "por qué Excelsius", tomadas del sitio actual y afiladas. */
export const razones = [
  {
    titulo: 'Mejores prácticas de desarrollo e infraestructura',
    detalle:
      'Control de versiones, revisiones de código, ambientes separados y despliegues reproducibles. Nada se sube a producción desde una laptop.',
  },
  {
    titulo: 'Presupuestos competitivos con estándar alto',
    detalle:
      'Alcance cerrado y precio claro. El ahorro sale de trabajar ordenado, no de recortar calidad ni de dejar el proyecto a medias.',
  },
  {
    titulo: 'Equipo de ingenieros full stack certificados',
    detalle:
      'Ingenieros que trabajan el proyecto de punta a punta: base de datos, backend, interfaz, despliegue y datos.',
  },
  {
    titulo: 'IA como herramienta, no como discurso',
    detalle:
      'Usamos inteligencia artificial donde acorta trabajo y mejora resultados, y lo decimos cuando no aporta nada al problema.',
  },
] as const;

/** Cifras del HUD del hero y de la franja de indicadores. */
export const indicadores = [
  { valor: '15+', etiqueta: 'Años de ejercicio profesional' },
  { valor: '120+', etiqueta: 'Proyectos e implementaciones' },
  { valor: '6', etiqueta: 'Líneas de servicio' },
  { valor: '99.9 %', etiqueta: 'Disponibilidad comprometida' },
] as const;

/** Stack visible en la sección de tecnologías. */
export const stack = [
  { grupo: 'Backend', items: ['.NET', 'Node.js', 'Python', 'PHP'] },
  { grupo: 'Frontend', items: ['React', 'Astro', 'Next.js', 'Flutter'] },
  { grupo: 'Datos', items: ['SQL Server', 'PostgreSQL', 'Power BI', 'Fabric'] },
  { grupo: 'Nube', items: ['Azure', 'AWS', 'Cloudflare', 'Docker'] },
] as const;

/**
 * Medios de pago. Son los canales habituales de una academia peruana, sin
 * números de cuenta inventados: cuando tengas las cuentas reales, se escriben
 * en `detalle` y listo. Se usan en inicio y en cada página de curso.
 */
export const pagos = [
  {
    nombre: 'Transferencia o depósito',
    detalle: 'Cuentas en soles de banco local. Te enviamos los datos al confirmar tu vacante.',
    icono: 'M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8zm8-7 9 5H3l9-5zM7 13v4h2v-4H7zm4 0v4h2v-4h-2zm4 0v4h2v-4h-2z',
  },
  {
    nombre: 'Yape y Plin',
    detalle: 'Pago inmediato desde el celular. Envía la constancia por WhatsApp y quedas matriculado.',
    icono: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 4v12h10V6H7zm5 13.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
  },
  {
    nombre: 'Tarjeta de débito o crédito',
    detalle: 'Enlace de pago seguro con Visa, Mastercard, American Express y Diners.',
    icono: 'M3 6h18a1 1 0 0 1 1 1v3H2V7a1 1 0 0 1 1-1zM2 12h20v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5zm3 3v1.5h4V15H5z',
  },
  {
    nombre: 'Pago en cuotas',
    detalle: 'Fracciona la inversión en dos partes: la primera reserva la vacante y la segunda antes de la mitad del curso.',
    icono: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.6V6h-2v7.4l5.2 3.1 1-1.7-4.2-2.2z',
  },
  {
    nombre: 'Facturación a empresas',
    detalle: 'Emitimos factura electrónica y orden de servicio para capacitaciones corporativas e in house.',
    icono: 'M6 2h9l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5zM8 12h8v2H8v-2zm0 4h8v2H8v-2z',
  },
] as const;

/** Nota al pie del bloque de pagos: lo que sí conviene decir siempre. */
export const pagosNota =
  'La vacante se confirma con el pago y el envío de la constancia por WhatsApp. Emitimos boleta o factura electrónica. Para grupos de una misma empresa hay tarifa corporativa.';

/** Logotipos disponibles en `components/comun/LogoMarca.astro`. */
export type MarcaId =
  | 'microsoft'
  | 'odoo'
  | 'python'
  | 'sqlserver'
  | 'meta'
  | 'google'
  | 'norma';

/**
 * Marcas y tecnologías con las que trabajamos en proyectos y cursos. Cada una
 * lleva su logotipo oficial en vector; las normas ISO usan un sello neutro,
 * porque ISO no autoriza el uso de su logotipo a terceros.
 */
export const marcas = [
  { nombre: 'Microsoft', nota: 'Power BI · Fabric · Azure', logo: 'microsoft' },
  { nombre: 'Odoo', nota: 'ERP e implementación', logo: 'odoo' },
  { nombre: 'Python', nota: 'Análisis y automatización', logo: 'python' },
  { nombre: 'SQL Server', nota: 'Bases de datos', logo: 'sqlserver' },
  { nombre: 'Meta', nota: 'Ecosistema de anuncios', logo: 'meta' },
  { nombre: 'Google', nota: 'Ads · Analytics · Workspace', logo: 'google' },
  { nombre: 'ISO 45001', nota: 'Seguridad y salud en el trabajo', logo: 'norma' },
  { nombre: 'ISO 14001', nota: 'Gestión ambiental', logo: 'norma' },
] as const satisfies readonly { nombre: string; nota: string; logo: MarcaId }[];
