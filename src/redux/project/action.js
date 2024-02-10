import axios from "axios";
import * as types from "./actionTypes";

export const fetchprojectNames = (accessToken) => async (dispatch) => {
  dispatch({ type: types.FETCH_PROJECTS_NAMES_REQUEST });

  axios
    .get("/project/fetch/names", { headers: { Authorization: accessToken } })
    .then((res) =>
      dispatch({ type: types.FETCH_PROJECTS_NAMES_SUCCESS, payload: res.data })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_PROJECTS_NAMES_FAILURE,
        payload: error.response,
      })
    );
};
export const createProject =
  (projectDetails, accessToken) => async (dispatch) => {
    dispatch({ type: types.CREATE_PROJECT_REQUEST });

    return axios
      .post("/project/create", projectDetails, {
        headers: { Authorization: accessToken },
      })
      .then((res) =>
        dispatch({
          type: types.CREATE_PROJECT_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.CREATE_PROJECT_FAILURE,
          payload: error.response,
        })
      );
  };

export const editProject =
  (id, projectDetails, accessToken) => async (dispatch) => {
    dispatch({ type: types.EDIT_PROJECT_REQUEST });

    return axios
      .patch(`/project/edit/${id}`, projectDetails, {
        headers: { Authorization: accessToken },
      })
      .then((res) =>
        dispatch({
          type: types.EDIT_PROJECT_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.EDIT_PROJECT_FAILURE,
          payload: error.response,
        })
      );
  };

export const fetchprojectsData =
  (accessToken, searchTerm, page, isDeleted) => async (dispatch) => {
    dispatch({ type: types.FETCH_PROJECTS_DATA_REQUEST });
    axios
      .get(
        `/project/fetch?searchTerm=${searchTerm}&page=${page}&pageSize=${10}&isDeleted=${isDeleted}`,
        { headers: { Authorization: accessToken } }
      )
      .then((res) =>
        dispatch({
          type: types.FETCH_PROJECTS_DATA_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.FETCH_PROJECTS_DATA_FAILURE,
          payload: error.response,
        })
      );
  };

export const fetchprojectData = (accessToken, id) => async (dispatch) => {
  dispatch({ type: types.FETCH_PROJECT_DATA_REQUEST });

  return axios
    .get(`/project/fetch/${id}`, { headers: { Authorization: accessToken } })
    .then((res) =>
      dispatch({
        type: types.FETCH_PROJECT_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_PROJECT_DATA_FAILURE,
        payload: error.response,
      })
    );
};
