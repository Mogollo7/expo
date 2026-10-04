import { createContext } from 'react';

// true dentro de las transiciones de Remotion: las vistas se muestran en su estado final, sin animar.
export const StaticContext = createContext(false);
// Las animaciones siempre corren, aunque el sistema pida «reducir movimiento».
export const reduced = () => false;

// Navegación entre secciones (la guía del presentador salta a la siguiente).
export const NavContext = createContext({ go: () => {} });
