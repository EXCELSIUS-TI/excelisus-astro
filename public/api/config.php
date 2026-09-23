<?php
// public/api/config.php — Configuración central del envío de correos en cPanel.
// Astro lo copia a dist/api/config.php en cada build (carpeta public/).
// Mismo patrón que tfgtfmasesores: mail() nativo del hosting, sin contraseñas.

// ====== CORREO ======
// Un solo correo para todo: los mensajes del formulario y la prueba llegan aquí,
// y también salen desde aquí (así pasan SPF/DKIM del dominio excelsius.biz).
define('MAIL_TO', 'informes@excelsius.biz');
define('MAIL_FROM', MAIL_TO);
define('MAIL_FROM_NAME', 'Web EXCELSIUS');

// ====== ETIQUETA DE LA WEB ======
define('SITE_URL', 'https://www.excelsius.biz');
define('SITE_DOMAIN', 'www.excelsius.biz');
define('SITE_NAME', 'EXCELSIUS');
define('SUBJECT_TAG', '[EXCELSIUS · excelsius.biz]');

// ====== SEGURIDAD ======
define('HONEYPOT_FIELD', 'website'); // campo trampa anti-spam (un humano no lo ve ni lo llena)
define('ENABLE_RATE_LIMIT', true);    // 1 envío cada 30 s por IP
// Clave para usar testmail.php: https://www.excelsius.biz/api/testmail.php?key=...
// Cámbiala antes de subir; sin ella cualquiera podría usar el script para enviar correos.
define('TEST_KEY', 'cambia-esta-clave');

date_default_timezone_set('America/Lima');

function sanitize(string $v, int $max = 300): string {
    // Los navegadores envían UTF-8; si llega otra codificación se asume Windows-1252.
    if (!mb_check_encoding($v, 'UTF-8')) $v = mb_convert_encoding($v, 'UTF-8', 'Windows-1252');
    $v = trim(strip_tags($v));
    if (mb_strlen($v) > $max) $v = mb_substr($v, 0, $max);
    return $v;
}

/** Igual que sanitize() pero en una sola línea: evita inyección de cabeceras en el asunto. */
function sanitize_line(string $v, int $max = 200): string {
    return preg_replace('/[\r\n]+/', ' ', sanitize($v, $max));
}

function e(string $v): string {
    return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
}

function is_valid_email(string $email): bool {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function json_response(int $code, array $payload): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function only_post(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        json_response(405, ['ok' => false, 'error' => 'Método no permitido.']);
    }
    // Honeypot: si un bot llenó el campo oculto, se finge éxito y no se envía nada.
    if (!empty($_POST[HONEYPOT_FIELD] ?? '')) {
        json_response(200, ['ok' => true, 'message' => 'Mensaje recibido.']);
    }
}

/** Se llama después de validar: quien corrige un dato mal escrito no queda bloqueado. */
function rate_limit(string $form): void {
    if (!ENABLE_RATE_LIMIT) return;
    $lock = sys_get_temp_dir() . '/excelsius_' . $form . '_' . md5($_SERVER['REMOTE_ADDR'] ?? '0') . '.lock';
    if (is_file($lock) && (time() - (int)filemtime($lock)) < 30) {
        json_response(429, ['ok' => false, 'error' => 'Espera unos segundos antes de enviar otro mensaje.']);
    }
    @touch($lock);
}

/** Enlace de WhatsApp para responder. Sin prefijo, un celular de 9 cifras que empieza en 9 se asume de Perú (+51). */
function whatsapp_link(string $phone): string {
    $digits = preg_replace('/\D/', '', $phone);
    if (strlen($digits) === 9 && $digits[0] === '9') $digits = '51' . $digits;
    return strlen($digits) >= 10 ? 'https://wa.me/' . $digits : '';
}

/**
 * Correo con los colores de la web: azul #0430cf, azul oscuro #021a73 y celeste #5ED3FF.
 *
 * @param array<string,string> $rows  Etiqueta => valor (los vacíos se omiten)
 */
function lead_email_html(string $title, string $source, array $rows, string $message, string $email, string $phone): string {
    $row = fn(string $k, string $v) => $v === '' ? '' :
        '<tr><td style="padding:9px 16px;color:#5b6278;font-size:13px;width:34%;vertical-align:top">' . e($k) . '</td>'
        . '<td style="padding:9px 16px;color:#0b1024;font-size:14px;font-weight:600">' . nl2br(e($v)) . '</td></tr>';

    $buttons = '';
    if ($email !== '') {
        $buttons .= '<a href="mailto:' . e($email) . '" style="display:inline-block;margin:0 8px 8px 0;background:#0430cf;color:#fff;text-decoration:none;font-weight:700;padding:11px 20px;border-radius:4px;font-size:14px">Responder por correo</a>';
    }
    $wa = whatsapp_link($phone);
    if ($wa !== '') {
        $buttons .= '<a href="' . e($wa) . '" style="display:inline-block;margin:0 8px 8px 0;background:#25D366;color:#0b1024;text-decoration:none;font-weight:700;padding:11px 20px;border-radius:4px;font-size:14px">Escribir por WhatsApp</a>';
    }

    $messageHtml = $message === '' ? '' :
        '<div style="padding:4px 24px 12px"><div style="font-size:12px;color:#5b6278;text-transform:uppercase;font-weight:700;letter-spacing:.06em">Mensaje</div>'
        . '<div style="margin-top:8px;background:#f2f5ff;border-left:4px solid #5ED3FF;padding:12px 14px;color:#0b1024;font-size:14px;line-height:1.6">' . nl2br(e($message)) . '</div></div>';

    return '
<div style="background:#eef1f8;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
<div style="max-width:620px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #dfe4f2">
  <div style="background:#5ED3FF;color:#021a73;padding:8px 24px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">
    Mensaje desde la web · ' . e(SITE_DOMAIN) . '
  </div>
  <div style="background:#021a73;padding:20px 24px">
    <div style="font-size:22px;font-weight:700;letter-spacing:.04em;color:#fff">' . e(SITE_NAME) . ' <span style="color:#5ED3FF">·</span> <span style="font-size:14px;font-weight:400;color:#c9d4ff">' . e(SITE_DOMAIN) . '</span></div>
    <div style="margin-top:6px;font-size:15px;color:#5ED3FF;font-weight:700">' . e($title) . '</div>
  </div>
  <table style="width:100%;border-collapse:collapse;margin:10px 0">' . implode('', array_map($row, array_keys($rows), $rows)) . '</table>
  ' . $messageHtml . '
  <div style="padding:8px 24px 18px">' . $buttons . '</div>
  <div style="background:#f2f5ff;padding:12px 24px;font-size:12px;color:#5b6278;border-top:1px solid #dfe4f2">
    Formulario: <strong>' . e($source) . '</strong> · ' . e(date('d/m/Y H:i')) . ' (hora de Lima)<br>
    Enviado desde <a href="' . e(SITE_URL) . '" style="color:#0430cf">' . e(SITE_DOMAIN) . '</a>
  </div>
</div>
</div>';
}

/** Envía HTML + texto plano con mail(). Devuelve si el servidor lo aceptó. */
function send_mail(string $to, string $subject, string $html, string $text, string $replyTo = ''): bool {
    $alt = 'alt-' . md5(uniqid((string)mt_rand(), true));

    $headers  = 'From: =?UTF-8?B?' . base64_encode(MAIL_FROM_NAME) . '?= <' . MAIL_FROM . ">\r\n";
    $headers .= 'Reply-To: ' . ($replyTo !== '' && is_valid_email($replyTo) ? $replyTo : MAIL_FROM) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"$alt\"\r\n";

    $body  = "--$alt\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($text)) . "\r\n";
    $body .= "--$alt\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($html)) . "\r\n";
    $body .= "--$alt--";

    return @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers, '-f' . MAIL_FROM);
}

function log_mail_error(string $script): void {
    @file_put_contents(
        sys_get_temp_dir() . '/excelsius_mail_errors.log',
        '[' . date('c') . "] FAIL $script to " . MAIL_TO . ' | ' . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\n",
        FILE_APPEND
    );
}
