import { combineReducers } from "redux";
import modalReducer from "../common/modals/modalReducer";
import eventReducer from "./../../features/dashboard/redux/eventReducer";

const rootReducer = combineReducers({
  event: eventReducer,
  modals: modalReducer,
});

export default rootReducer;
