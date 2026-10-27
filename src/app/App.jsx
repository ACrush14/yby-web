import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes.jsx';

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
