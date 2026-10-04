import { useEffect, useState } from 'react';

const Ico = ({ d, ...p }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d={d} />
  </svg>
);

// Carpeta (cuadro cerrado y paso 1): la tapa se abre y salen los ficheros.
export function Box() {
  return (
    <svg className="t-box" viewBox="0 0 200 170" aria-hidden="true">
      <path d="M12 38a10 10 0 0 1 10-10h52l14 16h92a10 10 0 0 1 10 10v94a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10z" fill="#B98B3E" />
      <g className="fd-papers">
        <rect x="30" y="40" width="130" height="84" rx="6" fill="#fff" />
        <rect x="42" y="28" width="130" height="84" rx="6" fill="#F3F7F1" />
        <path d="M58 52h70M58 68h92M58 84h56" stroke="#1F7A33" strokeWidth="5" strokeLinecap="round" />
      </g>
      <path className="fd-front" d="M12 70a10 10 0 0 1 10-10h156a10 10 0 0 1 10 10v82a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10z" fill="#D9A74E" />
    </svg>
  );
}

const TRAE = [
  ['Vectores', 'de las fotos de referencia'],
  ['Centroide', 'de cada especie: su punto de referencia'],
  ['Umbral', 'para decir «no concluyente»'],
  ['Datos del lugar', 'dónde y a qué altura vive cada una'],
];
const PISTAS = [
  ['Ubicación', 'Sube la probabilidad de las especies de esa zona.', 'M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
  ['Sustrato', 'Roca, hojarasca, vegetación o agua.', 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5'],
  ['Altura', 'Cada especie vive en un rango de altitud.', 'M3 20l6-10 4 6 3-4 5 8z'],
  ['Clima', 'Temperatura, humedad y lluvia del momento.', 'M7 18a4 4 0 0 1-.5-8 5.5 5.5 0 0 1 10.6-1A4.5 4.5 0 0 1 17 18z'],
];

// Mapa de embeddings: varias especies (puntos); la observación cae entre dos parecidas y el contexto la acerca a la correcta.
const CLUSTERS = [
  { n: 'Especie A', c: '#1F7A33', x: 290, y: 80, pts: [[-14, 8], [10, -12], [16, 14], [-4, 20], [-22, -6]] },
  { n: 'Especie B', c: '#E08A2E', x: 205, y: 150, pts: [[-12, -10], [12, 6], [-6, 16], [14, -14], [-20, 8]] },
  { n: 'Especie C', c: '#2E7DB8', x: 95, y: 210, pts: [[-12, 8], [10, -10], [14, 12], [-6, -16]] },
  { n: 'Especie D', c: '#8E5BB5', x: 320, y: 230, pts: [[-10, -8], [12, 10], [-14, 12], [6, -14]] },
];
const FAR = [212, 128];
const NEAR = [278, 88];

function Mapa({ near }) {
  const [x, y] = near ? NEAR : FAR;
  return (
    <svg className="mp-svg" viewBox="0 0 400 290" role="img" aria-label="Mapa de embeddings">
      {CLUSTERS.map((c) => (
        <g key={c.n}>
          <circle cx={c.x} cy={c.y} r="34" fill={c.c} opacity=".13" />
          {c.pts.map(([dx, dy], i) => <circle key={i} cx={c.x + dx} cy={c.y + dy} r="5.5" fill={c.c} />)}
          <text x={c.x} y={c.y + 54} textAnchor="middle" fontSize="15" fontWeight="800" fill={c.c}>{c.n}</text>
        </g>
      ))}
      <line x1={x} y1={y} x2={CLUSTERS[0].x} y2={CLUSTERS[0].y} stroke="#14110c" strokeWidth="2" strokeDasharray="5 5" style={{ opacity: near ? 0 : 0.6, transition: 'opacity .6s' }} />
      <g style={{ transform: `translate(${x}px, ${y}px)`, transition: 'transform 1s cubic-bezier(.4,0,.2,1)' }}>
        <circle r="13" fill="#fff" stroke="#14110c" strokeWidth="3.5" />
        <circle r="4.5" fill="#14110c" />
      </g>
    </svg>
  );
}

const STEPS = ['Qué trae', 'Qué contiene', 'Cómo afina'];

// Metadatos: el paquete se abre en 3 pasos (qué trae → qué información contiene → cómo acerca la observación en el mapa de embeddings).
export default function Metadatos() {
  const [s, setS] = useState(0);
  const [auto, setAuto] = useState(true);
  const [near, setNear] = useState(false);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => (s === 2 ? setNear((v) => !v) : setS((v) => v + 1)), s === 2 ? 2800 : 3600);
    return () => clearInterval(t);
  }, [auto, s]);
  const go = (i) => { setAuto(false); setS(i); };
  return (
    <div className="mt">
      <div className="mt-tabs" role="tablist">
        {STEPS.map((t, i) => (
          <button key={t} type="button" role="tab" aria-selected={s === i} className={s === i ? 'on' : ''} onClick={() => go(i)}>{i + 1} · {t}</button>
        ))}
      </div>
      <div className="mt-body">
        {s === 0 && (
          <div className="mt-trae">
            <Box />
            <ul>{TRAE.map(([a, b], i) => <li key={a} style={{ animationDelay: `${0.25 + i * 0.35}s` }}><b>{a}</b><span>{b}</span></li>)}</ul>
          </div>
        )}
        {s === 1 && (
          <div className="mt-info">
            {PISTAS.map(([a, b, d], i) => (
              <div key={a} style={{ animationDelay: `${i * 0.18}s` }}><Ico d={d} /><b>{a}</b><span>{b}</span></div>
            ))}
          </div>
        )}
        {s === 2 && (
          <div className="mt-map">
            <Mapa near={near} />
            <div className="mt-side">
              <p className="mt-msg">{near ? 'Con el contexto, la observación se acerca a la especie correcta.' : 'Solo con la foto, queda entre dos especies parecidas.'}</p>
              <button type="button" role="switch" aria-checked={near} className={`pk-sw ${near ? 'on' : ''}`} onClick={() => { setAuto(false); setNear(!near); }}>
                <i /><span>{near ? 'Con contexto' : 'Sin contexto'}</span>
              </button>
              <small>Cada punto es una foto; el contexto «arrastra» la observación.</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
