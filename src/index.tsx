import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import WordleHelper from './WordleHelper';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <WordleHelper />
  </StrictMode>
);