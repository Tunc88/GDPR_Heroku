import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import patternReducer from "./patternReducer";
import projectReducer from "./projectReducer";
import tacticReducer from "./tacticReducer";
import userReducer from "./userReducer";
import strategyReducer from "./strategyReducer";
import generalReducer from "./generalReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  pattern: patternReducer,
  project: projectReducer,
  tactic: tacticReducer,
  user: userReducer,
  strategy: strategyReducer,
  general: generalReducer
});
