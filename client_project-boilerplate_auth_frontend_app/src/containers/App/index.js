import React, { Fragment, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "utils/Loader";
import { connect } from "react-redux";
import { userActions } from "actions/Auth";

// import SignIn from "./../../components/SignIn";
// import SignUp from "./../../components/SignUp";
// import Dashboard from "./../../components/Dashboard";
// import UpdateUser from "./../../components/UpdateUser";
// import EditProfile from "components/EditProfile";
// import ForgotPassword from "components/ForgotPassword";
// import ResetPassword from "components/ResetPassword";
// import AddUser from "./../../components/AddUser";
import { PrivateRoute } from "../../utils/privateRoute";
const SignIn = lazy(() => import("./../../components/SignIn"));
const SignUp = lazy(() => import("./../../components/SignUp"));
const Dashboard = lazy(() => import("./../../components/Dashboard"));
const UpdateUser = lazy(() => import("./../../components/UpdateUser"));
const EditProfile = lazy(() => import("./../../components/EditProfile"));
const ForgotPassword = lazy(() => import("./../../components/ForgotPassword"));
const ResetPassword = lazy(() => import("./../../components/ResetPassword"));
const AddUser = lazy(() => import("./../../components/AddUser"));

function App(props) {
  const { loading } = props;
  return (
    <Fragment>
      {loading && <Loader />}
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} />
          {/* <Route path="/addUser" component={AddUser} /> */}
          {/* <Route path="/updateUser/:id" component={UpdateUser} /> */}
          <PrivateRoute path="/user/:id">
            <UpdateUser />
          </PrivateRoute>
          <PrivateRoute path="/addUser">
            <AddUser />
          </PrivateRoute>
          <PrivateRoute path="/editprofile">
            <EditProfile />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Fragment>
  );
}

function mapState(state) {
  const { loading } = state;
  return { loading };
}

const actionCreators = {};

export default connect(mapState, actionCreators)(App);
