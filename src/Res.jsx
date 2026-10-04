import { useEffect, useState } from 'react';
import Ico from './Ico.jsx';
import { Box } from './Metadatos.jsx';
import { useLoop, useCount } from './hooks.js';

// ───────── Regla de entrada: las fotos e individuos suben y, al cumplirse, la especie entra al paquete ─────────
export function Regla() {
  const [k] = useLoop(1000, 6200);
  const [go, setGo] = useState(false);
  useEffect(() => { setGo(false); const t = setTimeout(() => setGo(true), 200); return () => clearTimeout(t); }, [k]);
  const fotos = useCount(10, go, 2400);
  const ind = useCount(3, go, 2400);
  const ok = fotos >= 10 && ind >= 3;
  return (
    <div className="rl">
      <div className="rl-m wc"><Ico n="photo" /><strong>{fotos}</strong><span>fotos activas</span><small>mínimo 10</small></div>
      <div className="rl-m wc"><Ico n="user" /><strong>{ind}</strong><span>individuos</span><small>mínimo 3</small></div>
      <Ico n="arrow" className="rl-ar" />
      <div className={`rl-pack wc ${ok ? 'on' : ''}`}>
        <Box />
        <b>{ok ? 'La especie entra al paquete' : 'Aún no entra'}</b>
        {ok && <Ico n="check" className="rl-ck" />}
      </div>
    </div>
  );
}

// ───────── Paquetes 9 / 9: las nueve subregiones de Antioquia se llenan una a una ─────────
const SUB = ['Bajo Cauca', 'Magdalena Medio', 'Nordeste', 'Norte', 'Occidente', 'Oriente', 'Suroeste', 'Urabá', 'Valle de Aburrá'];
export function Nueve() {
  const [k] = useLoop(1000, 7500);
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const t = setInterval(() => setN((v) => (v < 9 ? v + 1 : v)), 450);
    return () => clearInterval(t);
  }, [k]);
  return (
    <div className="nv">
      <div className="nv-big"><strong>{n} / 9</strong><span>subregiones con paquete</span></div>
      <div className="nv-grid">
        {SUB.map((s, i) => <div key={s} className={`wc ${i < n ? 'on' : ''}`}><Ico n={i < n ? 'check' : 'box'} /><b>{s}</b></div>)}
      </div>
      <div className={`nv-grow wc ${n >= 9 ? 'on' : ''}`}>
        <div className="nv-dots">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ transitionDelay: `${i * 0.06}s` }} />)}</div>
        <b>Hecho para crecer: sigue todo el país</b>
      </div>
    </div>
  );
}

// ───────── Limitaciones: cuatro situaciones, cada una con su mini-escena ─────────
const LIM = [
  { i: 'eye', k: 'Especies muy parecidas', t: 'B. pugnax y D. microcephalus se parecen más a Scinax ruber (similitud 0,46 y 0,61).', a: 'sw' },
  { i: 'alert', k: 'Fotos en mala condición', t: 'Poca luz, desenfoque o la rana muy lejos.', a: 'bl' },
  { i: 'pin', k: 'Fuera de paquete', t: 'Zonas sin paquete publicado.', a: 'fl' },
  { i: 'photo', k: 'Pocas fotos', t: 'Menos de 10 fotos: no entra.', a: 'fw' },
];
export function Limites() {
  const [auto, setAuto] = useState(true);
  const [s, setS] = useLoop(4, 2800, auto);
  return (
    <div className="lm">
      {LIM.map((l, j) => (
        <button key={l.k} type="button" className={`wc ${j === s ? 'on' : ''} a-${l.a}`} onClick={() => { setAuto(false); setS(j); }}>
          <Ico n={l.i} /><b>{l.k}</b><span>{l.t}</span>
        </button>
      ))}
    </div>
  );
}

// ───────── Trivia: ¿cuál es? Se toca una carta y se explica con el contexto ─────────
const T = [
  { id: 'b', name: 'Dendropsophus bogerti', src: '/media/duelo/bogerti.jpg' },
  { id: 'm', name: 'Dendropsophus microcephalus', src: '/media/duelo/micro.jpg' },
];
export function Trivia() {
  const [pick, setPick] = useState(null);
  const ok = pick === 'm';
  return (
    <div className="tv">
      <p className="tv-q"><Ico n="pin" /> Foto tomada en la <b>Amazonía</b>. ¿Cuál es?</p>
      <div className="tv-cards">
        {T.map((t) => (
          <button key={t.id} type="button" disabled={pick !== null} className={`tv-c ${pick === t.id ? (ok ? 'good' : 'bad') : ''} ${pick && pick !== t.id ? 'dim' : ''}`} onClick={() => setPick(t.id)}>
            <img src={t.src} alt={t.name} draggable={false} />
            <b>{t.name}</b>
            {pick === t.id && <span className="tv-flag"><Ico n={ok ? 'check' : 'x'} /></span>}
          </button>
        ))}
      </div>
      <div className={`tv-res ${pick ? (ok ? 'good' : 'bad') : ''}`}>
        {!pick && 'Toca la que crees.'}
        {pick && ok && '¡Correcto! D. microcephalus sí vive en la Amazonía: el contexto lo confirma.'}
        {pick && !ok && 'Casi: D. bogerti no vive en la Amazonía. Allí, el contexto apunta a D. microcephalus.'}
        {pick && <button type="button" onClick={() => setPick(null)}>Otra vez</button>}
      </div>
    </div>
  );
}
