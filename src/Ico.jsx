// Iconos SVG (sin emojis). `n` = nombre.
const D = {
  check: 'M5 12.5l4.5 4.5L19 7',
  x: 'M6 6l12 12M18 6L6 18',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  flask: 'M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12l2-1-1-3-2 .5-1.5-1.5.5-2-3-1-1 2h-2l-1-2-3 1 .5 2L6.5 8 4.5 7.5l-1 3 2 1v2l-2 1 1 3 2-.5L8 18.5l-.5 2 3 1 1-2h2l1 2 3-1-.5-2 1.5-1.5 2 .5 1-3-2-1z',
  thumbDown: 'M10 15V4H5a1 1 0 0 0-1 1l1.5 9a1 1 0 0 0 1 .8H10zM10 15l3 6a2 2 0 0 0 2-2v-4h4a1 1 0 0 0 1-1.2l-1.2-7A1 1 0 0 0 18 6h-8',
  thumbUp: 'M14 9v11h5a1 1 0 0 0 1-1l-1.5-9a1 1 0 0 0-1-.8H14zM14 9l-3-6a2 2 0 0 0-2 2v4H5a1 1 0 0 0-1 1.2l1.2 7A1 1 0 0 0 6 18h8',
  comment: 'M4 5h16v11H9l-5 4z',
  photo: 'M3 6h4l2-2h6l2 2h4v13H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  pin: 'M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
  download: 'M12 3v12M7 11l5 5 5-5M4 20h16',
  play: 'M8 5v14l11-7z',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h3v3h-3zM19 14v6M14 19h3',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  box: 'M3 8l9-5 9 5v9l-9 5-9-5zM3 8l9 5 9-5M12 13v9',
  cube: 'M12 2l9 5v10l-9 5-9-5V7zM12 12l9-5M12 12L3 7M12 12v10',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  leaf: 'M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19c3-5 6-8 10-10',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  ban: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM5.6 5.6l12.8 12.8',
  alert: 'M12 3l10 18H2zM12 10v5M12 18v.5',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  mountain: 'M3 20l6-10 4 6 3-4 5 8z',
  heart: 'M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6',
  team: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 20a7 7 0 0 1 14 0M17 11a3 3 0 1 0 0-6M18 14a6 6 0 0 1 4 6',
};

export default function Ico({ n, ...p }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d={D[n]} />
    </svg>
  );
}
