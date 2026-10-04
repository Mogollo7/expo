import Donut from './Donut.jsx';

// 40,7 % de los anfibios del mundo está amenazado (UICN, 2023): se cuenta en décimas (407).
const AMENAZA = { total: 407, label: 'de los anfibios, amenazados', colors: ['#1F7A33', '#B7DDBE'], fmt: (n) => `${(n / 10).toFixed(1).replace('.', ',')}%`, parts: [['Amenazados', 407], ['Resto', 593]] };
const ICON = {
  drop: <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />,
  leaf: <path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19c3-5 6-8 10-10" />,
  therm: <path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z" />,
};
const Icon = ({ n }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICON[n]}</svg>;
const SENALES = [
  ['drop', 'Piel que respira', 'Absorbe agua y contaminantes'],
  ['leaf', 'Agua y tierra', 'Viven en los dos ambientes'],
  ['therm', 'Muy sensibles', 'Un cambio pequeño los afecta'],
];

// Bioindicadores: foto de la rana (src) + cuánto está amenazado el grupo + por qué sirven de termómetro.
export default function Bio({ src, name }) {
  return (
    <div className="bio">
      <div className="bio-photo">
        <div className="poker">
          <i className="pk-c tl"><Icon n="leaf" /></i>
          <div className="pk-img">{src ? <img src={src} alt={name} draggable={false} /> : <span>Foto de rana ⟦…⟧</span>}</div>
          <em>{name}</em>
          <i className="pk-c br"><Icon n="leaf" /></i>
        </div>
      </div>
      <div className="bio-pie">
        <Donut data={AMENAZA} />
        <p>Si la rana desaparece, el ambiente está enfermo.</p>
      </div>
      <div className="bio-cards">
        {SENALES.map(([ic, t, d]) => (
          <div key={t}><Icon n={ic} /><b>{t}</b><small>{d}</small></div>
        ))}
      </div>
      <small className="bio-src">Anfibios amenazados · UICN 2023</small>
    </div>
  );
}
