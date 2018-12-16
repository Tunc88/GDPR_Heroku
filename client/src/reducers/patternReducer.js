import {
  PATTERN_LOADING,
  GET_PATTERNS,
  DELETE_PATTERN,
  SET_ASSIGNED_TACTICS,
  SET_ASSIGNED_STRATEGIES
} from "../actions/types";

const initialState = {
  patterns: [],
  pattern: {},
  assignedStrategies: [],
  assignedTactics: [],
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
        console.log(index);
        //console.log(str);

        if (index !== -1) {
          arr.splice(index, 1);
          // console.log("remove" + arr);
        }
        return arr;
      };

      //console.log(state.assignedDevelopers);

      console.log(action.payload);
      if (state.assignedStrategies.indexOf(action.payload) === -1) {
        var newArray = addStrategy(action.payload);
      } else {
        var newArray = remStrategy(action.payload);
      }

      // console.log(newArray.indexOf(action.payload));

      //console.log(newArray);
      //console.log(action.payload[0]);
      //console.log(state.assignedDevelopers.indexOf(action.payload[0]));
      //console.log(state.nameDeveloper);
      return {
        ...state,
        assignedStrategies: newArray,
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
        console.log(index);
        //console.log(tac);

        if (index !== -1) {
          arr.splice(index, 1);
        }
        return arr;
      };

      console.log(action.payload);
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

    default:
      return state;
  }
}
