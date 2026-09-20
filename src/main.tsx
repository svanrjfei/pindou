import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against third-party browser extension injection errors (e.g., MetaMask, web3 wallets)
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reasonMsg = event.reason?.message || String(event.reason || '');
    if (
      reasonMsg.includes('MetaMask') ||
      reasonMsg.includes('ethereum') ||
      reasonMsg.includes('Failed to connect')
    ) {
      event.preventDefault();
    }
  });

  window.addEventListener('error', (event) => {
    const errorMsg = event.message || '';
    if (
      errorMsg.includes('MetaMask') ||
      errorMsg.includes('ethereum') ||
      errorMsg.includes('Failed to connect to MetaMask')
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
