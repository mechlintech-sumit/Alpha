import React, { useState, useEffect } from "react";
import "./createprojet.css";
import Header from "../Header/Header";
import { Link, useParams, useHistory } from "react-router-dom";
import proimage from "./../../NewImages/ProImageiconone.png";
import proimagePlus from "./../../NewImages/plusiconimage.png";

const CreateProject = () => {
  const [projectInfo, setProjectInfo] = useState(false);
  const [task, setTask] = useState(false);
  const [InputData, setInputData] = useState("");
  const [Items, setItems] = useState([]);
  const [showError, SetError] = useState(false);
  const [projectDetails, setDetails] = useState({
    name: "",
    projectType: "",
    description: "",
    assignedTo: "",
    category: "",
    weekelyhour: "",
    perhourcost: "",
  });
  console.log("projectDetails", projectDetails.category);
  const handleChange = (e) => {
    setDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };
  const handleProject = () => {
    setProjectInfo(!projectInfo);
    setTask(false);
  };
  const handleTask = () => {
    setTask(!task);
    setProjectInfo(false);
  };
  const addItems = (e) => {
    e.preventDefault();
    if (!InputData) {
    } else {
      setItems([...Items, InputData]);
      setInputData("");
    }
  };

  const deleteItems = (id) => {
    console.log(id);
    const updateditems = Items.filter((elem, i) => {
      return i !== id;
    });
    setItems(updateditems);
  };

  const handleCreate = () => {
    SetError(true);
    if (
      projectDetails.name &&
      projectDetails.projectType &&
      projectDetails.description &&
      projectDetails.assignedTo
    ) {
      console.log("projectDeatils", projectDetails);
    }
  };
  return (
    <div className="project-header">
      <Header headerName="Create Project" />
      <div className="main">
        <div>
          <div class="project-container">
            <div class="row">
              <div className="col" style={{ display: "flex" }}>
                <img
                  src="images/Project-info-icon.png"
                  alt="Project-info-icon"
                  style={{ padding: "8px" }}
                />
                <label
                  class="form-check-label reg-lable"
                  for="exampleCheck1"
                  style={{
                    marginLeft: "10px",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Project Information
                </label>
              </div>
              <div className="col" style={{ display: "contents" }}>
                <img
                  src={
                    projectInfo == true
                      ? "images/downicon.png"
                      : "images/forwardicon.png"
                  }
                  onClick={handleProject}
                  style={{ marginRight: "10px", padding: "8px" }}
                  alt="Project-info-icon"
                />
              </div>
            </div>
          </div>
          {projectInfo == true ? (
            <div className="project-card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col">
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Name
                      </label>
                      <input
                        style={{
                          backgroundColor: "white",
                          border: showError
                            ? projectDetails.name.length === 0
                              ? " 1px solid red"
                              : null
                            : null,
                        }}
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        name="name"
                        value={projectDetails.name}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="col">
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Project Type
                      </label>
                      <select
                        style={{
                          backgroundColor: "white",
                          border: showError
                            ? projectDetails.projectType.length === 0
                              ? " 1px solid red"
                              : null
                            : null,
                        }}
                        class="form-select"
                        id="inputGroupSelect03"
                        aria-label="Example select with button addon"
                        name="projectType"
                        value={projectDetails.projectType}
                        onChange={(e) => handleChange(e)}
                      >
                        <option selected>Select Project Type</option>
                        <option value="1">Billable Hour</option>
                        <option value="2">Non Billable Hour</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div class="form-group">
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Project Description
                      </label>
                      <textarea
                        style={{
                          border: showError
                            ? projectDetails.description.length === 0
                              ? " 1px solid red"
                              : null
                            : null,
                        }}
                        class="form-control"
                        rows="3"
                        name="description"
                        value={projectDetails.description}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Assigned To
                      </label>

                      <select
                        style={{
                          backgroundColor: "white",
                          border: showError
                            ? projectDetails.assignedTo.length === 0
                              ? " 1px solid red"
                              : null
                            : null,
                        }}
                        class="form-select"
                        id="inputGroupSelect03"
                        aria-label="Example select with button addon"
                        name="assignedTo"
                        value={projectDetails.assignedTo}
                        onChange={(e) => handleChange(e)}
                      >
                        <option selected>Choose Assignee</option>
                        <option value="1">Developer</option>
                        <option value="2">Tester</option>
                        <option value="3">Designer</option>
                      </select>
                    </div>

                    {projectDetails.projectType == "1" ? (
                      <div className="col-md-6">
                        <label
                          class="form-check-label reg-lable"
                          for="exampleCheck1"
                        >
                          Project Category
                        </label>

                        <select
                          style={{
                            backgroundColor: "white",
                            border: showError
                              ? projectDetails.category.length === 0
                                ? " 1px solid red"
                                : null
                              : null,
                          }}
                          class="form-select"
                          id="inputGroupSelect03"
                          aria-label="Example select with button addon"
                          name="category"
                          value={projectDetails.category}
                          onChange={(e) => handleChange(e)}
                        >
                          <option selected>Choose Project Category</option>
                          <option value="1">Retainer</option>
                          <option value="2">Non Retainer</option>
                        </select>
                      </div>
                    ) : null}
                    
                  </div>

                  {projectDetails.projectType == "1" ? (
                    projectDetails.category == "1" ? (
                      <div className="row">
                        <div className="col-md-6">
                          <label
                            class="form-check-label reg-lable"
                            for="exampleCheck1"
                          >
                            Per Hour Cost
                          </label>

                          <input
                            style={{
                              backgroundColor: "white",
                              border: showError
                                ? projectDetails.perhourcost.length === 0
                                  ? " 1px solid red"
                                  : null
                                : null,
                            }}
                            type="text"
                            class="form-control"
                            placeholder="Per Hour Cost"
                            name="perhourcost"
                            value={projectDetails.perhourcost}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            class="form-check-label reg-lable"
                            for="exampleCheck1"
                          >
                            Weekely Hour
                          </label>

                          <input
                            style={{
                              backgroundColor: "white",
                              border: showError
                                ? projectDetails.weekelyhour.length === 0
                                  ? " 1px solid red"
                                  : null
                                : null,
                            }}
                            type="text"
                            class="form-control"
                            placeholder="Weekely Hour"
                            name="weekelyhour"
                            value={projectDetails.weekelyhour}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                    ) : null
                  ) : null}

                </form>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <div class="project-container">
            <div class="row">
              <div className="col" style={{ display: "flex" }}>
                <img
                  src="images/Tasks.png"
                  alt="Project-info-icon"
                  style={{ padding: "8px" }}
                />
                <label
                  class="form-check-label reg-lable"
                  for="exampleCheck1"
                  style={{ marginLeft: "10px", color: "white" }}
                >
                  Tasks
                </label>
              </div>
              <div className="col" style={{ display: "contents" }}>
                <img
                  src={
                    task == true
                      ? "images/downicon.png"
                      : "images/forwardicon.png"
                  }
                  onClick={handleTask}
                  style={{ marginRight: "10px", padding: "8px" }}
                  alt="Project-info-icon"
                />
              </div>
            </div>
          </div>
          {task == true ? (
            <div className="project-card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Name
                      </label>
                      <div style={{ display: "flex" }}>
                        <input
                          style={{ backgroundColor: "white" }}
                          type="text"
                          id="fname"
                          name="firstname"
                          placeholder="Name"
                          value={InputData}
                          onChange={(e) => setInputData(e.target.value)}
                        />
                        <button
                          className="btn"
                          className="changebtn"
                          onClick={addItems}
                          type="submit"
                          style={{ backgroundColor: "#25344b" }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="ShowItems">
                      <div className="labaddtwo">
                        <label style={{ fontWeight: "700" }}>Tasks</label>
                      </div>
                      {Items.map((elem, i) => {
                        return (
                          <div class="doccontainernew">
                            <div class="row" key={i}>
                              <div class="col">
                                <p
                                  style={{
                                    color: "black",
                                    textAlign: "justify",
                                  }}
                                >
                                  {elem}
                                </p>
                              </div>

                              <div class="col">
                                <button
                                  className="dustbin_image"
                                  onClick={() => deleteItems(i)}
                                >
                                  <img src={proimage} alt="logo" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            <button
              className="btn  float-left"
              type="submit"
              style={{ backgroundColor: "#25344b" }}
              onClick={() => handleCreate()}
            >
              Create
            </button>
            <button className="btn  float-left" type="submit">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;