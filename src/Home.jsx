import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { StaticContext, reduced } from './static.js';
import { ABOUT } from './content.js';
import PhoneDeck from './PhoneDeck.jsx';

// Foto de la rana que aparece como tarjeta y se despliega a pantalla completa,
// con el título entrando letra a letra. Misma idea que una composición de video,
// pero es DOM animado con una timeline de GSAP: corre en vivo en la página.
function Hero({ onVideo }) {
  const root = useRef(null);
  const isStatic = useContext(StaticContext);
  const [playing, setPlaying] = useState(false);

  useLayoutEffect(() => {
    if (isStatic || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.hero-img', { opacity: 0, x: 80, scale: 1.08 }, { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out' })
        .fromTo('.hero-letter', { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.07, ease: 'power4.out' }, '-=0.8')
        .fromTo('.hero-sub, .hero-actions', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, '-=0.4');
    }, root);
    return () => ctx.revert();
  }, [isStatic]);

  return (
    <div className="hero" ref={root} data-ref="inicio/portada">
      <img className="hero-img" src="/media/portada.png" alt="Rana de cristal sobre una hoja" draggable={false} data-ref="inicio/portada/imagen" />
      <div className="hero-copy">
        <h1 aria-label="Anura" data-ref="inicio/portada/titulo">
          {[...'Anura'].map((c, i) => (
            <span key={i} className="letter-mask" aria-hidden="true">
              <span className="hero-letter">{c}</span>
            </span>
          ))}
        </h1>
        <p className="hero-sub" data-ref="inicio/portada/texto">App para la identificación de anuros en Colombia</p>
        <div className="hero-actions">
          <button type="button" className="hero-btn" data-ref="inicio/portada/boton" onClick={onVideo}>
            Conócela
          </button>
          <button type="button" className="hero-play" aria-label="Ver video" data-ref="inicio/portada/play" onClick={() => setPlaying(true)}>
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </button>
        </div>
      </div>
      {playing && (
        <div className="hero-video" data-ref="inicio/portada/video">
          <video src="/media/anura-presentacion.mp4" autoPlay controls playsInline />
          <button type="button" className="close" aria-label="Cerrar video" data-ref="inicio/portada/cerrar" onClick={() => setPlaying(false)}>×</button>
        </div>
      )}
    </div>
  );
}

function About({ onBack }) {
  const ref = useRef(null);
  const isStatic = useContext(StaticContext);

  // Entra cuando el panel se vuelve visible al hacer scroll.
  useEffect(() => {
    if (isStatic) return ref.current.classList.add('in');
    const io = new IntersectionObserver(([e]) => e.isIntersecting && ref.current.classList.add('in'), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [isStatic]);

  return (
    <div className="tile about" ref={ref} data-ref="inicio/que-es">
      <div className="about-copy">
        <div className="about-text">
          <h2 data-ref="inicio/que-es/titulo">¿Qué es Anura?</h2>
          <p data-ref="inicio/que-es/texto">{ABOUT}</p>
        </div>
        <button type="button" className="back" aria-label="Volver a la portada" data-ref="inicio/que-es/descargar" onClick={onBack}>
          <svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        </button>
      </div>
      <PhoneDeck at="inicio/que-es/video" />
    </div>
  );
}

export default function Home() {
  const root = useRef(null);
  const go = (i) => root.current.children[i]?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="view home" ref={root}>
      <section className="panel"><Hero onVideo={() => go(1)} /></section>
      <section className="panel"><About onBack={() => go(0)} /></section>
    </div>
  );
}
