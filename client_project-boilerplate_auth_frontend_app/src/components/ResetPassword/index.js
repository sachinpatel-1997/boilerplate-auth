import React, { useState } from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions/Auth";
import { pushNotification } from "utils/notifications";
import { useParams } from "react-router-dom";

const ResetPassword = (props) => {
  const { resetpassword } = props;

  const params = useParams();

  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserPassword((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!userPassword.newPassword && !userPassword.confirmNewPassword) {
      pushNotification("Both fields are required", "error");
      return;
    }
    if (userPassword.newPassword === userPassword.confirmNewPassword) {
      if (userPassword.newPassword.length >= 8) {
        resetpassword(params.token, { password: userPassword.newPassword });
      } else {
        pushNotification(
          "Password must be at least 8 characters long",
          "error"
        );
        return;
      }
    } else {
      pushNotification("Password did not match", "error");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md"></div>
          <div className="col-md pt-5">
            <div className="text-center mb-5">
              <h2>Reset Password</h2>
            </div>
            <form>
              <div className="form-outline mb-4">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  onChange={handleChange}
                  value={userPassword.newPassword || ""}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label">Comfirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmNewPassword"
                  onChange={handleChange}
                  value={userPassword.confirmNewPassword || ""}
                />
              </div>

              <div className="row">
                <div className="col">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md"></div>
        </div>
      </div>
    </div>
  );
};

function mapState(state) {
  return {};
}

const actionCreators = {
  resetpassword: userActions.resetpassword,
};

export default connect(mapState, actionCreators)(ResetPassword);
