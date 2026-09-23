# -*- coding: utf-8 -*-
"""
Genera las tarjetas de 1200 × 630 que se ven al compartir un curso o un
artículo del blog (estos, leídos del frontmatter de `src/content/blog/`).

Lee los cursos de `src/data/cursos.ts` —slug, título, paleta y foto— para no
mantener la lista en dos sitios, y compone cada tarjeta con el color de su
paleta, su foto si la tiene y la marca. Se ejecuta a mano cuando cambian los
cursos o sus imágenes:

    python scripts/og.py

Salen en PNG a propósito: WhatsApp no previsualiza WebP de forma fiable.
"""
import io
import os
import re

from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
DESTINO = 'public/img/og'
ARIMO = 'public/fonts/Arimo-Variable.ttf'
MONO = 'public/fonts/IBMPlexMono-Medium.ttf'

# mismo criterio que `[data-paleta]` en global.css: estructural y acento
PALETAS = {
    'azul': ((4, 48, 207), (94, 211, 255)),
    'naranja': ((255, 141, 0), (255, 199, 0)),
    'violeta': ((122, 31, 162), (255, 158, 44)),
    'indigo': ((33, 28, 81), (255, 199, 0)),
    'python': ((55, 118, 171), (255, 212, 59)),
    'powerbi': ((200, 126, 14), (242, 200, 17)),
    'sqlserver': ((169, 29, 34), (242, 85, 74)),
    'calida': ((122, 31, 162), (255, 158, 44)),
}


def cursos_del_catalogo():
    """Saca slug, título, paleta y foto de cada curso del archivo de datos."""
    fuente = io.open('src/data/cursos.ts', encoding='utf-8').read()
    bloques = fuente.split("    slug: '")[1:]
    for b in bloques:
        slug = b[: b.index("'")]
        def campo(nombre):
            m = re.search(r"\n    %s:\s*\n?\s*'([^']+)'" % nombre, b[:4000])
            return m.group(1) if m else None
        yield {
            'slug': slug,
            # `tituloSeo` es el nombre corto: en una tarjeta cabe entero
            'titulo': campo('tituloSeo') or campo('titulo') or slug,
            'subtitulo': campo('subtitulo') or '',
            'paleta': campo('paleta') or 'azul',
            'foto': campo('imagen'),
        }


def envolver(texto, fuente, ancho, dibujo):
    """Parte el título en líneas que quepan en `ancho`."""
    palabras, lineas, actual = texto.split(), [], ''
    for p in palabras:
        prueba = f'{actual} {p}'.strip()
        if dibujo.textlength(prueba, font=fuente) <= ancho:
            actual = prueba
        else:
            if actual:
                lineas.append(actual)
            actual = p
    if actual:
        lineas.append(actual)
    return lineas[:3]


def tarjeta(curso):
    estructural, acento = PALETAS.get(curso['paleta'], PALETAS['azul'])
    fondo = Image.new('RGB', (W, H), (5, 7, 15))

    # la foto del curso ocupa la derecha, difuminada hacia el texto
    if curso['foto']:
        ruta = 'public' + curso['foto']
        if os.path.exists(ruta):
            foto = Image.open(ruta).convert('RGB')
            escala = max(W / foto.width, H / foto.height)
            foto = foto.resize((round(foto.width * escala), round(foto.height * escala)), Image.LANCZOS)
            izq = (foto.width - W) // 2
            arr = (foto.height - H) // 2
            fondo = foto.crop((izq, arr, izq + W, arr + H))

    # resplandor del color de la paleta
    brillo = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(brillo)
    d.ellipse([W * 0.78 - 430, H * 0.25 - 430, W * 0.78 + 430, H * 0.25 + 430], fill=150)
    brillo = brillo.filter(ImageFilter.GaussianBlur(190))
    fondo = Image.composite(Image.new('RGB', (W, H), estructural), fondo, brillo)

    # velo para que el texto se lea sobre cualquier foto
    velo = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(velo)
    for x in range(W):
        alfa = int(232 * max(0.0, 1 - (x / (W * 0.82)) ** 1.5))
        d.line([(x, 0), (x, H)], fill=(4, 6, 14, alfa))
    fondo = Image.alpha_composite(fondo.convert('RGBA'), velo).convert('RGB')

    d = ImageDraw.Draw(fondo)
    f_titulo = ImageFont.truetype(ARIMO, 62)
    f_sub = ImageFont.truetype(ARIMO, 27)
    f_hud = ImageFont.truetype(MONO, 20)
    f_marca = ImageFont.truetype(ARIMO, 30)

    iso = Image.open('public/favicon.png').convert('RGBA').resize((52, 52), Image.LANCZOS)
    fondo.paste(iso, (72, 62), iso)
    d.text((140, 76), 'EXCELSIUS', font=f_marca, fill=(233, 237, 247))

    d.text((72, 160), 'CURSO EN VIVO', font=f_hud, fill=acento)

    y = 206
    for linea in envolver(curso['titulo'].upper(), f_titulo, 690, d):
        d.text((72, y), linea, font=f_titulo, fill=(255, 255, 255))
        y += 74

    if curso['subtitulo']:
        d.text((72, y + 14), curso['subtitulo'], font=f_sub, fill=(190, 200, 220))

    d.line([(72, 524), (700, 524)], fill=acento, width=2)
    d.text((72, 552), 'excelsius.biz · Certificación por horas académicas',
           font=f_hud, fill=(150, 160, 182))

    os.makedirs(DESTINO, exist_ok=True)
    # JPEG: una fotografía en PNG pesa medio mega y estas imágenes las
    # descarga cada red social en cada vista previa
    salida = os.path.join(DESTINO, curso['slug'] + '.jpg')
    fondo.save(salida, 'JPEG', quality=86, optimize=True, progressive=True)
    return salida, os.path.getsize(salida)


# ---------------------------------------------------------------- blog
# Paleta de /curso-sst-1/: morado de base, naranja y amarillo de acento, y
# el tono de cada categoría (el mismo de `src/data/blog.ts`).
SST_MORADO = (106, 13, 173)
SST_NARANJA = (255, 102, 0)
SST_AMARILLO = (255, 204, 0)
TONOS_BLOG = {
    'seguridad': ((255, 102, 0), 'SEGURIDAD Y SALUD'),
    'datos': ((255, 204, 0), 'DATOS Y BI'),
    'marketing': ((255, 122, 184), 'MARKETING DIGITAL'),
    'software': ((185, 140, 255), 'DESARROLLO DE SOFTWARE'),
}


def articulos_del_blog():
    """Lee slug, título y categoría del frontmatter de cada artículo."""
    carpeta = 'src/content/blog'
    for nombre in sorted(os.listdir(carpeta)):
        if not nombre.endswith('.md'):
            continue
        texto = io.open(os.path.join(carpeta, nombre), encoding='utf-8').read()
        cabecera = texto.split('---', 2)[1]
        def campo(clave):
            m = re.search(r"""^%s:\s*['"]?(.+?)['"]?\s*$""" % clave, cabecera, re.M)
            return m.group(1) if m else None
        if campo('borrador') == 'true':
            continue
        yield {
            'slug': nombre[:-3],
            'titulo': campo('tituloSeo') or campo('titulo'),
            'categoria': campo('categoria') or 'software',
        }


def tarjeta_blog(art):
    tono, nombre_cat = TONOS_BLOG.get(art['categoria'], TONOS_BLOG['software'])
    fondo = Image.new('RGB', (W, H), (10, 5, 20))

    # dos resplandores: el morado de la marca SST y el tono de la categoría
    for (cx, cy, r, color, fuerza) in (
        (W * 0.85, H * 0.2, 460, SST_MORADO, 200),
        (W * 0.62, H * 1.0, 360, tono, 120),
    ):
        brillo = Image.new('L', (W, H), 0)
        ImageDraw.Draw(brillo).ellipse([cx - r, cy - r, cx + r, cy + r], fill=fuerza)
        brillo = brillo.filter(ImageFilter.GaussianBlur(170))
        fondo = Image.composite(Image.new('RGB', (W, H), color), fondo, brillo)

    d = ImageDraw.Draw(fondo)
    # retícula de puntos, como la cubierta del sitio
    for x in range(36, W, 28):
        for y in range(36, H, 28):
            d.point((x, y), fill=(70, 50, 100))

    f_titulo = ImageFont.truetype(ARIMO, 58)
    f_hud = ImageFont.truetype(MONO, 20)
    f_marca = ImageFont.truetype(ARIMO, 30)

    iso = Image.open('public/favicon.png').convert('RGBA')
    chico = iso.resize((52, 52), Image.LANCZOS)
    fondo.paste(chico, (72, 62), chico)
    d.text((140, 76), 'EXCELSIUS', font=f_marca, fill=(240, 234, 250))

    # isotipo grande y tenue a la derecha
    grande = iso.resize((300, 300), Image.LANCZOS)
    alfa = grande.getchannel('A').point(lambda a: int(a * 0.22))
    grande.putalpha(alfa)
    fondo.paste(grande, (W - 380, 150), grande)

    d.rectangle([72, 164, 72 + d.textlength(nombre_cat, font=f_hud) + 28, 198], outline=tono, width=2)
    d.text((86, 168), nombre_cat, font=f_hud, fill=tono)

    y = 236
    for linea in envolver(art['titulo'], f_titulo, 760, d):
        d.text((72, y), linea, font=f_titulo, fill=(255, 255, 255))
        y += 70

    d.line([(72, 524), (430, 524)], fill=SST_NARANJA, width=3)
    d.line([(430, 524), (700, 524)], fill=SST_AMARILLO, width=3)
    d.text((72, 552), 'excelsius.biz/blog  ·  $ cat %s.md' % art['slug'][:34],
           font=f_hud, fill=(170, 160, 190))

    destino = os.path.join(DESTINO, 'blog')
    os.makedirs(destino, exist_ok=True)
    salida = os.path.join(destino, art['slug'] + '.jpg')
    fondo.save(salida, 'JPEG', quality=86, optimize=True, progressive=True)
    return salida, os.path.getsize(salida)


if __name__ == '__main__':
    for c in cursos_del_catalogo():
        ruta, peso = tarjeta(c)
        print('%-70s %5d kB' % (ruta, peso / 1024))
    for a in articulos_del_blog():
        ruta, peso = tarjeta_blog(a)
        print('%-70s %5d kB' % (ruta, peso / 1024))
