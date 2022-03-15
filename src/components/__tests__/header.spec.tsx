import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ME_QUERY } from '../../hooks/useMe';
import Header from '../header';

describe('<Header />', () => {
  it('renders verify banner', async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: 'test@email.com',
                    role: 'Client',
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>,
      );

      await new Promise((resolve) => {
        setTimeout(resolve, 5);
      });
      getByText('Please verify your email');
    });
  });

  it('renders verify banner', async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: 'test@email.com',
                    role: 'Client',
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>,
      );

      await new Promise((resolve) => {
        setTimeout(resolve, 5);
      });
      expect(queryByText('Please verify your email')).toBeNull();
    });
  });
});
