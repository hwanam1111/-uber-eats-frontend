/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { findRestaurantById_findRestaurantById_result_menu_options } from '../__api__/findRestaurantById';

interface IMenuProps {
  name: string;
  description: string;
  price: number;
  isCustomer: boolean;
  options?: findRestaurantById_findRestaurantById_result_menu_options[] | null;
}

function Menu({ name, description, price, isCustomer, options }: IMenuProps) {
  return (
    <div className="flex flex-col px-6 py-4 border border-gray-400 rounded-md transition-colors cursor-pointer hover:border-gray-700">
      <h2 className="font-medium text-xl">{name}</h2>
      <p className="text-md mt-6 text-gray-500">{description}</p>
      <span className="text-lg mt-5 text-gray-600">$ {price}</span>
      {isCustomer && options?.length !== 0 && (
        <div className="mt-5">
          {options?.map((option) => (
            <div className="flex items-center" key={option.name}>
              <h5 className="mr-2">{option.name} :</h5>
              <h5>$ {option.extra}</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
