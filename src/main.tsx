import { createRoot } from 'react-dom/client';
import App from './App';
import { CartProvider } from './cartContext';

createRoot(document.getElementById('root')!).render(
  <CartProvider>
  <App />
    </CartProvider>
);
