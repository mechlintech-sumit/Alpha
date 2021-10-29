import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { logIn } from "../../../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import { Axios } from "../../../Utils/axios";

import {
  emailValidator,
  passwordValidator,
} from "../../../Utils/fieldValidator";

function Login() {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const { push } = useHistory();
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log("store", auth);
  const [errors, setErrors] = useState(false);
  const [userEmail, setuserEmail] = useState("");
  const [isEmailvalid, setIsEmailvalid] = useState(true);
  const [ispasswordValid, setisPasswordValid] = useState(true);
  const [rember, setRember] = useState(false);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handlePasswordChange = (prop) => (event) => {
    setisPasswordValid(passwordValidator(event.target.value));
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleLogin = () => {
    const userInfo = {
      email: userEmail,
      password: values.password,
      rememberMe: rember,
    };
    console.log("userInfo", userInfo);
    if (!userEmail.length > 0) {
      setErrors(true);
    }
    if (!values.password.length > 0) {
      setErrors(true);
    }

    if (
      userEmail.length > 0 &&
      values.password.length > 0 &&
      isEmailvalid &&
      ispasswordValid
    ) {
      // Axios.post("/login", userInfo)
      //   .then((res) => {
      //     console.log("ressss", res);
      //     // if (res.data.status) {
      //     //   window.localStorage.setItem(
      //     //     "authUser",
      //     //     JSON.stringify(res.data.data)
      //     //   );
      //     //   Axios.defaults.headers.common = {
      //     //     Authorization: `Bearer ${res.data.data.token}`,
      //     //   };
      //     //   login(res.data.data);
      //     //   history.replace("/dashboard");
      //     // } else if (res.data.status === false) {
      //     //   setError(true);
      //     //   setErrorMessage(res.data.message);
      //     // }
      //   })
      //   .catch((err) => {
      //     console.log("error from api ");
      //     // setError(true);
      //   });
        dispatch(logIn(userInfo));
      // dispatch(logIn({ userEmail, password: values.password }));
    }
  };

  const onChangeData = ({ name, value }) => {
    setIsEmailvalid(emailValidator(value.target.value));

    setuserEmail(value.target.value);
  };
  return (
    <div>
      <div
        className="login"
        style={{ backgroundImage: "url(/images/Login-bg.jpg)" }}
      >
        <div className="login__container">
          <img className="login__logo" src="images/logo.png" alt="logo" />
          {/* <h5>Login</h5> */}
          <h4>LOGIN</h4>
          <form style={{ marginTop: "10%" }}>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "15px 0",
                paddingBottom: "8px",
              }}
            >
              <img src="images/Email-icon.png" style={{ marginRight: "2px" }} />
              <input
                className="input_field"
                style={{
                  width: "100%",
                  border: "none",
                }}
                vlaue={userEmail}
                // onChange={(event) => setUserEmail(event.target.value)}
                onChange={(value) => onChangeData({ name: "userEmail", value })}
                placeholder="Email"
                type="email"
              />
            </div>
            {errors ? (
              !userEmail ? (
                <p style={{ color: "red" }}>Email is required</p>
              ) : null
            ) : null}
            {!isEmailvalid ? (
              <p style={{ color: "red" }}>Please enter a valid email.</p>
            ) : null}
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "15px 0",
                paddingBottom: "8px",
              }}
            >
              <img
                src="images/Password-icon.png"
                style={{ marginRight: "2px" }}
              />
              <input
                className="input_field"
                style={{
                  width: "100%",
                  border: "none",
                }}
                type={values.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={values.password}
                // onChange={(event) => setUserpassword(event.target.value)}
                placeholder="Password"
              />

              <button
                onClick={() => handleClickShowPassword()}
                type="button"
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <img
                  src={
                    values.showPassword == true
                      ? "images/Eye.png"
                      : "images/Eye-blue.png"
                  }
                  style={{ marginRight: "2px", height: "19px", width: "33px" }}
                />
              </button>
            </div>
            {errors ? (
              !values.password ? (
                <p style={{ color: "red" }}>Password is required</p>
              ) : null
            ) : null}
            {!ispasswordValid ? (
              <p style={{ color: "red" }}>
                Password should contain at least 1 Uppercase,1 Special
                Character,1 Digit, and min 8 Characters.{" "}
              </p>
            ) : null}
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                vlaue={rember}
                onChange={(value) => setRember(!rember)}
              />
              <label class="form-check-label" for="exampleCheck1">
                Remember me
              </label>

              <h7 className="login__forgettwo">
                <Link className="linUrl" to="/forgetpassword">
                  Forgot Password?
                </Link>
              </h7>
            </div>
          </form>

          <button
            onClick={() => handleLogin()}
            type="button"
            class="btn btn-lg"
            style={{
              backgroundColor: "#003366",
              color: "white",
              fontWeight: "600",
            }}
          >
            LOGIN
          </button>
{/* 
          <div className="signup_link">
            
            <label class="form-check-label" for="exampleCheck1">
              Don't have an account?{"   "}
            </label>
            <Link className="linUrl" to="/resetPassword">
              Signup here
            </Link>{" "}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
