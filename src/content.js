// WIREFRAME · aquí se llena todo, poco a poco. Nada más hay que tocar.
//
// Cada sección del navbar tiene `tiles` (cuadros del bento). Al tocar un cuadro, crece y los demás se
// mueven a un lado. Un tile:  { title, cls, big, sub, blocks: [...] }
//   cls    → 'accent' | 'alt' | 'bronze' + tamaño 'w2' (2 col) | 'w4' (fila completa) | 'h2' (2 filas)
//   big    → texto grande del cuadro cerrado   ·  sub → texto pequeño
//   blocks → lo que se ve al abrirlo, en orden:
//     { t: 'text',  text }
//     { t: 'stats', items: [{ v: '43', l: 'especies' }] }
//     { t: 'steps', items: [{ title, text }] }          (se tocan y se resaltan)
//     { t: 'cards', items: [{ title, text }] }          (tarjetas que se tocan y crecen)
//     { t: 'slot',  kind: 'image'|'video'|'app'|'anim'|'map', hint, src }
//         src vacío = caja punteada con la nota «hint»; pon la ruta (p. ej. '/media/rana.jpg') y aparece.
//     { t: 'growth' }                                   (tarjetas de crecimiento animadas)
//     { t: 'todo', text }                               (nota visible de lo que falta)
// Lo que dice ⟦…⟧ es un hueco por completar.

export const DOWNLOAD_URL = '#';

// Texto de «¿Qué es Anura?» (borrador: el original llegó cortado)
export const ABOUT =
  'ANURA es una aplicación móvil para identificar ranas y sapos de Colombia con la cámara del celular, y para organizar la información de cada especie por zona. Funciona sin conexión.';

// Capturas de la app (baraja de «¿Qué es Anura?»). Archivos en web/public/media/app/. Se navegan en este orden.
export const CAPTURAS = [
  { src: '/media/app/1.jpeg', title: 'Bienvenida', text: 'Conoce sobre anuros: crear cuenta o entrar.' },
  { src: '/media/app/home.jpeg', title: 'Inicio', text: 'Rana del día, Paso a paso, Foto ID y Audio ID.' },
  { src: '/media/app/pq.jpeg', title: 'Paquetes', text: 'Descargas el paquete y sigues sin señal; la foto se analiza cuando vuelva.' },
  { src: '/media/app/foto.jpeg', title: 'Tomar la foto', text: 'Paso a paso: fotos de la rana para identificarla.' },
  { src: '/media/app/analisando.jpeg', title: 'Analizando', text: 'Compara con las referencias del paquete, en el teléfono y sin conexión.' },
  { src: '/media/app/result.jpeg', title: 'Resultado', text: 'La especie más probable con su porcentaje y otras candidatas.' },
];

// Dona de «El mundo en cifras»: valor medio del rango por país (anfibios, aprox.); el resto completa 9 001.
const TOP = [['Brasil', 1178], ['Colombia', 911], ['Ecuador', 688], ['Perú', 673], ['China', 603], ['India', 453], ['Papúa Nueva Guinea', 428], ['México', 423], ['Madagascar', 413], ['Indonesia', 393]];
export const WORLD = { total: 9001, label: 'especies de anuros', parts: [...TOP, ['Resto del mundo', 9001 - TOP.reduce((s, [, n]) => s + n, 0)]] };

// Galería (abanico de cartas). Foto al frente; al tocarla se voltea (nombre, tamaño) y al tocarla otra vez crece (dónde vive, dato curioso).
// tam = [mín, máx] en cm.
const FICHAS = [
  { name: 'Dendrobates truncatus', src: '/media/galeria/dendrobates-truncatus.jpg', comun: 'Rana dardo amarilla', tam: [2.5, 3.2], vive: 'Valle del Magdalena', curioso: 'Su veneno viene de lo que come.' },
  { name: 'Dendropsophus bogerti', src: '/media/galeria/dendropsophus-bogerti.png', comun: 'Rana de lluvia de Bogert', tam: [2.8, 3.5], vive: 'Cordillera Central', curioso: 'Canta en coro cuando llueve.' },
  { name: 'Pristimantis paisa', src: '/media/galeria/pristimantis-paisa.jpg', comun: 'Rana de lluvia paisa', tam: [1.8, 2.6], vive: 'Bosques de niebla', curioso: 'No tiene renacuajo.' },
  { name: 'Sachatamia electrops', src: '/media/galeria/sachatamia-electrops.png', comun: 'Rana de cristal verde', tam: [2.0, 2.8], vive: 'Quebradas andinas', curioso: 'Se le ve el corazón latir.' },
];

// Ciencia ciudadana: 64,3 % de las observaciones. Se cuenta en décimas (643) para que el contador suba con decimal.
export const CIUDADANA = { total: 643, label: 'ciencia ciudadana', colors: ['#1F7A33', 'rgba(255,255,255,.6)'], fmt: (n) => `${(n / 10).toFixed(1).replace('.', ',')}%`, parts: [['Ciencia ciudadana', 643], ['Resto', 357]] };

// Anillo: blanco = Brasil (13,1 %), dorado = Colombia (911 de 9 001 = 10,1 %), resto translúcido.
export const RING = 'conic-gradient(#FBFCFA 0 13.1%, #CDA75E 13.1% 23.22%, rgba(251,252,250,.22) 23.22% 100%)';

export const SECTIONS_CONTENT = {
  animales: [
    {
      title: 'El mundo en cifras', cls: 'accent w2 h2 has-vis', big: '9 001', sub: 'especies de anuros en el mundo', ring: RING,
      head: 'Colombia, segundo país del mundo en anuros',
      text: 'Colombia es el segundo país con mayor biodiversidad en anuros del mundo.',
      source: 'Colombia: 911 especies registradas; otros países, valor medio del rango (aprox.)',
      blocks: [{ t: 'mundo' }],
    },
    {
      title: 'Bioindicadores', cls: 'w2', big: 'Si faltan, algo pasa', sub: 'termómetro del ambiente',
      head: 'Si faltan, algo pasa', text: 'Son bioindicadores: nos dicen si el ambiente está sano.',
      blocks: [{ t: 'bio', src: '/media/galeria/boana-punctata.jpg', name: 'Boana punctata' }],
    },
    {
      title: 'Tú puedes ayudar', cls: 'alt w2 noscroll', big: 'Ciencia ciudadana', img: '/media/galeria/ayuda.png',
      head: 'Ciencia ciudadana', text: 'Las fotos que sube la gente ayudan a catalogar especies.',
      blocks: [{ t: 'ayuda', src: '/media/galeria/captura.jpeg' }],
    },
    {
      title: 'Registros en iNaturalist', cls: 'bronze w4', big: '596 de 911 especies',
      head: '596 de 911 especies con registros',
      text: 'Especies colombianas de anuros con al menos un registro público en iNaturalist.',
      blocks: [{ t: 'inat' }],
    },
    {
      title: 'Galería', cls: 'w4', sub: 'toca para ver', img: '/media/galeria/rana.png',
      head: 'Toca una carta',
      blocks: [{ t: 'fan', items: FICHAS }],
    },
  ],

  app: [
    {
      title: 'Paquetes por zona', cls: 'accent w2 h2 noscroll', sub: 'Android', folder: true,
      nav: [{ pos: 'left', label: 'Identificar', to: 2 }, { pos: 'br', label: 'Sin internet', to: 1 }],
      head: 'Descargas tu zona y sigues sin señal',
      text: 'Descarga el paquete de tu zona, actívalo para identificar sin conexión y elimínalo cuando ya no lo necesites.',
      todo: ['Hay un paquete por subregión (Sabanas: 4,47 MB). El «paquete por país, 102 MB» de la app es la suma: corregir ese texto o captura'],
      blocks: [{ t: 'paquetes', src: '/media/app/pq.jpeg' }],
    },
    {
      title: 'Sin internet', cls: 'w2 noscroll', big: 'Funciona sin señal', sub: 'toca para ver cómo', airplane: true,
      head: 'Funciona sin señal',
      text: 'Compara con las referencias del paquete, en el teléfono y sin conexión. En muchas zonas donde viven no hay señal.',
      blocks: [{ t: 'avion', src: '/media/app/analisando.jpeg' }],
    },
    {
      title: 'Identificar', cls: 'noscroll', big: 'Foto → resultado', sub: 'solo foto o paso a paso',
      nav: [{ pos: 'br', label: 'Contexto', to: 4 }],
      head: 'Foto → resultado',
      blocks: [{ t: 'identificar' }],
    },
    {
      title: 'Metadatos', cls: 'noscroll', big: '4 pistas', sub: 'el paquete afina la respuesta', box: true,
      head: '4 pistas afinan la respuesta', text: 'El contexto ajusta el puntaje de cada candidata.',
      blocks: [{ t: 'metadatos' }],
    },
    {
      title: 'Contexto: lugar, sustrato, altura y clima', cls: 'bronze w4 noscroll', big: 'El lugar ayuda a acertar',
      head: 'El lugar ayuda a acertar', text: 'Dos especies que se confunden en la foto; el contexto desempata.',
      blocks: [{ t: 'duelo' }],
    },
  ],

  admin: [
    {
      title: 'Consulta de fotos', cls: 'accent w2 h2 noscroll', big: '596 de 911', sub: 'especies con registros públicos',
      head: 'Consultamos antes de entrenar', text: 'Consultamos iNaturalist y GBIF antes de entrenar.',
      blocks: [{ t: 'consulta' }],
    },
    {
      title: 'Especies', cls: 'noscroll', big: '43', sub: '34 con paquete',
      head: 'Especies con paquete', text: 'De las 43 que reconoce la app.',
      blocks: [{ t: 'ring', value: 34, total: 43, label: 'con paquete', sub: 'de 43 especies' }],
    },
    {
      title: 'Fotos con vector', cls: 'noscroll', big: '12 209', sub: 'cada foto, un vector',
      head: '12 209 fotos con vector', text: 'Cada foto se convierte en un vector para compararla.',
      blocks: [{ t: 'fotosvec' }],
    },
    {
      title: 'Ciclo del modelo', cls: 'w2 noscroll', big: 'Conseguir → Limpiar → Procesar → Resultado', sub: 'toca una etapa',
      head: 'Ciclo del modelo',
      blocks: [{ t: 'ciclo' }],
    },
    {
      title: 'Publicar con dos aprobaciones', cls: 'alt w2 noscroll', big: 'Una persona decide', sub: 'toca para ver el flujo',
      head: 'Publicar con dos aprobaciones',
      blocks: [{ t: 'aprob' }],
    },
  ],

  ia: [
    {
      title: 'Embeddings', cls: 'accent w2 h2 noscroll', big: 'Foto → números', sub: 'toca para ver cómo',
      nav: [{ pos: 'br', label: 'Centroides', to: 1 }],
      head: 'Cada foto = una lista de números', text: 'Fotos parecidas quedan cerca.',
      blocks: [{ t: 'emb' }],
    },
    {
      title: 'Centroides', cls: 'noscroll', big: '1 por especie', sub: 'su punto de referencia',
      head: 'Un centroide por especie',
      text: 'Cada especie tiene un centroide, su punto de referencia. Al fotografiar una rana, vemos a cuál se parece más.',
      blocks: [{ t: 'cent' }],
    },
    {
      title: 'Encoder', cls: 'noscroll', big: 'BioCLIP 1', sub: 'encoder visual',
      head: 'BioCLIP 1: foto → números', text: 'BioCLIP 1 es el encoder visual: convierte cada foto en un vector de 512 números.',
      blocks: [{ t: 'enc' }],
    },
    {
      title: 'Modelo jerárquico y casos', cls: 'w2 noscroll', big: 'Si no sabe, no inventa', sub: 'cinco casos',
      head: 'Si no sabe, no inventa', text: 'El modelo es jerárquico: familia, género y especie.',
      blocks: [{ t: 'jer' }],
    },
    {
      title: 'Open Set', cls: 'alt w4 noscroll', big: 'Reconocer lo que no conoce',
      head: 'Reconocer lo que no conoce',
      text: 'Si la foto no se parece lo suficiente a ninguna especie conocida, no la fuerza a una.',
      blocks: [{ t: 'openset' }, { t: 'stats', items: [{ v: '33,5', l: 'umbral τ' }, { v: '75,7 %', l: 'conocidas aceptadas (test)' }, { v: '97,5 %', l: 'en validación' }] }],
    },
  ],

  resultados: [
    {
      title: 'Crecimiento', cls: 'accent w2 h2', big: '↑ capacidad  ↓ tiempo  ↑ precisión', sub: 'toca para ver',
      head: 'Crecimiento',
      blocks: [{ t: 'growth' }],
    },
    {
      title: 'Especies', cls: 'noscroll', big: '43', sub: '34 con paquete',
      head: 'Especies con paquete', text: 'De las 43 que reconoce la app.',
      blocks: [{ t: 'ring', value: 34, total: 43, label: 'con paquete', sub: 'de 43 especies' }],
    },
    {
      title: 'Fotos', cls: 'noscroll', big: '12 209', sub: 'con vector',
      head: '12 209 fotos con vector', text: 'Cada foto, un vector.',
      blocks: [{ t: 'fotosvec' }],
    },
    {
      title: 'Paquetes', cls: 'noscroll', big: '9 / 9', sub: 'subregiones',
      head: '9 de 9 subregiones', text: 'Cada subregión tiene su paquete, y está hecho para crecer a todo el país.',
      blocks: [{ t: 'nueve' }],
    },
    {
      title: 'Regla de entrada', cls: 'noscroll', big: '≥10 fotos', sub: '≥3 individuos',
      head: 'Regla de entrada', text: 'Cada especie necesita al menos 10 fotos y 3 individuos distintos.',
      blocks: [{ t: 'regla' }],
    },
    {
      title: 'Evaluación', cls: 'w2 noscroll', big: '85,2 % top-1', sub: 'Sabanas, 5 especies',
      head: 'Evaluación',
      text: 'Sabanas: 5 especies y 81 fotos de validación.',
      blocks: [{ t: 'stats', items: [{ v: '85,2 %', l: 'top-1 (69 de 81)' }, { v: '75,7 %', l: 'conocidas aceptadas (test)' }, { v: '1–2,5 s', l: 'por respuesta' }] }],
    },
    {
      title: 'Limitaciones', cls: 'bronze w2 noscroll', big: 'Lo que aún no puede', sub: 'toca para ver',
      head: 'Lo que aún no puede',
      blocks: [{ t: 'lim' }],
    },
    {
      title: 'Trivia', cls: 'alt w2 noscroll', big: '¿Puedes distinguirlas?', sub: 'toca y prueba',
      head: '¿Puedes distinguir estas dos especies?', text: 'Toca una foto.',
      blocks: [{ t: 'trivia' }],
    },
  ],

};
