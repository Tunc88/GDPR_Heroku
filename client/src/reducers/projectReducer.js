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
        //console.log([...dev].concat(state.assignedDevelopers));
        // console.log(...[dev].concat(state.assignedDevelopers));
        //console.log(state.assignedDevelopers.concat(dev));
        //return "test";
        if (dev !== undefined) {
          return state.assignedDevelopers.concat(dev);
        } else {
          return state.assignedDevelopers;
        }

        /*[...dev].concat(this.props.developer)*/
        /*[...dev.concat(state.assignedDevelopers)]*/
      };

      const remDeveloper = dev => {
        var arr = state.assignedDevelopers;
        var index = arr.indexOf(dev);
        console.log(index);
        //console.log(dev);

        if (index !== -1) {
          arr.splice(index, 1);
          // console.log("remove" + arr);
        }
        return arr;
      };

      //console.log(state.assignedDevelopers);

      console.log(action.payload);
      if (state.assignedDevelopers.indexOf(action.payload) === -1) {
        var newArray = addDeveloper(action.payload);
      } else {
        var newArray = remDeveloper(action.payload);
      }

      // console.log(newArray.indexOf(action.payload));

      //console.log(newArray);
      //console.log(action.payload[0]);
      //console.log(state.assignedDevelopers.indexOf(action.payload[0]));
      //console.log(state.nameDeveloper);
      return {
        ...state,
        assignedDevelopers: newArray,
        loading: false
      };
    case SET_ASSIGNED_TACTICS:
    /* const addTactics = tac => {
        return [...tac.concat(state.assignedTactics)];
      };
      var newArray = addTactics(action.payload);

      return {
        ...state,
        assignedTactics: newArray,
        loading: false
      };*/
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
