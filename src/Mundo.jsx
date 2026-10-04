import { useState } from 'react';
import CountUp from './CountUp.jsx';
import Donde from './Donde.jsx';
import Ico from './Ico.jsx';
import { RING } from './content.js';

const fmt = (n) => n.toLocaleString('es-CO').replace(/\./g, ' ');
const TOP = [['1 178', 'Brasil', false], ['911', 'Colombia', true], ['688', 'Ecuador', false]];

// «El mundo en cifras»: anillo con 9 001 y tres países. Al tocar Colombia (911) se abre su mapa.
export default function Mundo() {
  const [col, setCol] = useState(false);
  if (col) {
    return (
      <div className="mu-col">
        <button type="button" className="mu-back" onClick={() => setCol(false)}><Ico n="arrow" style={{ transform: 'rotate(180deg)' }} />Volver al mundo</button>
        <Donde />
      </div>
    );
  }
  return (
    <div className="mu">
      <div className="mu-ring">
        <div style={{ background: RING }} />
        <p><strong><CountUp to={9001} ms={2200} format={fmt} /></strong><span>especies de anuros</span></p>
      </div>
      <div className="mu-side">
        <p className="mu-key"><i style={{ background: '#FBFCFA' }} />Brasil <i style={{ background: '#CDA75E' }} />Colombia</p>
        {TOP.map(([v, l, tap]) => (
          tap
            ? <button key={l} type="button" className="mu-chip tap" onClick={() => setCol(true)}><strong>{v}</strong><span>{l}</span><em>Toca: ver Antioquia <Ico n="arrow" /></em></button>
            : <div key={l} className="mu-chip"><strong>{v}</strong><span>{l}</span></div>
        ))}
      </div>
    </div>
  );
}
