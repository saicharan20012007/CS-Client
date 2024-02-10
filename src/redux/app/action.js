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

export const fetchprojectNames = (accessToken) => async (dispatch) => {
  dispatch({ type: types.FETCH_PROJECTS_NAMES_REQUEST });

  axios
    .get("/project/fetch/names", { headers: { Authorization: accessToken } })
    .then((res) => dispatch({ type: types.FETCH_PROJECTS_NAMES_SUCCESS, payload: res.data })
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
  dispatch({ type: types.FETCH_TASKS_DATA_REQUEST });

  return axios
    .get(`/task/fetch/assignedtasks/${projectId}`, {
      headers: { Authorization: accessToken },
    })
    .then((res) =>
      dispatch({
        type: types.FETCH_TASKS_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_TASKS_DATA_REQUEST,
        payload: error.response,
      })
    );
};

export const fetchtaskNames = (accessToken) => async (dispatch) => {
    dispatch( { type: types.FETCH_TASKS_DATA_REQUEST});
    return axios
    .get('task/fetch/names',{
      headers: { Authorization: accessToken },
    })
    .then(res => dispatch( { type: types.FETCH_TASKS_DATA_SUCCESS, payload : res.data }))
    .catch(error => dispatch( { type: types.FETCH_TASKS_DATA_FAILURE, payload : error.response } ))
};

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

export const fetchindentsData = (accessToken) => async (dispatch) => {
  dispatch({ type: types.FETCH_INDENTS_DATA_REQUEST });

  return axios
    .get(`/indent/fetch`, { headers: { Authorization: accessToken } })
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

export const fetchvendorsData = (accessToken) => async (dispatch) => {
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
