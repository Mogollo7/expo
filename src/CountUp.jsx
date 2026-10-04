import { useEffect, useRef, useState } from 'react';

// Número que sube de 0 a `to` cada vez que se hace visible (entero, con ease-out). Sin atajo por «reducir movimiento»: es un cambio de cifra, no un desplazamiento. `format` da formato al valor.
export default function CountUp({ to, ms = 1800, delay = 300, format = String }) {
  const el = useRef(null);
  const [v, setV] = useState(to); // visible aunque no corra la animación; al hacerse visible reinicia en 0
  useEffect(() => {
    let raf;
    const run = () => {
      const t0 = performance.now() + delay;
      const tick = (t) => {
        const p = Math.min(Math.max((t - t0) / ms, 0), 1);
        setV(Math.round(to * (1 - (1 - p) ** 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) { setV(0); run(); }
    });
    io.observe(el.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, ms, delay]);
  return <span ref={el} style={{ font: 'inherit', opacity: 1, margin: 0 }}>{format(v)}</span>;
}
