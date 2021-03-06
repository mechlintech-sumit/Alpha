import React, { useState } from "react";
import "./forgetpassword.css";
import { forgot } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { emailValidator } from "../../../Utils/fieldValidator";

function Forgetpassword() {
  const [useremail, setUserEmail] = useState("");
  const [mailError, setmailError] = useState(true);
  const [showerror, setshowError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!useremail.length > 0) {
      setshowError(true);
    }

    if (useremail.length > 0 && mailError) {
      dispatch(forgot(useremail));
      // To Do next implementation
    }
  };

  const handleChange = (value) => {
    setmailError(emailValidator(value));
    setUserEmail(value);
  };

  return (
    <div>
      <div
        className="forget"
        style={{ backgroundImage: "url(/images/Login-bg.jpg)" }}
      >
        <div className="forget__container">
          <img className="login__logo" src="images/clocklogo.jpg" alt="logo" />
          <h4>FORGOT PASSWORD?</h4>
          <form style={{ marginTop: "5%" }}>
            <div className="forget_text-box" style={{ marginBottom: "10%" }}>
              <p>
                Enter the email address you used when you joined <br />
                and we'll send you instructions to reset your password.{" "}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "15pxx 0",
                paddingBottom: "5%",
              }}
            >
              <img src="images/Email-icon.png" style={{ marginRight: "2px" }} />
              <input
                style={{
                  width: "100%",
                  border: "none",
                  marginLeft: "5%",
                }}
                className="email_type"
                vlaue={useremail}
                onChange={(event) => handleChange(event.target.value)}
                placeholder="Email"
                type="email"
              />
            </div>
            {mailError ? null : (
              <p style={{ color: "red", textAlign: "unset" }}>
                Please enter a valid email.
              </p>
            )}
            {showerror ? (
              !useremail ? (
                <p style={{ color: "red", textAlign: "unset" }}>
                  Email is required
                </p>
              ) : null
            ) : null}
          </form>

          <button
            onClick={handleSubmit}
            type="button"
            class="btn btn-primary btn-lg"
            style={{
              backgroundColor: "#003366",
              color: "white",
              marginTop: "10%",
              fontWeight: "600",
            }}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Forgetpassword;
