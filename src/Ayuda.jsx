import Donut from './Donut.jsx';
import { CIUDADANA } from './content.js';

// «Tú puedes ayudar»: a la izquierda el dato (torta + frase), a la derecha la captura de la app como celular.
export default function Ayuda({ src }) {
  return (
    <div className="ayuda">
      <div className="ay-left">
        <div className="ay-pie"><Donut data={CIUDADANA} /></div>
        <p className="ay-note">de las observaciones registradas en Colombia provienen de la ciencia ciudadana.</p>
      </div>
      <div className="ay-right">
        <div className="ay-phone"><img src={src} alt="Resultado en la app" draggable={false} /></div>
        <b>Toma la foto, la app te dice la especie</b>
      </div>
    </div>
  );
}
