import { CONCERN_LOADING, GET_CONCERNS } from "../actions/types";

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
    default:
      return state;
  }
}
