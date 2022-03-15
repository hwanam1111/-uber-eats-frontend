import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

interface IAllTheProviders {
  children: React.ReactChild;
}

function AllTheProviders({ children }: IAllTheProviders) {
  return (
    <HelmetProvider>
      <Router>{children}</Router>
    </HelmetProvider>
  );
}

const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
