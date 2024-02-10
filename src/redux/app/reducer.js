import * as types from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  projectNames: null,
  userNames: null,
  userCount: null,
  usersData: null,
  userData: null,
  projectCount: null,
  projectsData: null,
  projectData: null,
  tasksData: null,
};

export const AppReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_PROJECTS_NAMES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_PROJECTS_NAMES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectNames: payload,
      };
    case types.FETCH_PROJECTS_NAMES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_USER_NAMES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_USER_NAMES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userNames: payload,
      };
    case types.FETCH_USER_NAMES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    //
    case types.FETCH_USER_COUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_USER_COUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userCount: payload,
      };
    case types.FETCH_USER_COUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_USERS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_USERS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersData: payload,
      };
    case types.FETCH_USERS_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: payload,
      };
    case types.FETCH_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.EDIT_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.EDIT_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.EDIT_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.DELETE_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.DELETE_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.DELETE_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.CREATE_MEMBER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.CREATE_MEMBER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.CREATE_MEMBER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.CREATE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.CREATE_INDENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.EDIT_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.EDIT_PROJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_PROJECTS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_PROJECTS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectsData: payload,
      };
    case types.FETCH_PROJECTS_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_PROJECT_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_PROJECT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectData: payload,
      };
    case types.FETCH_PROJECT_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_PROJECT_COUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_PROJECT_COUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectCount: payload,
      };
    case types.FETCH_PROJECT_COUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
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
        isLoading: false,
        tasksData: payload,
      };
    case types.FETCH_TASKS_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.FETCH_INDENTS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_INDENTS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        indentsData: payload,
      };
    case types.FETCH_INDENTS_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
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
    default:
      return state;
  }
};
