import Donut from './Donut.jsx';
import A from './inat-anura.json'; // generado con scripts/inat-anura.py

const PIE = { total: 654, label: 'de las especies tienen registros', fmt: (n) => `${(n / 10).toFixed(1).replace('.', ',')}%`, parts: [['Con registros', A.especies], ['Sin registros', 911 - A.especies]] };
const top = A.familiasEsp.slice(0, 6);
const max = top[0][1];

// Registros en iNaturalist: torta 544/911 + conteo de Anura de Colombia por familia, género y especie.
export default function Inat() {
  return (
    <div className="inat">
      <div className="inat-pie">
        <Donut data={PIE} />
        <p><b>{A.especies}</b> de <b>911</b> especies de Colombia tienen registros públicos en iNaturalist.</p>
      </div>
      <div className="inat-side">
        <div className="inat-nums">
          <div><strong>{A.familias}</strong><span>familias</span></div>
          <div><strong>{A.generos}</strong><span>géneros</span></div>
          <div><strong>{A.especies}</strong><span>especies</span></div>
        </div>
        <div className="inat-bars">
          <h3>Especies por familia</h3>
          {top.map(([name, n]) => (
            <div key={name} className="inat-row">
              <span>{name}</span>
              <i style={{ width: `${(n / max) * 100}%` }} />
              <b>{n}</b>
            </div>
          ))}
        </div>
        <small>Anura de Colombia · API de iNaturalist</small>
      </div>
    </div>
  );
}
