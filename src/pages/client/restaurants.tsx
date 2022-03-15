import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Category from '../../components/category';
import Restaurant from '../../components/restaurant';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
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
        ...CategoryParts
      }
    }
    allRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ISearchForm {
  searchTerm: string;
}

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

  const { register, handleSubmit, getValues } = useForm<ISearchForm>();
  const navigate = useNavigate();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    navigate({
      pathname: '/search',
      search: `?term=${searchTerm}`,
    });
  };

  return (
    <div>
      <Helmet>
        <title>Restaurants | Uber eats clone</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
      >
        <input
          type="search"
          placeholder="Search restaurants.."
          className="p-3 border border-gray-200 text-md font-light outline-none transition-colors focus:border-gray-500 mb-3 rounded-sm w-11/12 md:w-3/6"
          {...register('searchTerm', { required: true, min: 3 })}
          required
        />
      </form>
      {!loading && (
        <div>
          <div className="border-b lg:px-16">
            <div className="flex items-center justify-around py-8 px-5 max-w-screen-sm mx-auto">
              {data?.allCategory.categories?.map((category) => (
                <Category
                  key={category.id}
                  id={category.id}
                  coverImg={category.coverImg}
                  name={category.name}
                  slug={category.slug}
                />
              ))}
            </div>
          </div>
          <div className="mt-10 px-5 lg:px-16 grid md:grid-cols-3 gap-x-8 gap-y-10">
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
