import axios from "axios";
import * as types from "./actionTypes";

export const createPurchase =
  (purchaseDetails, accessToken) => async (dispatch) => {
    dispatch({ type: types.CREATE_PURCHASE_REQUEST });

    return axios
      .post("/purchase/create", purchaseDetails, {
        headers: { Authorization: accessToken },
      })
      .then((res) =>
        dispatch({
          type: types.CREATE_PURCHASE_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.CREATE_PURCHASE_FAILURE,
          payload: error.response,
        })
      );
  };
