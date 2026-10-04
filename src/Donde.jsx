import { DEPTS } from './colombiaPaths.js';

// Solo Antioquia: su silueta y sus nueve subregiones con paquete. Sin cifras por departamento.
export default function Donde() {
  return (
    <div className="donde">
      <svg viewBox="74 180 140 148" role="img" aria-label="Mapa de Antioquia">
        <path d={DEPTS.ANTIOQUIA} fill="#1F7A33" stroke="#fff" strokeWidth="1" />
      </svg>
      <div className="dn-side">
        <div className="dn-big">
          <strong>Antioquia</strong>
          <span>9 subregiones, un paquete en cada una</span>
        </div>
      </div>
    </div>
  );
}
