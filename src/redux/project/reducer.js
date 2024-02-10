import * as types from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  projectNames: null,
  projectCount: null,
  projectsData: null,
  projectData: null,
};

export const ProjectReducer = (state = initialState, action) => {
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
    case types.CREATE_PROJECT_REQUEST:
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
    default:
      return state;
  }
};
