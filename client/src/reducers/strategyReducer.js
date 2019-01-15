import {
  STRATEGY_LOADING,
  GET_STRATEGIES,
  DELETE_STRATEGY
} from "../actions/types";

const initialState = {
  strategies: [],
  strategy: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STRATEGY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STRATEGIES:
      return {
        ...state,
        strategies: action.payload,
        loading: false
      };
    case DELETE_STRATEGY:
      return {
        ...state,
        strategies: state.strategies.filter(
          strategy => strategy._id !== action.payload
        )
      };

    default:
      return state;
  }
}
