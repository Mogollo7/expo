import { useLayoutEffect, useRef } from 'react';
import { SECTIONS } from './sections.jsx';

const reduced = () => false;

export default function Nav({ active, onChange }) {
  const nav = useRef(null);
  const indicator = useRef(null);
  const first = useRef(true);

  // Desliza el círculo indicador hasta el botón activo.
  useLayoutEffect(() => {
    const move = (animate) => {
      const btn = nav.current.querySelector(`[data-id="${active}"]`);
      const el = indicator.current;
      if (!animate) el.style.transition = 'none';
      el.style.setProperty('--y', `${btn.offsetTop}px`);
      if (!animate) {
        void el.offsetWidth;
        el.style.transition = '';
      }
    };
    move(!first.current);
    if (!first.current && !reduced()) {
      indicator.current.animate(
        [{ scale: '1 1' }, { scale: '.85 1.25', offset: 0.5 }, { scale: '1 1' }],
        { duration: 450, easing: 'ease' },
      );
    }
    first.current = false;

    const onResize = () => move(false);
    addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  }, [active]);

  const handleClick = (e, id) => {
    if (id === active) return;
    if (!reduced()) {
      e.currentTarget.querySelector('svg').animate(
        [
          { transform: 'scale(.6) rotate(-12deg)' },
          { transform: 'scale(1.3) rotate(6deg)', offset: 0.6 },
          { transform: 'scale(1.18) rotate(0)' },
        ],
        { duration: 450, easing: 'cubic-bezier(.34,1.56,.64,1)' },
      );
    }
    onChange(id);
  };

  return (
    <div className="nav-wrap">
      <nav className="nav" aria-label="Secciones" ref={nav}>
        <span className="indicator" ref={indicator} aria-hidden="true" />
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            data-id={s.id}
            data-ref={s.id}
            type="button"
            aria-label={s.label}
            title={s.label}
            aria-current={s.id === active ? 'page' : undefined}
            onClick={(e) => handleClick(e, s.id)}
          >
            <svg viewBox="0 0 24 24">{s.icon}</svg>
          </button>
        ))}
      </nav>
    </div>
  );
}
