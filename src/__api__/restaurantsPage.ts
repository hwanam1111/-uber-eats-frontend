/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsPage
// ====================================================

export interface restaurantsPage_allCategory_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restaurantsPage_allCategory {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restaurantsPage_allCategory_categories[] | null;
}

export interface restaurantsPage_allRestaurants_results_category {
  __typename: "Category";
  name: string;
}

export interface restaurantsPage_allRestaurants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: restaurantsPage_allRestaurants_results_category;
  address: string;
  isPromoted: boolean;
}

export interface restaurantsPage_allRestaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: restaurantsPage_allRestaurants_results[] | null;
}

export interface restaurantsPage {
  allCategory: restaurantsPage_allCategory;
  allRestaurants: restaurantsPage_allRestaurants;
}

export interface restaurantsPageVariables {
  input: RestaurantsInput;
}
