# Portafolio Trama 23 — sitio web

Sitio de una sola página, HTML + CSS + JavaScript estándar. Sin frameworks,
sin compilación, sin dependencias que instalar. Se abre con doble clic y se
publica subiendo la carpeta tal cual.

## Estructura

```
index.html        Estructura y contenido del sitio
styles.css        Todos los estilos (paleta, tipografía, animaciones, responsive)
script.js         Comportamiento: apariciones, contadores, visor, formulario
fonts/            Birdie, ED Lavonia y TT Interphases Pro Mono (woff2)
img/              33 fotos del portafolio y de los casos (WebP)
videos/           3 videos de los coaches + 4 reels de clientes (MP4 H.264)
                  con su portada (PNG / JPG)
```

## Cómo está armado el HTML

- Los estilos van **en atributos `style`** dentro de cada elemento, no en un
  archivo CSS aparte. Lo único que vive en el `<style>` del `<head>` son los
  resets, los enlaces, la animación del marquee y `[hidden]`.
- Las fuentes viven en `fonts/` como woff2, declaradas con `@font-face`
  (no hay dependencia de Google Fonts): **Birdie** (titulares, versalitas),
  **TT Interphases Pro Mono** (texto, etiquetas, cifras y títulos intermedios)
  y **ED Lavonia** (script, para los fragmentos destacados y los rubros).
- **Birdie no tiene acentos ni eñe**: mapea á→a, ñ→n. Por eso todo texto con
  acento va en Lavonia o en Interphases, nunca en Birdie. Antes de poner una
  frase nueva en Birdie, revisa que no lleve tildes ni ñ.
- Ajuste tipográfico: interletrado e interlineado apretados en todo el sitio
  (titulares `line-height:.92` / `letter-spacing:-.045em`; texto `1.3`;
  etiquetas en mayúsculas `letter-spacing:.05em`).
- Los titulares combinan mayúsculas y cursiva dentro de la misma frase: la
  parte en versal va con `text-transform:uppercase` y la cursiva con
  `font-style:italic;font-weight:500`.
- Paleta (29 sep 2026), regla 80 · 15 · 5:
  80% marfil `#F7F4DF` + espresso `#26150B` · 15% granate `#7D2027` ·
  5% lima `#E3F272`, tinta `#34427A` y coral `#EA6D57`.
  Apoyos: marfil profundo `#EEE9C8`, granate oscuro `#5C171C`, espresso
  profundo `#170C05`, y claros de tinta, lima y coral para notas.
- La lima nunca va como texto sobre marfil (1.1:1). Va de fondo (resaltador,
  cinta superior, stickers, sobre) o como texto sobre espresso, tinta o granate.
- El coral no va en texto chico sobre claro; los scripts de titulares van en
  granate y las notas a mano en tinta.
- Stickers y sellos con borde de tijera de zigzag (clase `.zigzag`).

## Diseño (versión collage, septiembre 2026)

El sitio se genera con `build.py` (en la carpeta de trabajo de Claude): todo el
contenido vive en listas de datos y el script escribe `index.html`. Así, cambiar
la interfaz no pierde fotos ni videos: al final del build se verifica que cada
archivo de `img/` y `videos/` siga referenciado.

- Lenguaje visual: scrapbook de estudio. Papel arrugado, polaroids con cinta
  washi, chinchetas y clips, notas adhesivas, etiquetas de papel rasgado,
  hoja de cuaderno, garabatos a mano, botones y costura (la "trama").
- Texturas propias en `textures/` (generadas, sin derechos de terceros).
- Animaciones: aparición al hacer scroll (caer, sellar, deslizar), garabatos
  que se dibujan solos, hilo que se cose, contadores en las cifras, paralaje
  en el collage de portada, cintas en movimiento, sticker giratorio, sobre que
  se abre en Contacto. Todo se desactiva con "reducir movimiento".
- Birdie no tiene acentos ni eñe: la función `D()` del build rechaza cualquier
  texto con tilde para que nunca llegue a pantalla sin acento.

## Secciones (en orden)

1. Portada con collage
2. Lo que se trama (manifiesto en hoja de cuaderno)
3. Sobre mí
4. Servicios (5 fichas) + paquetes integrales + adicionales (sin precios)
5. Casos de éxito + "Conoce a tus coaches"
6. Portafolio por rubro — 7 rubros × 5 piezas, con visor
7. Video — 4 reels
8. Testimonio
9. Contacto

## Pendientes

- **El formulario no envía nada**: solo muestra el mensaje de gracias. Si se
  quiere que llegue de verdad, hay que conectarlo a un servicio de formularios
  o a un backend (ver `#enviarMensaje` en el script).
## Cómo agregar otro reel

1. Comprime el archivo a MP4 H.264, 1080 × 1920, audio AAC:
   `ffmpeg -i original.MOV -vf scale=1080:1920 -c:v libx264 -crf 24 -c:a aac -b:a 128k -movflags +faststart videos/trama-video-nuevo.mp4`
2. Saca una portada: `ffmpeg -ss 3 -i videos/trama-video-nuevo.mp4 -frames:v 1 videos/poster-nuevo.jpg`
3. Duplica un `<article>` de la sección `#video` y cambia `src`, `poster`,
   el número, el cliente, el título y la descripción.
