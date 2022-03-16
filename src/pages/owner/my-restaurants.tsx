import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Restaurant from '../../components/restaurant';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { myRestaurants } from '../../__api__/myRestaurants';

export const MY_RESTAURANTS_QUERY = gql`
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
        {data?.myRestaurants.ok &&
        data.myRestaurants.restaurants.length === 0 ? (
          <h4 className="text-xl mb-5">You have no restaurants.</h4>
        ) : (
          <div className="mt-10 grid md:grid-cols-3 gap-x-8 gap-y-10">
            {data?.myRestaurants.restaurants?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                restaurantId={restaurant.id}
                coverImage={restaurant.coverImage}
                restaurantName={restaurant.name}
                categoryName={restaurant.category.name}
              />
            ))}
          </div>
        )}
        <Link
          className="text-lime-600 hover:underline mt-10 block"
          to="/add-restaurant"
        >
          Create one &rarr;
        </Link>
      </div>
    </>
  );
}

export default MyRestaurants;
