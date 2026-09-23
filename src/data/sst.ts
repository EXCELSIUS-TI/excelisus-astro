/**
 * Contenido de la landing de capacitaciones SST (la de `/curso-sst-1/` en
 * WordPress). Conserva su propia identidad —morado, naranja y amarillo— porque
 * es una línea comercial distinta de la marca corporativa azul.
 */

export const sst = {
  hero: {
    hud: 'Capacitaciones para empresas',
    titulo: 'Cursos SST en Lima',
    acento: 'y todo el Perú',
    subtitulo:
      'Capacitaciones en Seguridad y Salud en el Trabajo (SST) para empresas que buscan prevenir riesgos laborales.',
    bajada:
      'Cumple con la Ley 29783, reduce accidentes laborales y fortalece la cultura de seguridad en tu organización.',
    cta: 'Solicitar cotización',
  },

  cifras: [
    { valor: '+13', etiqueta: 'Años capacitando en SST' },
    { valor: '+6,000', etiqueta: 'Capacitaciones realizadas' },
    { valor: '+4,900', etiqueta: 'Trabajadores entrenados' },
    { valor: '24/7', etiqueta: 'Soporte y asesoría SST' },
  ],

  capacitaciones: {
    titulo: 'Capacitaciones SST',
    acento: 'que protegen tu empresa',
    entradilla:
      'Cumple con la Ley 29783 y fortalece la cultura de prevención en tu organización. Brindamos capacitaciones en seguridad y salud en el trabajo en Lima y todo el Perú.',
    items: [
      {
        nombre: 'Primeros Auxilios',
        detalle:
          'Capacita a tu equipo para actuar ante emergencias, reducir lesiones y responder de manera rápida y efectiva en el trabajo.',
        icono:
          'M19 8h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zm-9-3h4v3h-4V5zm5 11h-2v2h-2v-2H9v-2h2v-2h2v2h2v2z',
      },
      {
        nombre: 'Trabajos en Altura',
        detalle:
          'Entrena a tu personal para prevenir caídas, usar correctamente los equipos de protección y trabajar de forma segura en altura.',
        icono:
          'M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-1 5h2l3 5-1.7 1-1.3-2.2V14l3 7h-2.2l-2.1-5-2.1 5H7.4l3-7v-3.2L9.1 13 7.4 12l3.6-5z',
      },
      {
        nombre: 'IPERC',
        detalle:
          'Identifica peligros, evalúa riesgos y aplica controles efectivos para cumplir con la normativa y mejorar la seguridad laboral.',
        icono: 'M12 2 1 21h22L12 2zm1 14h-2v2h2v-2zm0-7h-2v5h2V9z',
      },
    ],
    cta: 'Coordinar capacitación',
  },

  modalidad: {
    hud: 'Capacitaciones SST online',
    titulo: 'Virtuales y presenciales',
    acento: 'para empresas en Perú',
    entradilla:
      'Capacitaciones virtuales y presenciales en Seguridad y Salud en el Trabajo (SST) en vivo. Cumple con la normativa peruana, reduce accidentes laborales y capacita a tu equipo con sesiones prácticas vía Zoom, Google Meet o Microsoft Teams.',
    columnas: [
      {
        titulo: 'Modalidad',
        items: [
          'Clases presencial y en vivo (Zoom, Meet, Teams)',
          'Interacción en tiempo real',
          'Adaptado a tu rubro',
        ],
      },
      {
        titulo: 'Entregables',
        items: ['Certificados digitales', 'Material descargable', 'Registro de asistencia'],
      },
      {
        titulo: 'Beneficios',
        items: [
          'Cumplimiento SST en Perú',
          'Reducción de riesgos laborales',
          'Capacitación sin detener operaciones',
        ],
      },
      {
        titulo: 'Ideal para',
        items: ['Empresas y pymes', 'Personal operativo y administrativo', 'Programas internos SST'],
      },
    ],
    cta: 'Cotizar capacitación virtual',
  },

  porQue: {
    titulo: '¿Por qué elegirnos',
    acento: 'para tu curso de SST?',
    entradilla:
      'Nuestro enfoque garantiza atención personalizada, cumplimiento normativo y experiencia en diversos sectores económicos para que tu aprendizaje sea efectivo y seguro.',
    items: [
      {
        titulo: 'Atención y seguimiento',
        detalle:
          'Nuestro equipo brinda atención personalizada y seguimiento continuo para que tu curso de SST sea una experiencia completa.',
      },
      {
        titulo: 'Cumplimiento normativo',
        detalle:
          'Garantizamos que tu curso de SST cumpla con todas las normativas y estándares legales vigentes.',
      },
      {
        titulo: 'Equipo especializado',
        detalle:
          'Contamos con un equipo multidisciplinario altamente capacitado para impartir un curso de SST eficiente y actualizado.',
      },
      {
        titulo: 'Experiencia en sectores',
        detalle:
          'Nuestra experiencia en diversos sectores económicos asegura que el curso de SST se adapte a tu realidad laboral.',
      },
    ],
  },

  certificacion: {
    hud: 'Certificación',
    titulo: 'Certificado',
    acento: 'de finalización',
    cuerpo: [
      'Al concluir exitosamente el Curso de Seguridad y Salud en el Trabajo (SST), los participantes recibirán un Certificado de finalización y aprobación que respalda oficialmente las competencias adquiridas.',
      'Este certificado reconoce la dedicación y el logro de los participantes en la adquisición de conocimientos clave en SST, fortaleciendo su capacidad para identificar riesgos laborales, implementar medidas preventivas y promover un entorno de trabajo seguro y saludable.',
      'Es un testimonio tangible del compromiso y la excelencia de los participantes en la mejora de sus habilidades en SST, contribuyendo a su desarrollo profesional y al fortalecimiento de la seguridad y bienestar en su entorno laboral.',
    ],
    detalles: [
      { campo: 'Nombre del participante', valor: 'Nombre completo' },
      { campo: 'Curso completado', valor: 'Seguridad y Salud en el Trabajo (SST)' },
      { campo: 'Duración del curso', valor: 'Número de semanas / horas' },
      { campo: 'Fecha de emisión', valor: 'Fecha de emisión del certificado' },
    ],
  },

  informacion: {
    titulo: 'Información',
    acento: 'del curso de SST',
    pestanas: [
      {
        id: 'objetivos',
        nombre: 'Objetivos',
        items: [
          {
            titulo: 'Asegurar',
            detalle:
              'La identificación, evaluación e intervención de los diferentes factores de riesgo y peligros significativos para la salud de los trabajadores.',
          },
          {
            titulo: 'Fortalecer',
            detalle:
              'La cultura de salud y seguridad promoviendo el compromiso y liderazgo de todos los funcionarios, contratistas y subcontratistas.',
          },
          {
            titulo: 'Implementar',
            detalle: 'Un plan de prevención, respuesta y recuperación ante emergencias.',
          },
          {
            titulo: 'Promover',
            detalle: 'Una cultura de prevención de riesgos laborales en el país.',
          },
          {
            titulo: 'Divulgar y sensibilizar',
            detalle:
              'Las normas en seguridad y salud en el trabajo, para facilitar el control de los factores de riesgo y prevenir accidentes y enfermedades laborales.',
          },
        ],
      },
      {
        id: 'publico',
        nombre: 'Público objetivo',
        items: [
          {
            titulo: 'Personal operativo',
            detalle: 'Trabajadores directamente involucrados en actividades de riesgo.',
          },
          {
            titulo: 'Supervisores y líderes',
            detalle: 'Responsables de la implementación de protocolos de seguridad y control de riesgos.',
          },
          {
            titulo: 'Contratistas y subcontratistas',
            detalle: 'Personal externo que interactúa con las operaciones de la empresa.',
          },
        ],
      },
      {
        id: 'requisitos',
        nombre: 'Requisitos',
        items: [
          { titulo: 'Edad mínima', detalle: '18 años.' },
          {
            titulo: 'Experiencia',
            detalle:
              'No es necesaria experiencia previa, aunque se valorará conocimiento básico de seguridad industrial.',
          },
          {
            titulo: 'Documentación',
            detalle: 'Presentar identificación oficial y certificado médico vigente.',
          },
        ],
      },
    ],
  },

  faq: {
    titulo: 'Preguntas frecuentes',
    acento: 'sobre capacitaciones SST',
    entradilla:
      'Resuelve dudas comunes sobre nuestras capacitaciones en seguridad y salud en el trabajo para empresas en Lima y todo el Perú. Modalidad virtual o presencial, con enfoque práctico y entregables listos para sustento interno.',
    cta: 'Cotizar capacitación en SST',
    items: [
      {
        pregunta: '¿Qué incluye el servicio de capacitación en SST?',
        respuesta:
          'Incluye sesiones teóricas y prácticas adaptadas a tu empresa, materiales digitales, registro de asistencia, evaluaciones y certificados. Además, entregamos documentación útil para auditorías y cumplimiento normativo.',
      },
      {
        pregunta: '¿Las capacitaciones en seguridad y salud en el trabajo son obligatorias por Ley 29783?',
        respuesta:
          'Sí. Según la Ley N.° 29783, las empresas deben brindar capacitaciones periódicas en SST a sus trabajadores. Estas deben ser documentadas y formar parte del sistema de gestión de seguridad y salud en el trabajo.',
      },
      {
        pregunta: '¿Pueden dictar capacitaciones SST virtuales o presenciales?',
        respuesta:
          'Ofrecemos ambas modalidades. Las capacitaciones pueden realizarse de forma virtual en vivo o presencial en las instalaciones de tu empresa, según tus necesidades operativas.',
      },
      {
        pregunta: '¿Qué necesito enviar para cotizar capacitaciones SST para mi empresa?',
        respuesta:
          'Solo necesitamos información básica como: número de trabajadores, rubro de la empresa, tipo de capacitación requerida y modalidad preferida. Con eso podemos enviarte una propuesta personalizada.',
      },
    ],
  },

  contacto: {
    hud: 'Formulario de contacto',
    titulo: 'Solicita tu capacitación en SST',
    acento: 'de forma rápida',
    entradilla:
      'Completa el formulario y recibe una propuesta adaptada a las necesidades de tu empresa. Te ayudamos a cumplir con la normativa vigente, mejorar la seguridad de tu equipo y fortalecer tu sistema de gestión en seguridad y salud en el trabajo.',
    cierre: '¿Te interesa? Comienza con tu programa ahora mismo',
    cta: 'Informes del curso',
  },
} as const;
