import axios from "axios";
import * as types from "./actionTypes";

export const createIndent =
  (indentDetails, accessToken) => async (dispatch) => {
    dispatch({ type: types.CREATE_INDENT_REQUEST });

    return axios
      .post("/indent/create", indentDetails, {
        headers: { Authorization: accessToken },
      })
      .then((res) =>
        dispatch({
          type: types.CREATE_INDENT_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.CREATE_INDENT_FAILURE,
          payload: error.response,
        })
      );
  };

export const fetchIndentData = (accessToken, id) => async (dispatch) => {
  dispatch({ type: types.FETCH_INDENT_DATA_REQUEST });

  return axios
    .get(`/indent/fetch/${id}`, { headers: { Authorization: accessToken } })
    .then((res) =>
      dispatch({
        type: types.FETCH_INDENT_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_INDENT_DATA_FAILURE,
        payload: error.response,
      })
    );
};

export const fetchindentsData =
  (accessToken, searchTerm, page, isDeleted) => async (dispatch) => {
    dispatch({ type: types.FETCH_INDENTS_DATA_REQUEST });

    return axios
      .get(
        `/indent/fetch?searchTerm=${searchTerm}&page=${page}&pageSize=${10}&isDeleted=${isDeleted}`,
        { headers: { Authorization: accessToken } }
      )
      .then((res) =>
        dispatch({
          type: types.FETCH_INDENTS_DATA_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.FETCH_INDENTS_DATA_FAILURE,
          payload: error.response,
        })
      );
  };

export const editIndent =
  (id, indentDetails, accessToken) => async (dispatch) => {
    dispatch({ type: types.EDIT_INDENT_REQUEST });

    return axios
      .patch(`/indent/edit/${id}`, indentDetails, {
        headers: { Authorization: accessToken },
      })
      .then((res) =>
        dispatch({
          type: types.EDIT_INDENT_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.EDIT_INDENT_FAILURE,
          payload: error.response,
        })
      );
  };
