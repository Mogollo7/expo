import { useEffect, useState } from 'react';
import Ico from './Ico.jsx';

// Carpeta con ficheros que asoman (cuadro cerrado de «Paquetes por zona»).
export function Folder() {
  return (
    <svg className="t-folder" viewBox="0 0 200 160" aria-hidden="true">
      <path d="M10 40a10 10 0 0 1 10-10h50l14 16h96a10 10 0 0 1 10 10v84a10 10 0 0 1-10 10H20a10 10 0 0 1-10-10z" fill="#B98B3E" />
      <g className="papers">
        <rect className="p1" x="34" y="40" width="110" height="80" rx="6" fill="#fff" />
        <rect className="p2" x="46" y="34" width="110" height="80" rx="6" fill="#F3F7F1" />
        <rect className="p3" x="58" y="28" width="110" height="80" rx="6" fill="#fff" />
        <g stroke="#1F7A33" strokeWidth="4" strokeLinecap="round" className="lines"><path d="M72 48h60M72 62h80M72 76h50" /></g>
      </g>
      <path d="M10 66a10 10 0 0 1 10-10h160a10 10 0 0 1 10 10v70a10 10 0 0 1-10 10H20a10 10 0 0 1-10-10z" fill="#D9A74E" />
    </svg>
  );
}

// Detalle: foto enmarcada + tarjeta del paquete con un switch (se activa y desactiva solo hasta que se toca).
export default function Paquetes({ src }) {
  const [on, setOn] = useState(true);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setOn((v) => !v), 2200);
    return () => clearInterval(t);
  }, [auto]);
  return (
    <div className="pk">
      <div className="pk-frame"><img src={src} alt="Paquetes en la app" draggable={false} /></div>
      <div className="pk-card">
        <h3>Paquetes Antioquia</h3>
        <p className="pk-n"><strong>23</strong> especies</p>
        <button type="button" role="switch" aria-checked={on} className={`pk-sw ${on ? 'on' : ''}`} onClick={() => { setAuto(false); setOn(!on); }}>
          <i /><span>{on ? 'Activo' : 'Desactivado'}</span>
        </button>
        <div className="pk-acts"><span><Ico n="check" />Descargado</span><span><Ico n="trash" />Se puede eliminar</span></div>
        <h4>Descargar</h4>
        <p>Elige una subregión que tú quieras, activa o desactiva.</p>
      </div>
    </div>
  );
}
