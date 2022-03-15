import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
  searchRestaurants,
  searchRestaurantsVariables,
} from '../../__api__/searchRestaurants';

const SEARCH_RESTAURANTS = gql`
  query searchRestaurants($input: SearchRestaurantsInput!) {
    searchRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [callQuery, { loading, data, error }] = useLazyQuery<
    searchRestaurants,
    searchRestaurantsVariables
  >(SEARCH_RESTAURANTS);

  useEffect((): any => {
    const query = location.search.split('?term=')[1];
    if (!query) {
      return navigate('/', { replace: true });
    }

    return callQuery({
      variables: {
        input: {
          page: 1,
          query,
          limit: 6,
        },
      },
    });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Search | Uber eats clone</title>
      </Helmet>
      <h1>search</h1>
    </div>
  );
}

export default Search;
