<?php
// public/api/testmail.php — Prueba de envío de correo en cPanel.
// Uso:  https://www.excelsius.biz/api/testmail.php?key=TU_CLAVE
//       → envía un mensaje de ejemplo a MAIL_TO (informes@excelsius.biz)
//         con el mismo diseño que los mensajes reales del formulario.
// La clave es TEST_KEY de config.php. Borra este archivo cuando termines de probar.

require_once __DIR__ . '/config.php';

if (!hash_equals(TEST_KEY, (string)($_GET['key'] ?? ''))) {
    json_response(403, ['ok' => false, 'error' => 'Falta la clave (?key=) o es incorrecta.']);
}

$subject = SUBJECT_TAG . ' [TEST] Prueba de correo — ' . date('d/m/Y H:i:s');

$html = lead_email_html(
    'Correo de PRUEBA — así se verán los mensajes del formulario',
    'testmail.php',
    [
        'Nombre'      => 'Contacto de prueba',
        'Empresa'     => 'Empresa de ejemplo S.A.C.',
        'Correo'      => MAIL_TO,
        'Teléfono'    => '+51 951 753 920',
        'Me interesa' => 'Desarrollo de software a medida',
        'Servidor'    => (string)($_SERVER['SERVER_NAME'] ?? '-'),
        'PHP'         => phpversion(),
    ],
    'Si ves este correo, mail() funciona en el hosting y los formularios de ' . SITE_DOMAIN . ' llegarán aquí.',
    '',
    ''
);

$text = SUBJECT_TAG . " Prueba de correo\n\n"
    . "Si recibes este mensaje, mail() funciona en el hosting.\n"
    . "Web: " . SITE_DOMAIN . "\nRemitente: " . MAIL_FROM . "\nPHP: " . phpversion() . "\n";

if (send_mail(MAIL_TO, $subject, $html, $text)) {
    json_response(200, [
        'ok' => true,
        'message' => 'Correo de prueba enviado a ' . MAIL_TO . '. Revisa la bandeja de entrada y la de SPAM.',
        'from' => MAIL_FROM,
        'date' => date('d/m/Y H:i:s'),
        'php' => phpversion(),
    ]);
}

log_mail_error('testmail.php');
json_response(500, [
    'ok' => false,
    'error' => 'mail() devolvió false: el servidor no aceptó el correo.',
    'hints' => [
        'Activa SPF y DKIM en cPanel > Email Deliverability',
        'Revisa cPanel > Track Delivery',
        'Si el hosting bloquea mail(), hay que pasar a SMTP con PHPMailer',
    ],
]);
