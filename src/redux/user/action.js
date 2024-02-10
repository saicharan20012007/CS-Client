import axios from "axios";
import * as types from "./actionTypes";

export const fetchuserNames = (accessToken) => async (dispatch) => {
  dispatch({ type: types.FETCH_USER_NAMES_REQUEST });

  axios
    .get("/user/fetch/names", { headers: { Authorization: accessToken } })
    .then((res) =>
      dispatch({ type: types.FETCH_USER_NAMES_SUCCESS, payload: res.data })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_USER_NAMES_FAILURE,
        payload: error.response,
      })
    );
};

export const fetchuserCount =
  (accessToken, isEnable, isDeleted) => async (dispatch) => {
    dispatch({ type: types.FETCH_USER_COUNT_REQUEST });

    axios
      .get(`/user/count?isEnable=${isEnable}&isDeleted=${isDeleted}`, {
        headers: { Authorization: accessToken },
      })
      .then((res) =>
        dispatch({
          type: types.FETCH_USER_COUNT_SUCCESS,
          payload: res.data.userCount,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.FETCH_USER_COUNT_FAILURE,
          payload: error.response,
        })
      );
  };

export const fetchusersData =
  (searchTerm, currentPage, accessToken, isEnable, isDeleted) =>
  async (dispatch) => {
    dispatch({ type: types.FETCH_USERS_DATA_REQUEST });
    axios
      .get(
        `/user/fetch/search?searchTerm=${searchTerm}&page=${currentPage}&pageSize=${5}&isEnable=${isEnable}&isDeleted=${isDeleted}`,
        { headers: { Authorization: accessToken } }
      )
      .then((res) =>
        dispatch({
          type: types.FETCH_USERS_DATA_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.FETCH_USERS_DATA_FAILURE,
          payload: error.response,
        })
      );
  };

export const fetchuserData = (id, accessToken) => async (dispatch) => {
  dispatch({ type: types.FETCH_USER_DATA_REQUEST });

  return axios
    .get(`/user/fetch/${id}`, { headers: { Authorization: accessToken } })
    .then((res) =>
      dispatch({
        type: types.FETCH_USER_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_USER_DATA_FAILURE,
        payload: error.response,
      })
    );
};

export const createMember =
  (memberDetails, accessToken) => async (dispatch) => {
    dispatch({ type: types.CREATE_MEMBER_REQUEST });
    console.log(memberDetails);
    return axios
      .post("/user/create", memberDetails, {
        headers: { Authorization: accessToken },
      })
      .then((res) =>
        dispatch({
          type: types.CREATE_MEMBER_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.CREATE_MEMBER_FAILURE,
          payload: error.response,
        })
      );
  };

export const edituserData =
  (id, memberDetails, accessToken) => async (dispatch) => {
    dispatch({ type: types.EDIT_USER_DATA_REQUEST });

    return axios
      .patch(`/user/edit/${id}`, memberDetails, {
        headers: { Authorization: accessToken },
      })
      .then((res) =>
        dispatch({
          type: types.EDIT_USER_DATA_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.EDIT_USER_DATA_FAILURE,
          payload: error.response,
        })
      );
  };
export const deleteuserData = (id, accessToken) => async (dispatch) => {
  dispatch({ type: types.DELETE_USER_DATA_REQUEST });

  return axios
    .delete(`/user/delete/${id}`, {
      headers: { Authorization: accessToken },
    })
    .then((res) =>
      dispatch({
        type: types.DELETE_USER_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.DELETE_USER_DATA_FAILURE,
        payload: error.response,
      })
    );
};
