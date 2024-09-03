import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx';
import './index.css';

// Wrap App with BrowserRouter to enable routing
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Add BrowserRouter here */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
