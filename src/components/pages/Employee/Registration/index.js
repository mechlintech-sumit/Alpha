import React, { useState } from "react";
import "./Registration.css";
import Header from "../../Header/Header";
import Upload from "./Upload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInputNumber from "../../../common/PhoneInput"

function Registration() {
  const [startDate, setStartDate] = useState(new Date());
  const ytnStyle = {
    backgroundColor: "white",
    marginTop: "200px",
    marginLeft: "50px",
    borderRadius:"5%"
  };
  return (
    <div>
      <Header headerName="Registration" />
      <div style={{ display: "flex",marginLeft:"8%",marginTop:"5%" }}>
            <div
              style={{
                backgroundColor: "#f1f1f1",
              
              }}
            >
               < Upload/>
              
            </div>
          </div>
      <div class="container">
        <form>
 
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Name
              </label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Enter your Name.."
              />
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Email Address
              </label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Enter Email Address.."
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Mobile Number
              </label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Enter Mobile Number.."
              />
              {/* <PhoneInputNumber/> */}
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Date of Birth
              </label>
              {/* <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Select your DOB"
                data-provide="datepicker"
              /> */}
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Designation
              </label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Enter Designation"
              />
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Role
              </label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Role"
              />
            </div>
          </div>
          <div className="row">
            <label
              class="form-check-label reg-lable"
              for="exampleCheck1"
              style={{ fontSize: "25px", fontWeight: "700", marginLeft: "1%" }}
            >
              Advance Setting
            </label>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Manager
              </label>
              {/* <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Choose manager"
              /> */}

              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
              >
                <option selected>Choose Manager</option>
                <option value="1">Manager</option>
                <option value="2">Assistant Manager</option>
                <option value="3">Juniar Manager</option>
              </select>
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Screenshot Recurrence(in Min)
              </label>
              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
              >
                <option selected>Choose ScreenShot</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </form>
        <div
          className="d-grid gap-2 d-md-block"
          style={{
            marginTop: "2%",
            marginBottom: "10px",
            textAlignLast: "start",
          }}
        >
          <button
            className="btn "
            style={{ backgroundColor: "#003366", color: "white" }}
            type="button"
          >
            Save
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            style={{ marginLeft: "5px" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;