import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from '../../pages/404';

describe('<PageNotFound />', () => {
  it('renders', async () => {
    render(
      <HelmetProvider>
        <Router>
          <PageNotFound />
        </Router>
      </HelmetProvider>,
    );

    await waitFor(() =>
      expect(document.title).toBe('Not Found | Uber eats clone'),
    );
  });
});
