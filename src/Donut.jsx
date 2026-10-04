import { WORLD } from './content.js';

const COLORS = ['#fff', '#ffd166', '#06d6a0', '#ef476f', '#118ab2', '#f78c6b', '#c77dff', '#a7c957', '#4cc9f0', '#f4a261', 'rgba(255,255,255,.3)'];
const R = 40;
const SW = 6;
const C = 2 * Math.PI * R;
const fmt = (n) => n.toLocaleString('es-CO').replace(/\./g, ' ');

// Dona con el total del mundo al centro. Cada país es un arco; el último es «Resto del mundo».
// Barras de los 10 países; los puestos 1-3 se numeran y el 2 (Colombia) abre otra vista.
export function Bars() {
  const data = WORLD.parts.slice(0, -1);
  const [x0, y0, w, h, max] = [40, 232, 350, 215, 1200];
  const step = w / data.length;
  return (
    <svg className="bars" viewBox="0 0 400 252" role="img" aria-label="Especies de anfibios por país">
      <g stroke="currentColor" strokeWidth="1.5" opacity=".9">
        <line className="ax" x1={x0} y1={y0} x2={x0} y2={y0 - h - 5} />
        <line className="ax" x1={x0} y1={y0} x2={x0 + w + 8} y2={y0} />
      </g>
      {[0, 400, 800, 1200].map((v) => (
        <g key={v} fontSize="13" opacity=".85">
          <line x1={x0 - 4} x2={x0} y1={y0 - (v / max) * h} y2={y0 - (v / max) * h} stroke="currentColor" />
          <text x={x0 - 7} y={y0 - (v / max) * h + 3} textAnchor="end" fill="currentColor">{v}</text>
        </g>
      ))}
      {data.map(([name, n], i) => {
        const bh = (n / max) * h;
        const x = x0 + i * step + step * 0.18;
        return (
          <g key={name}>
            <rect className="bar" x={x} y={y0 - bh} width={step * 0.64} height={bh} rx="4" fill={COLORS[i]} style={{ animationDelay: `${0.25 + i * 0.06}s` }} />
            {i < 3 && (
              <text
                x={x + step * 0.32} y={y0 + 16} textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor"
              >
                {i + 1}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function Donut({ data }) {
  let acc = 0;
  const sum = data.parts.reduce((t, [, n]) => t + n, 0); // en los departamentos las especies se repiten: el arco es la parte de la suma
  return (
    <div className="donut">
      <div className="donut-chart">
        <svg viewBox="0 0 100 100" role="img" aria-label={`${data.total} ${data.label}`}>
          <g transform="rotate(-90 50 50)" fill="none" strokeWidth={SW} strokeLinecap="round">
            {data.parts.map(([name, n], i) => {
              const len = (n / sum) * C;
              const dash = Math.max(len - SW - 2, 0.01); // la punta redonda suma SW/2 por lado
              const el = (
                <circle key={name} cx="50" cy="50" r={R} stroke={(data.colors ?? COLORS)[i]} strokeDasharray={`${dash} ${C}`} strokeDashoffset={-(acc + (len - dash) / 2)} />
              );
              acc += len;
              return el;
            })}
          </g>
        </svg>
        <div className="donut-center">
          <strong>{(data.fmt ?? fmt)(data.total)}</strong>
          <span>{data.label}</span>
        </div>
      </div>
    </div>
  );
}
