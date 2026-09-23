/**
 * Política de privacidad (`/politicas-privacidad/`). Es el texto legal que ya
 * estaba publicado en WordPress, reordenado en secciones con título para que
 * se pueda leer y citar, sin cambiar lo que dice: menciona a EXCELSIUS y
 * DIGITAL HOUSE como titulares del banco de datos y se apoya en la Ley 29733.
 */

export const privacidad = {
  titulo: 'Políticas de privacidad',
  acento: 'del uso de información del cliente',
  entradilla:
    'EXCELSIUS y DIGITAL HOUSE respetan y valoran su privacidad. Por eso establecimos esta política: para comunicarle qué información recopilamos sobre usted, cómo la usamos, la almacenamos y la divulgamos, de modo que pueda tomar una decisión informada sobre si comparte o no su información con nosotros.',
  actualizado: '2026-01-01',

  secciones: [
    {
      id: 'alcance',
      titulo: 'Alcance y cambios en esta política',
      parrafos: [
        'EXCELSIUS y DIGITAL HOUSE se reservan el derecho de revisar, modificar, agregar o eliminar las disposiciones de esta política de privacidad en cualquier momento.',
        'En caso de que lo hagamos, le notificaremos de acuerdo con las disposiciones de notificación de nuestros términos de servicio. Al continuar usando el sitio web después de recibir el aviso de la política de privacidad actualizada, usted reconoce que ha leído y comprendido la política revisada.',
      ],
    },
    {
      id: 'recopilacion',
      titulo: 'Qué información recopilamos y cómo',
      parrafos: [
        'EXCELSIUS y DIGITAL HOUSE recopilan su información cuando usted nos la envía directamente, al llenar formularios en el sitio web, en Facebook o en otras redes sociales, incluida cualquier solicitud que realice para nuestros servicios.',
        'También recopilamos información cuando usted navega por el sitio web y utiliza el software. Algunos de los métodos que empleamos para recopilar datos son automáticos y tienen efecto a medida que usted navega por el sitio web o por nuestras páginas y cuentas en las distintas redes sociales.',
      ],
    },
    {
      id: 'registro',
      titulo: 'Registro de datos personales',
      parrafos: [
        'El usuario que opte por suscribir alguno de nuestros formularios estará autorizando de forma libre, previa, inequívoca y expresa el tratamiento de sus datos personales en el banco de datos personales de EXCELSIUS y DIGITAL HOUSE.',
        'Asimismo, el usuario acepta que los datos personales proporcionados sean susceptibles de transferencia a empresas filiales o vinculadas al mismo grupo económico, sean estas empresas constituidas en el Perú o en el extranjero.',
      ],
      lista: {
        titulo: 'Los datos se utilizan para',
        items: [
          'Fines publicitarios, promocionales, de comunicaciones e información sobre los productos y servicios.',
          'Responder consultas acerca de productos y servicios.',
          'Envío de invitaciones a actividades convocadas por EXCELSIUS y DIGITAL HOUSE.',
          'Encuestas, historial de navegación, historial de hábitos y preferencias de consumo.',
          'Fines estadísticos y futuras compras que se realicen por este canal de comercialización.',
        ],
      },
    },
    {
      id: 'banco',
      titulo: 'Titularidad y confidencialidad del banco de datos',
      parrafos: [
        'EXCELSIUS y DIGITAL HOUSE son titulares del banco de datos personales en el cual se recopilan todos los datos brindados en el formulario dispuesto en el sitio www.excelsius.biz y en redes sociales.',
        'No traspasaremos, bajo ninguna modalidad y a ninguna empresa a la cual el usuario no haya dado consentimiento, los datos personales de los usuarios registrados en este sitio. La información recibida será manejada en forma absolutamente confidencial y conforme lo dispone la legislación vigente en el Perú.',
      ],
    },
    {
      id: 'derechos',
      titulo: 'Sus derechos sobre sus datos',
      parrafos: [
        'El usuario podrá ejercer los derechos de revocación reconocidos en la Ley N.° 29733, Ley de Protección de Datos Personales, frente a EXCELSIUS y DIGITAL HOUSE.',
        'Para ello, todas las comunicaciones que le hagamos llegar incluyen enlaces u opciones para actualizar sus preferencias o darse de baja, con la finalidad de no seguir recibiendo comunicaciones nuestras. También puede escribirnos directamente para solicitar el acceso, la rectificación, la cancelación o la oposición al tratamiento de sus datos.',
      ],
    },
    {
      id: 'seguridad',
      titulo: 'Protegemos su información desde cualquier dispositivo',
      parrafos: [
        'Puede tener la completa seguridad de que la información que nos provea será utilizada exclusivamente con el fin de brindarle información de nuestros productos y servicios.',
        'Además, es su decisión darse de baja de nuestro servicio informativo si así lo desea, en cualquier momento y sin necesidad de justificarlo.',
      ],
    },
  ],

  cierre: {
    titulo: 'Trabajamos por crear más confianza y satisfacción en nuestros clientes',
    texto:
      'Si tiene dudas sobre esta política, sobre qué datos suyos conservamos o quiere ejercer cualquiera de sus derechos, escríbanos: respondemos en horario de oficina.',
  },
} as const;
