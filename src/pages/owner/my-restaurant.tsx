import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Menu from '../../components/menu';
import { MENU_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
  myRestaurant,
  myRestaurantVariables,
} from '../../__api__/myRestaurant';

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestuarantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...MenuParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${MENU_FRAGMENT}
`;

function MyRestaurant() {
  const params = useParams<{ id: string }>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: Number(params.id),
        },
      },
    },
  );

  return (
    <>
      <Helmet>
        <title>
          {data?.myRestaurant.restaurant.name || ''} | Uber eats clone
        </title>
      </Helmet>
      <div
        className="bg-gray-700 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      />
      <div className="lg:px-16 mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || 'Loading...'}
        </h2>
        <Link
          to={`/restaurants/${params.id}/add-menu`}
          className="mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Menu &rarr;
        </Link>
        <Link to="/" className="text-white bg-lime-700 py-3 px-10">
          Buy Promotion &rarr;
        </Link>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <span className="text-lime-600 mt-10 block">
              Please create dish!
            </span>
          ) : (
            <div className="mt-10 grid md:grid-cols-3 gap-x-8 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map((menu) => (
                <Menu
                  key={menu.id}
                  name={menu.name}
                  description={menu.description}
                  price={menu.price}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyRestaurant;
