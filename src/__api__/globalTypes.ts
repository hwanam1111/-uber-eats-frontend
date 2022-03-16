/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CategoryInput {
  page?: number | null;
  limit?: number | null;
  slug: string;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateMenuInput {
  name: string;
  price: number;
  photo?: string | null;
  description: string;
  options?: MenuOptionInputType[] | null;
  restaurantId: number;
}

export interface CreateRestaurantInput {
  name: string;
  address: string;
  coverImage: string;
  categoryName: string;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MenuOptionChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface MenuOptionInputType {
  name: string;
  choices?: MenuOptionChoiceInputType[] | null;
  extra?: number | null;
}

export interface MyRestuarantInput {
  id: number;
}

export interface RestaurantInput {
  restaurantId: number;
}

export interface RestaurantsInput {
  page?: number | null;
  limit?: number | null;
}

export interface SearchRestaurantsInput {
  page?: number | null;
  limit?: number | null;
  query: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
