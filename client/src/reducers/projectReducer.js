import {
  PROJECT_LOADING,
  GET_PROJECTS,
  DELETE_PROJECT,
  SET_ASSIGNED_DEVELOPER,
  SET_ASSIGNED_TACTICS
} from "../actions/types";

const initialState = {
  projects: [],
  project: {},
  assignedDevelopers: [],
  assignedTactics: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false
      };
    case SET_ASSIGNED_DEVELOPER:
      const addDeveloper = dev => {
        return [...dev.concat(state.assignedDevelopers)];
      };
      var newArray = addDeveloper(action.payload);

      return {
        ...state,
        assignedDevelopers: newArray,
        loading: false
      };
    case SET_ASSIGNED_TACTICS:
      const addTactics = tac => {
        return [...tac.concat(state.assignedTactics)];
      };
      var newArray = addTactics(action.payload);

      return {
        ...state,
        assignedTactics: newArray,
        loading: false
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          project => project._id !== action.payload
        )
      };
    default:
      return state;
  }
}
