import { SEARCHRESULTS_LOADING, SEARCH_IN_BACKEND } from "../actions/types";

const initialState = {
  loading: false,
  searchResults: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCHRESULTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEARCH_IN_BACKEND:
      return {
        ...state,
        searchResults: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
