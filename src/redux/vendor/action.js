import axios from "axios";
import * as types from "./actionTypes";

export const createVendor =
  (vendorDetails, accessToken) => async (dispatch) => {
    dispatch({ type: types.CREATE_VENDOR_REQUEST });

    return axios
      .post("/vendor/create", vendorDetails, {
        headers: { Authorization: accessToken },
      })
      .then((res) =>
        dispatch({
          type: types.CREATE_VENDOR_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.CREATE_VENDOR_FAILURE,
          payload: error.response,
        })
      );
  };

export const fetchvendorsData =
  (accessToken, searchTerm) => async (dispatch) => {
    dispatch({ type: types.FETCH_VENDORS_DATA_REQUEST });

    return axios
      .get(`/vendor/fetch?searchTerm=${searchTerm}`, {
        headers: { Authorization: accessToken },
      })
      .then((res) =>
        dispatch({
          type: types.FETCH_VENDORS_DATA_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.FETCH_VENDORS_DATA_FAILURE,
          payload: error.response,
        })
      );
  };

export const fetchvendorsDataGet = (accessToken) => async (dispatch) => {
  dispatch({ type: types.FETCH_VENDORS_DATA_REQUEST });

  return axios
    .get("/vendor/fetch", {
      headers: { Authorization: accessToken },
    })
    .then((res) =>
      dispatch({
        type: types.FETCH_VENDORS_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_VENDORS_DATA_FAILURE,
        payload: error.response,
      })
    );
};

export const fetchVendorData = (accessToken, id) => async (dispatch) => {
  dispatch({ type: types.FETCH_VENDOR_DATA_REQUEST });

  return axios
    .get(`/vendor/fetch/${id}`, { headers: { Authorization: accessToken } })
    .then((res) =>
      dispatch({
        type: types.FETCH_VENDOR_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_VENDOR_DATA_FAILURE,
        payload: error.response,
      })
    );
};

export const editVendor =
  (id, vendorDetails, accessToken) => async (dispatch) => {
    dispatch({ type: types.EDIT_VENDOR_DATA_REQUEST });

    return axios
      .post(`/vendor/edit/${id}`, vendorDetails, {
        headers: { Authorization: accessToken },
      })
      .then((res) =>
        dispatch({
          type: types.EDIT_VENDOR_DATA_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.EDIT_VENDOR_DATA_FAILURE,
          payload: error.response,
        })
      );
  };
