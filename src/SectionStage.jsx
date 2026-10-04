import { useEffect, useRef, useState } from 'react';
import { AbsoluteFill } from 'remotion';
import { Player } from '@remotion/player';
import { TransitionSeries, springTiming } from '@remotion/transitions';
import SectionView from './SectionView.jsx';
import { StaticContext } from './static.js';
import { SECTIONS } from './sections.jsx';
import { EFFECTS, FPS, TRANSITION_FRAMES, HOLD_FRAMES } from './transitions.js';

// Composición de Remotion: sección saliente -> transición -> sección entrante.
function TransitionScene({ from, to, effect, setEffect, dir, width, height }) {
  const presentation = EFFECTS[effect].make({ dir, width, height });
  return (
    <StaticContext.Provider value={true}>
    <AbsoluteFill style={{ background: 'var(--bg)' }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={TRANSITION_FRAMES}>
          <SectionView id={from} effect={effect} setEffect={setEffect} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={presentation}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: TRANSITION_FRAMES,
          })}
        />
        <TransitionSeries.Sequence durationInFrames={TRANSITION_FRAMES + HOLD_FRAMES}>
          <SectionView id={to} effect={effect} setEffect={setEffect} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
    </StaticContext.Provider>
  );
}

function TransitionPlayer({ tr, size, effect, setEffect, onEnd }) {
  const ref = useRef(null);
  useEffect(() => {
    const player = ref.current;
    if (!player) return;
    player.addEventListener('ended', onEnd);
    return () => player.removeEventListener('ended', onEnd);
  }, [onEnd]);

  return (
    <Player
      ref={ref}
      component={TransitionScene}
      inputProps={{ ...tr, effect, setEffect, width: size.w, height: size.h }}
      durationInFrames={TRANSITION_FRAMES * 2 + HOLD_FRAMES - TRANSITION_FRAMES}
      fps={FPS}
      compositionWidth={size.w}
      compositionHeight={size.h}
      style={{ width: '100%', height: '100%' }}
      autoPlay
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      allowFullscreen={false}
      acknowledgeRemotionLicense
    />
  );
}

export default function SectionStage({ active, effect, setEffect }) {
  const box = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [shown, setShown] = useState(active);
  const [tr, setTr] = useState(null); // { id, from, to, dir } mientras dura la transición
  const prevActive = useRef(active);

  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (active === prevActive.current) return;
    const index = (id) => SECTIONS.findIndex((s) => s.id === id);
    const dir = index(active) > index(prevActive.current) ? 1 : -1;
    prevActive.current = active;

    const reduce = false;
    if (reduce || !size.w || !size.h) {
      setTr(null);
      setShown(active);
      return;
    }
    // Si se pulsa durante otra transición, parte desde la sección a la que iba.
    setTr((current) => ({
      id: (current?.id ?? 0) + 1,
      from: current ? current.to : shown,
      to: active,
      dir,
    }));
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const finish = useRef(null);
  finish.current = () => {
    if (!tr) return;
    setShown(tr.to);
    setTr(null);
  };

  return (
    <div className="stage" ref={box}>
      {tr ? (
        <TransitionPlayer
          key={tr.id}
          tr={tr}
          size={size}
          effect={effect}
          setEffect={setEffect}
          onEnd={() => finish.current()}
        />
      ) : (
        <SectionView id={shown} effect={effect} setEffect={setEffect} />
      )}
    </div>
  );
}
