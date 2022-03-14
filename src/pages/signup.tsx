import { gql, useMutation } from '@apollo/client';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/button';
import FormError from '../components/form-error';
import FormInput from '../components/form-input';
import logo from '../images/logo.svg';
import {
  signUpMutation,
  signUpMutationVariables,
} from '../__api__/signUpMutation';
import { UserRole } from '../__api__/globalTypes';
import FormSelect from '../components/form-select';

interface ISignUpForm {
  email: string;
  password: string;
  role: UserRole;
}

const SIGNUP_MUTATION = gql`
  mutation signUpMutation($signUpInput: CreateAccountInput!) {
    createAccount(input: $signUpInput) {
      ok
      error
    }
  }
`;

function SignUp() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ISignUpForm>({
    mode: 'all',
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const navigate = useNavigate();
  const onCompleted = (data: signUpMutation) => {
    const {
      createAccount: { ok },
    } = data;

    if (ok) {
      navigate('/', { replace: true });
    }
  };

  const [signUpMutation, { loading, data: signUpMutationResult }] = useMutation<
    signUpMutation,
    signUpMutationVariables
  >(SIGNUP_MUTATION, {
    onCompleted,
  });

  const onSubmit = useCallback(() => {
    if (!loading) {
      const { email, password, role } = getValues();
      signUpMutation({
        variables: {
          signUpInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  }, [loading]);

  return (
    <>
      <Helmet>
        <title>Sign Up | Uber eats clone</title>
      </Helmet>
      <div className="h-screen flex items-center flex-col mt-10 lg:mt-32">
        <div className="w-full max-w-screen-sm flex flex-col items-center">
          <img src={logo} alt="logo" className="w-48 mb-12" />
          <h4 className="w-full font-medium text-left text-2xl mb-5 px-3">
            Get started
          </h4>
          <form
            className="flex flex-col mt-10 w-full px-3 mb-5 lg:mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              type="email"
              placeholder="Email"
              register={register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'You must enter it in the form of an email.',
                },
              })}
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
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    'It must be a password containing 1-8 digits of numeric English.',
                },
              })}
              required
            />
            {errors.password?.message && (
              <FormError message={errors.password.message} />
            )}
            <FormSelect
              register={register('role', {
                required: 'Role is required',
              })}
            >
              {Object.keys(UserRole).map((role) => (
                <option value={role} key={role}>
                  {role}
                </option>
              ))}
            </FormSelect>
            <Button
              actionText={loading ? 'Loading...' : 'Sign Up'}
              canClick={isValid && !loading}
              loading={loading}
            />
            {signUpMutationResult?.createAccount.error && (
              <FormError message={signUpMutationResult.createAccount.error} />
            )}
          </form>
          <div>
            Already have an account?{' '}
            <Link to="/" className="text-lime-500 hover:underline">
              Log in now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
