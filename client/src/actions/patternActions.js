import axios from "axios";

import { PATTERN_LOADING, GET_PATTERNS, CLEAR_ERRORS } from "./types";

// Get Patterns
export const getPatterns = () => dispatch => {
  dispatch(setPatternLoading());
  axios
    .get("/api/patterns")
    .then(res =>
      dispatch({
        type: GET_PATTERNS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PATTERNS,
        payload: null
      })
    );
};

// Set loading state
export const setPatternLoading = () => {
  return {
    type: PATTERN_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
