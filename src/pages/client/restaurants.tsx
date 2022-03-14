import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Restaurant from '../../components/restaurant';
import {
  restaurantsPage,
  restaurantsPageVariables,
} from '../../__api__/restaurantsPage';

const ALL_RESTAURANTS_QUERY = gql`
  query restaurantsPage($input: RestaurantsInput!) {
    allCategory {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    allRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

function Restaurants() {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<restaurantsPage, restaurantsPageVariables>(
    ALL_RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page,
          limit: 9,
        },
      },
    },
  );

  const onPrevPage = () => {
    setPage((current) => current - 1);
  };

  const onNextPage = () => {
    setPage((current) => current + 1);
  };

  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="search"
          placeholder="Search restaurants.."
          className="p-3 border border-gray-200 text-md font-light outline-none transition-colors focus:border-gray-500 mb-3 rounded-sm w-3/6"
        />
      </form>
      {!loading && (
        <div>
          <div className="border-b lg:px-16">
            <div className="flex items-center justify-around py-8 px-5 max-w-screen-sm mx-auto">
              {data?.allCategory.categories?.map((category) => (
                <div
                  className="flex flex-col items-center cursor-pointer group"
                  key={category.id}
                >
                  <div className="w-20 h-20 rounded-full transition-colors group-hover:bg-gray-200">
                    <img
                      src={category.coverImg}
                      alt={category.name}
                      className="p-5"
                    />
                  </div>
                  <span className="mt-3 text-center font-bold">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 px-5 lg:px-16 grid grid-cols-3 gap-x-8 gap-y-10">
            {data?.allRestaurants.results?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                restaurantId={restaurant.id}
                coverImage={restaurant.coverImage}
                restaurantName={restaurant.name}
                categoryName={restaurant.category.name}
              />
            ))}
          </div>
          <div className="flex justify-center items-center my-10">
            {page !== 1 && (
              <button
                type="button"
                className="font-medium text-xl outline-none"
                onClick={onPrevPage}
              >
                &larr;
              </button>
            )}
            <span className="mx-5">
              {page} of {data?.allRestaurants.totalPages}
            </span>
            {page !== data?.allRestaurants.totalPages && (
              <button
                type="button"
                className="font-medium text-xl outline-none"
                onClick={onNextPage}
              >
                &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Restaurants;
