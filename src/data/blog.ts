/**
 * Configuración del blog: sus categorías y su firma.
 *
 * Las categorías viven aquí y no en cada artículo para que el esquema de la
 * colección (`src/content.config.ts`) las valide: un artículo con una
 * categoría mal escrita rompe el build en vez de publicarse huérfano.
 */

export const CATEGORIAS_BLOG = ['seguridad', 'datos', 'marketing', 'software'] as const;
export type CategoriaBlog = (typeof CATEGORIAS_BLOG)[number];

export type FichaCategoria = {
  id: CategoriaBlog;
  nombre: string;
  descripcion: string;
  /** trazo de un icono de 24 × 24 */
  icono: string;
  /** tono sobre fondo oscuro y su versión legible sobre blanco */
  tono: string;
  tonoClaro: string;
};

export const categoriasBlog: Record<CategoriaBlog, FichaCategoria> = {
  seguridad: {
    id: 'seguridad',
    nombre: 'Seguridad y salud',
    descripcion: 'SST, SSOMA, IPERC y gestión ambiental aplicada a operaciones reales.',
    icono: 'M12 2 4 5.5v6c0 5 3.4 9.5 8 10.5 4.6-1 8-5.5 8-10.5v-6L12 2zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
    tono: '#ff6600',
    tonoClaro: '#b8430a',
  },
  datos: {
    id: 'datos',
    nombre: 'Datos y BI',
    descripcion: 'Power BI, SQL Server, Python y analítica para decidir con datos.',
    icono: 'M4 20h3v-8H4v8zm6.5 0h3V4h-3v16zM17 20h3v-12h-3v12z',
    tono: '#ffcc00',
    tonoClaro: '#8a6d00',
  },
  marketing: {
    id: 'marketing',
    nombre: 'Marketing digital',
    descripcion: 'Estrategia, contenidos, campañas y medición con inteligencia artificial.',
    icono: 'M18 3v18l-8-4H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h3l8-4zm2 6h2v6h-2V9z',
    tono: '#ff7ab8',
    tonoClaro: '#be1b6d',
  },
  software: {
    id: 'software',
    nombre: 'Desarrollo de software',
    descripcion: 'Software a medida, ERP, apps y buenas prácticas de ingeniería.',
    icono: 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z',
    tono: '#b98cff',
    tonoClaro: '#6a0dad',
  },
};

/** Firma de los artículos: el equipo, no una persona inventada. */
export const autorBlog = {
  nombre: 'Equipo Excelsius',
  cargo: 'Ingenieros y especialistas en ejercicio',
  descripcion:
    'Escriben quienes desarrollan los proyectos y dictan los cursos: ingenieros de software, analistas de datos y especialistas en seguridad y marketing.',
} as const;

export const blog = {
  ruta: '/blog/',
  titulo: 'Blog',
  descripcion:
    'Artículos prácticos sobre seguridad y salud en el trabajo, Power BI, SQL, Python, marketing digital y desarrollo de software, escritos por el equipo de Excelsius.',
} as const;
