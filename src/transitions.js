import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { flip } from '@remotion/transitions/flip';
import { iris } from '@remotion/transitions/iris';
import { clockWipe } from '@remotion/transitions/clock-wipe';

// Frames de la transición (30 fps) y frames extra para que la vista nueva quede asentada.
export const FPS = 30;
export const TRANSITION_FRAMES = 24;
export const HOLD_FRAMES = 6;

// `dir` = 1 si el botón pulsado está más abajo en el navbar, -1 si está más arriba.
export const EFFECTS = {
  slide: {
    label: 'Deslizar',
    make: ({ dir }) => slide({ direction: dir > 0 ? 'from-bottom' : 'from-top' }),
  },
  fade: { label: 'Fundido', make: () => fade() },
  wipe: {
    label: 'Cortina',
    make: ({ dir }) => wipe({ direction: dir > 0 ? 'from-bottom' : 'from-top' }),
  },
  flip: {
    label: 'Giro 3D',
    make: ({ dir }) => flip({ direction: dir > 0 ? 'from-bottom' : 'from-top' }),
  },
  iris: { label: 'Iris', make: ({ width, height }) => iris({ width, height }) },
  clock: { label: 'Reloj', make: ({ width, height }) => clockWipe({ width, height }) },
};

export const DEFAULT_EFFECT = 'slide';
