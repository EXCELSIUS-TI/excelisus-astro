# -*- coding: utf-8 -*-
"""Auditoría del sitio construido: enlaces, recursos, encabezados y metadatos."""
import io
import os
import re
from collections import defaultdict

DIST = 'dist'
paginas = []
for base, _, archivos in os.walk(DIST):
    for a in archivos:
        if a.endswith('.html'):
            paginas.append(os.path.join(base, a))

def ruta_publica(p):
    r = p.replace('\\', '/').replace(DIST, '', 1)
    return r.replace('/index.html', '/') or '/'

def existe(destino):
    """¿Ese href apunta a algo que se publicó?"""
    d = destino.split('#')[0].split('?')[0]
    if not d or d == '/':
        return os.path.exists(os.path.join(DIST, 'index.html'))
    d = d.strip('/')
    return (
        os.path.exists(os.path.join(DIST, d))
        or os.path.exists(os.path.join(DIST, d, 'index.html'))
        or os.path.exists(os.path.join(DIST, d + '.html'))
    )

problemas = defaultdict(list)

for p in sorted(paginas):
    html = io.open(p, encoding='utf-8').read()
    pag = ruta_publica(p)

    # --- enlaces internos rotos ---
    for href in set(re.findall(r'href="(/[^"#][^"]*)"', html)):
        if href.startswith('//'):
            continue
        if not existe(href):
            problemas['enlaces rotos'].append(f'{pag} -> {href}')

    # --- recursos que no existen ---
    for src in set(re.findall(r'src="(/[^"]+)"', html)):
        destino = os.path.join(DIST, src.lstrip('/').split('?')[0])
        if not os.path.exists(destino):
            problemas['recursos ausentes'].append(f'{pag} -> {src}')

    # --- imágenes sin alt ---
    for img in re.findall(r'<img [^>]*>', html):
        if 'alt=' not in img:
            problemas['img sin alt'].append(f'{pag}: {img[:70]}')

    # --- encabezados ---
    h1 = re.findall(r'<h1[ >]', html)
    if len(h1) != 1:
        problemas['h1 por página'].append(f'{pag}: {len(h1)}')

    # --- id repetidos ---
    ids = re.findall(r' id="([^"]+)"', html)
    repes = {i for i in ids if ids.count(i) > 1}
    if repes:
        problemas['id repetidos'].append(f'{pag}: {sorted(repes)}')

    # --- metadatos ---
    for etiqueta, patron in (
        ('title', r'<title>([^<]*)</title>'),
        ('description', r'name="description" content="([^"]*)"'),
        ('canonical', r'rel="canonical" href="([^"]*)"'),
    ):
        m = re.search(patron, html)
        if not m or not m.group(1).strip():
            problemas[f'falta {etiqueta}'].append(pag)

    if 'property="og:image"' not in html:
        problemas['sin og:image'].append(pag)

    # --- longitud de title y description (SEO) ---
    t = re.search(r'<title>([^<]*)</title>', html)
    if t and len(t.group(1)) > 62:
        problemas['title largo (>62)'].append(f'{pag}: {len(t.group(1))}')
    d = re.search(r'name="description" content="([^"]*)"', html)
    if d and not (70 <= len(d.group(1)) <= 165):
        problemas['description fuera de 70-165'].append(f'{pag}: {len(d.group(1))}')

    # --- enlaces que abren fuera sin rel ---
    for a in re.findall(r'<a [^>]*target="_blank"[^>]*>', html):
        if 'rel=' not in a:
            problemas['target=_blank sin rel'].append(f'{pag}: {a[:70]}')

# --- recursos publicados que nadie usa ---
usados = set()
for p in paginas:
    html = io.open(p, encoding='utf-8').read()
    usados |= set(re.findall(r'(?:src|href)="(/img/[^"?]+)"', html))
    # og:image y twitter:image llegan como URL absoluta
    usados |= {m.replace('https://www.excelsius.biz', '')
               for m in re.findall(r'content="(https://www\.excelsius\.biz/img/[^"]+)"', html)}
    usados |= set(re.findall(r"url\((/img/[^)]+)\)", html))
for base, _, archivos in os.walk(os.path.join(DIST, 'img')):
    for a in archivos:
        ruta = os.path.join(base, a).replace('\\', '/').replace(DIST, '', 1)
        if ruta not in usados:
            problemas['imagen publicada sin usar'].append(ruta)

# los CSS también referencian imágenes
css = ''
for base, _, archivos in os.walk(os.path.join(DIST, '_astro')):
    for a in archivos:
        if a.endswith('.css'):
            css += io.open(os.path.join(base, a), encoding='utf-8').read()
problemas['imagen publicada sin usar'] = [
    r for r in problemas['imagen publicada sin usar'] if r not in css
]
if not problemas['imagen publicada sin usar']:
    del problemas['imagen publicada sin usar']

print('Páginas auditadas: %d\n' % len(paginas))
if not problemas:
    print('Sin hallazgos.')
for clave in sorted(problemas):
    print('## %s (%d)' % (clave, len(problemas[clave])))
    for linea in problemas[clave][:14]:
        print('   -', linea)
    if len(problemas[clave]) > 14:
        print('   ... y %d más' % (len(problemas[clave]) - 14))
    print()
