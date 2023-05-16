import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../actions/Auth";
import dummyProfile from "assets/images/user.svg";
import { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

function Header(props) {
  const { user, logout } = props;
  const { name, profile } = user.user;

  const clientId = process.env.REACT_APP_CLIENT_ID;

  const handleLogout = (res) => {
    console.log("success", res);
    logout();
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
      // gapi.auth2.getAuthInstance()({ clientId: clientId });
    });
  }, [])//eslint-disable-line react-hooks/exhaustive-deps

  const handleLogoutFailure = (res) => {
    console.log("failure", res);
    logout();
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Welcome, {name}
      </Link>
      <form className="form-inline">
        <div className="nav-item dropdown">
          
          <a
            className="nav-link dropdown-toggle rounded-circle"
            role="button"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            {profile ? (
              <img
                src={profile}
                alt="profile"
                width="40"
                height="40"
                className="rounded-circle border border-light"
              />
            ) : (
              <img
                src={dummyProfile}
                alt="profile"
                width="40"
                height="40"
                className="rounded-circle border border-light"
              />
            )}
          </a>
          <div
            className="dropdown-menu"
            style={{ left: "-50px", minWidth: "0" }}
          >
            <Link to="editprofile" className="dropdown-item">
              Edit Profile
            </Link>
            {/* <a className="dropdown-item" onClick={handleLogout}> */}
            <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={handleLogout}
              onFailure={handleLogoutFailure}
              render={(renderProps) => (
                <a className="dropdown-item" onClick={renderProps.onClick}>
                  Logout
                </a>
              )}
            />
            {/* </a> */}
          </div>
        </div>
      </form>
    </nav>
  );
}

Header.propTypes = {
  showBackground: PropTypes.bool,
};

function mapState(state) {
  const { authentication } = state;
  const { user } = authentication;
  return { user };
}

const actionCreators = {
  logout: userActions.logout,
};

export default connect(mapState, actionCreators)(Header);
