/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMenuInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createMenu
// ====================================================

export interface createMenu_createMenu {
  __typename: "CreateMenuOutput";
  ok: boolean;
  error: string | null;
}

export interface createMenu {
  createMenu: createMenu_createMenu;
}

export interface createMenuVariables {
  input: CreateMenuInput;
}
