import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button';
import FormError from '../../components/form-error';
import FormInput from '../../components/form-input';
import { createMenu, createMenuVariables } from '../../__api__/createMenu';
import { MY_RESTAURANT_QUERY } from './my-restaurant';

const CREATE_MENU_MUTATION = gql`
  mutation createMenu($input: CreateMenuInput!) {
    createMenu(input: $input) {
      ok
      error
    }
  }
`;

interface IAddMenuForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

function AddMenu() {
  const navigate = useNavigate();
  const params = useParams<{ restaurantId: string }>();
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<IAddMenuForm>({
    mode: 'all',
  });

  const [currentOptionId, setCurrentOptionId] = useState<number>(0);
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const onAddOptionClick = () => {
    setCurrentOptionId((current) => current + 1);
    setOptionsNumber((current) => [...current, currentOptionId + 1]);
  };

  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => idToDelete !== id));
    setValue(`${idToDelete}-optionName`, '', { shouldValidate: true });
    setValue(`${idToDelete}-optionExtra`, '');
  };

  const onCompleted = (data: createMenu) => {
    const {
      createMenu: { ok },
    } = data;

    if (ok) {
      navigate(-1);
    }
  };

  const [createMenu, { data, loading }] = useMutation<
    createMenu,
    createMenuVariables
  >(CREATE_MENU_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: Number(params.restaurantId),
          },
        },
      },
    ],
    onCompleted,
  });

  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    const optionObjects = optionsNumber.map((theId) => ({
      name: rest[`${theId}-optionName`],
      extra: Number(rest[`${theId}-optionExtra`]),
    }));

    createMenu({
      variables: {
        input: {
          restaurantId: Number(params.restaurantId),
          name,
          price: +price,
          description,
          options: optionObjects,
        },
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Add Menu | Uber eats clone</title>
      </Helmet>
      <div className="lg:px-16 mt-20">
        <h1>Create Menu</h1>
        <form
          className="flex flex-col mt-10 w-full px-3 mb-5 lg:mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            type="text"
            placeholder="Menu name"
            register={register('name', {
              required: 'Menu name is required',
            })}
            required
          />
          {errors.name?.message && <FormError message={errors.name.message} />}
          <FormInput
            type="text"
            placeholder="Menu description"
            register={register('description', {
              required: 'Menu description is required',
            })}
            required
          />
          {errors.description?.message && (
            <FormError message={errors.description.message} />
          )}
          <FormInput
            type="number"
            placeholder="Menu price"
            register={register('price', {
              required: 'Menu price is required',
            })}
            required
          />
          {errors.price?.message && (
            <FormError message={errors.price.message} />
          )}
          <div className="my-10">
            <h4 className="font-medium  mb-3 text-lg">Menu Options</h4>
            <button
              type="button"
              onClick={onAddOptionClick}
              className=" cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-"
            >
              Add Menu Option
            </button>
            {optionsNumber.length !== 0 && (
              <div className="mt-5">
                {optionsNumber.map((id) => (
                  <div key={id}>
                    <FormInput
                      type="string"
                      placeholder="Option name"
                      register={register(`${id}-optionName`, {
                        required: 'Option name is required',
                      })}
                      required
                    />
                    <FormInput
                      type="number"
                      placeholder="Option extra price"
                      register={register(`${id}-optionExtra`)}
                      required={false}
                    />
                    <button type="button" onClick={() => onDeleteClick(id)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            actionText="Create Menu"
            loading={loading}
            canClick={isValid && !loading}
          />
          {data?.createMenu?.error && (
            <FormError message={data.createMenu.error} />
          )}
        </form>
      </div>
    </>
  );
}

export default AddMenu;
