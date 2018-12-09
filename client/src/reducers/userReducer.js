import { GET_DEVELOPER } from "../actions/types";

const initialState = {
  users: [],
  user: {},
  developers: [],
  developer: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DEVELOPER:
      return {
        ...state,
        developers: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
