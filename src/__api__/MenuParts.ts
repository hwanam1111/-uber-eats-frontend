/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MenuParts
// ====================================================

export interface MenuParts_options_choices {
  __typename: "MenuOptionChoice";
  name: string;
  extra: number;
}

export interface MenuParts_options {
  __typename: "MenuOption";
  name: string;
  extra: number;
  choices: MenuParts_options_choices[] | null;
}

export interface MenuParts {
  __typename: "Menu";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: MenuParts_options[] | null;
}
