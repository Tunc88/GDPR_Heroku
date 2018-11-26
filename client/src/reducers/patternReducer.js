import { PATTERN_LOADING, GET_PATTERNS } from "../actions/types";

const initialState = {
  patterns: [],
  pattern: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PATTERN_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PATTERNS:
      return {
        ...state,
        patterns: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
