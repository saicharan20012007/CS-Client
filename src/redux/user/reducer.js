import * as types from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  userNames: null,
  userCount: null,
  usersData: null,
  userData: null,
};

export const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_USER_NAMES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_USER_NAMES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userNames: payload,
      };
    case types.FETCH_USER_NAMES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    //
    case types.FETCH_USER_COUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_USER_COUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userCount: payload,
      };
    case types.FETCH_USER_COUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_USERS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_USERS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersData: payload,
      };
    case types.FETCH_USERS_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: payload,
      };
    case types.FETCH_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.EDIT_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.EDIT_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.EDIT_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.DELETE_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.DELETE_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.DELETE_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.CREATE_MEMBER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.CREATE_MEMBER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.CREATE_MEMBER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
