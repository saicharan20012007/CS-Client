import * as types from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  vendorsData: null,
  vendorData: null,
};

export const VendorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_VENDORS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_VENDORS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vendorsData: payload,
      };
    case types.FETCH_VENDORS_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_VENDOR_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_VENDOR_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vendorData: payload,
      };
    case types.FETCH_VENDOR_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.EDIT_VENDOR_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.EDIT_VENDOR_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vendorData: payload,
      };
    case types.EDIT_VENDOR_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
