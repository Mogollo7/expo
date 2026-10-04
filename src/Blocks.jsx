import { useContext, useEffect, useState } from 'react';
import { StaticContext, reduced } from './static.js';
import Donut, { Bars } from './Donut.jsx';
import Ayuda from './Ayuda.jsx';
import Donde from './Donde.jsx';
import Paquetes from './Paquetes.jsx';
import Avion from './Avion.jsx';
import Identificar from './Identificar.jsx';
import Metadatos from './Metadatos.jsx';
import Duelo from './Duelo.jsx';
import { Consulta, Ring, FotosVector, Ciclo, Aprobaciones } from './Admin.jsx';
import { Embeddings, Centroides, Encoder, Jerarquia, OpenSet } from './IA.jsx';
import { Regla, Nueve, Limites, Trivia } from './Res.jsx';
import Mundo from './Mundo.jsx';
import Bio from './Bio.jsx';
import Inat from './Inat.jsx';
import Fan from './Fan.jsx';

const SLOT_LABEL = { image: 'IMAGEN', video: 'VIDEO', app: 'APP', anim: 'ANIMACIÓN', map: 'MAPA' };

// `at` = ruta de ubicación (p. ej. «app/t2/b1»): se muestra abajo a la derecha de cada elemento (data-ref).

// Hueco del wireframe: caja punteada con la nota; si `src` existe, muestra el archivo.
function Slot({ kind, hint, src, at }) {
  if (src) {
    return (
      <div className="slot-wrap" data-ref={at}>
        {kind === 'video'
          ? <video className="slot-media" src={src} controls playsInline />
          : <img className="slot-media" src={src} alt="" draggable={false} />}
      </div>
    );
  }
  return (
    <div className={`slot slot-${kind}`} data-ref={at}>
      <b>{SLOT_LABEL[kind]}</b>
      <span>{hint}</span>
    </div>
  );
}

// Elementos que se tocan: uno activo a la vez (steps resalta, cards crece).
function Pick({ items, cards, at }) {
  const [on, setOn] = useState(0);
  return (
    <div className={cards ? 'cards' : 'steps'} data-ref={at}>
      {items.map((it, i) => (
        <button
          key={i}
          type="button"
          data-ref={`${at}.${cards ? 'c' : 's'}${i + 1}`}
          className={i === on ? 'on' : ''}
          style={cards && i === on ? { flexGrow: 2.2 } : undefined}
          onClick={() => setOn(i)}
        >
          <b>{cards ? it.title : `${i + 1} · ${it.title}`}</b>
          {(i === on || cards) && <span>{it.text}</span>}
        </button>
      ))}
    </div>
  );
}

// Crecimiento: capacidad ↑, tiempo ↓, precisión ↑. Las barras suben al abrir.
function Growth({ at }) {
  const isStatic = useContext(StaticContext);
  const [go, setGo] = useState(isStatic || reduced());
  useEffect(() => {
    if (go) return;
    const t = setTimeout(() => setGo(true), 120);
    return () => clearTimeout(t);
  }, [go]);
  const bar = (h, label, v, cls = '') => (
    <div className="gcol">
      <div className={`gbar ${cls}`} style={{ height: go ? `${h}%` : '0%' }}>{v}</div>
      <small>{label}</small>
    </div>
  );
  return (
    <div className="growth" data-ref={at}>
      <section data-ref={`${at}.capacidad`}>
        <h3>↑ Capacidad</h3>
        <div className="gbars">{bar(23, 'Prototipo', '10')}{bar(70, 'Paquetes v1', '30')}{bar(100, 'Hoy', '43')}</div>
        <p>Especies que reconoce</p>
      </section>
      <section data-ref={`${at}.tiempo`}>
        <h3>↓ Tiempo para añadir una especie</h3>
        <div className="gbars">{bar(100, 'Manual: reentrenar la red', 'cada vez')}{bar(14, 'Automático', '≈3 min / 500 fotos', 'good')}</div>
        <p>Hoy solo se calculan vectores (309 ms por foto) y centroides</p>
      </section>
      <section data-ref={`${at}.precision`}>
        <h3>Precisión</h3>
        <div className="gbars">{bar(97, 'Prototipo (10 esp.)', '97,19 %')}{bar(85, 'Sabanas (5 esp.)', '85,2 %', 'empty')}</div>
        <p>Top-1 en 81 fotos de validación</p>
      </section>
    </div>
  );
}

export default function Blocks({ blocks, at }) {
  return blocks.map((b, i) => {
    const here = `${at}/b${i + 1}`;
    switch (b.t) {
      case 'text': return <p key={i} className="b-text" data-ref={here}>{b.text}</p>;
      case 'todo': return <p key={i} className="b-todo" data-ref={here}>{b.text}</p>;
      case 'stats':
        return (
          <div key={i} className="b-stats" data-ref={here}>
            {b.items.map((s, j) => (
              <div key={j} data-ref={`${here}.n${j + 1}`}><strong>{s.v}</strong><span>{s.l}</span></div>
            ))}
          </div>
        );
      case 'steps': return <Pick key={i} items={b.items} at={here} />;
      case 'cards': return <Pick key={i} items={b.items} cards at={here} />;
      case 'slot': return <Slot key={i} {...b} at={here} />;
      case 'donut': return <Bars key={i} />;
      case 'pie': return <div key={i} className="b-pie" data-ref={here}><Donut data={b.data} /></div>;
      case 'ayuda': return <Ayuda key={i} src={b.src} />;
      case 'donde': return <Donde key={i} />;
      case 'paquetes': return <Paquetes key={i} src={b.src} />;
      case 'avion': return <Avion key={i} src={b.src} />;
      case 'identificar': return <Identificar key={i} />;
      case 'metadatos': return <Metadatos key={i} />;
      case 'duelo': return <Duelo key={i} />;
      case 'consulta': return <Consulta key={i} />;
      case 'ring': return <Ring key={i} {...b} />;
      case 'fotosvec': return <FotosVector key={i} />;
      case 'ciclo': return <Ciclo key={i} />;
      case 'aprob': return <Aprobaciones key={i} />;
      case 'emb': return <Embeddings key={i} />;
      case 'cent': return <Centroides key={i} />;
      case 'enc': return <Encoder key={i} />;
      case 'jer': return <Jerarquia key={i} />;
      case 'openset': return <OpenSet key={i} />;
      case 'regla': return <Regla key={i} />;
      case 'nueve': return <Nueve key={i} />;
      case 'lim': return <Limites key={i} />;
      case 'trivia': return <Trivia key={i} />;
      case 'mundo': return <Mundo key={i} />;
      case 'bio': return <Bio key={i} src={b.src} name={b.name} />;
      case 'inat': return <Inat key={i} />;
      case 'fan': return <Fan key={i} items={b.items} />;
      case 'growth': return <Growth key={i} at={here} />;
      default: return null;
    }
  });
}
