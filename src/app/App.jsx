import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppRoutes } from './routes.jsx';

export function App() {
  return (
    <BrowserRouter>
      <Toaster
        richColors
        position="top-right"
        closeButton
        toastOptions={{
          closeButtonAriaLabel: 'Fechar notificação',
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}
