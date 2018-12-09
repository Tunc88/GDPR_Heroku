import axios from "axios";

import { GET_ERRORS, USER_LOADING, GET_DEVELOPER, CLEAR_ERRORS } from "./types";

// Get Developer
export const getDevelopers = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get("/api/users/developers")
    .then(res =>
      dispatch({
        type: GET_DEVELOPER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DEVELOPER,
        payload: null
      })
    );
};

// Set loading state
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
