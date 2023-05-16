import React, { useState } from "react";
import { email } from "utils/formUtils/validator";
import { connect } from "react-redux";
import { userActions } from "../../actions/Auth";
import { RenderField } from "utils/formUtils";

const ForgotPassword = (props) => {
  const { forgotpassword } = props;
  const [userEmail, setUserEmail] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setUserEmail({
      email: value,
    });
  };

  const handleSubmit = () => {
    let isValidEmail = email(userEmail.email);
    if (userEmail.email && !isValidEmail) {
      // alert("Email has been sent successfully");
      forgotpassword(userEmail);
    } else if (isValidEmail) {
      alert(isValidEmail);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md"></div>
          <div className="col-md pt-5">
            <div className="text-center mb-5">
              <h2>Forgot Password</h2>
            </div>
            <form>
              <div className="form-outline mb-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your registered"
                  value={userEmail.email || ""}
                />
              </div>
              {/* 
              {renderField(
                "",
                "Email",
                "name",
                "email",
                "Enter your Email",
                false,
                "",
                true,
                "error",
                "warning"
              )} */}
              {/* <RenderField
                input=""
                label="Email"
                name="name"
                type="text"
                placeholder="Enter your Email"
                disabled={false}
                validationError=""
                meta={{
                  touched: true,
                  error: "kuaefbiuefn",
                  warning: "eugirh",
                }}
              /> */}

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
  forgotpassword: userActions.forgotpassword,
};

export default connect(mapState, actionCreators)(ForgotPassword);
