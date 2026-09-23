/**
 * Logotipos de las tecnologías del stack. Cada marca vive en
 * `public/img/stack/<archivo>.svg`, con su color oficial ya aplicado: se
 * sirven como archivo y no incrustados porque los trazos suman decenas de kB
 * y varias tecnologías se repiten entre servicios. Los vectores vienen de
 * simple-icons (CC0) y se usan de forma descriptiva.
 *
 * Lo que no tiene logotipo propio —REST, Microsoft Fabric, SUNAT— no entra en
 * el mapa: esa etiqueta se muestra solo con su texto.
 */
const archivos: Record<string, string> = {
  '.NET': 'dotnet',
  'Node.js': 'nodedotjs',
  'React': 'react',
  'React Native': 'react',
  'Astro': 'astro',
  'SQL Server': 'microsoftsqlserver',
  'PostgreSQL': 'postgresql',
  'Flutter': 'flutter',
  'Firebase': 'firebase',
  'WordPress': 'wordpress',
  'Tailwind': 'tailwindcss',
  'GA4': 'googleanalytics',
  'Power BI': 'powerbi',
  'Azure': 'microsoftazure',
  'Azure ML': 'microsoftazure',
  'Python': 'python',
  'scikit-learn': 'scikitlearn',
  'Pandas': 'pandas',
  'Odoo': 'odoo',
  'Excel': 'microsoftexcel',
  'VBA': 'microsoftexcel',
  'Moodle': 'moodle',
  'WooCommerce': 'woocommerce',
  'Android': 'android',
  'iOS': 'apple',
  'Docker': 'docker',
  'MySQL': 'mysql',
  'PHP': 'php',
  'TypeScript': 'typescript',
  'Next.js': 'nextdotjs',
  'AWS': 'amazonwebservices',
  'Cloudflare': 'cloudflare',
};

/** Ruta del logotipo de una tecnología, si lo tiene. */
export const logoStack = (tecnologia: string): string | undefined => {
  const archivo = archivos[tecnologia];
  return archivo ? `/img/stack/${archivo}.svg` : undefined;
};
