import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../actions/Auth";
import dummyProfile from "assets/images/user.svg";
import { AlertModal } from "utils/modal";
import TableBody from "./TableBody";

function Dashboard(props) {
  const { getUsers, user, users, deleteUser } = props;
  const history = useHistory();

  const [showModal, setShowModal] = useState({
    show: false,
    data: "",
  });

  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredData =
    (users.items &&
      users.items.filter((person) => {
        return (
          person.name.toLowerCase().includes(searchField.toLowerCase()) ||
          person.email.toLowerCase().includes(searchField.toLowerCase())
        );
      })) ||
    [];

  const handleUpdate = (user) => {
    history.push(`/user/${user.id}`);
  };

  const onConfirm = (id) => {
    deleteUser(id);
    setShowModal({
      show: false,
      data: "",
    });
  };

  const onCancel = () => {
    setShowModal({
      show: false,
      data: "",
    });
  };

  const handleDelete = (id) => {
    setShowModal({
      show: true,
      data: id,
    });
  };

  return (
    <div>
      <div className="text-center">
        <h2>List of all Users</h2>
      </div>

      <div className="container table-responsive">
        <div className="d-flex justify-content-between py-2">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              onChange={(e) => setSearchField(e.target.value)}
            />
          </form>
          {user.user.role === "admin" ? (
            <button
              onClick={() => history.push("/adduser")}
              type="button"
              className="btn btn-primary"
            >
              Add User
            </button>
          ) : (
            ""
          )}
        </div>
        <TableBody
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          tableData={
            filteredData.filter((currUser) => currUser.id !== user.user.id) ||
            []
          }
          user={user}
          rowsPerPage={5}
        />
      </div>
      <AlertModal
        showModal={showModal}
        hideModal={onCancel}
        onConfirm={onConfirm}
        message="Are you sure you want to delete"
      />
    </div>
  );
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

export default connect(mapState, actionCreators)(Dashboard);
