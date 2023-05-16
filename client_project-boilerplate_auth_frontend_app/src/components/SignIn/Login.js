import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { connect } from "react-redux";
import { userActions } from "../../actions/Auth";

const clientId = process.env.REACT_APP_CLIENT_ID;

function Login(props) {
  const { googleSignin } = props;

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
      // gapi.auth2.getAuthInstance()({ clientId: clientId });
    });
  }, []);

  const onSuccess = (res) => {
    // console.log("[Login Success] CurrentUser:", res);
    googleSignin({ tokenId: res.tokenId });
  };

  const onFailure = (res) => {
    console.log("[Login Failure] res", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in With Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

function mapState(state) {
  return {};
}

const actionCreators = {
  googleSignin: userActions.googleSignin,
};

export default connect(mapState, actionCreators)(Login);
