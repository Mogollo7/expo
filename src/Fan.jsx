import { useState } from 'react';

const MAX_CM = 4; // la regla del tamaño llega hasta 4 cm

// Abanico de cartas: juntas al abrir; al tocar el centro se despliegan ladeadas.
// Cada carta: foto → ficha corta (nombre, tamaño) → ficha más grande (dónde vive, dato curioso) → foto.
export default function Fan({ items }) {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(null); // { i, lvl }
  const mid = (items.length - 1) / 2;

  const tap = (i) => {
    if (!open) return setOpen(true);
    if (sel?.i !== i) return setSel({ i, lvl: 1 });
    setSel(sel.lvl === 1 ? { i, lvl: 2 } : null);
  };

  return (
    <div className={`fan ${open ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && (setSel(null), setOpen(false))}>
      {items.map((it, i) => {
        const k = i - mid;
        const lvl = sel?.i === i ? sel.lvl : 0;
        const t = !open
          ? `translateX(${k * 6}px) rotate(${k * 1.5}deg)`
          : lvl === 2
            ? 'translateY(-2%) scale(1.5)'
            : lvl === 1
              ? 'translateY(-4%) scale(1.04)'
              : `translateX(${k * 88}%) translateY(${Math.abs(k) * 6}%) rotate(${k * 11}deg)`;
        const [lo, hi] = it.tam;
        return (
          <button
            key={it.name}
            type="button"
            className={`fcard ${lvl ? 'flip' : ''} ${lvl === 2 ? 'big' : ''}`}
            style={{ transform: t, zIndex: lvl ? 10 : 5 - Math.abs(Math.round(k)) }}
            onClick={() => tap(i)}
            aria-label={it.name}
          >
            <span className="fc ffront">
              <img src={it.src} alt="" draggable={false} />
              <i>{it.name}</i>
            </span>
            <span className="fc fback">
              <em>{it.name}</em>
              <b className="comun">{it.comun}</b>
              <span className="ruler" aria-label={`${lo} a ${hi} cm`}>
                <span className="ruler-bar"><span style={{ left: `${(lo / MAX_CM) * 100}%`, width: `${((hi - lo) / MAX_CM) * 100}%` }} /></span>
                <span className="ruler-txt">{lo}–{hi} cm</span>
              </span>
              {lvl === 2 && (
                <>
                  <span className="where">{it.vive}</span>
                  <span className="fun">{it.curioso}</span>
                </>
              )}
            </span>
          </button>
        );
      })}
      <small className="fan-hint">{!open ? 'Toca las cartas para abrirlas' : sel ? 'Toca otra vez para ver más' : 'Toca una carta para voltearla'}</small>
    </div>
  );
}
