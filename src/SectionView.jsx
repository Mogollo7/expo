import { useContext } from 'react';
import { NavContext } from './static.js';
import { usePref } from './prefs.js';
import { SECTIONS } from './sections.jsx';
import Home from './Home.jsx';
import Bento from './Bento.jsx';
import { SECTIONS_CONTENT } from './content.js';

// Guía del presentador: qué decir en cada sección, cuánto tiempo y cuál sigue.
const GUIA = {
  animales: ['01 · Animales', 'Hay un problema: muchas especies, pocas personas que las identifiquen', '0:45', 'app'],
  app: ['02 · App', 'Funciona sin internet, por zona', '1:30 + 1:00 contexto', 'admin'],
  admin: ['03 · Admin', 'Conseguimos y organizamos los datos de forma automática', '1:15', 'ia'],
  ia: ['04 · IA', 'Cada foto se vuelve números y se compara. Si no sabe, no inventa', '1:15 + 1:00', 'resultados'],
  resultados: ['05 · Resultados', 'Esto lograron los números, y esto no puede hacer', '1:00 + 1:00 trivia', 'inicio'],
};
const labelOf = (id) => SECTIONS.find((s) => s.id === id)?.label ?? id;

function Guia({ id }) {
  const { go } = useContext(NavContext);
  const [show] = usePref('guia', true);
  const g = GUIA[id];
  if (!show || !g) return null;
  return (
    <header className="guia" data-ref={`${id}/guia`}>
      <div className="guia-l">
        <span className="guia-chip">{g[0]}</span>
        <h1>{g[1]}</h1>
      </div>
      <div className="guia-r">
        <span className="guia-time">{g[2]}</span>
        <button type="button" onClick={() => go(g[3])}>
          <small>Sigue</small><span>{labelOf(g[3])}</span><span aria-hidden="true">→</span>
        </button>
      </div>
    </header>
  );
}

// Una sección completa. Es lo que se transiciona.
export default function SectionView({ id, effect, setEffect }) {
  const section = SECTIONS.find((s) => s.id === id);
  if (section.kind === 'home') return <Home />;
  if (section.kind === 'flow') return <Bento key={id} id={id}tiles={SECTIONS_CONTENT[id]} header={<Guia id={id} />} />;
  return null;
}
