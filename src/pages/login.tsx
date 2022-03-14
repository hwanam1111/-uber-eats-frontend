import { gql, useMutation } from '@apollo/client';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { authTokenVar, isLoggedInVar } from '../apollo';
import Button from '../components/button';
import FormError from '../components/form-error';
import FormInput from '../components/form-input';
import logo from '../images/logo.svg';
import {
  loginMutation,
  loginMutationVariables,
} from '../__api__/loginMutation';

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ILoginForm>({
    mode: 'all',
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;

    if (ok && token) {
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_STORAGE_TOKEN as string,
        token,
      );
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { loading, data: loginMutationResult }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = useCallback(() => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  }, [loading]);

  return (
    <>
      <Helmet>
        <title>Login | Uber eats clone</title>
      </Helmet>
      <div className="h-screen flex items-center flex-col mt-10 lg:mt-32">
        <div className="w-full max-w-screen-sm flex flex-col items-center">
          <img src={logo} alt="logo" className="w-48 mb-12" />
          <h4 className="w-full font-medium text-left text-2xl mb-5 px-3">
            Welcome back
          </h4>
          <form
            className="flex flex-col mt-10 w-full px-3 mb-5 lg:mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              type="email"
              placeholder="Email"
              register={register('email', { required: 'Email is required' })}
              required
            />
            {errors.email?.message && (
              <FormError message={errors.email.message} />
            )}
            <FormInput
              type="password"
              placeholder="Password"
              register={register('password', {
                required: 'Password is required',
              })}
              required
            />
            {errors.password?.message && (
              <FormError message={errors.password.message} />
            )}
            <Button
              actionText={loading ? 'Loading...' : 'Log In'}
              canClick={isValid && !loading}
              loading={loading}
            />
            {loginMutationResult?.login.error && (
              <FormError message={loginMutationResult.login.error} />
            )}
          </form>
          <div>
            New to Uber?{' '}
            <Link to="/signup" className="text-lime-500 hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
