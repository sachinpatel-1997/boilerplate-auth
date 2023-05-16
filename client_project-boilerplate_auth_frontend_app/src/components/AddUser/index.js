import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../actions/Auth";

function AddUser(props) {
  const { addUser } = props;
  const history = useHistory();

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

  const handleCancel = () => {
    history.push("/");
  };
  const handleSubmit = () => {
    addUser(userData);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md"></div>
        <div className="col-md pt-5">
          <div className="text-center mb-3">
            <h2>Add User Details</h2>
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
                  onClick={handleCancel}
                  type="button"
                  className="btn btn-secondary btn-block mb-4"
                >
                  Cancel
                </button>
              </div>
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
  );
}

function mapState(state) {
  return {};
}

const actionCreators = {
  addUser: userActions.addUser,
};

export default connect(mapState, actionCreators)(AddUser);
