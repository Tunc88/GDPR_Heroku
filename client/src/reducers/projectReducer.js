import {
  PROJECT_LOADING,
  GET_PROJECTS,
  GET_PROJECT,
  DELETE_PROJECT,
  SET_ASSIGNED_DEVELOPER,
  SET_ASSIGNED_TACTICS,
  RESET_ASSIGNED_STRATEGIES,
  SET_ASSIGNED_STRATEGIES,
  SWITCH_ATTR_FOR_EDIT_PROJECT
} from "../actions/types";

const initialState = {
  projects: [],
  project: {},
  assignedDevelopers: [],
  assignedStrategies: [],
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
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false
      };
    case SWITCH_ATTR_FOR_EDIT_PROJECT:
      console.log(state.project.assignedStrategies);
      console.log(state.project.assignedTactics);
      console.log(state.project.assignedDevelopers);

      return {
        ...state,
        assignedStrategies: state.project.assignedStrategies,
        assignedTactics: state.project.assignedTactics,
        assignedDevelopers: state.project.assignedDevelopers,
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

      //console.log(action.payload);
      if (state.assignedDevelopers.indexOf(action.payload) === -1) {
        var newArray = addDeveloper(action.payload);
      } else {
        var newArray = remDeveloper(action.payload);
      }
      return {
        ...state,
        assignedDevelopers: newArray,
        loading: false
      };
    case SET_ASSIGNED_TACTICS:
      const addTactic = tac => {
        if (tac !== undefined) {
          return state.assignedTactics.concat(tac);
        } else {
          return state.assignedTactics;
        }
      };

      const remTactic = tac => {
        var arr = state.assignedTactics;
        var index = arr.indexOf(tac);
        //console.log(index);
        //console.log(tac);

        if (index !== -1) {
          arr.splice(index, 1);
        }
        return arr;
      };

      //console.log(action.payload);
      if (state.assignedTactics.indexOf(action.payload) === -1) {
        var newArray = addTactic(action.payload);
      } else {
        var newArray = remTactic(action.payload);
      }

      // console.log(newArray.indexOf(action.payload));

      //console.log(newArray);
      //console.log(action.payload[0]);
      //console.log(state.assignedDevelopers.indexOf(action.payload[0]));
      //console.log(state.nameDeveloper);
      return {
        ...state,
        assignedTactics: newArray,
        loading: false
      };

    case RESET_ASSIGNED_STRATEGIES:
      return {
        ...state,
        assignedTactics: [],
        assignedStrategies: [],
        assignedDevelopers: [],
        loading: false
      };
    case SET_ASSIGNED_STRATEGIES:
      const addStrategy = str => {
        //console.log([...str].concat(state.assignedStrategies));
        // console.log(...[str].concat(state.assignedStrategies));
        //console.log(state.assignedStrategies.concat(str));
        //return "test";
        if (str !== undefined) {
          return state.assignedStrategies.concat(str);
        } else {
          return state.assignedStrategies;
        }

        /*[...str].concat(this.props.strategy)*/
        /*[...str.concat(state.assignedStrategies)]*/
      };

      const remStrategy = str => {
        var arr = state.assignedStrategies;
        var index = arr.indexOf(str);
        //console.log(index);
        //console.log(str);

        if (index !== -1) {
          arr.splice(index, 1);
          // console.log("remove" + arr);
        }
        return arr;
      };

      //console.log(state.assignedDevelopers);

      //console.log(action.payload);
      if (state.assignedStrategies.indexOf(action.payload) === -1) {
        var newArray = addStrategy(action.payload);
        var remTactic = undefined;
      } else {
        //console.log(state.assignedTactics);
        //console.log(action.payload.assignedTactics);

        var arr2 = state.assignedTactics;

        for (var i = 0; i < action.payload.assignedTactics.length; i++) {
          var index2 = arr2.indexOf(action.payload.assignedTactics[i]);
          //console.log(arr2);
          //console.log(action.payload.assignedTactics[i]);

          if (index2 !== -1) {
            arr2.splice(index2, 1);
            console.log(arr2);
          }
        }

        var newArray = remStrategy(action.payload);

        const remTactic = arr2;
      }

      // console.log(newArray.indexOf(action.payload));

      //console.log(newArray);
      //console.log(action.payload[0]);
      //console.log(state.assignedDevelopers.indexOf(action.payload[0]));
      //console.log(state.nameDeveloper);
      if (remTactic === undefined) {
        return {
          ...state,
          assignedStrategies: newArray,
          loading: false
        };
      } else {
        return {
          ...state,
          assignedStrategies: newArray,
          assignedTactics: remTactic,
          loading: false
        };
      }

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
