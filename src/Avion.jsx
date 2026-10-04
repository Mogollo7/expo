import { useEffect, useState } from 'react';

const PLANE = 'M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z';
const Plane = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={PLANE} /></svg>;

// Cuadro cerrado: un celular con el modo avión que aparece «de la nada» (zoom desde 0, en bucle).
export function MiniPhone() {
  return <div className="t-phoneair" aria-hidden="true"><Plane /></div>;
}

// Detalle: celular en modo avión → el avión desaparece → captura a la izquierda, texto a la derecha.
export default function Avion({ src }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (shown) return;
    const t = setTimeout(() => setShown(true), 2200);
    return () => clearTimeout(t);
  }, [shown]);
  return (
    <div className={`av ${shown ? 'on' : ''}`} onClick={() => setShown((v) => !v)}>
      <div className="av-phone">
        <div className="av-plane"><Plane /><span>Modo avión</span></div>
        <img src={src} alt="Captura de la app" draggable={false} />
      </div>
      <p className="av-text">Puede utilizarlo sin necesidad de internet en cualquier lugar, todo en local.</p>
    </div>
  );
}
