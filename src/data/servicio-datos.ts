/**
 * Servicio de análisis de datos (`/servicio-analisis-de-datos/`).
 *
 * La página original de WordPress fue dada de baja —la URL sigue en su
 * sitemap pero devuelve 404 y no hay copia en Wayback—, así que el contenido
 * se reconstruyó a partir de la página hermana que sí sigue publicada
 * (`/powerbi/`: servicios, metodología en cuatro fases, beneficios y el
 * «por qué elegirnos») y de los servicios de `site.ts`.
 */

export const servicioDatos = {
  hero: {
    hud: 'Consultoría en análisis de datos',
    titulo: 'Que tus datos',
    acento: 'cobren vida',
    subtitulo:
      'Análisis de datos, Business Intelligence y analítica avanzada para que la información de tu organización deje de vivir en archivos sueltos y empiece a sostener decisiones.',
    bajada:
      'Conectamos tus fuentes, construimos el modelo, programamos las métricas y dejamos los tableros funcionando —con tu equipo capacitado para usarlos.',
    cta: 'Solicitar una reunión',
  },

  respuesta:
    'Excelsius implementa soluciones de análisis de datos para empresas en Perú: integración de fuentes, modelado, tableros en Power BI, automatización de reportes y analítica avanzada con SQL, Python, Microsoft Fabric y Azure. El servicio incluye la capacitación del equipo que va a usar los tableros y acompañamiento después del despliegue.',

  cifras: [
    { valor: '15+', etiqueta: 'Años trabajando con datos' },
    { valor: '4', etiqueta: 'Fases con entregable revisable' },
    { valor: '99.9 %', etiqueta: 'Disponibilidad comprometida' },
    { valor: '24/7', etiqueta: 'Monitoreo de las cargas' },
  ],

  servicios: [
    {
      nombre: 'Desarrollo de tableros',
      detalle:
        'Dashboards a medida en Power BI: modelo dimensional, métricas en DAX, permisos por área y actualización automática. Diseñados para responder preguntas de negocio, no para llenar pantallas.',
      icono: 'M4 20h3v-8H4v8zm6.5 0h3V4h-3v16zM17 20h3v-12h-3v12z',
    },
    {
      nombre: 'Integración y preparación de datos',
      detalle:
        'Conectamos ERP, Excel, bases de datos, plataformas de anuncios y APIs. Limpieza, transformación y consolidación con SQL, Power Query y Python, en procesos que se ejecutan solos.',
      icono: 'M12 2 2 7l10 5l10-5zM2 17l10 5l10-5M2 12l10 5l10-5',
    },
    {
      nombre: 'Gobierno y modelo de datos',
      detalle:
        'Diccionario de indicadores, definiciones únicas por métrica, control de accesos y documentación. Que «ventas» signifique lo mismo en finanzas, comercial y operaciones.',
      icono: 'M12 2 4 5.5v6c0 5 3.4 9.5 8 10.5 4.6-1 8-5.5 8-10.5v-6L12 2zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
    },
    {
      nombre: 'Self-service BI y capacitación',
      detalle:
        'Dejamos al equipo capaz de crear sus propias vistas sin romper el modelo: formación por rol, plantillas y reglas claras de qué se puede tocar y qué no.',
      icono: 'M12 3 1 9l11 6l9-4.91V17h2V9zM5 13.18v4L12 21l7-3.82v-4L12 17z',
    },
    {
      nombre: 'Analítica avanzada y Machine Learning',
      detalle:
        'Pronóstico de demanda, detección de fuga de clientes, scoring y segmentación. Modelos evaluados con métricas claras e integrados al tablero que ya usa la operación.',
      icono: 'M12 2a10 10 0 1 0 10 10h-10z',
    },
    {
      nombre: 'Microsoft Fabric y Azure',
      detalle:
        'Cuando el volumen supera al archivo: almacenamiento, procesamiento y consulta a escala, con los datos preparados para analítica e inteligencia artificial.',
      icono: 'M6 19a5 5 0 0 1-.5-9.97A7 7 0 0 1 19 8.5a4.5 4.5 0 0 1-.5 10.5z',
    },
  ],

  metodologia: [
    {
      paso: '01',
      nombre: 'Planificación y diseño',
      detalle:
        'Revisamos las fuentes de datos, definimos las primeras métricas, diseñamos los bocetos de los tableros y planificamos el proyecto por fases y entregables.',
    },
    {
      paso: '02',
      nombre: 'Conexión y transformación',
      detalle:
        'Conectamos las distintas fuentes de la organización —estructuradas y no estructuradas, locales y en la nube— y ejecutamos el proceso de transformación de los datos.',
    },
    {
      paso: '03',
      nombre: 'Construcción',
      detalle:
        'Diseñamos el modelo de datos, programamos las métricas y desarrollamos las visualizaciones, revisando el rendimiento sobre el volumen real de información.',
    },
    {
      paso: '04',
      nombre: 'Despliegue y adopción',
      detalle:
        'Publicamos los tableros para toda la organización, accesibles desde computadora, tablet o celular, capacitamos al personal que los va a usar e incorporamos las últimas mejoras.',
    },
  ],

  beneficios: [
    'La inversión es menor que la de otras tecnologías de Business Intelligence.',
    'El descubrimiento de datos es rápido, fácil de usar y está disponible en cualquier dispositivo.',
    'Los usuarios acceden a la información actualizada con tableros interactivos.',
    'Integración con el software que ya usa la organización: CRM, ERP, SQL, SAP HANA, Azure y más.',
    'Ciclo de desarrollo corto: se ven resultados desde las primeras semanas.',
    'Un mismo entorno para Power BI, Azure, Python y SQL, sin herramientas sueltas.',
  ],

  preguntas: [
    {
      pregunta: '¿Cuánto demora implementar una solución de análisis de datos?',
      respuesta:
        'Depende del número de fuentes y de la calidad de los datos, pero el proyecto se organiza en cuatro fases con entregables revisables, de modo que el primer tablero funcionando llega mucho antes del cierre del proyecto.',
    },
    {
      pregunta: '¿Necesito comprar licencias de Power BI?',
      respuesta:
        'Para publicar y compartir tableros dentro de la organización se necesita Power BI Pro por usuario que consuma los reportes; el desarrollo se hace en Power BI Desktop, que es gratuito. En el diagnóstico calculamos cuántas licencias hacen falta según quién va a mirar qué.',
    },
    {
      pregunta: '¿Trabajan con nuestro ERP o con archivos de Excel?',
      respuesta:
        'Con ambos. Conectamos ERP, bases de datos SQL, archivos de Excel y CSV, plataformas de anuncios y APIs. Parte del trabajo es justamente consolidar esas fuentes en un modelo único.',
    },
    {
      pregunta: '¿Qué pasa después de la entrega?',
      respuesta:
        'Queda el monitoreo de las cargas, la capacitación del equipo y un acuerdo de soporte para mejoras y nuevas métricas. Un tablero que nadie mantiene deja de usarse en unos meses.',
    },
    {
      pregunta: '¿Pueden capacitar a nuestro equipo en lugar de desarrollar todo?',
      respuesta:
        'Sí. Está el servicio de self-service BI —dejamos el modelo y las reglas, y el equipo crea sus vistas— y los cursos en vivo de Power BI, SQL Server y Python, que también se dictan de forma cerrada para una sola empresa.',
    },
  ],

  cierre: {
    titulo: 'Solicite una reunión o una cotización',
    texto:
      'Cuéntanos qué decisiones estás tomando a ciegas hoy. La primera conversación de diagnóstico no tiene costo y de ella sale una propuesta con alcance, plazo y presupuesto.',
  },
} as const;
