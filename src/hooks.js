import { useEffect, useState } from 'react';

// Paso que avanza solo: 0..n-1 cada `ms` ms; `run=false` lo pausa. Devuelve [paso, setPaso].
export function useLoop(n, ms, run = true) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms, run]);
  return [i, setI];
}

// Guion: lista de { ms } que se recorre en bucle; devuelve el índice del paso actual y un reinicio.
export function useScript(steps) {
  const [i, setI] = useState(0);
  const [k, setK] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % steps.length), steps[i].ms);
    return () => clearTimeout(t);
  }, [i, k, steps]);
  return [i, () => { setI(0); setK((v) => v + 1); }];
}

// Texto que se escribe letra a letra cuando `on` es true; vuelve a vacío cuando es false.
export function useTyped(text, on, speed = 45) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) { setN(0); return; }
    const t = setInterval(() => setN((v) => (v < text.length ? v + 1 : v)), speed);
    return () => clearInterval(t);
  }, [text, on, speed]);
  return text.slice(0, n);
}

// Número que sube de 0 a `to` mientras `on` es true (ease-out); vuelve a 0 cuando es false.
export function useCount(to, on, ms = 1800) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) { setV(0); return; }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / ms, 1);
      setV(Math.round(to * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, on, ms]);
  return v;
}

export const fmtN = (n) => n.toLocaleString('es-CO').replace(/\./g, ' ');
