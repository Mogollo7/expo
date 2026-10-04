import { useEffect, useState } from 'react';
import Ico from './Ico.jsx';
import { useLoop } from './hooks.js';
import VecMap from './VecMap.jsx';

const FOTO = '/media/duelo/bogerti.jpg';
const CL = [
  { n: 'Especie A', c: '#1F7A33', x: 300, y: 80, p: [[-16, 8], [10, -14], [18, 14], [-4, 22], [-24, -6]] },
  { n: 'Especie B', c: '#E08A2E', x: 200, y: 170, p: [[-14, -10], [14, 6], [-6, 18], [16, -14], [-22, 8]] },
  { n: 'Especie C', c: '#2E7DB8', x: 90, y: 90, p: [[-12, 8], [10, -10], [16, 12], [-6, -18]] },
  { n: 'Especie D', c: '#8E5BB5', x: 320, y: 230, p: [[-12, -8], [14, 10], [-16, 12], [6, -16]] },
];

function Clusters({ show = true, centroids = false, pulse = false }) {
  return CL.map((c) => (
    <g key={c.n} style={{ opacity: show ? 1 : 0, transition: 'opacity .8s' }}>
      <circle cx={c.x} cy={c.y} r="36" fill={c.c} opacity=".13" />
      {c.p.map(([dx, dy], i) => <circle key={i} cx={c.x + dx} cy={c.y + dy} r="5.5" fill={c.c} />)}
      {centroids && <path className={pulse ? 'ia-cross' : ''} d={`M${c.x - 9} ${c.y}h18M${c.x} ${c.y - 9}v18`} stroke="#14110c" strokeWidth="4" strokeLinecap="round" />}
      <text x={c.x} y={c.y + 56} textAnchor="middle" fontSize="15" fontWeight="800" fill={c.c}>{c.n}</text>
    </g>
  ));
}

const Obs = ({ x, y }) => (
  <g style={{ transform: `translate(${x}px, ${y}px)`, transition: 'transform 1.1s cubic-bezier(.4,0,.2,1)' }}>
    <circle r="13" fill="#fff" stroke="#14110c" strokeWidth="3.5" />
    <circle r="4.5" fill="#14110c" />
  </g>
);

// ───────── T1 · Embeddings: foto → números → punto en el mapa; «Ver en general» muestra todas las especies ─────────
export function Embeddings() {
  const [s, setS] = useState(0);
  const [all, setAll] = useState(false);
  useEffect(() => {
    if (s >= 2) return;
    const t = setTimeout(() => setS((v) => v + 1), 2200);
    return () => clearTimeout(t);
  }, [s]);
  return (
    <div className="em">
      <div className="em-row">
        <div className="em-photo wc"><img src={FOTO} alt="Rana" draggable={false} /><b>Una foto</b></div>
        <div className={`em-cells wc ${s >= 1 ? 'on' : ''}`}>
          {s >= 1 && <VecMap n={40} seed={11} hi={0} coords />}
          <b>Una lista de números</b>
        </div>
        <svg className="em-map wc" viewBox="0 0 400 290" role="img" aria-label="Mapa de embeddings">
          <Clusters show={all} />
          {s >= 2 && <Obs x={all ? 292 : 200} y={all ? 90 : 145} />}
        </svg>
      </div>
      <div className="em-bar">
        <p>{s < 1 ? 'Cada foto…' : s < 2 ? '…se convierte en una lista de números…' : all ? 'Fotos parecidas quedan cerca: cada grupo es una especie.' : '…y cada lista es un punto en el mapa.'}</p>
        <button type="button" className="em-btn" onClick={() => (s < 2 ? setS(2) : setAll(!all))}>{s < 2 ? 'Saltar' : all ? 'Ver un espécimen' : 'Ver en general'}</button>
        <button type="button" className="em-btn ghost" onClick={() => { setAll(false); setS(0); }}>Repetir</button>
      </div>
    </div>
  );
}

// ───────── T2 · Centroides: la observación se acerca al centro más parecido ─────────
const OBS = [{ at: [292, 92], to: 0 }, { at: [102, 104], to: 2 }, { at: [312, 218], to: 3 }];
export function Centroides() {
  const [i] = useLoop(3, 3400);
  const o = OBS[i];
  const c = CL[o.to];
  return (
    <div className="ce">
      <svg className="wc" viewBox="0 0 400 290" role="img" aria-label="Centroides">
        <Clusters centroids pulse />
        <line x1={o.at[0]} y1={o.at[1]} x2={c.x} y2={c.y} stroke="#14110c" strokeWidth="2.5" strokeDasharray="5 5" />
        <Obs x={o.at[0]} y={o.at[1]} />
      </svg>
      <div className="ce-side">
        <p className="ce-msg" key={i}>Se parece más a <b style={{ color: c.c }}>{c.n}</b></p>
        <ul>
          <li><span className="ce-x">+</span> Centroide: el punto de referencia de cada especie</li>
          <li><span className="ce-o" /> La observación: tu foto convertida en punto</li>
        </ul>
      </div>
    </div>
  );
}

// ───────── T3 · Encoder: foto → BioCLIP → números ─────────
export function Encoder() {
  return (
    <div className="en">
      <div className="en-photo wc"><img src={FOTO} alt="" draggable={false} /></div>
      <Ico n="arrow" />
      <div className="en-core"><Ico n="cube" /><b>BioCLIP 1</b><small>encoder visual</small></div>
      <Ico n="arrow" />
      <div className="en-vec wc"><VecMap n={30} seed={5} hi={0} /></div>
    </div>
  );
}

// ───────── T4 · Modelo jerárquico: del más preciso al menos, o «no concluyente» ─────────
const CASOS = [
  { k: 'Reconoce la especie', n: 'e', msg: 'Dendropsophus bogerti', sub: 'La reconoce: muestra la especie más probable.', tone: 'ok' },
  { k: 'No: baja al género', n: 'g', msg: 'Género Dendropsophus', sub: 'Si no reconoce la especie, retrocede a género.', tone: 'mid' },
  { k: 'No: baja a la familia', n: 'f', msg: 'Familia Hylidae', sub: 'Si tampoco, responde con la familia.', tone: 'mid' },
  { k: 'No concluyente', n: null, msg: 'NO CONCLUYENTE', sub: 'Rana de especie desconocida o baja confianza: indica el género o familia más probable.', tone: 'warn', shot: '/media/app/concluyente.jpeg' },
  { k: 'No es una rana', n: null, msg: 'No parece un anuro', sub: 'Si apuntas a un objeto que no es una rana, lo dice.', tone: 'no', shot: '/media/app/no-anuro.jpeg' },
];
const NIV = [['f', 'Familia'], ['g', 'Género'], ['e', 'Especie']];
export function Jerarquia() {
  const [auto, setAuto] = useState(true);
  const [i, setI] = useLoop(CASOS.length, 3400, auto);
  const c = CASOS[i];
  const order = ['e', 'g', 'f'];
  const failed = (id) => (c.n === null ? true : order.indexOf(id) < order.indexOf(c.n));
  return (
    <div className="jr">
      <div className="jr-tabs">
        {CASOS.map((x, j) => <button key={x.k} type="button" className={j === i ? 'on' : ''} onClick={() => { setAuto(false); setI(j); }}>{x.k}</button>)}
      </div>
      <div className="jr-body">
        <div className="jr-tree wc">
          {NIV.map(([id, name]) => (
            <div key={id} className={`jr-n ${c.n === id ? 'hit' : ''} ${failed(id) ? 'fail' : ''}`}>
              <b>{name}</b>{failed(id) && <Ico n="x" />}{c.n === id && <Ico n="check" />}
            </div>
          ))}
        </div>
        <div className={`jr-msg ${c.tone}`} key={i}>
          <Ico n={c.tone === 'ok' ? 'check' : c.tone === 'no' ? 'ban' : c.tone === 'warn' ? 'alert' : 'leaf'} />
          <b>{c.msg}</b><span>{c.sub}</span>
        </div>
        {c.shot && <img className="jr-shot" key={`s${i}`} src={c.shot} alt={c.msg} draggable={false} />}
      </div>
    </div>
  );
}

// ───────── T5 · Open Set: dentro del umbral responde, fuera dice «no concluyente»; una persona ajusta el umbral ─────────
const FASES = [
  { r: 62, p: [150, 120], t: 'Dentro del umbral: responde la especie.', tone: 'ok' },
  { r: 62, p: [290, 90], t: 'Fuera del umbral: «no concluyente».', tone: 'warn' },
  { r: 150, p: [290, 90], t: 'Una persona valida y ajusta el umbral por subregión.', tone: 'ok' },
];
export function OpenSet() {
  const [i] = useLoop(3, 3000);
  const f = FASES[i];
  return (
    <div className="os">
      <svg className="wc" viewBox="0 0 400 240" role="img" aria-label="Umbral de rechazo">
        <circle cx="140" cy="125" r={f.r} fill="rgba(31,122,51,.12)" stroke="#1F7A33" strokeWidth="3" strokeDasharray="8 6" style={{ transition: 'r 1.1s ease' }} />
        <path d="M131 125h18M140 116v18" stroke="#14110c" strokeWidth="4" strokeLinecap="round" />
        <Obs x={f.p[0]} y={f.p[1]} />
        <text x="140" y="228" textAnchor="middle" fontSize="14" fontWeight="800" fill="#14110c">centroide de la especie</text>
      </svg>
      <div className="os-side">
        <div className={`os-chip ${f.tone}`} key={i}><Ico n={f.tone === 'ok' ? 'check' : 'alert'} />{f.t}</div>
        <div className="os-person"><Ico n="user" /><span>Umbral validado por una persona en cada subregión</span></div>
      </div>
    </div>
  );
}
