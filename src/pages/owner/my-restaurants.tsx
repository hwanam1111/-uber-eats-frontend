import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { myRestaurants } from '../../__api__/myRestaurants';

const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

function MyRestaurants() {
  const { data, loading, error } =
    useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);

  return (
    <>
      <Helmet>
        <title>My Restaurants | Uber eats clone</title>
      </Helmet>
      <div className="lg:px-16 mt-20">
        <h2 className="text-4xl font-medium mb-10">My Restaurants</h2>
        {data?.myRestaurants.ok && data.myRestaurants.restaurants.length === 0 && (
          <>
            <h4 className="text-xl mb-5">You have no restaurants.</h4>
            <Link
              className="text-lime-600 hover:underline"
              to="/add-restaurant"
            >
              Create one &rarr;
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default MyRestaurants;
