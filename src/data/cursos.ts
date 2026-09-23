/**
 * Catálogo de cursos. Es la misma información de la maqueta de WordPress
 * (líneas, temarios, objetivos y públicos), tipada y con `slug` para que cada
 * curso tenga su propia página en lugar de vivir dentro de un modal.
 */

export type CategoriaId = 'seguridad' | 'marketing' | 'datos';

export type Categoria = {
  id: CategoriaId;
  nombre: string;
  corto: string;
  descripcion: string;
  /** path de un icono de 24×24 */
  icono: string;
};

/**
 * Paletas disponibles para la página de un curso. El sitio es azul; cada línea
 * puede tomar otro acento de la marca sin salirse del logotipo, que lleva
 * índigo (#211C51), naranja (#FF8D00) y dorado (#FFC700). Se definen en
 * `src/styles/global.css` bajo `[data-paleta='…']`.
 */
/** Logotipos de tecnología disponibles (ver `components/cursos/LogoTec.astro`). */
export type LogoId = 'python' | 'powerbi' | 'sqlserver';

export type PaletaId =
  | 'azul'
  | 'naranja'
  | 'violeta'
  | 'indigo'
  | 'python'
  | 'powerbi'
  | 'sqlserver'
  | 'calida';

/** Un tema del temario; si trae `puntos`, se despliega en un segundo nivel. */
export type Tema = { titulo: string; puntos?: string[] };

export type Modulo = {
  titulo: string;
  /** temario simple: una lista de puntos */
  items?: string[];
  /** temario detallado: temas con sus propios puntos */
  temas?: Tema[];
};

/**
 * Imagen propia de un curso. El `alt` y el `pie` no son decorativos: son lo
 * que lee un buscador y lo que escucha quien navega con lector de pantalla, y
 * los tres campos alimentan el esquema `ImageObject` de la página.
 */
export type ImagenCurso = {
  src: string;
  /** descripción de lo que se ve, en una frase */
  alt: string;
  titulo: string;
  texto: string;
  /** lo concreto de esa sección: se lista junto al texto */
  puntos?: string[];
  pie: string;
  ancho: number;
  alto: number;
  /** sección tras la que se coloca */
  zona: 'presentacion' | 'objetivos' | 'plan';
};

/**
 * Demostración en terminal: el archivo que se escribe en clase y lo que
 * imprime al ejecutarlo. El resaltado se calcula al construir, así que aquí
 * el código va tal cual se teclea.
 */
export type TerminalCurso = {
  titulo: string;
  texto: string;
  /** nombre del archivo, como aparece en la pestaña del editor */
  archivo: string;
  codigo: string[];
  /** lo que se teclea en la terminal */
  comando: string;
  salida: string[];
  pie: string;
};

/** Pregunta y respuesta del curso: alimenta el acordeón y el esquema FAQPage. */
export type Pregunta = { pregunta: string; respuesta: string };

export type Curso = {
  slug: string;
  categoria: CategoriaId;
  titulo: string;
  subtitulo: string;
  /** título corto para la pestaña y el buscador, si el nombre es muy largo */
  tituloSeo?: string;
  resumen: string;
  destacado?: string;
  proximo?: boolean;
  horas: string;
  sesiones: string;
  dias: string;
  horario: string;
  precio?: { contado: string; cuotas: string };
  /** acento propio de la página del curso; por defecto, el azul del sitio */
  paleta?: PaletaId;
  /** logotipo de la tecnología del curso, con sus colores de marca */
  logo?: LogoId;
  /** rutas a fotos propias; si faltan, la cubierta se dibuja por código */
  imagen?: string;
  imagenEjecucion?: string;
  /** imágenes propias que ilustran la página, con su metadato completo */
  imagenes?: ImagenCurso[];
  /** demostración de código y su ejecución */
  terminal?: TerminalCurso;
  /** Respuesta directa de 40-60 palabras: es lo que citan los buscadores
      generativos y los asistentes cuando se les pregunta por el curso. */
  respuestaRapida?: string;
  presentacion: string;
  objetivos: string[];
  beneficios: string[];
  publico: string;
  temario: Modulo[];
  /** preguntas propias del curso; si falta, se usan las genéricas */
  faq?: Pregunta[];
};

export const categorias: Categoria[] = [
  {
    id: 'seguridad',
    nombre: 'Seguridad y Gestión Ambiental',
    corto: 'Seguridad y Ambiente',
    descripcion: 'SST, gestión ambiental y normativa aplicada a operaciones de alto riesgo.',
    icono: 'M12 2 4 5.5v6c0 5 3.4 9.5 8 10.5 4.6-1 8-5.5 8-10.5v-6L12 2zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
  },
  {
    id: 'marketing',
    nombre: 'Marketing, Publicidad y Comunicaciones',
    corto: 'Marketing',
    descripcion: 'Estrategia digital, contenidos, campañas y medición con IA.',
    icono: 'M18 3v18l-8-4H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h3l8-4zm2 6h2v6h-2V9z',
  },
  {
    id: 'datos',
    nombre: 'Gestión y Análisis de Datos',
    corto: 'Datos',
    descripcion: 'Business Intelligence, analítica avanzada y decisiones con datos.',
    icono: 'M4 20h3v-8H4v8zm6.5 0h3V4h-3v16zM17 20h3v-12h-3v12z',
  },
];

export const cursos: Curso[] = [
  {
    slug: 'supervisor-ssoma',
    categoria: 'seguridad',
    destacado: 'Certificable',
    titulo: 'Supervisor SSOMA',
    subtitulo: 'Aplicado al sector Construcción, Industrial y Minero',
    resumen:
      'Formación integral en Seguridad y Salud en el Trabajo y Gestión Ambiental para quienes supervisan o coordinan equipos y actividades de alto riesgo.',
    horas: '40 horas académicas',
    sesiones: '10 sesiones de 3 h cronológicas',
    dias: 'Lunes, miércoles y viernes',
    horario: '7:30 – 10:30 p. m.',
    respuestaRapida:
      'El curso Supervisor SSOMA de Excelsius es un programa en vivo de 40 horas académicas, repartidas en 10 sesiones de 3 horas cronológicas (lunes, miércoles y viernes de 7:30 a 10:30 p. m.), que forma en Seguridad y Salud en el Trabajo y Gestión Ambiental aplicadas a construcción, minería e industria, con certificación por horas académicas.',
    presentacion:
      'El curso Supervisor SSOMA Aplicado en el Sector de Construcción, Industrial y Minero brinda una formación integral en Seguridad y Salud en el Trabajo (SST) y Gestión Ambiental, orientada a profesionales que desarrollan, supervisan o coordinan actividades y equipos de trabajo. Proporciona criterios y herramientas para identificar peligros, evaluar riesgos, aplicar controles preventivos, gestionar actividades de alto riesgo, responder ante situaciones de emergencia y fortalecer una cultura de seguridad y prevención. Su enfoque aplicado permite comprender las principales exigencias de SSOMA y su implementación en los sectores de construcción, minería e industria, fortaleciendo el desempeño profesional en entornos donde la gestión de riesgos es fundamental.',
    objetivos: [
      'Comprender los principales fundamentos legales y técnicos de SST y Gestión Ambiental.',
      'Identificar peligros, evaluar riesgos y aplicar controles preventivos en las actividades de trabajo.',
      'Gestionar y supervisar actividades de alto riesgo bajo criterios de prevención.',
      'Desarrollar criterios para liderar equipos, comunicar riesgos y actuar frente a condiciones o comportamientos inseguros.',
      'Aplicar los fundamentos de SSOMA en los sectores de construcción, minería e industria.',
    ],
    beneficios: [
      'Fortalece el perfil profesional para desenvolverse en entornos de alto riesgo.',
      'Permite tomar mejores decisiones frente a peligros, riesgos y condiciones inseguras.',
      'Proporciona herramientas para una supervisión efectiva y orientada a la prevención.',
      'Integra conocimientos de Seguridad, Salud en el Trabajo y Gestión Ambiental.',
      'Refuerza las competencias profesionales para trabajar en construcción, minería e industria.',
    ],
    publico:
      'Dirigido a profesionales, técnicos, supervisores y trabajadores vinculados a actividades operativas y de gestión, especialmente de los sectores de minería, construcción e industria, así como a profesionales de Ingeniería de Minas, Ingeniería Civil, Ingeniería Industrial, Ingeniería Ambiental, Ingeniería Mecánica y carreras afines que requieran fortalecer sus conocimientos en Seguridad y Salud en el Trabajo y Gestión Ambiental para desempeñarse o asumir responsabilidades en equipos y actividades donde la gestión de riesgos es fundamental.',
    temario: [
      {
        titulo: 'Marco normativo de SST',
        temas: [
          {
            titulo: 'Marco general de SST',
            puntos: [
              'Ley N.° 29783',
              'Reglamento: D.S. N.° 005-2012-TR',
              'Principios de prevención',
              'Obligaciones y responsabilidades',
            ],
          },
          {
            titulo: 'SST en minería',
            puntos: [
              'D.S. N.° 024-2016-EM y modificatorias',
              'Obligaciones sectoriales',
              'Gestión preventiva en minería',
              'Responsabilidades del supervisor',
            ],
          },
          {
            titulo: 'SST en construcción',
            puntos: [
              'D.S. N.° 011-2019-TR',
              'Obligaciones sectoriales',
              'Gestión preventiva en obra',
              'Responsabilidades del supervisor',
            ],
          },
        ],
      },
      {
        titulo: 'Identificación de peligros, evaluación de riesgos y controles',
        temas: [
          {
            titulo: 'Fundamentos de riesgo',
            puntos: ['Peligro y riesgo', 'Consecuencia y exposición'],
          },
          { titulo: 'Identificación de peligros', puntos: ['Tipos de peligros'] },
          {
            titulo: 'IPERC',
            puntos: [
              'IPERC línea base',
              'IPERC continuo',
              'IPERC específico',
              'Evaluación y valoración del riesgo',
            ],
          },
          {
            titulo: 'Gestión de controles',
            puntos: [
              'Jerarquía de controles',
              'Eliminación y sustitución',
              'Controles de ingeniería',
              'Controles administrativos',
              'EPP como último nivel de control',
              'Seguimiento de controles',
            ],
          },
        ],
      },
      {
        titulo: 'Sistema de gestión y planificación de SST',
        temas: [
          {
            titulo: 'Sistema de Gestión de SST',
            puntos: [
              'Política de SST',
              'Ciclo PHVA',
              'Liderazgo y participación',
              'Responsabilidades',
              'Organización del SGSST',
            ],
          },
          {
            titulo: 'Plan Anual de SST',
            puntos: [
              'Objetivos y metas',
              'Plan y Programa Anual de SST',
              'Actividades preventivas',
              'Responsables',
              'Recursos y cronograma',
            ],
          },
          {
            titulo: 'ISO 45001',
            puntos: [
              'Estructura y principios',
              'Liderazgo y participación',
              'Planificación basada en riesgos',
              'Evaluación del desempeño',
              'Mejora continua',
            ],
          },
        ],
      },
      {
        titulo: 'Higiene y salud ocupacional',
        temas: [
          {
            titulo: 'Fundamentos de Higiene Ocupacional',
            puntos: [
              'Anticipación, reconocimiento, evaluación y control',
              'Agentes físicos',
              'Agentes químicos',
              'Agentes biológicos',
              'Vías de exposición',
            ],
          },
          {
            titulo: 'Evaluación de la exposición',
            puntos: [
              'Identificación de fuentes',
              'Evaluación cualitativa y cuantitativa',
              'Monitoreo ocupacional',
              'Límites de exposición',
              'Medidas de control',
            ],
          },
          {
            titulo: 'Salud ocupacional y ergonomía',
            puntos: [
              'Enfermedades ocupacionales',
              'Riesgos disergonómicos',
              'Ergonomía básica',
              'Vigilancia de la salud',
              'Exámenes médicos ocupacionales',
            ],
          },
        ],
      },
      {
        titulo: 'Gestión de actividades de alto riesgo',
        temas: [
          {
            titulo: 'Gestión de trabajos de alto riesgo',
            puntos: [
              'Identificación de actividades críticas',
              'ATS',
              'Permisos de trabajo',
              'Autorizaciones',
              'Controles previos',
            ],
          },
          {
            titulo: 'Principales actividades de alto riesgo',
            puntos: [
              'Trabajo en altura',
              'Espacios confinados',
              'Trabajos en caliente',
              'Trabajos eléctricos',
              'Excavaciones',
              'Izaje y cargas suspendidas',
            ],
          },
          {
            titulo: 'Sustancias y materiales peligrosos',
            puntos: [
              'Identificación de peligros químicos',
              'Manipulación y almacenamiento',
              'Exposición a sustancias',
              'Controles preventivos',
              'Aplicación en procesos industriales',
            ],
          },
        ],
      },
      {
        titulo: 'Equipamiento, EPP y controles operacionales',
        temas: [
          {
            titulo: 'Controles y equipamiento de seguridad',
            puntos: [
              'Controles de ingeniería',
              'Equipos y dispositivos de seguridad',
              'Sistemas de protección',
              'Señalización',
              'Dispositivos de advertencia',
            ],
          },
          {
            titulo: 'Gestión de EPP',
            puntos: [
              'Selección según riesgo',
              'Protección de cabeza',
              'Protección ocular y facial',
              'Protección auditiva',
              'Protección respiratoria',
              'Protección de manos y pies',
              'Protección contra caídas',
            ],
          },
          {
            titulo: 'Gestión y supervisión del EPP',
            puntos: [
              'Inspección',
              'Uso correcto',
              'Limitaciones',
              'Mantenimiento',
              'Reposición',
              'Almacenamiento',
              'Capacitación',
            ],
          },
        ],
      },
      {
        titulo: 'Rol del supervisor SSOMA, comunicación y SBC',
        temas: [
          {
            titulo: 'Rol y liderazgo del Supervisor SSOMA',
            puntos: [
              'Funciones',
              'Responsabilidades',
              'Liderazgo preventivo',
              'Supervisión en campo',
              'Gestión de desviaciones',
              'Toma de decisiones',
            ],
          },
          {
            titulo: 'Comunicación efectiva en SST',
            puntos: [
              'Comunicación preventiva',
              'Escucha activa',
              'Comunicación de riesgos',
              'Retroalimentación',
              'Charlas de seguridad',
              'Manejo de situaciones difíciles',
            ],
          },
          {
            titulo: 'Seguridad Basada en el Comportamiento',
            puntos: [
              'Fundamentos de SBC',
              'Conductas seguras e inseguras',
              'Observación de comportamientos',
              'Retroalimentación',
              'Refuerzo positivo',
              'Intervención preventiva',
            ],
          },
        ],
      },
      {
        titulo: 'Investigación, auditoría y fiscalización de SST',
        temas: [
          {
            titulo: 'Investigación de accidentes e incidentes',
            puntos: [
              'Accidente e incidente',
              'Causas inmediatas y básicas',
              'Recolección de evidencias',
              'Análisis de causas',
              'Acciones correctivas',
            ],
          },
          {
            titulo: 'Auditoría interna del SGSST',
            puntos: [
              'Objetivos y criterios',
              'Planificación',
              'Evidencias',
              'Hallazgos y no conformidades',
              'Acciones correctivas',
              'Seguimiento',
            ],
          },
          {
            titulo: 'Fiscalización y SUNAFIL',
            puntos: [
              'Sistema de inspección laboral',
              'Facultades del inspector',
              'Etapas de fiscalización',
              'Evidencias y documentación',
              'Infracciones y medidas inspectivas',
              'Actuación del supervisor',
            ],
          },
        ],
      },
      {
        titulo: 'Gestión ambiental: marco nacional e ISO 14001',
        temas: [
          {
            titulo: 'Marco legal ambiental nacional',
            puntos: [
              'Ley General del Ambiente',
              'Sistema Nacional de Gestión Ambiental',
              'SEIA',
              'ECA',
              'LMP',
              'Requisitos ambientales aplicables',
            ],
          },
          {
            titulo: 'Gestión ambiental operacional',
            puntos: [
              'Aspectos e impactos ambientales',
              'Prevención de la contaminación',
              'Gestión de residuos',
              'Sustancias y materiales',
              'Agua y efluentes',
              'Emisiones y ruido',
            ],
          },
          {
            titulo: 'Referencia internacional: ISO 14001',
            puntos: [
              'Sistema de Gestión Ambiental',
              'Contexto y liderazgo',
              'Aspectos ambientales',
              'Obligaciones de cumplimiento',
              'Control operacional',
              'Evaluación del desempeño',
              'Mejora continua',
            ],
          },
        ],
      },
      {
        titulo: 'Gestión ambiental aplicada por sector',
        temas: [
          {
            titulo: 'Gestión ambiental en construcción',
            puntos: [
              'Aspectos e impactos ambientales de las obras',
              'Gestión de desmonte y residuos de construcción y demolición',
              'Control de ruido, polvo, emisiones y vibraciones',
              'Manejo de materiales y sustancias potencialmente contaminantes',
              'Normativa ambiental y disposiciones municipales aplicables',
            ],
          },
          {
            titulo: 'Gestión ambiental en minería',
            puntos: [
              'Aspectos e impactos ambientales de las operaciones mineras',
              'Gestión de explosivos y materiales peligrosos',
              'Manejo de relaves, desmontes y residuos mineros',
              'Gestión de reactivos, ácidos y sustancias químicas',
              'Control de agua, efluentes y calidad ambiental',
            ],
          },
          {
            titulo: 'Gestión ambiental en industria',
            puntos: [
              'Aspectos e impactos ambientales de los procesos industriales',
              'Gestión de sustancias y residuos químicos',
              'Gestión de riesgos y agentes biológicos',
              'Control de emisiones, efluentes, ruido y contaminación del suelo',
              'Prevención de la contaminación y controles ambientales del proceso',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        pregunta: '¿Cuánto dura el curso Supervisor SSOMA?',
        respuesta:
          'Son 10 sesiones de 3 horas cronológicas, equivalentes a 40 horas académicas para la certificación. Las clases son lunes, miércoles y viernes de 7:30 a 10:30 p. m., en vivo y con acceso a las grabaciones.',
      },
      {
        pregunta: '¿Qué normativa peruana se trabaja en el curso?',
        respuesta:
          'La Ley N.° 29783 y su reglamento D.S. N.° 005-2012-TR como marco general, el D.S. N.° 024-2016-EM para minería y el D.S. N.° 011-2019-TR para construcción, además de ISO 45001, la Ley General del Ambiente e ISO 14001 en la parte ambiental.',
      },
      {
        pregunta: '¿Necesito experiencia previa en seguridad para llevarlo?',
        respuesta:
          'No es obligatoria. El curso parte de los fundamentos legales y técnicos, y está dirigido a profesionales, técnicos, supervisores y trabajadores de minería, construcción e industria, así como a ingenieros de Minas, Civil, Industrial, Ambiental, Mecánica y carreras afines.',
      },
      {
        pregunta: '¿El curso entrega certificado?',
        respuesta:
          'Sí. Al aprobar se emite un certificado por 40 horas académicas a nombre de Excelsius, con el detalle del participante, el curso, la duración y la fecha de emisión.',
      },
      {
        pregunta: '¿Las clases son virtuales o presenciales?',
        respuesta:
          'Se dictan en vivo de forma virtual, con interacción en tiempo real y acceso a las grabaciones. Para empresas también se coordinan capacitaciones presenciales in house en Lima y en todo el Perú.',
      },
    ],
  },
  {
    slug: 'plan-de-marketing-2027-con-ia',
    categoria: 'marketing',
    destacado: 'Nuevo',
    paleta: 'naranja',
    titulo: 'Plan de Marketing 2027 con IA',
    subtitulo: 'Del diagnóstico al plan anual medible',
    resumen:
      'Construye un plan de marketing anual completo: diagnóstico, estrategia, contenidos, ecosistemas digitales, campañas, KPIs y optimización, con IA de forma transversal.',
    horas: '16 clases',
    sesiones: '8 módulos · 16 clases',
    dias: 'Consultar',
    horario: '7:30 – 10:30 p. m.',
    respuestaRapida:
      'Plan de Marketing 2027 con IA es un curso en vivo de Excelsius de 8 módulos y 16 clases, de 7:30 a 10:30 p. m., en el que cada participante construye su plan de marketing anual: diagnóstico, público objetivo, estrategia, contenidos con IA, ecosistemas Meta, Google y TikTok, SEO y GEO, campañas, KPIs y optimización.',
    presentacion:
      'El curso Plan de Marketing 2027 con IA está diseñado para desarrollar una visión integral de la planificación y gestión del marketing anual, desde el diagnóstico del mercado y la definición de objetivos hasta la ejecución, medición y optimización de las acciones. Los participantes trabajarán la estrategia de contenidos, la gestión de los principales ecosistemas digitales, la publicidad, el posicionamiento SEO y GEO, y la definición de indicadores que permitan evaluar el desempeño del plan. La Inteligencia Artificial se incorpora de manera transversal como herramienta para investigar, analizar información, generar contenidos y apoyar la toma de decisiones. Mediante ejercicios prácticos, los participantes aprenderán a producir contenidos gráficos y audiovisuales adaptados a cada plataforma, interpretar datos de marketing, detectar problemas de rendimiento y plantear acciones correctivas. El curso culmina con la elaboración de un Plan de Marketing 2027 que articula estrategia, contenidos, canales, campañas, presupuesto, KPIs y mecanismos de optimización.',
    objetivos: [
      'Desarrollar un Plan de Marketing anual a partir del análisis del mercado, público objetivo, objetivos y oportunidades de negocio.',
      'Aplicar Inteligencia Artificial en la investigación, planificación, creación de contenidos y análisis de información de marketing.',
      'Diseñar contenidos gráficos y audiovisuales adaptados a los formatos, plataformas y objetivos de comunicación.',
      'Gestionar estrategias en los ecosistemas Meta, Google y TikTok, incorporando redes sociales, publicidad, SEO, GEO y marketing de influencia.',
      'Analizar resultados, identificar problemas de rendimiento y formular acciones de optimización para mejorar la efectividad del plan.',
    ],
    beneficios: [
      'Estructurar un Plan de Marketing 2027 con objetivos, estrategias, acciones, calendario, presupuesto y KPIs.',
      'Utilizar IA para acelerar la investigación, planificación y producción de contenidos.',
      'Crear contenido gráfico y audiovisual adaptado correctamente a distintos formatos y plataformas.',
      'Interpretar datos para identificar problemas de campañas, generación de leads, conversión y rendimiento de canales.',
      'Tomar decisiones de marketing basadas en datos y utilizar IA como apoyo para el diagnóstico y la optimización.',
    ],
    publico:
      'Profesionales, emprendedores, empresarios y responsables de marketing, comunicación, publicidad y gestión digital que necesiten planificar y gestionar sus actividades de marketing de manera estructurada, incorporando Inteligencia Artificial para la creación de contenidos y el análisis de datos.',
    temario: [
      {
        titulo: 'Diagnóstico y análisis para el plan de marketing',
        temas: [
          {
            titulo: 'Clase 1 · Diagnóstico del entorno y situación actual de marketing',
            puntos: [
              'Análisis del mercado, tendencias y comportamiento del consumidor',
              'Análisis de competencia y referentes digitales',
              'Diagnóstico de presencia, canales y activos digitales',
              'Identificación de fortalezas, problemas, brechas y oportunidades',
              'IA aplicada a investigación, recopilación y síntesis de información',
            ],
          },
          {
            titulo: 'Clase 2 · Público objetivo, Customer Journey y oportunidades de mercado',
            puntos: [
              'Segmentación y definición del público objetivo',
              'Buyer Persona y comportamiento del consumidor digital',
              'Necesidades, motivaciones, objeciones e intención de compra',
              'Customer Journey y puntos de contacto',
              'Identificación de oportunidades de comunicación, captación y conversión con IA',
            ],
          },
        ],
      },
      {
        titulo: 'Estrategia y arquitectura del Plan de Marketing 2027',
        temas: [
          {
            titulo: 'Clase 3 · Objetivos, propuesta de valor y posicionamiento',
            puntos: [
              'Objetivos comerciales y objetivos de marketing',
              'Indicadores asociados a los objetivos',
              'Propuesta de valor y diferenciación',
              'Posicionamiento y mensajes estratégicos',
              'IA para el desarrollo, evaluación y refinamiento de estrategias',
            ],
          },
          {
            titulo: 'Clase 4 · Estrategia de canales y planificación anual',
            puntos: [
              'Medios propios, pagados y ganados',
              'Selección de canales según objetivos y público',
              'Estrategia por etapas del Customer Journey',
              'Campañas, acciones y calendario anual',
              'IA para planificación, generación de escenarios y organización del plan',
            ],
          },
        ],
      },
      {
        titulo: 'Estrategia y creación de contenidos con IA',
        temas: [
          {
            titulo: 'Clase 5 · Arquitectura de contenidos y plan editorial con IA',
            puntos: [
              'Objetivos de contenido según la estrategia de marketing',
              'Pilares, categorías y líneas editoriales',
              'Contenidos según público, intención y Customer Journey',
              'Ideas, conceptos, mensajes y calendario editorial',
              'IA para investigación, ideación, planificación y desarrollo de contenidos',
            ],
          },
          {
            titulo: 'Clase 6 · Ética, identidad de marca y uso responsable de IA',
            puntos: [
              'Principios éticos para la creación de contenidos con IA',
              'Protección de la identidad e imagen corporativa',
              'Derechos de autor, propiedad intelectual y uso de referencias',
              'Representación, respeto a personas, comunidades y diversidad',
              'Revisión humana, validación, transparencia y criterios de publicación',
            ],
          },
        ],
      },
      {
        titulo: 'Producción de contenido gráfico y audiovisual con IA',
        temas: [
          {
            titulo: 'Clase 7 · Creación y adaptación multiformato de contenido gráfico con IA',
            puntos: [
              'Generación y edición de imágenes y recursos gráficos con IA',
              'Diseño de posts, carruseles, flyers, banners y anuncios',
              'Formatos verticales, cuadrados y horizontales según plataforma y ubicación',
              'Composición, jerarquía visual, legibilidad, proporciones y zonas seguras',
              'Adaptación, revisión y versionado de piezas para diferentes canales',
            ],
          },
          {
            titulo: 'Clase 8 · Producción de video y contenido audiovisual con IA',
            puntos: [
              'Guion, storyboard y planificación de contenidos audiovisuales',
              'Generación y transformación de imágenes y videos con IA',
              'Video vertical 9:16 para Reels, Stories, TikTok y Shorts',
              'Texto, subtítulos, voz, música, efectos y composición audiovisual',
              'Adaptación, edición y reutilización de contenidos según plataforma',
            ],
          },
        ],
      },
      {
        titulo: 'Gestión de ecosistemas digitales y marketing de influencia',
        temas: [
          {
            titulo: 'Clase 9 · Ecosistema Meta: Facebook, Instagram y WhatsApp',
            puntos: [
              'Estructura y funciones del ecosistema Meta',
              'Facebook, Instagram y WhatsApp dentro del Customer Journey',
              'Formatos, contenidos y dinámicas de interacción por plataforma',
              'Gestión de comunidad, comunicación y oportunidades de conversión',
              'Integración de contenido orgánico, leads, WhatsApp y campañas publicitarias',
            ],
          },
          {
            titulo: 'Clase 10 · Ecosistemas Google y TikTok: contenido, audiencias e influencia',
            puntos: [
              'Ecosistema Google: Search, YouTube y puntos de contacto digitales',
              'Ecosistema TikTok: descubrimiento, contenido y comunidad',
              'Diferencias de comportamiento, formatos y oportunidades por ecosistema',
              'Marketing de influencia, creadores de contenido y colaboraciones de marca',
              'Selección, briefing, contenidos, métricas y evaluación de colaboraciones',
            ],
          },
        ],
      },
      {
        titulo: 'SEO, GEO y activación de la visibilidad digital',
        temas: [
          {
            titulo: 'Clase 11 · SEO y GEO para la visibilidad del plan de marketing',
            puntos: [
              'SEO, intención de búsqueda y comportamiento del usuario',
              'Keywords, temas y oportunidades de contenido',
              'Optimización de contenidos y activos digitales',
              'GEO, AEO y visibilidad en experiencias de búsqueda generativa',
              'Integración de SEO y GEO en la estrategia de contenidos y medición de visibilidad',
            ],
          },
          {
            titulo: 'Clase 12 · Publicidad digital y activación de campañas',
            puntos: [
              'SEM y Google Ads',
              'Meta Ads y publicidad dentro del ecosistema Meta',
              'Objetivos, audiencias, creatividades y conversiones',
              'Integración de contenidos, campañas, landing pages y generación de leads',
              'IA para creación, análisis, experimentación y optimización de campañas',
            ],
          },
        ],
      },
      {
        titulo: 'Marketing analytics y diagnóstico del rendimiento',
        temas: [
          {
            titulo: 'Clase 13 · Medición, KPIs y fuentes de datos de marketing',
            puntos: [
              'Modelo de medición según objetivos del Plan de Marketing',
              'KPIs de alcance, interacción, adquisición, leads y ventas',
              'Fuentes de datos: redes sociales, publicidad, web y canales de conversión',
              'Seguimiento de campañas, conversiones, fuentes y atribución',
              'Dashboards y sistemas de control del rendimiento',
            ],
          },
          {
            titulo: 'Clase 14 · Análisis de resultados y diagnóstico de problemas con IA',
            puntos: [
              'Análisis de rendimiento por canal, contenido y campaña',
              'Diagnóstico de ausencia de ventas, leads o conversiones',
              'Análisis de calidad de leads y problemas en el proceso de conversión',
              'Identificación de patrones, anomalías, causas posibles e insights con IA',
              'Formulación de acciones correctivas y escenarios de mejora',
            ],
          },
        ],
      },
      {
        titulo: 'Optimización y gestión del Plan de Marketing 2027',
        temas: [
          {
            titulo: 'Clase 15 · Optimización, experimentación y toma de decisiones',
            puntos: [
              'Evaluación del cumplimiento de objetivos',
              'Optimización de contenidos, audiencias, canales y campañas',
              'A/B Testing y experimentación',
              'CRO y optimización del Customer Journey',
              'IA para generación de escenarios, recomendaciones y optimización de recursos',
            ],
          },
          {
            titulo: 'Clase 16 · Integración y presentación del Plan de Marketing 2027',
            puntos: [
              'Integración del diagnóstico y análisis de oportunidades',
              'Objetivos, público, posicionamiento y estrategia',
              'Plan anual de contenidos, ecosistemas, SEO, GEO y campañas',
              'Presupuesto, KPIs, calendario y mecanismos de seguimiento y control',
              'Presentación y sustentación del Plan de Marketing 2027 con apoyo de IA',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        pregunta: '¿Qué me llevo al terminar el curso Plan de Marketing 2027 con IA?',
        respuesta:
          'Un Plan de Marketing 2027 propio y sustentado: diagnóstico, público objetivo, objetivos e indicadores, posicionamiento, plan anual de contenidos, ecosistemas digitales, SEO y GEO, campañas, presupuesto, KPIs y mecanismos de optimización. La clase 16 se dedica a integrarlo y presentarlo.',
      },
      {
        pregunta: '¿Cuántas clases son y cómo se organizan?',
        respuesta:
          'Son 16 clases repartidas en 8 módulos, en vivo y de 7:30 a 10:30 p. m., con acceso a las grabaciones. Cada módulo avanza una parte del plan, de modo que el trabajo final se construye durante el curso y no al cierre.',
      },
      {
        pregunta: '¿Necesito saber usar herramientas de IA antes de empezar?',
        respuesta:
          'No. La IA se trabaja de forma transversal y aplicada: investigación y síntesis de información, ideación y calendario editorial, generación de imágenes y video, y análisis de resultados. También se ven los límites: derechos de autor, identidad de marca, revisión humana y criterios de publicación.',
      },
      {
        pregunta: '¿Qué plataformas y canales se cubren?',
        respuesta:
          'El ecosistema Meta (Facebook, Instagram y WhatsApp), el ecosistema Google (Search y YouTube) y TikTok, además de marketing de influencia, SEO, GEO y AEO para búsqueda generativa, Google Ads y Meta Ads.',
      },
      {
        pregunta: '¿Sirve si soy emprendedor y no tengo un área de marketing?',
        respuesta:
          'Sí. Está dirigido a profesionales, emprendedores, empresarios y responsables de marketing, comunicación, publicidad y gestión digital que necesiten planificar de forma estructurada, trabajen solos o con equipo.',
      },
    ],
  },
  {
    slug: 'marketing-digital-estrategia-de-redes-y-optimizacion-con-ia',
    categoria: 'marketing',
    paleta: 'violeta',
    imagen: '/img/marketingdigital/marketingdigital.webp',
    imagenEjecucion: '/img/marketingdigital/marketingdequetrata.webp',
    titulo: 'Marketing Digital, Estrategia de Redes y Optimización con IA',
    tituloSeo: 'Marketing Digital y Redes con IA',
    subtitulo: 'Estrategia, redes, publicidad y analítica en un solo programa',
    resumen:
      'Gestiona marcas y negocios en el entorno digital: estrategia, redes sociales, contenidos, SEO, SEM, publicidad, Influencer Marketing, analítica e Inteligencia Artificial.',
    horas: '12 clases',
    sesiones: '6 módulos · 12 clases',
    dias: 'Consultar',
    horario: '7:30 – 10:30 p. m.',
    respuestaRapida:
      'Marketing Digital, Estrategia de Redes y Optimización con IA es un curso en vivo de Excelsius de 6 módulos y 12 clases, de 7:30 a 10:30 p. m., que cubre estrategia digital, ecosistemas Meta, Google y TikTok, contenidos con IA, SEO, SEM, Google Ads, Influencer Marketing y analítica con KPIs para optimizar campañas.',
    presentacion:
      'Marketing Digital, Estrategia de Redes y Optimización con IA desarrolla competencias para gestionar marcas, negocios y proyectos en el entorno digital. Integra estrategia, redes sociales, contenidos, SEO, publicidad digital, Influencer Marketing, analítica e Inteligencia Artificial. El participante aprenderá a analizar, planificar, crear, ejecutar y optimizar acciones de marketing digital, tomando decisiones según objetivos, audiencias, plataformas y resultados.',
    objetivos: [
      'Diseñar estrategias digitales orientadas a objetivos de marketing y resultados comerciales.',
      'Seleccionar canales, plataformas y formatos según público, producto, servicio y objetivo.',
      'Crear contenidos y propuestas creativas utilizando herramientas digitales e Inteligencia Artificial.',
      'Integrar estrategias orgánicas, publicidad digital, SEO, SEM, redes sociales e Influencer Marketing.',
      'Medir resultados, diagnosticar problemas y optimizar acciones digitales mediante datos y KPIs.',
    ],
    beneficios: [
      'Aprender a tomar decisiones estratégicas de marketing digital.',
      'Crear contenidos y estrategias aplicables a negocios, marcas y proyectos reales.',
      'Incorporar Inteligencia Artificial en investigación, creatividad, planificación y análisis.',
      'Conectar redes sociales, posicionamiento, publicidad, contenidos y conversión.',
      'Evaluar resultados y decidir qué mantener, cambiar, mejorar o escalar.',
    ],
    publico:
      'Dirigido a profesionales, emprendedores y personas que buscan gestionar o participar en actividades de marketing, comunicación y gestión comercial en entornos digitales, incluyendo especialistas de distintas áreas, responsables de negocios y marcas, trabajadores independientes y personas que desean desarrollar nuevas competencias profesionales o comerciales.',
    temario: [
      {
        titulo: 'Introducción al marketing digital y ecosistemas digitales',
        temas: [
          {
            titulo: 'Clase 1 · Evolución del marketing y transformación digital',
            puntos: [
              'Evolución del marketing tradicional al marketing digital',
              'Transformación de los hábitos de información, comunicación y consumo',
              'Del consumidor tradicional al consumidor digital',
              'Canales, medios y puntos de contacto en entornos digitales',
              'Oportunidades y desafíos del marketing en el entorno digital',
            ],
          },
          {
            titulo: 'Clase 2 · Ecosistemas digitales y plataformas de marketing',
            puntos: [
              'Ecosistema digital: medios propios, pagados y ganados',
              'Ecosistema Meta: Facebook, Instagram y WhatsApp',
              'Ecosistema Google: Search, YouTube, Gmail, Chrome y servicios asociados',
              'TikTok y plataformas de contenido audiovisual',
              'Características, funcionalidades y oportunidades de los principales ecosistemas digitales',
            ],
          },
        ],
      },
      {
        titulo: 'Investigación de mercados, Customer Journey y estrategia digital',
        temas: [
          {
            titulo: 'Clase 3 · Investigación de mercados y comportamiento del consumidor digital',
            puntos: [
              'Investigación de mercados aplicada a entornos digitales',
              'Segmentación de mercados y definición del Buyer Persona',
              'Necesidades, motivaciones y comportamiento del consumidor digital',
              'Customer Journey y puntos de contacto con la marca',
              'Inteligencia Artificial aplicada a investigación, tendencias e identificación de insights',
            ],
          },
          {
            titulo: 'Clase 4 · Estrategia de marketing digital y propuesta de valor',
            puntos: [
              'Objetivos de marketing y formulación de objetivos SMART',
              'Propuesta de valor y posicionamiento digital',
              'Customer Journey y Funnel de Conversión',
              'Estrategia de contenidos y arquitectura de comunicación',
              'Planificación estratégica asistida por Inteligencia Artificial',
            ],
          },
        ],
      },
      {
        titulo: 'Social Media Marketing y ecosistema Meta',
        temas: [
          {
            titulo: 'Clase 5 · Social Media Marketing y gestión de comunidades',
            puntos: [
              'Fundamentos y objetivos del Social Media Marketing',
              'Gestión de presencia digital en Facebook e Instagram',
              'Formatos, contenidos y dinámicas de interacción',
              'Engagement y Community Management',
              'Planificación de contenidos y calendario editorial',
            ],
          },
          {
            titulo: 'Clase 6 · Meta Ads y WhatsApp Marketing',
            puntos: [
              'Ecosistema publicitario de Meta y objetivos de campaña',
              'Meta Ads: campañas, conjuntos de anuncios y anuncios',
              'Audiencias, segmentación y públicos personalizados',
              'WhatsApp Business como canal de comunicación, atención y conversión',
              'Integración Meta Ads – WhatsApp – Lead – Conversión',
            ],
          },
        ],
      },
      {
        titulo: 'Content Marketing, TikTok e Inteligencia Artificial',
        temas: [
          {
            titulo: 'Clase 7 · Content Marketing, TikTok y storytelling',
            puntos: [
              'Fundamentos y estrategia de Content Marketing',
              'TikTok Marketing, formatos y comportamiento de las audiencias',
              'Pilares de contenido, conceptos creativos y propuesta narrativa',
              'Storytelling, Hooks y Call to Action',
              'Selección de canales y formatos según audiencia, objetivo y etapa del Customer Journey',
            ],
          },
          {
            titulo: 'Clase 8 · Creación de contenidos con Inteligencia Artificial',
            puntos: [
              'Inteligencia Artificial aplicada a investigación, ideación y planificación de contenidos',
              'Prompt Engineering aplicado a marketing y generación de contenido',
              'Generación y edición de imágenes, piezas gráficas, audio y video',
              'Desarrollo de guiones, scripts y variantes creativas con IA',
              'Ética, derechos de autor, propiedad intelectual, uso de imagen, privacidad y seguridad digital',
            ],
          },
        ],
      },
      {
        titulo: 'SEO, SEM, Google Ads e Influencer Marketing',
        temas: [
          {
            titulo: 'Clase 9 · SEO y SEM: posicionamiento orgánico y marketing en buscadores',
            puntos: [
              'Fundamentos del Search Engine Optimization (SEO)',
              'Search Intent, palabras clave y comportamiento de búsqueda',
              'SEO On-Page y optimización de contenidos digitales',
              'Fundamentos del Search Engine Marketing (SEM) y publicidad en buscadores',
              'Inteligencia Artificial aplicada a investigación de keywords, contenidos y optimización de búsqueda',
            ],
          },
          {
            titulo: 'Clase 10 · Google Ads e Influencer Marketing',
            puntos: [
              'Ecosistema publicitario de Google y Google Ads',
              'Estructura, objetivos y configuración de campañas',
              'Segmentación, anuncios, landing pages y conversión',
              'Influencer Marketing y Creator Economy',
              'Selección de creadores, briefing, contenidos, métricas y gestión de campañas con influencers y creadores',
            ],
          },
        ],
      },
      {
        titulo: 'Marketing analytics, KPIs y optimización de campañas',
        temas: [
          {
            titulo: 'Clase 11 · Marketing Analytics y medición del rendimiento',
            puntos: [
              'Fundamentos de Marketing Analytics y Data-Driven Marketing',
              'KPIs según objetivos de marketing y campaña',
              'CTR, CPC, CPM, CPL, CPA, Conversion Rate y ROAS',
              'Interpretación de resultados en Meta, Google, TikTok y otros canales digitales',
              'Inteligencia Artificial aplicada al análisis de datos, identificación de patrones e insights',
            ],
          },
          {
            titulo: 'Clase 12 · Diagnóstico, CRO y optimización de campañas',
            puntos: [
              'Diagnóstico del rendimiento de campañas y activos digitales',
              'Identificación de problemas en audiencia, contenido, oferta, inversión y conversión',
              'A/B Testing y experimentación para la toma de decisiones',
              'Conversion Rate Optimization (CRO) y optimización del Customer Journey',
              'Inteligencia Artificial aplicada a escenarios, recomendaciones y optimización de campañas',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        pregunta: '¿En qué se diferencia de Plan de Marketing 2027 con IA?',
        respuesta:
          'Este curso forma en la gestión del día a día digital: redes, contenidos, publicidad, SEO, SEM, influencers y optimización de campañas. Plan de Marketing 2027 con IA se centra en construir el plan anual completo, con presupuesto, calendario y KPIs. Se complementan, y se pueden llevar en cualquier orden.',
      },
      {
        pregunta: '¿Cuántas clases son y cómo se organizan?',
        respuesta:
          'Son 12 clases repartidas en 6 módulos, en vivo de 7:30 a 10:30 p. m. y con acceso a las grabaciones. Cada módulo cierra una capacidad completa: ecosistemas, estrategia, redes y Meta Ads, contenidos con IA, buscadores e influencers, y analítica con optimización.',
      },
      {
        pregunta: '¿Qué plataformas de publicidad se trabajan?',
        respuesta:
          'Meta Ads con su integración a WhatsApp Business, Google Ads dentro del ecosistema de Google, y contenido orgánico en Facebook, Instagram y TikTok. Se revisan objetivos de campaña, audiencias, segmentación, anuncios, landing pages y conversión.',
      },
      {
        pregunta: '¿Necesito experiencia previa en marketing?',
        respuesta:
          'No. El curso parte de la evolución del marketing al entorno digital y avanza de forma aplicada. Está dirigido a profesionales, emprendedores, responsables de marcas y negocios, y trabajadores independientes que quieran desarrollar competencias digitales.',
      },
      {
        pregunta: '¿Qué métricas aprenderé a leer?',
        respuesta:
          'CTR, CPC, CPM, CPL, CPA, tasa de conversión y ROAS, interpretados en Meta, Google y TikTok, además del diagnóstico de problemas en audiencia, contenido, oferta, inversión y conversión, con A/B Testing y CRO para decidir qué cambiar.',
      },
    ],
  },
  {
    slug: 'analisis-de-datos-con-sql-server-e-ia',
    categoria: 'datos',
    paleta: 'sqlserver',
    logo: 'sqlserver',
    titulo: 'Análisis de Datos con SQL Server e IA',
    tituloSeo: 'Análisis de Datos con SQL Server',
    subtitulo: 'Nivel intermedio – avanzado',
    resumen:
      'Lleva SQL Server más allá del gestor de bases de datos: extracción, transformación, modelado y análisis, integrando Python, IA y Microsoft Fabric.',
    horas: '32 horas académicas',
    sesiones: '8 sesiones de 3 h cronológicas',
    dias: 'Martes y jueves',
    horario: '7:30 – 10:30 p. m.',
    respuestaRapida:
      'Análisis de Datos con SQL Server e IA es un curso en vivo de Excelsius de 32 horas académicas, en 8 sesiones de 3 horas cronológicas (martes y jueves de 7:30 a 10:30 p. m.), de nivel intermedio–avanzado: consultas y T-SQL, transformación, modelado y optimización, integración con Python, IA aplicada a consultas y código, y Microsoft Fabric para trabajar a escala.',
    presentacion:
      'Análisis de Datos con SQL Server e IA es un curso de nivel intermedio–avanzado orientado al uso de SQL Server como herramienta para la extracción, transformación, modelado y análisis de información, incorporando inteligencia artificial y tecnologías complementarias para ampliar sus capacidades. El curso plantea una visión que supera el uso tradicional de SQL Server como gestor de bases de datos, integrándose con Python y Microsoft Fabric para automatizar procesos, trabajar con mayores volúmenes de información y desarrollar soluciones de análisis más flexibles. Asimismo, se aborda la IA como una herramienta de apoyo para generar, comprender, validar y optimizar consultas y código, fortaleciendo la capacidad del profesional para desarrollar soluciones personalizadas y preparar información para su posterior análisis y visualización.',
    objetivos: [
      'Comprender el papel de SQL Server dentro del ecosistema de datos y aplicar SQL/T-SQL para la consulta y análisis de información.',
      'Desarrollar consultas para extraer, relacionar, limpiar y transformar datos provenientes de diferentes estructuras.',
      'Diseñar y optimizar estructuras de datos orientadas al análisis, considerando criterios de modelado, rendimiento y escalabilidad.',
      'Integrar Python e inteligencia artificial para complementar procesos de extracción, transformación, análisis y automatización de datos.',
      'Utilizar Microsoft Fabric como entorno complementario para trabajar con datos a mayor escala y preparar información para soluciones de analítica y Business Intelligence.',
    ],
    beneficios: [
      'Pasar del uso de SQL Server como simple gestor de bases de datos a su aplicación como herramienta para el análisis y gestión de datos.',
      'Desarrollar consultas y procesos capaces de extraer, transformar y preparar información para diferentes necesidades analíticas.',
      'Integrar SQL Server, Python, IA y Microsoft Fabric dentro de un mismo flujo de trabajo.',
      'Utilizar IA para apoyar la creación, comprensión, depuración y optimización de consultas y código, manteniendo el criterio y control profesional sobre los resultados.',
      'Preparar y exportar información para su integración con Power BI y otras herramientas de análisis, facilitando la construcción de soluciones completas de datos.',
    ],
    publico:
      'El curso está dirigido a profesionales, técnicos, analistas de datos, desarrolladores y usuarios que trabajan con bases de datos e información empresarial y desean fortalecer sus capacidades de análisis mediante SQL Server. También está orientado a profesionales de áreas administrativas, financieras, comerciales, operaciones, logística, ingeniería y gestión que requieren consultar, transformar y preparar grandes volúmenes de información para la toma de decisiones. Se recomienda contar con conocimientos básicos de bases de datos o SQL y tener interés en incorporar Python, inteligencia artificial y Microsoft Fabric como herramientas complementarias para desarrollar soluciones de datos más avanzadas.',
    temario: [
      {
        titulo: 'Sesión 1 · Fundamentos de datos y SQL Server para analítica',
        items: [
          'Ecosistema de datos y rol de SQL Server en el análisis de información',
          'Bases de datos relacionales: tablas, registros, campos y relaciones',
          'Tipos de datos y estructuras de información',
          'Introducción a SQL y T-SQL para el análisis de datos',
          'IA como herramienta de apoyo para comprender, generar y validar consultas SQL',
        ],
      },
      {
        titulo: 'Sesión 2 · Consultas SQL para extracción y análisis de datos',
        items: [
          'Consultas SELECT y filtrado de información',
          'Operadores, funciones y expresiones SQL',
          'Ordenamiento, agrupación y agregación de datos',
          'Consultas con múltiples tablas y JOIN',
          'Subconsultas, CTE y consultas orientadas a problemas de análisis',
        ],
      },
      {
        titulo: 'Sesión 3 · Transformación y preparación de datos con T-SQL',
        items: [
          'Limpieza y tratamiento de datos mediante SQL',
          'Funciones de texto, fecha y conversión de tipos',
          'CASE, funciones condicionales y tratamiento de valores nulos',
          'Tablas temporales, vistas y procedimientos almacenados',
          'Diseño de consultas reutilizables para procesos de preparación de datos',
        ],
      },
      {
        titulo: 'Sesión 4 · Modelado y optimización de datos para análisis',
        items: [
          'Diseño y normalización de bases de datos relacionales',
          'Claves, relaciones e integridad de los datos',
          'Modelado orientado al análisis y estructuras dimensionales',
          'Índices y criterios básicos de optimización de consultas',
          'Preparación de estructuras para grandes volúmenes de información',
        ],
      },
      {
        titulo: 'Sesión 5 · SQL Server + Python para análisis y automatización',
        items: [
          'Conexión de Python con SQL Server',
          'Ejecución y automatización de consultas desde Python',
          'Extracción de datos de SQL Server para procesamiento externo',
          'Transformación y análisis complementario con Python',
          'IA como apoyo para desarrollar, explicar, depurar y optimizar código SQL y Python',
        ],
      },
      {
        titulo: 'Sesión 6 · IA aplicada al análisis y gestión de datos',
        items: [
          'Fundamentos de inteligencia artificial aplicados al trabajo con datos',
          'Generación y optimización de consultas mediante IA',
          'Uso de IA para exploración, transformación y documentación de datos',
          'Validación de resultados y detección de errores en código generado por IA',
          'Automatización de tareas y desarrollo de soluciones personalizadas con SQL y Python',
        ],
      },
      {
        titulo: 'Sesión 7 · Microsoft Fabric y analítica de datos a escala',
        items: [
          'Introducción al ecosistema Microsoft Fabric',
          'Integración de SQL Server con entornos modernos de datos',
          'Almacenamiento, procesamiento y consulta de información a escala',
          'Integración de SQL, Python y Fabric dentro de flujos de datos',
          'Preparación y disponibilidad de datos para herramientas de analítica y Business Intelligence',
        ],
      },
      {
        titulo: 'Sesión 8 · Proyecto integrador: SQL Server, Python, IA y Fabric',
        items: [
          'Definición de un problema y estrategia de tratamiento de datos',
          'Extracción y consulta de información con SQL Server',
          'Limpieza, transformación y modelado de datos',
          'Integración de Python, IA y/o Fabric según las necesidades del proyecto',
          'Exportación y preparación de datos para análisis, visualización y toma de decisiones',
        ],
      },
    ],
    faq: [
      {
        pregunta: '¿Qué nivel de SQL necesito para empezar?',
        respuesta:
          'Conocimientos básicos de bases de datos o SQL. El curso es de nivel intermedio–avanzado: repasa los fundamentos en la primera sesión y desde la segunda entra en consultas de análisis, JOIN, subconsultas y CTE.',
      },
      {
        pregunta: '¿En qué se diferencia de Python para Análisis de Datos?',
        respuesta:
          'Este curso trabaja desde la base de datos: consultas, T-SQL, modelado, optimización y preparación de información a escala. Python para Análisis de Datos parte del lenguaje y de Pandas. Se complementan, y aquí Python aparece en la sesión 5 como integración con SQL Server.',
      },
      {
        pregunta: '¿Cómo se usa la IA en el curso?',
        respuesta:
          'Como apoyo para generar, comprender, depurar y optimizar consultas y código, y para documentar y explorar datos. Una sesión completa se dedica a eso, incluida la validación de resultados y la detección de errores en el código que genera la IA: el criterio profesional no se delega.',
      },
      {
        pregunta: '¿Necesito una licencia de SQL Server o de Microsoft Fabric?',
        respuesta:
          'No hace falta comprar nada: se trabaja con las ediciones gratuitas de SQL Server para desarrollo y aprendizaje, y Fabric se aborda desde su entorno de prueba. En la primera sesión se revisa la instalación y configuración.',
      },
      {
        pregunta: '¿Cuánto dura y en qué horario se dicta?',
        respuesta:
          'Son 8 sesiones de 3 horas cronológicas, equivalentes a 32 horas académicas para la certificación. Las clases son martes y jueves de 7:30 a 10:30 p. m., en vivo y con acceso a las grabaciones.',
      },
    ],
  },
  {
    slug: 'python-para-analisis-de-datos',
    categoria: 'datos',
    paleta: 'python',
    logo: 'python',
    terminal: {
      titulo: 'Esto se escribe en la sesión 5',
      texto:
        'Un archivo de veinte líneas que abre el reporte de ventas del año, lo limpia, lo agrupa por región y deja el resultado ordenado. Lo mismo que en Excel toma media mañana y hay que repetir cada mes; aquí se ejecuta en un segundo y sirve para el próximo cierre sin tocar nada.',
      archivo: 'analisis_ventas.py',
      codigo: [
        'import pandas as pd',
        '',
        '# 1 · se abre el reporte y se convierten las fechas',
        'ventas = pd.read_csv("ventas_2026.csv", parse_dates=["fecha"])',
        '',
        '# 2 · limpieza: sin duplicados y sin importes vacíos',
        'ventas = ventas.drop_duplicates().dropna(subset=["importe"])',
        '',
        '# 3 · indicadores por región, de mayor a menor',
        'resumen = (',
        '    ventas.groupby("region")["importe"]',
        '    .agg(total="sum", ticket="mean", operaciones="count")',
        '    .sort_values("total", ascending=False)',
        ')',
        '',
        'total = resumen["total"].sum()',
        '',
        'print(resumen.round(2))',
        'print(f"Total del período: S/ {total:,.2f}")',
      ],
      comando: 'python analisis_ventas.py',
      salida: [
        '              total   ticket  operaciones',
        'region                                   ',
        'Norte      412800.00  1032.00          400',
        'Sur        298450.50   888.25          336',
        'Centro     254900.00   765.47          333',
        'Oriente    181300.00   652.16          278',
        '',
        'Total del período: S/ 1,147,450.50',
      ],
      pie: 'Salida real de pandas sobre un reporte de ventas de ejemplo.',
    },
    titulo: 'Python para Análisis de Datos',
    subtitulo: 'Sin experiencia previa en programación',
    resumen:
      'Integra, limpia, transforma, analiza y visualiza información con Pandas, NumPy y SQL, usando IA como apoyo para construir procesos reproducibles.',
    horas: '32 horas académicas',
    sesiones: '8 sesiones de 3 h cronológicas',
    dias: 'Lunes y miércoles',
    horario: '7:30 – 10:30 p. m.',
    respuestaRapida:
      'Python para Análisis de Datos es un curso en vivo de Excelsius de 32 horas académicas, en 8 sesiones de 3 horas cronológicas (lunes y miércoles de 7:30 a 10:30 p. m.), que enseña a integrar, limpiar, transformar, analizar y visualizar datos con Pandas, NumPy, SQL y apoyo de IA. No requiere experiencia previa en programación.',
    presentacion:
      'Python para Análisis de Datos es un curso práctico orientado a desarrollar las capacidades necesarias para trabajar con información proveniente de diferentes fuentes, utilizando Python para integrarla, limpiarla, transformarla, analizarla y visualizarla. El participante conocerá herramientas como Pandas, NumPy y librerías de visualización, así como la integración con archivos, bases de datos y SQL, trabajando en entornos como Google Colab y Python local. El curso incorpora la IA como apoyo al aprendizaje y al desarrollo de soluciones, permitiendo construir procesos de análisis más eficientes, reproducibles y adaptables a diferentes necesidades empresariales.',
    objetivos: [
      'Comprender los fundamentos de Python necesarios para aplicarlos al análisis y tratamiento de datos.',
      'Integrar información proveniente de archivos, bases de datos y diferentes fuentes mediante Python y SQL.',
      'Limpiar, transformar y organizar datos utilizando herramientas especializadas como Pandas.',
      'Analizar y visualizar información para identificar patrones, tendencias e indicadores relevantes.',
      'Desarrollar procesos reproducibles y automatizables, utilizando IA como apoyo para resolver y optimizar tareas de análisis.',
    ],
    beneficios: [
      'Amplía tus capacidades de análisis, incorporando Python como complemento de Excel, SQL y Power BI.',
      'Trabaja con múltiples fuentes de información, adaptando tus procesos a diferentes formatos y estructuras de datos.',
      'Reduce tareas manuales y repetitivas mediante procesos de transformación y automatización.',
      'Desarrolla una visión integral del manejo de datos, desde su obtención hasta la generación de resultados útiles para la toma de decisiones.',
      'Incorpora IA a tu flujo de trabajo, usándola como apoyo para comprender, desarrollar, revisar y optimizar soluciones en Python.',
    ],
    publico:
      'Dirigido a estudiantes, profesionales, analistas y personas que trabajan con información en áreas como administración, comercial, finanzas, marketing, operaciones, logística y gestión, que desean ampliar sus capacidades de análisis incorporando Python. Es especialmente adecuado para quienes ya utilizan Excel, SQL, Power BI u otras herramientas de datos y buscan una herramienta más flexible para integrar, transformar, analizar y automatizar información, aunque no cuenten con experiencia previa en programación.',
    temario: [
      {
        titulo: 'Sesión 1 · Python y el ecosistema del análisis de datos',
        items: [
          'Python aplicado al análisis de datos',
          'Flujo de trabajo del analista y relación con Excel, SQL y Power BI',
          'Entornos de trabajo: Google Colab y Python local',
          'Fundamentos de Python: variables, tipos de datos y estructuras',
          'Operadores, lógica y funciones',
          'Primer ejercicio de análisis con apoyo de IA',
        ],
      },
      {
        titulo: 'Sesión 2 · Pandas: importación y exploración de datos',
        items: [
          'NumPy y Pandas para el análisis de datos',
          'Series y DataFrames',
          'Importación de datos desde CSV, Excel y JSON',
          'Exploración, selección, filtrado y ordenamiento',
          'Estadística descriptiva básica',
          'Exploración de un dataset empresarial con apoyo de IA',
        ],
      },
      {
        titulo: 'Sesión 3 · Python y bases de datos',
        items: [
          'Python como herramienta para acceder a información almacenada',
          'Bases de datos relacionales y conexión mediante SQL',
          'SQLite como entorno práctico',
          'Ejecución de consultas desde Python',
          'Integración de resultados con Pandas',
          'Flujo SQL → Python → Pandas',
        ],
      },
      {
        titulo: 'Sesión 4 · Limpieza y preparación de datos',
        items: [
          'Calidad y validación de datos',
          'Tratamiento de valores nulos y duplicados',
          'Conversión y manejo de tipos, fechas y textos',
          'Corrección y estandarización de información',
          'Creación y transformación de columnas',
          'Procesos de limpieza reproducibles con apoyo de IA',
        ],
      },
      {
        titulo: 'Sesión 5 · Transformación y análisis con Pandas',
        items: [
          'Transformación y segmentación de datos',
          'Agrupaciones, agregaciones e indicadores',
          'Combinación de datasets con merge() y concat()',
          'Análisis temporal y tablas resumen',
          'Equivalencias entre SQL y Pandas',
          'Construcción de datasets personalizados para análisis',
        ],
      },
      {
        titulo: 'Sesión 6 · Análisis exploratorio y visualización',
        items: [
          'Análisis exploratorio de datos',
          'Estadística aplicada e identificación de patrones',
          'Tendencias, relaciones y valores atípicos',
          'Visualización con Pandas, Matplotlib y Seaborn',
          'Selección e interpretación de gráficos',
          'IA aplicada a la exploración y visualización de datos',
        ],
      },
      {
        titulo: 'Sesión 7 · Integración y automatización de datos',
        items: [
          'Python como integrador de múltiples fuentes',
          'Conexión con PostgreSQL y MySQL/MariaDB',
          'Integración de archivos, bases de datos y datos estructurados',
          'Consolidación y procesamiento de múltiples datasets',
          'Funciones, reutilización y automatización de procesos',
          'Construcción de flujos reproducibles con apoyo de IA',
        ],
      },
      {
        titulo: 'Sesión 8 · Proyecto integrador: del dato a la decisión',
        items: [
          'Definición del problema y objetivo analítico',
          'Incorporación y validación de información',
          'Limpieza, integración y transformación',
          'Análisis, indicadores y visualización',
          'Preparación de resultados para Power BI u otras herramientas',
          'Presentación de hallazgos, conclusiones y recomendaciones',
        ],
      },
    ],
    faq: [
      {
        pregunta: '¿Necesito saber programar para llevar el curso?',
        respuesta:
          'No. La primera sesión parte de los fundamentos de Python —variables, tipos de datos, estructuras, operadores y funciones— pensados desde el análisis de datos. Está diseñado para quienes ya usan Excel, SQL o Power BI y quieren una herramienta más flexible.',
      },
      {
        pregunta: '¿Cuánto dura y en qué horario se dicta?',
        respuesta:
          'Son 8 sesiones de 3 horas cronológicas, equivalentes a 32 horas académicas para la certificación. Las clases son lunes y miércoles de 7:30 a 10:30 p. m., en vivo y con acceso a las grabaciones.',
      },
      {
        pregunta: '¿Qué librerías y entornos se usan?',
        respuesta:
          'Pandas y NumPy para el tratamiento de datos, Matplotlib y Seaborn para visualización, y SQLite, PostgreSQL y MySQL/MariaDB para la integración con bases de datos. Se trabaja en Google Colab y en Python local, sin necesidad de un equipo potente.',
      },
      {
        pregunta: '¿Necesito instalar algo en mi computadora?',
        respuesta:
          'No es obligatorio: se puede seguir todo el curso desde Google Colab, que corre en el navegador. Aun así se revisa la instalación de Python local para quienes prefieran trabajar en su propio equipo.',
      },
      {
        pregunta: '¿Sirve si ya uso Power BI?',
        respuesta:
          'Sí, es su complemento natural. La sesión 8 termina preparando los resultados para Power BI u otras herramientas, de modo que Python se ocupa de integrar, limpiar y transformar, y el tablero se queda con el análisis ya listo.',
      },
    ],
  },
  {
    slug: 'power-bi-con-ia-para-analitica-avanzada',
    categoria: 'datos',
    destacado: 'Más solicitado',
    paleta: 'powerbi',
    logo: 'powerbi',
    imagenes: [
      {
        src: '/img/powerbi/powerbi.webp',
        alt: 'Panel de ventas en Power BI sobre una laptop: ingresos totales, clientes nuevos, tasa de conversión, ventas por región y tendencia mensual.',
        titulo: 'Terminas con un tablero como este',
        texto:
          'No es una plantilla descargada: es el proyecto integrador con el que cierra el curso. Los indicadores de arriba salen de medidas escritas en DAX, el desglose por región y producto de un modelo dimensional propio, y los datos llegan integrados desde SQL Server con Power Query. Al terminar sabes construirlo y, sobre todo, explicarlo.',
        puntos: [
          'Modelo dimensional y esquema estrella',
          'Métricas en DAX con criterios de rendimiento',
          'Datos integrados desde SQL Server y Power Query',
          'Publicación en la nube y lectura desde cualquier dispositivo',
        ],
        pie: 'Proyecto integrador del curso: panel de ventas con datos integrados desde SQL Server.',
        ancho: 1200,
        alto: 670,
        zona: 'presentacion',
      },
      {
        src: '/img/powerbi/powerbiobjetivos.webp',
        alt: 'Infografía con los cinco objetivos del curso: fundamentos de analítica y Power BI, integración de SQL y Power Query, modelado y DAX, Python con Machine Learning e IA, e integración con Microsoft Fabric y Azure.',
        titulo: 'De los fundamentos a la nube, en cinco objetivos',
        texto:
          'El programa avanza en línea recta: primero el papel de Power BI dentro de una solución de Business Intelligence, después la obtención y preparación de los datos, el modelo y sus métricas, y por último las piezas que amplían el análisis —Python, estadística, Machine Learning e IA— hasta llegar a Microsoft Fabric y Azure.',
        puntos: [
          'Fundamentos de analítica de datos y ecosistema Power BI',
          'SQL y Power Query para obtener y transformar la información',
          'Modelado de datos y desarrollo de métricas con DAX',
          'Python, estadística, Machine Learning e IA como complementos',
          'Integración con Microsoft Fabric y Azure',
        ],
        pie: 'Los cinco objetivos del curso Power BI con IA para Analítica Avanzada.',
        ancho: 1200,
        alto: 1200,
        zona: 'objetivos',
      },
      {
        src: '/img/powerbi/aprendiendopowerbi.webp',
        alt: 'Participante siguiendo una clase en vivo de Power BI desde casa, con el panel de informes abierto en la laptop y apuntes a mano.',
        titulo: 'En vivo, desde donde estés',
        texto:
          'Las clases son en directo y con la herramienta abierta: se trabaja sobre datos reales, se pregunta en el momento y cada sesión queda grabada para volver sobre el modelado o una medida de DAX las veces que haga falta. Dos noches por semana, sin dejar de trabajar.',
        puntos: [
          '8 sesiones de 3 horas cronológicas',
          'Martes y jueves, de 7:30 a 10:30 p. m.',
          '32 horas académicas para la certificación',
          'S/ 350.00 al contado o 2 cuotas de S/ 200.00',
        ],
        pie: 'Clase en vivo del curso, con acceso posterior a la grabación.',
        ancho: 896,
        alto: 1200,
        zona: 'plan',
      },
    ],
    titulo: 'Power BI con IA para Analítica Avanzada',
    tituloSeo: 'Power BI con IA para Analítica',
    subtitulo: 'SQL, Python, Machine Learning, Fabric y Azure',
    resumen:
      'Evoluciona de los dashboards a soluciones integrales de análisis: modelado, DAX, estadística, Python, Machine Learning e integración con Fabric y Azure.',
    horas: '32 horas académicas',
    sesiones: '8 sesiones de 3 h cronológicas',
    dias: 'Martes y jueves',
    horario: '7:30 – 10:30 p. m.',
    precio: { contado: 'S/ 350.00', cuotas: '2 cuotas de S/ 200.00' },
    respuestaRapida:
      'Power BI con IA para Analítica Avanzada es un curso en vivo de Excelsius de 32 horas académicas, en 8 sesiones de 3 horas cronológicas (martes y jueves de 7:30 a 10:30 p. m.), que lleva Power BI más allá del dashboard: SQL y Power Query, modelado y DAX, estadística, Python, Machine Learning e integración con Microsoft Fabric y Azure. Inversión: S/ 350.00 al contado o 2 cuotas de S/ 200.00.',
    presentacion:
      'El curso plantea una evolución desde el uso tradicional de Power BI como herramienta de reportes y visualización hacia su utilización como núcleo de una solución integral de análisis de datos, conectándose con tecnologías como SQL, Python, Machine Learning, Microsoft Fabric y Azure. A lo largo del curso, el participante desarrollará criterios para trabajar con diferentes fuentes y volúmenes de información, construir modelos de datos, desarrollar métricas mediante DAX, aplicar técnicas estadísticas y de programación, e incorporar herramientas de inteligencia artificial y analítica predictiva. La IA se aborda como una herramienta de apoyo al profesional, orientada a facilitar el desarrollo, optimización y automatización de soluciones, sin sustituir la comprensión de los fundamentos del análisis de datos ni el criterio para validar e interpretar los resultados.',
    objetivos: [
      'Comprender los fundamentos de la analítica de datos y el papel de Power BI dentro de soluciones de Business Intelligence y analítica avanzada.',
      'Integrar SQL y Power Query para la obtención, transformación y preparación de datos provenientes de diferentes fuentes.',
      'Diseñar modelos de datos y desarrollar métricas y análisis mediante DAX, considerando criterios de eficiencia y rendimiento.',
      'Incorporar Python, estadística, Machine Learning e IA como herramientas complementarias para ampliar las capacidades de análisis.',
      'Integrar Power BI con Microsoft Fabric y Azure, desarrollando soluciones orientadas al procesamiento y análisis de datos para la toma de decisiones.',
    ],
    beneficios: [
      'Desarrollar soluciones de análisis más allá de la elaboración convencional de dashboards y reportes.',
      'Integrar Power BI, SQL, Python e IA dentro de un mismo flujo de trabajo analítico.',
      'Fortalecer la capacidad para analizar, interpretar y trabajar con grandes volúmenes de datos.',
      'Utilizar herramientas de IA para apoyar el desarrollo y optimización de consultas, código, métricas y soluciones analíticas, manteniendo el criterio profesional.',
      'Conocer tecnologías del ecosistema Microsoft Fabric y Azure para ampliar las posibilidades de procesamiento, analítica e inteligencia artificial.',
    ],
    publico:
      'El curso está dirigido a profesionales, técnicos, analistas de datos y usuarios de Power BI que deseen avanzar hacia un nivel intermedio–avanzado de análisis, así como a profesionales de áreas administrativas, financieras, comerciales, operaciones, logística, ingeniería y gestión que trabajen con indicadores, reportes y grandes volúmenes de información. Se recomienda contar con conocimientos básicos o intermedios de Power BI y tener disposición para incorporar conceptos de programación, estadística, inteligencia artificial y analítica avanzada.',
    temario: [
      {
        titulo: 'Sesión 1 · Fundamentos de analítica de datos, Power BI e IA',
        items: [
          'Business Intelligence y evolución hacia la analítica avanzada',
          'Ecosistema Power BI y flujo de trabajo de análisis',
          'Tipos, estructuras y fuentes de datos',
          'Inteligencia artificial aplicada al análisis',
          'IA como asistente, no como sustituto del criterio profesional',
        ],
      },
      {
        titulo: 'Sesión 2 · Adquisición y transformación de datos con SQL y Power Query',
        items: [
          'Conexión a diferentes fuentes de datos',
          'SQL aplicado a consulta y extracción de información',
          'Integración de SQL con Power BI',
          'Limpieza, combinación y transformación con Power Query',
          'Preparación y optimización de grandes volúmenes de datos',
        ],
      },
      {
        titulo: 'Sesión 3 · Modelado de datos y DAX para analítica avanzada',
        items: [
          'Modelo dimensional y esquema estrella',
          'Relaciones entre tablas y estructura del modelo',
          'Medidas y columnas calculadas',
          'DAX para métricas y análisis dinámico',
          'Optimización y rendimiento del modelo',
        ],
      },
      {
        titulo: 'Sesión 4 · Estadística y programación para el análisis de datos',
        items: [
          'Estadística descriptiva e inferencial aplicada',
          'Variabilidad, distribución, correlación y tendencias',
          'Fundamentos de lógica de programación',
          'Variables, funciones y estructuras de programación',
          'Introducción a Python orientado al análisis de datos',
        ],
      },
      {
        titulo: 'Sesión 5 · Python aplicado a Power BI',
        items: [
          'Manipulación y transformación de datos con Python',
          'Librerías para análisis de datos',
          'Automatización y procesamiento mediante scripts',
          'Integración de Python con Power BI',
          'IA como apoyo para desarrollar, revisar y optimizar código',
        ],
      },
      {
        titulo: 'Sesión 6 · Machine Learning e IA aplicada al análisis',
        items: [
          'Fundamentos de Machine Learning',
          'Regresión y clasificación',
          'Preparación de datos para modelos predictivos',
          'Evaluación e interpretación de modelos',
          'Integración de resultados con Power BI',
        ],
      },
      {
        titulo: 'Sesión 7 · Microsoft Fabric y Azure para analítica e IA',
        items: [
          'Arquitectura y componentes de Microsoft Fabric',
          'Integración de Fabric con Power BI',
          'Procesamiento y gestión de datos a escala',
          'Introducción a Azure para analítica e IA',
          'Integración del ecosistema Microsoft para soluciones avanzadas',
        ],
      },
      {
        titulo: 'Sesión 8 · Proyecto integrador: Power BI + Python + IA',
        items: [
          'Definición del problema y estrategia de análisis',
          'Obtención y transformación de datos',
          'Modelado y desarrollo de métricas',
          'Aplicación de Python e IA según el problema',
          'Dashboard y presentación de resultados para la toma de decisiones',
        ],
      },
    ],
    faq: [
      {
        pregunta: '¿Cuánto cuesta el curso y cómo se paga?',
        respuesta:
          'S/ 350.00 al contado o 2 cuotas de S/ 200.00. Se acepta transferencia, depósito, Yape, Plin y tarjeta, y se emite boleta o factura electrónica. La vacante se confirma con el pago y el envío de la constancia por WhatsApp.',
      },
      {
        pregunta: '¿Qué nivel de Power BI necesito para empezar?',
        respuesta:
          'Se recomienda tener conocimientos básicos o intermedios de Power BI. El curso avanza hacia un nivel intermedio–avanzado, con modelado, DAX, estadística, Python y Machine Learning, así que conviene llegar con la herramienta ya usada al menos para reportes.',
      },
      {
        pregunta: '¿Necesito saber programar o estadística?',
        respuesta:
          'No de antemano. La sesión 4 cubre estadística descriptiva e inferencial y los fundamentos de lógica de programación, y la 5 introduce Python aplicado a Power BI. Lo que sí pide el curso es disposición para incorporar esos conceptos.',
      },
      {
        pregunta: '¿Qué se ve de Microsoft Fabric y Azure?',
        respuesta:
          'La arquitectura y los componentes de Fabric, su integración con Power BI, el procesamiento de datos a escala y una introducción a Azure para analítica e inteligencia artificial, con el foco puesto en cómo se articulan dentro de una solución.',
      },
      {
        pregunta: '¿Con qué me quedo al terminar?',
        respuesta:
          'Con un proyecto integrador propio: problema definido, datos obtenidos y transformados, modelo con sus métricas, Python e IA aplicados según el caso, y un dashboard presentado para la toma de decisiones. Más el certificado por 32 horas académicas.',
      },
    ],
  },
];

export const categoriaPorId = (id: CategoriaId): Categoria =>
  categorias.find((c) => c.id === id) ?? categorias[0];

export const cursosPorCategoria = (id: CategoriaId): Curso[] =>
  cursos.filter((c) => c.categoria === id);

/** Los tres que encabezan la sección de cursos del home. */
export const cursosDestacados = (): Curso[] =>
  cursos.filter((c) => !c.proximo).slice(0, 3);

/**
 * Preguntas del curso. Si el curso no trae las suyas, se arman con sus propios
 * datos: sirven para el acordeón de la página y para el esquema FAQPage que
 * leen buscadores y asistentes.
 */
export const faqCurso = (curso: Curso): Pregunta[] =>
  curso.faq ?? [
    {
      pregunta: `¿Cuánto dura el curso ${curso.titulo}?`,
      respuesta: `${curso.horas}, distribuidas en ${curso.sesiones.toLowerCase()}. Las clases son ${curso.dias.toLowerCase()} de ${curso.horario}, en vivo y con acceso a las grabaciones.`,
    },
    {
      pregunta: `¿A quién está dirigido el curso ${curso.titulo}?`,
      respuesta: curso.publico,
    },
    {
      pregunta: `¿El curso ${curso.titulo} entrega certificado?`,
      respuesta: `Sí. Al aprobar se emite un certificado a nombre de Excelsius por ${curso.horas}, con el detalle del participante, el curso, la duración y la fecha de emisión.`,
    },
    {
      pregunta: '¿Las clases son en vivo o grabadas?',
      respuesta:
        'Se dictan en vivo, con interacción en tiempo real, y cada sesión queda grabada para que puedas repasarla durante el programa.',
    },
    {
      pregunta: '¿Cómo reservo mi vacante?',
      respuesta:
        'Escríbenos por WhatsApp al 951 753 920 o a informes@excelsius.biz. La vacante se confirma con el pago y el envío de la constancia; emitimos boleta o factura electrónica.',
    },
  ];

/** Resumen corto para buscadores generativos cuando el curso no trae el suyo. */
export const respuestaCurso = (curso: Curso): string =>
  curso.respuestaRapida ??
  `${curso.titulo} es un curso en vivo de Excelsius de ${curso.horas} (${curso.sesiones}), dictado ${curso.dias.toLowerCase()} de ${curso.horario}. ${curso.resumen}`;
