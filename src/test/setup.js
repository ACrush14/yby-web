import '@testing-library/jest-dom';

// Mock de ResizeObserver para compatibilidade com os gráficos Recharts em ambiente jsdom
if (typeof global.ResizeObserver === 'undefined') {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
