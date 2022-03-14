import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/button';
import FormError from '../../components/form-error';
import FormInput from '../../components/form-input';
import useMe from '../../hooks/useMe';
import { editProfile, editProfileVariables } from '../../__api__/editProfile';

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IEditProfileForm {
  email?: string;
  password?: string;
}

function EditProfile() {
  const client = useApolloClient();
  const { data: userData } = useMe();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IEditProfileForm>({
    mode: 'all',
    defaultValues: {
      email: userData?.me.email,
    },
  });

  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    const { email: newEmail } = getValues();

    if (ok && userData?.me) {
      const { id: userId, email: prevEmail } = userData.me;

      client.writeFragment({
        id: `User:${userId}`,
        fragment: gql`
          fragment EditedProfile on User {
            email
            verified
          }
        `,
        data: {
          email: newEmail,
          verified: prevEmail === newEmail,
        },
      });
    }
  };
  const [editProfile, { loading, data: editProfileMutationResult }] =
    useMutation<editProfile, editProfileVariables>(EDIT_PROFILE_MUTATION, {
      onCompleted,
    });

  const onSubmit = useCallback(() => {
    if (!loading) {
      const { email, password } = getValues();
      editProfile({
        variables: {
          input: {
            email,
            ...(password !== '' && { password }),
          },
        },
      });
    }
  }, [loading]);

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-sm flex flex-col items-center">
        <h4>Edit Profile</h4>
        <form
          className="flex flex-col mt-10 w-full px-3 mb-5 lg:mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            type="email"
            placeholder="Email"
            required={false}
            register={register('email', {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'You must enter it in the form of an email.',
              },
            })}
          />
          {errors.email?.message && (
            <FormError message={errors.email.message} />
          )}
          <FormInput
            type="password"
            placeholder="Password"
            required={false}
            register={register('password', {
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  'It must be a password containing 1-8 digits of numeric English.',
              },
            })}
          />
          {errors.password?.message && (
            <FormError message={errors.password.message} />
          )}
          <Button
            actionText="Edit Profile"
            loading={loading}
            canClick={!loading && isValid}
          />
          {editProfileMutationResult?.editProfile.error && (
            <FormError message={editProfileMutationResult.editProfile.error} />
          )}
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
