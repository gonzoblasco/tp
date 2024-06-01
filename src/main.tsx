// main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import queryClient from './queryClient';
import App from './App';
import './index.css'; // Asegúrate de importar Tailwind CSS aquí

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);