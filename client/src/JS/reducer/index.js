import { combineReducers } from "redux";
import authReducer from "./authReducer";
import conducteurReducer from "./conducteurReducer";
import passagerReducer from "./passagerReducer";
import adminReducer from "./adminReducer";
const rootReducer = combineReducers({
  authReducer,
  conducteurReducer,
  passagerReducer,
  adminReducer,
});

export default rootReducer;
