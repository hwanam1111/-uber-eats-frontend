import { gql, useMutation } from '@apollo/client';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import FormError from '../components/form-error';
import FormInput from '../components/form-input';
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
    formState: { errors },
  } = useForm<ILoginForm>();

  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;

    if (ok) {
      console.log(token);
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
    <div className="h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h2 className="font-bold text-3xl text-gray-800">Log In</h2>
        <form
          className="flex flex-col mt-10 px-5"
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
          <button
            type="submit"
            className="mt-2 py-1.5 border border-red-400 hover:bg-red-400 hover:text-white transition-all rounded-md"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          {loginMutationResult?.login.error && (
            <FormError message={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
