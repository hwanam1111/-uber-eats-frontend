import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
  findCategoryBySlug,
  findCategoryBySlugVariables,
} from '../../__api__/findCategoryBySlug';

const FIND_CATEGORY_BY_SLUG_QUERY = gql`
  query findCategoryBySlug($input: CategoryInput!) {
    findCategoryBySlug(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

function Category() {
  const params = useParams<{ slug: string }>();

  const { data, loading, error } = useQuery<
    findCategoryBySlug,
    findCategoryBySlugVariables
  >(FIND_CATEGORY_BY_SLUG_QUERY, {
    variables: {
      input: {
        page: 1,
        slug: params.slug || '',
        limit: 6,
      },
    },
  });

  console.log(data);

  return (
    <div>
      <h1>category</h1>
    </div>
  );
}

export default Category;
