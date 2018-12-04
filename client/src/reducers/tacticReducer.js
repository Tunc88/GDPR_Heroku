import { TACTIC_LOADING, GET_TACTICS, DELETE_TACTIC } from "../actions/types";

const initialState = {
  tactics: [],
  tactic: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TACTIC_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TACTICS:
      return {
        ...state,
        tactics: action.payload,
        loading: false
      };
    case DELETE_TACTIC:
      return {
        ...state,
        tactics: state.tactics.filter(tactic => tactic._id !== action.payload)
      };
    default:
      return state;
  }
}
