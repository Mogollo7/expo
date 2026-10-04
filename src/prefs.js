import { useEffect, useState } from 'react';

const read = (k, d) => {
  try {
    const v = localStorage.getItem(`pref:${k}`);
    return v === null ? d : v === '1';
  } catch {
    return d;
  }
};

// Preferencia booleana guardada en el navegador y compartida entre componentes.
export function usePref(k, d = true) {
  const [v, setV] = useState(() => read(k, d));
  useEffect(() => {
    const h = () => setV(read(k, d));
    addEventListener('prefs', h);
    return () => removeEventListener('prefs', h);
  }, [k, d]);
  const set = (x) => {
    try { localStorage.setItem(`pref:${k}`, x ? '1' : '0'); } catch { /* sin almacenamiento */ }
    dispatchEvent(new Event('prefs'));
    setV(x);
  };
  return [v, set];
}
