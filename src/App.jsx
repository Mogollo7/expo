import { useEffect, useState } from 'react';
import Nav from './Nav.jsx';
import SectionStage from './SectionStage.jsx';
import { SECTIONS } from './sections.jsx';
import { DEFAULT_EFFECT, EFFECTS } from './transitions.js';
import { NavContext } from './static.js';

const loadEffect = () => {
  try {
    const saved = localStorage.getItem('effect');
    return saved in EFFECTS ? saved : DEFAULT_EFFECT;
  } catch {
    return DEFAULT_EFFECT;
  }
};

export default function App() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [effect, setEffect] = useState(loadEffect);

  useEffect(() => {
    try {
      localStorage.setItem('effect', effect);
    } catch {
      /* sin almacenamiento: no pasa nada */
    }
  }, [effect]);

  return (
    <NavContext.Provider value={{ go: setActive }}>
      <Nav active={active} onChange={setActive} />
      <main>
        <SectionStage active={active} effect={effect} setEffect={setEffect} />
      </main>
    </NavContext.Provider>
  );
}
