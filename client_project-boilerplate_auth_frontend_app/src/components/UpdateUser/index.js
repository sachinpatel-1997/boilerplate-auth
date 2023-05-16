import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../actions/Auth";
import api from "utils/interceptor";

function UpdateUser(props) {
  const { update, loading } = props;
  const history = useHistory();
  const params = useParams();

  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    loading(true);
    api
      .get(`${process.env.REACT_APP_BASE_URL}/users/${params.id}`)
      .then((response) => {
        setUserDetails({
          email: response.data.email,
          name: response.data.name,
        });
        loading(false);
      });
  }, [])//eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    history.push("/");
  };
  const handleSubmit = () => {
    update(params.id, userDetails);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md"></div>
        <div className="col-md pt-5">
          <div className="text-center mb-3">
            <h2>Update User Details</h2>
          </div>
          <form>
            <div className="form-outline mb-4">
              <label className="form-label">Name</label>
              <input
                type="type"
                className="form-control"
                value={userDetails.name || ""}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={userDetails.email || ""}
                onChange={handleChange}
                name="email"
              />
            </div>
            {/* <div className="form-group">
              <label>Role</label>
              <select
                className="form-control"
                value={userDetails.role}
                onChange={handleChange}
                name="role"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div> */}

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
  const { userById } = state;
  return { userById };
}

const actionCreators = {
  getById: userActions.getById,
  update: userActions.update,
  loading: userActions.loading,
};

export default connect(mapState, actionCreators)(UpdateUser);
