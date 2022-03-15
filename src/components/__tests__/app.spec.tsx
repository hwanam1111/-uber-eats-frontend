import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { isLoggedInVar } from '../../apollo';
import App from '../app';

jest.mock(
  '../../routers/logged-out-router',
  () =>
    function LoggedOutRouter() {
      return <span>logged-out</span>;
    },
);

jest.mock(
  '../../routers/logged-in-router',
  () =>
    function LoggedInRouter() {
      return <span>logged-in</span>;
    },
);

describe('<App />', () => {
  it('renders LoggedOutRouter', () => {
    const { getByText } = render(<App />);
    getByText('logged-out');
  });

  it('renders LoggedInRouter', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => isLoggedInVar(true));
    getByText('logged-in');
  });
});
