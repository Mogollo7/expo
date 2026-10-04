import { useEffect, useState } from 'react';

const P = '/media/paso/';
const SOLO = [
  { k: 'Foto', src: P + '4.jpeg', txt: 'Fotos de la rana para identificarla.' },
  { k: 'Proceso', src: P + 'analisando.jpeg', txt: 'Compara con el paquete, en el teléfono.' },
  { k: 'Resultado', src: P + 'result.jpeg', txt: 'La especie más probable y otras candidatas.' },
];
const PASOS = [
  { k: 'Dónde', src: P + '1.jpeg', txt: 'Ubicación, altura y microhábitat.' },
  { k: 'Cuándo', src: P + '2.jpeg', txt: 'Fecha, hora y clima.' },
  { k: 'Tamaño', src: P + '3.jpeg', txt: 'Largo de hocico a cloaca.' },
  { k: 'Foto', src: P + '4.jpeg', txt: 'Fotos de la rana.' },
  { k: 'Revisa', src: P + '6.jpeg', txt: 'Cada dato, antes de analizar.' },
  { k: 'Proceso', src: P + 'analisando.jpeg', txt: 'La app compara en el teléfono.' },
  { k: 'Resultado', src: P + 'result.jpeg', txt: 'La especie, con más datos como pista.' },
];

// Identificar: dos caminos (solo foto / paso a paso). El celular recorre las capturas; más datos = mejor resultado.
export default function Identificar() {
  const [mode, setMode] = useState('pasos');
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const list = mode === 'pasos' ? PASOS : SOLO;
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI((v) => (v + 1) % list.length), 2600);
    return () => clearInterval(t);
  }, [auto, list.length]);
  const pick = (m) => { setMode(m); setI(0); setAuto(true); };
  return (
    <div className="idf">
      <div className="idf-phone"><img key={list[i].src} src={list[i].src} alt={list[i].k} draggable={false} /></div>
      <div className="idf-side">
        <div className="idf-mode" role="tablist">
          <button type="button" role="tab" aria-selected={mode === 'foto'} className={mode === 'foto' ? 'on' : ''} onClick={() => pick('foto')}>Solo foto</button>
          <button type="button" role="tab" aria-selected={mode === 'pasos'} className={mode === 'pasos' ? 'on' : ''} onClick={() => pick('pasos')}>Paso a paso</button>
        </div>
        <ol className="idf-steps">
          {list.map((s, j) => (
            <li key={s.k} className={j === i ? 'on' : ''}>
              <button type="button" onClick={() => { setAuto(false); setI(j); }}><b>{s.k}</b><span>{s.txt}</span></button>
            </li>
          ))}
        </ol>
        <div className="idf-gain">
          <span>Más datos, mejor resultado</span>
          <div><i style={{ width: mode === 'pasos' ? '100%' : '38%' }} /></div>
        </div>
      </div>
    </div>
  );
}
