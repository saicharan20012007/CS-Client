import axios from "axios";
import * as types from "./actionTypes";

export const createTask = (taskDetails, accessToken) => async (dispatch) => {
  dispatch({ type: types.CREATE_TASK_REQUEST });

  return axios
    .post("/task/create", taskDetails, {
      headers: { Authorization: accessToken },
    })
    .then((res) =>
      dispatch({
        type: types.CREATE_TASK_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.CREATE_TASK_FAILURE,
        payload: error.response,
      })
    );
};

export const fetchtasksData = (accessToken, projectId) => async (dispatch) => {
  dispatch({ type: types.FETCH_PROJECT_TASKS_DATA_REQUEST });

  return axios
    .get(`/task/fetch/assignedtasks/${projectId}`, {
      headers: { Authorization: accessToken },
    })
    .then((res) =>
      dispatch({
        type: types.FETCH_PROJECT_TASKS_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_PROJECT_TASKS_DATA_REQUEST,
        payload: error.response,
      })
    );
};

export const fetchtaskNames = (accessToken) => async (dispatch) => {
  dispatch({ type: types.FETCH_TASKS_DATA_REQUEST });
  return axios
    .get("task/fetch/names", {
      headers: { Authorization: accessToken },
    })
    .then((res) =>
      dispatch({ type: types.FETCH_TASKS_DATA_SUCCESS, payload: res.data })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_TASKS_DATA_FAILURE,
        payload: error.response,
      })
    );
};

export const fetchTaskData = (accessToken, taskId) => async (dispatch) => {
  dispatch({ type: types.FETCH_PROJECT_TASK_DATA_REQUEST });
  return axios
    .get(`task/fetch/taskData/${taskId}`, {
      headers: { Authorization: accessToken },
    })
    .then((res) =>
      dispatch({
        type: types.FETCH_PROJECT_TASK_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_PROJECT_TASK_DATA_FAILURE,
        payload: error.response,
      })
    );
};

export const editTask = (id, taskDetails, accessToken) => async (dispatch) => {
  dispatch({ type: types.EDIT_PROJECT_TASK_DATA_REQUEST });

  return axios
    .post(`/task/edit/${id}`, taskDetails, {
      headers: { Authorization: accessToken },
    })
    .then((res) =>
      dispatch({
        type: types.EDIT_PROJECT_TASK_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.EDIT_PROJECT_TASK_DATA_FAILURE,
        payload: error.response,
      })
    );
};

export const deleteTask = (id, accessToken, projectId) => async (dispatch) => {
  dispatch({ type: types.DELETE_PROJECT_TASK_DATA_REQUEST });
  return axios
    .post(
      `/task/delete?projectId=${projectId}&id=${id}`,
      {},
      {
        headers: { Authorization: accessToken },
      }
    )
    .then((res) =>
      dispatch({
        type: types.DELETE_PROJECT_TASK_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: types.DELETE_PROJECT_TASK_DATA_FAILURE,
        payload: err.response,
      })
    );
};

export const fetchTaskSearch =
  (accessToken, searchTerm, page, projectId, isDeleted) => async (dispatch) => {
    dispatch({ type: types.FETCH_PROJECT_TASKS_DATA_REQUEST });
    axios
      .get(
        `/task/fetch?searchTerm=${searchTerm}&page=${page}&pageSize=${10}&isDeleted=${isDeleted}&projectId=${projectId}`,
        { headers: { Authorization: accessToken } }
      )
      .then((res) =>
        dispatch({
          type: types.FETCH_PROJECT_TASKS_DATA_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.FETCH_PROJECT_TASKS_DATA_FAILURE,
          payload: error.response,
        })
      );
  };
