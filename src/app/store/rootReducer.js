import { combineReducers } from "redux";
import eventReducer from "./../../features/dashboard/redux/eventReducer";

const rootReducer = combineReducers({
  event: eventReducer,
});

export default rootReducer;
