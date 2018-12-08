import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import patternReducer from "./patternReducer";
import tacticReducer from "./tacticReducer";
import strategyReducer from "./strategyReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  pattern: patternReducer,
  tactic: tacticReducer,
  strategy: strategyReducer
});
