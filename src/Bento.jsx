import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { reduced } from './static.js';
import { usePref } from './prefs.js';
import Blocks from './Blocks.jsx';
import { Folder } from './Paquetes.jsx';
import { MiniPhone } from './Avion.jsx';
import { Box } from './Metadatos.jsx';
import Donut from './Donut.jsx';

gsap.registerPlugin(Flip);

const Arrow = ({ left }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={left ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
  </svg>
);

// Bento: al tocar un cuadro, crece y desplaza a los demás (FLIP). «×» lo devuelve a la cuadrícula.
export default function Bento({ id, tiles, header }) {
  const [pend] = usePref('pend', true);
  const grid = useRef(null);
  const before = useRef(null);
  const [sel, setSel] = useState(null);

  const pick = (i) => {
    before.current = Flip.getState(Array.from(grid.current.children));
    setSel(i);
  };

  useLayoutEffect(() => {
    if (!before.current) return;
    const state = before.current;
    before.current = null;
    if (reduced()) { Flip.from(state, { duration: 0, absolute: true }); return; }
    const g = grid.current;
    // Cuadros: el abierto crece con un expo marcado; los demás se reacomodan en cascada y salen con un leve blur.
    Flip.from(state, {
      duration: 0.9, ease: 'expo.inOut', absolute: true, stagger: 0.035,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }),
    });
    gsap.fromTo(g.querySelectorAll('.tile:not(.sel)'), { filter: 'blur(5px)' }, { filter: 'blur(0px)', duration: 0.7, ease: 'power2.out', clearProps: 'filter' });
    // Contenido del cuadro abierto: entra por capas, una tras otra, después de que el cuadro ya creció.
    const parts = g.querySelectorAll('.tile.sel > .o-lab, .tile.sel > .d-title, .tile.sel > .o-text, .tile.sel .detail > *, .tile.sel > .o-todo, .tile.sel > .go');
    gsap.from(parts, { y: 28, opacity: 0, filter: 'blur(8px)', duration: 0.7, ease: 'expo.out', stagger: 0.08, delay: 0.35, clearProps: 'transform,opacity,filter' });
  }, [sel]);

  return (
    <div className="view">
      {header}
      <div ref={grid} className={`bento ${sel !== null ? 'focus' : ''}`} style={{ '--n': tiles.length - 1 }}>
        {tiles.map((t, i) => {
          const open = i === sel;
          const at = `${id}/t${i + 1}`;
          return (
            <div
              key={t.title}
              role={open ? undefined : 'button'}
              tabIndex={open ? -1 : 0}
              data-ref={at}
              className={`tile pv ${t.cls ?? ''} ${open ? 'sel' : ''} ${!open && (t.img || t.ring || t.airplane || t.box) ? 'has-vis' : ''} ${open && t.nav?.some((n) => n.pos === 'left') ? 'navl' : ''} ${open && t.nav?.some((n) => n.pos === 'br') ? 'navr' : ''}`}
              onClick={() => !open && pick(i)}
              onKeyDown={(e) => !open && (e.key === 'Enter' || e.key === ' ') && pick(i)}
            >
              {open ? (
                <>
                  <button type="button" className="close" aria-label="Cerrar" data-ref={`${at}/cerrar`} onClick={() => pick(null)}>×</button>
                  <span className="o-lab">{t.title}</span>
                  <h2 className="d-title" data-ref={`${at}/titulo`}>{t.head ?? t.title}</h2>
                  {t.text && <p className="o-text" data-ref={`${at}/texto`}>{t.text}</p>}
                  <div className="detail" data-ref={`${at}/detalle`}><Blocks blocks={t.blocks} at={at} /></div>
                  {t.source && <span className="o-src">Fuente: {t.source}</span>}
                  {pend && t.todo && (
                    <div className="o-todo"><b>Falta</b>{t.todo.map((x) => <span key={x}>{x}</span>)}</div>
                  )}
                  {t.nav?.map((n) => (
                    <button key={n.to} type="button" className={`go go-${n.pos}`} onClick={() => pick(n.to)}>
                      {n.pos === 'left' && <Arrow left />}<span>{n.label}</span>{n.pos === 'br' && <Arrow />}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <h2>{t.title}</h2>
                  {t.img && <img className="t-img" src={t.img} alt="" draggable={false} />}
                  {t.folder && <Folder />}
                  {t.airplane && <MiniPhone />}
                  {t.box && <Box />}
                  {t.donut && <Donut data={t.donut} />}
                  {t.ring && <div className="t-ring" style={{ background: t.ring }} />}
                  {t.big && <div className="t-big">{t.big}</div>}
                  {t.sub && <span className="t-sub">{t.sub}</span>}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
