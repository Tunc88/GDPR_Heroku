import axios from "axios";

import {
  GET_ERRORS,
  CONCERN_LOADING,
  GET_CONCERNS,
  CLEAR_ERRORS
} from "./types";

// create Concern
export const createConcern = (concernData, history) => dispatch => {
  axios
    .post("/api/concerns/createconcern", concernData)
    .then(res => history.push("/overviewPm"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Concerns
export const getConcerns = () => dispatch => {
  dispatch(setConcernLoading());
  axios
    .get("/api/concerns")
    .then(res =>
      dispatch({
        type: GET_CONCERNS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CONCERNS,
        payload: null
      })
    );
};

// Set loading state
export const setConcernLoading = () => {
  return {
    type: CONCERN_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
