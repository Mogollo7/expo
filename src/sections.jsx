// Secciones del navbar. `kind`: home | flow (bento con tiles de content.js) | settings.
export const SECTIONS = [
  {
    id: 'inicio',
    label: 'Inicio',
    kind: 'home',
    icon: (
      <>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </>
    ),
  },
  {
    id: 'animales',
    label: 'Animales',
    kind: 'flow',
    icon: (
      <>
        <circle cx="7.5" cy="7" r="2.5" />
        <circle cx="16.5" cy="7" r="2.5" />
        <path d="M4 14c0-3 3-5 8-5s8 2 8 5-3 6-8 6-8-3-8-6z" />
        <path d="M8 15c2.5 1.5 5.5 1.5 8 0" />
      </>
    ),
  },
  {
    id: 'app',
    label: 'App',
    kind: 'flow',
    icon: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    id: 'admin',
    label: 'Admin',
    kind: 'flow',
    icon: (
      <>
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </>
    ),
  },
  {
    id: 'ia',
    label: 'IA',
    kind: 'flow',
    icon: (
      <>
        <path d="M12 2l9 5v10l-9 5-9-5V7z" />
        <path d="M12 12l9-5M12 12L3 7M12 12v10" />
      </>
    ),
  },
  {
    id: 'resultados',
    label: 'Resultados',
    kind: 'flow',
    icon: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </>
    ),
  },
];
