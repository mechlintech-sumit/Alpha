import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../../images/logo.png";
import passIcon from "../../../images/Eye-blue.png";
import showpassIcon from "../../../images/Eye.png";
import { logIn } from "../../../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";

function Login() {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };


  const handlePasswordChange = (prop) => (event) => {
    passwordValidator(event.target.value)
    setValues({ ...values, [prop]: event.target.value });
  };

  const { push } = useHistory();
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log("store", auth);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    userEmail: "",
    password: "",
  });
  const [isEmailvalid, setIsEmailvalid] = useState(true)
  const [ispasswordValid, setisPasswordValid] = useState([])

  const handleLogin = () => {
    if (!userData.userEmail) {
      setErrors((prev) => {
        return { ...prev, userEmail: "Plase enter userEmail" };
      });
      console.log("error", errors);
    } else {
      console.log("data");
    }
  };

  const emailValidator = (val) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isV = re.test(val);
    setIsEmailvalid(isV)

  }

  const passwordValidator = (val) => {

    setisPasswordValid([])
    let Errors = []
    console.log("pss", val)
    var lowerCaseLetters = /[a-z]/g;
    if (!val.match(lowerCaseLetters)) {
      Errors.push("Pawweord must contain a lower case");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (!val.match(upperCaseLetters)) {
      Errors.push("Pawweord must contain a capital letter")
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (!val.match(numbers)) {
      Errors.push("Pawweord must contain a number")
    }

    // Validate length
    if (!val.length >= 8) {
      Errors.push("Pawweord must contain 8 or more cheracters")
    }

    var SC = /[!@#$%^&*]/g;
    if (!val.match(SC)) {
      Errors.push("Pawweord must contain a spacial character !@#$%^&* ")
    }


    console.log("Errs", Errors)
    setisPasswordValid(Errors)
  }

  const onChangeData = ({ name, value }) => {
    if (name == "userEmail") {
      emailValidator(value.target.value)
    }

    setUserData({ ...userData, [name]: value });
    if (value !== "") {
      setErrors((prev) => {
        return { ...prev, [name]: null };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, [name]: "This Field Required" };
      });
    }
  };
  return (
    <div>
      <div
        className="login"
        style={{ backgroundImage: "url(/images/Login-bg.jpg)" }}
      >
        <div className="login__container">
          <img className="login__logo" src={logo} alt="logo" />
          {/* <h5>Login</h5> */}
          <h3>Login</h3>
          <form>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "15pxx 0",
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
                vlaue={userData.userEmail}
                // onChange={(event) => setUserEmail(event.target.value)}
                onChange={(value) => onChangeData({ name: "userEmail", value })}
                placeholder="Email"
                type="email"
             
              />

            </div>
            {!isEmailvalid ? <p style={{ color: "red" }}>not a valid mail</p> : null}
            {/* <div className="Error_message">
               {userData.userEmail.length==0 ? <p className="errorMessage" style={{ color: "red" }}>This Field Required</p> : null}
            </div> */}
           
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


              <button onClick={() => handleClickShowPassword()} type="button" style={{ border: "none", backgroundColor: "transparent" }}>
                <img
                  src={
                    values.showPassword == true
                      ? "images/Eye.png"
                      : "images/Eye-blue.png"
                  }
                  style={{ marginRight: "2px" }}
                />
              </button>
            </div>
            {ispasswordValid.length > 0 ? ispasswordValid.map(err => <p style={{ color: "red", fontWeight: 'bold' }}>{err}</p>) : null}
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"

              />
              <label class="form-check-label" for="exampleCheck1">
                Remember me
              </label>

              <h7 className="login__forgettwo">
                <Link className="linUrl" to="/signUp">Forget Password?</Link>
              </h7>
            </div>
          
          </form>

          <button
            // onClick={() => dispatch(logIn({ useremail, userpassword }))}
            onClick={() => handleLogin()}
            type="button"
            class="btn btn-lg"
            style={{ backgroundColor: "#3b1d8f", color: "white" }}
          >
            LOGIN
          </button>

          <div>
            <p>
              Don't have an account?{" "}
              <b>
                <Link className="linUrl" to="/signUp">Signup here</Link>
              </b>
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
