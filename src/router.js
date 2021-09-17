import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/pages/Login";
import ResetPassword from "./components/pages/ResetPassword";
import ChangePassword from "./components/pages/changePassword";
import Navbar from "./components/pages/navbar";
import Error from "./components/pages/error";
import Forgetpassword from "./components/pages/forgotpassword";
import { useSelector } from "react-redux";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/dashboard";
import Employee from "./components/pages/Employee";
import Rolespermission from "./components/pages/Rolespermission";
import Projects from "./components/pages/projects";
import Settings from "./components/pages/settings";

const Routes = () => {
  const { isLoggedIn } = useSelector((store) => store.auth);
  return (
    <>
      {/* <Navbar /> */}
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/resetPassword">
            <ResetPassword />
          </Route>
          <Route path="/forgetpassword">
            <Forgetpassword />
          </Route>
          <Route path="/changepassword">
            <ChangePassword />
          </Route>
          <div>
          <Navbar />
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route  exact path="/Employee">
            <Employee />
          </Route>
          <Route path="/Rolespermission">
            <Rolespermission />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          </div>
          {/* <Route exact path ="/Post/:category" component={Post} />
    <Route component={Error}/ > */}
        </Switch>
      )}
    </>
  );
};

export default Routes;
