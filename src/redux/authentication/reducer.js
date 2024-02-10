import axios from "axios";
import * as types from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  isAuthenticated: false,
  accessToken: localStorage.getItem("accessToken.geometry") || null,
};

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(type, payload);
  switch (type) {
    case types.AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.AUTH_SUCCESS:
      console.log(payload);
      localStorage.setItem("accessToken.geometry", payload);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
      };
    case types.AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
