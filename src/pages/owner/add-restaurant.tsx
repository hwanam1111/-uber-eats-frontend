import { gql, useMutation } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Button from '../../components/button';
import FormError from '../../components/form-error';
import FormInput from '../../components/form-input';
import {
  createRestaurant,
  createRestaurantVariables,
} from '../../__api__/createRestaurant';

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IAddRestaurantForm {
  name: string;
  address: string;
  categoryName: string;
  coverImage: string;
}

function AddRestaurant() {
  const [uploading, setUploading] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IAddRestaurantForm>({
    mode: 'all',
  });

  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok },
    } = data;

    if (ok) {
      setUploading(false);
    }
  };
  const [createRestaurant, { loading, data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
  });

  const onSubmit = useCallback(async () => {
    try {
      setUploading(true);
      if (!loading) {
        const { name, address, categoryName, coverImage } = getValues();
        const actualImage = coverImage[0];
        const formBody = new FormData();
        formBody.append('file', actualImage);
        const { url } = await (
          await fetch('http://localhost:4000/uploads/', {
            method: 'POST',
            body: formBody,
          })
        ).json();

        createRestaurant({
          variables: {
            input: {
              name,
              address,
              categoryName,
              coverImage: url,
            },
          },
        });
      }
    } catch (err) {
      console.log('file upload err: ', err);
    }
  }, [loading]);

  return (
    <>
      <Helmet>
        <title>Add Restaurant | Uber eats clone</title>
      </Helmet>
      <div className="lg:px-16 mt-20">
        <h1>Create Restaurant</h1>
        <form
          className="flex flex-col mt-10 w-full px-3 mb-5 lg:mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            type="text"
            placeholder="Restaurant name"
            register={register('name', {
              required: 'Restaurant is required',
            })}
            required
          />
          {errors.name?.message && <FormError message={errors.name.message} />}
          <FormInput
            type="text"
            placeholder="Address"
            register={register('address', {
              required: 'Address is required',
            })}
            required
          />
          {errors.address?.message && (
            <FormError message={errors.address.message} />
          )}
          <FormInput
            type="text"
            placeholder="Category name"
            register={register('categoryName', {
              required: 'Category name is required',
            })}
            required
          />
          {errors.categoryName?.message && (
            <FormError message={errors.categoryName.message} />
          )}
          <div>
            <input
              type="file"
              {...register('coverImage', {
                required: 'Cover image is required',
              })}
              name="coverImage"
              accept="image/*"
            />
          </div>
          <Button
            actionText="Create Restaurant"
            loading={uploading || loading}
            canClick={!uploading && isValid && !loading}
          />
          {data?.createRestaurant?.error && (
            <FormError message={data.createRestaurant.error} />
          )}
        </form>
      </div>
    </>
  );
}

export default AddRestaurant;
