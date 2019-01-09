import axios from "axios";

import {
  GET_ERRORS,
  DELETE_PATTERN,
  PATTERN_LOADING,
  GET_PATTERNS,
  GET_PATTERN,
  CLEAR_ERRORS,
  SET_ASSIGNED_TACTICS,
  SET_ASSIGNED_STRATEGIES,
  SET_FILTER_FOR_PATTERNS
} from "./types";

// create Pattern
export const createPattern = (patternData, history) => dispatch => {
  axios
    .post("/api/patterns/createpattern", patternData)
    .then(res => history.push("/overview"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

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

// Get Pattern
export const getPattern = id => dispatch => {
  console.log("id" + id);
  dispatch(setPatternLoading());
  axios
    .get(`/api/patterns/${id}`)
    .then(res =>
      // console.log("res" + res.data.pattern)
      dispatch({
        type: GET_PATTERN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PATTERN,
        payload: null
      })
    );
};

// Delete Pattern
export const deletePattern = (id, history) => dispatch => {
  console.log(id);
  //history.push("/overview");
  axios
    .delete(`/api/patterns/${id}`)
    .then(res => history.push("/overview"))
    //.then(res => history.push("/overview"))
    .then(res =>
      dispatch({
        type: DELETE_PATTERN,
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
export const editPattern = patternData => dispatch => {
  console.log(patternData);
  axios
    .post("/api/patterns/editpattern", patternData)
    .then(res =>
      dispatch({
        type: GET_PATTERN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PATTERN,
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

// Set assignedTactics
export const setAssignedTactics = tactic => {
  return {
    type: SET_ASSIGNED_TACTICS,
    payload: tactic
  };
};

// Set assignedStrategy
export const setAssignedStrategies = strategy => {
  return {
    type: SET_ASSIGNED_STRATEGIES,
    payload: strategy
  };
};

// Set Filter for Patterns
export const setFilterForPatterns = filter => dispatch => {
  dispatch({
    type: SET_FILTER_FOR_PATTERNS,
    payload: filter
  });
};
