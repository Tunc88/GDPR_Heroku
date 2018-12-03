import {
  PATTERN_LOADING,
  GET_PATTERNS,
  DELETE_PATTERN
} from "../actions/types";

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
    case DELETE_PATTERN:
      return {
        ...state,
        patterns: state.patterns.filter(
          pattern => pattern._id !== action.payload
        )
      };
    default:
      return state;
  }
}
