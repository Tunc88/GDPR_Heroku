import axios from "axios";

import {
  TACTIC_LOADING,
  GET_TACTICS,
  CLEAR_ERRORS,
  GET_ERRORS,
  DELETE_TACTIC
} from "./types";

// create Tactic
export const createTactic = (tacticData, history) => dispatch => {
  axios
    .post("/api/tactics/createtactic", tacticData)
    .then(res => history.push("/overviewPm"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Tactics
export const getTactics = () => dispatch => {
  dispatch(setTacticLoading());
  axios
    .get("/api/tactics")
    .then(res =>
      dispatch({
        type: GET_TACTICS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TACTICS,
        payload: null
      })
    );
};

// Delete Tactic
export const deleteTactic = id => dispatch => {
  console.log(id);
  axios
    .delete(`/api/tactics/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TACTIC,
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

// Edit Pattern
export const editTactic = tacticData => dispatch => {
  console.log(tacticData);
  axios
    .post("/api/tactics/edittactic", tacticData)
    .then(res =>
      dispatch({
        type: GET_TACTICS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TACTICS,
        payload: null
      })
    );
};

// Set loading state
export const setTacticLoading = () => {
  return {
    type: TACTIC_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
