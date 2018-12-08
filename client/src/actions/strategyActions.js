import axios from "axios";

import {
  STRATEGY_LOADING,
  GET_STRATEGIES,
  CLEAR_ERRORS,
  GET_ERRORS,
  DELETE_STRATEGY
} from "./types";

// create Tactic
export const createStrategy = (strategyData, history) => dispatch => {
  axios
    .post("/api/strategies/createstrategy", strategyData)
    .then(res => history.push("/overviewPm"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Tactics
export const getStrategies = () => dispatch => {
  dispatch(setStrategyLoading());
  axios
    .get("/api/strategies")
    .then(res =>
      dispatch({
        type: GET_STRATEGIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STRATEGIES,
        payload: null
      })
    );
};

// Delete Tactic
export const deleteStrategy = id => dispatch => {
  console.log(id);
  axios
    .delete(`/api/strategies/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_STRATEGY,
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
export const editStrategy = strategyData => dispatch => {
  console.log(strategyData);
  axios
    .post("/api/tactics/editstrategy", strategyData)
    .then(res =>
      dispatch({
        type: GET_STRATEGIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STRATEGIES,
        payload: null
      })
    );
};

// Set loading state
export const setStrategyLoading = () => {
  return {
    type: STRATEGY_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
