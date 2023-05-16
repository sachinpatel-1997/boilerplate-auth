import api from "../../service/api";
import { GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE } from "./actionTypes";
import { userConstants } from "../../constants/userConstants";
import { userService } from "../../service/userService";
import history from "../../utils/history";
import { pushNotification } from "../../utils/notifications";

export const userActions = {
  loading,
  login,
  googleSignin,
  forgotpassword,
  resetpassword,
  logout,
  register,
  getAll,
  getById,
  update,
  updateAdmin,
  addUser,
  delete: _delete,
};

function googleSignin(tokenId) {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(request(tokenId));

    userService.googleSignin(tokenId).then(
      (user) => {
        dispatch(success(user));
        dispatch(loading(false));
        history.push("/");
        pushNotification("Login successful", "success");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(loading(false));
        pushNotification(error.response.data.message, "error");
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function login(loginData) {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(request(loginData));

    userService.login(loginData).then(
      (user) => {
        dispatch(success(user));
        dispatch(loading(false));
        history.push("/");
        pushNotification("Login successful", "success");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(loading(false));
        pushNotification(error.response.data.message, "error");
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function forgotpassword(userEmail) {
  return (dispatch) => {
    dispatch(loading(true));
    userService.forgotpassword(userEmail).then(
      (userEmail) => {
        dispatch(success(userEmail));
        dispatch(loading(false));
        history.push("/login");
        pushNotification("Email sent successfully", "success");
      },
      (error) => {
        dispatch(loading(false));
        pushNotification(error.response.data.message, "error");
      }
    );
  };
  function success(userEmail) {
    return { type: userConstants.FORGOTPASSWORD };
  }
}

function resetpassword(userToken, newPassword) {
  return (dispatch) => {
    dispatch(loading(true));
    userService.resetpassword(userToken, newPassword).then(
      (userToken) => {
        dispatch(loading(false));
        history.push("/login");
        pushNotification("Password Changed successfully", "success");
      },
      (error) => {
        dispatch(loading(false));
        pushNotification(error.response.data.message, "error");
      }
    );
  };
}

function logout() {
  userService.logout();
  history.push("/login");
  pushNotification("Logout successful", "success");
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(request(user));
    userService.register(user).then(
      (user) => {
        dispatch(success(user));
        dispatch(loading(false));
        history.push("/");
        pushNotification("Registration successful", "success");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(loading(false));
        pushNotification(error.response.data.message, "error");
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function addUser(user) {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(request(user));

    userService.addUser(user).then(
      (user) => {
        dispatch(success());
        dispatch(loading(false));
        history.push("/");
        pushNotification("user added successfully", "success");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(loading(false));
        pushNotification(error.response.data.message, "error");
      }
    );
  };

  function request(user) {
    return { type: userConstants.NEWUSER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.NEWUSER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.NEWUSER_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(request());

    userService
      .getAll()
      .then(
        (users) => {
          dispatch(success(users));
          dispatch(loading(false));
          return users;
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(loading(false));
          pushNotification(error.response.data.message, "error");
        }
      )
      .then((res) => res);
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(request());

    userService.getById(id).then(
      (userById) => {
        dispatch(success(userById));
        dispatch(loading(false));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(loading(false));
        pushNotification(error.response.data.message, "error");
      }
    );
  };

  function request(id) {
    return { type: userConstants.GETBYID_REQUEST };
  }
  function success(userById) {
    return { type: userConstants.GETBYID_SUCCESS, userById };
  }
  function failure(error) {
    return { type: userConstants.GETBYID_FAILURE, error };
  }
}

function update(id, userData) {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(request());

    userService.update(id, userData).then(
      (userById) => {
        dispatch(success(userById));
        dispatch(loading(false));
        history.push("/");
        pushNotification("update successfully", "success");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(loading(false));
        console.log("error", error);
        pushNotification(error.response.data.message, "error");
      }
    );
  };

  function request(id) {
    return { type: userConstants.GETBYID_REQUEST };
  }
  function success(userById) {
    return { type: userConstants.GETBYID_SUCCESS, userById };
  }
  function failure(error) {
    return { type: userConstants.GETBYID_FAILURE, error };
  }
}

function updateAdmin(id, user) {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(request());

    userService.updateAdmin(id, user).then(
      (user) => {
        dispatch(success(user));
        dispatch(loading(false));
        history.push("/");
        pushNotification("profile update successfully", "success");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(loading(false));
        console.log("error", error);
        pushNotification(error.response.data.message, "error");
      }
    );
  };

  function request(id) {
    return { type: userConstants.UPDATEADMIN_REQUEST };
  }
  function success(user) {
    return { type: userConstants.UPDATEADMIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATEADMIN_FAILURE, error };
  }
}

function _delete(id) {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(request(id));

    userService.delete(id).then(
      (user) => {
        dispatch(success(id));
        dispatch(loading(false));
        pushNotification("Delete successfully", "success");
      },
      (error) => {
        dispatch(failure(id, error.toString()));
        dispatch(loading(false));
        pushNotification(error.response.data.message, "error");
      }
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}

function loading(loading) {
  return { type: userConstants.SHOW_LOADING, loading };
}

export const getList = () => ({
  type: GET_LIST,
  payload: api.get("/asia"),
});

export const getListSuccess = (data) => ({
  type: GET_LIST_SUCCESS,
  payload: data,
});

export const getListFailure = () => ({
  type: GET_LIST_FAILURE,
});
