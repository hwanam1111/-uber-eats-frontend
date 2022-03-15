import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
  findRestaurantById,
  findRestaurantByIdVariables,
} from '../../__api__/findRestaurantById';

const FIND_RESTAURANT_BY_ID_QUERY = gql`
  query findRestaurantById($input: RestaurantInput!) {
    findRestaurantById(input: $input) {
      ok
      error
      result {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

function Restaurant() {
  const params = useParams<{ id: string }>();

  const { loading, data, error } = useQuery<
    findRestaurantById,
    findRestaurantByIdVariables
  >(FIND_RESTAURANT_BY_ID_QUERY, {
    variables: {
      input: {
        restaurantId: Number(params.id),
      },
    },
  });

  console.log(data);

  return (
    <div>
      <Helmet>
        <title>
          {data?.findRestaurantById.result?.name || ''} | Uber eats clone
        </title>
      </Helmet>
      <div
        className=" bg-gray-800 bg-center bg-cover py-48"
        style={{
          backgroundImage: `url(${data?.findRestaurantById.result?.coverImage})`,
        }}
      >
        <div className="bg-white w-3/12 py-8 pl-48">
          <h4 className="text-4xl mb-3">
            {data?.findRestaurantById.result?.name}
          </h4>
          <h5 className="text-sm font-light mb-2">
            {data?.findRestaurantById.result?.category?.name}
          </h5>
          <h6 className="text-sm font-light">
            {data?.findRestaurantById.result?.address}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
