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

export interface findRestaurantById_findRestaurantById_result_menu_options_choices {
  __typename: "MenuOptionChoice";
  name: string;
  extra: number;
}

export interface findRestaurantById_findRestaurantById_result_menu_options {
  __typename: "MenuOption";
  name: string;
  extra: number;
  choices: findRestaurantById_findRestaurantById_result_menu_options_choices[] | null;
}

export interface findRestaurantById_findRestaurantById_result_menu {
  __typename: "Menu";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: findRestaurantById_findRestaurantById_result_menu_options[] | null;
}

export interface findRestaurantById_findRestaurantById_result {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: findRestaurantById_findRestaurantById_result_category;
  address: string;
  isPromoted: boolean;
  menu: findRestaurantById_findRestaurantById_result_menu[];
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
