import {
  CONCERN_LOADING,
  GET_CONCERNS,
  DELETE_CONCERN
} from "../actions/types";

const initialState = {
  concerns: [],
  concern: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONCERN_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CONCERNS:
      return {
        ...state,
        concerns: action.payload,
        loading: false
      };
    case DELETE_CONCERN:
      return {
        ...state,
        concerns: state.concerns.filter(
          concern => concern._id !== action.payload
        )
      };
    default:
      return state;
  }
}
