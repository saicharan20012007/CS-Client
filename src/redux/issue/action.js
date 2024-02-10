import axios from "axios";
import * as types from "./actionTypes";

export const createIssue = (issueDetails, accessToken) => async (dispatch) => {
  dispatch({ type: types.CREATE_ISSUE_REQUEST });

  return axios
    .post("/issue/create", issueDetails, {
      headers: { Authorization: accessToken },
    })
    .then((res) =>
      dispatch({
        type: types.CREATE_ISSUE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.CREATE_ISSUE_FAILURE,
        payload: error.response,
      })
    );
};
