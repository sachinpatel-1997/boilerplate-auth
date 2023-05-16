import React, { useState } from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions/Auth";
import { pushNotification } from "./../../utils/notifications";
import { Link, useHistory } from "react-router-dom";
import loginImg from "assets/images/login.svg";
import Login from "./Login";
import Logout from "./Logout";
const REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignIn(props) {
  const { setToken, login } = props;
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    return email.match(REGEX);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.email) {
      pushNotification("Email is required", "error");
      return;
    } else if (!userDetails.password) {
      pushNotification("Password is required", "error");
      return;
    } else if (userDetails.password.length < 8) {
      pushNotification("password must be at least 8 characters", "error");
      return;
    } else if (userDetails.email && userDetails.password) {
      if (!validateEmail(userDetails.email)) {
        pushNotification("invalid Email", "error");
        return;
      }
      login(userDetails);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md d-flex justify-content-center align-items-center ">
          <img src={loginImg} className="img-responsive" alt="login" />
        </div>
        <div className="col-md d-flex flex-column justify-content-center">
          <form>
            <h3 className="text-center mb-5">Sign in</h3>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Login />
              <div className="my-4 d-flex">
                <span className="w-25 border-bottom"></span>
                <p>OR</p>
                <span></span>
              </div>
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="row mb-4">
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                  <label className="form-check-label"> Remember me </label>
                </div>
              </div>
              <div className="col d-flex justify-content-end">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary btn-block mb-4"
            >
              Sign in
            </button>
            <div>
              <p>
                <Link to="/signup">Don't have account? Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function mapState(state) {
  const { loggedIn } = state.authentication;
  return { loggedIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
};

export default connect(mapState, actionCreators)(SignIn);
