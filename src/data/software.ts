/**
 * Página de desarrollo de software (`/software/`), reescrita a partir de la
 * que sigue publicada en WordPress con esa misma URL: sus ocho productos, el
 * «por qué elegirnos» y el cierre con la visita técnica.
 */

export const software = {
  hero: {
    hud: 'Desarrollo de software e infraestructura',
    titulo: 'Innovación',
    acento: 'en software',
    subtitulo:
      'Un equipo de ingenieros y técnicos certificados que desarrolla software, aplicaciones móviles, web, CRM y ERP a la medida de cada cliente.',
    bajada:
      'Trabajamos con tecnologías actuales y prácticas de ingeniería —control de versiones, ambientes separados y despliegues reproducibles— para entregar soluciones que entran en producción y se quedan funcionando.',
    cta: 'Solicitar una cotización',
  },

  respuesta:
    'Excelsius desarrolla software a medida para empresas en Perú: sistemas web, aplicaciones móviles iOS y Android, comercio electrónico, ERP Odoo, CRM Vtiger, automatización con macros VBA, Business Intelligence con Power BI y aulas virtuales. El equipo es de ingenieros certificados y cada proyecto se entrega por fases, con capacitación y soporte posterior.',

  cifras: [
    { valor: '08', etiqueta: 'Líneas de producto' },
    { valor: '120+', etiqueta: 'Proyectos e implementaciones' },
    { valor: '100 %', etiqueta: 'Código propio, entregado al cliente' },
    { valor: '24/7', etiqueta: 'Monitoreo de los sistemas en producción' },
  ],

  /** Los ocho productos de la página original, con su stack real. */
  productos: [
    {
      indice: '01',
      nombre: 'Software a medida',
      detalle:
        'Desarrollo personalizado por programadores certificados en distintas tecnologías de bases de datos y lenguajes de programación. Sistemas construidos sobre el proceso real de la empresa, con roles, trazabilidad y reportes.',
      stack: ['.NET', 'Node.js', 'TypeScript', 'SQL Server', 'PostgreSQL', 'Docker'],
      icono: 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z',
    },
    {
      indice: '02',
      nombre: 'Aplicaciones móviles',
      detalle:
        'Aplicaciones nativas para iOS —iPhone y iPad— y Android, o híbridas cuando el presupuesto y el alcance lo aconsejan. Trabajo sin conexión, sincronización, notificaciones y publicación en ambas tiendas.',
      stack: ['Flutter', 'React Native', 'Android', 'iOS', 'Firebase'],
      icono: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 4v12h10V6H7zm5 13.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
    },
    {
      indice: '03',
      nombre: 'Desarrollo web y comercio electrónico',
      detalle:
        'Sitios que dan imagen de impacto y que además venden: catálogo, carrito, pasarela de pago y medición. Desarrollados en gestores autoadministrables para que tu equipo publique sin depender de un programador.',
      stack: ['Astro', 'Next.js', 'WordPress', 'WooCommerce', 'Tailwind', 'GA4'],
      icono: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM4.3 13h3.2c.1 1.7.4 3.3.9 4.6A8 8 0 0 1 4.3 13zm3.2-2H4.3a8 8 0 0 1 4.1-4.6c-.5 1.3-.8 2.9-.9 4.6zm4.5 9c-.9 0-2.2-2.5-2.4-7h4.8c-.2 4.5-1.5 7-2.4 7zm-2.4-9c.2-4.5 1.5-7 2.4-7s2.2 2.5 2.4 7H9.6zm6.9 2h3.2a8 8 0 0 1-4.1 4.6c.5-1.3.8-2.9.9-4.6zm0-2c-.1-1.7-.4-3.3-.9-4.6a8 8 0 0 1 4.1 4.6h-3.2z',
    },
    {
      indice: '04',
      nombre: 'ERP Odoo',
      detalle:
        'ERP de código abierto para integrar los procesos de la organización en una sola solución: ventas, servicios, operaciones, logística, inventario, contabilidad y facturación electrónica. Parametrización, migración, desarrollos a medida y capacitación por rol.',
      stack: ['Odoo', 'Python', 'PostgreSQL', 'Docker'],
      icono: 'M4 4h16v4H4zm0 6h7v10H4zm9 0h7v10h-7z',
    },
    {
      indice: '05',
      nombre: 'CRM Vtiger',
      detalle:
        'CRM de código abierto que personalizamos, implementamos y soportamos. Integra y automatiza al equipo de ventas: embudo, seguimiento de oportunidades, cotizaciones y postventa para fidelizar a tus clientes.',
      stack: ['Vtiger', 'PHP', 'MySQL'],
      icono: 'M16 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3 0-8 1.5-8 4.5V21h10v-3.5c0-1 .5-2 1.4-2.8A13 13 0 0 0 8 13zm8 0c-.9 0-1.9.1-2.9.4 1.2.9 1.9 2 1.9 3.1V21h9v-3.5c0-3-5-4.5-8-4.5z',
    },
    {
      indice: '06',
      nombre: 'Macros y automatización en Excel',
      detalle:
        'Automatiza tareas y procesos con macros VBA: tableros e informes que se arman solos, integración con bases de datos como Access o SQL, y manejo de grandes volúmenes de información sin trabajo manual.',
      stack: ['Excel', 'VBA', 'Python'],
      icono: 'M6 2h9l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5zM8.5 11l2 3-2 3h1.8l1.2-1.9l1.2 1.9h1.8l-2-3l2-3h-1.8l-1.2 1.9L10.3 11z',
    },
    {
      indice: '07',
      nombre: 'Inteligencia de negocios',
      detalle:
        'Informes automatizados y compartidos en la nube con información de valor para tus colaboradores. Proyectos de Business Intelligence completos: integración de fuentes, modelo, métricas, análisis y visualización.',
      stack: ['Power BI', 'SQL Server', 'Azure', 'Python'],
      icono: 'M4 20h3v-8H4v8zm6.5 0h3V4h-3v16zM17 20h3v-12h-3v12z',
    },
    {
      indice: '08',
      nombre: 'Aulas virtuales',
      detalle:
        'Implementación, capacitación y soporte de aulas virtuales para universidades, institutos y escuelas: gestión de alumnos, cursos, profesores, horarios, evaluaciones y certificados.',
      stack: ['Moodle', 'PHP', 'MySQL', 'Docker'],
      icono: 'M12 3 1 9l11 6l9-4.91V17h2V9zM5 13.18v4L12 21l7-3.82v-4L12 17z',
    },
  ],

  razones: [
    {
      titulo: 'Equipo de primer nivel',
      detalle:
        'Ingenieros profesionales certificados en distintas tecnologías, capaces de tomar el proyecto de punta a punta: base de datos, backend, interfaz, despliegue y datos.',
    },
    {
      titulo: 'Mejores prácticas de ingeniería',
      detalle:
        'Aplicamos prácticas de desarrollo de software e infraestructura, con gerencia de proyectos, control de versiones, revisiones de código y ambientes separados para lograr un producto de calidad.',
    },
    {
      titulo: 'Presupuestos competitivos',
      detalle:
        'Precio claro y alcance cerrado, con un estándar alto en el servicio. El ahorro sale de trabajar ordenado, no de recortar calidad.',
    },
  ],

  proceso: [
    { paso: '01', nombre: 'Visita técnica', detalle: 'Levantamos el proceso en sitio o por videollamada y medimos dónde se pierde tiempo.' },
    { paso: '02', nombre: 'Propuesta', detalle: 'Alcance escrito, entregables, cronograma y presupuesto cerrado. Lo que no entra, también queda escrito.' },
    { paso: '03', nombre: 'Construcción', detalle: 'Entregas por fases con demo funcionando, probadas con usuarios reales y no solo con el equipo técnico.' },
    { paso: '04', nombre: 'Puesta en marcha', detalle: 'Migración de datos, capacitación por rol, manual y acompañamiento durante el arranque.' },
    { paso: '05', nombre: 'Soporte', detalle: 'Monitoreo, mejoras y nuevas funciones con acuerdo de servicio mientras el negocio cambia.' },
  ],

  preguntas: [
    {
      pregunta: '¿El código del sistema queda en nuestra propiedad?',
      respuesta:
        'Sí. El código fuente, la base de datos y la documentación se entregan al cliente al cierre del proyecto. No trabajamos con desarrollos que dejen a la empresa atada a un proveedor.',
    },
    {
      pregunta: '¿Cuánto demora un desarrollo a medida?',
      respuesta:
        'Depende del alcance, pero el proyecto se organiza por fases con demo funcionando en cada una, así que hay algo revisable mucho antes del cierre. El cronograma con fechas sale de la propuesta, después de la visita técnica.',
    },
    {
      pregunta: '¿Pueden integrarse con el sistema que ya usamos?',
      respuesta:
        'Sí. Desarrollamos integraciones con ERP, CRM, facturadores electrónicos, pasarelas de pago y servicios externos mediante API. También migramos maestros e históricos del sistema anterior.',
    },
    {
      pregunta: '¿Ofrecen soporte después de la entrega?',
      respuesta:
        'Sí, con acuerdo de servicio: monitoreo, corrección de incidencias y evolución del sistema. Un software sin mantenimiento envejece mal y termina reemplazado antes de tiempo.',
    },
    {
      pregunta: '¿Trabajan con empresas fuera de Lima?',
      respuesta:
        'Sí. El trabajo es remoto en su mayor parte y las visitas técnicas se coordinan según el proyecto. Atendemos clientes en todo el Perú.',
    },
  ],

  cierre: {
    titulo: 'Solicite una visita técnica o una cotización',
    texto:
      'Cuéntanos qué proceso quieres resolver o qué sistema necesitas reemplazar. La primera conversación de diagnóstico no tiene costo.',
  },
} as const;
