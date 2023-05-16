import React, { useState } from "react";
import dummyProfile from "assets/images/user.svg";
import useTable from "./useTable";
import TableFooter from "./TableFooter";

export default function TableBody(props) {
  const { handleUpdate, handleDelete, tableData, user, rowsPerPage } = props;
  const [nameSortOrder, setNameSortOrder] = useState(true);
  const [emailSortOrder, setEmailSortOrder] = useState(true);

  const [page, setPage] = useState(1);
  const { slice, range } = useTable([...tableData], page, rowsPerPage);

  const nameSort = () => {
    if (nameSortOrder) {
      tableData.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
      });
      setNameSortOrder(false);
    } else {
      tableData.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa > fb) return -1;
        if (fa < fb) return 1;
        return 0;
      });
      setNameSortOrder(true);
    }
  };

  const emailSort = () => {
    if (emailSortOrder) {
      tableData.sort((a, b) => {
        let fa = a.email.toLowerCase(),
          fb = b.email.toLowerCase();

        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
      });
      setEmailSortOrder(false);
    } else {
      tableData.sort((a, b) => {
        let fa = a.email.toLowerCase(),
          fb = b.email.toLowerCase();

        if (fa > fb) return -1;
        if (fa < fb) return 1;
        return 0;
      });
      setEmailSortOrder(true);
    }
  };

  return (
    <>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Profile</th>
            <th scope="col">
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={nameSort}
              >
                <span>Name</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-filter"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
              </div>
            </th>
            <th scope="col">
              <div
                className="d-flex justify-content-between align-items-center pointer"
                style={{ cursor: "pointer" }}
                onClick={emailSort}
              >
                <span>Email</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-filter"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
              </div>
            </th>
            <th scope="col">Role</th>
            {user.user.role === "admin" ? <th scope="col">Action</th> : null}
          </tr>
        </thead>

        <tbody>
          {/* .filter((currUser) => currUser.id !== user.user.id) */}
          {slice &&
            [...slice].map((userList, index) => (
              <tr key={userList.id}>
                <td>{index + 1}</td>
                <td>
                  {userList.profile ? (
                    <img
                      src={userList.profile}
                      alt="profile"
                      width="40"
                      height="40"
                      className="rounded-circle border"
                    />
                  ) : (
                    <img
                      src={dummyProfile}
                      alt="profile"
                      width="40"
                      height="40"
                      className="rounded-circle border"
                    />
                  )}
                </td>
                <td>{userList.name}</td>
                <td>{userList.email}</td>
                <td>{userList.role}</td>
                {user.user.role === "admin" ? (
                  <td>
                    <button
                      onClick={() => handleUpdate(userList)}
                      type="button"
                      className="btn btn-primary"
                    >
                      Edit{" "}
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
                    <button
                      onClick={() => handleDelete(userList.id)}
                      type="button"
                      className="btn btn-outline-primary ml-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>{" "}
                      Delete
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
}
