import './popup.css';
import { App } from './App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#app') as HTMLDivElement);

root.render(<App />);
