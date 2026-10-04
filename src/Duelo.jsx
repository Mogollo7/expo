import { useEffect, useState } from 'react';

const ESP = [
  { id: 'b', name: 'Dendropsophus bogerti', src: '/media/duelo/bogerti.jpg', donde: 'Más arriba, fuera de la Amazonía' },
  { id: 'm', name: 'Dendropsophus microcephalus', src: '/media/duelo/micro.jpg', donde: 'También en la Amazonía' },
];
// Ejemplo ilustrativo: porcentaje de cada especie según el contexto.
const CTX = [
  { k: 'Sin contexto', p: { b: 52, m: 48 }, msg: 'Solo con la foto, se parecen y casi empatan.' },
  { k: 'Amazonas', p: { b: 11, m: 89 }, msg: 'Foto en la Amazonía: la respuesta se arrastra a D. microcephalus.' },
  { k: 'Tierras altas', p: { b: 88, m: 12 }, msg: 'Foto más arriba: la respuesta se arrastra a D. bogerti.' },
];

// Contexto: dos ranas parecidas en cartas; la ubicación inclina la identificación hacia la correcta.
export default function Duelo() {
  const [c, setC] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setC((v) => (v + 1) % CTX.length), 3200);
    return () => clearInterval(t);
  }, [auto]);
  const cur = CTX[c];
  return (
    <div className="dl">
      <div className="dl-ctx" role="tablist" aria-label="Ubicación de la foto">
        <span>Ubicación de la foto:</span>
        {CTX.map((x, i) => (
          <button key={x.k} type="button" role="tab" aria-selected={c === i} className={c === i ? 'on' : ''} onClick={() => { setAuto(false); setC(i); }}>{x.k}</button>
        ))}
      </div>
      <div className="dl-cards">
        {ESP.map((e) => {
          const p = cur.p[e.id];
          const win = p > 50 && c > 0;
          return (
            <div key={e.id} className={`dl-card ${win ? 'win' : ''} ${c > 0 && !win ? 'lose' : ''}`}>
              <div className="dl-img"><img src={e.src} alt={e.name} draggable={false} /></div>
              <b className="dl-name">{e.name}</b>
              <span className="dl-where">{e.donde}</span>
              <div className="dl-bar"><i style={{ width: `${p}%` }} /><em>{p} %</em></div>
            </div>
          );
        })}
      </div>
      <p className="dl-msg">{cur.msg}</p>
      <small className="dl-note">Porcentajes de ejemplo para explicar la idea.</small>
    </div>
  );
}
