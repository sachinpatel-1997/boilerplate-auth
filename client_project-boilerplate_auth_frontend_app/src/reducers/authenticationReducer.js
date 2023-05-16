import { userConstants } from "../constants/userConstants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};

    case userConstants.FORGOTPASSWORD:
      return {};

    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.REGISTER_FAILURE:
      return {};

    case userConstants.UPDATEADMIN_REQUEST:
      return {
        loggingIn: true,
        user: state.user,
      };
    case userConstants.UPDATEADMIN_SUCCESS:
      let updatedUser = state.user;
      // updatedUser.user = action.user;
      console.log("pre user", updatedUser);
      Object.assign(updatedUser.user, action.user);
      // updatedUser.user = action.user;
      console.log("updated user", updatedUser);

      return {
        loggedIn: true,
        user: updatedUser,
      };
    case userConstants.UPDATEADMIN_FAILURE:
      return {
        loggedIn: true,
        user: state.user,
      };

    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case userConstants.SHOW_LOADING:
      return action.loading;

    default:
      return state;
  }
}
