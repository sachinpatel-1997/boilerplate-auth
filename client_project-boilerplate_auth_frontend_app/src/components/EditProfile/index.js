import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions/Auth";
import { useHistory } from "react-router-dom";

function EditProfile(props) {
  const { user, updateAdmin } = props;
  const { name, email, profile, id } = user.user;
  const history = useHistory();
  const hiddenFileInput = useRef(null);

  const [previewSource, setPreviewSource] = useState(profile);
  const [saveChanges, setSaveChanges] = useState(false);
  const [userData, setUserData] = useState({
    email: email,
    name: name,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
      setUserData((pre) => ({
        ...pre,
        profile: reader.result,
      }));
    };
    setSaveChanges(true);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === "profile") {
      const file = e.target.files[0];
      previewFile(file);
    } else {
      setUserData((pre) => ({
        ...pre,
        [name]: value,
      }));
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleCancel = () => {
    history.push("/");
  };

  const handleSubmit = () => {
    updateAdmin(id, userData);
  };

  return (
    <div className="container">
      <div className="row mt-5 mx-auto">
        <div className="col-4 py-5 d-flex justify-content-center bg-light m-3">
          <div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary rounded-circle"
                onClick={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
              </button>
              <input
                type="file"
                name="profile"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </div>
            <div
              className="border border-dark rounded-circle my-2 d-flex justify-content-center align-items-center"
              style={{ width: "200px", height: "200px" }}
            >
              {previewSource ? (
                <img
                  src={previewSource}
                  width="200"
                  height="200"
                  className="rounded-circle"
                  alt=""
                />
              ) : (
                "No profile found"
              )}
            </div>
            <h5 className="text-center py-3">{user.user.name}</h5>
          </div>
        </div>
        <div className="col-7 bg-light p-5 m-3">
          <form>
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  value={userData.name}
                  name="name"
                  onChange={handleChange}
                  disabled={!saveChanges}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  value={userData.email}
                  name="email"
                  onChange={handleChange}
                  disabled={!saveChanges}
                />
              </div>
            </div>

            {/* <div className="form-group row">
              <label className="col-sm-2 col-form-label">Role</label>
              <div className="col-sm-10">
                <select
                  className="form-control-plaintext"
                  name="role"
                  onChange={handleChange}
                  value={userData.role}
                  disabled={!saveChanges}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div> */}

            <div className="row mt-5">
              {saveChanges ? (
                <>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-secondary btn-block mb-4"
                      onClick={() => setSaveChanges(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-primary btn-block mb-4"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-secondary btn-block mb-4"
                      onClick={handleCancel}
                    >
                      Go back
                    </button>
                  </div>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-primary btn-block mb-4"
                      onClick={() => setSaveChanges(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function mapState(state) {
  const { authentication } = state;
  const { user } = authentication;
  return { user };
}

const actionCreators = {
  updateAdmin: userActions.updateAdmin,
};

export default connect(mapState, actionCreators)(EditProfile);
