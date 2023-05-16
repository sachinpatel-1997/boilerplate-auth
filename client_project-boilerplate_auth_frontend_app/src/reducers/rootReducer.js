import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authReducer from "./authReducer";
import { authentication, loading } from "./authenticationReducer";
import { users, userById } from "./userReducer";
import { reducer as formReducer } from "redux-form";

const appReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  form: formReducer,
  authentication: authentication,
  users: users,
  userById: userById,
  loading: loading,
});

const rootReducer = (state, action) => {
  // console.log("RESET_ALL_DATA action", action)
  if (action.type === "RESET_ALL_DATA") {
    state = {
      auth: state.auth,
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
