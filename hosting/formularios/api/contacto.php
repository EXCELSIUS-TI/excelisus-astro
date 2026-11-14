<?php
// hosting/formularios/api/contacto.php — Recibe el formulario del sitio (components/ui/Formulario.astro)
// y lo envía a MAIL_TO (informes@excelsius.biz).
// Campos: nombre, empresa, correo, telefono, interes, mensaje, consentimiento,
//         origen (asunto de la página), pagina (ruta), website (honeypot).

require_once __DIR__ . '/config.php';

only_post();

$nombre   = sanitize_line((string)($_POST['nombre'] ?? ''), 80);
$empresa  = sanitize_line((string)($_POST['empresa'] ?? ''), 100);
$correo   = sanitize_line((string)($_POST['correo'] ?? ''), 120);
$telefono = sanitize_line((string)($_POST['telefono'] ?? ''), 30);
$interes  = sanitize_line((string)($_POST['interes'] ?? ''), 150);
$mensaje  = sanitize((string)($_POST['mensaje'] ?? ''), 3000);
$origen   = sanitize_line((string)($_POST['origen'] ?? 'Consulta desde la web'), 120);
$pagina   = sanitize_line((string)($_POST['pagina'] ?? ''), 200);
$consent  = isset($_POST['consentimiento']);

$errors = [];
if (mb_strlen($nombre) < 2)   $errors['nombre'] = 'Indica tu nombre.';
if (!is_valid_email($correo)) $errors['correo'] = 'Correo no válido.';
if ($telefono !== '' && strlen(preg_replace('/\D/', '', $telefono)) < 6) $errors['telefono'] = 'Teléfono no válido.';
if (mb_strlen($mensaje) < 5)  $errors['mensaje'] = 'Cuéntanos qué necesitas.';
if (!$consent)                $errors['consentimiento'] = 'Debes aceptar la política de privacidad.';
if ($errors) {
    json_response(422, ['ok' => false, 'error' => reset($errors), 'fields' => $errors]);
}

rate_limit('contacto');

$subject = SUBJECT_TAG . " {$origen} — {$nombre}" . ($empresa !== '' ? " ({$empresa})" : '');

$html = lead_email_html(
    $origen,
    $origen . ($pagina !== '' ? " · {$pagina}" : ''),
    [
        'Nombre'     => $nombre,
        'Empresa'    => $empresa,
        'Correo'     => $correo,
        'Teléfono'   => $telefono,
        'Me interesa'=> $interes,
        'Página'     => $pagina !== '' ? SITE_DOMAIN . $pagina : '',
    ],
    $mensaje,
    $correo,
    $telefono
);

$text = SUBJECT_TAG . " {$origen}\n\n"
    . "Fecha: " . date('d/m/Y H:i') . " (hora de Lima)\n"
    . "Página: " . ($pagina !== '' ? SITE_DOMAIN . $pagina : '-') . "\n\n"
    . "Nombre: {$nombre}\n"
    . "Empresa: " . ($empresa !== '' ? $empresa : '-') . "\n"
    . "Correo: {$correo}\n"
    . "Teléfono: " . ($telefono !== '' ? $telefono : '-') . "\n"
    . "Me interesa: " . ($interes !== '' ? $interes : '-') . "\n\n"
    . "Mensaje:\n{$mensaje}\n";

if (send_mail(MAIL_TO, $subject, $html, $text, $correo)) {
    json_response(200, ['ok' => true, 'message' => 'Mensaje enviado. Te responderemos en horario de oficina.']);
}

log_mail_error('contacto.php');
json_response(500, ['ok' => false, 'error' => 'No pudimos enviar tu mensaje. Escríbenos a ' . MAIL_TO . ' o por WhatsApp.']);
