import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { RenderResult } from '@testing-library/react';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { render, waitFor } from '../../test-utils';
import SignUp from '../signup';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => {
  const realModule = jest.requireActual('react-router-dom');
  return {
    ...realModule,
    useNavigate: () => mockPush,
  };
});

describe('<SignUp />', () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <SignUp />
        </ApolloProvider>,
      );
    });
  });
  it('renders OK', async () => {
    await waitFor(() =>
      expect(document.title).toBe('Sign Up | Uber eats clone'),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
