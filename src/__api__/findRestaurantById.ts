/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findRestaurantById
// ====================================================

export interface findRestaurantById_findRestaurantById_result_category {
  __typename: "Category";
  name: string;
}

export interface findRestaurantById_findRestaurantById_result {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: findRestaurantById_findRestaurantById_result_category;
  address: string;
  isPromoted: boolean;
}

export interface findRestaurantById_findRestaurantById {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  result: findRestaurantById_findRestaurantById_result | null;
}

export interface findRestaurantById {
  findRestaurantById: findRestaurantById_findRestaurantById;
}

export interface findRestaurantByIdVariables {
  input: RestaurantInput;
}
