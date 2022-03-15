import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { render, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login, { LOGIN_MUTATION } from '../login';

describe('<Login />', () => {
  let renderResult: RenderResult;
  let mockClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();

      renderResult = render(
        <Router>
          <HelmetProvider>
            <ApolloProvider client={mockClient}>
              <Login />
            </ApolloProvider>
          </HelmetProvider>
        </Router>,
      );
    });
  });

  it('should render Ok', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Login | Uber eats clone');
    });
  });

  it('displays email error', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);

    await waitFor(() => {
      userEvent.type(email, 'email@naver.com');
      userEvent.clear(email);
    });
    expect(getByRole('alert')).toHaveTextContent('Email is required');
  });

  it('displays password error', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const password = getByPlaceholderText(/password/i);

    await waitFor(() => {
      userEvent.type(password, 'password');
      userEvent.clear(password);
    });
    expect(getByRole('alert')).toHaveTextContent('Password is required');
  });

  it('submits form and calls mutation and success', async () => {
    const formData = {
      email: 'email@test.com',
      password: '123123asas',
    };
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');
    const mockedMutationRes = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: 'test-token',
          error: null,
        },
      },
    });

    mockClient.setRequestHandler(LOGIN_MUTATION, mockedMutationRes);
    jest.spyOn(Storage.prototype, 'setItem');

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
    });

    await waitFor(() => {
      userEvent.click(submitBtn);
    });

    expect(mockedMutationRes).toHaveBeenCalledTimes(1);
    expect(mockedMutationRes).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'uber-eats-token',
      'test-token',
    );
  });

  it('submits form and calls mutation and fail', async () => {
    const formData = {
      email: 'email@test.com',
      password: '123123asas',
    };
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');
    const mockedMutationRes = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: false,
          token: null,
          error: 'mutation-error',
        },
      },
    });

    mockClient.setRequestHandler(LOGIN_MUTATION, mockedMutationRes);

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
    });

    await waitFor(() => {
      userEvent.click(submitBtn);
    });

    expect(mockedMutationRes).toHaveBeenCalledTimes(1);
    expect(mockedMutationRes).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    expect(getByRole('alert')).toHaveTextContent('mutation-error');
  });
});
