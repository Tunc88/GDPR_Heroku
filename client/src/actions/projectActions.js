import axios from "axios";

import {
  GET_ERRORS,
  DELETE_PROJECT,
  PROJECT_LOADING,
  GET_PROJECTS,
  CLEAR_ERRORS
} from "./types";

// create Project
export const createProject = (projectData, history) => dispatch => {
  axios
    .post("/api/projects/createproject", projectData)
    .then(res => history.push("/PMoverview"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Projects
export const getProjects = () => dispatch => {
  dispatch(setProjectLoading());
  axios
    .get("/api/projects")
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECTS,
        payload: null
      })
    );
};

// Delete Project
export const deleteProject = id => dispatch => {
  console.log(id);
  axios
    .delete(`/api/projects/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit Project
export const editProject = projectData => dispatch => {
  console.log(projectData);
  axios
    .post("/api/projects/editproject", projectData)
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECTS,
        payload: null
      })
    );
};

// Set loading state
export const setProjectLoading = () => {
  return {
    type: PROJECT_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
