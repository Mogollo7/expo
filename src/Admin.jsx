import { useEffect, useState } from 'react';
import Ico from './Ico.jsx';
import { Box } from './Metadatos.jsx';
import { useLoop, useScript, useTyped, useCount, fmtN } from './hooks.js';
import INAT from './inat-anura.json';
import VecMap from './VecMap.jsx';

const FOTOS = ['/media/galeria/dendrobates-truncatus.jpg', '/media/galeria/pristimantis-paisa.jpg', '/media/galeria/dendropsophus-bogerti.png'];

// ───────── T1 · Consulta de fotos: se «pulsa» Consultar muestra y el contador sube ─────────
const CONSULTA = [{ ms: 1400 }, { ms: 700 }, { ms: 2600 }, { ms: 2800 }];
export function Consulta() {
  const [i] = useScript(CONSULTA);
  const n = useCount(INAT.especies, i >= 2, 2200);
  return (
    <div className="cs wc">
      <div className="cs-head"><Ico n="search" /><b>Scraping</b></div>
      <button type="button" className={`cs-btn ${i === 1 ? 'press' : ''}`}>Consultar muestra</button>
      <div className="cs-bar"><i style={{ width: `${(n / INAT.especies) * 100}%` }} /></div>
      <div className="cs-n"><strong>{n}</strong><span>de 911 especies con registros públicos</span></div>
      <div className="cs-src">
        <span className={i >= 2 ? 'on' : ''}>iNaturalist</span>
        <span className={i >= 2 ? 'on d2' : ''}>GBIF</span>
      </div>
    </div>
  );
}

// ───────── Anillo de avance (Especies 34 de 43) ─────────
export function Ring({ value, total, label, sub }) {
  const [k] = useLoop(1000, 5200);
  const [go, setGo] = useState(false);
  useEffect(() => { setGo(false); const t = setTimeout(() => setGo(true), 150); return () => clearTimeout(t); }, [k]);
  const R = 52;
  const C = 2 * Math.PI * R;
  const n = useCount(value, go, 1600);
  return (
    <div className="rg">
      <div className="rg-ring">
        <svg viewBox="0 0 130 130">
          <circle cx="65" cy="65" r={R} fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="14" />
          <circle cx="65" cy="65" r={R} fill="none" stroke="var(--accent)" strokeWidth="14" strokeLinecap="round" transform="rotate(-90 65 65)"
            strokeDasharray={C} strokeDashoffset={go ? C * (1 - value / total) : C} style={{ transition: 'stroke-dashoffset 1.6s ease' }} />
        </svg>
        <div><strong>{n}</strong><span>de {total}</span></div>
      </div>
      <p><b>{label}</b><span>{sub}</span></p>
    </div>
  );
}

// ───────── T3 · Fotos con vector: cada foto se vuelve una tira de números ─────────
export function FotosVector() {
  const [k] = useLoop(1000, 5200);
  const [go, setGo] = useState(false);
  useEffect(() => { setGo(false); const t = setTimeout(() => setGo(true), 150); return () => clearTimeout(t); }, [k]);
  const n = useCount(12209, go, 2400);
  return (
    <div className="fv">
      <div className="fv-big"><strong>{fmtN(n)}</strong><span>fotos, cada una con su vector</span></div>
      {FOTOS.map((src, r) => (
        <div key={src} className="fv-row wc">
          <img src={src} alt="" draggable={false} />
          <Ico n="arrow" />
          <div className="fv-map">{go && <VecMap n={12} seed={3 + r} hi={0} w={200} h={64} r={4} />}</div>
        </div>
      ))}
    </div>
  );
}

// ───────── T4 · Ciclo del modelo: cuatro etapas con su mini-escena ─────────
const CICLO = [
  { k: 'Conseguir', t: 'Consultamos fotos públicas de ciencia ciudadana.', i: 'photo' },
  { k: 'Limpiar', t: 'Se revisan y descartan las fotos que no sirven.', i: 'eye' },
  { k: 'Procesar', t: 'Cada foto se convierte en un vector.', i: 'cube' },
  { k: 'Resultado', t: 'Se actualizan las referencias de cada especie.', i: 'box' },
];
const PTS = [[60, 70], [78, 58], [92, 82], [70, 92], [100, 64], [84, 76], [66, 52]];

function Escena({ s }) {
  if (s === 0) {
    return <div className="ci-stack">{FOTOS.map((f, j) => <img key={f} src={f} alt="" style={{ animationDelay: `${j * 0.35}s` }} draggable={false} />)}</div>;
  }
  if (s === 1) {
    return (
      <svg viewBox="0 0 220 150" className="ci-svg">
        {PTS.map(([x, y], j) => <circle key={j} cx={x} cy={y} r="6" fill="var(--accent)" />)}
        <circle className="ci-out" cx="190" cy="25" r="7" fill="#C0392B" />
        <text x="190" y="50" textAnchor="middle" fontSize="12" fontWeight="800" fill="#C0392B" className="ci-lbl">atípica</text>
      </svg>
    );
  }
  if (s === 2) {
    return (
      <svg viewBox="0 0 220 150" className="ci-svg">
        <circle className="ci-ring" cx="80" cy="75" r="46" fill="none" stroke="#14110c" strokeWidth="2.5" strokeDasharray="6 6" />
        {PTS.map(([x, y], j) => <circle key={j} cx={x} cy={y} r="5" fill="var(--accent)" />)}
        <path d="M80 66v18M71 75h18" stroke="#14110c" strokeWidth="4" strokeLinecap="round" />
        <circle cx="175" cy="110" r="6" fill="#E08A2E" />
        <text x="175" y="132" textAnchor="middle" fontSize="12" fontWeight="800" fill="#14110c">fuera</text>
      </svg>
    );
  }
  return (
    <div className="ci-done">
      <Box />
      <ul>{['Compilar', 'Simular', 'Medir'].map((a, j) => <li key={a} style={{ animationDelay: `${0.3 + j * 0.5}s` }}><Ico n="check" />{a}</li>)}</ul>
    </div>
  );
}

export function Ciclo() {
  const [auto, setAuto] = useState(true);
  const [s, setS] = useLoop(4, 3600, auto);
  return (
    <div className="ci">
      <div className="ci-nodes">
        {CICLO.map((c, j) => (
          <button key={c.k} type="button" className={`${j === s ? 'on' : ''} ${j < s ? 'done' : ''}`} onClick={() => { setAuto(false); setS(j); }}>
            <Ico n={c.i} /><b>{c.k}</b>
          </button>
        ))}
      </div>
      <div className="ci-body wc" key={s}>
        <Escena s={s} />
        <p>{CICLO[s].t}</p>
      </div>
    </div>
  );
}

// ───────── T6 · Publicar con dos aprobaciones: guion con comentario, desacuerdo y corrección ─────────
const GUION = [
  { k: 'validar', ms: 2400, e: 0 }, { k: 'compilar', ms: 1800, e: 0 }, { k: 'revisar', ms: 4600, e: 1 },
  { k: 'cambios', ms: 2600, e: 0 }, { k: 'compilar2', ms: 1800, e: 0 }, { k: 'aprobado', ms: 2600, e: 2 },
  { k: 'publicado', ms: 2600, e: 3 }, { k: 'retirado', ms: 2400, e: 3 },
];
const PASOS = ['Propuesta', 'Primera aprobación', 'Segunda aprobación', 'Publicar'];
const COMENTARIO = 'El umbral está muy bajo para esta subregión.';

export function Aprobaciones() {
  const [i, again] = useScript(GUION);
  const g = GUION[i];
  const typed = useTyped(COMENTARIO, g.k === 'revisar', 38);
  const done = typed.length === COMENTARIO.length;
  const slider = g.k === 'validar' ? 30 : g.k === 'cambios' || g.k === 'compilar2' || g.k === 'aprobado' ? 62 : 30;
  return (
    <div className="ap">
      <div className="ap-steps">
        {PASOS.map((p, j) => <span key={p} className={`${j === g.e ? 'on' : ''} ${j < g.e ? 'done' : ''}`}>{j < g.e ? <Ico n="check" /> : j + 1} {p}</span>)}
      </div>
      <div className="ap-body wc">
        {(g.k === 'validar' || g.k === 'cambios') && (
          <div className="ap-val">
            <div className="ap-who"><Ico n="user" /><b>Se prepara una nueva versión del paquete</b></div>
            <div className="ap-slider"><i style={{ left: `${slider}%` }} /><span style={{ width: `${slider}%` }} /></div>
            <small>{g.k === 'cambios' ? 'Cambios pedidos: se sube el umbral.' : 'Umbral de la subregión'}</small>
          </div>
        )}
        {(g.k === 'compilar' || g.k === 'compilar2') && (
          <div className="ap-comp"><Box /><div className="ap-bar"><i /></div><small>Se arma el paquete de la subregión…</small></div>
        )}
        {(g.k === 'revisar' || g.k === 'aprobado') && (
          <div className="ap-rev">
            <div className={`ap-r ${g.k === 'aprobado' ? 'ok' : ''}`}>
              <div className="ap-who"><Ico n="user" /><b>Primera aprobación</b></div>
              {g.k === 'revisar' ? (
                <>
                  <div className="ap-box"><Ico n="comment" /><span>{typed}<em /></span></div>
                  <div className={`ap-vote no ${done ? 'on' : ''}`}><Ico n="thumbDown" />No estoy de acuerdo</div>
                </>
              ) : <div className="ap-vote yes on"><Ico n="thumbUp" />Aprobado</div>}
            </div>
            <div className={`ap-r ${g.k === 'aprobado' ? 'ok' : ''}`}>
              <div className="ap-who"><Ico n="user" /><b>Segunda aprobación</b></div>
              {g.k === 'revisar' ? <small>Esperando…</small> : <div className="ap-vote yes on d2"><Ico n="thumbUp" />Aprobado</div>}
            </div>
          </div>
        )}
        {(g.k === 'publicado' || g.k === 'retirado') && (
          <div className="ap-pub">
            <Box />
            <div className={`ap-live ${g.k === 'publicado' ? 'on' : ''}`}>{g.k === 'publicado' ? 'Publicado' : 'Retirado'}</div>
            <small>{g.k === 'publicado' ? 'Disponible para descargar' : 'Se puede retirar si hace falta'}</small>
          </div>
        )}
      </div>
      <button type="button" className="ap-again" onClick={again}>Repetir</button>
    </div>
  );
}
