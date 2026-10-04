import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './flow.css';
import './extra.css';
import './theme.css';

// Las etiquetas de ubicación (app/t3…) van ocultas por defecto: se activan en Ajustes.
try { document.documentElement.dataset.ids = localStorage.getItem('ids') === 'on' ? 'on' : 'off'; } catch { document.documentElement.dataset.ids = 'off'; }

createRoot(document.getElementById('root')).render(<App />);
