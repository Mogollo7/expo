import { useMemo } from 'react';

// Mapa de vectores: cada punto es la foto de una especie, con coordenadas aleatorias pero fijas (semilla).
// Los puntos nunca se encimen: cada uno busca un sitio a distancia mínima de los demás.
// hi = índice del punto resaltado · coords = muestra los primeros números del vector resaltado.
const COLORS = ['#1F7A33', '#E08A2E', '#2E7DB8', '#8E5BB5'];
const rng = (seed) => () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const fmt = (v) => v.toFixed(2).replace('.', ',');

export default function VecMap({ n = 40, seed = 7, hi = null, coords = false, w = 400, h = 250, r = 6 }) {
  const { pts, nums } = useMemo(() => {
    const rand = rng(seed);
    const pad = r * 2.4;
    const minD = r * 3.4;
    const centers = COLORS.map(() => [w * (0.2 + rand() * 0.6), h * (0.2 + rand() * 0.6)]);
    const pts = [];
    for (let i = 0; i < n; i++) {
      const k = i % COLORS.length;
      let best = null;
      let bestD = -1;
      for (let a = 0; a < 80; a++) {
        const spread = 0.3 + a * 0.01; // si el grupo está lleno, el intento se abre un poco más
        const x = Math.min(w - pad, Math.max(pad, centers[k][0] + (rand() - 0.5) * w * spread));
        const y = Math.min(h - pad, Math.max(pad, centers[k][1] + (rand() - 0.5) * h * spread * 1.3));
        const d = pts.reduce((m, p) => Math.min(m, Math.hypot(p.x - x, p.y - y)), Infinity);
        if (d > bestD) { best = { x, y, k }; bestD = d; }
        if (d >= minD) break;
      }
      pts.push(best);
    }
    const nums = Array.from({ length: 6 }, () => fmt(rand() * 2 - 1));
    return { pts, nums };
  }, [n, seed, w, h, r]);

  return (
    <div className="vm">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Mapa de vectores">
        {pts.map((p, i) => (
          <circle key={i} className="vm-p" cx={p.x} cy={p.y} r={i === hi ? r * 1.6 : r} fill={i === hi ? '#fff' : COLORS[p.k]}
            stroke={i === hi ? '#14110c' : 'none'} strokeWidth={r * 0.45} style={{ animationDelay: `${i * 28}ms` }} />
        ))}
      </svg>
      {coords && <p className="vm-coords">[{nums.join(' · ')} …]</p>}
    </div>
  );
}
