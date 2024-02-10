import * as types from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  indentsData: null,
  indentData: null,
};

export const IndentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_INDENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_INDENT_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_INDENT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        indentData: payload,
      };
    case types.FETCH_INDENT_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_INDENTS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_INDENTS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        indentsData: payload,
      };
    case types.FETCH_INDENTS_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.EDIT_INDENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.EDIT_INDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.EDIT_INDENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
