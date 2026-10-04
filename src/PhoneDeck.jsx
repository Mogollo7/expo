import { useState } from 'react';
import { CAPTURAS } from './content.js';

// Baraja de celulares: cada captura es una carta; la activa va al frente y las demás asoman detrás.
// Se navega tocando una carta o uno de los círculos de abajo. El título explica de qué es la captura.
export default function PhoneDeck({ at }) {
  const [on, setOn] = useState(0);
  const cur = CAPTURAS[on];
  return (
    <div className="deck-wrap" data-ref={at}>
      <div className="deck" data-ref={`${at}/cartas`}>
        {CAPTURAS.map((c, i) => {
          const d = i - on;
          return (
            <button
              key={c.src}
              type="button"
              aria-label={c.title}
              data-ref={`${at}/c${i + 1}`}
              className={`card ${d === 0 ? 'front' : ''}`}
              style={{ '--d': Math.sign(d) * Math.min(Math.abs(d), 3), '--a': Math.min(Math.abs(d), 3), zIndex: 10 - Math.abs(d) }}
              onClick={() => setOn(i)}
            >
              <img src={c.src} alt={c.title} draggable={false} />
            </button>
          );
        })}
      </div>
      <div className="dots" data-ref={`${at}/circulos`}>
        {CAPTURAS.map((c, i) => (
          <button
            key={c.src}
            type="button"
            aria-label={c.title}
            data-ref={`${at}/o${i + 1}`}
            className={i === on ? 'on' : ''}
            onClick={() => setOn(i)}
          />
        ))}
      </div>
      <div className="deck-caption" key={on} data-ref={`${at}/titulo`}>
        <h3>{cur.title}</h3>
        <p>{cur.text}</p>
      </div>
    </div>
  );
}
