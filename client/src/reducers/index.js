import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import patternReducer from "./patternReducer";
import concernReducer from "./concernReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  pattern: patternReducer,
  concern: concernReducer
});
