import * as types from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  tasksData: null,
  projectTasksData: null,
  taskData: null,
};

export const TaskReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasksData: payload,
        isLoading: false,
      };
    case types.CREATE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_TASKS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_TASKS_DATA_SUCCESS:
      return {
        ...state,
        tasksData: payload,
        isLoading: false,
      };
    case types.FETCH_TASKS_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_PROJECT_TASKS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_PROJECT_TASKS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectTasksData: payload,
      };
    case types.FETCH_PROJECT_TASKS_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_PROJECT_TASK_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_PROJECT_TASK_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        taskData: payload,
      };
    case types.FETCH_PROJECT_TASK_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.EDIT_PROJECT_TASK_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.EDIT_PROJECT_TASK_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        taskData: payload,
      };
    case types.EDIT_PROJECT_TASK_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.DELETE_PROJECT_TASK_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.DELETE_PROJECT_TASK_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.DELETE_PROJECT_TASK_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
