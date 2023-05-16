import React, { useState } from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions/Auth";
import { pushNotification } from "../../utils/notifications";
import { Link } from "react-router-dom";

const REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignUp(props) {
  const { register } = props;

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    return email.match(REGEX);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userData.name) {
      pushNotification("Name is required", "error");
      return;
    } else if (!userData.email) {
      pushNotification("Email is required", "error");
      return;
    } else if (!userData.password) {
      pushNotification("Password is required", "error");
      return;
    } else if (!userData.role) {
      pushNotification("Role is required", "error");
      return;
    } else if (
      userData.email &&
      userData.password &&
      userData.name &&
      userData.role
    ) {
      if (!validateEmail(userData.email)) {
        pushNotification("invalid Email", "error");
        return;
      } else if (userData.password.length < 8) {
        pushNotification("password must be at least 8 characters", "error");
        return;
      } else if (
        !userData.password.match(/\d/) ||
        !userData.password.match(/[a-zA-Z]/)
      ) {
        pushNotification(
          "password must contain at least 1 letter and 1 number",
          "error"
        );
        return;
      }
      register(userData);
      //   pushNotification("registration successful", "success");
      //   login(userData);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md"></div>
          <div className="col-md pt-5">
            <div className="text-center mb-3">
              <h2>Register</h2>
            </div>
            <form>
              <div className="form-outline mb-4">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={handleChange}
                  value={userData.name || ""}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  value={userData.email || ""}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleChange}
                  value={userData.password || ""}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="role"
                  onChange={handleChange}
                  value={userData.role || ""}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div className="row">
                <div className="col">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Register
                  </button>
                  <div>
                    <p>
                      <Link to="/signin">Already have account. Sign In</Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md"></div>
        </div>
      </div>
    </div>
  );
}

function mapState(state) {
  return {};
}

const actionCreators = {
  login: userActions.login,
  register: userActions.register,
};

export default connect(mapState, actionCreators)(SignUp);
