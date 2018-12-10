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
  // nameDeveloper: "",
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
        //console.log(action.payload.length);
        //console.log([...dev.concat(state.assignedDevelopers)]);
        return [...dev.concat(state.assignedDevelopers)];
      };

      const remDeveloper = dev => {
        var remvalue = dev[0];
        var arr = state.assignedDevelopers;
        var index = state.assignedDevelopers.indexOf(remvalue);
        console.log(index);
        //console.log(dev);

        if (index > -1) {
          arr.splice(index, 1);
          // console.log("remove" + arr);
        }
        return [arr];
      };

      //console.log(state.assignedDevelopers.indexOf("Tobi"));
      if (state.assignedDevelopers.indexOf(action.payload[0]) === -1) {
        var newArray = addDeveloper(action.payload);
      } else {
        var newArray = addDeveloper(action.payload);
      }
      console.log(state.assignedDevelopers);
      console.log(action.payload[0]);
      console.log(state.assignedDevelopers.indexOf(action.payload[0]));
      console.log(state.nameDeveloper);
      return {
        ...state,
        nameDeveloper: action.payload[0],
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
